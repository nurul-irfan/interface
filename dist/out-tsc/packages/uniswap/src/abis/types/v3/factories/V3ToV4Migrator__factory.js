/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Contract, utils } from "ethers";
const _abi = [
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "action",
                type: "bytes4",
            },
        ],
        name: "InvalidAction",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "NotAuthorizedForToken",
        type: "error",
    },
    {
        inputs: [],
        name: "OnlyMintAllowed",
        type: "error",
    },
    {
        inputs: [],
        name: "V3_POSITION_MANAGER",
        outputs: [
            {
                internalType: "contract INonfungiblePositionManager",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "V4_POSITION_MANAGER",
        outputs: [
            {
                internalType: "contract IPositionManager",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
export class V3ToV4Migrator__factory {
    static createInterface() {
        return new utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    }
}
V3ToV4Migrator__factory.abi = _abi;
//# sourceMappingURL=V3ToV4Migrator__factory.js.map