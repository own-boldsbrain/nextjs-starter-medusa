import * as React from "react"
import type { IconProps } from "../types"
const Progress45 = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={15}
        height={15}
        fill="none"
        ref={ref}
        {...props}
      >
        <g clipPath="url(#a)">
          <circle cx={7.5} cy={7.5} r={6.36} stroke={color} strokeWidth={1.5} />
          <path
            fill={color}
            d="M7.5 3.39a4.11 4.11 0 0 1 1.27 8.019l-.762-2.345A1.644 1.644 0 0 0 7.5 5.856z"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h15v15H0z" />
          </clipPath>
        </defs>
      </svg>
    )
  }
)
Progress45.displayName = "Progress45"
export default Progress45
