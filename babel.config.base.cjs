// Shared Babel configuration (used by babel-jest). Packages that render JSX
// pass { react: true } to add @babel/preset-react.
module.exports = ({ react = false } = {}) => ({
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ...(react ? ["@babel/preset-react"] : []),
    "@babel/preset-typescript",
  ],
});
