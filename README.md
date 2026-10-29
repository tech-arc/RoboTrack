<div align="center">

# 🤖 RoboTrack IoT
### Interactive Line-Following Robot Simulation & Breadboard Wiring Suite

[![React](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![HTML5 Canvas](https://img.shields.io/badge/HTML5-Canvas%202D-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Arduino](https://img.shields.io/badge/Arduino-ATmega328P-00979D?style=for-the-badge&logo=arduino&logoColor=white)](https://www.arduino.cc/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**A complete, browser-based hardware wiring and differential-drive simulation platform for autonomous line-following robotics.**  
*Developed as a high-fidelity software alternative for academic engineering defense, IoT project presentations, and embedded firmware verification.*

[Features](#-key-features) • [Hardware Pinout](#-hardware-pinout--schematic-table) • [Kinematics Math](#-kinematic-differential-drive-model) • [Getting Started](#-getting-started) • [Arduino Firmware](#-arduino-c-source-code)

</div>

---

## 📖 Overview

**RoboTrack IoT** bridges the gap between digital schematic planning and physical embedded robotics. Rather than relying on static diagrams or simplified animation paths, RoboTrack features:

1. **Interactive Assembly & Wiring Mode**: A dynamic CAD-like workbench where users physically connect jumper wires between realistic vector components (Arduino Uno R3, L298N Motor Driver, TCRT5000 IR Sensors, DC Motors, and Battery).
2. **Live 60 FPS Simulation Mode**: A physics environment where the assembled robot scans and follows black tape tracks using real-time canvas pixel sampling, differential steering kinematics, and active corner recovery.
3. **Synchronized Arduino C++ Inspector**: An embedded code debugger that highlights the exact executing lines of C++ firmware matching the robot's real-time physical telemetry.

---

## ✨ Key Features

### 🔌 1. Assembly & Wiring Mode
- **Realistic Vector Components**: Vector-rendered models with accurate PCB silkscreen, IC chips, terminal screws, and pinouts:
  - **Arduino Uno R3** (ATmega328P microcontroller)
  - **L298N Dual H-Bridge Driver** (Aluminium heatsink, 12V/GND/5V terminals, logic headers)
  - **Dual TCRT5000 IR Modules** (Optical photodiode pairs, LM393 comparators, trimpots)
  - **Left & Right BO DC Gear Motors** (Yellow chassis wheels with tread details)
  - **2S 7.4V Li-ion Battery Pack** (Dual 18650 cells)
- **Interactive Bézier Jumper Wires**: Dynamic cubic Bézier curves ($C(t)$) simulating realistic gravitational wire droop.
- **Wire Color Palette**: Red (Power/VCC), Black (GND), Yellow (PWM), Blue (Direction), Green (Signal), and Purple (Logic).
- **Circuit Verification Engine**: Validates all 19 mandatory hardware connections (including common system ground, logic lines, and motor polarity).
- **Auto-Wire Fallback**: Instant one-click wiring option for rapid presentation transitions.
- **Celebration Feedback**: Built-in confetti particle animation upon achieving 100% circuit integrity.

### 🏁 2. 60 FPS Physics & Simulation Engine
- **Direct Optical Pixel Sampling**: The robot reads directly from the canvas image buffer using perceived luminance:
  $$Y = 0.299R + 0.587G + 0.114B \quad (Y < 135 \implies \text{Black Line})$$
- **Multi-Point Optical Cone Aperture**: Simulates the physical $3.5\text{mm}$ photodiode lens diameter via kernel sampling, eliminating subpixel jitter.
- **Active Corner Recovery**: Prevents line-loss on sharp $90^\circ$ turns and switchbacks by retaining angular momentum until re-acquisition.
- **5 Track Presets**:
  - 🏎️ **Grand Prix Oval** (Smooth continuous radius)
  - 〰️ **Serpentine S-Curves** (Alternating left/right transitions)
  - ♾️ **Infinity 8 Cross-Track** (Intersection gap-crossing)
  - 📐 **90° Pivot Challenge** (Zero-radius orthogonal spin turns)
  - ✏️ **Freehand Paint Mode** (Draw custom tracks with brush sizing and eraser tools)
- **Draggable Robot**: Click and drag the robot anywhere on the arena to demonstrate recovery algorithms.

### 📊 3. Real-Time Telemetry HUD
- **Optical Sensors Monitor**: Digital state (`HIGH`/`LOW`) and analog signal strength bars for Left and Right IR channels.
- **Motor PWM Gauges**: Real-time duty cycles ($0-255$) and direction indicators (`FORWARD`, `REVERSE`, `STOP`).
- **Odometry Tracking**: Live coordinates ($X, Y$) and heading orientation in degrees ($\theta$).
- **State Badges**: Real-time display of controller states: `FORWARD`, `TURN_LEFT`, `TURN_RIGHT`, and `INTERSECTION`.

### 💻 4. Synchronized Arduino C++ Inspector
- Real-time line highlighting that tracks which subroutine is executing.
- One-click **Copy Code** button for immediate flashing into the physical Arduino IDE.

### 🔊 5. Web Audio API Sound Synthesizer
- Zero external audio files required.
- Dynamic oscillator pitch modulated by motor PWM.
- UI clicks and celebratory fanfares generated via native Web Audio nodes.

---

## 🧮 Kinematic Differential Drive Model

The robot operates as a two-wheel differential drive mobile robot with a passive caster bearing.

$$\text{Linear Velocity: } v = \frac{v_R + v_L}{2}$$

$$\text{Angular Velocity: } \omega = \frac{v_L - v_R}{L}$$

*Note: In screen space where $+Y$ points downward, $\omega = (v_L - v_R)/L$ ensures that running the Right motor faster ($v_R > v_L$) rotates the heading counter-clockwise towards $-Y$ (North/Left).*

$$\begin{aligned}
x(t + \Delta t) &= x(t) + v \cos(\theta) \Delta t \\
y(t + \Delta t) &= y(t) + v \sin(\theta) \Delta t \\
\theta(t + \Delta t) &= \theta(t) + \omega \Delta t
\end{aligned}$$

---

## ⚡ Hardware Pinout & Schematic Table

| Subsystem | Source Component Pin | Target Pin | Type | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Power** | Battery Pack (+) | L298N 12V Screw | Power | High-current motor supply ($7.4\text{V}$) |
| **Power** | Battery Pack (-) | L298N GND Screw | Ground | Power return ground |
| **Common GND** | L298N GND Screw | Arduino GND | Ground | **Crucial common ground reference** |
| **Left Sensor** | Left IR VCC | Arduino 5V | Power | $5\text{V}$ sensor supply |
| **Left Sensor** | Left IR GND | Arduino GND | Ground | Ground return |
| **Left Sensor** | Left IR DO | Arduino Pin D2 | Digital In | Digital output ($0 = \text{White}, 1 = \text{Black}$) |
| **Right Sensor**| Right IR VCC | Arduino 5V | Power | $5\text{V}$ sensor supply |
| **Right Sensor**| Right IR GND | Arduino GND | Ground | Ground return |
| **Right Sensor**| Right IR DO | Arduino Pin D3 | Digital In | Digital output ($0 = \text{White}, 1 = \text{Black}$) |
| **Motor Driver**| L298N ENA | Arduino Pin D5~ | PWM Out | Left motor speed control |
| **Motor Driver**| L298N IN1 | Arduino Pin D6 | Digital Out| Left motor direction 1 |
| **Motor Driver**| L298N IN2 | Arduino Pin D7 | Digital Out| Left motor direction 2 |
| **Motor Driver**| L298N IN3 | Arduino Pin D8 | Digital Out| Right motor direction 1 |
| **Motor Driver**| L298N IN4 | Arduino Pin D9 | Digital Out| Right motor direction 2 |
| **Motor Driver**| L298N ENB | Arduino Pin D10~ | PWM Out | Right motor speed control |
| **Actuators** | L298N OUT1 / OUT2 | Left DC Motor (+ / -) | Power Out| Left drive wheel |
| **Actuators** | L298N OUT3 / OUT4 | Right DC Motor (+ / -)| Power Out| Right drive wheel |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- npm (v9.0 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/tech-arc/RoboTrack.git

# Navigate into the project directory
cd RoboTrack

# Install required dependencies
npm install

# Start the local development server
npm run dev
```

Open your browser and navigate to `http://localhost:3000/`.

### Production Build
```bash
# Create optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Arduino C++ Source Code

This firmware runs directly on the ATmega328P microcontroller:

```cpp
// ========================================================
// RoboTrack IoT - 2-Sensor Line Following Robot
// Microcontroller: Arduino Uno (ATmega328P)
// Motor Driver: L298N Dual H-Bridge
// ========================================================

const int PIN_IR_LEFT   = 2;
const int PIN_IR_RIGHT  = 3;

const int PIN_ENA = 5;
const int PIN_IN1 = 6;
const int PIN_IN2 = 7;
const int PIN_IN3 = 8;
const int PIN_IN4 = 9;
const int PIN_ENB = 10;

const int BASE_SPEED = 180;
const int TURN_SPEED = 200;

void setup() {
  pinMode(PIN_IR_LEFT, INPUT);
  pinMode(PIN_IR_RIGHT, INPUT);

  pinMode(PIN_ENA, OUTPUT);
  pinMode(PIN_IN1, OUTPUT);
  pinMode(PIN_IN2, OUTPUT);
  pinMode(PIN_IN3, OUTPUT);
  pinMode(PIN_IN4, OUTPUT);
  pinMode(PIN_ENB, OUTPUT);

  analogWrite(PIN_ENA, BASE_SPEED);
  analogWrite(PIN_ENB, BASE_SPEED);

  Serial.begin(9600);
}

void loop() {
  int leftIR  = digitalRead(PIN_IR_LEFT);
  int rightIR = digitalRead(PIN_IR_RIGHT);

  if (leftIR == 0 && rightIR == 0) {
    moveForward();
  } else if (leftIR == 1 && rightIR == 0) {
    turnLeft();
  } else if (leftIR == 0 && rightIR == 1) {
    turnRight();
  } else if (leftIR == 1 && rightIR == 1) {
    moveForward(); // Cross junction
  }
}

void moveForward() {
  digitalWrite(PIN_IN1, HIGH);
  digitalWrite(PIN_IN2, LOW);
  analogWrite(PIN_ENA, BASE_SPEED);

  digitalWrite(PIN_IN3, HIGH);
  digitalWrite(PIN_IN4, LOW);
  analogWrite(PIN_ENB, BASE_SPEED);
}

void turnLeft() {
  digitalWrite(PIN_IN1, LOW);
  digitalWrite(PIN_IN2, HIGH);
  analogWrite(PIN_ENA, TURN_SPEED / 2);

  digitalWrite(PIN_IN3, HIGH);
  digitalWrite(PIN_IN4, LOW);
  analogWrite(PIN_ENB, TURN_SPEED);
}

void turnRight() {
  digitalWrite(PIN_IN1, HIGH);
  digitalWrite(PIN_IN2, LOW);
  analogWrite(PIN_ENA, TURN_SPEED);

  digitalWrite(PIN_IN3, LOW);
  digitalWrite(PIN_IN4, HIGH);
  analogWrite(PIN_ENB, TURN_SPEED / 2);
}
```

---

## 🎯 Academic Review & Presentation Tips

When presenting this project for an IoT / Robotics evaluation:
1. **Show the Circuit Assembly**: Start in *Assembly & Wiring Mode*, connect one wire manually, and click **"Auto-Wire All"** to illustrate the complete circuit.
2. **Explain Common Ground**: Emphasize why Arduino GND must be bridged to L298N GND to establish a common reference voltage for logic pins.
3. **Showcase Optical Raycasting**: In *Live Simulation Mode*, switch to **"Freehand Paint Mode"** and draw a custom path to prove the bot reads pixels dynamically rather than following a predefined curve.
4. **Demonstrate Intersection Crossing**: Select **"Infinity 8 Cross-Track"** to show how `(1, 1)` logic maintains momentum through perpendicular track crossings.
5. **Inspect Synchronized Firmware**: Open the **"Inspect Synchronized Arduino C++"** modal to show evaluators how software actions map directly to embedded register writes.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/tech-arc">TechARC</a></sub>
</div>
