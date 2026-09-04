import React, { useState } from 'react';
import { api } from '../api';
import { 
  Fingerprint, 
  Send, 
  ShieldCheck, 
  Terminal, 
  Play,
  FileCheck,
  AlertTriangle,
  XCircle,
  Code
} from 'lucide-react';
import { useQds } from '../context/QdsContext';

export default function LiveSignature() {
  // Input State
  const [sender, setSender] = useState('Organization A');
  const [receiver, setReceiver] = useState('Organization B');
  const [message, setMessage] = useState('Transfer authorization request #QSEC-001');

  // Signature Result State
  const [isSigning, setIsSigning] = useState(false);
  const [signatureResult, setSignatureResult] = useState(null);

  // Verification State
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  
  // To allow updating the context state with the latest verification history
  const { refreshDashboardStats } = useQds();

  const handleSign = async () => {
    try {
      setIsSigning(true);
      setVerificationResult(null); // Reset verification on new sign
      const res = await api.liveSign({ sender, receiver, message });
      if (res.success) {
        setSignatureResult(res.data);
      }
    } catch (err) {
      console.error("Live sign failed:", err);
      alert("Failed to generate signature: " + err.message);
    } finally {
      setIsSigning(false);
    }
  };

  const handleVerify = async () => {
    if (!signatureResult) return;
    
    try {
      setIsVerifying(true);
      const res = await api.liveVerify({ signatureId: signatureResult.signatureId });
      if (res.success) {
        setVerificationResult(res.data);
        await refreshDashboardStats(); // Refresh stats for dashboard
      }
    } catch (err) {
      console.error("Live verify failed:", err);
      alert("Failed to verify signature: " + err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-dark-800 pb-4">
        <div className="p-2.5 rounded-lg bg-quantum-blue/10 text-quantum-blue border border-quantum-blue/20">
          <Fingerprint size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">Live Signature Engine</h2>
          <p className="text-sm text-slate-400 mt-1">Generate and verify real Ed25519 signatures wrapped in QDS protocol sessions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Input Form & Signing */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-slate-800/40">
            <div className="flex items-center gap-2 mb-4">
              <Send size={16} className="text-quantum-blue" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Payload Configuration</h3>
            </div>
            
            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-slate-500 font-bold uppercase tracking-wider block mb-1">Sender Identity</label>
                <input 
                  type="text" 
                  className="w-full bg-dark-950/60 border border-slate-800 text-white p-2.5 rounded focus:outline-none focus:border-quantum-blue transition-colors"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-slate-500 font-bold uppercase tracking-wider block mb-1">Receiver Identity</label>
                <input 
                  type="text" 
                  className="w-full bg-dark-950/60 border border-slate-800 text-white p-2.5 rounded focus:outline-none focus:border-quantum-blue transition-colors"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-slate-500 font-bold uppercase tracking-wider block mb-1">Message Content</label>
                <textarea 
                  className="w-full bg-dark-950/60 border border-slate-800 text-white p-2.5 rounded focus:outline-none focus:border-quantum-blue transition-colors h-24 resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              <button 
                onClick={handleSign}
                disabled={isSigning || !sender || !receiver || !message}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-quantum-blue to-quantum-blue/80 hover:from-quantum-blue hover:to-quantum-blue text-dark-950 font-bold rounded shadow-glow-blue transition-all cursor-pointer font-mono text-xs uppercase disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isSigning ? (
                  <span className="animate-pulse">Generating Cryptographic Signature...</span>
                ) : (
                  <>
                    <Fingerprint size={14} /> Generate Real Signature
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Verification Trigger Panel */}
          {signatureResult && (
             <div className="glass-card p-6 border-slate-800/40">
               <div className="flex items-center gap-2 mb-4">
                 <ShieldCheck size={16} className="text-quantum-blue" />
                 <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Verification Pipeline</h3>
               </div>
               <p className="text-xs text-slate-400 font-mono mb-4">
                 Submits the signature to the backend QDS verification engine. This will consume the session nonce and run the statistical analysis.
               </p>
               <button 
                 onClick={handleVerify}
                 disabled={isVerifying}
                 className="w-full flex items-center justify-center gap-2 py-3 bg-dark-800 hover:bg-dark-700 text-white border border-slate-700 font-bold rounded transition-all cursor-pointer font-mono text-xs uppercase disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {isVerifying ? (
                   <span className="animate-pulse flex items-center gap-2"><Play size={14} /> Processing Pipeline...</span>
                 ) : (
                   <>
                     <Play size={14} /> Execute Verification
                   </>
                 )}
               </button>
             </div>
          )}
        </div>

        {/* Right Column: Results */}
        <div className="space-y-6">
          
          {/* Signature Result */}
          <div className="glass-card p-6 border-slate-800/40 min-h-[300px]">
             <div className="flex items-center justify-between border-b border-dark-800 pb-3 mb-4">
               <div className="flex items-center gap-2">
                 <Terminal size={16} className="text-emerald-400" />
                 <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Generated Payload</h3>
               </div>
               {signatureResult && (
                 <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/20 text-emerald-400">
                   READY
                 </span>
               )}
             </div>
             
             {!signatureResult ? (
               <div className="h-full flex flex-col items-center justify-center text-slate-600 font-mono text-sm py-12">
                 <Code size={32} className="mb-4 opacity-30" />
                 Awaiting signature generation...
               </div>
             ) : (
               <div className="space-y-4 font-mono text-xs">
                 <div className="bg-dark-950 p-3 rounded border border-dark-800 overflow-hidden break-words">
                   <div className="text-slate-500 mb-1">Signature ID</div>
                   <div className="text-quantum-blue">{signatureResult.signatureId}</div>
                 </div>
                 
                 <div className="bg-dark-950 p-3 rounded border border-dark-800 overflow-hidden break-words">
                   <div className="text-slate-500 mb-1">Session ID</div>
                   <div className="text-white">{signatureResult.sessionId}</div>
                 </div>
                 
                 <div className="bg-dark-950 p-3 rounded border border-dark-800 overflow-hidden break-words">
                   <div className="text-slate-500 mb-1">Message SHA-256 Hash</div>
                   <div className="text-emerald-400">{signatureResult.messageHash}</div>
                 </div>
                 
                 <div className="bg-dark-950 p-3 rounded border border-dark-800 overflow-hidden break-words">
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-slate-500">Ed25519 Signature</span>
                     <span className="text-[9px] text-slate-600">Base64</span>
                   </div>
                   <div className="text-slate-300 leading-relaxed text-[10px]">
                     {signatureResult.signature}
                   </div>
                 </div>
                 
                 <div className="bg-dark-950 p-3 rounded border border-dark-800 overflow-hidden break-words">
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-slate-500">Public Key</span>
                     <span className="text-[9px] text-slate-600">PEM</span>
                   </div>
                   <div className="text-slate-300 leading-relaxed text-[10px] max-h-24 overflow-y-auto whitespace-pre-wrap">
                     {signatureResult.publicKey}
                   </div>
                 </div>
               </div>
             )}
          </div>
          
          {/* Verification Result */}
          {verificationResult && (
            <div className={`glass-card p-6 border-slate-800/40 relative overflow-hidden ${
              verificationResult.decision === 'ACCEPT' 
                ? 'shadow-glow-green border-emerald-500/30' 
                : 'shadow-glow-red border-red-500/30'
            }`}>
              <div className="flex items-center gap-2 border-b border-dark-800 pb-3 mb-4">
                 <FileCheck size={16} className={verificationResult.decision === 'ACCEPT' ? 'text-emerald-400' : 'text-red-400'} />
                 <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Verification Output</h3>
              </div>
              
              <div className="space-y-3 font-mono text-xs">
                 <div className="flex justify-between items-center p-2 rounded bg-dark-950 border border-dark-800">
                   <span className="text-slate-400">Cryptographic Signature</span>
                   <span className={`font-bold ${verificationResult.cryptoValid ? 'text-emerald-400' : 'text-red-400'}`}>
                     {verificationResult.cryptoValid ? 'VALID' : 'INVALID'}
                   </span>
                 </div>
                 
                 <div className="flex justify-between items-center p-2 rounded bg-dark-950 border border-dark-800">
                   <span className="text-slate-400">Session Nonce state</span>
                   <span className={`font-bold ${verificationResult.sessionValid ? 'text-emerald-400' : 'text-red-400'}`}>
                     {verificationResult.sessionValid ? 'CONSUMED' : (verificationResult.nonceValid ? 'REUSED' : 'INVALID')}
                   </span>
                 </div>
                 
                 <div className="flex justify-between items-center p-2 rounded bg-dark-950 border border-dark-800">
                   <span className="text-slate-400">QDS Match Check</span>
                   <span className={`font-bold ${verificationResult.qdsAnalysis === 'PASS' ? 'text-emerald-400' : 'text-amber-400'}`}>
                     {verificationResult.qdsAnalysis}
                   </span>
                 </div>
                 
                 <div className="flex justify-between items-center p-2 rounded bg-dark-950 border border-dark-800">
                   <span className="text-slate-400">Threat Level</span>
                   <span className={`font-bold ${
                     verificationResult.threatLevel === 'LOW' ? 'text-emerald-400' : 
                     verificationResult.threatLevel === 'WARNING' ? 'text-amber-400' : 'text-red-400'
                   }`}>
                     {verificationResult.threatLevel}
                   </span>
                 </div>
                 
                 <div className="mt-4 pt-4 border-t border-dark-800 flex flex-col items-center">
                   {verificationResult.decision === 'ACCEPT' ? (
                     <>
                       <CheckCircle2 size={32} className="text-emerald-400 mb-2" />
                       <div className="text-lg font-bold text-glow-green text-emerald-400 tracking-widest">SIGNATURE ACCEPTED</div>
                     </>
                   ) : verificationResult.decision === 'BLOCKED' ? (
                     <>
                       <AlertTriangle size={32} className="text-amber-400 mb-2" />
                       <div className="text-lg font-bold text-amber-400 tracking-widest">SIGNATURE BLOCKED</div>
                     </>
                   ) : (
                     <>
                       <XCircle size={32} className="text-red-400 mb-2" />
                       <div className="text-lg font-bold text-red-400 tracking-widest">SIGNATURE REJECTED</div>
                     </>
                   )}
                 </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

// Helper component for rendering missing icons
const CheckCircle2 = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9 12l2 2 4-4"></path>
  </svg>
);
