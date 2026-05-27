"use strict";

/**
 * Smoke verification for `no-untokenized-design-literals`.
 *
 * Runs the rule against a hand-rolled set of valid/invalid JSX snippets
 * via ESLint's `RuleTester`. This is a pure-Node script so it can be
 * invoked without pulling in a JS test framework.
 *
 * Usage:  node eslint-rules/__smoke__/smoke.test.js
 */

const path = require("path");
const { RuleTester } = require("eslint");
const rule = require("../no-untokenized-design-literals");

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        parserOptions: {
            ecmaFeatures: { jsx: true },
        },
    },
});

ruleTester.run("no-untokenized-design-literals", rule, {
    valid: [
        // 1. <section> with allowed canvas surface
        {
            code: 'const A = () => <section className="bg-[#FFFFFF] py-20"/>;',
        },
        // 2. <section> with #F8F9FC inline style
        {
            code:
                'const A = () => <section style={{ background: "#F8F9FC" }}/>;',
        },
        // 3. Allowed accent in a button (not a section bg)
        {
            code: 'const A = () => <button className="bg-[#FF6B00]"/>;',
        },
        // 4. Allowed foreground text token
        {
            code: 'const A = () => <p className="text-[#0a0a1a]"/>;',
        },
        // 5. Tuple ease imported from motion (no inline cubic-bezier)
        {
            code:
                'import { EASE } from "@/lib/motion";\n' +
                'const t = { ease: EASE.silk };',
        },
        // 6. prefersReducedMotion helper, not raw matchMedia
        {
            code:
                'import { prefersReducedMotion } from "@/lib/motion";\n' +
                'const r = prefersReducedMotion();',
        },
        // 7. matchMedia for an unrelated query is fine
        {
            code: 'const r = window.matchMedia("(min-width: 768px)");',
        },
    ],

    invalid: [
        // 1. <section> with off-token surface hex (Tailwind arbitrary)
        {
            code: 'const A = () => <section className="bg-[#0a0a0a] py-20"/>;',
            errors: [{ messageId: "sectionSurface" }],
        },
        // 2. <section> with off-token surface hex (inline style)
        {
            code:
                'const A = () => <section style={{ background: "#1a2a3a" }}/>;',
            errors: [{ messageId: "sectionSurface" }],
        },
        // 3. Off-palette accent literal in a Tailwind class
        {
            code: 'const A = () => <button className="text-[#3b82f6]"/>;',
            errors: [{ messageId: "accentColor" }],
        },
        // 4. Inline cubic-bezier in an object literal
        {
            code:
                'const t = { ease: "cubic-bezier(0.16, 1, 0.3, 1)" };',
            errors: [{ messageId: "cubicBezier" }],
        },
        // 5. Inline prefers-reduced-motion matchMedia query
        {
            code:
                'const r = window.matchMedia("(prefers-reduced-motion: reduce)");',
            errors: [{ messageId: "reducedMotionMatchMedia" }],
        },
        // 6. <section> with off-token surface inside cn(...) helper
        {
            code:
                'const cn = (...a) => a.join(" ");\n' +
                'const A = () => <section className={cn("py-20", "bg-[#111]")}/>;',
            errors: [{ messageId: "sectionSurface" }],
        },
        // 7. Off-palette accent inside a template literal class
        {
            code:
                'const A = () => <div className={`bg-[#06b6d4] rounded-full`} />;',
            errors: [{ messageId: "accentColor" }],
        },
    ],
});

console.log("smoke ok");
