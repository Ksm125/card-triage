import { useEffect, useState } from "react";

/**
 * Small hook wrapper over Fetch Api
 */
export const useFetchQuery = <T = unknown>(url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    const runQuery = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (error) {
        setData(null);
        setError(error);
      }

      setIsLoading(false);
    };

    runQuery();
  }, [url, setIsLoading, setData, setError]);

  return { isLoading, data, error };
};
