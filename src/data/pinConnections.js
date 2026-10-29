/**
 * Hardware component specifications, pin coordinates, and required circuit connections
 * for the Arduino Uno + L298N + Dual IR Sensor Line Follower Robot.
 */

export const WIRE_COLORS = [
  { name: 'Red (VCC/Power)', hex: '#ef4444', type: 'power' },
  { name: 'Black (GND)', hex: '#1e293b', type: 'ground' },
  { name: 'Yellow (PWM/Signal)', hex: '#eab308', type: 'signal' },
  { name: 'Blue (Direction)', hex: '#3b82f6', type: 'signal' },
  { name: 'Green (Sensor Out)', hex: '#10b981', type: 'signal' },
  { name: 'Orange (Aux)', hex: '#f97316', type: 'signal' },
  { name: 'Purple (Logic)', hex: '#a855f7', type: 'signal' },
];

export const COMPONENTS_DATA = {
  arduino: {
    id: 'arduino',
    name: 'Arduino Uno R3',
    subtitle: 'ATmega328P Microcontroller',
    category: 'controller',
    initialPos: { x: 380, y: 180 },
    width: 290,
    height: 220,
    pins: [
      // Top header (Digital / PWM)
      { id: 'ard_d2', name: 'D2', type: 'digital', x: 130, y: 18, color: '#10b981', description: 'Digital Input (Left IR Sensor)' },
      { id: 'ard_d3', name: 'D3', type: 'digital', x: 148, y: 18, color: '#10b981', description: 'Digital Input (Right IR Sensor)' },
      { id: 'ard_d4', name: 'D4', type: 'digital', x: 166, y: 18, color: '#94a3b8', description: 'Digital GPIO' },
      { id: 'ard_d5', name: 'D5 ~', type: 'pwm', x: 184, y: 18, color: '#eab308', description: 'PWM Speed Control (ENA Left Motor)' },
      { id: 'ard_d6', name: 'D6 ~', type: 'pwm', x: 202, y: 18, color: '#3b82f6', description: 'Direction (IN1 Left Motor)' },
      { id: 'ard_d7', name: 'D7', type: 'digital', x: 220, y: 18, color: '#3b82f6', description: 'Direction (IN2 Left Motor)' },
      { id: 'ard_d8', name: 'D8', type: 'digital', x: 238, y: 18, color: '#a855f7', description: 'Direction (IN3 Right Motor)' },
      { id: 'ard_d9', name: 'D9 ~', type: 'pwm', x: 256, y: 18, color: '#a855f7', description: 'Direction (IN4 Right Motor)' },
      { id: 'ard_d10', name: 'D10 ~', type: 'pwm', x: 274, y: 18, color: '#eab308', description: 'PWM Speed Control (ENB Right Motor)' },
      { id: 'ard_gnd_top', name: 'GND', type: 'ground', x: 284, y: 35, color: '#0f172a', description: 'Ground' },
      
      // Bottom header (Power & Analog)
      { id: 'ard_5v', name: '5V', type: 'power', x: 155, y: 205, color: '#ef4444', description: '5V Regulated Power Output' },
      { id: 'ard_gnd_1', name: 'GND', type: 'ground', x: 173, y: 205, color: '#0f172a', description: 'System Ground 1' },
      { id: 'ard_gnd_2', name: 'GND', type: 'ground', x: 191, y: 205, color: '#0f172a', description: 'System Ground 2' },
      { id: 'ard_vin', name: 'VIN', type: 'power', x: 209, y: 205, color: '#f97316', description: 'External Raw Voltage In (7-12V)' },
    ]
  },

  l298n: {
    id: 'l298n',
    name: 'L298N Dual H-Bridge',
    subtitle: 'High Power DC Motor Driver',
    category: 'driver',
    initialPos: { x: 740, y: 170 },
    width: 250,
    height: 230,
    pins: [
      // Logic Control Pins Header
      { id: 'l298_ena', name: 'ENA', type: 'pwm', x: 42, y: 215, color: '#eab308', description: 'Left Motor Speed PWM' },
      { id: 'l298_in1', name: 'IN1', type: 'digital', x: 62, y: 215, color: '#3b82f6', description: 'Left Motor Direction 1' },
      { id: 'l298_in2', name: 'IN2', type: 'digital', x: 82, y: 215, color: '#3b82f6', description: 'Left Motor Direction 2' },
      { id: 'l298_in3', name: 'IN3', type: 'digital', x: 102, y: 215, color: '#a855f7', description: 'Right Motor Direction 1' },
      { id: 'l298_in4', name: 'IN4', type: 'digital', x: 122, y: 215, color: '#a855f7', description: 'Right Motor Direction 2' },
      { id: 'l298_enb', name: 'ENB', type: 'pwm', x: 142, y: 215, color: '#eab308', description: 'Right Motor Speed PWM' },

      // High Current Power Screw Terminals
      { id: 'l298_12v', name: '12V', type: 'power', x: 185, y: 215, color: '#ef4444', description: 'Motor Power Supply (Battery +)' },
      { id: 'l298_gnd', name: 'GND', type: 'ground', x: 208, y: 215, color: '#0f172a', description: 'Common Ground (Battery - & Arduino)' },
      { id: 'l298_5v', name: '5V', type: 'power', x: 230, y: 215, color: '#ef4444', description: '5V On-board Logic Supply' },

      // Left Motor Output Terminal Block
      { id: 'l298_out1', name: 'OUT1', type: 'motor_out', x: 20, y: 80, color: '#38bdf8', description: 'To Left Motor Terminal 1' },
      { id: 'l298_out2', name: 'OUT2', type: 'motor_out', x: 20, y: 110, color: '#38bdf8', description: 'To Left Motor Terminal 2' },

      // Right Motor Output Terminal Block
      { id: 'l298_out3', name: 'OUT3', type: 'motor_out', x: 230, y: 80, color: '#38bdf8', description: 'To Right Motor Terminal 1' },
      { id: 'l298_out4', name: 'OUT4', type: 'motor_out', x: 230, y: 110, color: '#38bdf8', description: 'To Right Motor Terminal 2' },
    ]
  },

  ir_left: {
    id: 'ir_left',
    name: 'Left IR Sensor',
    subtitle: 'TCRT5000 / LM393 Optical Pair',
    category: 'sensor',
    initialPos: { x: 60, y: 60 },
    width: 140,
    height: 190,
    pins: [
      { id: 'ir_l_vcc', name: 'VCC', type: 'power', x: 28, y: 175, color: '#ef4444', description: '5V Power Supply' },
      { id: 'ir_l_gnd', name: 'GND', type: 'ground', x: 56, y: 175, color: '#0f172a', description: 'Ground' },
      { id: 'ir_l_out', name: 'DO', type: 'digital', x: 84, y: 175, color: '#10b981', description: 'Digital Output (HIGH=Black, LOW=White)' },
      { id: 'ir_l_ao', name: 'AO', type: 'analog', x: 112, y: 175, color: '#94a3b8', description: 'Analog Output' },
    ]
  },

  ir_right: {
    id: 'ir_right',
    name: 'Right IR Sensor',
    subtitle: 'TCRT5000 / LM393 Optical Pair',
    category: 'sensor',
    initialPos: { x: 60, y: 310 },
    width: 140,
    height: 190,
    pins: [
      { id: 'ir_r_vcc', name: 'VCC', type: 'power', x: 28, y: 175, color: '#ef4444', description: '5V Power Supply' },
      { id: 'ir_r_gnd', name: 'GND', type: 'ground', x: 56, y: 175, color: '#0f172a', description: 'Ground' },
      { id: 'ir_r_out', name: 'DO', type: 'digital', x: 84, y: 175, color: '#10b981', description: 'Digital Output (HIGH=Black, LOW=White)' },
      { id: 'ir_r_ao', name: 'AO', type: 'analog', x: 112, y: 175, color: '#94a3b8', description: 'Analog Output' },
    ]
  },

  motor_left: {
    id: 'motor_left',
    name: 'Left BO DC Motor',
    subtitle: 'Gear Motor + Rubber Tread Wheel',
    category: 'actuator',
    initialPos: { x: 730, y: 20 },
    width: 170,
    height: 110,
    pins: [
      { id: 'm_left_pos', name: 'POS (+)', type: 'motor', x: 30, y: 88, color: '#ef4444', description: 'Motor Positive Terminal' },
      { id: 'm_left_neg', name: 'NEG (-)', type: 'motor', x: 65, y: 88, color: '#0f172a', description: 'Motor Negative Terminal' },
    ]
  },

  motor_right: {
    id: 'motor_right',
    name: 'Right BO DC Motor',
    subtitle: 'Gear Motor + Rubber Tread Wheel',
    category: 'actuator',
    initialPos: { x: 730, y: 450 },
    width: 170,
    height: 110,
    pins: [
      { id: 'm_right_pos', name: 'POS (+)', type: 'motor', x: 30, y: 88, color: '#ef4444', description: 'Motor Positive Terminal' },
      { id: 'm_right_neg', name: 'NEG (-)', type: 'motor', x: 65, y: 88, color: '#0f172a', description: 'Motor Negative Terminal' },
    ]
  },

  battery: {
    id: 'battery',
    name: 'Li-Ion Battery Pack',
    subtitle: '7.4V (2x 18650 3.7V in Series)',
    category: 'power',
    initialPos: { x: 380, y: 460 },
    width: 220,
    height: 110,
    pins: [
      { id: 'bat_pos', name: '+ (7.4V)', type: 'power', x: 60, y: 25, color: '#ef4444', description: 'Positive Terminal (Red Wire)' },
      { id: 'bat_neg', name: '- (GND)', type: 'ground', x: 160, y: 25, color: '#0f172a', description: 'Negative Terminal (Black Wire)' },
    ]
  }
};

