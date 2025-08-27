import API from "@/utils/api";
import { showToast } from "@/utils/toast";
import { useState } from "react";

export const useRequest = () => {
    const [loading, setLoading] = useState(false);
  
    const request = async ({
      method = 'GET',
      url,
      data = null,
      params = null,
      showErrorToast = true,
      onSuccess = undefined,
      onError = undefined,
    }: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      url: string;
      data?: any;
      params?: any;
      showErrorToast?: boolean;
      onSuccess?: ((data: any) => void) | undefined;
      onError?: (err: any) => void;
    }) => {
      try {
        setLoading(true);

        const config: any = {
            method,
            url,
        }

        if (method === 'GET') {
            config.params = params;
        } else {
            config.data = data;
        }
        
        const res = await API.request(config);

        setLoading(false);
  
        if (onSuccess) onSuccess(res.data);
        return res.data;
      } catch (err: any) {
        setLoading(false);
        const msg = err?.response?.data?.error || err.error || err.message || 'Something went wrong';
        if (showErrorToast) showToast('error', msg);
        if (onError) onError(err);
        throw err;
      }
    };
  
    return { request, loading };
  };
  