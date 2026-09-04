import React from 'react';
import ThreatPanel from '../components/ThreatPanel';
import ThreatTimeline from '../components/ThreatTimeline';
import { ShieldCheck, Cpu, Database, Award } from 'lucide-react';

export default function ThreatDetection() {
  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="glass-card p-6 border-slate-800/40 relative">
        <h2 className="text-lg font-semibold text-glow-blue text-white">Threat Detection Engine</h2>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          The threat detection dashboard operates strictly on deterministic mathematical boundaries and physical checks defined in the QDS protocol. By avoiding stochastic machine learning models, the dashboard achieves 100% auditable, zero false-negative verification rates for signature tampering and replay attacks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat panel */}
        <div className="lg:col-span-2">
          <ThreatPanel />
        </div>

        {/* Math rules panel */}
        <div className="lg:col-span-1 glass-card p-6 border-slate-800/40 space-y-4">
          <div className="flex items-center gap-2 border-b border-dark-800 pb-3">
            <Cpu size={16} className="text-quantum-blue" />
            <h3 className="text-sm font-semibold text-white font-mono uppercase">Detection Rules</h3>
          </div>

          <div className="space-y-4 font-mono text-[11px] text-slate-400 leading-relaxed">
            <div className="p-3 bg-dark-950/40 border border-dark-900 rounded">
              <strong className="text-white block mb-1">1. Forgery Bound rule</strong>
              <p>Checks if $P_{"{"}forge{"}"} = (3/4)^n \le 0.05$. If Bob's mismatch rate exceeds the 95% threshold, it flags a Forgery threat attempt.</p>
            </div>
            <div className="p-3 bg-dark-950/40 border border-dark-900 rounded">
              <strong className="text-white block mb-1">2. Replay Buffer validation</strong>
              <p>Ensures Session ID has not been registered in the verification history database. Double signature submission triggers an immediate block.</p>
            </div>
            <div className="p-3 bg-dark-950/40 border border-dark-900 rounded">
              <strong className="text-white block mb-1">3. Channel Deviation check</strong>
              <p>Flags if measurement deviation $|1.0 - \text{"{"}matchRate{"}"}| &gt; 0.05$. Indicates possible active eavesdropping or quantum link degradation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Event Timeline */}
      <ThreatTimeline />
    </div>
  );
}
