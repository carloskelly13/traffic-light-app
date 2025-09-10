# Traffic Light Web App

This is a Next.js web application that provides a web interface for controlling a traffic light system via Pusher.

## Environment Setup

Copy `.env.example` to `.env.local` and fill in your Pusher credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `PUSHER_APP_ID` - Your Pusher app ID
- `PUSHER_KEY` - Your Pusher key  
- `PUSHER_SECRET` - Your Pusher secret
- `PUSHER_CLUSTER` - Your Pusher cluster

## Getting Started

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints

### POST /api/signal

Sends control signals to the traffic light controller via Pusher. Accepts an array of phases that match the controller's `Phase` schema.

#### Request Format
```json
{
  "phases": [
    // Array of Phase objects
  ]
}
```

#### Usage Examples

**Individual Light Control:**
```json
{
  "phases": [
    {
      "action": "signal",
      "context": {
        "pin": "red",
        "value": 1
      }
    }
  ]
}
```

**Sequence Control:**
```json
// Start automated sequence
{
  "phases": [
    { "action": "start-sequence" }
  ]
}

// End automated sequence
{
  "phases": [
    { "action": "end-sequence" }
  ]
}
```

**Timing Control:**
```json
// Pause for 2 seconds (duration in milliseconds)
{
  "phases": [
    {
      "action": "pause",
      "context": { "duration": 2000 }
    }
  ]
}
```

**Complex Sequences:**
```json
// Turn on red, wait 2 seconds, turn off red, turn on green
{
  "phases": [
    {
      "action": "signal",
      "context": { "pin": "red", "value": 1 }
    },
    {
      "action": "pause", 
      "context": { "duration": 2000 }
    },
    {
      "action": "signal",
      "context": { "pin": "red", "value": 0 }
    },
    {
      "action": "signal",
      "context": { "pin": "green", "value": 1 }
    }
  ]
}
```

#### Response Format
```json
{
  "success": true,
  "message": "Signal sent with 2 phase(s)",
  "phases": [
    // Validated phases that were sent
  ]
}
```

#### Error Response
```json
{
  "error": "Invalid phase format",
  "details": [
    // Zod validation errors
  ],
  "phase": {
    // The invalid phase object
  }
}
```

## Build

```bash
pnpm build
```
