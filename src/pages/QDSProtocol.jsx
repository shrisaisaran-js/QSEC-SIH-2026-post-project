import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Binary, Radio, Cpu, RefreshCw, Layers } from 'lucide-react';

export default function QDSProtocol() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. State Preparation (Alice)",
      formula: "|\\psi\\rangle_{Alice} = \\alpha|0\\rangle + \\beta|1\\rangle \\quad \\text{or} \\quad \\frac{1}{\\sqrt{2}}(|0\\rangle \\pm |1\\rangle)",
      details: "Alice prepares two sets of secret keys: $K_0$ and $K_1$. She encodes these keys into a sequence of single-qubit states chosen randomly from the Pauli eigenstates $\{X, Y, Z\}$. These states are kept secure in Alice's quantum transmitter system.",
      explanation: "By selecting randomly from orthogonal and non-orthogonal eigenstates, Alice ensures that any eavesdropper attempting to copy or measure the states will introduce detectable errors, enforcing the No-Cloning Theorem."
    },
    {
      title: "2. Bell Entanglement Sharing",
      formula: "|\\Phi^+\\rangle_{BC} = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)",
      details: "The Quantum Channel Provider creates a sequence of Bell pairs (highly entangled states) and distributes one qubit of each pair to Bob, and the other qubit to Charlie. This serves as the secure quantum backbone channel.",
      explanation: "Bob and Charlie do not measure these qubits immediately. The entanglement between Bob's and Charlie's receivers allows Alice to teleport her key states to both receivers simultaneously without direct physical transport of the signature states."
    },
    {
      title: "3. Quantum Teleportation",
      formula: "M_{Bell} \\in \\{|\\Phi^+\\rangle, |\\Phi^-\\rangle, |\\Psi^+\\rangle, |\\Psi^-\\rangle\\}",
      details: "Alice performs joint Bell State Measurements (BSM) on her signature qubits and her shared entanglement qubit. This measurement projects Bob and Charlie's qubits into a corresponding transformed state, effectively teleporting the signature.",
      explanation: "Since the measurement collapses Alice's original state, the signature is transmitted securely. Alice holds the outcome of her joint measurement, which determines how Bob's and Charlie's states have been transformed."
    },
    {
      title: "4. Pauli Correction Parity",
      formula: "|\psi_{Bob}\rangle = \sigma_x^a \sigma_z^b |\psi_{Alice}\rangle \\quad (a, b \\in \\{0, 1\\})",
      details: "Alice transmits the BSM outcomes to Bob and Charlie using classical fiber lines. Using these outcomes, Bob and Charlie execute the required Pauli matrices rotations (Identity, X, Y, or Z) on their qubits to reconstruct Alice's original states.",
      explanation: "This step requires feedforward control. Without Alice's classical outcomes, Bob and Charlie cannot reconstruct the signature state, preventing unauthorized verification if Alice does not release the decryption data."
    },
    {
      title: "5. Projective Verification",
      formula: "P_i = |i\\rangle\\langle i| \\quad \\implies \\quad P_{Accept} \\ge 0.95",
      details: "To sign a message $M$, Alice releases her key choices. Bob and Charlie perform projective measurements on their stored qubits using the corresponding bases. They compare results. If matching rate matches the 95% threshold, it is ACCEPTED.",
      explanation: "The statistical consistency of the measurements confirms Alice's identity and guarantees that the signature has not been forged, replayed, or altered during the teleportation transmission."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="glass-card p-6 border-slate-800/40 relative">
        <h2 className="text-lg font-semibold text-glow-blue text-white">Teleportation-Based QDS Protocol Analysis</h2>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          In teleportation-based Quantum Digital Signatures (QDS), signature states are distributed via quantum teleportation rather than direct physical fiber channels. This prevents eavesdropping tampering during key distribution and ensures information-theoretic security.
        </p>
      </div>

      {/* Interactive Walkthrough */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step List */}
        <div className="lg:col-span-1 space-y-2">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2 px-1">
            Protocol Stages
          </span>
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`w-full text-left p-4 rounded border text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                activeStep === idx
                  ? 'bg-gradient-to-r from-quantum-blue/15 to-transparent border-quantum-blue/40 text-white shadow-glow-blue'
                  : 'bg-dark-900/40 border-slate-800/40 text-slate-400 hover:bg-dark-800/20'
              }`}
            >
              <span>{step.title}</span>
              <span className="text-[10px] text-slate-600">STAGE 0{idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Detailed Explanation */}
        <div className="lg:col-span-2 glass-card p-6 border-slate-800/40 min-h-[300px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div>
                <span className="text-[10px] font-mono text-quantum-blue font-bold tracking-widest uppercase">
                  ACTIVE PROTOCOL NODE SUMMARY
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {steps[activeStep].title}
                </h3>
              </div>

              {/* Mathematical Equation Representation */}
              <div className="bg-dark-950/80 p-4 rounded border border-dark-800 font-mono text-xs text-center text-quantum-blue overflow-x-auto select-all">
                <code>{steps[activeStep].formula}</code>
              </div>

              <div className="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
                <p>{steps[activeStep].details}</p>
                <div className="bg-dark-900/50 p-3.5 rounded border border-slate-800/40 text-slate-400">
                  <strong className="text-white block mb-1">Security Significance:</strong>
                  {steps[activeStep].explanation}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 pt-4 border-t border-dark-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Current view: Step {activeStep + 1} of 5</span>
            <button
              onClick={() => setActiveStep((activeStep + 1) % steps.length)}
              className="px-3 py-1 bg-dark-850 hover:bg-dark-800 border border-dark-800 text-slate-300 hover:text-white rounded cursor-pointer transition-colors"
            >
              Next Stage
            </button>
          </div>
        </div>
      </div>

      {/* Physics transparency box */}
      <div className="glass-card p-5 border-slate-800/40 font-mono text-xs space-y-2">
        <h4 className="font-bold text-white uppercase tracking-wider">Simulation Specifications</h4>
        <p className="text-slate-400 leading-relaxed">
          The quantum simulation framework executes standard single-particle projective operators. It evaluates density matrix representations and checks matching rates under simulated thermal, quantum-channel and detector dark-count noises. Eavesdropper interventions (intercept-resend or entangling attacks) are simulated by introducing corresponding quantum state transformations, inducing verifiable errors in measurement outcomes.
        </p>
      </div>
    </div>
  );
}
