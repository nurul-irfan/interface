import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Text, TouchableArea } from 'ui/src';
import { openUri } from 'uniswap/src/utils/linking';
import { isMobileApp } from 'utilities/src/platform';
const onPressLearnMore = async (url) => {
    await openUri(url);
};
export const LearnMoreLink = ({ url, textVariant = 'buttonLabel2', textColor = '$accent1', centered = false, display, }) => {
    const { t } = useTranslation();
    return isMobileApp ? (_jsx(Text, { color: textColor, variant: textVariant, textAlign: centered ? 'center' : undefined, onPress: () => onPressLearnMore(url), children: t('common.button.learn') })) : (_jsx(TouchableArea, { display: display, onPress: () => onPressLearnMore(url), children: _jsx(Text, { color: textColor, variant: textVariant, textAlign: centered ? 'center' : undefined, children: t('common.button.learn') }) }));
};
//# sourceMappingURL=LearnMoreLink.js.map