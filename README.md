## Traffic Light App Monorepo

This project is a monorepo containing two TypeScript-based applications for controlling the signalling of a traffic light. The traffic light has its lighting modules connected to a Raspberry Pi using a high-voltage relay add-on board.

### Traffic Light Web App
`packages/app`

A Remix-based application deployed on Vercel for controlling the traffic light. This is a full-stack application that will have both an endpoint and a UI for sending different signalling phases to the traffic light. Communication to the controller app on the Raspberry Pi is done through Pusher.

The Remix app has a `POST` endpoint at `/signal` that sends the signal phases to the controller app. This allows for full customization of which lights are shown and for how long with pauses between phases. An example payload below will show the green light for 5 seconds, yellow for 3 seconds, and red for 5 seconds. `0` is a `HIGH` signal representing the relay being closed, thus turning on the light. `1` represents a `LOW` signal representing the relay being open, thus the light being off.

```json
{
  "phases": [
    { "action": "signal", "context": { "pin": "green", "value": 0 } },
    { "action": "pause", "context": { "duration": 5000 } },
    { "action": "signal", "context": { "pin": "green", "value": 1 } },
    { "action": "signal", "context": { "pin": "yellow", "value": 0 } },
    { "action": "pause", "context": { "duration": 3000 } },
    { "action": "signal", "context": { "pin": "yellow", "value": 1 } },
    { "action": "signal", "context": { "pin": "red", "value": 0 } },
    { "action": "pause", "context": { "duration": 5000 } },
    { "action": "signal", "context": { "pin": "red", "value": 1 } }
  ]
}
```

### Traffic Light Controller App
`packages/controller`

An Express-based application that runs as a local service on the Raspberry Pi that accepts incoming messages from Pusher and controls the lights using GPIO APIs.

### Demonstration

![Demo Video](assets/demo.gif)