import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RobotKinematics } from '../../utils/robotLogic';
import { TRACK_PRESETS } from '../../data/trackPresets';
import { soundEngine } from '../../utils/soundEngine';

export default function SimulationCanvas({
  selectedTrackId = 'oval',
  algorithm = 'bang_bang',
  baseSpeed = 2.2,
  sensorSpacing = 32,
  isPlaying = true,
  onTelemetryUpdate,
  isDrawMode = false,
  paintBrushSize = 28,
  customTrackPaths = [],
  setCustomTrackPaths,
  showDebugOverlays = true,
  resetCount = 0,
}) {
  const canvasRef = useRef(null);
  const trackCanvasRef = useRef(null); // Offscreen canvas for fast pixel sampling
  const animFrameId = useRef(null);

  const robotRef = useRef(new RobotKinematics(450, 120, 0));
  const [isDraggingBot, setIsDraggingBot] = useState(false);
  const [isDrawingTrack, setIsDrawingTrack] = useState(false);
  const currentDrawStroke = useRef([]);

  // Get active preset
  const activePreset = TRACK_PRESETS.find((p) => p.id === selectedTrackId) || TRACK_PRESETS[0];

  // Initialize track canvas whenever track preset changes
  const renderTrackToCanvas = useCallback(() => {
    const trackCanvas = trackCanvasRef.current;
    if (!trackCanvas) return;
    const ctx = trackCanvas.getContext('2d', { willReadFrequently: true });
    const width = trackCanvas.width;
    const height = trackCanvas.height;

    // Arena background (Matte white/light-slate vinyl test track surface)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Grid lines for scale
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Outer arena border
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    // Draw preset geometry or custom user lines
    if (activePreset.id !== 'custom') {
      activePreset.draw(ctx, width, height);
    } else {
      // Draw all accumulated custom paths
      customTrackPaths.forEach((stroke) => {
        if (stroke.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i].x, stroke[i].y);
        }
        ctx.lineWidth = stroke[0].size || 26;
        ctx.strokeStyle = '#0f172a';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      });
    }
  }, [activePreset, customTrackPaths]);

  // Handle preset change or manual reset: reset robot to spawn location
  useEffect(() => {
    if (activePreset && activePreset.spawn) {
      robotRef.current.reset(activePreset.spawn.x, activePreset.spawn.y, activePreset.spawn.angle);
    }
    renderTrackToCanvas();
  }, [selectedTrackId, activePreset, renderTrackToCanvas, resetCount]);

  // Sync robot settings
  useEffect(() => {
    const robot = robotRef.current;
    robot.baseSpeed = baseSpeed;
    robot.turnSpeed = Math.max(2.5, baseSpeed * 1.25);
    robot.sensorSpacing = sensorSpacing;
    robot.algorithm = algorithm;
  }, [baseSpeed, sensorSpacing, algorithm]);

  // Robust optical pixel sampling simulating the physical TCRT5000 IR photodiode aperture
  const sampleTrackAtPoint = (ctx, x, y, sampleRadius = 3) => {
    const ix = Math.round(x);
    const iy = Math.round(y);
    if (ix < 0 || ix >= ctx.canvas.width || iy < 0 || iy >= ctx.canvas.height) {
      return { isBlack: false, luminance: 255 };
    }
    try {
      const r = sampleRadius;
      const startX = Math.max(0, ix - r);
      const startY = Math.max(0, iy - r);
      const w = Math.min(ctx.canvas.width - startX, r * 2 + 1);
      const h = Math.min(ctx.canvas.height - startY, r * 2 + 1);
      const imgData = ctx.getImageData(startX, startY, w, h).data;
      
      let minLum = 255;
      let blackPixels = 0;
      let totalSamples = 0;

      for (let i = 0; i < imgData.length; i += 4) {
        // Luminance calculation
        const lum = 0.299 * imgData[i] + 0.587 * imgData[i + 1] + 0.114 * imgData[i + 2];
        if (lum < minLum) minLum = lum;
        if (lum < 135) blackPixels++;
        totalSamples++;
      }

      // If at least 20% of the photodiode optical window hits black tape, register detection
      const isBlack = blackPixels > (totalSamples * 0.20);
      return {
        isBlack,
        luminance: minLum,
      };
    } catch {
      return { isBlack: false, luminance: 255 };
    }
  };

  // Main 60FPS simulation loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 16.666, 2.0); // normalized to 60fps
      lastTime = currentTime;

      const mainCanvas = canvasRef.current;
      const trackCanvas = trackCanvasRef.current;
      if (!mainCanvas || !trackCanvas) {
        animFrameId.current = requestAnimationFrame(loop);
        return;
      }

      const mainCtx = mainCanvas.getContext('2d');
      const trackCtx = trackCanvas.getContext('2d', { willReadFrequently: true });
      const robot = robotRef.current;

      // 1. If playing and not manually dragged, run logic & physics
      if (isPlaying && !isDraggingBot && !isDrawingTrack) {
        const sensors = robot.getSensorPositions();
        const leftSample = sampleTrackAtPoint(trackCtx, sensors.left.x, sensors.left.y);
        const rightSample = sampleTrackAtPoint(trackCtx, sensors.right.x, sensors.right.y);

        const leftAnalog = 1.0 - leftSample.luminance / 255;
        const rightAnalog = 1.0 - rightSample.luminance / 255;

        const decision = robot.computeLogic(leftSample.isBlack, rightSample.isBlack, leftAnalog, rightAnalog);
        robot.updatePhysics(dt);

        // Sound engine modulation
        soundEngine.updateMotorHum((robot.motorLeft + robot.motorRight) / 2);

        // Notify telemetry listeners
        if (onTelemetryUpdate) {
          onTelemetryUpdate({
            state: decision.state,
            leftSensor: leftSample.isBlack,
            rightSensor: rightSample.isBlack,
            leftAnalog,
            rightAnalog,
            motorLeft: robot.motorLeft,
            motorRight: robot.motorRight,
            posX: Math.round(robot.x),
            posY: Math.round(robot.y),
            angleDeg: Math.round((robot.angle * 180) / Math.PI),
          });
        }
      } else if (!isPlaying) {
        soundEngine.updateMotorHum(0);
      }

      // 2. Render track buffer onto main canvas
      mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      mainCtx.drawImage(trackCanvas, 0, 0);

      // 3. Render Breadcrumb Trail
      if (showDebugOverlays && robot.trail.length > 1) {
        mainCtx.beginPath();
        mainCtx.moveTo(robot.trail[0].x, robot.trail[0].y);
        for (let i = 1; i < robot.trail.length; i++) {
          mainCtx.lineTo(robot.trail[i].x, robot.trail[i].y);
        }
        mainCtx.strokeStyle = 'rgba(6, 182, 212, 0.45)';
        mainCtx.lineWidth = 3;
        mainCtx.setLineDash([4, 4]);
        mainCtx.stroke();
        mainCtx.setLineDash([]);
      }

      // 4. Render Top-Down Robot Body
      mainCtx.save();
      mainCtx.translate(robot.x, robot.y);
      mainCtx.rotate(robot.angle);

      // --- Acrylic Chassis Body ---
      mainCtx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      mainCtx.shadowBlur = 12;
      mainCtx.shadowOffsetY = 4;

      // Chassis outline
      mainCtx.fillStyle = 'rgba(30, 41, 59, 0.95)';
      mainCtx.strokeStyle = '#0284c7';
      mainCtx.lineWidth = 2.5;

      // Rounded rectangular chassis with tapered front
      mainCtx.beginPath();
      mainCtx.roundRect(-24, -22, 54, 44, [8, 14, 14, 8]);
      mainCtx.fill();
      mainCtx.stroke();
      mainCtx.shadowColor = 'transparent';

      // --- Left & Right Wheels ---
      const wheelW = 32;
      const wheelH = 9;

      // Left wheel (Top in local coords)
      mainCtx.fillStyle = '#0f172a';
      mainCtx.fillRect(-16, -26, wheelW, wheelH);
      mainCtx.fillStyle = '#eab308';
      mainCtx.fillRect(-13, -24, wheelW - 6, wheelH - 4);

      // Right wheel (Bottom in local coords)
      mainCtx.fillStyle = '#0f172a';
      mainCtx.fillRect(-16, 17, wheelW, wheelH);
      mainCtx.fillStyle = '#eab308';
      mainCtx.fillRect(-13, 19, wheelW - 6, wheelH - 4);

      // Animated Wheel Treads
      const treadOffsetL = (performance.now() * 0.05 * robot.motorLeft) % 6;
      const treadOffsetR = (performance.now() * 0.05 * robot.motorRight) % 6;
      mainCtx.strokeStyle = '#ca8a04';
      mainCtx.lineWidth = 1.5;
      for (let tx = -10; tx <= 10; tx += 6) {
        mainCtx.beginPath();
        mainCtx.moveTo(tx + treadOffsetL, -26);
        mainCtx.lineTo(tx + treadOffsetL, -17);
        mainCtx.stroke();

        mainCtx.beginPath();
        mainCtx.moveTo(tx + treadOffsetR, 17);
        mainCtx.lineTo(tx + treadOffsetR, 26);
        mainCtx.stroke();
      }

      // --- Rear Castor Ball ---
      mainCtx.beginPath();
      mainCtx.arc(-16, 0, 6, 0, Math.PI * 2);
      mainCtx.fillStyle = '#64748b';
      mainCtx.fill();
      mainCtx.strokeStyle = '#cbd5e1';
      mainCtx.lineWidth = 1.5;
      mainCtx.stroke();

      // --- Arduino Board on Top ---
      mainCtx.fillStyle = '#0369a1';
      mainCtx.fillRect(-8, -14, 28, 28);
      mainCtx.fillStyle = '#111827';
      mainCtx.fillRect(-2, -6, 16, 12); // IC
      mainCtx.fillStyle = '#38bdf8';
      mainCtx.font = '7px sans-serif';
      mainCtx.fillText('UNO', 1, 3);

      // --- Sensor Boom / Protrusion ---
      mainCtx.fillStyle = '#1e293b';
      mainCtx.fillRect(26, -18, 16, 36);

      // Left IR Probe
      const sensorsLocalY = robot.sensorSpacing / 2;
      mainCtx.beginPath();
      mainCtx.arc(38, -sensorsLocalY, 4.5, 0, Math.PI * 2);
      mainCtx.fillStyle = robot.currentState === 'TURN_LEFT' ? '#10b981' : '#ef4444';
      mainCtx.fill();
      mainCtx.strokeStyle = '#ffffff';
      mainCtx.lineWidth = 1.5;
      mainCtx.stroke();

      // Right IR Probe
      mainCtx.beginPath();
      mainCtx.arc(38, sensorsLocalY, 4.5, 0, Math.PI * 2);
      mainCtx.fillStyle = robot.currentState === 'TURN_RIGHT' ? '#10b981' : '#ef4444';
      mainCtx.fill();
      mainCtx.strokeStyle = '#ffffff';
      mainCtx.lineWidth = 1.5;
      mainCtx.stroke();

      mainCtx.restore();

      // 5. Render Sensor Optical Beams / Raycast Points in World Coordinates
      if (showDebugOverlays) {
        const sensors = robot.getSensorPositions();

        // Left probe halo
        mainCtx.beginPath();
        mainCtx.arc(sensors.left.x, sensors.left.y, 8, 0, Math.PI * 2);
        mainCtx.strokeStyle = robot.currentState === 'TURN_LEFT' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.5)';
        mainCtx.lineWidth = 2;
        mainCtx.stroke();

        // Right probe halo
        mainCtx.beginPath();
        mainCtx.arc(sensors.right.x, sensors.right.y, 8, 0, Math.PI * 2);
        mainCtx.strokeStyle = robot.currentState === 'TURN_RIGHT' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.5)';
        mainCtx.lineWidth = 2;
        mainCtx.stroke();
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      soundEngine.updateMotorHum(0);
    };
  }, [isPlaying, isDraggingBot, isDrawingTrack, onTelemetryUpdate, showDebugOverlays]);

  // Handle Mouse Events for Dragging Bot or Drawing Track
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDrawMode) {
      setIsDrawingTrack(true);
      currentDrawStroke.current = [{ x, y, size: paintBrushSize }];
      return;
    }

    // Check if clicked near robot
    const robot = robotRef.current;
    const distToRobot = Math.hypot(x - robot.x, y - robot.y);
    if (distToRobot < 45) {
      setIsDraggingBot(true);
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDrawMode && isDrawingTrack) {
      currentDrawStroke.current.push({ x, y, size: paintBrushSize });

      // Live stroke directly onto track canvas
      const trackCanvas = trackCanvasRef.current;
      if (trackCanvas) {
        const ctx = trackCanvas.getContext('2d');
        const stroke = currentDrawStroke.current;
        if (stroke.length >= 2) {
          ctx.beginPath();
          ctx.moveTo(stroke[stroke.length - 2].x, stroke[stroke.length - 2].y);
          ctx.lineTo(x, y);
          ctx.lineWidth = paintBrushSize;
          ctx.strokeStyle = '#0f172a';
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }
      return;
    }

    if (isDraggingBot) {
      const robot = robotRef.current;
      // Calculate angle from previous pos to new pos for smooth heading orientation
      const dx = x - robot.x;
      const dy = y - robot.y;
      if (Math.hypot(dx, dy) > 3) {
        robot.angle = Math.atan2(dy, dx);
      }
      robot.x = x;
      robot.y = y;
      robot.trail = [];
    }
  };

  const handleMouseUp = () => {
    if (isDrawingTrack) {
      setIsDrawingTrack(false);
      if (currentDrawStroke.current.length > 1) {
        setCustomTrackPaths((prev) => [...prev, currentDrawStroke.current]);
      }
      currentDrawStroke.current = [];
    }
    if (isDraggingBot) {
      setIsDraggingBot(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Hidden Track Canvas for pixel reading & pre-rendering */}
      <canvas
        ref={trackCanvasRef}
        width={1050}
        height={650}
        style={{ display: 'none' }}
      />

      {/* Main Interactive Screen Canvas */}
      <canvas
        ref={canvasRef}
        width={1050}
        height={650}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          border: '1px solid var(--border-medium)',
          cursor: isDrawMode ? 'crosshair' : isDraggingBot ? 'grabbing' : 'grab',
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />

      {/* Floating Canvas Prompt / Watermark */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '24px',
        pointerEvents: 'none',
        display: 'flex',
        gap: '0.75rem',
      }}>
        <span className="badge badge-cyan" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(15, 23, 42, 0.75)' }}>
          {isDrawMode ? '✏️ Paint Mode: Click & drag to paint track' : '🤖 Interactive: Click & drag bot to test line recovery'}
        </span>
      </div>
    </div>
  );
}
