import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text } from 'ui/src';
import { imageSizes } from 'ui/src/theme';
import { UNITAG_SUFFIX } from 'uniswap/src/features/unitags/constants';
import { UnitagProfilePicture } from 'wallet/src/features/unitags/UnitagProfilePicture';
export const UnitagWithProfilePicture = ({ unitag, address, profilePictureUri, }) => {
    return (_jsxs(Flex, { centered: true, pb: "$spacing28", children: [_jsx(UnitagProfilePicture, { address: address, size: imageSizes.image100, unitagAvatarUri: profilePictureUri }), _jsx(Flex, { row: true, position: "absolute", bottom: 0, backgroundColor: "$surface1", borderRadius: "$rounded32", px: "$spacing12", py: "$spacing8", shadowColor: "$neutral3", shadowOpacity: 0.4, shadowRadius: "$spacing4", transform: [{ rotateZ: '-2deg' }], zIndex: "$popover", children: _jsxs(Text, { color: "$accent1", variant: "subheading1", children: [unitag, _jsx(Text, { color: "$neutral3", variant: "subheading1", children: UNITAG_SUFFIX })] }) })] }));
};
//# sourceMappingURL=UnitagWithProfilePicture.js.map