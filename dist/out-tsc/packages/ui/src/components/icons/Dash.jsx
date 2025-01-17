import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [Dash, AnimatedDash] = createIcon({
    name: 'Dash',
    getIcon: (props) => (<Svg fill="none" viewBox="0 0 12 2" {...props}>
      <Path stroke="currentColor" d="M0 1h12" strokeWidth="2"/>
    </Svg>),
});
//# sourceMappingURL=Dash.jsx.map