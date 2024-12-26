import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [ArrowRightToLine, AnimatedArrowRightToLine] = createIcon({
    name: 'ArrowRightToLine',
    getIcon: (props) => (<Svg viewBox="0 0 20 20" fill="none" {...props}>
      <Path d="M14.9359 10.3184C14.8934 10.4209 14.8325 10.5125 14.755 10.59L10.5892 14.7559C10.4267 14.9184 10.2133 15 9.99996 15C9.78663 15 9.57327 14.9184 9.41077 14.7559C9.08493 14.43 9.08493 13.9033 9.41077 13.5775L12.1549 10.8333H2.49996C2.03913 10.8333 1.66663 10.46 1.66663 10C1.66663 9.54 2.03913 9.16666 2.49996 9.16666H12.1549L9.41077 6.42252C9.08493 6.09669 9.08493 5.56997 9.41077 5.24414C9.7366 4.9183 10.2633 4.9183 10.5892 5.24414L14.755 9.40999C14.8325 9.48749 14.8934 9.5791 14.9359 9.6816C15.02 9.88493 15.02 10.1151 14.9359 10.3184ZM17.5 4.16666C17.0391 4.16666 16.6666 4.54 16.6666 5V15C16.6666 15.46 17.0391 15.8333 17.5 15.8333C17.9608 15.8333 18.3333 15.46 18.3333 15V5C18.3333 4.54 17.9608 4.16666 17.5 4.16666Z" fill="currentColor"/>
    </Svg>),
});
//# sourceMappingURL=ArrowRightToLine.jsx.map