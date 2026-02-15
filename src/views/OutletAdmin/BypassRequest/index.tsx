"use client";

import { useBypassRequests } from "./_hooks/useBypassRequests";
import RequestList from "./_components/RequestList";
import { Loader2 } from "lucide-react";

export default function BypassRequestView() {
  const { requests, isLoading, isProcessing, handleAction } = useBypassRequests();

  return (
    <div className="p-8 bg-[#121212] min-h-screen text-white font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Bypass Requests</h1>
        <p className="text-gray-500 text-sm">
          Review and handle worker bypass requests for mismatched items.
        </p>
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
