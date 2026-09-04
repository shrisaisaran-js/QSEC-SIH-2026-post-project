import React from 'react';
import { 
  Terminal, Shield, Activity, Fingerprint, RefreshCcw, UserMinus, Flame, Play, Clock, AlertTriangle, ShieldAlert
} from 'lucide-react';

export default function AttackTrace({ trace, timestamp }) {
  if (!trace || trace.length === 0) return null;

  return (
    <div className="mt-6 border-t border-dark-800 pt-6">
      <div className="flex items-center gap-2 mb-4">
        <Terminal size={16} className="text-quantum-blue" />
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Attack Trace Timeline</h3>
      </div>
      
      <div className="text-[10px] text-slate-500 font-mono mb-4 flex justify-between items-center">
        <span>Detailed execution path through security architecture.</span>
        <span>{timestamp}</span>
      </div>

      <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
        {trace.map((step, index) => {
          
          let Icon = Activity;
          let colorClass = "text-slate-400";
          let bgClass = "bg-dark-950 border-slate-800";
          let iconBgClass = "bg-dark-900 border-slate-800";
          
          // Style based on status
          if (step.status === "OK" || step.status === "PASS") {
            colorClass = "text-emerald-400";
            bgClass = "border-emerald-500/20 bg-emerald-950/10";
            iconBgClass = "bg-emerald-950 border-emerald-500/50";
            Icon = Shield;
          } else if (step.status === "DETECTED" || step.status === "FAILED") {
            colorClass = "text-red-400";
            bgClass = "border-red-500/30 bg-red-950/10";
            iconBgClass = "bg-red-950 border-red-500/50";
            Icon = ShieldAlert;
          } else if (step.status === "BLOCKED" || step.status === "REJECT") {
            colorClass = "text-amber-400";
            bgClass = "border-amber-500/30 bg-amber-950/10";
            iconBgClass = "bg-amber-950 border-amber-500/50";
            Icon = AlertTriangle;
          } else if (step.status === "INFO") {
            colorClass = "text-quantum-blue";
            bgClass = "border-quantum-blue/20 bg-quantum-blue/5";
            iconBgClass = "bg-dark-900 border-quantum-blue/50";
            Icon = Play;
          }

          return (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10 mx-auto transition-transform group-hover:scale-110" style={{'--tw-bg-opacity': 1, ...{}}}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBgClass}`}>
                  <Icon size={14} className={colorClass} />
                </div>
              </div>
              <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded border ${bgClass} shadow`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold font-mono tracking-wider ${colorClass}`}>{step.stage.replace(/_/g, ' ')}</span>
                  <span className="text-[9px] font-mono text-slate-500">{new Date(step.timestamp).toISOString().split('T')[1].replace('Z', '')}</span>
                </div>
                <div className="text-xs text-slate-300 font-mono leading-relaxed">
                  {step.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
