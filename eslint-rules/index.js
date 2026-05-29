"use strict";

/**
 * Local ESLint plugin: `softree-design`
 *
 * Houses the homepage Design_Tokens enforcement rule. Registered in
 * `eslint.config.mjs` and scoped to homepage section directories.
 */

const noUntokenizedDesignLiterals = require("./no-untokenized-design-literals");

module.exports = {
    rules: {
        "no-untokenized-design-literals": noUntokenizedDesignLiterals,
    },
};
