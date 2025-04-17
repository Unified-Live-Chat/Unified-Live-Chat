import type { SVGProps } from "react";

const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    width="3em" 
    height="3em" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg" 
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <circle 
      cx="12" 
      cy="12" 
      r="12" 
      fill="#c0c0c0" // grey background
    />
    <path 
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      fill="white"  // white figure
    />
  </svg>
);

export default UserIcon;