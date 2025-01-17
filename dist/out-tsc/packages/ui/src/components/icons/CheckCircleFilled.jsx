import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [CheckCircleFilled, AnimatedCheckCircleFilled] = createIcon({
    name: 'CheckCircleFilled',
    getIcon: (props) => (<Svg viewBox="0 0 20 20" fill="none" {...props}>
      <Path d="M9.99996 1.66699C5.39996 1.66699 1.66663 5.40033 1.66663 10.0003C1.66663 14.6003 5.39996 18.3337 9.99996 18.3337C14.6 18.3337 18.3333 14.6003 18.3333 10.0003C18.3333 5.40033 14.6 1.66699 9.99996 1.66699ZM13.3583 8.50034L9.46661 12.3836C9.34995 12.5086 9.19162 12.567 9.02495 12.567C8.86662 12.567 8.70828 12.5086 8.58328 12.3836L6.64163 10.442C6.39996 10.2004 6.39996 9.8003 6.64163 9.55863C6.88329 9.31697 7.28329 9.31697 7.52496 9.55863L9.02495 11.0587L12.475 7.617C12.7166 7.367 13.1166 7.367 13.3583 7.617C13.6 7.85867 13.6 8.25034 13.3583 8.50034Z" fill="currentColor"/>
    </Svg>),
});
//# sourceMappingURL=CheckCircleFilled.jsx.map