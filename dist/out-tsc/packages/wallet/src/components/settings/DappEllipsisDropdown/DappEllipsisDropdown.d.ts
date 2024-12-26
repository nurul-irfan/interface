/// <reference types="react" />
import { type Account } from 'wallet/src/features/wallet/accounts/types';
export interface DappEllipsisDropdownProps {
    removeAllDappConnections: (activeAccount: Account) => Promise<void>;
    setIsEditing?: (isEditing: boolean) => void;
    isEditing?: boolean;
}
export declare function DappEllipsisDropdown(_: DappEllipsisDropdownProps): JSX.Element;
//# sourceMappingURL=DappEllipsisDropdown.d.ts.map