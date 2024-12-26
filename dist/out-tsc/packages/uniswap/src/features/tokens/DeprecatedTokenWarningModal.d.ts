/// <reference types="react" />
import { SafetyLevel } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
interface Props {
    isVisible: boolean;
    currencyId: string;
    safetyLevel: Maybe<SafetyLevel>;
    disableAccept?: boolean;
    tokenLogoUrl: Maybe<string>;
    onClose: () => void;
    onAccept: () => void;
}
/**
 * @deprecated Use TokenWarningModal instead
 */
export default function DeprecatedTokenWarningModal({ isVisible, safetyLevel, disableAccept, tokenLogoUrl, onClose, onAccept, }: Props): JSX.Element | null;
export {};
//# sourceMappingURL=DeprecatedTokenWarningModal.d.ts.map