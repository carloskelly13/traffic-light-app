import { TrafficLightController } from "../components/traffic-light-controller"
import { AuthButton } from "../components/auth-button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Carlos Traffic Light",
  description: "Interactive traffic light control system",
}

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20">
      <div className="flex justify-end items-center mb-8">
        <AuthButton />
      </div>

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] gap-8">
        <TrafficLightController />
      </div>
    </div>
  )
}
