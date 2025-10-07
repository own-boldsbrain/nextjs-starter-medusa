/**
 * Jest Setup
 *
 * Global setup for all tests
 */

import { jest } from '@jest/globals';

// Mock fetch for API tests
(global as any).fetch = jest.fn();

// Mock environment variables
process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL = 'http://localhost:9000';
process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY = 'test-key';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';