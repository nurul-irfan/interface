/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Contract, utils } from "ethers";
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount0Owed",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount1Owed",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "uniswapV3MintCallback",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
export class IUniswapV3MintCallback__factory {
    static createInterface() {
        return new utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    }
}
IUniswapV3MintCallback__factory.abi = _abi;
//# sourceMappingURL=IUniswapV3MintCallback__factory.js.map