const { pathsToModuleNameMapper } = require("ts-jest")
const { compilerOptions } = require("./tsconfig.json")

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/**/*.test.ts"],
    testPathIgnorePatterns: ["/node_modules/"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
        prefix: "<rootDir>/",
    }),
    collectCoverage: true,
    setupFiles: ["<rootDir>/__tests__/jest.setup.ts"],
}
