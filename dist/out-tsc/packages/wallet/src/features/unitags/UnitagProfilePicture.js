import { jsx as _jsx } from "react/jsx-runtime";
import { Flex, useSporeColors } from 'ui/src';
import { useENSAvatar } from 'uniswap/src/features/ens/api';
import { isSVGUri } from 'utilities/src/format/urls';
import { AccountIcon } from 'wallet/src/components/accounts/AccountIcon';
import { ImageUri } from 'wallet/src/features/images/ImageUri';
import { RemoteImage } from 'wallet/src/features/images/RemoteImage';
export function UnitagProfilePicture({ address, unitagAvatarUri, size, }) {
    const colors = useSporeColors();
    const { data: ensAvatar } = useENSAvatar(address);
    return unitagAvatarUri ? (_jsx(Flex, { shrink: true, backgroundColor: "$surface1", borderColor: "$surface1", borderRadius: "$roundedFull", borderWidth: 2, height: size, overflow: "hidden", shadowColor: "$neutral3", shadowOpacity: 0.4, shadowRadius: "$spacing4", width: size, children: isSVGUri(unitagAvatarUri) ? (_jsx(RemoteImage, { backgroundColor: colors.surface1.val, height: size, uri: unitagAvatarUri, width: size })) : (_jsx(ImageUri, { resizeMode: "cover", uri: unitagAvatarUri })) })) : (_jsx(AccountIcon, { address: address, avatarUri: ensAvatar, showBackground: true, showBorder: true, size: size }));
}
//# sourceMappingURL=UnitagProfilePicture.js.map