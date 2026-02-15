import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { bypassService } from "@/src/services/bypass.service";
import { BypassRequest } from "../_types";

export const useBypassRequests = () => {
  const [requests, setRequests] = useState<BypassRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await bypassService.getRequests();
      setRequests(data.data);
    } catch (error) {
      console.error("Failed to fetch bypass requests", error);
      toast.error("Failed to fetch requests");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAction = async (requestId: string, action: "APPROVE" | "REJECT") => {
    try {
      setIsProcessing(true);
      const res = await bypassService.handleRequest(requestId, action);
      toast.success(res.message);
      // Remove handled request from list locally
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
      // Optionally refresh list
      // await fetchRequests();
    } catch (error) {
      console.error(`Failed to ${action} request`, error);
      toast.error(`Failed to process request`);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    isLoading,
    isProcessing,
    refresh: fetchRequests,
    handleAction,
  };
};
