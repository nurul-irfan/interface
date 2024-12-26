import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { NetworkStatus } from '@apollo/client';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Loader } from 'ui/src';
import { AnimatedBottomSheetFlashList, AnimatedFlashList } from 'ui/src/components/AnimatedFlashList/AnimatedFlashList';
import { NoNfts } from 'ui/src/components/icons';
import { useDeviceDimensions } from 'ui/src/hooks/useDeviceDimensions';
import { BaseCard } from 'uniswap/src/components/BaseCard/BaseCard';
import { useNftsTabQuery } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { GQLQueries } from 'uniswap/src/data/graphql/uniswap-data-api/queries';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { WalletEventName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { HiddenNftsRow } from 'wallet/src/components/nfts/NFTHiddenRow';
import { ShowNFTModal } from 'wallet/src/components/nfts/ShowNFTModal';
import { isError, isNonPollingRequestInFlight } from 'wallet/src/data/utils';
import { EMPTY_NFT_ITEM, ESTIMATED_NFT_LIST_ITEM_SIZE, HIDDEN_NFTS_ROW } from 'wallet/src/features/nfts/constants';
import { useGroupNftsByVisibility } from 'wallet/src/features/nfts/hooks';
import { formatNftItems, getNFTAssetKey } from 'wallet/src/features/nfts/utils';
export const NFTS_TAB_DATA_DEPENDENCIES = [GQLQueries.NftsTab];
export const NUM_FIRST_NFTS = 30;
const PREFETCH_ITEMS_THRESHOLD = 0.5;
const LOADING_ITEM = 'loading';
const keyExtractor = (item) => { var _a, _b; return typeof item === 'string' ? item : getNFTAssetKey((_a = item.contractAddress) !== null && _a !== void 0 ? _a : '', (_b = item.tokenId) !== null && _b !== void 0 ? _b : ''); };
export const NftsList = forwardRef(function _NftsTab({ owner, footerHeight, isExternalProfile = false, renderedInModal = false, errorStateStyle, emptyStateStyle, ListFooterComponent, numColumns = 2, renderNFTItem, refreshControl, onContentSizeChange, onPressEmptyState, onScroll, refreshing, onRefresh, ...rest }, ref) {
    var _a, _b, _c, _d;
    const { t } = useTranslation();
    const { fullHeight } = useDeviceDimensions();
    const { gqlChains } = useEnabledChains();
    const [hiddenNftsExpanded, setHiddenNftsExpanded] = useState(false);
    const { data, fetchMore, refetch, networkStatus } = useNftsTabQuery({
        variables: {
            ownerAddress: owner,
            first: NUM_FIRST_NFTS,
            filter: { filterSpam: false },
            chains: gqlChains,
        },
        notifyOnNetworkStatusChange: true, // Used to trigger network state / loading on refetch or fetchMore
        errorPolicy: 'all', // Suppress non-null image.url fields from backend
    });
    const nftDataItems = formatNftItems(data);
    const shouldAddInLoadingItem = networkStatus === NetworkStatus.fetchMore && nftDataItems && nftDataItems.length % 2 === 1;
    const onListEndReached = useCallback(async () => {
        var _a, _b, _c, _d;
        if (!((_b = (_a = data === null || data === void 0 ? void 0 : data.nftBalances) === null || _a === void 0 ? void 0 : _a.pageInfo) === null || _b === void 0 ? void 0 : _b.hasNextPage)) {
            return;
        }
        await fetchMore({
            variables: {
                first: 30,
                after: (_d = (_c = data === null || data === void 0 ? void 0 : data.nftBalances) === null || _c === void 0 ? void 0 : _c.pageInfo) === null || _d === void 0 ? void 0 : _d.endCursor,
            },
        });
    }, [(_b = (_a = data === null || data === void 0 ? void 0 : data.nftBalances) === null || _a === void 0 ? void 0 : _a.pageInfo) === null || _b === void 0 ? void 0 : _b.endCursor, (_d = (_c = data === null || data === void 0 ? void 0 : data.nftBalances) === null || _c === void 0 ? void 0 : _c.pageInfo) === null || _d === void 0 ? void 0 : _d.hasNextPage, fetchMore]);
    const { nfts, numHidden, numShown } = useGroupNftsByVisibility(nftDataItems, hiddenNftsExpanded);
    const onHiddenRowPressed = useCallback(() => {
        if (hiddenNftsExpanded && footerHeight) {
            footerHeight.value = fullHeight;
        }
        setHiddenNftsExpanded(!hiddenNftsExpanded);
    }, [hiddenNftsExpanded, footerHeight, fullHeight]);
    useEffect(() => {
        sendAnalyticsEvent(WalletEventName.NFTsLoaded, {
            shown: numShown,
            hidden: numHidden,
        });
    }, [numHidden, numShown]);
    useEffect(() => {
        if (numHidden === 0 && hiddenNftsExpanded) {
            setHiddenNftsExpanded(false);
        }
    }, [hiddenNftsExpanded, numHidden]);
    const renderItem = useCallback(({ item, index }) => {
        if (typeof item !== 'string') {
            return renderNFTItem(item, index);
        }
        switch (item) {
            case LOADING_ITEM:
                // This case probably never occurs
                return _jsx(Loader.NFT, {});
            case EMPTY_NFT_ITEM:
                return null;
            case HIDDEN_NFTS_ROW:
                return (_jsx(_Fragment, { children: _jsxs(Flex, { grow: true, children: [_jsx(HiddenNftsRow, { isExpanded: hiddenNftsExpanded, numHidden: numHidden, onPress: onHiddenRowPressed }), hiddenNftsExpanded && _jsx(ShowNFTModal, {})] }) }));
            default:
                return null;
        }
    }, [hiddenNftsExpanded, numHidden, onHiddenRowPressed, renderNFTItem]);
    const onRetry = useCallback(() => refetch(), [refetch]);
    const renderLayout = useCallback((layout, item) => {
        if (item === HIDDEN_NFTS_ROW) {
            layout.span = 2;
        }
        return layout;
    }, []);
    const List = renderedInModal ? AnimatedBottomSheetFlashList : AnimatedFlashList;
    return (_jsx(List, { ...rest, ref: ref, ListEmptyComponent: 
        // initial loading
        isNonPollingRequestInFlight(networkStatus) ? (_jsx(Loader.NFT, { repeat: 6 })) : // no response and we're not loading already
            isError(networkStatus, !!data) ? (_jsx(Flex, { centered: true, grow: true, style: errorStateStyle, children: _jsx(BaseCard.ErrorState, { description: t('common.error.general'), retryButtonLabel: t('common.button.retry'), title: t('tokens.nfts.list.error.load.title'), onRetry: onRetry }) })) : (
            // empty view
            _jsx(Flex, { centered: true, pt: "$spacing48", px: "$spacing36", style: emptyStateStyle, children: _jsx(BaseCard.EmptyState, { buttonLabel: isExternalProfile || !onPressEmptyState ? undefined : t('tokens.nfts.list.none.button'), description: isExternalProfile
                        ? t('tokens.nfts.list.none.description.external')
                        : t('tokens.nfts.list.none.description.default'), icon: _jsx(NoNfts, { color: "$neutral3", size: "$icon.100" }), title: t('tokens.nfts.list.none.title'), onPress: onPressEmptyState }) })), 
        // we add a footer to cover any possible space, so user can scroll the top menu all the way to the top
        ListFooterComponent: _jsxs(_Fragment, { children: [nfts.length > 0 && networkStatus === NetworkStatus.fetchMore && _jsx(Loader.NFT, { repeat: 6 }), ListFooterComponent] }), data: shouldAddInLoadingItem ? [...nfts, LOADING_ITEM] : nfts, estimatedItemSize: ESTIMATED_NFT_LIST_ITEM_SIZE, keyExtractor: keyExtractor, numColumns: numColumns, overrideItemLayout: renderLayout, refreshControl: refreshControl, refreshing: refreshing, renderItem: renderItem, showsVerticalScrollIndicator: false, onContentSizeChange: onContentSizeChange, onEndReached: onListEndReached, onEndReachedThreshold: PREFETCH_ITEMS_THRESHOLD, onRefresh: onRefresh, onScroll: onScroll }));
});
//# sourceMappingURL=NftsList.js.map