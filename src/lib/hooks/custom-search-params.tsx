import { useEffect, useState } from "react";
import { getSearchParam } from "../search-params";

export default function useCustomSearchParams(
  key: string,
  fallback: string,
): string {
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    setFilter(getSearchParam(window, key) ?? fallback);

    const onLocationChange = () => {
      const param = getSearchParam(window, key);
      setFilter(param === null ? fallback : param);
    };

    const pushState = history.pushState;
    const replaceState = history.replaceState;

    history.pushState = function (...args) {
      pushState.apply(this, args);
      window.dispatchEvent(new Event("locationchange"));
    };

    history.replaceState = function (...args) {
      replaceState.apply(this, args);
      window.dispatchEvent(new Event("locationchange"));
    };

    window.addEventListener("popstate", () => {
      window.dispatchEvent(new Event("locationchange"));
    });

    window.addEventListener("locationchange", onLocationChange);

    return () => {
      window.removeEventListener("locationchange", onLocationChange);
    };
  }, [key, fallback]);

  return filter as string;
}
