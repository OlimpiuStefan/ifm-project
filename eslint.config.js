// The gate. Every rule here is something the room got wrong first:
// that is the only justification a blocking lint rule ever has.
export default [
  {
    files: ['**/*.js'],
    languageOptions: { ecmaVersion: 2024, sourceType: 'module' },
    rules: {
      // Block 02, including the one exception we agreed on.
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      // Block 14, `catch (e) {}` is error hiding, not error handling.
      'no-empty': ['error', { allowEmptyCatch: false }],
      // Block 14, a `return` inside `finally` throws the error away.
      'no-unsafe-finally': 'error',

      // Block 04 / Liberty Lab 06, `var` is function-scoped and hoisted.
      'no-var': 'error',
      'prefer-const': 'error',

      // Block 09, an async function that never awaits is a smell.
      'require-await': 'error',

      // Block 15, never build code out of data.
      'no-eval': 'error',
      'no-implied-eval': 'error',

      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  { ignores: ['hosts/second/wwwroot/**', 'hosts/second/app/**', 'node_modules/**', 'dist/**'] },
];
