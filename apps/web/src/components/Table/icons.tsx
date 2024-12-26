type SVGProps = React.SVGProps<SVGSVGElement> & {
  fill?: string
  height?: string | number
  width?: string | number
  gradientId?: string
}

export const DropdownIcon = (props: SVGProps) => (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M7.99954 13.1667C7.82887 13.1667 7.65818 13.1014 7.52818 12.9714L4.86152 10.3047C4.60085 10.044 4.60085 9.62267 4.86152 9.362C5.12218 9.10134 5.54356 9.10134 5.80422 9.362L7.99954 11.5573L10.1948 9.362C10.4555 9.10134 10.8769 9.10134 11.1376 9.362C11.3982 9.62267 11.3982 10.044 11.1376 10.3047L8.47089 12.9714C8.34089 13.1014 8.1702 13.1667 7.99954 13.1667Z"
      fill="#9B9B9B"
    />
    <path
      d="M10.6662 7.83336C10.4955 7.83336 10.3248 7.76805 10.1948 7.63805L7.99954 5.44274L5.80422 7.63805C5.54356 7.89872 5.12218 7.89872 4.86152 7.63805C4.60085 7.37738 4.60085 6.95601 4.86152 6.69534L7.52818 4.02868C7.78885 3.76801 8.21022 3.76801 8.47089 4.02868L11.1376 6.69534C11.3982 6.95601 11.3982 7.37738 11.1376 7.63805C11.0076 7.76805 10.8369 7.83336 10.6662 7.83336Z"
      fill="#9B9B9B"
    />
  </svg>
)

export const MissingDataBars = ({ color }: { color: string }) => (
  <svg fill="none" height="18" viewBox="10 10 20 20" width="18" xmlns="http://www.w3.org/2000/svg">
    <path
      clipRule="evenodd"
      d="m19.5833 27.5h.8334c.8333 0 1.25-.4167 1.25-1.25v-2.2203l-3.3326 2.2802c.0197.7934.4361 1.1901 1.2492 1.1901zm-1.25-8.4596v-5.2904c0-.8333.4167-1.25 1.25-1.25h.8334c.8333 0 1.25.4167 1.25 1.25v3.0097zm5.8334 3.2788 3.3333-2.2807v6.2115c0 .8333-.4167 1.25-1.25 1.25h-.8333c-.8334 0-1.25-.4167-1.25-1.25zm-8.3866-1.5318-3.2801 2.2443v-1.7817c0-.8333.4167-1.25 1.25-1.25h.8333c.6614 0 1.0603.2625 1.1968.7874zm-2.862 6.4904-.3496-.511c.0672.2197.1837.39.3496.511z"
      fill={color}
      fillRule="evenodd"
    />
    <path d="m12.5 26.6667 15.8333-10.8333" stroke={color} strokeLinecap="round" strokeWidth="2" />
  </svg>
)

export const MissingDataIcon = (props: SVGProps) => (
  <svg fill="none" height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect fill="#fff" fillOpacity=".12" height="40" rx="12" width="40" />
    <path
      clipRule="evenodd"
      d="m19.5833 27.5h.8334c.8333 0 1.25-.4167 1.25-1.25v-2.2203l-3.3326 2.2802c.0197.7934.4361 1.1901 1.2492 1.1901zm-1.25-8.4596v-5.2904c0-.8333.4167-1.25 1.25-1.25h.8334c.8333 0 1.25.4167 1.25 1.25v3.0097zm5.8334 3.2788 3.3333-2.2807v6.2115c0 .8333-.4167 1.25-1.25 1.25h-.8333c-.8334 0-1.25-.4167-1.25-1.25zm-8.3866-1.5318-3.2801 2.2443v-1.7817c0-.8333.4167-1.25 1.25-1.25h.8333c.6614 0 1.0603.2625 1.1968.7874zm-2.862 6.4904-.3496-.511c.0672.2197.1837.39.3496.511z"
      fill="#9b9b9b"
      fillRule="evenodd"
    />
    <path d="m12.5 26.6667 15.8333-10.8333" stroke="#9b9b9b" strokeLinecap="round" strokeWidth="2" />
  </svg>
)
