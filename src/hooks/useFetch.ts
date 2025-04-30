import { useEffect, useState } from "react";

export const useFetch = <T>(fn: () => Promise<T>) => {
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




export const useFetchWithId = <T>(fn: (id: number) => Promise<T>, id: number) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (fetchId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fn(fetchId);
      setData(response);
    } catch (err) {
      const message = (err as Error)?.message || "An error occurred";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [fn, id]);

  const refetch = (newId?: number) => {
    const fetchId = newId || id;
    if (fetchId) {
      fetchData(fetchId);
    }
  };

  return { data, isLoading, error, refetch };
};
