/**
 * Preset track geometry definitions and drawing utilities for the Simulation Canvas.
 */

export const TRACK_PRESETS = [
  {
    id: 'oval',
    name: 'Grand Prix Oval',
    difficulty: 'Beginner',
    description: 'Smooth continuous turns, ideal for testing baseline forward velocity and gentle steering.',
    spawn: { x: 525, y: 117, angle: 0 },
    draw: (ctx, width, height) => {
      ctx.beginPath();
      // Draw smooth rounded stadium/oval track
      const cx = width / 2;
      const cy = height / 2;
      const rx = width * 0.38;
      const ry = height * 0.32;

      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.lineWidth = 28;
      ctx.strokeStyle = '#0f172a';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  },
  {
    id: 's_curve',
    name: 'Serpentine S-Curves',
    difficulty: 'Intermediate',
    description: 'Alternating left and right transitions to test differential response times and oscillation damping.',
    spawn: { x: 180, y: 150, angle: -0.32 },
    draw: (ctx, width, height) => {
      ctx.beginPath();
      ctx.moveTo(180, 150);
      ctx.bezierCurveTo(450, 60, 600, 280, 800, 180);
      ctx.bezierCurveTo(950, 100, 1050, 350, 880, 480);
      ctx.bezierCurveTo(700, 580, 500, 380, 320, 500);
      ctx.bezierCurveTo(140, 600, 60, 350, 180, 150);
      ctx.closePath();
      
      ctx.lineWidth = 28;
      ctx.strokeStyle = '#0f172a';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  },
  {
    id: 'figure8',
    name: 'Infinity 8 Cross-Track',
    difficulty: 'Advanced',
    description: 'Features a center intersection (Both sensors detect black) to demonstrate gap-crossing and state memory.',
    spawn: { x: 892, y: 325, angle: Math.PI / 2 },
    draw: (ctx, width, height) => {
      const cx = width / 2;
      const cy = height / 2;
      const a = width * 0.35;

      ctx.beginPath();
      // Lemniscate of Bernoulli or dual loops
      for (let t = 0; t <= Math.PI * 2 + 0.05; t += 0.02) {
        const scale = 2 / (3 - Math.cos(2 * t));
        const x = cx + a * scale * Math.cos(t);
        const y = cy + a * scale * Math.sin(2 * t) / 2;
        if (t === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineWidth = 28;
      ctx.strokeStyle = '#0f172a';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  },
  {
    id: 'square_corners',
    name: '90° Pivot Challenge',
    difficulty: 'Expert',
    description: 'Sharp orthogonal right-angle corners designed to test zero-radius spin turn logic.',
    spawn: { x: 300, y: 150, angle: 0 },
    draw: (ctx, width, height) => {
      ctx.beginPath();
      ctx.moveTo(250, 150);
      ctx.lineTo(850, 150);
      ctx.lineTo(850, 480);
      ctx.lineTo(580, 480);
      ctx.lineTo(580, 320);
      ctx.lineTo(250, 320);
      ctx.closePath();

      ctx.lineWidth = 28;
      ctx.strokeStyle = '#0f172a';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'miter';
      ctx.miterLimit = 2;
      ctx.stroke();
    }
  },
  {
    id: 'custom',
    name: 'Freehand Paint Mode',
    difficulty: 'Custom',
    description: 'Draw any path directly onto the arena using your mouse or touch screen!',
    spawn: { x: 450, y: 300, angle: 0 },
    draw: () => {} // hand-drawn by user
  }
];
