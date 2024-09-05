module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/**/*.test.ts'],
    globalTeardown: '<rootDir>/tests/theTerminator.ts',
  };