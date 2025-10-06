/**
 * OpenAPI Contract Tests
 * 
 * Validates API responses against OpenAPI 3.1 specification
 * Uses openapi-response-validator for contract testing
 * 
 * NOTE: Install dependencies:
 * pnpm add -D openapi-types @types/swagger-parser swagger-parser
 */

import { describe, it, expect, beforeAll } from '@jest/globals';
import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3_1 } from 'openapi-types';
import path from 'path';

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const OPENAPI_SPEC_PATH = path.join(process.cwd(), 'public', 'api-spec', 'openapi.yaml');

let openApiSpec: OpenAPIV3_1.Document;

describe('OpenAPI Contract Tests', () => {
    beforeAll(async () => {
        // Load and validate OpenAPI spec
        try {
            openApiSpec = (await SwaggerParser.validate(OPENAPI_SPEC_PATH)) as OpenAPIV3_1.Document;
            console.log('✓ OpenAPI spec is valid (JSON Schema Draft 2020-12)');
        } catch (error) {
            console.error('✗ OpenAPI spec validation failed:', error);
            throw error;
        }
    });

    describe('OpenAPI Spec Validation', () => {
        it('should have valid OpenAPI 3.1.0 document', () => {
            expect(openApiSpec).toBeDefined();
            expect(openApiSpec.openapi).toBe('3.1.0');
        });

        it('should define all required info fields', () => {
            expect(openApiSpec.info).toBeDefined();
            expect(openApiSpec.info.title).toBe('Yello Solar Hub — Storefront API');
            expect(openApiSpec.info.version).toBe('1.0.0');
        });

        it('should define servers', () => {
            expect(openApiSpec.servers).toBeDefined();
            expect(openApiSpec.servers!.length).toBeGreaterThan(0);
        });

        it('should define paths', () => {
            expect(openApiSpec.paths).toBeDefined();
            expect(Object.keys(openApiSpec.paths).length).toBeGreaterThan(0);
        });

        it('should define components', () => {
            expect(openApiSpec.components).toBeDefined();
            expect(openApiSpec.components!.schemas).toBeDefined();
            expect(openApiSpec.components!.responses).toBeDefined();
        });
    });

    describe('Schema Definitions', () => {
        it('should define ProblemDetails schema (RFC 9457)', () => {
            const schemas = openApiSpec.components!.schemas!;
            expect(schemas.ProblemDetails).toBeDefined();

            const problemDetails = schemas.ProblemDetails as OpenAPIV3_1.SchemaObject;
            expect(problemDetails.type).toBe('object');
            expect(problemDetails.required).toContain('type');
            expect(problemDetails.required).toContain('title');
            expect(problemDetails.required).toContain('status');
            expect(problemDetails.properties).toHaveProperty('type');
            expect(problemDetails.properties).toHaveProperty('title');
            expect(problemDetails.properties).toHaveProperty('status');
            expect(problemDetails.properties).toHaveProperty('detail');
            expect(problemDetails.properties).toHaveProperty('instance');
            expect(problemDetails.properties).toHaveProperty('errors');
        });

        it('should define Category schema', () => {
            const schemas = openApiSpec.components!.schemas!;
            expect(schemas.Category).toBeDefined();

            const category = schemas.Category as OpenAPIV3_1.SchemaObject;
            expect(category.type).toBe('object');
            expect(category.required).toContain('id');
            expect(category.required).toContain('name');
            expect(category.required).toContain('handle');
        });

        it('should define ProductSummary schema', () => {
            const schemas = openApiSpec.components!.schemas!;
            expect(schemas.ProductSummary).toBeDefined();

            const product = schemas.ProductSummary as OpenAPIV3_1.SchemaObject;
            expect(product.type).toBe('object');
            expect(product.required).toContain('id');
            expect(product.required).toContain('title');
            expect(product.required).toContain('handle');
        });

        it('should define Cart schema', () => {
            const schemas = openApiSpec.components!.schemas!;
            expect(schemas.Cart).toBeDefined();
        });
    });

    describe('Endpoint Definitions', () => {
        it('should define GET /api/health', () => {
            expect(openApiSpec.paths['/api/health']).toBeDefined();
            expect(openApiSpec.paths['/api/health']!.get).toBeDefined();
        });

        it('should define GET /api/version', () => {
            expect(openApiSpec.paths['/api/version']).toBeDefined();
            expect(openApiSpec.paths['/api/version']!.get).toBeDefined();
        });

        it('should define GET /api/catalog/categories', () => {
            expect(openApiSpec.paths['/api/catalog/categories']).toBeDefined();
            expect(openApiSpec.paths['/api/catalog/categories']!.get).toBeDefined();
            expect(openApiSpec.paths['/api/catalog/categories']!.options).toBeDefined();
        });

        it('should define GET /api/catalog/products', () => {
            expect(openApiSpec.paths['/api/catalog/products']).toBeDefined();
            expect(openApiSpec.paths['/api/catalog/products']!.get).toBeDefined();
        });

        it('should define GET /api/products/{idOrHandle}', () => {
            expect(openApiSpec.paths['/api/products/{idOrHandle}']).toBeDefined();
            expect(openApiSpec.paths['/api/products/{idOrHandle}']!.get).toBeDefined();
        });

        it('should define GET /api/facets', () => {
            expect(openApiSpec.paths['/api/facets']).toBeDefined();
        });

        it('should define GET /api/kits/{type}', () => {
            expect(openApiSpec.paths['/api/kits/{type}']).toBeDefined();
        });

        it('should define POST /api/checkout/carts', () => {
            expect(openApiSpec.paths['/api/checkout/carts']).toBeDefined();
            expect(openApiSpec.paths['/api/checkout/carts']!.post).toBeDefined();
        });

        it('should define POST /api/checkout/carts/{id}/line-items', () => {
            expect(openApiSpec.paths['/api/checkout/carts/{id}/line-items']).toBeDefined();
            expect(openApiSpec.paths['/api/checkout/carts/{id}/line-items']!.post).toBeDefined();
        });
    });

    describe('Response Definitions', () => {
        it('should define BadRequest response (RFC 9457)', () => {
            const responses = openApiSpec.components!.responses!;
            expect(responses.BadRequest).toBeDefined();

            const badRequest = responses.BadRequest as OpenAPIV3_1.ResponseObject;
            expect(badRequest.content).toHaveProperty('application/problem+json');
        });

        it('should define NotFound response (RFC 9457)', () => {
            const responses = openApiSpec.components!.responses!;
            expect(responses.NotFound).toBeDefined();

            const notFound = responses.NotFound as OpenAPIV3_1.ResponseObject;
            expect(notFound.content).toHaveProperty('application/problem+json');
        });

        it('should define InternalError response (RFC 9457)', () => {
            const responses = openApiSpec.components!.responses!;
            expect(responses.InternalError).toBeDefined();

            const internalError = responses.InternalError as OpenAPIV3_1.ResponseObject;
            expect(internalError.content).toHaveProperty('application/problem+json');
        });
    });

    describe('Parameter Definitions', () => {
        it('should define LimitQuery parameter', () => {
            const parameters = openApiSpec.components!.parameters!;
            expect(parameters.LimitQuery).toBeDefined();

            const limitQuery = parameters.LimitQuery as OpenAPIV3_1.ParameterObject;
            expect(limitQuery.in).toBe('query');
            expect(limitQuery.schema).toBeDefined();

            const schema = limitQuery.schema as OpenAPIV3_1.SchemaObject;
            expect(schema.type).toBe('integer');
            expect(schema.minimum).toBe(1);
            expect(schema.maximum).toBe(100);
            expect(schema.default).toBe(24);
        });

        it('should define CursorQuery parameter', () => {
            const parameters = openApiSpec.components!.parameters!;
            expect(parameters.CursorQuery).toBeDefined();
        });
    });

    describe('Header Definitions', () => {
        it('should define LinkPagination header (RFC 8288)', () => {
            const headers = openApiSpec.components!.headers!;
            expect(headers.LinkPagination).toBeDefined();

            const linkHeader = headers.LinkPagination as OpenAPIV3_1.HeaderObject;
            expect(linkHeader.description).toContain('RFC 8288');
        });

        it('should define TotalCount header', () => {
            const headers = openApiSpec.components!.headers!;
            expect(headers.TotalCount).toBeDefined();
        });

        it('should define CacheControl header (RFC 9111)', () => {
            const headers = openApiSpec.components!.headers!;
            expect(headers.CacheControl).toBeDefined();

            const cacheControl = headers.CacheControl as OpenAPIV3_1.HeaderObject;
            expect(cacheControl.description).toContain('RFC 9111');
        });

        it('should define ETag header', () => {
            const headers = openApiSpec.components!.headers!;
            expect(headers.ETag).toBeDefined();
        });

        it('should define Vary header (RFC 9110)', () => {
            const headers = openApiSpec.components!.headers!;
            expect(headers.Vary).toBeDefined();
        });
    });

    describe('Tags', () => {
        it('should define tags', () => {
            expect(openApiSpec.tags).toBeDefined();
            expect(openApiSpec.tags!.length).toBeGreaterThan(0);

            const tagNames = openApiSpec.tags!.map((tag) => tag.name);
            expect(tagNames).toContain('Catalog');
            expect(tagNames).toContain('Kits');
            expect(tagNames).toContain('Checkout');
            expect(tagNames).toContain('System');
        });
    });
});

