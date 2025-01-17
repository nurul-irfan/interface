import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [PenLine, AnimatedPenLine] = createIcon({
    name: 'PenLine',
    getIcon: (props) => (<Svg viewBox="0 0 19 19" fill="none" {...props}>
      <Path d="M14.0371 9.00194L5 18H0V13L8.99805 3.963C9.11505 3.845 9.3051 3.845 9.4231 3.963L14.0381 8.57799C14.1551 8.69499 14.1551 8.88494 14.0371 9.00194ZM15.1079 7.52794C15.2249 7.64494 15.415 7.64494 15.532 7.52794L17.4099 5.65001C18.1939 4.86601 18.1939 3.59405 17.4099 2.81005L15.1899 0.589953C14.4059 -0.194047 13.1341 -0.194047 12.3501 0.589953L10.4719 2.468C10.3549 2.58501 10.3549 2.77496 10.4719 2.89196L15.1079 7.52794ZM18 17.25H11C10.586 17.25 10.25 17.586 10.25 18C10.25 18.414 10.586 18.75 11 18.75H18C18.414 18.75 18.75 18.414 18.75 18C18.75 17.586 18.414 17.25 18 17.25Z" fill={'currentColor' !== null && 'currentColor' !== void 0 ? 'currentColor' : '#CECECE'}/>
    </Svg>),
    defaultFill: '#CECECE',
});
//# sourceMappingURL=PenLine.jsx.map