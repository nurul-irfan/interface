import { uniswapUrls } from 'uniswap/src/constants/urls';
import { FetchError } from 'uniswap/src/data/apiClients/FetchError';
import { REQUEST_SOURCE, getVersionHeader } from 'uniswap/src/data/constants';
import { logger } from 'utilities/src/logger/logger';
import { isMobileApp } from 'utilities/src/platform';
export const BASE_UNISWAP_HEADERS = {
    'x-request-source': REQUEST_SOURCE,
    'x-app-version': getVersionHeader(),
    ...(isMobileApp ? { Origin: uniswapUrls.apiOrigin } : {}),
};
export function createApiClient({ baseUrl, includeBaseUniswapHeaders = true, additionalHeaders = {}, }) {
    const headers = includeBaseUniswapHeaders ? { ...BASE_UNISWAP_HEADERS, ...additionalHeaders } : additionalHeaders;
    return {
        get fetch() {
            return async (path, options) => {
                try {
                    return await fetch(`${baseUrl}${path}`, {
                        ...options,
                        headers: {
                            ...headers,
                            ...options === null || options === void 0 ? void 0 : options.headers,
                        },
                    });
                }
                catch (error) {
                    logger.debug('apiClients', 'fetch', 'Failed to fetch', error, {
                        path,
                        ...options,
                    });
                    throw error;
                }
            };
        },
        get get() {
            return async (path, options) => {
                if (options === null || options === void 0 ? void 0 : options.params) {
                    const searchParams = new URLSearchParams();
                    for (const [key, value] of Object.entries(options.params)) {
                        if (value !== undefined && value !== null) {
                            searchParams.append(key, value.toString());
                        }
                    }
                    path += '?' + searchParams.toString();
                }
                const response = await this.fetch(path, options);
                if (!response.ok) {
                    let data;
                    logger.debug('apiClients', 'get', 'Failed to fetch', response, {
                        path,
                        ...options,
                    });
                    try {
                        data = await response.json();
                    }
                    catch (e) {
                        throw new FetchError({ response, cause: e });
                    }
                    throw new FetchError({ response, data });
                }
                return (await response.json());
            };
        },
        get post() {
            return async (path, options) => {
                var _a;
                const _options = options !== null && options !== void 0 ? options : {};
                _options.headers = {
                    'Content-Type': 'application/json',
                    ...((_a = options === null || options === void 0 ? void 0 : options.headers) !== null && _a !== void 0 ? _a : {}),
                };
                return await this.get(path, { ..._options, method: 'POST' });
            };
        },
    };
}
//# sourceMappingURL=createApiClient.js.map