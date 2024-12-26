import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [SearchMinus, AnimatedSearchMinus] = createIcon({
    name: 'SearchMinus',
    getIcon: (props) => (<Svg viewBox="0 0 16 16" fill="none" {...props}>
      <Path d="M14.3534 13.6467L11.44 10.7333C12.2066 9.81334 12.6667 8.62667 12.6667 7.33333C12.6667 4.38667 10.28 2 7.33333 2C4.38667 2 2 4.38667 2 7.33333C2 10.28 4.38667 12.6667 7.33333 12.6667C8.62667 12.6667 9.81332 12.2067 10.7333 11.44L13.6466 14.3533C13.7466 14.4533 13.8733 14.5 14 14.5C14.1267 14.5 14.2534 14.4533 14.3534 14.3533C14.5467 14.16 14.5467 13.84 14.3534 13.6467ZM9.33333 7.83333H5.33333C5.06 7.83333 4.83333 7.60667 4.83333 7.33333C4.83333 7.06 5.06 6.83333 5.33333 6.83333H9.33333C9.60667 6.83333 9.83333 7.06 9.83333 7.33333C9.83333 7.60667 9.60667 7.83333 9.33333 7.83333Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </Svg>),
});
//# sourceMappingURL=SearchMinus.jsx.map