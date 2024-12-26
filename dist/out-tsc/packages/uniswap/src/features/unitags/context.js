import { jsx as _jsx } from "react/jsx-runtime";
import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';
import { UNITAGS_API_CACHE_KEY } from 'uniswap/src/data/apiClients/unitagsApi/UnitagsApiClient';
import { logger } from 'utilities/src/logger/logger';
const UnitagUpdaterContext = createContext(null);
export function UnitagUpdaterContextProvider({ children }) {
    const [refetchUnitagsCounter, setRefetchUnitagsCounter] = useState(0);
    const queryClient = useQueryClient();
    const triggerRefetchUnitags = () => {
        queryClient.resetQueries({ queryKey: [UNITAGS_API_CACHE_KEY] }).catch((error) => {
            logger.error(error, {
                tags: {
                    file: 'unitags/context.tsx',
                    function: 'triggerRefetchUnitags',
                },
            });
        });
        setRefetchUnitagsCounter((prevCounter) => prevCounter + 1);
    };
    return (_jsx(UnitagUpdaterContext.Provider, { value: { refetchUnitagsCounter, triggerRefetchUnitags }, children: children }));
}
export const useUnitagUpdater = () => {
    const context = useContext(UnitagUpdaterContext);
    if (!context) {
        throw new Error('useUnitagUpdate must be used within a UnitagUpdateProvider');
    }
    return context;
};
//# sourceMappingURL=context.js.map