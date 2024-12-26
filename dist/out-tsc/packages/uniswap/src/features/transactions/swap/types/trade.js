import { Trade as RouterSDKTrade, ZERO_PERCENT } from '@uniswap/router-sdk';
import { Percent, Price } from '@uniswap/sdk-core';
import { V2DutchOrderTrade, PriorityOrderTrade as IPriorityOrderTrade } from '@uniswap/uniswapx-sdk';
import { BigNumber } from 'ethers/lib/ethers';
import { Routing, } from 'uniswap/src/data/tradingApi/__generated__/index';
import { getCurrencyAmount, ValueType } from 'uniswap/src/features/tokens/getCurrencyAmount';
import { MAX_AUTO_SLIPPAGE_TOLERANCE } from 'uniswap/src/constants/transactions';
export class UniswapXV2Trade extends V2DutchOrderTrade {
    constructor({ quote, currencyIn, currencyOut, tradeType, }) {
        var _a;
        const orderInfo = transformToDutchOrderInfo(quote.quote.orderInfo);
        super({ currencyIn, currenciesOut: [currencyOut], orderInfo, tradeType });
        this.routing = Routing.DUTCH_V2;
        this.indicative = false;
        this.quote = quote;
        this.slippageTolerance = (_a = this.quote.quote.slippageTolerance) !== null && _a !== void 0 ? _a : 0;
        this.swapFee = getSwapFee(quote);
    }
    get needsWrap() {
        return this.inputAmount.currency.isNative;
    }
    get deadline() {
        return this.order.info.deadline;
    }
    get priceImpact() {
        return ZERO_PERCENT;
    }
    get inputTax() {
        return ZERO_PERCENT;
    }
    get outputTax() {
        return ZERO_PERCENT;
    }
}
export class PriorityOrderTrade extends IPriorityOrderTrade {
    constructor({ quote, currencyIn, currencyOut, tradeType, }) {
        var _a;
        const orderInfo = transformToPriorityOrderInfo(quote.quote.orderInfo);
        const { expectedAmountIn, expectedAmountOut } = quote.quote;
        const expectedAmounts = expectedAmountIn && expectedAmountOut ? { expectedAmountIn, expectedAmountOut } : undefined;
        super({ currencyIn, currenciesOut: [currencyOut], orderInfo, tradeType, expectedAmounts });
        this.routing = Routing.PRIORITY;
        this.indicative = false;
        this.quote = quote;
        this.slippageTolerance = (_a = this.quote.quote.slippageTolerance) !== null && _a !== void 0 ? _a : 0;
        this.swapFee = getSwapFee(quote);
    }
    get needsWrap() {
        return this.inputAmount.currency.isNative;
    }
    get deadline() {
        return this.order.info.deadline;
    }
    get priceImpact() {
        return ZERO_PERCENT;
    }
    get inputTax() {
        return ZERO_PERCENT;
    }
    get outputTax() {
        return ZERO_PERCENT;
    }
}
// TODO: [MOB-238] use composition instead of inheritance
export class ClassicTrade extends RouterSDKTrade {
    constructor({ quote, deadline, ...routes }) {
        var _a;
        super(routes);
        this.routing = Routing.CLASSIC;
        this.indicative = false;
        this.quote = quote;
        this.deadline = deadline;
        this.slippageTolerance = (_a = quote === null || quote === void 0 ? void 0 : quote.quote.slippage) !== null && _a !== void 0 ? _a : MAX_AUTO_SLIPPAGE_TOLERANCE;
        this.swapFee = getSwapFee(quote);
    }
}
export var ApprovalAction;
(function (ApprovalAction) {
    // either native token or allowance is sufficient, no approval or permit needed
    ApprovalAction["None"] = "none";
    // not enough allowance and token cannot be approved through .permit instead
    ApprovalAction["Approve"] = "approve";
    // not enough allowance but token can be approved through permit signature
    ApprovalAction["Permit"] = "permit";
    ApprovalAction["Permit2Approve"] = "permit2-approve";
    // revoke required before token can be approved
    ApprovalAction["RevokeAndPermit2Approve"] = "revoke-and-permit2-approve";
    // Unable to fetch approval status, should block submission UI
    ApprovalAction["Unknown"] = "unknown";
})(ApprovalAction || (ApprovalAction = {}));
// Converts from BE type to SDK type
function transformToDutchOrderInfo(orderInfo) {
    var _a, _b, _c, _d;
    return {
        ...orderInfo,
        nonce: BigNumber.from(orderInfo.nonce),
        additionalValidationContract: (_a = orderInfo.additionalValidationContract) !== null && _a !== void 0 ? _a : '',
        additionalValidationData: (_b = orderInfo.additionalValidationData) !== null && _b !== void 0 ? _b : '',
        input: {
            token: (_c = orderInfo.input.token) !== null && _c !== void 0 ? _c : '',
            startAmount: BigNumber.from(orderInfo.input.startAmount),
            endAmount: BigNumber.from(orderInfo.input.endAmount),
        },
        outputs: orderInfo.outputs.map((output) => {
            var _a;
            return ({
                token: (_a = output.token) !== null && _a !== void 0 ? _a : '',
                startAmount: BigNumber.from(output.startAmount),
                endAmount: BigNumber.from(output.endAmount),
                recipient: output.recipient,
            });
        }),
        cosigner: (_d = orderInfo.cosigner) !== null && _d !== void 0 ? _d : '',
    };
}
function transformToPriorityOrderInfo(orderInfo) {
    var _a, _b, _c;
    return {
        ...orderInfo,
        nonce: BigNumber.from(orderInfo.nonce),
        additionalValidationContract: (_a = orderInfo.additionalValidationContract) !== null && _a !== void 0 ? _a : '',
        additionalValidationData: (_b = orderInfo.additionalValidationData) !== null && _b !== void 0 ? _b : '',
        input: {
            token: (_c = orderInfo.input.token) !== null && _c !== void 0 ? _c : '',
            amount: BigNumber.from(orderInfo.input.amount),
            mpsPerPriorityFeeWei: BigNumber.from(orderInfo.input.mpsPerPriorityFeeWei),
        },
        outputs: orderInfo.outputs.map((output) => {
            var _a;
            return ({
                token: (_a = output.token) !== null && _a !== void 0 ? _a : '',
                amount: BigNumber.from(output.amount),
                mpsPerPriorityFeeWei: BigNumber.from(output.mpsPerPriorityFeeWei),
                recipient: output.recipient,
            });
        }),
        baselinePriorityFeeWei: BigNumber.from(orderInfo.baselinePriorityFeeWei),
        auctionStartBlock: BigNumber.from(orderInfo.auctionStartBlock),
    };
}
function getSwapFee(quoteResponse) {
    var _a;
    if (!(quoteResponse === null || quoteResponse === void 0 ? void 0 : quoteResponse.quote.portionAmount) || !((_a = quoteResponse === null || quoteResponse === void 0 ? void 0 : quoteResponse.quote) === null || _a === void 0 ? void 0 : _a.portionBips)) {
        return undefined;
    }
    return {
        recipient: quoteResponse.quote.portionRecipient,
        percent: new Percent(quoteResponse.quote.portionBips, '10000'),
        amount: quoteResponse === null || quoteResponse === void 0 ? void 0 : quoteResponse.quote.portionAmount,
    };
}
export function validateIndicativeQuoteResponse(response) {
    const { input, output } = response;
    if (response.input && response.output && response.requestId && response.type && input.amount && input.chainId && input.token && output.amount && output.chainId && output.token) {
        return { ...response, input: { amount: input.amount, chainId: input.chainId, token: output.token }, output: { amount: output.amount, chainId: output.chainId, token: output.token } };
    }
    return undefined;
}
export class IndicativeTrade {
    constructor({ quote, currencyIn, currencyOut, slippageTolerance }) {
        this.indicative = true;
        this.quote = quote;
        const inputAmount = getCurrencyAmount({ value: this.quote.input.amount, valueType: ValueType.Raw, currency: currencyIn });
        const outputAmount = getCurrencyAmount({ value: this.quote.output.amount, valueType: ValueType.Raw, currency: currencyOut });
        if (!inputAmount || !outputAmount) {
            throw new Error('Error parsing indicative quote currency amounts');
        }
        this.inputAmount = inputAmount;
        this.outputAmount = outputAmount;
        this.executionPrice = new Price(currencyIn, currencyOut, this.quote.input.amount, this.quote.output.amount);
        this.slippageTolerance = slippageTolerance;
    }
}
export class BridgeTrade {
    constructor({ quote, currencyIn, currencyOut, tradeType }) {
        var _a, _b;
        this.routing = Routing.BRIDGE;
        this.indicative = false;
        this.inputTax = ZERO_PERCENT;
        this.outputTax = ZERO_PERCENT;
        this.quote = quote;
        this.swapFee = getSwapFee(quote);
        const quoteInputAmount = (_a = quote.quote.input) === null || _a === void 0 ? void 0 : _a.amount;
        const quoteOutputAmount = (_b = quote.quote.output) === null || _b === void 0 ? void 0 : _b.amount;
        if (!quoteInputAmount || !quoteOutputAmount) {
            throw new Error('Error parsing bridge quote currency amounts');
        }
        const inputAmount = getCurrencyAmount({ value: quoteInputAmount, valueType: ValueType.Raw, currency: currencyIn });
        const outputAmount = getCurrencyAmount({ value: quoteOutputAmount, valueType: ValueType.Raw, currency: currencyOut });
        if (!inputAmount || !outputAmount) {
            throw new Error('Error parsing bridge quote currency amounts');
        }
        this.inputAmount = inputAmount;
        this.outputAmount = outputAmount;
        this.executionPrice = new Price(currencyIn, currencyOut, quoteInputAmount, quoteOutputAmount);
        this.tradeType = tradeType;
    }
    /* Bridge trades have no slippage and hence a static execution price.
    The following methods are overridden for compatibility with other trade types */
    worstExecutionPrice(_threshold) {
        return this.executionPrice;
    }
    maximumAmountIn(_slippageTolerance, _amountIn) {
        return this.inputAmount;
    }
    minimumAmountOut(_slippageTolerance, _amountOut) {
        return this.outputAmount;
    }
}
//# sourceMappingURL=trade.js.map