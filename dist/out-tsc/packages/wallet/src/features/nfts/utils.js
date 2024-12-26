export function formatNftItems(data) {
    var _a, _b;
    const items = (_b = (_a = data === null || data === void 0 ? void 0 : data.nftBalances) === null || _a === void 0 ? void 0 : _a.edges) === null || _b === void 0 ? void 0 : _b.flatMap((item) => item.node);
    if (!items) {
        return undefined;
    }
    const nfts = items
        .filter((item) => { var _a, _b, _c; return ((_b = (_a = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _a === void 0 ? void 0 : _a.nftContract) === null || _b === void 0 ? void 0 : _b.address) && ((_c = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _c === void 0 ? void 0 : _c.tokenId); })
        .map((item) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
        return {
            name: (_b = (_a = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : undefined,
            description: (_d = (_c = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _c === void 0 ? void 0 : _c.description) !== null && _d !== void 0 ? _d : undefined,
            contractAddress: (_g = (_f = (_e = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _e === void 0 ? void 0 : _e.nftContract) === null || _f === void 0 ? void 0 : _f.address) !== null && _g !== void 0 ? _g : undefined,
            tokenId: (_j = (_h = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _h === void 0 ? void 0 : _h.tokenId) !== null && _j !== void 0 ? _j : undefined,
            imageUrl: (_m = (_l = (_k = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _k === void 0 ? void 0 : _k.image) === null || _l === void 0 ? void 0 : _l.url) !== null && _m !== void 0 ? _m : undefined,
            thumbnailUrl: (_q = (_p = (_o = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _o === void 0 ? void 0 : _o.thumbnail) === null || _p === void 0 ? void 0 : _p.url) !== null && _q !== void 0 ? _q : undefined,
            collectionName: (_t = (_s = (_r = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _r === void 0 ? void 0 : _r.collection) === null || _s === void 0 ? void 0 : _s.name) !== null && _t !== void 0 ? _t : undefined,
            isVerifiedCollection: (_w = (_v = (_u = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _u === void 0 ? void 0 : _u.collection) === null || _v === void 0 ? void 0 : _v.isVerified) !== null && _w !== void 0 ? _w : undefined,
            floorPrice: (_2 = (_1 = (_0 = (_z = (_y = (_x = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _x === void 0 ? void 0 : _x.collection) === null || _y === void 0 ? void 0 : _y.markets) === null || _z === void 0 ? void 0 : _z[0]) === null || _0 === void 0 ? void 0 : _0.floorPrice) === null || _1 === void 0 ? void 0 : _1.value) !== null && _2 !== void 0 ? _2 : undefined,
            isSpam: (_4 = (_3 = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _3 === void 0 ? void 0 : _3.isSpam) !== null && _4 !== void 0 ? _4 : undefined,
            imageDimensions: ((_7 = (_6 = (_5 = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _5 === void 0 ? void 0 : _5.image) === null || _6 === void 0 ? void 0 : _6.dimensions) === null || _7 === void 0 ? void 0 : _7.height) && ((_10 = (_9 = (_8 = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _8 === void 0 ? void 0 : _8.image) === null || _9 === void 0 ? void 0 : _9.dimensions) === null || _10 === void 0 ? void 0 : _10.width)
                ? {
                    width: (_11 = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _11 === void 0 ? void 0 : _11.image.dimensions.width,
                    height: (_12 = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _12 === void 0 ? void 0 : _12.image.dimensions.height,
                }
                : undefined,
            chain: (_13 = item === null || item === void 0 ? void 0 : item.ownedAsset) === null || _13 === void 0 ? void 0 : _13.chain,
        };
    });
    return nfts;
}
export const getNFTAssetKey = (address, token_id) => {
    // Backend returns both checksummed and non-checksummed addresses
    // so we need to lowercase it to be able to compare them
    return `nftItem.${address.toLowerCase()}.${token_id}`;
};
export const getIsNftHidden = ({ contractAddress, tokenId, isSpam, nftVisibility, }) => {
    var _a, _b;
    if (!contractAddress || !tokenId) {
        return true;
    }
    const nftKey = getNFTAssetKey(contractAddress, tokenId);
    const nftIsVisible = (_b = (_a = nftVisibility[nftKey]) === null || _a === void 0 ? void 0 : _a.isVisible) !== null && _b !== void 0 ? _b : isSpam === false;
    return !nftIsVisible;
};
//# sourceMappingURL=utils.js.map