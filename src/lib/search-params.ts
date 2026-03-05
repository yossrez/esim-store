import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export default function setSearchParams(
  key: string,
  value: string,
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance,
) {
  const params = new URLSearchParams(searchParams.toString());
  params.set(key, value);
  router.push(`?${params.toString()}`);
}
