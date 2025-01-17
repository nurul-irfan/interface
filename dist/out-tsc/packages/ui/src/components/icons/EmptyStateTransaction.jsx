import { Path, Rect, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [EmptyStateTransaction, AnimatedEmptyStateTransaction] = createIcon({
    name: 'EmptyStateTransaction',
    getIcon: (props) => (<Svg viewBox="0 0 85 34" fill="none" {...props}>
      <Rect x="83.7" y="1.8" width="30.4" height="82.4" rx="5.2" transform="rotate(90 83.7 1.8)" stroke="currentColor" strokeWidth="2.4"/>
      <Path stroke="currentColor" d="M12.2 12.8h5.6m-5.6 5h5.6m5.4-5h49.6m-49.6 5h49.6" strokeWidth="2.4" strokeLinecap="round"/>
    </Svg>),
});
//# sourceMappingURL=EmptyStateTransaction.jsx.map