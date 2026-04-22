# card-fluid-craft

A fluid, interactive card stack animation built with React, Motion, and GPU-accelerated shader backgrounds. Cards fan out in a stacked deck, each carrying a live generative shader that morphs between an idle and active state as you interact with them.

Heavily inspired by [Josh Puckett's](https://x.com/joshpuckett) Interface Craft hero section animation: [interfacecraft.dev](https://www.interfacecraft.dev/)

---

## What it looks like

- Five cards are stacked in a fanned-out deck, each offset by a unique `x`, `y`, and `rotate` value.
- Clicking a card lifts it to the front and expands the description with an animated reveal.
- The remaining cards shrink and retreat into the background.
- Every card carries a GPU shader background that smoothly transitions its parameters between an **idle** and **active** state.
- Keyboard navigation (← / → arrows, Escape) is fully supported.

---

### Shader backgrounds

Each card's background is a real-time GLSL shader rendered via [`@paper-design/shaders-react`](https://github.com/paper-design/shaders). Four shader types are used across the five cards:

- **Waves** — animated sine-wave ribbons controlled by `frequency`, `amplitude`, `proportion`, and `softness`
- **DotGrid** — a grid of dots whose `size`, `gap`, `strokeWidth`, and `opacityRange` pulse on activation
- **DotOrbit** — particles orbiting in colour-stepped rings, with `spreading` and `speed` shifting on hover
- **Spiral** — a flowing spiral controlled by `density`, `distortion`, `noise`, and `strokeTaper`

Each shader component receives its parameters as plain props. The `useSpring` + `useMotionValueEvent` combo interpolates between the `idle` and `active` param objects at 60 fps, so the background never cuts — it *flows* from one configuration to the next.

--- 

## Tech stack

- **React 19** + **TypeScript**
- **Motion (motion/react) v12** — animation engine
- **@paper-design/shaders-react** — GPU shader backgrounds
- **Tailwind CSS v4** — utility styling
- **Vite** — build tool

---

## Running locally

```frontend-experiments/card-fluid-craft/package.json#L1-1
npm install
npm run dev
```
