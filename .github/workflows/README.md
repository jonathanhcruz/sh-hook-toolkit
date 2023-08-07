### Testing in pull request

When a pull request is created, editing, tests are automatically run. If any tests fail, the pull request is halted. This checking is  implementation  `actions/checkout@v3`

`secrets.GITHUB_TOKEN` This is an environment variable that does not need configuration.

```yaml
steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          title-regex: "#[eE][xX]-[0-9]+"
          on-failed-regex-fail-action: false
          on-failed-regex-request-changes: false
          on-failed-regex-create-review: true
          on-failed-regex-comment:
            "something went wrong: `%regex%`!"
          on-succeeded-regex-dismiss-review-comment:
            "Done, Success!"
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
      - run: npm install
      - run: npm run test
```

### Automatic Releases

```yaml
steps:
      - uses: release-drafter/release-drafter@v5
        with:
          config-name: config/relese-config.yml
          disable-autolabeler: true
          publish: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

```yaml
name-template: 'v$RESOLVED_VERSION'
tag-template: '$RESOLVED_VERSION'
change-template: '- $TITLE @$AUTHOR (#$NUMBER)'
commitish: 'main'
template: |
  ## What’s Changed
  $CHANGES
categories:
  - title: '🎊 Features'
    labels:
      - 'feature'
      - 'feat'
  - title: '🐞 Bug Fixes'
    labels:
      - 'fix'
  - title: '🛠️ Refactor'
    labels:
      - 'refactor'
      - 'style'
  - title: '🖋️ Maintenance'
    labels:
      - 'chore'
      - 'ci'
  - title: '📝 Docs/Test'
    labels:
      - 'docs'
      - 'test'
version-resolver:
  major:
    labels:
      - 'major'
  minor:
    labels:
      - 'minor'
  patch:
    labels:
      - 'patch'
  default: patch
```

### Publish

```yaml
build-project:
    needs: update_release_draft
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm i
      - run: npm run build
```

```yaml
publish-npm:
    needs: build-project
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          registry-url: https://registry.npmjs.org/
      - run: npm ci
      - run: npm publish 
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```