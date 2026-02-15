import { api } from "@/src/lib/api/axios-instance";
import { BypassRequestResponse, BypassActionResponse } from "../views/OutletAdmin/BypassRequest/_types";

export const bypassService = {
  getRequests: async (): Promise<BypassRequestResponse> => {
    const response = await api.get<BypassRequestResponse>("/outlet-admin/bypass-requests");
    return response.data;
  },

  handleRequest: async (
    requestId: string,
    action: "APPROVE" | "REJECT"
  ): Promise<BypassActionResponse> => {
    const response = await api.patch<BypassActionResponse>(
      `/outlet-admin/bypass-requests/${requestId}`,
      { action }
    );
    return response.data;
  },
};
