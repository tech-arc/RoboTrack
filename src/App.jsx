import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AssemblyView from './components/Assembly/AssemblyView';
import SimulationView from './components/Simulation/SimulationView';
import { REQUIRED_CIRCUITS, isCircuitMatch } from './data/pinConnections';

export default function App() {
  const [currentMode, setCurrentMode] = useState('assembly'); // 'assembly' | 'simulation'
  const [wiringState, setWiringState] = useState({
    wires: [],
  });

  // Calculate circuit completion percentage
  const completedCircuits = REQUIRED_CIRCUITS.filter(circ => 
    wiringState.wires.some(wire => isCircuitMatch(wire, circ))
  );
  const wiringCompletion = Math.round((completedCircuits.length / REQUIRED_CIRCUITS.length) * 100);
  const isFullyWired = wiringCompletion === 100;

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        wiringCompletion={wiringCompletion}
      />

      {/* Main Workspace Area */}
      <main className="app-main">
        {currentMode === 'assembly' ? (
          <AssemblyView
            onSwitchToSimulation={() => setCurrentMode('simulation')}
            wiringState={wiringState}
            setWiringState={setWiringState}
          />
        ) : (
          <SimulationView
            onSwitchToAssembly={() => setCurrentMode('assembly')}
            wiringState={wiringState}
            isFullyWired={isFullyWired}
          />
        )}
      </main>
    </div>
  );
}
