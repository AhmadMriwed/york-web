import { useEffect, useState } from "react";

const useFetch = <T>(fn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fn();
      setData(response);
    } catch (err) {
      const message = (err as Error)?.message || "An error occurred";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fn]);

  const refetch = () => fetchData();

  return { data, isLoading, error, refetch };
};

export default useFetch;