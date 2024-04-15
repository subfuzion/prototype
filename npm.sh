# This script is meant to be sourced into a bash shell, not run as a script. You
# can source it in bash by running the dot command or its synonym (source).
#
#   . npm.sh
#   source npm.sh
#
#  You can restore your original shell environment by running the following:
#
#   restore
#

menu() {
cat <<-EOF
Commands:

  dev                run development server
  build              build production bundle
  preview            run preview server using production bundle

  clean              remove build artifacts
  clean:all          remove build artifacts and delete node_modules

  jest               run jest tests
  jest:w :watch      run jest tests and watch for changes
  jest:v :verbose    run jest tests with verbose output (includes console.log)
  jest:vw :wv        run jest tests with verbose output and watch for changes

  outdated           list outdated dependencies in package.json
  run-script         like this, but list all scripts in package.json

  npm		     shortcut for \`npm run\` (like pnpm)

  restore            restore your shell environment (remove these commands)

EOF
}

alias npm="\npm run"
alias outdated="\npm --loglevel=notice outdated"
alias run-script="\npm --loglevel=notice run-script"

alias check="\npm run check"
alias fix="\npm run fix"

alias dev="\npm run dev"
alias clean="\npm run clean"
alias clean:all="\npm run clean:all"
alias build="\npm --loglevel=notice run astro:build"
alias preview="\npm --loglevel=notice run astro:preview"

alias jest="\npm run test"
alias jest:w="\npm run test:w"
alias jest:watch="\npm run test:w"
alias jest:v="\npm run test:v"
alias jest:verbose="\npm run test:v"
alias jest:vw="\npm run test:vw"
alias jest:wv="\npm run test:vw"

restore() {
  unalias npm >/dev/null
  unalias outdated >/dev/null
  unalias run-script >/dev/null

  unalias check >/dev/null
  unalias fix >/dev/null

  unalias dev >/dev/null
  unalias clean >/dev/null
  unalias clean:all >/dev/null
  unalias build >/dev/null
  unalias preview >/dev/null

  unalias jest >/dev/null
  unalias jest:w >/dev/null
  unalias jest:watch >/dev/null
  unalias jest:v >/dev/null
  unalias jest:verbose >/dev/null
  unalias jest:vw >/dev/null
  unalias jest:wv >/dev/null

  unset -f menu >/dev/null
  unset -f restore >/dev/null
}
