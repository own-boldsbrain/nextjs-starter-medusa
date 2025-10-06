/**
 * RFC 9457 - Problem Details for HTTP APIs
 * https://www.rfc-editor.org/rfc/rfc9457.html
 * 
 * Replaces RFC 7807 (obsolete)
 * Media type: application/problem+json
 */

export interface ProblemDetails {
    type: string; // URI reference identifying the problem type
    title: string; // Short, human-readable summary
    status: number; // HTTP status code
    detail?: string; // Human-readable explanation
    instance?: string; // URI reference identifying the specific occurrence
    errors?: Array<{
        path?: string;
        message: string;
        [key: string]: unknown;
    }>;
    [key: string]: unknown; // Extension members allowed
}

/**
 * Creates a Problem Details response (RFC 9457)
 * 
 * @param status HTTP status code
 * @param type URI identifying the problem type
 * @param title Short summary
 * @param detail Detailed explanation (optional)
 * @param instance URI of the specific occurrence (optional)
 * @param errors Validation errors array (optional)
 * @returns Response with application/problem+json
 */
export function problemJson(
    status: number,
    type: string,
    title: string,
    detail?: string,
    instance?: string,
    errors?: Array<{ path?: string; message: string }>
): Response {
    const problem: ProblemDetails = {
        type,
        title,
        status,
    };

    if (detail) {
        problem.detail = detail;
    }

    if (instance) {
        problem.instance = instance;
    }

    if (errors && errors.length > 0) {
        problem.errors = errors;
    }

    return new Response(JSON.stringify(problem), {
        status,
        headers: {
            'Content-Type': 'application/problem+json',
        },
    });
}

/**
 * Common problem types for Yello Solar Hub
 */
export const ProblemTypes = {
    VALIDATION: 'https://yello.solar/errors/validation',
    NOT_FOUND: 'https://yello.solar/errors/not-found',
    INTERNAL: 'https://yello.solar/errors/internal',
    UNAUTHORIZED: 'https://yello.solar/errors/unauthorized',
    FORBIDDEN: 'https://yello.solar/errors/forbidden',
    CONFLICT: 'https://yello.solar/errors/conflict',
    RATE_LIMIT: 'https://yello.solar/errors/rate-limit',
} as const;
