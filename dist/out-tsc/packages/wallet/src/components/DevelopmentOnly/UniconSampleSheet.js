import { jsx as _jsx } from "react/jsx-runtime";
import { Flex, Unicon } from 'ui/src';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
const generateRandomEthereumAddresses = (numberOfAddresses) => {
    const addresses = [];
    for (let i = 0; i < numberOfAddresses; i++) {
        const randomHex = [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        addresses.push(`0x${randomHex}`);
    }
    return addresses;
};
export const UniconSampleSheet = ({ onClose }) => {
    return (_jsx(Modal, { blurredBackground: true, backgroundColor: "$surface1", name: ModalName.UniconsDevModal, onClose: onClose, children: _jsx(Flex, { centered: true, height: "100%", width: "100%", children: _jsx(Flex, { row: true, alignItems: "center", flexWrap: "wrap", justifyContent: "center", width: "100%", children: generateRandomEthereumAddresses(80).map((address) => {
                    return (_jsx(Flex, { children: _jsx(Unicon, { address: address, size: 42 }, address) }));
                }) }) }) }));
};
//# sourceMappingURL=UniconSampleSheet.js.map