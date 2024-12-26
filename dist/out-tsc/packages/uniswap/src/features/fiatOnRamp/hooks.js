import { skipToken } from '@reduxjs/toolkit/query/react';
import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getCountry } from 'react-native-localize';
import { useDispatch } from 'react-redux';
import { useCurrencies } from 'uniswap/src/components/TokenSelector/hooks/useCurrencies';
import { useAccountMeta } from 'uniswap/src/contexts/UniswapContext';
import { Routing } from 'uniswap/src/data/tradingApi/__generated__/index';
import { toSupportedChainId } from 'uniswap/src/features/chains/utils';
import { FiatCurrency } from 'uniswap/src/features/fiatCurrency/constants';
import { useAppFiatCurrencyInfo, useFiatCurrencyInfo } from 'uniswap/src/features/fiatCurrency/hooks';
import { getFiatOnRampAggregatorApi } from 'uniswap/src/features/fiatOnRamp/api';
import { RampDirection, } from 'uniswap/src/features/fiatOnRamp/types';
import { createOnRampTransactionId, isFiatOnRampApiError, isInvalidRequestAmountTooHigh, isInvalidRequestAmountTooLow, } from 'uniswap/src/features/fiatOnRamp/utils';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { ValueType } from 'uniswap/src/features/tokens/getCurrencyAmount';
import { addTransaction } from 'uniswap/src/features/transactions/slice';
import { TransactionOriginType, TransactionStatus, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { getFormattedCurrencyAmount } from 'uniswap/src/utils/currency';
import { buildCurrencyId, buildNativeCurrencyId } from 'uniswap/src/utils/currencyId';
import { NumberType } from 'utilities/src/format/types';
import { useDebounce } from 'utilities/src/time/timing';
const SHORT_DELAY = 500;
export function useFormatExactCurrencyAmount(currencyAmount, currency) {
    const formatter = useLocalizationContext();
    if (!currencyAmount || !currency) {
        return undefined;
    }
    const formattedAmount = getFormattedCurrencyAmount(currency, currencyAmount, formatter, false, ValueType.Exact);
    // when formattedAmount is not empty it has an empty space in the end
    return formattedAmount === '' ? '0 ' : formattedAmount;
}
/** Returns a new externalTransactionId and a callback to store the transaction. */
export function useFiatOnRampTransactionCreator(ownerAddress, chainId, serviceProvider) {
    const dispatch = useDispatch();
    const externalTransactionId = useRef(createOnRampTransactionId(serviceProvider));
    const dispatchAddTransaction = useCallback(() => {
        // Adds a LocalOnRampTransaction to track the transaction
        // Later we will query the transaction details for that id
        const transactionDetail = {
            routing: Routing.CLASSIC,
            chainId,
            id: externalTransactionId.current,
            from: ownerAddress,
            typeInfo: {
                type: TransactionType.LocalOnRamp,
            },
            status: TransactionStatus.Pending,
            addedTime: Date.now(),
            hash: '',
            options: { request: {} },
            transactionOriginType: TransactionOriginType.Internal,
        };
        // use addTransaction action so transactionWatcher picks it up
        dispatch(addTransaction(transactionDetail));
    }, [chainId, ownerAddress, dispatch]);
    return { externalTransactionId: externalTransactionId.current, dispatchAddTransaction };
}
export function useMeldFiatCurrencySupportInfo(countryCode, skip = false, rampDirection) {
    // Not all the currencies are supported by Meld, so we need to fallback to USD if the currency is not supported
    const appFiatCurrencyInfo = useAppFiatCurrencyInfo();
    const fallbackCurrencyInfo = useFiatCurrencyInfo(FiatCurrency.UnitedStatesDollar);
    const appFiatCurrencyCode = appFiatCurrencyInfo.code.toLowerCase();
    const { useFiatOnRampAggregatorSupportedFiatCurrenciesQuery } = getFiatOnRampAggregatorApi();
    const { data: supportedFiatCurrencies } = useFiatOnRampAggregatorSupportedFiatCurrenciesQuery({ countryCode, rampDirection }, { skip });
    const appFiatCurrencySupported = !supportedFiatCurrencies ||
        supportedFiatCurrencies.fiatCurrencies.some((currency) => appFiatCurrencyCode === currency.fiatCurrencyCode.toLowerCase());
    const meldSupportedFiatCurrency = appFiatCurrencySupported ? appFiatCurrencyInfo : fallbackCurrencyInfo;
    return {
        appFiatCurrencySupportedInMeld: appFiatCurrencySupported,
        meldSupportedFiatCurrency,
        supportedFiatCurrencies: supportedFiatCurrencies === null || supportedFiatCurrencies === void 0 ? void 0 : supportedFiatCurrencies.fiatCurrencies,
    };
}
function buildCurrencyIdForFORSupportedToken(supportedToken) {
    const chainId = toSupportedChainId(supportedToken.chainId);
    return chainId
        ? supportedToken.address
            ? buildCurrencyId(chainId, supportedToken.address)
            : buildNativeCurrencyId(chainId)
        : undefined;
}
export function useFiatOnRampSupportedTokens({ sourceCurrencyCode, countryCode, skip = false, rampDirection, }) {
    const { useFiatOnRampAggregatorSupportedTokensQuery } = getFiatOnRampAggregatorApi();
    const { data: supportedTokensResponse, isLoading: supportedTokensLoading, error: supportedTokensError, refetch: refetchSupportedTokens, } = useFiatOnRampAggregatorSupportedTokensQuery({ fiatCurrency: sourceCurrencyCode, countryCode, rampDirection }, { skip });
    const supportedTokensById = useMemo(() => {
        var _a;
        return (_a = supportedTokensResponse === null || supportedTokensResponse === void 0 ? void 0 : supportedTokensResponse.supportedTokens.reduce((acc, token) => {
            const currencyId = buildCurrencyIdForFORSupportedToken(token);
            if (currencyId) {
                acc[currencyId] = token;
            }
            return acc;
        }, {})) !== null && _a !== void 0 ? _a : {};
    }, [supportedTokensResponse]);
    const { data: currencies, error: currenciesError, loading: currenciesLoading, refetch: refetchCurrencies, } = useCurrencies(Object.keys(supportedTokensById));
    const list = useMemo(() => Object.entries(supportedTokensById)
        .map(([currencyId, fiatOnRampToken]) => ({
        currencyInfo: currencies === null || currencies === void 0 ? void 0 : currencies.find((currency) => currency.currencyId.toLowerCase() === currencyId.toLowerCase()),
        meldCurrencyCode: fiatOnRampToken.cryptoCurrencyCode,
    }))
        .filter((item) => !!item.currencyInfo), [currencies, supportedTokensById]);
    const loading = supportedTokensLoading || currenciesLoading;
    const error = Boolean(supportedTokensError || currenciesError);
    const refetch = async () => {
        if (supportedTokensError) {
            await (refetchSupportedTokens === null || refetchSupportedTokens === void 0 ? void 0 : refetchSupportedTokens());
        }
        if (currenciesError) {
            refetchCurrencies === null || refetchCurrencies === void 0 ? void 0 : refetchCurrencies();
        }
    };
    return { list, loading, error, refetch };
}
/**
 * Hook to load quotes
 */
export function useFiatOnRampQuotes({ baseCurrencyAmount, baseCurrencyCode, quoteCurrencyCode, countryCode, countryState, rampDirection, balanceError, }) {
    var _a, _b;
    const debouncedBaseCurrencyAmount = useDebounce(baseCurrencyAmount, SHORT_DELAY);
    const walletAddress = (_a = useAccountMeta()) === null || _a === void 0 ? void 0 : _a.address;
    const { useFiatOnRampAggregatorCryptoQuoteQuery } = getFiatOnRampAggregatorApi();
    const { currentData: quotesResponse, isFetching: quotesFetching, error: quotesError, } = useFiatOnRampAggregatorCryptoQuoteQuery(baseCurrencyAmount && countryCode && quoteCurrencyCode && baseCurrencyCode && !balanceError
        ? {
            sourceAmount: baseCurrencyAmount,
            sourceCurrencyCode: rampDirection === RampDirection.OFFRAMP ? quoteCurrencyCode : baseCurrencyCode,
            destinationCurrencyCode: rampDirection === RampDirection.OFFRAMP ? baseCurrencyCode : quoteCurrencyCode,
            countryCode,
            walletAddress: walletAddress !== null && walletAddress !== void 0 ? walletAddress : undefined,
            state: countryState,
            rampDirection,
        }
        : skipToken, {
        refetchOnMountOrArgChange: true,
    });
    const loading = quotesFetching || debouncedBaseCurrencyAmount !== baseCurrencyAmount;
    // if user is entering base amount -> ignore previous errors
    const error = debouncedBaseCurrencyAmount !== baseCurrencyAmount ? undefined : quotesError;
    return {
        loading,
        error,
        quotes: (_b = quotesResponse === null || quotesResponse === void 0 ? void 0 : quotesResponse.quotes) !== null && _b !== void 0 ? _b : undefined,
    };
}
export function useParseFiatOnRampError(error, currencyCode, balanceError) {
    const { t } = useTranslation();
    const { formatNumberOrString } = useLocalizationContext();
    let errorText;
    if (balanceError) {
        errorText = t('fiatOffRamp.error.balance');
    }
    if (!error) {
        return { errorText };
    }
    errorText = t('fiatOnRamp.error.default');
    if (isFiatOnRampApiError(error)) {
        if (isInvalidRequestAmountTooLow(error)) {
            const formattedAmount = formatNumberOrString({
                value: error.data.context.minimumAllowed,
                type: NumberType.FiatStandard,
                currencyCode,
            });
            errorText = t('fiatOnRamp.error.min', { amount: formattedAmount });
        }
        else if (isInvalidRequestAmountTooHigh(error)) {
            const formattedAmount = formatNumberOrString({
                value: error.data.context.maximumAllowed,
                type: NumberType.FiatStandard,
                currencyCode,
            });
            errorText = t('fiatOnRamp.error.max', { amount: formattedAmount });
        }
    }
    return { errorText };
}
export function useIsSupportedFiatOnRampCurrency(currencyId, skip = false) {
    var _a, _b;
    const fallbackCountryCode = getCountry();
    const { useFiatOnRampAggregatorGetCountryQuery } = getFiatOnRampAggregatorApi();
    const { currentData: ipCountryData } = useFiatOnRampAggregatorGetCountryQuery(undefined, { skip });
    const { meldSupportedFiatCurrency } = useMeldFiatCurrencySupportInfo((_a = ipCountryData === null || ipCountryData === void 0 ? void 0 : ipCountryData.countryCode) !== null && _a !== void 0 ? _a : fallbackCountryCode, skip);
    const { list: supportedTokensList, loading: supportedTokensLoading, error: supportedTokensError, } = useFiatOnRampSupportedTokens({
        sourceCurrencyCode: meldSupportedFiatCurrency.code,
        countryCode: (_b = ipCountryData === null || ipCountryData === void 0 ? void 0 : ipCountryData.countryCode) !== null && _b !== void 0 ? _b : fallbackCountryCode,
        skip,
    });
    if (supportedTokensLoading || supportedTokensError) {
        return undefined;
    }
    const foundToken = supportedTokensList === null || supportedTokensList === void 0 ? void 0 : supportedTokensList.find((token) => { var _a; return ((_a = token.currencyInfo) === null || _a === void 0 ? void 0 : _a.currencyId) === currencyId; });
    return foundToken;
}
//# sourceMappingURL=hooks.js.map