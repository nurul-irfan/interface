import { createElement, forwardRef } from 'react';
import { Stack, isWeb, styled, usePropsAndStyle } from 'tamagui';
import { withAnimated } from 'ui/src/components/factories/animated';
const getSize = (val) => ({
    width: val,
    height: val,
});
// used by our usePropsAndStyle to resolve a variant
const IconFrame = styled(Stack, {
    variants: {
        size: {
            '...': getSize,
        },
    },
});
export function createIcon({ name, getIcon, defaultFill, }) {
    const Icon = forwardRef((propsIn, ref) => {
        const [props, style] = usePropsAndStyle({
            color: defaultFill !== null && defaultFill !== void 0 ? defaultFill : (isWeb ? 'currentColor' : undefined),
            size: '$icon.8',
            strokeWidth: 8,
            ...propsIn,
        }, {
            resolveValues: 'value',
            forComponent: IconFrame,
        });
        const svgProps = {
            ref,
            ...props,
            // @ts-expect-error this type is hard to map but its right
            style,
        };
        if (props.Component) {
            return createElement(props.Component, svgProps);
        }
        return getIcon(svgProps);
    });
    Icon.displayName = name;
    const IconPlain = forwardRef((props, ref) => {
        return getIcon({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...props,
            ref,
        });
    });
    IconPlain.displayName = name;
    const AnimatedIconPlain = withAnimated(IconPlain);
    const AnimatedIcon = forwardRef((props, ref) => (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Icon ref={ref} {...props} Component={AnimatedIconPlain}/>));
    AnimatedIcon.displayName = `Animated${name}`;
    return [Icon, AnimatedIcon];
}
//# sourceMappingURL=createIcon.jsx.map