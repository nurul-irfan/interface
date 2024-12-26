import { isWeb } from 'tamagui';
import { Flex } from 'ui/src/components/layout/Flex';
import { Text } from 'ui/src/components/text/Text';
import { usePostTextElementPositionProps } from 'ui/src/utils/layout';
const DEFAULT_TEXT_PROPS = {
    color: '$neutral1',
    variant: 'body2',
};
export function ElementAfterText({ element, text, wrapperProps, textProps }) {
    const { postTextElementPositionProps, onTextLayout } = usePostTextElementPositionProps();
    if (isWeb) {
        return (<Flex row alignItems="center" {...wrapperProps}>
        <Text {...DEFAULT_TEXT_PROPS} {...textProps}>
          {text}
          {element}
        </Text>
      </Flex>);
    }
    else {
        return (<Flex row alignItems="center" pr={postTextElementPositionProps ? '$spacing24' : undefined} {...wrapperProps}>
        <Text {...DEFAULT_TEXT_PROPS} onTextLayout={onTextLayout} {...textProps}>
          {text}
        </Text>
        <Flex {...postTextElementPositionProps}>{element}</Flex>
      </Flex>);
    }
}
//# sourceMappingURL=ElementAfterText.jsx.map