declare module 'aos' {
    interface AOSOptions {
        offset?: number;
        delay?: number;
        duration?: number;
        easing?: string;
        once?: boolean;
        mirror?: boolean;
        anchorPlacement?: string;
        disable?: 'phone' | 'tablet' | 'mobile' | boolean | (() => boolean);
        startEvent?: string;
        animatedClassName?: string;
        initClassName?: string;
        useClassNames?: boolean;
        disableMutationObserver?: boolean;
        debounceDelay?: number;
        throttleDelay?: number;
    }

    interface AOS {
        init(options?: AOSOptions): void;
        refresh(): void;
        refreshHard(): void;
        destroy(): void;
    }

    const AOS: AOS;

    export default AOS;
}
