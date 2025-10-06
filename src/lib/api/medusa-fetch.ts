/**
 * Medusa Store API Fetch Wrapper
 * 
 * Injects x-publishable-api-key header and credentials for all Medusa Store API calls
 * Medusa Store API docs: https://docs.medusajs.com/api/store
 * 
 * RFC 9110 - HTTP Semantics
 */

import { ProblemTypes, problemJson } from './error-handler';

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
const MEDUSA_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '';

export interface MedusaFetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * Wrapper for Medusa Store API calls
 * 
 * Automatically adds:
 * - x-publishable-api-key header (required for Store API)
 * - credentials: 'include' (for session/cookies)
 * - Content-Type: application/json (for POST/PUT/PATCH)
 * 
 * @param path API path (e.g., '/store/products')
 * @param options Fetch options
 * @returns Response with parsed JSON
 */
export async function medusaFetch<T = unknown>(
  path: string,
  options: MedusaFetchOptions = {}
): Promise<{
  data: T;
  status: number;
  headers: Headers;
  etag?: string;
}> {
  const { params, ...fetchOptions } = options;

  // Build URL with query params
  const url = new URL(path, MEDUSA_BACKEND_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  // Prepare headers
  const headers = new Headers(fetchOptions.headers);
  
  // Add Medusa publishable key (required for Store API)
  if (MEDUSA_PUBLISHABLE_KEY) {
    headers.set('x-publishable-api-key', MEDUSA_PUBLISHABLE_KEY);
  }

  // Add Content-Type for POST/PUT/PATCH
  if (['POST', 'PUT', 'PATCH'].includes(fetchOptions.method || 'GET')) {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
  }

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers,
      credentials: 'include', // Include cookies for session management
    });

    const etag = response.headers.get('ETag') || undefined;

    // Handle error responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      throw new Error(
        errorData.message || `Medusa API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return {
      data: data as T,
      status: response.status,
      headers: response.headers,
      etag,
    };
  } catch (error) {
    console.error('[medusaFetch] Error:', error);
    throw error;
  }
}

/**
 * Helper to build pagination cursor from Medusa response
 */
export function extractPaginationFromMedusa(
  medusaResponse: {
    offset?: number;
    limit?: number;
    count?: number;
  }
): {
  nextCursor?: string;
  prevCursor?: string;
  total: number;
} {
  const { offset = 0, limit = 20, count = 0 } = medusaResponse;

  const hasNext = offset + limit < count;
  const hasPrev = offset > 0;

  return {
    nextCursor: hasNext ? String(offset + limit) : undefined,
    prevCursor: hasPrev ? String(Math.max(0, offset - limit)) : undefined,
    total: count,
  };
}

/**
 * Generate ETag from data (simple hash)
 * For production, consider using a proper hash function
 */
export function generateETag(data: unknown): string {
  const content = JSON.stringify(data);
  // Simple hash for demo - in production use crypto.subtle.digest or similar
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `"${Math.abs(hash).toString(36)}"`;
}
