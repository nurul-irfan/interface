import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [SortVertical, AnimatedSortVertical] = createIcon({
    name: 'SortVertical',
    getIcon: (props) => (<Svg viewBox="0 0 17 16" fill="none" {...props}>
      <Path d="M11.638 8.86209C11.8987 9.12275 11.8987 9.54413 11.638 9.80479L8.97138 12.4715C8.84138 12.6015 8.67069 12.6668 8.50002 12.6668C8.32936 12.6668 8.15867 12.6015 8.02867 12.4715L5.362 9.80479C5.10134 9.54413 5.10134 9.12275 5.362 8.86209C5.62267 8.60142 6.04405 8.60142 6.30471 8.86209L8.50002 11.0574L10.6953 8.86209C10.956 8.60142 11.3774 8.60142 11.638 8.86209ZM6.30471 7.13813L8.50002 4.94281L10.6953 7.13813C10.8253 7.26813 10.996 7.33344 11.1667 7.33344C11.3374 7.33344 11.508 7.26813 11.638 7.13813C11.8987 6.87746 11.8987 6.45609 11.638 6.19542L8.97138 3.52875C8.71071 3.26809 8.28934 3.26809 8.02867 3.52875L5.362 6.19542C5.10134 6.45609 5.10134 6.87746 5.362 7.13813C5.62267 7.39879 6.04405 7.39879 6.30471 7.13813Z" fill={'currentColor' !== null && 'currentColor' !== void 0 ? 'currentColor' : '#CECECE'}/>
    </Svg>),
    defaultFill: '#CECECE',
});
//# sourceMappingURL=SortVertical.jsx.map