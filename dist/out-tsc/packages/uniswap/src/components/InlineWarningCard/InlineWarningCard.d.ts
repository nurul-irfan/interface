/// <reference types="react" />
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
type InlineWarningCardProps = {
    severity: WarningSeverity;
    heading?: string;
    description: string;
    heroIcon?: boolean;
    checkboxLabel?: string;
    onPressCtaButton?: () => void;
    checked?: boolean;
    setChecked?: (checked: boolean) => void;
    hideCtaIcon?: boolean;
    headingTestId?: string;
    descriptionTestId?: string;
    analyticsProperties?: Record<string, unknown>;
};
export declare function InlineWarningCard({ severity, heading, description, checkboxLabel, heroIcon, onPressCtaButton, checked, setChecked, hideCtaIcon, headingTestId, descriptionTestId, analyticsProperties, }: InlineWarningCardProps): JSX.Element | null;
export {};
//# sourceMappingURL=InlineWarningCard.d.ts.map