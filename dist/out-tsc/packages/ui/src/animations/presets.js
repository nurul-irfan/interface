export const animationsEnter = {
    fadeInDown: {
        enterStyle: {
            y: -10,
            opacity: 0,
        },
    },
};
export const animationsExit = {
    fadeOutUp: {
        exitStyle: {
            y: -10,
            opacity: 0,
        },
    },
    fadeOutDown: {
        exitStyle: {
            y: 10,
            opacity: 0,
        },
    },
};
export const animationsEnterExit = {
    fadeInDownOutUp: {
        ...animationsEnter.fadeInDown,
        ...animationsExit.fadeOutUp,
    },
    fadeInDownOutDown: {
        ...animationsEnter.fadeInDown,
        ...animationsExit.fadeOutDown,
    },
};
export const animationPresets = {
    ...animationsEnter,
    ...animationsExit,
    ...animationsEnterExit,
};
//# sourceMappingURL=presets.js.map