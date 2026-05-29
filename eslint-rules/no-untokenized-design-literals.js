"use strict";

/**
 * ESLint rule: no-untokenized-design-literals
 *
 * Enforces the Design_Tokens contract from the
 * `homepage-about-design-language` spec on homepage section files.
 *
 * Scope (configured at the plugin level in eslint.config.mjs):
 *   - src/components/sections/**
 *   - src/components/homepage-light/**
 *   - src/components/qc/homepage-light/**
 *
 * Flags:
 *   1. Surface literals on a top-level <section> background that are not
 *      one of the Design_Tokens canvas tokens
 *      (#FFFFFF, #F8F9FC, #F3F0EE) — checked on `bg-[#xxx]` Tailwind
 *      arbitrary classes and on `style={{ background: ... }}` /
 *      `style={{ backgroundColor: ... }}` inline styles.
 *
 *   2. Accent color literals outside the Design_Tokens accent set
 *      (#FF6B00, #FF5812, #1852FF). Allowed neutrals (canvas surfaces,
 *      foreground #0a0a1a, pure black/white) are exempt. Any other hex
 *      literal used in `bg-[#…]`, `text-[#…]`, `border-[#…]`,
 *      `from-[#…]`, `to-[#…]`, etc. is flagged.
 *
 *   3. Inline `cubic-bezier(...)` easing curves anywhere in the file —
 *      `EASE` / `EASE_T` from `@/lib/motion` is the single source of truth.
 *      The motion module itself lives at `src/lib/motion.ts` and is
 *      automatically out of scope.
 *
 *   4. Inline `prefers-reduced-motion` `matchMedia` checks — components
 *      MUST consume `prefersReducedMotion()` from `@/lib/motion` instead.
 *
 * The rule is intentionally lint-only: there is no autofix. Violations
 * are intended to surface concrete file edits during the verification
 * pass (Task 8.1 in the implementation plan).
 */

const ALLOWED_SURFACE_HEXES = new Set([
    "#ffffff",
    "#fff",
    "#f8f9fc",
    "#f3f0ee",
]);

// Hex literals that are explicitly allowed anywhere in scoped files.
// = canvas surfaces + foreground + accents + neutral black/white shorthands.
const ALLOWED_COLOR_HEXES = new Set([
    // canvas surfaces
    "#ffffff",
    "#fff",
    "#f8f9fc",
    "#f3f0ee",
    // foreground primary text
    "#0a0a1a",
    // basic neutral
    "#000",
    "#000000",
    // accents
    "#ff6b00",
    "#ff5812",
    "#1852ff",
]);

