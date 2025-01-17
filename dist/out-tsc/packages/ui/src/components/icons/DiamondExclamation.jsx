import { Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [DiamondExclamation, AnimatedDiamondExclamation] = createIcon({
    name: 'DiamondExclamation',
    getIcon: (props) => (<Svg viewBox="0 0 20 20" fill="none" {...props}>
      <Path d="M17.5243 8.04627L11.9534 2.47539C10.8743 1.39622 9.12509 1.39622 8.04676 2.47539L2.47588 8.04627C1.39671 9.12544 1.39671 10.8746 2.47588 11.9529L8.04676 17.5238C9.12593 18.603 10.8751 18.603 11.9534 17.5238L17.5243 11.9529C18.6035 10.8746 18.6035 9.12461 17.5243 8.04627ZM9.37509 7.08293C9.37509 6.73793 9.65509 6.45793 10.0001 6.45793C10.3451 6.45793 10.6251 6.73793 10.6251 7.08293V10.4163C10.6251 10.7613 10.3451 11.0413 10.0001 11.0413C9.65509 11.0413 9.37509 10.7613 9.37509 10.4163V7.08293ZM10.0168 13.7496C9.55677 13.7496 9.17917 13.3763 9.17917 12.9163C9.17917 12.4563 9.54843 12.0829 10.0084 12.0829H10.0168C10.4776 12.0829 10.8501 12.4563 10.8501 12.9163C10.8501 13.3763 10.4768 13.7496 10.0168 13.7496Z" fill={'currentColor' !== null && 'currentColor' !== void 0 ? 'currentColor' : '#7D7D7D'}/>
    </Svg>),
    defaultFill: '#7D7D7D',
});
//# sourceMappingURL=DiamondExclamation.jsx.map