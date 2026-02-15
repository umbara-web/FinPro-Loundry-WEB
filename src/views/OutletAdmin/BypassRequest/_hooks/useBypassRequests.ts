import { useState } from "react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bypassService } from "@/src/services/bypass.service";
import { BypassRequest } from "../_types";

export const useBypassRequests = () => {
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    data: requests = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["bypass-requests"],
    queryFn: async () => {
      const response = await bypassService.getRequests();
      return response.data;
    },
    refetchInterval: 30000,
  });

  const mutation = useMutation({
    mutationFn: ({ requestId, action }: { requestId: string; action: "APPROVE" | "REJECT" }) =>
      bypassService.handleRequest(requestId, action),
    onMutate: () => {
      setIsProcessing(true);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["bypass-requests"] });
    },
    onError: (error) => {
      console.error("Failed to process request", error);
      toast.error("Failed to process request");
    },
    onSettled: () => {
      setIsProcessing(false);
    },
  });

  const handleAction = async (requestId: string, action: "APPROVE" | "REJECT") => {
    mutation.mutate({ requestId, action });
  };

  return {
    requests,
    isLoading,
    isProcessing,
    refresh: refetch,
    handleAction,
  };
};
