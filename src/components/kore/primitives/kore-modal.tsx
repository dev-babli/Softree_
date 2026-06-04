'use client';

import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type MouseEvent as ReactMouseEvent,
    type ReactNode,
    type ReactPortal,
} from 'react';
import { createPortal } from 'react-dom';

import { useFocusTrap } from '../hooks/use-focus-trap';
import { useReducedMotion } from '../hooks/use-reduced-motion';
import { durations, easings, zIndices } from '../tokens';

/**
 * The Source_Document overflow-lock class. Applied to `document.documentElement`
 * (`<html>`) while a modal is open so the page cannot scroll behind the dialog,
 * and removed on close. Source CSS: `.lenis-stopped { overflow: clip }`.
 */
const LENIS_STOPPED_CLASS = 'lenis-stopped';

/**
 * Source_Document base class for the dialog element (`<dialog class="modal">`).
 * Retained for visual parity; the lifecycle-critical layout/opacity values are
 * driven by token-backed inline styles below so behavior never depends on the
 * presence of the upstream stylesheet rule.
 */
const MODAL_BASE_CLASS = 'modal';

/** Source_Document "open" modifier (`.modal.open { display:flex; opacity:1 }`). */
const MODAL_OPEN_CLASS = 'open';

export interface KoreModalProps {
    /** When `true` the dialog is mounted, focus-trapped, and the page is locked. */
    readonly open: boolean;
    /** Invoked on backdrop click, Escape, or any other close affordance. */
    readonly onClose: () => void;
    /**
     * Id of the element labelling the dialog. When provided it is emitted as
     * `aria-labelledby` (preferred per Req 25.6). When omitted, {@link ariaLabel}
     * is used as a fallback accessible name.
     */
    readonly labelledById?: string;
    /** Fallback accessible name when {@link labelledById} is not supplied. */
    readonly ariaLabel?: string;
    /** Dialog body content. Rendered above the backdrop. */
    readonly children: ReactNode;
    /** Extra classes merged after the source `modal`/`open` class tokens. */
    readonly className?: string;
    /** Extra classes applied to the full-cover backdrop dismiss layer. */
    readonly backdropClassName?: string;
    /** When `true` (default), a backdrop click invokes {@link onClose}. */
    readonly closeOnBackdrop?: boolean;
}

/**
 * `KoreModal` — the accessible dialog primitive shared by every Kore.ai
 * homepage modal (the enterprise tech-stack modal, the three video modals, and
 * Exit_Modal). It owns a single dialog's lifecycle only; mutual exclusion and
 * video play/pause/reset are the `KoreModalsLayer`'s concern.
 *
 * Responsibilities:
 *   - Emits `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`
 *     (falling back to `aria-label`) — Req 25.6.
 *   - Applies the `lenis-stopped` overflow lock to `<html>` while open and
 *     releases it within one animation frame on close — Req 13.4, 15.3.
 *   - Traps keyboard focus via `use-focus-trap`, moving focus to the first
 *     focusable descendant on open and restoring focus to the trigger on close;
 *     Escape closes the dialog — Req 13.5, 13.7, 15.4, 15.7, 25.7.
 *   - Dismisses on backdrop click when `closeOnBackdrop` is set.
 *   - Reduced_Motion replaces the entrance opacity transition with an immediate
 *     display swap completed within one animation frame — Req 13.8, 15.9.
 *   - Renders through a portal to `document.body` (after mount, SSR-safe) so
 *     stacking/z-index is correct regardless of where the trigger lives.
 *
 * Requirements: 13.4, 13.5, 13.7, 13.8, 15.3, 15.4, 15.7, 15.8, 15.9, 25.6, 25.7
 */
