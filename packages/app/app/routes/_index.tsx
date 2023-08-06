import type { V2_MetaFunction } from "@remix-run/node"
import { TrafficLight } from "~/components/traffic-light"

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Traffic Light" },
    { name: "description", content: "Traffic Light Control App" },
  ]
}

export default function Index() {
  return (
    <div>
      <TrafficLight />
      <h1 className="text-3xl font-bold underline">Traffic Light App</h1>
    </div>
  )
}
