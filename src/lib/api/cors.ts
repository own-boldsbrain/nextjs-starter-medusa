/**
 * CORS Headers Configuration
 * 
 * MDN CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 * RFC 9110 - HTTP Semantics (Vary header): https://www.rfc-editor.org/rfc/rfc9110.html#name-vary
 */

/**
 * Returns CORS headers for API responses
 * 
 * NOTE: Adjust origin based on environment
 * - Development: Allow all origins (*)
 * - Production: Specific domain or dynamic based on request Origin header
 */
export function corsHeaders(): Record<string, string> {
    const allowedOrigin = process.env.CORS_ORIGIN || '*';

    return {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-publishable-api-key',
        'Access-Control-Max-Age': '86400', // 24 hours preflight cache
        // RFC 9110: Vary header indicates response varies based on Origin
        'Vary': 'Origin',
    };
}

/**
 * Returns CORS headers for preflight OPTIONS requests
 */
export function preflightHeaders(): Record<string, string> {
    return {
        ...corsHeaders(),
        'Access-Control-Allow-Credentials': 'true',
    };
}
