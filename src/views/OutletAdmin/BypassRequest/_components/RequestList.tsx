import { BypassRequest } from "../_types";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface RequestListProps {
  requests: BypassRequest[];
  onAction: (requestId: string, action: "APPROVE" | "REJECT") => void;
  isProcessing: boolean;
}

export default function RequestList({ requests, onAction, isProcessing }: RequestListProps) {
  if (requests.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No pending bypass requests.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {requests.map((req) => (
        <div
          key={req.id}
          className="bg-[#1E1E1E] border border-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                {req.workerAvatar ? (
                  <img src={req.workerAvatar} alt={req.workerName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    {req.workerName.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-white">{req.workerName}</h3>
                <p className="text-xs text-gray-400">Station: {req.station}</p>
              </div>
            </div>
            <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-1 rounded border border-yellow-500/20">
              Pending
            </span>
          </div>

          <div className="mb-4 bg-[#121212] p-3 rounded-lg border border-gray-800">
            <div className="flex items-start gap-2 mb-2">
              <AlertTriangle size={16} className="text-amber-500 mt-0.5" />
              <p className="text-sm text-gray-300 italic">"{req.reason}"</p>
            </div>

            <div className="mt-3 space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase">Item Logic Check</p>
              {req.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm border-b border-gray-800 pb-1 last:border-0 last:pb-0">
                  <span className="text-gray-300">{item.name}</span>
                  <div className="flex gap-3 text-xs">
                    <span className="text-gray-500">Exp: {item.expectedQty}</span>
                    <span className={item.qty !== item.expectedQty ? "text-red-400 font-bold" : "text-green-400"}>
                      Act: {item.qty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-auto">
            <button
              onClick={() => onAction(req.id, "REJECT")}
              disabled={isProcessing}
              className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 py-2 rounded-lg transition-colors text-sm font-medium border border-red-500/20"
            >
              <XCircle size={16} /> Reject
            </button>
            <button
              onClick={() => onAction(req.id, "APPROVE")}
              disabled={isProcessing}
              className="flex-1 flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 py-2 rounded-lg transition-colors text-sm font-medium border border-green-500/20"
            >
              <CheckCircle size={16} /> Approve
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
