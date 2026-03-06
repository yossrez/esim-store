import { ReadonlyURLSearchParams } from "next/navigation";
import { NextRouter } from "next/router";

export function setSearchParams(
  key: string,
  value: string,
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  router: NextRouter,
) {
  const params = new URLSearchParams(searchParams.toString());
  params.set(key, value);
  router.push(`${pathname}?${params.toString()}`, undefined, {
    shallow: true,
    scroll: false,
  });
}

export function getSearchParam(
  window: Window & typeof globalThis,
  key: string,
) {
  return new URL(window.location.href).searchParams.get(key);
}
