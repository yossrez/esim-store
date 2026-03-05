import { useEffect, useState } from "react";
import { getSearchParam } from "../search-params";

export default function useCustomSearchParams(key: string): string | null {
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    if (filter === null) setFilter(getSearchParam(window, key));

    const onLocationChange = () => {
      setFilter(getSearchParam(window, key));
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
  }, [key]);

  return filter;
}
