
// jest.config.cjs
module.exports = {
  testEnvironment: "node",
  // treat TS as ESM so imports behave like in your app
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: ["js", "ts", "json", "node"],

  // Match *.test.ts in __tests__ folders or anywhere
  testMatch: ["**/__tests__/**/*.test.(ts|js)", "**/?(*.)+(test).(ts|js)"],

  // Transform TypeScript using ts-jest in ESM mode
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.json"
      }
    ]
  },

  // Optional: clear mocks between tests
  clearMocks: true
};
