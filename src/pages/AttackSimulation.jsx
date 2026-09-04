import React, { useState } from 'react';
import { useQds } from '../context/QdsContext';
import { Bomb, ShieldAlert, AlertTriangle, Fingerprint, FileCode, Play } from 'lucide-react';
import AttackTrace from '../components/AttackTrace';

export default function AttackSimulation() {
  const { attackSimulation, simulateAttack, isSimulatingAttack } = useQds();
  const [activeAttack, setActiveAttack] = useState(null);

  const attacks = [
    {
      id: 'forgery',
      name: 'Statistical Forgery',
      icon: ShieldAlert,
      color: 'amber',
      desc: 'Inject randomly guessed quantum measurements (no state knowledge) into the teleportation channel.'
    },
    {
      id: 'replay',
      name: 'Session Replay',
      icon: AlertTriangle,
      color: 'amber',
      desc: 'Intercept a validated QDS signature payload and replay it against a new transaction request.'
    },
    {
      id: 'impersonation',
      name: 'Identity Impersonation',
      icon: Fingerprint,
      color: 'red',
      desc: 'Attempt to pass verification using an incorrect sender identity mismatching the QDS session keys.'
    },
    {
      id: 'channel',
      name: 'Channel Tampering',
      icon: Bomb,
      color: 'red',
      desc: 'Simulate eavesdropping (Eve) intercept/resend on the quantum channel causing decoherence phase errors.'
    },
    {
      id: 'message-tampering',
      name: 'Message Tampering',
      icon: FileCode,
      color: 'red',
      desc: 'Create a real Ed25519 signature, but alter the message text before verification (crypto hash failure).'
    },
    {
      id: 'signature-tampering',
      name: 'Signature Tampering',
      icon: FileCode,
      color: 'red',
      desc: 'Create a real Ed25519 signature, but corrupt the signature bytes before verification (crypto signature failure).'
    }
  ];

  const handleRunAttack = (attackId) => {
    setActiveAttack(attackId);
    simulateAttack(attackId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-dark-800 pb-4">
        <div className="p-2.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
          <Bomb size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">Attack Lab Simulator</h2>
          <p className="text-sm text-slate-400 mt-1">Execute controlled cryptographic and quantum attacks against the verification engine.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attack Controls */}
        <div className="space-y-4">
          <div className="glass-card p-6 border-slate-800/40">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-dark-800 pb-2">
              Select Threat Vector
            </h3>
            
            <div className="space-y-3">
              {attacks.map(attack => {
                const Icon = attack.icon;
                const isSelected = activeAttack === attack.id;
                return (
                  <button
                    key={attack.id}
                    disabled={isSimulatingAttack}
                    onClick={() => handleRunAttack(attack.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all flex gap-4 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isSelected 
                        ? `bg-${attack.color}-950/30 border-${attack.color}-500/50 shadow-glow-${attack.color}`
                        : 'bg-dark-950/60 border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className={`mt-0.5 text-${attack.color}-400`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white font-mono uppercase text-sm">
                          {attack.name}
                        </span>
                        {isSimulatingAttack && isSelected && (
                           <span className="text-[10px] font-mono text-quantum-blue animate-pulse flex items-center gap-1">
                             <Play size={10} /> EXECUTING
                           </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {attack.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Attack Results Console */}
        <div className="glass-card p-6 border-slate-800/40 min-h-[500px] flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-dark-800 pb-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Security Console Output
            </h3>
            {attackSimulation.active && (
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                attackSimulation.detected
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {attackSimulation.detected ? 'THREAT DETECTED' : 'MONITORING'}
              </span>
            )}
          </div>

          {!attackSimulation.active ? (
            <div className="flex-1 flex items-center justify-center text-slate-600 font-mono text-sm">
              Waiting for attack execution...
            </div>
          ) : (
            <div className="flex-1 font-mono text-xs overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-4">
                {/* Result header */}
                <div className="bg-dark-950 p-4 rounded border border-dark-800">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-500 block mb-1">Attack Type</span>
                      <span className="text-white font-bold">{attackSimulation.type}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1">Final Decision</span>
                      <span className={`font-bold ${
                        attackSimulation.decision === 'ACCEPT' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {attackSimulation.decision}
                      </span>
                    </div>
                    {attackSimulation.probability !== undefined && (
                      <div>
                        <span className="text-slate-500 block mb-1">Guessing Probability</span>
                        <span className="text-amber-400 font-bold">{attackSimulation.probability}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Console logs */}
                <div>
                  <h4 className="text-slate-500 mb-2 border-b border-dark-800 pb-1">Execution Logs</h4>
                  <div className="space-y-1.5 text-slate-300 bg-dark-950 p-3 rounded">
                    {attackSimulation.logs.map((log, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-slate-600 select-none">{'>'}</span>
                        <span className={
                          log.includes('Status:') 
                            ? (log.includes('ACCEPT') ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold')
                            : log.includes('WARNING') || log.includes('Threat:') || log.includes('FAILED')
                              ? 'text-amber-400'
                              : ''
                        }>
                          {log}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Attack Trace Timeline */}
                {attackSimulation.trace && attackSimulation.trace.length > 0 && (
                  <AttackTrace trace={attackSimulation.trace} timestamp={attackSimulation.timestamp} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
