/**
 * Core Line Follower Robot Logic & Differential Kinematic Simulation Engine.
 */

export class RobotKinematics {
  constructor(initialX = 525, initialY = 117, initialAngle = 0) {
    this.x = initialX;
    this.y = initialY;
    this.angle = initialAngle; // in radians
    this.wheelBase = 46;       // distance between drive wheels (pixels)
    this.sensorDistance = 38;  // distance from axle center to IR sensor bar (matches rendering)
    this.sensorSpacing = 32;   // distance between Left IR and Right IR (calibrated for 28px track)

    // Controller parameters
    this.baseSpeed = 2.2;
    this.turnSpeed = 2.6;
    this.algorithm = 'bang_bang'; // 'bang_bang' or 'pid'

    // Internal state
    this.lastTurnDir = 0; // -1 for left, +1 for right
    this.lostFrames = 0;  // count frames since line was last detected
    this.lastError = 0;
    this.integral = 0;
    this.currentState = 'FORWARD';
    this.motorLeft = 0;
    this.motorRight = 0;

    // Trail breadcrumbs
    this.trail = [];
    this.maxTrail = 60;
  }

  reset(x = 525, y = 117, angle = 0) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.lastTurnDir = 0;
    this.lostFrames = 0;
    this.lastError = 0;
    this.integral = 0;
    this.currentState = 'FORWARD';
    this.motorLeft = 0;
    this.motorRight = 0;
    this.trail = [];
  }

  /**
   * Returns world coordinates of the Left and Right IR sensor probes.
   */
  getSensorPositions() {
    const forwardX = Math.cos(this.angle);
    const forwardY = Math.sin(this.angle);
    const lateralX = -Math.sin(this.angle);
    const lateralY = Math.cos(this.angle);

    // Front sensor bar center
    const barCenterX = this.x + forwardX * this.sensorDistance;
    const barCenterY = this.y + forwardY * this.sensorDistance;

    // Left sensor probe (-lateral)
    const leftX = barCenterX - lateralX * (this.sensorSpacing / 2);
    const leftY = barCenterY - lateralY * (this.sensorSpacing / 2);

    // Right sensor probe (+lateral)
    const rightX = barCenterX + lateralX * (this.sensorSpacing / 2);
    const rightY = barCenterY + lateralY * (this.sensorSpacing / 2);

    return {
      left: { x: leftX, y: leftY },
      right: { x: rightX, y: rightY },
    };
  }

  /**
   * Evaluates sensor readings and updates motor commands based on the active logic algorithm.
   */
  computeLogic(leftBlack, rightBlack, leftAnalog = 0, rightAnalog = 0, pidParams = { kp: 2.6, kd: 1.2 }) {
    if (this.algorithm === 'bang_bang') {
      // Classic 2-Sensor State Machine (Arduino logic)
      if (leftBlack && rightBlack) {
        // Both black: crossing junction / intersection (e.g. Infinity-8 center)
        this.currentState = 'INTERSECTION';
        this.lostFrames = 0;
        this.motorLeft = this.baseSpeed;
        this.motorRight = this.baseSpeed;
      }
      else if (leftBlack && !rightBlack) {
        // Left on line: robot veered right -> steer LEFT
        this.currentState = 'TURN_LEFT';
        this.lastTurnDir = -1;
        this.lostFrames = 0;
        // Inside wheel counter-rotates / brakes, outside wheel drives
        this.motorLeft = -this.turnSpeed * 0.45;
        this.motorRight = this.turnSpeed;
      } 
      else if (!leftBlack && rightBlack) {
        // Right on line: robot veered left -> steer RIGHT
        this.currentState = 'TURN_RIGHT';
        this.lastTurnDir = 1;
        this.lostFrames = 0;
        // Outside wheel drives, inside wheel counter-rotates / brakes
        this.motorLeft = this.turnSpeed;
        this.motorRight = -this.turnSpeed * 0.45;
      } 
      else {
        // Both white (!leftBlack && !rightBlack)
        this.lostFrames++;

        if (this.lostFrames < 45 && this.lastTurnDir !== 0) {
          // ACTIVE CORNER RECOVERY: On sharp 90-degree corners and tight S-curves,
          // the black line temporarily slips between or beyond sensors.
          // Maintain pivot in the last turn direction until the line is re-acquired!
          if (this.lastTurnDir === -1) {
            this.currentState = 'TURN_LEFT';
            this.motorLeft = -this.turnSpeed * 0.55;
            this.motorRight = this.turnSpeed;
          } else {
            this.currentState = 'TURN_RIGHT';
            this.motorLeft = this.turnSpeed;
            this.motorRight = -this.turnSpeed * 0.55;
          }
        } else {
          // Centered on straight segment
          this.currentState = 'FORWARD';
          if (this.lostFrames > 50) {
            this.lastTurnDir = 0;
          }
          this.motorLeft = this.baseSpeed;
          this.motorRight = this.baseSpeed;
        }
      }
    } else {
      // Proportional-Derivative (PID) Continuous Differential Steering
      if (leftBlack && rightBlack) {
        this.currentState = 'INTERSECTION';
        this.lostFrames = 0;
        this.motorLeft = this.baseSpeed;
        this.motorRight = this.baseSpeed;
      } else {
        const error = (leftAnalog - rightAnalog); // -1.0 to +1.0
        const isOffLine = leftAnalog < 0.12 && rightAnalog < 0.12;

        if (isOffLine) {
          this.lostFrames++;
          if (this.lostFrames < 45 && this.lastTurnDir !== 0) {
            if (this.lastTurnDir === -1) {
              this.currentState = 'TURN_LEFT';
              this.motorLeft = -this.turnSpeed * 0.5;
              this.motorRight = this.turnSpeed;
            } else {
              this.currentState = 'TURN_RIGHT';
              this.motorLeft = this.turnSpeed;
              this.motorRight = -this.turnSpeed * 0.5;
            }
          } else {
            this.currentState = 'FORWARD';
            this.motorLeft = this.baseSpeed;
            this.motorRight = this.baseSpeed;
          }
        } else {
          this.lostFrames = 0;
          if (error > 0.08) this.lastTurnDir = -1;
          else if (error < -0.08) this.lastTurnDir = 1;

          const p = error * pidParams.kp;
          const d = (error - this.lastError) * pidParams.kd;
          this.lastError = error;

          const steeringAdj = (p + d) * this.turnSpeed;

          // In differential drive: Left turn requires motorLeft < motorRight
          this.motorLeft = this.baseSpeed - steeringAdj;
          this.motorRight = this.baseSpeed + steeringAdj;

          if (Math.abs(error) < 0.1) {
            this.currentState = 'FORWARD';
          } else if (error > 0) {
            this.currentState = 'TURN_LEFT';
          } else {
            this.currentState = 'TURN_RIGHT';
          }
        }
      }
    }

    return {
      state: this.currentState,
      motorLeft: this.motorLeft,
      motorRight: this.motorRight,
    };
  }

  /**
   * Applies differential drive kinematics to advance the robot's physical position.
   */
  updatePhysics(dt = 1) {
    const v = (this.motorRight + this.motorLeft) / 2;

    // CRITICAL CORRECTION: In screen coordinates where +Y points DOWN:
    // Left wheel is at -Y, Right wheel is at +Y.
    // When motorLeft > motorRight, top wheel moves faster -> clockwise right turn (omega > 0).
    // When motorRight > motorLeft, bottom wheel moves faster -> counter-clockwise left turn (omega < 0).
    const omega = (this.motorLeft - this.motorRight) / this.wheelBase;

    this.x += v * Math.cos(this.angle) * dt;
    this.y += v * Math.sin(this.angle) * dt;
    this.angle += omega * dt;

    // Keep angle in [-PI, PI]
    this.angle = Math.atan2(Math.sin(this.angle), Math.cos(this.angle));

    // Update breadcrumb trail
    if (this.trail.length === 0 || 
        Math.hypot(this.x - this.trail[this.trail.length - 1].x, this.y - this.trail[this.trail.length - 1].y) > 4) {
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > this.maxTrail) {
        this.trail.shift();
      }
    }
  }
}
