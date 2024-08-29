module.exports = {
  // 继承eslint官方推荐规则
  extends: ["eslint:recommended"],
  env: {
    node: true,//启用node中的全局变量
    browser: true,//启用浏览器中的全局变量
    es6: true,
  },
  // 解析选项
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    "no-var": 2, //禁止使用var
    "no-debugger": 1,
    "no-unused-vars": 1,
  }
}