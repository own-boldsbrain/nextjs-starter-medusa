/**
 * Version Information Endpoint
 * GET /api/version
 * 
 * Returns build and version information
 */

export async function GET() {
    const version = {
        version: '1.0.0',
        commit: process.env.VERCEL_GIT_COMMIT_SHA || 'dev',
        builtAt: process.env.BUILD_TIME || new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    };

    return new Response(JSON.stringify(version), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
