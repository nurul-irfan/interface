import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [UserSquare, AnimatedUserSquare] = createIcon({
    name: 'UserSquare',
    getIcon: (props) => (<Svg viewBox="0 0 20 20" fill="none" {...props}>
      <Path d="M14.6875 2.5H5.3125C3.4375 2.5 2.5 3.4375 2.5 5.3125V14.6875C2.5 16.5625 3.4375 17.5 5.3125 17.5H14.6875C16.5625 17.5 17.5 16.5625 17.5 14.6875V5.3125C17.5 3.4375 16.5625 2.5 14.6875 2.5ZM10.0067 5.83333C11.3875 5.83333 12.5067 6.9525 12.5067 8.33333C12.5067 9.71417 11.3875 10.8333 10.0067 10.8333C8.62588 10.8333 7.50671 9.71417 7.50671 8.33333C7.50671 6.9525 8.62588 5.83333 10.0067 5.83333ZM14.6833 16.25H5.31667C5.20834 16.25 5.10834 16.25 5.00834 16.2417C5.11667 14.825 5.9167 12.975 8.57503 12.975H11.425C14.075 12.975 14.8833 14.8417 14.9917 16.2417C14.8917 16.25 14.7917 16.25 14.6833 16.25Z" fill={'currentColor' !== null && 'currentColor' !== void 0 ? 'currentColor' : '#FC72FF'}/>
    </Svg>),
    defaultFill: '#FC72FF',
});
//# sourceMappingURL=UserSquare.jsx.map