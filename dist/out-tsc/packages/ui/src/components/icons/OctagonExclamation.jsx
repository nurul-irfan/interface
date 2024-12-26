import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [OctagonExclamation, AnimatedOctagonExclamation] = createIcon({
    name: 'OctagonExclamation',
    getIcon: (props) => (<Svg viewBox="0 0 20 20" fill="none" {...props}>
      <Path d="M14.1112 2.07297L17.9272 5.88901C18.1874 6.14921 18.3337 6.50296 18.3337 6.8715V13.1282C18.3337 13.4967 18.1874 13.8505 17.9272 14.1107L14.1112 17.9267C13.85 18.1869 13.4972 18.3332 13.1287 18.3332H6.87199C6.50345 18.3332 6.1497 18.1869 5.8895 17.9267L2.07346 14.1107C1.81326 13.8495 1.66699 13.4967 1.66699 13.1282V6.8715C1.66699 6.50296 1.81326 6.14921 2.07346 5.88901L5.8895 2.07297C6.15062 1.81278 6.50345 1.6665 6.87199 1.6665H13.1287C13.4972 1.6665 13.851 1.81278 14.1112 2.07297ZM9.06186 6.61612C9.06186 6.16785 9.42568 5.80403 9.87396 5.80403C10.3222 5.80403 10.6861 6.16785 10.6861 6.61612V9.86451C10.6861 10.3128 10.3222 10.6766 9.87396 10.6766C9.42568 10.6766 9.06186 10.3128 9.06186 9.86451V6.61612ZM9.89564 14.1957C9.29794 14.1957 8.80729 13.7106 8.80729 13.1129C8.80729 12.5152 9.2871 12.0301 9.8848 12.0301H9.89564C10.4944 12.0301 10.9784 12.5152 10.9784 13.1129C10.9784 13.7106 10.4933 14.1957 9.89564 14.1957Z" fill={'currentColor' !== null && 'currentColor' !== void 0 ? 'currentColor' : '#FF0000'} fillRule="evenodd" clipRule="evenodd"/>
    </Svg>),
    defaultFill: '#FF0000',
});
//# sourceMappingURL=OctagonExclamation.jsx.map