import type { MigrationManifest, PersistedState } from 'redux-persist';
export declare function createMigrate(migrations: MigrationManifest): (state: PersistedState, currentVersion: number) => Promise<PersistedState>;
//# sourceMappingURL=createMigrate.d.ts.map