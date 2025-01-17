import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [Feedback, AnimatedFeedback] = createIcon({
    name: 'Feedback',
    getIcon: (props) => (<Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M18 3H6C4 3 3 4 3 6V21L6 18H18C20 18 21 17 21 15V6C21 4 20 3 18 3ZM16.106 9.98804L14.5759 11.468C14.4639 11.576 14.4129 11.732 14.4399 11.885L14.79 13.91C14.861 14.321 14.4279 14.634 14.0559 14.441L12.22 13.483C12.082 13.411 11.918 13.411 11.781 13.483L9.94604 14.4399C9.57404 14.6339 9.13994 14.3201 9.21094 13.9091L9.56104 11.885C9.58704 11.732 9.53605 11.576 9.42505 11.468L7.89502 9.98804C7.61402 9.71604 7.76898 9.24204 8.15698 9.18604L10.2739 8.88098C10.4279 8.85898 10.5609 8.76302 10.6299 8.62402L11.5471 6.78101C11.7331 6.40701 12.2701 6.40701 12.4561 6.78101L13.373 8.62402C13.442 8.76302 13.575 8.85898 13.729 8.88098L15.8459 9.18604C16.2329 9.24204 16.387 9.71604 16.106 9.98804Z" fill="currentColor"/>
    </Svg>),
});
//# sourceMappingURL=Feedback.jsx.map