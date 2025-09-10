## Carlos Traffic Light Monorepo

This project is a monorepo containing a TypeScript-based ecosystem for controlling a physical traffic light. The traffic light has its lighting modules connected to a Raspberry Pi using a high-voltage relay add-on board.

### Traffic Light Web App
`packages/web`

A modern Next.js 15 application with authentication and real-time control capabilities. This full-stack application provides both an API and an interactive UI for controlling the traffic light remotely.

**Key Features:**
- 🔐 **Google OAuth Authentication** - Secure access with email whitelist
- 🚦 **Interactive Traffic Light UI** - Click individual lights or use sequence controls
- ⚡ **Optimistic Updates** - Instant UI feedback with automatic error recovery
- 🔄 **Real-time Communication** - Uses Pusher for reliable message delivery
- 🎨 **Modern Stack** - Next.js 15, TypeScript, Tailwind CSS, NextAuth.js v5

**API Endpoint:**
The Next.js app provides a `POST` endpoint at `/api/signal` that accepts phase arrays and forwards them to the controller. This allows for full customization of light sequences and timing.

**Example API Usage:**
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

**Signal Values:**
- `0` = Light ON (HIGH signal, relay closed)
- `1` = Light OFF (LOW signal, relay open)


### Traffic Light Controller App
`packages/controller`

A lightweight Node.js application that runs as a service on the Raspberry Pi. It subscribes to Pusher messages from the web app and controls the physical traffic light hardware using GPIO APIs.

**Key Features:**
- 🔌 **GPIO Control** - Direct hardware interface for relay switching
- 📡 **Pusher Integration** - Real-time message subscription
- 🔄 **Phase Execution** - Processes complex light sequences
- 🛡️ **Error Handling** - Robust error recovery and logging
- 🚀 **Auto-start** - Configurable as system service

**Installation on Raspberry Pi:**
```bash
cd packages/controller
npm install
npm run build
# Configure environment variables
npm start
```

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Browser   │    │  Pusher Cloud   │    │  Raspberry Pi   │
│                 │    │                 │    │                 │
│  Next.js App    │───▶│   Message       │───▶│   Controller    │
│  Authentication │    │   Routing       │    │   GPIO Control  │
│  Traffic Light  │    │                 │    │   Physical      │
│  Interface      │    │                 │    │   Traffic Light │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Data Flow:**
1. User authenticates with Google OAuth
2. User interacts with traffic light UI
3. Web app sends phase commands via Pusher
4. Controller receives messages and controls hardware
5. Physical traffic light changes state

## Setup Requirements

**Web App:**
- Node.js 18+
- Google OAuth credentials
- Pusher account (free tier available)
- Email whitelist configuration

**Controller:**
- Raspberry Pi with GPIO access
- High-voltage relay board
- Physical traffic light hardware
- Same Pusher credentials as web app

## Environment Variables

Both apps require Pusher configuration. See individual package READMEs for detailed setup instructions.

### Demonstration

![Demo Video](assets/demo.gif)
