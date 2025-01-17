import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [More, AnimatedMore] = createIcon({
    name: 'More',
    getIcon: (props) => (<Svg viewBox="0 0 20 20" fill="none" {...props}>
      <Path d="M10.0165 5.00033C9.09654 5.00033 8.3457 4.25366 8.3457 3.33366C8.3457 2.41366 9.08737 1.66699 10.0082 1.66699H10.0165C10.9365 1.66699 11.6832 2.41366 11.6832 3.33366C11.6832 4.25366 10.9374 5.00033 10.0165 5.00033ZM11.6832 10.0003C11.6832 9.08033 10.9365 8.33366 10.0165 8.33366H10.0082C9.0882 8.33366 8.3457 9.08033 8.3457 10.0003C8.3457 10.9203 9.09571 11.667 10.0165 11.667C10.9374 11.667 11.6832 10.9203 11.6832 10.0003ZM11.6832 16.667C11.6832 15.747 10.9365 15.0003 10.0165 15.0003H10.0082C9.0882 15.0003 8.3457 15.747 8.3457 16.667C8.3457 17.587 9.09571 18.3337 10.0165 18.3337C10.9374 18.3337 11.6832 17.587 11.6832 16.667Z" fill={'currentColor' !== null && 'currentColor' !== void 0 ? 'currentColor' : '#5D6785'}/>
    </Svg>),
    defaultFill: '#5D6785',
});
//# sourceMappingURL=More.jsx.map