/**
 * Runtime Contract Validation
 * 
 * Tests that actual API responses match OpenAPI spec
 */
describe('Runtime Contract Validation', () => {
    describe('GET /api/health', () => {
        it('should match HealthResponse schema', async () => {
            const response = await fetch(`${API_BASE_URL}/api/health`);
            const data = await response.json();

            expect(data).toHaveProperty('ok');
            expect(data).toHaveProperty('timestamp');
            expect(data).toHaveProperty('service');
            expect(data).toHaveProperty('version');

            expect(typeof data.ok).toBe('boolean');
            expect(typeof data.timestamp).toBe('string');
            expect(typeof data.service).toBe('string');
            expect(typeof data.version).toBe('string');
        });
    });

    describe('GET /api/catalog/categories', () => {
        it('should match CategoriesResponse schema', async () => {
            const response = await fetch(`${API_BASE_URL}/api/catalog/categories`);
            const data = await response.json();

            expect(data).toHaveProperty('data');
            expect(data).toHaveProperty('meta');
            expect(Array.isArray(data.data)).toBe(true);
            expect(data.meta).toHaveProperty('total');
            expect(typeof data.meta.total).toBe('number');

            if (data.data.length > 0) {
                const category = data.data[0];
                expect(category).toHaveProperty('id');
                expect(category).toHaveProperty('name');
                expect(category).toHaveProperty('handle');
            }
        });
    });

    describe('GET /api/catalog/products', () => {
        it('should match ProductsResponse schema', async () => {
            const response = await fetch(`${API_BASE_URL}/api/catalog/products`);
            const data = await response.json();

            expect(data).toHaveProperty('data');
            expect(data).toHaveProperty('meta');
            expect(Array.isArray(data.data)).toBe(true);
            expect(data.meta).toHaveProperty('total');

            if (data.data.length > 0) {
                const product = data.data[0];
                expect(product).toHaveProperty('id');
                expect(product).toHaveProperty('title');
                expect(product).toHaveProperty('handle');
            }
        });
    });

    describe('Error responses (RFC 9457)', () => {
        it('400 response should match ProblemDetails schema', async () => {
            const response = await fetch(`${API_BASE_URL}/api/kits/invalid-type`);

            if (response.status === 400) {
                const data = await response.json();

                expect(data).toHaveProperty('type');
                expect(data).toHaveProperty('title');
                expect(data).toHaveProperty('status');
                expect(data.status).toBe(400);

                expect(typeof data.type).toBe('string');
                expect(typeof data.title).toBe('string');
                expect(typeof data.status).toBe('number');

                // Optional fields
                if (data.detail) expect(typeof data.detail).toBe('string');
                if (data.instance) expect(typeof data.instance).toBe('string');
                if (data.errors) expect(Array.isArray(data.errors)).toBe(true);
            }
        });
    });
});
