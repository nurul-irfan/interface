import { G, Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [Photo, AnimatedPhoto] = createIcon({
    name: 'Photo',
    getIcon: (props) => (<Svg viewBox="0 0 19 18" fill="none" {...props}>
      <G id="Icon">
        <Path id="image" d="M14 2.4375H5C3.1865 2.4375 2.1875 3.4365 2.1875 5.25V12.75C2.1875 14.5635 3.1865 15.5625 5 15.5625H14C15.8135 15.5625 16.8125 14.5635 16.8125 12.75V5.25C16.8125 3.4365 15.8135 2.4375 14 2.4375ZM5 3.5625H14C15.1827 3.5625 15.6875 4.06725 15.6875 5.25V10.6875L12.2825 7.28247C11.99 6.98997 11.51 6.98997 11.2175 7.28247L7.51248 10.9874C7.36998 11.1299 7.13002 11.1299 6.98752 10.9874L6.28247 10.2825C5.98997 9.98997 5.51003 9.98997 5.21753 10.2825L3.3125 12.1875V5.25C3.3125 4.06725 3.81725 3.5625 5 3.5625ZM5.5625 6.75C5.5625 6.2325 5.97803 5.8125 6.49478 5.8125H6.50229C7.01904 5.8125 7.43823 6.2325 7.43823 6.75C7.43823 7.2675 7.01979 7.6875 6.50229 7.6875C5.98554 7.6875 5.5625 7.2675 5.5625 6.75Z" fill="currentColor"/>
      </G>
    </Svg>),
});
//# sourceMappingURL=Photo.jsx.map