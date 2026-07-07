'use client';

import {
    cloneElement,
    isValidElement,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactElement,
    type Ref,
} from 'react';

import { HoverImageContext } from './hover-image-context';

/**
 * Props for {@link SoftreeHoverImageTarget}.
 */
export interface SoftreeHoverImageTargetProps {
    /**
     * The preview image URL surfaced when the pointer enters this target — the
     * Source_Document `data-img` attribute. `null` (or an empty string) marks a
     * target with no preview; the registry skips it without throwing
     * (Requirement 16.6).
     */
    readonly dataImg: string | null;
    /**
     * A single rendered element to enhance (the Source_Document
     * `hover-img-button` anchor). Its rendered DOM node is registered with the
     * Hover_Image_Preview registry; the element is otherwise passed through
     * unchanged aside from the merged `hover-img-button` class and `data-img`
     * attribute.
     */
    readonly children: ReactElement;
    /** Extra classes merged onto the child element alongside `hover-img-button`. */
    readonly className?: string;
}

/** Source_Document class that the floating preview keys its `pointerenter` off. */
const HOVER_IMG_CLASS = 'hover-img-button';

/**
 * Merge whitespace-separated class token lists, deduplicating tokens and
 * dropping empties. Used to guarantee the source `hover-img-button` class (plus
 * any caller `className`) is present on the child without clobbering the
 * classes it already declares (`button`, `w-inline-block`, …).
 */
function mergeClassNames(...sources: ReadonlyArray<string | undefined>): string {
    const tokens: string[] = [];
    for (const source of sources) {
        if (!source) {
            continue;
        }
        for (const token of source.split(/\s+/)) {
            if (token && !tokens.includes(token)) {
                tokens.push(token);
            }
        }
    }
    return tokens.join(' ');
}

/**
 * Assign a value to a React ref regardless of whether it is a callback ref or a
 * mutable ref object. Used to forward the rendered node to any ref the caller
 * already attached to `children`, so wrapping a target never steals its ref.
 */
function assignRef<T>(ref: Ref<T> | undefined, value: T | null): void {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref != null) {
        (ref as { current: T | null }).current = value;
    }
}

/**
 * `SoftreeHoverImageTarget` — wraps a single `hover-img-button` element and
 * imperatively registers its rendered DOM node with the Hover_Image_Preview
 * registry exposed via {@link HoverImageContext}.
 *
 * The registry (provided by `SoftreeHoverImagePreview`, task 18.1) attaches the
 * `pointerenter` / `pointerleave` listeners that drive the single floating
 * `.cta-hover-image` preview (Requirements 8.8, 8.9, 16.2, 16.3, 16.4). Until
 * that provider mounts, the context resolves to a no-op registry, so this
 * primitive is safe to render in isolation, on the server, or before the
 * preview exists.
 *
 * Rather than introduce an extra wrapper node, the target clones its single
 * child to:
 *   - attach a composed ref that captures the rendered node (and still forwards
 *     to any ref the caller placed on the child),
 *   - merge the source `hover-img-button` class (plus any `className` prop)
 *     onto the child so the upstream `a.hover-img-button` styles apply, and
 *   - mirror the `data-img` attribute from `dataImg` for DOM parity with
 *     Source_Document.
 *
 * On mount the captured node is registered via `registry.register(node,
 * dataImg)`; the returned unregister callback runs on unmount. The target
 * re-registers whenever `dataImg` or the active registry changes (Requirement
 * 16.2/16.4 lifecycle correctness).
 *
 * Requirements: 8.8, 8.9, 16.2, 16.3, 16.4
 */
export function SoftreeHoverImageTarget({
    dataImg,
    children,
    className,
}: SoftreeHoverImageTargetProps): React.JSX.Element {
    const registry = useContext(HoverImageContext);
    const [node, setNode] = useState<HTMLElement | null>(null);

    // Track the child's own ref each render so the composed callback ref can
    // forward the node to it without stealing it.
    const childRefRef = useRef<Ref<HTMLElement> | undefined>(undefined);
    childRefRef.current = isValidElement(children)
        ? ((children.props as { ref?: Ref<HTMLElement> }).ref ?? undefined)
        : undefined;

    const composedRef = useCallback((element: HTMLElement | null) => {
        setNode(element);
        assignRef(childRefRef.current, element);
    }, []);

    useEffect(() => {
        if (node === null) {
            return;
        }
        const unregister = registry.register(node, dataImg);
        return unregister;
    }, [node, registry, dataImg]);

    // Defensive: the prop type requires a single element, but guard against a
    // malformed child so registration never throws (Requirement 16.6 spirit).
    if (!isValidElement(children)) {
        return <>{children}</>;
    }

    const childProps = children.props as {
        className?: string;
        ref?: Ref<HTMLElement>;
    };

    const mergedClassName = mergeClassNames(
        childProps.className,
        className,
        HOVER_IMG_CLASS,
    );

    // `data-img` mirrors the Source_Document attribute for DOM parity; omit it
    // when there is no preview so the markup stays clean for empty targets.
    const nextProps: Record<string, unknown> = {
        ref: composedRef,
        className: mergedClassName,
    };
    if (dataImg) {
        nextProps['data-img'] = dataImg;
    }

    return cloneElement(children, nextProps);
}
