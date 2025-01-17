import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [Wrench, AnimatedWrench] = createIcon({
    name: 'Wrench',
    getIcon: (props) => (<Svg viewBox="0 0 19 18" fill="none" {...props}>
      <Path d="M18.08 3.55996L15.9 5.73996C15.32 6.30996 14.37 6.30998 13.79 5.72998L12.77 4.70996C12.19 4.12996 12.19 3.17995 12.77 2.60995L14.94 0.419981C13.41 -0.190019 11.51 -0.210047 9.73 0.859953C9.01 1.28995 8.4 1.86997 7.97 2.56997C7.94 2.60997 7.91 2.64998 7.89 2.69998C7.11 3.98998 6.9 5.33996 7.08 6.55996C7.15 7.01996 6.99 7.47995 6.66 7.79995L1.34 13.13C0.779996 13.68 0.5 14.42 0.5 15.14C0.5 15.88 0.779996 16.6 1.34 17.16C2.45 18.28 4.25999 18.28 5.37 17.16L10.7 11.84C11.02 11.51 11.48 11.35 11.94 11.42C13.16 11.6 14.51 11.39 15.79 10.62C16.55 10.17 17.19 9.52997 17.63 8.77997C18.71 6.99997 18.69 5.08996 18.08 3.55996ZM3.52 16C2.97 16 2.52 15.55 2.52 15C2.52 14.45 2.95999 14 3.50999 14H3.52C4.07 14 4.52 14.45 4.52 15C4.52 15.55 4.07 16 3.52 16Z" fill={'currentColor' !== null && 'currentColor' !== void 0 ? 'currentColor' : '#222222'}/>
    </Svg>),
    defaultFill: '#222222',
});
//# sourceMappingURL=Wrench.jsx.map