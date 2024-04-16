# Custom git hooks

## Write a git hook file

Add a git hook file in this directory for any of the following:

```text
applypatch-msg
commit-msg
post-update
pre-applypatch
pre-commit
pre-merge-commit
pre-push
pre-rebase
pre-receive
prepare-commit-msg
push-to-checkout
update
```

For example:

`pre-commit`

```text
npm run fix
npm run test
```

## Wire up the hook

Create a hook that git will call. This should go in `.githooks`

Example:

```text
#!/bin/sh
. "${0%/*}/../scripts/githooks/pre-commit"
```

Make sure it's executable:

```text
chmod +x .githooks/pre-commit
```

That's it!
