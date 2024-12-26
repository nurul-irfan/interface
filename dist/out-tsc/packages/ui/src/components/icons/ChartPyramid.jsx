import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [ChartPyramid, AnimatedChartPyramid] = createIcon({
    name: 'ChartPyramid',
    getIcon: (props) => (<Svg viewBox="0 0 20 20" fill="none" {...props}>
      <Path d="M15.46 12.2916H4.54001C4.35001 12.2916 4.22917 12.0875 4.32084 11.9208L5.65334 9.50416C5.6975 9.42416 5.78084 9.37496 5.87251 9.37496H14.1275C14.2183 9.37496 14.3025 9.42416 14.3467 9.50416L15.6792 11.9208C15.7708 12.0875 15.65 12.2916 15.46 12.2916ZM11.3667 4.14161C10.775 3.06661 9.225 3.06661 8.63333 4.14161L6.63082 7.75418C6.53832 7.92084 6.65917 8.12496 6.84917 8.12496H13.15C13.3409 8.12496 13.4608 7.92084 13.3683 7.75418L11.3667 4.14161ZM17.35 14.9333L16.655 13.6708C16.6109 13.5908 16.5275 13.5416 16.4359 13.5416H3.56502C3.47419 13.5416 3.39002 13.5908 3.34585 13.6708L2.65 14.9333C2.21667 15.7083 2.77503 16.6666 3.66669 16.6666H16.3333C17.225 16.6666 17.7833 15.7083 17.35 14.9333Z" fill={'currentColor' !== null && 'currentColor' !== void 0 ? 'currentColor' : '#9B9B9B'}/>
    </Svg>),
    defaultFill: '#9B9B9B',
});
//# sourceMappingURL=ChartPyramid.jsx.map