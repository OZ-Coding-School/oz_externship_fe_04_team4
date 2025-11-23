const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 사용할 type만 허용 (type은 영어 소문자로 유지)
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'chore',
        'refactor',
        'style',
        'docs',
        'test',
        'ci',
        'build',
        'perf',
        'revert',
      ],
    ],
    // 제목 길이 제한 (원하면 조절)
    'header-max-length': [2, 'always', 100],
  },
}

export default config
