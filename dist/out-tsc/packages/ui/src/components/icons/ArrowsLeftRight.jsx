import { G, Path, Svg } from 'react-native-svg';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon';
export const [ArrowsLeftRight, AnimatedArrowsLeftRight] = createIcon({
    name: 'ArrowsLeftRight',
    getIcon: (props) => (<Svg viewBox="0 0 16 16" fill="none" {...props}>
      <G id="arrows-left-right">
        <Path id="arrows-left-right_2" d="M14.2353 8.23617L11.5686 10.9028C11.5033 10.9682 11.418 11.0002 11.3326 11.0002C11.2473 11.0002 11.162 10.9675 11.0966 10.9028C10.9666 10.7728 10.9666 10.5615 11.0966 10.4315L13.194 8.33415H2.80334L4.90067 10.4315C5.03067 10.5615 5.03067 10.7728 4.90067 10.9028C4.83534 10.9682 4.75 11.0002 4.66467 11.0002C4.57934 11.0002 4.494 10.9675 4.42867 10.9028L1.762 8.23617C1.73133 8.20551 1.70656 8.16811 1.6899 8.12745C1.6559 8.04611 1.6559 7.95422 1.6899 7.87289C1.70656 7.83156 1.73133 7.79483 1.762 7.76417L4.42867 5.0975C4.55867 4.9675 4.77002 4.9675 4.90002 5.0975C5.03002 5.2275 5.03002 5.43885 4.90002 5.56885L2.80269 7.66619H13.1933L11.096 5.56885C10.966 5.43885 10.966 5.2275 11.096 5.0975C11.226 4.9675 11.4373 4.9675 11.5673 5.0975L14.234 7.76417C14.2647 7.79483 14.2893 7.83222 14.3059 7.87289C14.3399 7.95422 14.3399 8.04611 14.3059 8.12745C14.2906 8.16811 14.266 8.20551 14.2353 8.23617Z" fill={'currentColor' !== null && 'currentColor' !== void 0 ? 'currentColor' : '#9B9B9B'}/>
      </G>
    </Svg>),
    defaultFill: '#9B9B9B',
});
//# sourceMappingURL=ArrowsLeftRight.jsx.map