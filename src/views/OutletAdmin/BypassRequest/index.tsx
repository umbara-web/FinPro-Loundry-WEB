"use client";

import { useBypassRequests } from "./_hooks/useBypassRequests";
import RequestList from "./_components/RequestList";
import { Loader2, RefreshCw } from "lucide-react";

export default function BypassRequestView() {
  const { requests, isLoading, isProcessing, handleAction, refresh } = useBypassRequests();

  return (
    <div className="p-8 bg-[#121212] min-h-screen text-white font-sans">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Bypass Requests</h1>
          <p className="text-gray-500 text-sm">
            Review and handle worker bypass requests for mismatched items.
          </p>
        </div>
        <button
          onClick={() => refresh()}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors border border-gray-700"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-teal-500" size={48} />
        </div>
      ) : (
        <RequestList
          requests={requests}
          onAction={handleAction}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
}