/**
 * Expected valid circuit connections.
 * For flexible validation, certain ground or 5V connections can link to any valid GND/5V pin.
 */
export const REQUIRED_CIRCUITS = [
  // 1. Left IR Sensor Power & Output
  { id: 'c_ir_l_vcc', name: 'Left IR Power', from: 'ir_l_vcc', to: 'ard_5v', color: '#ef4444', desc: 'Left IR VCC → Arduino 5V' },
  { id: 'c_ir_l_gnd', name: 'Left IR Ground', from: 'ir_l_gnd', to: 'ard_gnd_1', color: '#1e293b', desc: 'Left IR GND → Arduino GND' },
  { id: 'c_ir_l_out', name: 'Left IR Signal', from: 'ir_l_out', to: 'ard_d2', color: '#10b981', desc: 'Left IR DO → Arduino Pin D2' },

  // 2. Right IR Sensor Power & Output
  { id: 'c_ir_r_vcc', name: 'Right IR Power', from: 'ir_r_vcc', to: 'ard_5v', color: '#ef4444', desc: 'Right IR VCC → Arduino 5V' },
  { id: 'c_ir_r_gnd', name: 'Right IR Ground', from: 'ir_r_gnd', to: 'ard_gnd_2', color: '#1e293b', desc: 'Right IR GND → Arduino GND' },
  { id: 'c_ir_r_out', name: 'Right IR Signal', from: 'ir_r_out', to: 'ard_d3', color: '#10b981', desc: 'Right IR DO → Arduino Pin D3' },

  // 3. High Voltage Motor Driver Power (7.4V Battery -> L298N)
  { id: 'c_bat_pos', name: 'Driver Power VMS', from: 'bat_pos', to: 'l298_12v', color: '#ef4444', desc: 'Battery (+) → L298N 12V Screw Terminal' },
  { id: 'c_bat_neg', name: 'Battery Ground', from: 'bat_neg', to: 'l298_gnd', color: '#1e293b', desc: 'Battery (-) → L298N GND Screw Terminal' },
  { id: 'c_common_gnd', name: 'Common System GND', from: 'l298_gnd', to: 'ard_gnd_top', color: '#1e293b', desc: 'L298N GND → Arduino GND (Common Ground Essential!)' },

  // 4. Arduino Control of L298N H-Bridge (Direction & PWM)
  { id: 'c_l298_ena', name: 'Left Motor PWM', from: 'l298_ena', to: 'ard_d5', color: '#eab308', desc: 'L298N ENA → Arduino D5 (Left PWM Speed)' },
  { id: 'c_l298_in1', name: 'Left Dir IN1', from: 'l298_in1', to: 'ard_d6', color: '#3b82f6', desc: 'L298N IN1 → Arduino D6 (Left Forward)' },
  { id: 'c_l298_in2', name: 'Left Dir IN2', from: 'l298_in2', to: 'ard_d7', color: '#3b82f6', desc: 'L298N IN2 → Arduino D7 (Left Backward)' },
  { id: 'c_l298_in3', name: 'Right Dir IN3', from: 'l298_in3', to: 'ard_d8', color: '#a855f7', desc: 'L298N IN3 → Arduino D8 (Right Forward)' },
  { id: 'c_l298_in4', name: 'Right Dir IN4', from: 'l298_in4', to: 'ard_d9', color: '#a855f7', desc: 'L298N IN4 → Arduino D9 (Right Backward)' },
  { id: 'c_l298_enb', name: 'Right Motor PWM', from: 'l298_enb', to: 'ard_d10', color: '#eab308', desc: 'L298N ENB → Arduino D10 (Right PWM Speed)' },

  // 5. Driver to Motors
  { id: 'c_mot_l_1', name: 'Left Motor OUT1', from: 'l298_out1', to: 'm_left_pos', color: '#38bdf8', desc: 'L298N OUT1 → Left Motor (+)' },
  { id: 'c_mot_l_2', name: 'Left Motor OUT2', from: 'l298_out2', to: 'm_left_neg', color: '#38bdf8', desc: 'L298N OUT2 → Left Motor (-)' },
  { id: 'c_mot_r_1', name: 'Right Motor OUT3', from: 'l298_out3', to: 'm_right_pos', color: '#38bdf8', desc: 'L298N OUT3 → Right Motor (+)' },
  { id: 'c_mot_r_2', name: 'Right Motor OUT4', from: 'l298_out4', to: 'm_right_neg', color: '#38bdf8', desc: 'L298N OUT4 → Right Motor (-)' },
];

