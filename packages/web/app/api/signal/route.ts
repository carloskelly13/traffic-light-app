import { NextRequest, NextResponse } from "next/server"
import Pusher from "pusher"
import { Phase, PhaseSchema } from "traffic-light-controller/types"
import { auth } from "../../../auth"

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { phases } = body

    if (!phases || !Array.isArray(phases)) {
      return NextResponse.json(
        { error: "Missing or invalid phases array" },
        { status: 400 },
      )
    }

    // Validate each phase against the schema
    const validatedPhases: Phase[] = []
    for (const phase of phases) {
      const result = PhaseSchema.safeParse(phase)
      if (!result.success) {
        return NextResponse.json(
          {
            error: "Invalid phase format",
            details: result.error.errors,
            phase,
          },
          { status: 400 },
        )
      }
      validatedPhases.push(result.data)
    }

    await pusher.trigger("traffic-light-channel", "signal", {
      phases: validatedPhases,
    })

    return NextResponse.json({
      success: true,
      message: `Signal sent with ${validatedPhases.length} phase(s)`,
      phases: validatedPhases,
    })
  } catch (error) {
    console.error("Error sending signal:", error)
    return NextResponse.json(
      { error: "Failed to send signal" },
      { status: 500 },
    )
  }
}
