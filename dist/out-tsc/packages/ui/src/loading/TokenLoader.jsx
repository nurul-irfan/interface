import { isWeb } from 'tamagui';
import { Flex } from 'ui/src/components/layout';
import { Text } from 'ui/src/components/text';
import { Skeleton } from 'ui/src/loading/Skeleton';
import { iconSizes } from 'ui/src/theme';
export function TokenLoader({ opacity, withPrice = false }) {
    return (<Flex alignItems="flex-start" flexDirection="row" justifyContent="space-between" opacity={opacity} py="$spacing8">
      <Flex grow row alignItems="center" gap="$spacing12" overflow="hidden">
        <Skeleton>
          <Flex backgroundColor="$neutral3" borderRadius="$roundedFull" height={iconSizes.icon36} width={iconSizes.icon36}/>
        </Skeleton>

        <Flex grow alignItems="flex-start">
          <Text loading="no-shimmer" loadingPlaceholderText="Token Full Name" numberOfLines={1} variant={isWeb ? 'body3' : 'body1'}/>
          <Flex row alignItems="center" gap="$spacing8" minHeight={20}>
            <Text loading="no-shimmer" loadingPlaceholderText="1,000 TFN" numberOfLines={1} variant={isWeb ? 'body4' : 'body2'}/>
          </Flex>
        </Flex>

        {withPrice && (<Flex alignItems="flex-end">
            <Text loading="no-shimmer" loadingPlaceholderText="$XX.XX" numberOfLines={1} variant="body1"/>
            <Flex row alignItems="center" gap="$spacing8" minHeight={20}>
              <Text loading="no-shimmer" loadingPlaceholderText="X.XX%" numberOfLines={1} variant="subheading2"/>
            </Flex>
          </Flex>)}
      </Flex>
    </Flex>);
}
//# sourceMappingURL=TokenLoader.jsx.map