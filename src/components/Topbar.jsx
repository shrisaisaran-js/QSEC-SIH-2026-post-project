import React from 'react';
import { useQds } from '../context/QdsContext';
import { Lock, Shield, Settings, RefreshCw, AlertTriangle } from 'lucide-react';

export default function Topbar() {
  const { activeTab, sessionId, stats, resetStats } = useQds();

  // Helper to format tab title
  const getPageHeader = () => {
    switch (activeTab) {
      case 'overview':
        return 'Overview & Real-time Metrics';
      case 'protocol':
        return 'QDS Teleportation Protocol';
      case 'verification':
        return 'Signature Verification';
      case 'measurement':
        return 'Pauli Measurement Analysis';
      case 'threat':
        return 'Threat Detection Control';
      case 'attack':
        return 'Attack Simulation Room';
      case 'security':
        return 'Security Bounds Analysis';
      case 'audit':
        return 'Cryptographic Audit Trail';
      default:
        return 'Quantum Signature Security';
    }
  };

  return (
    <header className="h-16 bg-dark-900/80 border-b border-slate-800/80 px-6 flex items-center justify-between backdrop-blur-xl relative z-10">
      {/* Title Path */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          Teleportation-Based QDS
        </span>
        <span className="text-slate-700">/</span>
        <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
          {getPageHeader()}
        </h2>
      </div>

      {/* Control Tools */}
      <div className="flex items-center gap-4">
        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          {/* Simulator status */}
          <div className="hidden md:flex items-center gap-2 bg-dark-950/60 px-3 py-1.5 rounded-full border border-dark-800 text-[10px] font-mono font-bold tracking-wider">
            <span className="h-2 w-2 rounded-full bg-quantum-blue animate-pulse"></span>
            <span className="text-quantum-blue">SIMULATOR ONLINE</span>
          </div>

          {/* Protocol Integrity Status */}
          {stats.protocolIntegrity === 'SECURE' ? (
            <div className="flex items-center gap-1.5 bg-emerald-950/30 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-900/40 text-[10px] font-mono font-bold">
              <Shield size={12} className="text-emerald-400" />
              INTEGRITY: SECURE
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-red-950/30 text-red-400 px-3 py-1.5 rounded-full border border-red-900/40 text-[10px] font-mono font-bold animate-pulse">
              <AlertTriangle size={12} className="text-red-400" />
              INTEGRITY: COMPROMISED
            </div>
          )}

          {/* Session ID display */}
          <div className="flex items-center gap-1.5 bg-dark-950/60 px-3 py-1.5 rounded border border-dark-800 text-[10px] font-mono text-slate-400">
            <Lock size={12} className="text-quantum-blue" />
            <span>SESSION:</span>
            <span className="text-white font-semibold">{sessionId}</span>
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex items-center gap-2 border-l border-dark-800 pl-4">
          {/* Reset button */}
          <button
            onClick={resetStats}
            title="Reset Simulation Metrics"
            className="p-2 rounded bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-white border border-dark-800 hover:border-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw size={15} />
          </button>

          {/* Configuration button */}
          <button
            title="Protocol Simulation Parameters"
            className="p-2 rounded bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-white border border-dark-800 hover:border-slate-700 transition-colors cursor-not-allowed"
            disabled
          >
            <Settings size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
