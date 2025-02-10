/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  globalSetup: "./test/setup/global-setup.ts",
  globalTeardown: "./test/setup/global-teardown.ts",
  testMatch: ["**/?(*.)+(spec|test).ts"],
  moduleDirectories: ['node_modules', 'src'], 
  collectCoverage: true, 
};
