import { PropsWithChildren } from 'react';
import { PopperProps } from 'ui/src';
import { FlexProps } from 'ui/src/components/layout';
import { MenuContentItem } from 'wallet/src/components/menu/types';
type ContextMenuProps = {
    menuOptions: MenuContentItem[];
    itemId: string;
    menuStyleProps?: FlexProps;
    onLeftClick?: boolean;
    closeOnClick?: boolean;
    hoverable?: boolean;
} & PopperProps;
/**
 * Base component for a context menu shown on right click.
 * Expected use is to wrap a component that will trigger the context menu.
 *
 * Pass empty object to `offset` to place the modal below the trigger element.
 */
export declare function ContextMenu({ children, menuOptions, menuStyleProps, itemId, onLeftClick, closeOnClick, ...rest }: PropsWithChildren<ContextMenuProps>): JSX.Element;
export {};
//# sourceMappingURL=ContextMenu.d.ts.map