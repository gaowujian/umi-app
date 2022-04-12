module.exports = {
  extends: [require.resolve("@umijs/fabric/dist/eslint")],
  rules: {
    // your rules
    "@typescript-eslint/no-unused-vars": "warn",
    "react/no-array-index-key": "off",
  },
};
