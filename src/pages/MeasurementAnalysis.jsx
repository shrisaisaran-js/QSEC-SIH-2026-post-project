import React from 'react';
import { useQds } from '../context/QdsContext';
import MeasurementChart from '../components/MeasurementChart';
import { Activity, ShieldCheck, Cpu, Database } from 'lucide-react';

export default function MeasurementAnalysis() {
  const { pauliStats } = useQds();

  return (
    <div className="space-y-6">
      {/* Intro explanation */}
      <div className="glass-card p-6 border-slate-800/40 relative">
        <h2 className="text-lg font-semibold text-glow-blue text-white">Quantum Measurement Analysis</h2>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          Physical security in teleportation-based QDS stems from quantum projective measurement outcomes. Since Alice prepares secret keys using random orthogonal and non-orthogonal bases, any eavesdropper (Eve) who intercept-resends states will introduce a minimum 25% error rate, easily detected during Bob and Charlie's Z, X, or Y basis verification runs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Statistics details */}
        <div className="lg:col-span-1 glass-card p-6 border-slate-800/40 space-y-5">
          <div className="flex items-center gap-2 border-b border-dark-800 pb-3">
            <Database size={16} className="text-quantum-blue" />
            <h3 className="text-base font-semibold text-white font-mono uppercase">Basis Statistics</h3>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {/* X basis */}
            <div className="p-3.5 rounded bg-dark-950/40 border border-slate-800/60">
              <div className="flex justify-between font-bold text-white mb-2">
                <span>X Basis Stats</span>
                <span className="text-quantum-blue">Eigenstates: |+⟩, |-⟩</span>
              </div>
              <div className="space-y-1 text-slate-400">
                <div className="flex justify-between">
                  <span>Match Rate (+1):</span>
                  <span className="text-emerald-400 font-semibold">{pauliStats.X.plus}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Mismatch Rate (-1):</span>
                  <span className="text-red-400 font-semibold">{pauliStats.X.minus}%</span>
                </div>
              </div>
            </div>

            {/* Y basis */}
            <div className="p-3.5 rounded bg-dark-950/40 border border-slate-800/60">
              <div className="flex justify-between font-bold text-white mb-2">
                <span>Y Basis Stats</span>
                <span className="text-quantum-blue">Eigenstates: |+i⟩, |-i⟩</span>
              </div>
              <div className="space-y-1 text-slate-400">
                <div className="flex justify-between">
                  <span>Match Rate (+1):</span>
                  <span className="text-emerald-400 font-semibold">{pauliStats.Y.plus}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Mismatch Rate (-1):</span>
                  <span className="text-red-400 font-semibold">{pauliStats.Y.minus}%</span>
                </div>
              </div>
            </div>

            {/* Z basis */}
            <div className="p-3.5 rounded bg-dark-950/40 border border-slate-800/60">
              <div className="flex justify-between font-bold text-white mb-2">
                <span>Z Basis Stats</span>
                <span className="text-quantum-blue">Eigenstates: |0⟩, |1⟩</span>
              </div>
              <div className="space-y-1 text-slate-400">
                <div className="flex justify-between">
                  <span>Match Rate (+1):</span>
                  <span className="text-emerald-400 font-semibold">{pauliStats.Z.plus}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Mismatch Rate (-1):</span>
                  <span className="text-red-400 font-semibold">{pauliStats.Z.minus}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Graphical Representation */}
        <div className="lg:col-span-2">
          <MeasurementChart />
        </div>
      </div>

      {/* Scientific formulas panel */}
      <div className="glass-card p-6 border-slate-800/40 font-mono text-xs space-y-4">
        <h4 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Cpu size={14} className="text-quantum-blue" />
          Projective Measurement Operator Logic
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-dark-950/40 p-4 rounded border border-dark-800 space-y-2">
            <span className="text-[10px] text-quantum-blue font-bold uppercase tracking-wider block">
              Z Basis Projection (Computational)
            </span>
            <code className="text-[11px] text-slate-300 block select-all">
              P_0 = |0⟩⟨0|, \quad P_1 = |1⟩⟨1|
            </code>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-2">
              Validates direct bit parity. Used to verify signature parity matches Bob's keys after Pauli correction operations are applied.
            </p>
          </div>
          <div className="bg-dark-950/40 p-4 rounded border border-dark-800 space-y-2">
            <span className="text-[10px] text-quantum-purple font-bold uppercase tracking-wider block">
              X Basis Projection (Superposition)
            </span>
            <code className="text-[11px] text-slate-300 block select-all">
              P_+ = |+⟩⟨+|, \quad P_- = |-⟩⟨-|
            </code>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-2">
              Validates phase coherence. Any intercept-resend tampering (Eve measuring in computational basis) collapses state phase, causing 50% mismatch rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
