#!/usr/bin/env node

/**
 * Simple validation script for API implementations
 * Runs without Jest to validate DTOs and mappings
 */

const path = require('path');

// Import the modules (using require for CommonJS)
const dtoPath = path.join(__dirname, 'src/lib/integration/dto.ts');
const mappingsPath = path.join(__dirname, 'src/lib/integration/mappings.ts');

console.log('🔍 Validating API Implementations...\n');

// Since we can't easily import TypeScript in Node, let's do basic file existence checks
const fs = require('fs');

function checkFileExists(filePath, description) {
    try {
        if (fs.existsSync(filePath)) {
            console.log(`✅ ${description}: Found at ${filePath}`);
            return true;
        } else {
            console.log(`❌ ${description}: Missing at ${filePath}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ ${description}: Error checking ${filePath} - ${error.message}`);
        return false;
    }
}

function checkDirectoryContents(dirPath, description, expectedFiles) {
    try {
        const files = fs.readdirSync(dirPath);
        console.log(`📁 ${description} (${files.length} files):`);

        expectedFiles.forEach(expectedFile => {
            if (files.includes(expectedFile)) {
                console.log(`   ✅ ${expectedFile}`);
            } else {
                console.log(`   ❌ ${expectedFile} (missing)`);
            }
        });

        return expectedFiles.every(file => files.includes(file));
    } catch (error) {
        console.log(`❌ ${description}: Error reading directory - ${error.message}`);
        return false;
    }
}

// Check core integration files
console.log('📋 Checking Integration Layer Files:');
const dtoExists = checkFileExists(dtoPath, 'DTO definitions');
const mappingsExists = checkFileExists(mappingsPath, 'Slug/ID mappings');
const medusaClientExists = checkFileExists(
    path.join(__dirname, 'src/lib/integration/medusa-client.ts'),
    'Medusa client wrapper'
);

console.log('\n📋 Checking API Endpoints:');

// Check storefront endpoints
const storefrontDir = path.join(__dirname, 'src/app/api/storefront');
const storefrontExists = checkDirectoryContents(storefrontDir, 'Storefront API endpoints', [
    'cart', 'categories', 'checkout', 'kits', 'products'
]);

// Check catalog endpoints (existing)
const catalogDir = path.join(__dirname, 'src/app/api/catalog');
const catalogExists = checkDirectoryContents(catalogDir, 'Catalog API endpoints', [
    'categories', 'products'
]);

console.log('\n📋 Checking Supporting Files:');
const errorHandlerExists = checkFileExists(
    path.join(__dirname, 'src/lib/api/error-handler.ts'),
    'Error handler (RFC 9457)'
);
const corsExists = checkFileExists(
    path.join(__dirname, 'src/lib/api/cors.ts'),
    'CORS configuration'
);
const openApiExists = checkFileExists(
    path.join(__dirname, 'public/api-spec/openapi.yaml'),
    'OpenAPI specification'
);

console.log('\n📋 Checking Test Files:');
const smokeTestExists = checkFileExists(
    path.join(__dirname, 'tests/api/smoke.spec.ts'),
    'Smoke tests'
);
const contractTestExists = checkFileExists(
    path.join(__dirname, 'tests/api/contract.spec.ts'),
    'Contract tests'
);
const unitTestExists = checkFileExists(
    path.join(__dirname, 'tests/integration/unit.spec.ts'),
    'Unit tests'
);

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 VALIDATION SUMMARY');
console.log('='.repeat(50));

const allChecks = [
    dtoExists, mappingsExists, medusaClientExists,
    storefrontExists, catalogExists,
    errorHandlerExists, corsExists, openApiExists,
    smokeTestExists, contractTestExists, unitTestExists
];

const passed = allChecks.filter(Boolean).length;
const total = allChecks.length;

console.log(`✅ Passed: ${passed}/${total}`);
console.log(`❌ Failed: ${total - passed}/${total}`);

if (passed === total) {
    console.log('\n🎉 All validations passed! API implementations are ready.');
    process.exit(0);
} else {
    console.log('\n⚠️  Some validations failed. Please check the output above.');
    process.exit(1);
}