// Tailwind arbitrary-value color utilities. Captures the utility prefix
// and the hex token (with optional `/<alpha>` opacity suffix stripped from
// the captured value).
const TAILWIND_COLOR_UTILITY_RE =
    /\b(?:bg|text|border|fill|stroke|from|via|to|ring|outline|shadow|divide|placeholder|caret|accent|decoration)-\[(#[0-9a-fA-F]{3,8})(?:\/(?:\d+|\[[^\]]+\]))?\]/g;

// Hex literal that appears specifically as a CSS background on a
// `<section>` style object.
const HEX_TOKEN_RE = /#[0-9a-fA-F]{3,8}\b/;

function lowerHex(hex) {
    return typeof hex === "string" ? hex.toLowerCase() : "";
}

function isAllowedSurfaceHex(hex) {
    return ALLOWED_SURFACE_HEXES.has(lowerHex(hex));
}

function isAllowedColorHex(hex) {
    return ALLOWED_COLOR_HEXES.has(lowerHex(hex));
}

function getStaticStringFromNode(node) {
    if (!node) return null;
    if (node.type === "Literal" && typeof node.value === "string") {
        return node.value;
    }
    if (
        node.type === "TemplateLiteral" &&
        node.expressions.length === 0 &&
        node.quasis.length === 1
    ) {
        return node.quasis[0].value.cooked;
    }
    return null;
}

/**
 * Walk an expression tree and call `visit(stringNode, value)` for every
 * static string fragment we can statically determine. Used to extract
 * className strings from helpers like `cn(...)` / `clsx(...)`.
 */
function walkStaticStrings(expression, visit) {
    if (!expression) return;
    switch (expression.type) {
        case "Literal":
            if (typeof expression.value === "string") {
                visit(expression, expression.value);
            }
            return;
        case "TemplateLiteral":
            for (const quasi of expression.quasis) {
                if (quasi.value && typeof quasi.value.cooked === "string") {
                    visit(quasi, quasi.value.cooked);
                }
            }
            for (const expr of expression.expressions) {
                walkStaticStrings(expr, visit);
            }
            return;
        case "BinaryExpression":
            if (expression.operator === "+") {
                walkStaticStrings(expression.left, visit);
                walkStaticStrings(expression.right, visit);
            }
            return;
        case "ConditionalExpression":
            walkStaticStrings(expression.consequent, visit);
            walkStaticStrings(expression.alternate, visit);
            return;
        case "LogicalExpression":
            walkStaticStrings(expression.left, visit);
            walkStaticStrings(expression.right, visit);
            return;
        case "CallExpression":
            for (const arg of expression.arguments) {
                walkStaticStrings(arg, visit);
            }
            return;
        case "ArrayExpression":
            for (const el of expression.elements) {
                walkStaticStrings(el, visit);
            }
            return;
        case "ObjectExpression":
            for (const prop of expression.properties) {
                if (prop.type === "Property") {
                    if (prop.key && prop.key.type === "Literal") {
                        walkStaticStrings(prop.key, visit);
                    }
                }
            }
            return;
        default:
            return;
    }
}

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description:
                "Enforce Design_Tokens (canvas surfaces, accent palette, motion easing, reduced-motion API) on homepage section files.",
            recommended: false,
        },
        schema: [],
        messages: {
            sectionSurface:
                'Top-level <section> background "{{value}}" is not one of the Design_Tokens canvas surfaces (#FFFFFF, #F8F9FC, #F3F0EE). Use one of the three canvas tokens.',
            accentColor:
                'Color literal "{{value}}" is not in the Design_Tokens accent set (#FF6B00, #FF5812, #1852FF). Register the value as a named token in src/lib/motion.ts or src/app/globals.css before referencing it.',
            cubicBezier:
                'Inline cubic-bezier(...) easing is not allowed in this file. Import EASE / EASE_T from "@/lib/motion" instead.',
            reducedMotionMatchMedia:
                'Inline matchMedia("(prefers-reduced-motion: reduce)") check is not allowed. Use prefersReducedMotion() from "@/lib/motion" instead.',
        },
    },

    create(context) {
        // De-dup: if a more specific diagnostic (`sectionSurface`) already
        // covers a (source range, hex) pair, skip the generic `accentColor`
        // walker for the same pair.
        const reportedSurfaceKeys = new Set();
        function rangeKey(node, hex) {
            const r = node.range || [0, 0];
            return r[0] + ":" + r[1] + ":" + lowerHex(hex);
        }

        function reportCubicBezierIfPresent(node, value) {
            if (typeof value !== "string") return;
            if (value.includes("cubic-bezier(")) {
                context.report({ node, messageId: "cubicBezier" });
            }
        }

        function reportAccentLiteralsIfPresent(node, value) {
            if (typeof value !== "string") return;
            if (value.indexOf("#") === -1) return;
            const re = new RegExp(
                TAILWIND_COLOR_UTILITY_RE.source,
                TAILWIND_COLOR_UTILITY_RE.flags,
            );
            let match;
            while ((match = re.exec(value)) !== null) {
                const hex = match[1];
                if (isAllowedColorHex(hex)) continue;
                if (reportedSurfaceKeys.has(rangeKey(node, hex))) continue;
                context.report({
                    node,
                    messageId: "accentColor",
                    data: { value: hex },
                });
            }
        }

        function reportSectionSurfaceClassString(node, classString) {
            if (typeof classString !== "string") return;
            if (classString.indexOf("bg-[") === -1) return;
            const re = /bg-\[(#[0-9a-fA-F]{3,8})(?:\/(?:\d+|\[[^\]]+\]))?\]/g;
            let match;
            while ((match = re.exec(classString)) !== null) {
                const hex = match[1];
                if (isAllowedSurfaceHex(hex)) continue;
                reportedSurfaceKeys.add(rangeKey(node, hex));
                context.report({
                    node,
                    messageId: "sectionSurface",
                    data: { value: hex },
                });
            }
        }

        function reportSectionInlineStyle(styleObject) {
            if (!styleObject || styleObject.type !== "ObjectExpression") return;
            for (const prop of styleObject.properties) {
                if (prop.type !== "Property") continue;
                const keyName =
                    (prop.key && prop.key.type === "Identifier" && prop.key.name) ||
                    (prop.key && prop.key.type === "Literal" && prop.key.value) ||
                    "";
                if (keyName !== "background" && keyName !== "backgroundColor") continue;
                const valStr = getStaticStringFromNode(prop.value);
                if (!valStr) continue;
                const m = valStr.match(HEX_TOKEN_RE);
                if (!m) continue;
                if (!isAllowedSurfaceHex(m[0])) {
                    reportedSurfaceKeys.add(rangeKey(prop.value, m[0]));
                    context.report({
                        node: prop.value,
                        messageId: "sectionSurface",
                        data: { value: m[0] },
                    });
                }
            }
        }

        function isSectionElement(openingElement) {
            return (
                openingElement.name &&
                openingElement.name.type === "JSXIdentifier" &&
                openingElement.name.name === "section"
            );
        }

        function checkSectionAttributes(opening) {
            for (const attr of opening.attributes) {
                if (attr.type !== "JSXAttribute") continue;
                const attrName = attr.name && attr.name.name;
                if (!attr.value) continue;

                if (attrName === "className") {
                    if (
                        attr.value.type === "Literal" &&
                        typeof attr.value.value === "string"
                    ) {
                        reportSectionSurfaceClassString(attr.value, attr.value.value);
                    } else if (attr.value.type === "JSXExpressionContainer") {
                        walkStaticStrings(attr.value.expression, (strNode, str) => {
                            reportSectionSurfaceClassString(strNode, str);
                        });
                    }
                } else if (attrName === "style") {
                    if (
                        attr.value.type === "JSXExpressionContainer" &&
                        attr.value.expression.type === "ObjectExpression"
                    ) {
                        reportSectionInlineStyle(attr.value.expression);
                    }
                }
            }
        }

        return {
            // Visit JSX <section> openings BEFORE the literal walker by registering
            // them on `JSXOpeningElement`; ESLint visits parent before child by
            // default, so the surface report seeds `reportedSurfaceKeys` before
            // the contained Literal node is visited.
            JSXOpeningElement(node) {
                if (isSectionElement(node)) {
                    checkSectionAttributes(node);
                }
            },

            Literal(node) {
                if (typeof node.value !== "string") return;
                reportCubicBezierIfPresent(node, node.value);
                reportAccentLiteralsIfPresent(node, node.value);
            },

            TemplateElement(node) {
                const cooked = node.value && node.value.cooked;
                if (typeof cooked !== "string") return;
                reportCubicBezierIfPresent(node, cooked);
                reportAccentLiteralsIfPresent(node, cooked);
            },

            CallExpression(node) {
                const callee = node.callee;
                const isMatchMedia =
                    (callee.type === "Identifier" && callee.name === "matchMedia") ||
                    (callee.type === "MemberExpression" &&
                        !callee.computed &&
                        callee.property.type === "Identifier" &&
                        callee.property.name === "matchMedia");
                if (!isMatchMedia) return;
                const arg = node.arguments[0];
                const argStr = getStaticStringFromNode(arg);
                if (argStr && argStr.includes("prefers-reduced-motion")) {
                    context.report({ node, messageId: "reducedMotionMatchMedia" });
                }
            },
        };
    },
};
