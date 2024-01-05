import pico from "picocolors"

export const logError = (error: Record<string, unknown>) => {
  console.error(pico.red(<string>("error" in error ? error.error : error)))
}
