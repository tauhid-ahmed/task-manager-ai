import { useState, useCallback } from "react";

type FetchStatus = "idle" | "isLoading" | "isSuccess" | "error";
type MutationData = Record<string, string>;

type FetchResponse<T> = {
  status: FetchStatus;
  data: T | null;
  error: Error | null;
  mutation: (url: string, payload: MutationData) => Promise<void>;
};

export const useFetch = <T>(): FetchResponse<T> => {
  const [response, setResponse] = useState<Omit<FetchResponse<T>, "mutation">>({
    status: "idle",
    data: null,
    error: null,
  });

  const mutation = useCallback(
    async (url: string, payload: Record<string, string>) => {
      try {
        setResponse((prev) => ({ ...prev, status: "isLoading" }));
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json = (await res.json()) as T;
        setResponse((prev) => ({ ...prev, status: "isSuccess", data: json }));
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Something went wrong");
        setResponse((prev) => ({ ...prev, status: "error", error }));
      } finally {
        setResponse((prev) => ({ ...prev, status: "idle" }));
      }
    },
    []
  );

  return {
    status: response.status,
    data: response.data,
    error: response.error,
    mutation,
  };
};
