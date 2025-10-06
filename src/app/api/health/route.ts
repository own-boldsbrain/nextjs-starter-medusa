/**
 * Health Check Endpoint
 * GET /api/health
 * 
 * Returns system health status
 * RFC 9110 - HTTP Semantics
 */

export async function GET() {
    const health = {
        ok: true,
        timestamp: new Date().toISOString(),
        service: 'yello-solar-hub-storefront',
        version: '1.0.0',
    };

    return new Response(JSON.stringify(health), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
    });
}
