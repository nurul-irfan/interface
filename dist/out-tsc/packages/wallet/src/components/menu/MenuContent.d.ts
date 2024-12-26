/// <reference types="react" />
import { FlexProps } from 'ui/src/components/layout';
import { MenuContentItem } from 'wallet/src/components/menu/types';
type MenuContentProps = {
    onClose?: () => void;
    items: MenuContentItem[];
};
export declare function MenuContent({ items, onClose, ...rest }: MenuContentProps & FlexProps): JSX.Element;
export {};
//# sourceMappingURL=MenuContent.d.ts.map