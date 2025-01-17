import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [Masonry, AnimatedMasonry] = createIcon({
    name: 'Masonry',
    getIcon: (props) => (<Svg viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M10 3H3V8H10V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M21 3H14V12H21V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M21 16H14V21H21V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M10 12H3V21H10V12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>),
});
//# sourceMappingURL=Masonry.jsx.map