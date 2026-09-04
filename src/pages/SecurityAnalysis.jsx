import React from 'react';
import { Cpu, ShieldCheck, Database, Award, Info } from 'lucide-react';

export default function SecurityAnalysis() {
  return (
    <div className="space-y-6">
      {/* Intro info */}
      <div className="glass-card p-6 border-slate-800/40 relative">
        <h2 className="text-lg font-semibold text-glow-blue text-white">Quantum Security Bounds Proof</h2>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          The teleportation-based Quantum Digital Signature (QDS) protocol guarantees information-theoretic security. This means security is protected by the physical laws of quantum mechanics, rather than computational complexity assumptions (e.g. factoring prime numbers or solving discrete logarithms), making QDS secure even against infinite quantum computing power.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forgery Bounds Card */}
        <div className="glass-card p-6 border-slate-800/40 space-y-4">
          <div className="flex items-center gap-2 border-b border-dark-800 pb-3">
            <ShieldCheck size={16} className="text-quantum-blue" />
            <h3 className="text-sm font-semibold text-white font-mono uppercase">Security Against Forgery</h3>
          </div>

          <div className="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
            <p>
              In a forgery attempt, an adversary (Bob or Charlie) tries to declare a signature valid for a message Alice did not sign. Because Alice distributes signature keys randomly encoded in {"{X, Y, Z}"} bases, any forging attempt requires guessing the basis.
            </p>
            <div className="bg-dark-950/60 p-3 border border-dark-800 rounded font-mono text-[11px] text-slate-400">
              <strong>Mathematical Bound:</strong>
              <div className="text-center text-quantum-blue my-2 font-bold select-all">
                {"P_{\\text{forge}} = \\left(\\frac{3}{4}\\right)^N"}
              </div>
              Where $N$ is the number of qubit measurement samples. As $N \to 256$, the probability of a successful forgery falls to less than $10^{-32}$, making it physically impossible.
            </div>
            <p className="text-slate-400">
              If Bob/Charlie attempts to measure and guess states, the resulting disturbance collapses the superposition, generating detectable measurement mismatch errors.
            </p>
          </div>
        </div>

        {/* Impersonation Bounds Card */}
        <div className="glass-card p-6 border-slate-800/40 space-y-4">
          <div className="flex items-center gap-2 border-b border-dark-800 pb-3">
            <Award size={16} className="text-quantum-purple" />
            <h3 className="text-sm font-semibold text-white font-mono uppercase">Security Against Impersonation</h3>
          </div>

          <div className="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
            <p>
              In an impersonation attempt, Mallory attempts to generate a signature pretending to be Alice. Because Alice uses Bell state measurements to teleport states, Bob and Charlie's qubits are highly correlated with Alice's private key state.
            </p>
            <div className="bg-dark-950/60 p-3 border border-dark-800 rounded font-mono text-[11px] text-slate-400">
              <strong>Quantum Teleportation Fidelity:</strong>
              <div className="text-center text-quantum-purple my-2 font-bold select-all">
                {"\\mathcal{F} = \\text{Tr}(\\rho_{Alice} \\rho_{Bob}) \\ge 0.98"}
              </div>
              The teleported fidelity ensures that Bob's stored qubits perfectly match Alice's signature keys. Mallory cannot replicate these correlations without holding Alice's secret BSM calibration outcomes.
            </div>
            <p className="text-slate-400">
              Mallory's forged classical rotation signals will mismatch Alice's actual states, violating the 95% threshold criteria and flagging the verification attempt as blocked.
            </p>
          </div>
        </div>
      </div>

      {/* Physics transparency notes */}
      <div className="glass-card p-6 border-slate-800/40 font-mono text-xs space-y-4">
        <h4 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Info size={14} className="text-quantum-blue" />
          Quantum No-Cloning & Projektive Operators
        </h4>
        <p className="text-slate-400 leading-relaxed">
          The quantum simulation dashboard models the physics of single-particle operators. Since quantum states cannot be copied (No-Cloning Theorem), Bob cannot share his copy of Alice's signature with Charlie. By checking statistical correlations of measurements in random bases, they ensure Alice signed the document, and Bob cannot modify it without Charlie detecting a mismatch. Eavesdropping tampering during the distribution channel is caught immediately via projective measurement deviations.
        </p>
      </div>
    </div>
  );
}
