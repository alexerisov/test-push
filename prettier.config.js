module.exports = {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'none',
  jsxBracketSameLine: true,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.json',
      options: { parser: 'json' }
    },
    {
      files: '*.scss',
      options: {
        printWidth: 100,
        parser: 'scss',
        tabWidth: 4,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true
      }
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      options: {
        parser: 'babel-ts',
        semi: true,
        tabWidth: 2,
        printWidth: 120,
        singleQuote: true,
        trailingComma: 'none',
        jsxBracketSameLine: true,
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'lf'
      }
    }
  ]
};
