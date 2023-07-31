## Traffic Light App Monorepo

This project is a monorepo containing two TypeScript-based applications for controlling the signalling of a traffic light. The traffic light has its lighting modules connected to a Raspberry Pi using a high-voltage relay add-on board.

### Traffic Light Web App
`packages/app`

A Remix-based application deployed on Vercel for controlling the traffic light. This is a full-stack application that will have both an endpoint and a UI for sending different signalling phases to the traffic light. Communication to the controller app on the Raspberry Pi is done through Pusher.

### Traffic Light Controller App
`packages/controller`

An Express-based application that runs as a local service on the Raspberry Pi that accepts incoming messages from Pusher and controls the lights using GPIO APIs.

### Demonstration

![Demo Video](assets/demo.gif)