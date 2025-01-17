import { G, Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [ReceiptText, AnimatedReceiptText] = createIcon({
    name: 'ReceiptText',
    getIcon: (props) => (<Svg viewBox="0 0 20 20" fill="none" {...props}>
      <G id="receipt-text">
        <Path id="receipt-text_2" d="M14.1667 2.5H5.83337C4.16671 2.5 3.33337 3.33333 3.33337 5V15.5175C3.33337 16.2042 4.11752 16.5958 4.66669 16.1842L5.79919 15.335C6.29669 14.9617 6.99341 15.0117 7.43341 15.4508L9.11585 17.1333C9.60418 17.6217 10.3959 17.6217 10.8834 17.1333L12.5659 15.4508C13.0059 15.0108 13.7026 14.9617 14.2001 15.335L15.3326 16.1842C15.8817 16.5958 16.6659 16.2042 16.6659 15.5175V5C16.6667 3.33333 15.8334 2.5 14.1667 2.5ZM10.8334 11.4583H6.66671C6.32171 11.4583 6.04171 11.1783 6.04171 10.8333C6.04171 10.4883 6.32171 10.2083 6.66671 10.2083H10.8334C11.1784 10.2083 11.4584 10.4883 11.4584 10.8333C11.4584 11.1783 11.1784 11.4583 10.8334 11.4583ZM13.3334 8.125H6.66671C6.32171 8.125 6.04171 7.845 6.04171 7.5C6.04171 7.155 6.32171 6.875 6.66671 6.875H13.3334C13.6784 6.875 13.9584 7.155 13.9584 7.5C13.9584 7.845 13.6784 8.125 13.3334 8.125Z" fill={'currentColor' !== null && 'currentColor' !== void 0 ? 'currentColor' : '#7D7D7D'}/>
      </G>
    </Svg>),
    defaultFill: '#7D7D7D',
});
//# sourceMappingURL=ReceiptText.jsx.map