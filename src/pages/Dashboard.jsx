import React from 'react';
import { useQds } from '../context/QdsContext';
import MetricCard from '../components/MetricCard';
import QuantumFlow from '../components/QuantumFlow';
import MeasurementChart from '../components/MeasurementChart';
import VerificationPanel from '../components/VerificationPanel';
import ThreatPanel from '../components/ThreatPanel';
import ThreatTimeline from '../components/ThreatTimeline';
import ProbabilityChart from '../components/ProbabilityChart';
import AttackDistribution from '../components/AttackDistribution';
import {
  ShieldCheck,
  ShieldAlert,
  Percent,
  TrendingDown,
  Hash,
  AlertOctagon,
  TrendingUp,
  Activity,
  Play,
  Flame,
  BarChart3
} from 'lucide-react';

export default function Dashboard() {
  const { stats, runVerification, setActiveTab } = useQds();

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="glass-card p-6 border-quantum-blue/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none quantum-grid" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Quantum-Inspired Threat Detection
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Deterministic security monitoring for teleportation-based Quantum Digital Signatures (QDS)
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => runVerification(256, 'Z')}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-quantum-blue to-quantum-blue/80 hover:from-quantum-blue hover:to-quantum-blue text-dark-950 font-bold rounded shadow-glow-blue transition-all cursor-pointer"
            >
              <Play size={13} fill="currentColor" />
              Run Verification
            </button>
            <button
              onClick={() => setActiveTab('attack')}
              className="flex items-center gap-1.5 px-4 py-2 bg-dark-850 hover:bg-dark-800 text-quantum-purple border border-quantum-purple/30 hover:border-quantum-purple rounded transition-all cursor-pointer"
            >
              <Flame size={13} />
              Launch Attack Simulation
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
       {/* Acceptance Rate */}
<MetricCard
  title="Acceptance Rate"
  value={`${stats.verificationAccuracy}%`}
  subtext="Accepted / total attempts"
  icon={Percent}
  glowType="blue"
/>

        {/* Forgery Probability */}
        <MetricCard
  title="Forgery Probability"
  value={
  stats.forgeryProbability !== null &&
  stats.forgeryProbability !== undefined
    ? Number(stats.forgeryProbability).toExponential(2)
    : "N/A"
}
  subtext="Prototype statistical estimate"
  icon={TrendingDown}
  glowType="blue"
/>

        {/* Total Verification Attempts */}
        <MetricCard 
  title="Verification Attempts" 
  value={stats.totalAttempts.toLocaleString()} 
  subtext="Total verification attempts" 
  icon={Hash} 
  glowType="none" 
/>

        {/* Threats Detected */}
        <MetricCard
          title="Threats Detected"
          value={stats.threatsDetected}
          breakdown={stats.threatBreakdown}
          icon={AlertOctagon}
          glowType={stats.threatsDetected > 17 ? 'purple' : 'none'}
        />

        {/* False Acceptance Rate */}
        <MetricCard
  title="False Acceptance Rate"
  value={`${stats.falseAcceptanceRate}%`}
  subtext="Estimated false-accept rate"
  icon={TrendingUp}
  glowType="none"
/>

        {/* Protocol Integrity */}
        <MetricCard
          title="Protocol Integrity"
          value={stats.protocolIntegrity}
          subtext={`Observed Conf: ${stats.observedConfidence}`}
          icon={stats.protocolIntegrity === 'SECURE' ? ShieldCheck : ShieldAlert}
          glowType={stats.protocolIntegrity === 'SECURE' ? 'blue' : 'purple'}
        />
      </div>

      {/* Quantum Flow Diagram */}
      <QuantumFlow />

      {/* Analytics Group: Pauli Basis + Statistical Composed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MeasurementChart />
        <ProbabilityChart />
      </div>

      {/* Decision Engine + Threat Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Panel */}
        <div className="lg:col-span-1">
          <VerificationPanel />
        </div>

        {/* Threat Detection Engine */}
        <div className="lg:col-span-2">
          <ThreatPanel />
        </div>
      </div>

      {/* Event Timeline + Attack Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event Timeline */}
        <div className="lg:col-span-2">
          <ThreatTimeline />
        </div>

        {/* Attack Distribution (Donut) */}
        <div className="lg:col-span-1">
          <AttackDistribution />
        </div>
      </div>

      {/* Dashboard Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quick Action 1: Run QDS */}
        <div className="glass-card p-5 border-slate-800/40 flex flex-col justify-between min-h-[140px] hover:border-quantum-blue/20 transition-all">
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Run QDS Verification</h4>
            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
              Execute teleportation-based signature verification using simulated measurement outcomes.
            </p>
          </div>
          <button
            onClick={() => runVerification(256, 'Z')}
            className="w-full mt-4 py-2 bg-dark-850 hover:bg-dark-800 border border-dark-800 hover:border-slate-700 text-xs font-bold text-slate-300 hover:text-white rounded transition-all cursor-pointer text-center"
          >
            Start Verification
          </button>
        </div>

        {/* Quick Action 2: Simulate Attack */}
        <div className="glass-card p-5 border-slate-800/40 flex flex-col justify-between min-h-[140px] hover:border-quantum-purple/20 transition-all">
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Simulate Attack</h4>
            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
              Generate controlled forgery, replay, impersonation or channel manipulation scenarios.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('attack')}
            className="w-full mt-4 py-2 bg-dark-850 hover:bg-dark-800 border border-dark-800 hover:border-slate-700 text-xs font-bold text-slate-300 hover:text-white rounded transition-all cursor-pointer text-center"
          >
            Open Simulator
          </button>
        </div>

        {/* Quick Action 3: Analyze Security */}
        <div className="glass-card p-5 border-slate-800/40 flex flex-col justify-between min-h-[140px] hover:border-quantum-blue/20 transition-all">
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Analyze Security</h4>
            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
              Evaluate forgery probability and verification accuracy using statistical measurements.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('security')}
            className="w-full mt-4 py-2 bg-dark-850 hover:bg-dark-800 border border-dark-800 hover:border-slate-700 text-xs font-bold text-slate-300 hover:text-white rounded transition-all cursor-pointer text-center"
          >
            Security Analysis
          </button>
        </div>
      </div>

      {/* Scientific Transparency Footer */}
      <footer className="glass-card p-5 border-slate-800/40 bg-dark-950/20 font-mono text-[11px] text-slate-500 leading-relaxed">
        <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Security Model</h4>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <span className="text-[9px] uppercase text-slate-600 block">Detection Method</span>
            <span className="text-slate-300 font-semibold mt-0.5 block">Quantum-Inspired Statistical Analysis</span>
          </div>
          <div>
            <span className="text-[9px] uppercase text-slate-600 block">Core Principles</span>
            <span className="text-slate-300 font-semibold mt-0.5 block">Bell-State, Teleportation, Pauli Correction, Measurements</span>
          </div>
          <div>
            <span className="text-[9px] uppercase text-slate-600 block">Artificial Intelligence</span>
            <span className="text-red-400 font-semibold mt-0.5 block">Not Used</span>
          </div>
          <div>
            <span className="text-[9px] uppercase text-slate-600 block">Execution</span>
            <span className="text-slate-300 font-semibold mt-0.5 block">Deterministic Simulation & Bounds Check</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