export function KoreModal({
    open,
    onClose,
    labelledById,
    ariaLabel,
    children,
    className,
    backdropClassName,
    closeOnBackdrop = true,
}: KoreModalProps): ReactPortal | null {
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const prefersReducedMotion = useReducedMotion();

    // Portal target only exists in the browser; gate rendering until mount so
    // SSR/first paint render nothing (createPortal would otherwise throw).
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    // The trap (and hence focus move-in / restore) must engage only once the
    // dialog node actually exists in the DOM, i.e. after mount.
    const isActive = open && mounted;

    // Focus trap: moves focus into the dialog on activation, cycles Tab /
    // Shift+Tab within it, closes on Escape, and restores focus to the trigger
    // on deactivation (Req 13.5, 13.7, 15.4, 15.7, 25.7).
    useFocusTrap({ containerRef: dialogRef, active: isActive, onEscape: onClose });

    // Pending rAF id for a scheduled `lenis-stopped` removal, so a rapid
    // close→open can cancel a stale removal and keep the lock engaged.
    const lockRemovalFrameRef = useRef<number | null>(null);

    // Overflow lock: add `lenis-stopped` to <html> while open; remove on close
    // within one animation frame (Req 13.4, 15.3). Removal is scheduled on a
    // rAF so it lands within a single frame of the close.
    useEffect(() => {
        if (typeof document === 'undefined' || typeof window === 'undefined') {
            return;
        }
        if (!open) {
            return;
        }

        const root = document.documentElement;
        // Cancel any in-flight removal from a just-completed close so a rapid
        // re-open keeps the lock instead of having it cleared a frame later.
        if (lockRemovalFrameRef.current !== null) {
            window.cancelAnimationFrame(lockRemovalFrameRef.current);
            lockRemovalFrameRef.current = null;
        }
        root.classList.add(LENIS_STOPPED_CLASS);

        return () => {
            lockRemovalFrameRef.current = window.requestAnimationFrame(() => {
                root.classList.remove(LENIS_STOPPED_CLASS);
                lockRemovalFrameRef.current = null;
            });
        };
    }, [open]);

    // Entrance opacity transition, gated by Reduced_Motion. With motion the
    // dialog fades 0 -> 1 over the source modal duration; with Reduced_Motion
    // it appears at full opacity immediately (display swap within one frame).
    const [entered, setEntered] = useState(false);
    useEffect(() => {
        if (!isActive) {
            setEntered(false);
            return;
        }
        if (prefersReducedMotion) {
            setEntered(true);
            return;
        }
        if (typeof window === 'undefined') {
            setEntered(true);
            return;
        }
        const frameId = window.requestAnimationFrame(() => {
            setEntered(true);
        });
        return () => {
            window.cancelAnimationFrame(frameId);
        };
    }, [isActive, prefersReducedMotion]);

    if (!isActive || typeof document === 'undefined') {
        return null;
    }

    const dialogClassName = [MODAL_BASE_CLASS, MODAL_OPEN_CLASS, className]
        .filter(Boolean)
        .join(' ');

    const dialogStyle: CSSProperties = {
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: zIndices.z9999,
        opacity: prefersReducedMotion ? 1 : entered ? 1 : 0,
        // Reduced_Motion: no transition -> immediate swap within one frame.
        transition: prefersReducedMotion
            ? undefined
            : `opacity ${durations.d0p3s} ${easings.ease}`,
    };

    const backdropStyle: CSSProperties = {
        position: 'absolute',
        inset: 0,
    };

    // Content sits above the backdrop so backdrop clicks (and only backdrop
    // clicks) dismiss the dialog.
    const contentStyle: CSSProperties = {
        position: 'relative',
        zIndex: zIndices.z1,
    };

    const handleBackdropClick = (event: ReactMouseEvent<HTMLDivElement>): void => {
        if (closeOnBackdrop && event.target === event.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledById}
            aria-label={labelledById ? undefined : ariaLabel}
            className={dialogClassName}
            style={dialogStyle}
        >
            <div
                className={backdropClassName}
                style={backdropStyle}
                aria-hidden="true"
                onClick={handleBackdropClick}
            />
            <div style={contentStyle}>{children}</div>
        </div>,
        document.body,
    );
}
