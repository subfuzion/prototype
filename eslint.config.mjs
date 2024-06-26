import stylisticJs from "@stylistic/eslint-plugin-js";
import stylisticJsx from "@stylistic/eslint-plugin-jsx";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default [
    eslintPluginPrettier,
    {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    },
    {
    /**
     * node_modules and .git are the only default ignore patterns.
     * See: https://eslint.org/docs/latest/use/configure/ignore#ignoring-files
     * The following ensures any dot-directory gets ignored.
     */
        ignores: [
            ".*/",
            "build/",
            "coverage/",
            "dist/",
            "scratch/",
        ],
    },
    {
        plugins: {

            // See: https://eslint.style/packages/js#rules
            "@stylistic/js": stylisticJs,

            // See: https://eslint.style/packages/jsx#rules
            "@stylistic/jsx": stylisticJsx,
        },
        rules: {
            "no-restricted-syntax":                           [2, "Literal[raw='null']"],
            "@stylistic/js/array-bracket-newline":            [2, "consistent"],
            "@stylistic/js/array-bracket-spacing":            [2, "never"],
            "@stylistic/js/array-element-newline":            [2, "consistent"],
            "@stylistic/js/arrow-parens":                     [2, "as-needed", {requireForBlockBody: true}],
            "@stylistic/js/arrow-spacing":                    [2],
            "@stylistic/js/block-spacing":                    [2],
            "@stylistic/js/brace-style":                      [2, "stroustrup", {allowSingleLine: true}],
            "@stylistic/js/comma-dangle":                     [2, "always-multiline"],
            "@stylistic/js/comma-spacing":                    [2, {after: true}],
            "@stylistic/js/computed-property-spacing":        [2, "never"],
            "@stylistic/js/dot-location":                     [2, "object"],
            "@stylistic/js/eol-last":                         [2, "always"],
            "@stylistic/js/function-call-argument-newline":   [2, "consistent"],
            "@stylistic/js/function-call-spacing":            [2, "never"],
            "@stylistic/js/function-paren-newline":           [2, "consistent"],
            "@stylistic/js/generator-star-spacing":           [2, {before: true, after: false}],
            "@stylistic/js/implicit-arrow-linebreak":         [2, "beside"],
            "@stylistic/js/indent":                           [2, 4],
            "@stylistic/js/jsx-quotes":                       [2, "prefer-double"],
            "@stylistic/js/key-spacing":                      [2, {singleLine: {beforeColon: false, afterColon: true}, multiLine: {beforeColon: false, afterColon: true, align: "value"}}],
            "@stylistic/js/keyword-spacing":                  [2],
            "@stylistic/js/linebreak-style":                  [2, "unix"],
            "@stylistic/js/lines-around-comment":             [2, {beforeLineComment: true, beforeBlockComment: false, allowBlockStart: true, allowBlockEnd: true}],
            "@stylistic/js/max-len":                          [2, {code: 80, comments: 80, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreRegExpLiterals: true}],
            "@stylistic/js/max-statements-per-line":          [2, {max: 2}],
            "@stylistic/js/multiline-ternary":                [2, "always-multiline"],
            "@stylistic/js/new-parens":                       [2, "always"],
            "@stylistic/js/newline-per-chained-call":         [2],
            "@stylistic/js/no-confusing-arrow":               [0],
            "@stylistic/js/no-extra-parens":                  [2, "all", {nestedBinaryExpressions: false}],
            "@stylistic/js/no-extra-semi":                    [2],
            "@stylistic/js/no-floating-decimal":              [2],
            "@stylistic/js/no-mixed-operators":               [2],
            "@stylistic/js/no-mixed-spaces-and-tabs":         [2],
            "@stylistic/js/no-multi-spaces":                  [2],
            "@stylistic/js/no-multiple-empty-lines":          [2],
            "@stylistic/js/no-tabs":                          [2],
            "@stylistic/js/no-trailing-spaces":               [2],
            "@stylistic/js/no-whitespace-before-property":    [2],
            "@stylistic/js/nonblock-statement-body-position": [2],
            "@stylistic/js/object-curly-newline":             [2, {consistent: true}],
            "@stylistic/js/object-curly-spacing":             [2, "never"],
            "@stylistic/js/object-property-newline":          [2, {allowAllPropertiesOnSameLine: true}],
            "@stylistic/js/one-var-declaration-per-line":     [2, "initializations"],
            "@stylistic/js/operator-linebreak":               [2, "before"],
            "@stylistic/js/padded-blocks":                    [2, {blocks: "never"}],
            "@stylistic/js/quote-props":                      [2, "as-needed"],
            "@stylistic/js/quotes":                           [2, "double", {avoidEscape: true, allowTemplateLiterals: true}],
            "@stylistic/js/rest-spread-spacing":              [2, "never"],
            "@stylistic/js/semi":                             [2, "always", {omitLastInOneLineBlock: true, omitLastInOneLineClassBody: true}],
            "@stylistic/js/semi-spacing":                     [2, {before: false, after: true}],
            "@stylistic/js/semi-style":                       [2, "last"],
            "@stylistic/js/space-before-blocks":              [2, "always"],
            "@stylistic/js/space-before-function-paren":      [2, {anonymous: "always", named: "never", asyncArrow: "always"}],
            "@stylistic/js/space-in-parens":                  [2, "never"],
            "@stylistic/js/space-infix-ops":                  [2, {int32Hint: false}],
            "@stylistic/js/space-unary-ops":                  [2, {words: true, nonwords: false}],
            "@stylistic/js/spaced-comment":                   [2, "always"],
            "@stylistic/js/switch-colon-spacing":             [2],
            "@stylistic/js/template-curly-spacing":           [2],
            "@stylistic/js/template-tag-spacing":             [2],
            "@stylistic/js/wrap-iife":                        [2, "inside"],
            "@stylistic/js/wrap-regex":                       [2],
            "@stylistic/js/yield-star-spacing":               [2, "before"],
        },
    },
];
