module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/specs/**/*.spec.js'],
  globals: {
    testTimeout: 50000,
  },
  verbose: true,
};
