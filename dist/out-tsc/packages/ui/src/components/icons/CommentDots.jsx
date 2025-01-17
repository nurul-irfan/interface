import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [CommentDots, AnimatedCommentDots] = createIcon({
    name: 'CommentDots',
    getIcon: (props) => (<Svg viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M12 4C7.03 4 3 6.99998 3 12.001C3 14.121 3.72995 15.892 4.94995 17.212C4.79995 18.172 4.25992 19.272 3.16992 20.152C2.83992 20.432 3.02996 20.9819 3.45996 20.9919C4.87996 21.0419 7.06991 20.852 8.40991 19.422C9.50991 19.802 10.72 20.002 12 20.002C16.97 20.002 21 17.001 21 12.001C21 6.99998 16.97 4 12 4ZM8.02002 13C7.46802 13 7.01489 12.552 7.01489 12C7.01489 11.448 7.45801 11 8.01001 11H8.02002C8.57302 11 9.02002 11.448 9.02002 12C9.02002 12.552 8.57202 13 8.02002 13ZM12.02 13C11.468 13 11.0149 12.552 11.0149 12C11.0149 11.448 11.458 11 12.01 11H12.02C12.573 11 13.02 11.448 13.02 12C13.02 12.552 12.572 13 12.02 13ZM16.02 13C15.468 13 15.0149 12.552 15.0149 12C15.0149 11.448 15.458 11 16.01 11H16.02C16.573 11 17.02 11.448 17.02 12C17.02 12.552 16.572 13 16.02 13Z" fill={'currentColor' !== null && 'currentColor' !== void 0 ? 'currentColor' : '#25314C'}/>
    </Svg>),
    defaultFill: '#25314C',
});
//# sourceMappingURL=CommentDots.jsx.map