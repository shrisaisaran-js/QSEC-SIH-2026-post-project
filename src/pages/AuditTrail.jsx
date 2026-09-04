import React from 'react';
import VerificationTable from '../components/VerificationTable';
import ProtocolHealth from '../components/ProtocolHealth';
import AuditEventTable from '../components/AuditEventTable';

export default function AuditTrail() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="glass-card p-6 border-slate-800/40 relative">
        <h2 className="text-lg font-semibold text-glow-blue text-white">
          Cryptographic Audit Trail
        </h2>

        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          The QDS audit log records all verification events. All entries are
          hashed and timestamped based on simulated local measurements. If a
          single bit in the key signature or message hash is altered, basis
          measurement consistency is violated and flagged in the protocol
          health console.
        </p>
      </div>

      {/* Backend Audit Events */}
      <AuditEventTable />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification history table */}
        <div className="lg:col-span-2">
          <VerificationTable />
        </div>

        {/* Protocol Health check list */}
        <div className="lg:col-span-1">
          <ProtocolHealth />
        </div>
      </div>
    </div>
  );
}