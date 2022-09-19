module.exports = {
  testMatch: ['**/*.spec.js'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1'
  },
  preset: '@shelf/jest-mongodb'
}
