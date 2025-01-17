import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [Stacked, AnimatedStacked] = createIcon({
    name: 'Stacked',
    getIcon: (props) => (<Svg viewBox="0 0 23 23" fill="none" {...props}>
      <Path d="M1.5 16.002L11.5 21.002L21.5 16.002M1.5 11.002L11.5 16.002L21.5 11.002M11.5 1.00195L1.5 6.00195L11.5 11.002L21.5 6.00195L11.5 1.00195Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>),
});
//# sourceMappingURL=Stacked.jsx.map