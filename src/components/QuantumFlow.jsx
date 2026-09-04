import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Radio, Shield, HelpCircle } from 'lucide-react';

export default function QuantumFlow() {
  const steps = [
    {
      id: 'alice',
      title: 'Alice (Signer)',
      subtitle: 'Key States Prep',
      details: 'Alice encodes signature bits into eigenstates (|0>, |1>, |+>, |->).',
      icon: Cpu,
      color: 'blue'
    },
    {
      id: 'bell',
      title: 'Bell Entanglement',
      subtitle: 'Quantum Resource',
      details: 'EPR pairs created and shared as verification channels.',
      icon: Radio,
      color: 'purple'
    },
    {
      id: 'teleport',
      title: 'Quantum Teleportation',
      subtitle: 'State Transmission',
      details: 'Alice performs Bell state measurements to teleport states to Bob/Charlie.',
      icon: ArrowRight,
      color: 'blue'
    },
    {
      id: 'pauli',
      title: 'Pauli Correction',
      subtitle: 'Classical Feedforward',
      details: 'Classical bits sent to rotate states (I, X, Y, or Z) and recover raw keys.',
      icon: Shield,
      color: 'purple'
    },
    {
      id: 'measurement',
      title: 'Projective Measurement',
      subtitle: 'Verification Check',
      details: 'Bob performs measurement on chosen basis to check signature matching.',
      icon: HelpCircle,
      color: 'blue'
    }
  ];

  return (
    <div className="glass-card p-6 border-slate-800/40 relative overflow-hidden">
      {/* Background grids */}
      <div className="absolute inset-0 opacity-10 pointer-events-none quantum-grid" />
      <div className="absolute top-0 right-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest bg-dark-950/80 px-2 py-1 border-b border-l border-dark-800 rounded-bl">
        Quantum Simulation Environment
      </div>

      <div className="mb-4">
        <h3 className="text-base font-semibold text-white">Quantum State & Measurement Monitor</h3>
        <p className="text-xs text-slate-400 mt-1">
          Simulated path of cryptographic state teleportation and eigenstate checks.
        </p>
      </div>

      {/* Horizontal Flow Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative z-10 py-4">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isBlue = step.color === 'blue';
          return (
            <React.Fragment key={step.id}>
              {/* Card Step */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`relative p-4 rounded-lg bg-dark-950/40 border transition-all duration-300 flex flex-col items-center text-center group ${
                  isBlue
                    ? 'border-quantum-blue/20 hover:border-quantum-blue/40 hover:bg-quantum-blue/[0.02]'
                    : 'border-quantum-purple/20 hover:border-quantum-purple/40 hover:bg-quantum-purple/[0.02]'
                }`}
              >
                {/* Connector line on Desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-4 h-[1px] bg-slate-800 z-0 group-hover:bg-quantum-blue/40 transition-colors" />
                )}

                {/* Animated Pulsing Dot for Simulation Action */}
                <span className={`absolute top-2 left-2 h-1.5 w-1.5 rounded-full ${
                  isBlue ? 'bg-quantum-blue animate-ping' : 'bg-quantum-purple animate-ping'
                }`} />

                {/* Icon Container */}
                <div className={`p-2.5 rounded-full mb-3 text-white ${
                  isBlue 
                    ? 'bg-quantum-blue/10 border border-quantum-blue/20 shadow-glow-blue' 
                    : 'bg-quantum-purple/10 border border-quantum-purple/20 shadow-glow-purple'
                }`}>
                  <StepIcon size={20} />
                </div>

                {/* Content */}
                <h4 className="text-xs font-bold text-white tracking-wide">{step.title}</h4>
                <span className={`text-[10px] font-mono font-semibold uppercase mt-0.5 ${
                  isBlue ? 'text-quantum-blue' : 'text-quantum-purple'
                }`}>
                  {step.subtitle}
                </span>

                <p className="text-[10px] text-slate-500 mt-2 leading-relaxed h-12 overflow-hidden">
                  {step.details}
                </p>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Verification Summary status overlay */}
      <div className="mt-5 pt-4 border-t border-dark-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Security Target:</span>
          <span className="text-white px-2 py-0.5 bg-dark-950 rounded border border-dark-800">
            Bell-State Protocol Mapped
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="h-2 w-2 rounded-full bg-quantum-blue animate-pulse" />
            Alice keys teleported
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="h-2 w-2 rounded-full bg-quantum-purple animate-pulse" />
            Bob correction parity synced
          </span>
        </div>
      </div>
    </div>
  );
}
