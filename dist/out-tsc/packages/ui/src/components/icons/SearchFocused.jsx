import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [SearchFocused, AnimatedSearchFocused] = createIcon({
    name: 'SearchFocused',
    getIcon: (props) => (<Svg viewBox="0 0 24 25" fill="none" {...props}>
      <Path d="M10.5 18.998C14.6421 18.998 18 15.6402 18 11.498C18 7.35591 14.6421 3.99805 10.5 3.99805C6.35786 3.99805 3 7.35591 3 11.498C3 15.6402 6.35786 18.998 10.5 18.998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M21 21.998L16 16.998" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>),
});
//# sourceMappingURL=SearchFocused.jsx.map