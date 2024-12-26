import { Button } from 'ui/src/components/button/Button';
const meta = {
    // NOTE: On Web, titles must be statically analyzable at build time in Storybook v8. Please refer to our documentation for valid values.
    // https://github.com/Uniswap/universe/blob/main/docs/storybook.md#storybook-titles
    title: 'Spore/Button',
    component: Button,
};
export const VariantSmall = {
    args: {
        children: 'Hello, world!',
        size: 'small',
    },
};
export const VariantMedium = {
    args: {
        children: 'Hello, world!',
        size: 'medium',
    },
};
export const VariantLarge = {
    args: {
        children: 'Hello, world!',
        size: 'large',
    },
};
export default meta;
//# sourceMappingURL=Button.stories.jsx.map