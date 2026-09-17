import { useEffect, useState } from "react";

export function handelFatch<T>(
  url: string,
  method: string,
  userInfo: any | null,
) {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const strifi = userInfo ? JSON.stringify(userInfo) : null;

  useEffect(() => {
    if (!url) return;

    const options: RequestInit = {
      method: method,
      headers: { "Content-Type": "application/json" },
    };

    if (strifi && method !== "GET") {
      options.body = strifi;
    }
    async function doFatch() {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const respons = await fetch(url, options);

        if (!respons.ok) {
          throw new Error("interal server error" + respons.status);
        }

        const result = (await respons.json()) as T;
        setData(result);
      } catch (err: any) {
        setError(err.message || "error!!!");
      } finally {
        setLoading(false);
      }
    }
    doFatch();
  }, [url, method, strifi]);

  return { data, loading, error };
}
