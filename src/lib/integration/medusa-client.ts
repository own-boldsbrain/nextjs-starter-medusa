/**
 * Medusa Client Wrapper - Integração Frontend ↔ Backend
 * 
 * Responsável por:
 * - Injetar x-publishable-api-key em todas requisições ao Store API
 * - Suporte a credentials: "include" para sessões/cookies
 * - Tratamento de erros padronizado (RFC 9457)
 * - Suporte a cache (ETag, Last-Modified)
 * - Retry logic e timeout
 * - Observabilidade (logs estruturados)
 * 
 * @see https://docs.medusajs.com/learn/storefront-development
 * @see https://docs.medusajs.com/resources/storefront-development/tips
 */

import { ProblemDetails, createProblemDetails } from '../api/error-handler';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface MedusaClientConfig {
    baseUrl: string;
    publishableApiKey: string;
    timeout?: number; // ms
    retries?: number;
    enableCache?: boolean;
    debug?: boolean;
}

export interface MedusaFetchOptions extends RequestInit {
    endpoint: string;
    params?: Record<string, string | number | boolean | undefined>;
    timeout?: number;
    retries?: number;
    cache?: 'default' | 'no-cache' | 'force-cache';
}

export interface MedusaResponse<T> {
    data: T;
    status: number;
    headers: Headers;
    etag?: string;
    lastModified?: string;
}

export interface MedusaPaginatedResponse<T> {
    data: T[];
    count: number;
    offset: number;
    limit: number;
}

// ============================================================================
// MEDUSA CLIENT CLASS
// ============================================================================

export class MedusaClient {
    private config: Required<MedusaClientConfig>;

    constructor(config: MedusaClientConfig) {
        this.config = {
            baseUrl: config.baseUrl.replace(/\/$/, ''), // remove trailing slash
            publishableApiKey: config.publishableApiKey,
            timeout: config.timeout ?? 10000, // 10s default
            retries: config.retries ?? 2,
            enableCache: config.enableCache ?? true,
            debug: config.debug ?? false,
        };

        if (!this.config.publishableApiKey) {
            throw new Error(
                'MedusaClient: publishableApiKey is required. Set NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY env var.'
            );
        }
    }

