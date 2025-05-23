// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // ✅ Only allow these commit types
    'type-enum': [
      2,
      'always',
      [
        'feat', // new feature
        'fix', // bug fix
        'docs', // documentation
        'style', // formatting (no code change)
        'refactor', // code improvement (no feature or fix)
        'test', // adding or fixing tests
        'chore', // build tasks, package updates
        'build', // changes that affect the build
        'ci', // CI-related changes
        'revert', // reverting changes
      ],
    ],

    // ✅ Don't allow subject to start with capital letter
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],

    // ✅ Don't allow a period at the end of subject
    'subject-full-stop': [2, 'never', '.'],

    // ✅ Maximum header length = 150 characters
    'header-max-length': [2, 'always', 150],
  },
};
