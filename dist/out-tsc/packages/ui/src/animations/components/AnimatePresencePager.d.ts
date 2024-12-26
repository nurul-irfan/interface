import { ReactNode } from 'react';
type TransitionDirection = 'forward' | 'backward' | 'up' | 'down';
type AnimationType = 'fade' | TransitionDirection;
export declare function TransitionItem({ animationType, children, }: {
    children?: ReactNode;
    animationType?: AnimationType;
}): JSX.Element;
export declare function AnimateTransition({ currentIndex, animationType, children, }: {
    currentIndex: number;
    children: ReactNode;
    animationType?: AnimationType;
}): JSX.Element;
export declare function AnimatedPager({ children, currentIndex }: {
    currentIndex: number;
    children: ReactNode;
}): JSX.Element;
export {};
//# sourceMappingURL=AnimatePresencePager.d.ts.map