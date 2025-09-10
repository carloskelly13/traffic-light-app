import { z } from "zod"
import { type BinaryValue } from "./gpio"

export enum Pin {
  green = "green",
  yellow = "yellow",
  red = "red",
}

export enum Action {
  signal = "signal",
  pause = "pause",
  startSequence = "start-sequence",
  endSequence = "end-sequence",
}

export const SignalRequestSchema = z
  .object({
    action: z.nativeEnum(Action),
    pin: z.nativeEnum(Pin).optional(),
    duration: z.number().optional(),
  })
  .transform(data => ({
    ...data,
    action: data.action,
  }))

export type SignalRequest = z.infer<typeof SignalRequestSchema>

export const PhaseSchema = z.union([
  z.object({
    action: z.literal(Action.signal),
    context: z.object({
      pin: z.nativeEnum(Pin),
      value: z.number(),
    }),
  }),
  z.object({
    action: z.literal(Action.pause),
    context: z.object({
      duration: z.number(),
    }),
  }),
  z.object({
    action: z.literal(Action.startSequence),
  }),
  z.object({
    action: z.literal(Action.endSequence),
  }),
])

export type Phase = z.infer<typeof PhaseSchema>
