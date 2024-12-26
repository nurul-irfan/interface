import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Protocol } from '@uniswap/router-sdk';
import { Flex, Text, Tooltip, styled as tamaguiStyled } from 'ui/src';
import { DotLine } from 'ui/src/components/icons/DotLine';
import { zIndices } from 'ui/src/theme';
import { CurrencyLogo } from 'uniswap/src/components/CurrencyLogo/CurrencyLogo';
import { SplitLogo } from 'uniswap/src/components/CurrencyLogo/SplitLogo';
import { BIPS_BASE } from 'uniswap/src/constants/misc';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { Trans } from 'uniswap/src/i18n';
import { buildCurrencyId, buildNativeCurrencyId } from 'uniswap/src/utils/currencyId';
const PoolBadge = tamaguiStyled(Flex, {
    row: true,
    centered: true,
    p: '$spacing8',
});
const OpaqueBadge = tamaguiStyled(PoolBadge, {
    backgroundColor: '$surface2',
    borderRadius: '$rounded8',
    justifyContent: 'flex-start',
    p: '$spacing4',
    zIndex: zIndices.sticky,
    '$platform-web': {
        display: 'grid',
        gridGap: '$spacing4',
        gridAutoFlow: 'column',
    },
});
const BadgeText = tamaguiStyled(Text, {
    variant: 'body4',
    '$platform-web': {
        wordBreak: 'normal',
    },
});
const currencyToCurrencyId = (currency) => {
    return 'address' in currency
        ? buildCurrencyId(currency.chainId, currency.address)
        : buildNativeCurrencyId(currency.chainId);
};
function Pool({ currency0, currency1, feeAmount, }) {
    const currency0CurrencyInfo = useCurrencyInfo(currencyToCurrencyId(currency0));
    const currency1CurrencyInfo = useCurrencyInfo(currencyToCurrencyId(currency1));
    return (_jsxs(Tooltip, { placement: "top", children: [_jsx(Tooltip.Trigger, { children: _jsxs(OpaqueBadge, { children: [_jsx(Flex, { mr: 4, ml: 12, children: _jsx(SplitLogo, { chainId: currency0.chainId, inputCurrencyInfo: currency0CurrencyInfo, outputCurrencyInfo: currency1CurrencyInfo, size: 20 }) }), _jsxs(BadgeText, { children: [feeAmount / BIPS_BASE, "%"] })] }) }), _jsxs(Tooltip.Content, { children: [_jsx(Text, { variant: "body4", children: _jsx(Trans, { i18nKey: "pool.percent", values: { pct: (currency0 === null || currency0 === void 0 ? void 0 : currency0.symbol) + '/' + (currency1 === null || currency1 === void 0 ? void 0 : currency1.symbol) + ' ' + feeAmount / 10000 } }) }), _jsx(Tooltip.Arrow, {})] })] }));
}
export default function RoutingDiagram({ currencyIn, currencyOut, routes, }) {
    const currencyInCurrencyInfo = useCurrencyInfo(currencyToCurrencyId(currencyIn));
    const currencyOutCurrencyInfo = useCurrencyInfo(currencyToCurrencyId(currencyOut));
    return (_jsx(Flex, { children: routes.map((entry, index) => (_jsxs(Flex, { alignItems: "center", style: { display: 'grid', gridTemplateColumns: '24px 1fr 24px' }, children: [_jsx(CurrencyLogo, { currencyInfo: currencyInCurrencyInfo, size: 20 }), _jsx(Route, { entry: entry }), _jsx(CurrencyLogo, { currencyInfo: currencyOutCurrencyInfo, size: 20 })] }, index))) }));
}
function Route({ entry: { percent, path, protocol } }) {
    const badgeText = protocol === Protocol.MIXED
        ? [...new Set(path.map(([, , , p]) => p.toUpperCase()))].sort().join(' + ') // extract all protocols involved in mixed path
        : protocol.toUpperCase();
    return (_jsxs(Flex, { row: true, centered: true, style: { padding: '0.1rem 0.5rem' }, width: "100%", children: [_jsx(Flex, { alignItems: "center", position: "absolute", width: "100%", zIndex: 1, opacity: 0.5, children: _jsx(DotLine, { minWidth: "100%", minHeight: 35 }) }), _jsxs(OpaqueBadge, { children: [_jsx(BadgeText, { children: badgeText }), _jsxs(BadgeText, { style: { minWidth: 'auto' }, children: [percent.toSignificant(2), "%"] })] }), _jsx(Flex, { row: true, flexWrap: "wrap", m: -32, gap: 1, width: "100%", style: { justifyContent: 'space-evenly', zIndex: 2 }, children: path.map(([currency0, currency1, feeAmount], index) => (_jsx(Pool, { currency0: currency0, currency1: currency1, feeAmount: feeAmount }, index))) })] }));
}
//# sourceMappingURL=RoutingDiagram.js.map