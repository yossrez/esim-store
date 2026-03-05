export function setSearchParams(
  window: Window & typeof globalThis,
  key: string,
  value: string,
) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState(null, "", url.toString());
}

export function getSearchParam(
  window: Window & typeof globalThis,
  key: string,
) {
  return new URL(window.location.href).searchParams.get(key);
}