/**
 * Checks whether two pins match an expected circuit connection,
 * accounting for reversible pin order and equivalent GND/5V pins.
 */
export function isCircuitMatch(wire, circuit) {
  const isDirect = (wire.fromPinId === circuit.from && wire.toPinId === circuit.to);
  const isReverse = (wire.fromPinId === circuit.to && wire.toPinId === circuit.from);
  if (isDirect || isReverse) return true;

  // Flexible Ground matching
  const gndPins = ['ard_gnd_top', 'ard_gnd_1', 'ard_gnd_2', 'l298_gnd', 'ir_l_gnd', 'ir_r_gnd', 'bat_neg'];
  const isBothGnd = (gndPins.includes(wire.fromPinId) && gndPins.includes(wire.toPinId));
  if (isBothGnd && (circuit.id.includes('gnd') || circuit.id.includes('common_gnd'))) {
    // Make sure it links the right modules
    const fromComp = wire.fromPinId.split('_')[0];
    const toComp = wire.toPinId.split('_')[0];
    const cFromComp = circuit.from.split('_')[0];
    const cToComp = circuit.to.split('_')[0];
    if ((fromComp === cFromComp && toComp === cToComp) || (fromComp === cToComp && toComp === cFromComp)) {
      return true;
    }
  }

  return false;
}
