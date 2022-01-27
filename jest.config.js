// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "^@pages/(.*)$": "<rootDir>/pages/$1",
  },
  // testRegex: "<rootDir>/__tests__/**/*",
  testMatch: ["<rootDir>/__tests__/**/*.test.(ts)?x"],
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
