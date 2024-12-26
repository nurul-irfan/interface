import { Path, Svg } from 'react-native-svg'

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon'

export const [EyeOff, AnimatedEyeOff] = createIcon({
  name: 'EyeOff',
  getIcon: (props) => (
    <Svg viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M20.5901 10.52C21.1401 11.43 21.1401 12.57 20.5901 13.48C19.3601 15.53 16.61 19 12 19C11.252 19 10.5481 18.905 9.89407 18.74C9.67107 18.684 9.60094 18.3981 9.76394 18.2361L11.6599 16.3401C11.7759 16.2241 11.92 16.25 12 16.25C14.344 16.25 16.25 14.343 16.25 12C16.25 11.92 16.2381 11.762 16.3211 11.679L19.063 8.93704C19.19 8.81004 19.4039 8.82313 19.5149 8.96413C19.9549 9.52013 20.3131 10.053 20.5901 10.52ZM21.5301 3.53005L3.53005 21.5301C3.38405 21.6761 3.19202 21.75 3.00002 21.75C2.80802 21.75 2.61599 21.6771 2.46999 21.5301C2.17699 21.2371 2.17699 20.762 2.46999 20.469L6.17507 16.7639C4.90507 15.6829 3.98394 14.436 3.40994 13.479C2.85994 12.569 2.85994 11.4291 3.40994 10.5191C4.63994 8.46907 7.39002 4.99905 12 4.99905C13.824 4.99905 15.3471 5.54595 16.6131 6.32595L20.47 2.46902C20.763 2.17602 21.238 2.17602 21.531 2.46902C21.824 2.76202 21.8231 3.23705 21.5301 3.53005ZM8.52004 14.419L9.60891 13.3301C9.38691 12.9351 9.25002 12.486 9.25002 12C9.25002 11.65 9.31996 11.32 9.43996 11.01C9.62996 11.17 9.86992 11.27 10.1399 11.27C10.7599 11.27 11.27 10.7599 11.27 10.1399C11.27 9.86992 11.17 9.62996 11.01 9.43996C11.32 9.31996 11.65 9.25002 12 9.25002C12.486 9.25002 12.9361 9.38691 13.3301 9.60891L14.419 8.52004C13.731 8.03804 12.899 7.75002 12 7.75002C9.66002 7.75002 7.75002 9.66002 7.75002 12C7.75002 12.9 8.03804 13.731 8.52004 14.419Z"
        fill="currentColor"
      />
    </Svg>
  ),
})
