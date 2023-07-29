import React, { useState } from "react"

const Page = (): JSX.Element => {
  const [counter, setCounter] = useState(0)
  return (
    <>
      <h1>Carlos App!</h1>
      This page is generated using Vite SSR plugin and deployed as a serverless
      Vercel function. {counter}
      <button onClick={() => setCounter(counter + 1)}>Add!</button>
    </>
  )
}

export { Page }
