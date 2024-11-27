/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testMatch: ['<rootDir>/tests/**'],
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};