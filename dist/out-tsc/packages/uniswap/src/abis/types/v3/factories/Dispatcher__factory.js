/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Contract, utils } from "ethers";
const _abi = [
    {
        inputs: [],
        name: "BalanceTooLow",
        type: "error",
    },
    {
        inputs: [],
        name: "ContractLocked",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "Currency",
                name: "currency",
                type: "address",
            },
        ],
        name: "DeltaNotNegative",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "Currency",
                name: "currency",
                type: "address",
            },
        ],
        name: "DeltaNotPositive",
        type: "error",
    },
    {
        inputs: [],
        name: "FromAddressIsNotOwner",
        type: "error",
    },
    {
        inputs: [],
        name: "InputLengthMismatch",
        type: "error",
    },
    {
        inputs: [],
        name: "InsufficientETH",
        type: "error",
    },
    {
        inputs: [],
        name: "InsufficientToken",
        type: "error",
    },
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
        inputs: [],
        name: "InvalidBips",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "commandType",
                type: "uint256",
            },
        ],
        name: "InvalidCommandType",
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
        name: "NotPoolManager",
        type: "error",
    },
    {
        inputs: [],
        name: "OnlyMintAllowed",
        type: "error",
    },
    {
        inputs: [],
        name: "SliceOutOfBounds",
        type: "error",
    },
    {
        inputs: [],
        name: "UnsafeCast",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "action",
                type: "uint256",
            },
        ],
        name: "UnsupportedAction",
        type: "error",
    },
    {
        inputs: [],
        name: "V2InvalidPath",
        type: "error",
    },
    {
        inputs: [],
        name: "V2TooLittleReceived",
        type: "error",
    },
    {
        inputs: [],
        name: "V2TooMuchRequested",
        type: "error",
    },
    {
        inputs: [],
        name: "V3InvalidAmountOut",
        type: "error",
    },
    {
        inputs: [],
        name: "V3InvalidCaller",
        type: "error",
    },
    {
        inputs: [],
        name: "V3InvalidSwap",
        type: "error",
    },
    {
        inputs: [],
        name: "V3TooLittleReceived",
        type: "error",
    },
    {
        inputs: [],
        name: "V3TooMuchRequested",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "minAmountOutReceived",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amountReceived",
                type: "uint256",
            },
        ],
        name: "V4TooLittleReceived",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "maxAmountInRequested",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amountRequested",
                type: "uint256",
            },
        ],
        name: "V4TooMuchRequested",
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
    {
        inputs: [
            {
                internalType: "bytes",
                name: "commands",
                type: "bytes",
            },
            {
                internalType: "bytes[]",
                name: "inputs",
                type: "bytes[]",
            },
        ],
        name: "execute",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "msgSender",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "poolManager",
        outputs: [
            {
                internalType: "contract IPoolManager",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "int256",
                name: "amount0Delta",
                type: "int256",
            },
            {
                internalType: "int256",
                name: "amount1Delta",
                type: "int256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "uniswapV3SwapCallback",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "unlockCallback",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
export class Dispatcher__factory {
    static createInterface() {
        return new utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    }
}
Dispatcher__factory.abi = _abi;
//# sourceMappingURL=Dispatcher__factory.js.map