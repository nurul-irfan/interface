import { DEFAULT_VERSION } from 'redux-persist/es/constants';
import { logger } from 'utilities/src/logger/logger';
export function createMigrate(migrations) {
    return function (state, currentVersion) {
        var _a, _b;
        try {
            if (!state) {
                logger.debug('redux-persist', 'createMigrate', 'no inbound state, skipping migration');
                return Promise.resolve(undefined);
            }
            const inboundVersion = (_b = (_a = state._persist) === null || _a === void 0 ? void 0 : _a.version) !== null && _b !== void 0 ? _b : DEFAULT_VERSION;
            if (inboundVersion === currentVersion) {
                logger.debug('redux-persist', 'createMigrate', `versions match (${currentVersion}), noop migration`);
                return Promise.resolve(state);
            }
            if (inboundVersion > currentVersion) {
                logger.debug('redux-persist', 'createMigrate', 'downgrading version is not supported');
                return Promise.resolve(state);
            }
            const migrationKeys = Object.keys(migrations)
                .map((ver) => parseInt(ver, 10))
                .filter((key) => currentVersion >= key && key > inboundVersion)
                .sort((a, b) => a - b);
            logger.debug('redux-persist', 'createMigrate', `migrationKeys: ${migrationKeys}`);
            const migratedState = migrationKeys.reduce((versionState, versionKey) => {
                logger.debug('redux-persist', 'createMigrate', `running migration for versionKey: ${versionKey}`);
                // Safe non-null assertion because `versionKey` comes from `Object.keys(migrations)`
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return migrations[versionKey](versionState);
            }, state);
            return Promise.resolve(migratedState);
        }
        catch (error) {
            logger.error(error, { tags: { file: 'redux-persist', function: 'createMigrate' } });
            return Promise.reject(error);
        }
    };
}
//# sourceMappingURL=createMigrate.js.map