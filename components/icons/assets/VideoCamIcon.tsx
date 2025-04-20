import type { SVGProps } from "react";

const VideoCamIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    width="1em" 
    height="1em" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg" 
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <path 
      d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11z"
      fill="red"
    />
  </svg>
);

export default VideoCamIcon;