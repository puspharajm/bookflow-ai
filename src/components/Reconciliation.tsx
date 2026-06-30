import { useState } from "react";
import { motion } from "motion/react";
import { DollarSign, CheckCircle2, AlertCircle, RefreshCw, FileText, ArrowRightLeft } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "matched" | "unmatched" | "pending";
  source: "stripe" | "internal";
}

const mockTransactions: Transaction[] = [
  { id: "tx_1", date: "Jun 30, 2026", description: "Payout to bank ending in 4242", amount: 450.00, status: "matched", source: "stripe" },
  { id: "tx_2", date: "Jun 30, 2026", description: "Internal Revenue Ledger (3 Bookings)", amount: 450.00, status: "matched", source: "internal" },
  
  { id: "tx_3", date: "Jun 29, 2026", description: "Payout to bank ending in 4242", amount: 120.00, status: "unmatched", source: "stripe" },
  { id: "tx_4", date: "Jun 29, 2026", description: "Internal Revenue Ledger (1 Booking)", amount: 150.00, status: "unmatched", source: "internal" },
  
  { id: "tx_5", date: "Jun 28, 2026", description: "Payout processing", amount: 800.00, status: "pending", source: "stripe" },
];

export default function Reconciliation() {
  const [activeTab, setActiveTab] = useState<"all" | "unmatched">("all");

  const filteredTx = activeTab === "all" ? mockTransactions : mockTransactions.filter(t => t.status === "unmatched");

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'matched': return <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Matched</span>;
      case 'unmatched': return <span className="px-2 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold uppercase flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Discrepancy</span>;
      default: return <span className="px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase flex items-center gap-1"><RefreshCw className="w-3 h-3 animate-spin-slow"/> Pending</span>;
    }
  };

  return (
    <div className="h-full flex flex-col relative max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Reconciliation</h1>
          <p className="text-gray-400">Match Stripe payouts against your internal booking revenue ledger.</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-2.5 rounded-full transition-all border border-white/10 flex items-center gap-2 shadow-lg">
          <RefreshCw className="w-4 h-4" /> Sync with Stripe
        </button>
      </div>

      <div className="flex gap-4 mb-6 border-b border-white/10 pb-px">
        <button 
          onClick={() => setActiveTab("all")}
          className={`pb-3 px-1 text-sm font-bold transition-colors relative ${activeTab === 'all' ? 'text-[#FF4F00]' : 'text-gray-500 hover:text-gray-300'}`}
        >
          All Transactions
          {activeTab === 'all' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF4F00] shadow-[0_0_8px_rgba(255,79,0,0.8)]" />}
        </button>
        <button 
          onClick={() => setActiveTab("unmatched")}
          className={`pb-3 px-1 text-sm font-bold transition-colors relative ${activeTab === 'unmatched' ? 'text-red-400' : 'text-gray-500 hover:text-gray-300'}`}
        >
          Requires Attention (1)
          {activeTab === 'unmatched' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hidden-scrollbar pb-10">
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 bg-black/40 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="col-span-2">Date</div>
            <div className="col-span-5">Description</div>
            <div className="col-span-2">Source</div>
            <div className="col-span-2 text-right">Amount</div>
            <div className="col-span-1 text-right">Status</div>
          </div>

          <div className="divide-y divide-white/5">
            {filteredTx.map((tx, idx) => (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                key={tx.id} 
                className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors ${tx.status === 'unmatched' ? 'bg-red-500/[0.02]' : ''}`}
              >
                <div className="col-span-2 text-sm text-gray-400">{tx.date}</div>
                <div className="col-span-5 text-sm font-medium text-white flex items-center gap-2">
                  {tx.status === 'unmatched' && <AlertCircle className="w-4 h-4 text-red-400" />}
                  {tx.description}
                </div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${tx.source === 'stripe' ? 'bg-[#635BFF]/20 text-[#635BFF]' : 'bg-gray-500/20 text-gray-400'}`}>
                    {tx.source.toUpperCase()}
                  </span>
                </div>
                <div className="col-span-2 text-right font-mono text-sm font-bold text-white">
                  ${tx.amount.toFixed(2)}
                </div>
                <div className="col-span-1 flex justify-end">
                  {getStatusBadge(tx.status)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {activeTab === "unmatched" && (
          <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-red-400 font-bold mb-2">Discrepancy Detected (Jun 29)</h3>
              <p className="text-gray-300 text-sm mb-4">
                The payout received from Stripe ($120.00) does not match the expected internal revenue for that day ($150.00). This is usually due to refunds or disputes processed directly in Stripe.
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 font-medium rounded-lg text-sm transition-colors border border-red-500/30">
                  Review in Stripe
                </button>
                <button className="px-4 py-2 bg-white/5 text-gray-300 hover:bg-white/10 font-medium rounded-lg text-sm transition-colors border border-white/10">
                  Force Match
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
