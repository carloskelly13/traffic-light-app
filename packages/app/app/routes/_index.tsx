import type { V2_MetaFunction } from "@remix-run/node"

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Traffic Light" },
    { name: "description", content: "Traffic Light Control App" },
  ]
}

export default function Index() {
  return (
    <div>
      <h1>Traffic Light Control App</h1>
    </div>
  )
}
