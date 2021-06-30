module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch: [
    // '**/__tests__/**/*.(js|jsx|ts|tsx)'
    '**/__tests__/integration/*.(js|jsx|ts|tsx)'
  ],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**']
}
