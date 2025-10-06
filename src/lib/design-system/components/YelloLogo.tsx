/**
 * Yello Solar Hub - Logo Component
 * 
 * SVG icon with brand gradient (#FFCE00 → #FF6600 → #FF0066)
 */

import { SVGProps } from 'react';

interface YelloLogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function YelloLogo({ size = 121, className, ...props }: YelloLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 121 121"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M57.8661 0C49.0251 0.369739 40.3741 2.68327 32.5287 6.776L57.8661 50.6587V0ZM57.8661 70.3534L32.5368 114.224C40.3797 118.316 49.0278 120.629 57.8661 121V70.3534ZM63.1296 121V70.3091L88.4831 114.22C80.6328 118.315 71.9761 120.632 63.1296 121ZM63.1296 50.699V0C72.249 0.3872 80.848 2.7951 88.4872 6.78407L63.1296 50.699ZM9.42174 93.0369L53.3205 67.6914L27.9751 111.59C20.5155 106.828 14.184 100.496 9.42174 93.0369ZM111.586 27.9712L67.7034 53.3045L93.0448 9.42187C100.501 14.1839 106.826 20.5139 111.586 27.9712ZM9.41771 27.9671C14.1801 20.5076 20.5115 14.1762 27.971 9.4138L53.3165 53.3126L9.41771 27.9671ZM6.77991 32.5248C2.68501 40.3751 0.371424 49.0318 0.00390625 57.8783H50.6908L6.77991 32.5248ZM6.77991 88.4792C2.6873 80.6338 0.373777 71.9829 0.00390625 63.1418H50.6706L6.78394 88.4792H6.77991ZM70.321 57.8783H121C120.632 49.0332 118.318 40.3779 114.224 32.5288L70.321 57.8783ZM114.224 88.4752L70.3412 63.1459H121C120.629 71.9842 118.315 80.6322 114.224 88.4752ZM67.7034 67.6995L93.0368 111.582C100.494 106.821 106.824 100.49 111.586 93.0329L67.7034 67.6995Z"
        fill="url(#yello_gradient)"
      />
      <defs>
        <linearGradient
          id="yello_gradient"
          x1="60.5019"
          y1="0"
          x2="60.5019"
          y2="121"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFCE00" />
          <stop offset="0.5" stopColor="#FF6600" />
          <stop offset="1" stopColor="#FF0066" />
        </linearGradient>
      </defs>
    </svg>
  );
}

YelloLogo.displayName = 'YelloLogo';
