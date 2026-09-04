import React from 'react';
import { useQds } from '../context/QdsContext';
import {
  LayoutDashboard,
  Binary,
  ShieldCheck,
  Activity,
  Flame,
  Bomb,
  BookOpen,
  FileCode,
  Radio,
  Cpu,
  Fingerprint
} from 'lucide-react';

export default function Sidebar() {
  const { activeTab, setActiveTab, stats } = useQds();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'live', label: 'Live Signature', icon: Fingerprint },
    { id: 'protocol', label: 'QDS Protocol', icon: Binary },
    { id: 'verification', label: 'Signature Verification', icon: ShieldCheck },
    { id: 'measurement', label: 'Measurement Analysis', icon: Activity },
    { id: 'threat', label: 'Threat Detection', icon: Flame },
    { id: 'attack', label: 'Attack Simulation', icon: Bomb },
    { id: 'security', label: 'Security Analysis', icon: BookOpen },
    { id: 'audit', label: 'Audit Trail', icon: FileCode }
  ];

  return (
    <aside className="w-64 bg-dark-900/90 border-r border-slate-800/80 min-h-screen flex flex-col justify-between p-5 text-slate-300 font-sans backdrop-blur-xl relative z-10">
      <div>
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-8 border-b border-dark-800 pb-5">
          <div className="p-2 rounded-lg bg-gradient-to-br from-quantum-blue to-quantum-purple text-white shadow-glow-blue animate-pulse-slow">
            <Cpu size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-glow-blue text-white leading-none">
              Q-SEC
            </h1>
            <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-widest block mt-1">
              Quantum Digital Signature
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-quantum-blue/15 to-quantum-purple/5 text-white border-l-2 border-quantum-blue shadow-glow-blue'
                    : 'hover:bg-dark-800/50 hover:text-white border-l-2 border-transparent'
                }`}
              >
                <Icon
                  size={18}
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-quantum-blue' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Lab Simulation Footer Indicators */}
      <div className="border-t border-dark-800 pt-5 space-y-4">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-2">
            System Console
          </span>
          <div className="space-y-2 text-xs font-mono">
            {/* Simulator Live status */}
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Quantum Simulator</span>
              <span className="flex items-center gap-1.5 font-bold text-quantum-blue animate-pulse">
                <span className="h-2 w-2 rounded-full bg-quantum-blue"></span>
                ONLINE
              </span>
            </div>

            {/* Integrity Security state */}
            <div className="flex items-center justify-between">
              <span className="text-slate-400">System Integrity</span>
              {stats.protocolIntegrity === 'SECURE' ? (
                <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  SECURE
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-bold text-red-500 animate-pulse">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  ALERT
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Institutional branding */}
        <div className="bg-dark-950/60 p-2.5 rounded border border-dark-800/50 text-[10px] font-mono text-center text-slate-600">
          QDS SIMULATOR v2.4.0
        </div>
      </div>
    </aside>
  );
}
