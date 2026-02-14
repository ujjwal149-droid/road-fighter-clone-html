# 🏁 Road Fighter Clone (HTML5 Canvas)

A retro-style top-down racing game built using **HTML5 Canvas and vanilla JavaScript (ES Modules)**.

This project is a learning exercise focused on game architecture, state management, and frame-independent movement.

---

## 🎮 Game Flow

The game currently supports a complete loop:

Menu → Countdown → Running → Win → Menu

### Implemented States
- MenuState
- CountdownState
- RunningState
- WinState
- (Basic) GameOverState

---

## 🚗 Current Features

- Frame-independent game loop (deltaTime based)
- Acceleration + drag system
- Speed clamping
- Infinite scrolling road (segment-based system)
- Finish line detection
- Win animation sequence
- Basic UI (speed, fuel, level progress bar)

---

## 🚧 Work In Progress

The following systems are not yet implemented:

- Enemy collision detection
- Car explosion / blast animation
- Fuel spawning and pickup logic
- Score system logic
- Sound effects
- Difficulty scaling

---

## 🧠 Architecture

The project uses a **State Pattern**, where each game mode is handled by its own class.

The road uses a **segment-based streaming system**, allowing future expansion (curves, checkpoints, environment transitions).

---

## 🛠 Tech Stack

- HTML5 Canvas
- Vanilla JavaScript (ES6 Modules)
- requestAnimationFrame

No external libraries used.

---

## 🚀 How to Run

1. Clone the repository
2. Open `index.html` in a browser  
   (or use Live Server in VS Code)

---

## 📌 Status

This is an ongoing learning project and is still incomplete.
Additional gameplay systems and polish features will be added over time.
