import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { SvgUri } from 'react-native-svg';
import { Flex } from 'ui/src';
import { iconSizes } from 'ui/src/theme';
import { getCountryFlagSvgUrl } from 'uniswap/src/features/fiatOnRamp/utils';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
export function ChooseCountryNotification({ notification: { countryName, countryCode, hideDelay }, }) {
    const { t } = useTranslation();
    const countryFlagUrl = getCountryFlagSvgUrl(countryCode);
    return (_jsx(NotificationToast, { smallToast: true, hideDelay: hideDelay, icon: _jsx(Flex, { borderRadius: "$roundedFull", overflow: "hidden", children: _jsx(SvgUri, { height: iconSizes.icon20, uri: countryFlagUrl, width: iconSizes.icon20 }) }), title: t('notification.countryChange', { countryName }) }));
}
//# sourceMappingURL=ChooseCountryNotification.js.map