    /**
     * Fetch genérico ao Medusa Store API
     * @see https://docs.medusajs.com/api/store
     */
    async fetch<T = any>(options: MedusaFetchOptions): Promise<MedusaResponse<T>> {
        const {
            endpoint,
            params,
            method = 'GET',
            headers: customHeaders,
            body,
            timeout = this.config.timeout,
            retries = this.config.retries,
            cache = this.config.enableCache ? 'default' : 'no-cache',
            ...fetchOptions
        } = options;

        // Construir URL com query params
        const url = this.buildUrl(endpoint, params);

        // Headers padrão
        const headers = new Headers(customHeaders);
        headers.set('x-publishable-api-key', this.config.publishableApiKey);
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        // Request config
        const requestConfig: RequestInit = {
            ...fetchOptions,
            method,
            headers,
            credentials: 'include', // importante para sessões/cookies
            cache: cache as RequestCache,
        };

        if (body) {
            requestConfig.body = typeof body === 'string' ? body : JSON.stringify(body);
        }

        // Debug log
        if (this.config.debug) {
            console.log('[MedusaClient] Request:', {
                method,
                url,
                headers: Object.fromEntries(headers.entries()),
            });
        }

        // Execute com retry
        let lastError: Error | null = null;
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const response = await this.fetchWithTimeout(url, requestConfig, timeout);
                return await this.handleResponse<T>(response, url);
            } catch (error) {
                lastError = error as Error;
                if (attempt < retries) {
                    const delay = Math.pow(2, attempt) * 1000; // exponential backoff
                    if (this.config.debug) {
                        console.log(`[MedusaClient] Retry ${attempt + 1}/${retries} after ${delay}ms`);
                    }
                    await this.sleep(delay);
                }
            }
        }

        // Todas tentativas falharam
        throw this.createErrorFromException(lastError!, url);
    }

    /**
     * GET genérico com suporte a paginação
     */
    async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<MedusaResponse<T>> {
        return this.fetch<T>({ endpoint, params, method: 'GET' });
    }

    /**
     * GET paginado (retorna count, offset, limit)
     */
    async getPaginated<T = any>(
        endpoint: string,
        params?: Record<string, any>
    ): Promise<MedusaResponse<MedusaPaginatedResponse<T>>> {
        const response = await this.get<any>(endpoint, params);

        // Medusa Store API retorna diferentes formatos dependendo do endpoint
        // Normalizar para estrutura consistente
        const data = response.data;

        return {
            ...response,
            data: {
                data: data.products || data.product_categories || data.regions || [],
                count: data.count ?? 0,
                offset: data.offset ?? 0,
                limit: data.limit ?? 20,
            },
        };
    }

    /**
     * POST genérico
     */
    async post<T = any>(
        endpoint: string,
        body: any,
        params?: Record<string, any>
    ): Promise<MedusaResponse<T>> {
        return this.fetch<T>({ endpoint, params, method: 'POST', body });
    }

    /**
     * PUT genérico
     */
    async put<T = any>(
        endpoint: string,
        body: any,
        params?: Record<string, any>
    ): Promise<MedusaResponse<T>> {
        return this.fetch<T>({ endpoint, params, method: 'PUT', body });
    }

    /**
     * DELETE genérico
     */
    async delete<T = any>(endpoint: string, params?: Record<string, any>): Promise<MedusaResponse<T>> {
        return this.fetch<T>({ endpoint, params, method: 'DELETE' });
    }

    // ==========================================================================
    // PRIVATE HELPERS
    // ==========================================================================

    private buildUrl(endpoint: string, params?: Record<string, any>): string {
        const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const url = new URL(`${this.config.baseUrl}${path}`);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.set(key, String(value));
                }
            });
        }

        return url.toString();
    }

    private async fetchWithTimeout(
        url: string,
        config: RequestInit,
        timeout: number
    ): Promise<Response> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...config,
                signal: controller.signal,
            });
            return response;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    private async handleResponse<T>(response: Response, url: string): Promise<MedusaResponse<T>> {
        // Extract cache headers
        const etag = response.headers.get('ETag') ?? undefined;
        const lastModified = response.headers.get('Last-Modified') ?? undefined;

        // Success
        if (response.ok) {
            const data = await response.json();

            if (this.config.debug) {
                console.log('[MedusaClient] Response:', { status: response.status, data });
            }

            return {
                data,
                status: response.status,
                headers: response.headers,
                etag,
                lastModified,
            };
        }

        // Error
        const errorBody = await response.json().catch(() => ({}));

        if (this.config.debug) {
            console.error('[MedusaClient] Error:', { status: response.status, body: errorBody });
        }

        throw this.createProblemDetailsFromMedusaError(response.status, errorBody, url);
    }

    private createProblemDetailsFromMedusaError(
        status: number,
        errorBody: any,
        instance: string
    ): ProblemDetails {
        // Medusa pode retornar diferentes formatos de erro
        const message =
            errorBody.message || errorBody.error || errorBody.detail || 'Unknown error from Medusa';

        const type = this.getErrorType(status);
        const title = this.getErrorTitle(status);

        return createProblemDetails({
            type,
            title,
            status,
            detail: message,
            instance,
            errors: errorBody.errors || undefined,
        });
    }

    private createErrorFromException(error: Error, instance: string): ProblemDetails {
        if (error.name === 'AbortError') {
            return createProblemDetails({
                type: 'https://yello.solar/errors/timeout',
                title: 'Request Timeout',
                status: 504,
                detail: `Request to Medusa backend timed out after ${this.config.timeout}ms`,
                instance,
            });
        }

        return createProblemDetails({
            type: 'https://yello.solar/errors/network',
            title: 'Network Error',
            status: 503,
            detail: error.message || 'Failed to connect to Medusa backend',
            instance,
        });
    }

    private getErrorType(status: number): string {
        const types: Record<number, string> = {
            400: 'https://yello.solar/errors/bad-request',
            401: 'https://yello.solar/errors/unauthorized',
            403: 'https://yello.solar/errors/forbidden',
            404: 'https://yello.solar/errors/not-found',
            409: 'https://yello.solar/errors/conflict',
            422: 'https://yello.solar/errors/validation',
            429: 'https://yello.solar/errors/rate-limit',
            500: 'https://yello.solar/errors/internal',
            502: 'https://yello.solar/errors/bad-gateway',
            503: 'https://yello.solar/errors/service-unavailable',
            504: 'https://yello.solar/errors/gateway-timeout',
        };
        return types[status] || 'https://yello.solar/errors/unknown';
    }

    private getErrorTitle(status: number): string {
        const titles: Record<number, string> = {
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found',
            409: 'Conflict',
            422: 'Validation Error',
            429: 'Too Many Requests',
            500: 'Internal Server Error',
            502: 'Bad Gateway',
            503: 'Service Unavailable',
            504: 'Gateway Timeout',
        };
        return titles[status] || 'Unknown Error';
    }

    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

let medusaClientInstance: MedusaClient | null = null;

export function getMedusaClient(): MedusaClient {
    if (!medusaClientInstance) {
        const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
        const publishableApiKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '';
        const debug = process.env.NODE_ENV === 'development';

        medusaClientInstance = new MedusaClient({
            baseUrl,
            publishableApiKey,
            timeout: 10000,
            retries: 2,
            enableCache: true,
            debug,
        });
    }

    return medusaClientInstance;
}

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

export const medusaClient = {
    get: (endpoint: string, params?: Record<string, any>) =>
        getMedusaClient().get(endpoint, params),
    getPaginated: (endpoint: string, params?: Record<string, any>) =>
        getMedusaClient().getPaginated(endpoint, params),
    post: (endpoint: string, body: any, params?: Record<string, any>) =>
        getMedusaClient().post(endpoint, body, params),
    put: (endpoint: string, body: any, params?: Record<string, any>) =>
        getMedusaClient().put(endpoint, body, params),
    delete: (endpoint: string, params?: Record<string, any>) =>
        getMedusaClient().delete(endpoint, params),
};
