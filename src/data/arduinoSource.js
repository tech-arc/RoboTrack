/**
 * Official Arduino C++ Code for the 2-Channel IR Line Following Robot with L298N Driver.
 * Includes line numbers for real-time logic execution tracking in the UI.
 */

export const ARDUINO_SOURCE_CODE = `// ========================================================
// RoboTrack IoT - 2-Sensor Line Following Robot
// Microcontroller: Arduino Uno (ATmega328P)
// Motor Driver: L298N Dual H-Bridge
// ========================================================

// Pin Definitions matching hardware wiring
const int PIN_IR_LEFT   = 2;   // Left TCRT5000 Digital Out
const int PIN_IR_RIGHT  = 3;   // Right TCRT5000 Digital Out

// L298N Motor Driver Pins
const int PIN_ENA = 5;   // Left Motor PWM Speed
const int PIN_IN1 = 6;   // Left Motor Direction 1
const int PIN_IN2 = 7;   // Left Motor Direction 2
const int PIN_IN3 = 8;   // Right Motor Direction 1
const int PIN_IN4 = 9;   // Right Motor Direction 2
const int PIN_ENB = 10;  // Right Motor PWM Speed

// Motor speed presets (0 - 255)
const int BASE_SPEED = 180;
const int TURN_SPEED = 200;

void setup() {
  // Initialize IR Sensor pins as Inputs
  pinMode(PIN_IR_LEFT, INPUT);
  pinMode(PIN_IR_RIGHT, INPUT);

  // Initialize Motor Driver control pins as Outputs
  pinMode(PIN_ENA, OUTPUT);
  pinMode(PIN_IN1, OUTPUT);
  pinMode(PIN_IN2, OUTPUT);
  pinMode(PIN_IN3, OUTPUT);
  pinMode(PIN_IN4, OUTPUT);
  pinMode(PIN_ENB, OUTPUT);

  // Set initial motor speed via PWM
  analogWrite(PIN_ENA, BASE_SPEED);
  analogWrite(PIN_ENB, BASE_SPEED);

  Serial.begin(9600);
  Serial.println("RoboTrack IoT: System Ready");
}

void loop() {
  // Read digital outputs (0 = White Surface, 1 = Black Line)
  int leftIR  = digitalRead(PIN_IR_LEFT);
  int rightIR = digitalRead(PIN_IR_RIGHT);

  // --- Decision Logic ---
  if (leftIR == 0 && rightIR == 0) {
    // STATE: FORWARD (Track is centered between sensors)
    moveForward();
  } 
  else if (leftIR == 1 && rightIR == 0) {
    // STATE: VEERED RIGHT -> PIVOT LEFT
    turnLeft();
  } 
  else if (leftIR == 0 && rightIR == 1) {
    // STATE: VEERED LEFT -> PIVOT RIGHT
    turnRight();
  } 
  else if (leftIR == 1 && rightIR == 1) {
    // STATE: INTERSECTION / CROSS LINE
    handleIntersection();
  }
}

// Motor Motion Subroutines
void moveForward() {
  // Left Motor Forward
  digitalWrite(PIN_IN1, HIGH);
  digitalWrite(PIN_IN2, LOW);
  analogWrite(PIN_ENA, BASE_SPEED);

  // Right Motor Forward
  digitalWrite(PIN_IN3, HIGH);
  digitalWrite(PIN_IN4, LOW);
  analogWrite(PIN_ENB, BASE_SPEED);
}

void turnLeft() {
  // Stop/Reverse Left Motor, Drive Right Motor
  digitalWrite(PIN_IN1, LOW);
  digitalWrite(PIN_IN2, HIGH);
  analogWrite(PIN_ENA, TURN_SPEED / 2);

  digitalWrite(PIN_IN3, HIGH);
  digitalWrite(PIN_IN4, LOW);
  analogWrite(PIN_ENB, TURN_SPEED);
}

void turnRight() {
  // Drive Left Motor, Stop/Reverse Right Motor
  digitalWrite(PIN_IN1, HIGH);
  digitalWrite(PIN_IN2, LOW);
  analogWrite(PIN_ENA, TURN_SPEED);

  digitalWrite(PIN_IN3, LOW);
  digitalWrite(PIN_IN4, HIGH);
  analogWrite(PIN_ENB, TURN_SPEED / 2);
}

void handleIntersection() {
  // Maintain forward momentum across line junction
  moveForward();
}

void stopMotors() {
  digitalWrite(PIN_IN1, LOW);
  digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, LOW);
  digitalWrite(PIN_IN4, LOW);
  analogWrite(PIN_ENA, 0);
  analogWrite(PIN_ENB, 0);
}
`;

/**
 * Line mapping for real-time debugger highlighting
 */
export const STATE_TO_CODE_LINES = {
  FORWARD: { start: 42, end: 45, funcStart: 59, funcEnd: 68 },
  TURN_LEFT: { start: 46, end: 49, funcStart: 70, funcEnd: 79 },
  TURN_RIGHT: { start: 50, end: 53, funcStart: 81, funcEnd: 90 },
  INTERSECTION: { start: 54, end: 57, funcStart: 92, funcEnd: 95 },
  SEARCHING: { start: 42, end: 45, funcStart: 59, funcEnd: 68 },
  STOPPED: { start: 97, end: 104, funcStart: 97, funcEnd: 104 },
};
