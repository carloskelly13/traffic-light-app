import { cn } from "../lib/utils"

type LightState = {
  red: boolean
  yellow: boolean
  green: boolean
}

type TrafficLightProps = {
  className?: string
  lights: LightState
  onRedClick?: () => void
  onYellowClick?: () => void
  onGreenClick?: () => void
  disabled?: boolean
}

export const TrafficLight = (props: TrafficLightProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className={cn(props.className, {
      "pointer-events-none": props.disabled,
    })}
    viewBox="0 0 300 715"
  >
    <title id="red-light">Toggle the red light</title>
    <title id="yellow-light">Toggle the yellow light</title>
    <title id="green-light">Toggle the green light</title>

    <rect
      className="fill-white dark:fill-black stroke-black dark:stroke-white"
      width={290}
      height={705}
      x={5}
      y={5}
      strokeWidth={10}
      rx={25}
    />
    <circle
      className={cn(
        "stroke-black dark:stroke-white transition-all fill-gray-600 hover:fill-red-500",
        {
          "fill-red-500": props.lights.red,
        },
      )}
      cx={150.5}
      cy={134.5}
      r={82.5}
      strokeWidth={10}
      role="button"
      aria-labelledby="red-light"
      onClick={props.onRedClick}
    />
    <path
      className="stroke-black dark:stroke-white"
      strokeLinecap="round"
      strokeWidth={10}
      d="M246 102c-6.553-20.056-19.322-37.534-36.478-49.929A100.792 100.792 0 0 0 150.5 33a100.793 100.793 0 0 0-59.022 19.071C74.322 64.466 61.553 81.944 55 102"
    />
    <circle
      className={cn(
        "stroke-black dark:stroke-white transition-all fill-gray-600 hover:fill-yellow-500",
        {
          "fill-yellow-500": props.lights.yellow,
        },
      )}
      cx={150.5}
      cy={364.5}
      r={82.5}
      strokeWidth={10}
      role="button"
      aria-labelledby="yellow-light"
      onClick={props.onYellowClick}
    />
    <path
      className="stroke-black dark:stroke-white"
      strokeLinecap="round"
      strokeWidth={10}
      d="M246 332c-6.553-20.056-19.322-37.534-36.478-49.929A100.792 100.792 0 0 0 150.5 263a100.794 100.794 0 0 0-59.022 19.071C74.322 294.466 61.553 311.944 55 332"
    />
    <circle
      className={cn(
        "stroke-black dark:stroke-white transition-all fill-gray-600 hover:fill-green-500",
        {
          "fill-green-500": props.lights.green,
        },
      )}
      cx={150.5}
      cy={594.5}
      r={82.5}
      strokeWidth={10}
      role="button"
      aria-labelledby="green-light"
      onClick={props.onGreenClick}
    />
    <path
      className="stroke-black dark:stroke-white"
      strokeLinecap="round"
      strokeWidth={10}
      d="M246 562c-6.553-20.056-19.322-37.534-36.478-49.929A100.792 100.792 0 0 0 150.5 493a100.794 100.794 0 0 0-59.022 19.071C74.322 524.466 61.553 541.944 55 562"
    />
  </svg>
)
