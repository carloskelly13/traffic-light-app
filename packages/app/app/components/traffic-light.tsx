import { SVGProps } from "react"

export const TrafficLight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={300}
    height={715}
    fill="none"
    {...props}
  >
    <rect
      width={290}
      height={705}
      x={5}
      y={5}
      fill="#fff"
      stroke="#000"
      strokeWidth={10}
      rx={25}
    />
    <circle
      cx={150.5}
      cy={134.5}
      r={82.5}
      fill="#E30000"
      stroke="#000"
      strokeWidth={10}
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={10}
      d="M246 102c-6.553-20.056-19.322-37.534-36.478-49.929A100.792 100.792 0 0 0 150.5 33a100.793 100.793 0 0 0-59.022 19.071C74.322 64.466 61.553 81.944 55 102"
    />
    <circle
      cx={150.5}
      cy={364.5}
      r={82.5}
      fill="#E3BF00"
      stroke="#000"
      strokeWidth={10}
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={10}
      d="M246 332c-6.553-20.056-19.322-37.534-36.478-49.929A100.792 100.792 0 0 0 150.5 263a100.794 100.794 0 0 0-59.022 19.071C74.322 294.466 61.553 311.944 55 332"
    />
    <circle
      cx={150.5}
      cy={594.5}
      r={82.5}
      fill="#07C00F"
      stroke="#000"
      strokeWidth={10}
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={10}
      d="M246 562c-6.553-20.056-19.322-37.534-36.478-49.929A100.792 100.792 0 0 0 150.5 493a100.794 100.794 0 0 0-59.022 19.071C74.322 524.466 61.553 541.944 55 562"
    />
  </svg>
)
