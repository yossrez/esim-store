import { Button } from "../ui/button";
import { setSearchParams } from "@/lib/search-params";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import useCustomSearchParams from "@/lib/hooks/custom-search-params";
import { TabFilterProps } from "@/types/prop-types";

export default function TabFilter({
  filters,
  paramKey,
  fallback,
  replace,
}: TabFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const active = useCustomSearchParams(paramKey, fallback);

  return (
    <div className="flex gap-3 px-5 bg-secondary py-1.5 rounded-lg">
      {filters.map((v) => {
        const val: string = v.toLowerCase().split(" ").join("-");
        return (
          <Button
            key={val}
            variant="ghost"
            onClick={() => {
              setSearchParams(
                paramKey,
                val,
                pathname,
                searchParams,
                router,
                replace,
              );
            }}
            className={`hover:bg-accent-foreground hover:text-white
                ${active === val ? "bg-accent-foreground text-white" : ""}`}
          >
            {v}
          </Button>
        );
      })}
    </div>
  );
}
