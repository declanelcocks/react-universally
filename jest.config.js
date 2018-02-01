module.exports = {
  collectCoverageFrom: ['shared/**/*.{js,jsx}'],
  setupFiles: ['<rootDir>/internal/jest/setupFile.js'],
  snapshotSerializers: ['<rootDir>/node_modules/enzyme-to-json/serializer'],
  testPathIgnorePatterns: [
    '<rootDir>/(build|internal|node_modules|flow-typed|public)/',
  ],
}
