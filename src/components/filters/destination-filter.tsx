import { Button } from "../ui/button";
import { setSearchParams } from "@/lib/search-params";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import useCustomSearchParams from "@/lib/hooks/custom-search-params";

const filters = ["Populars", "Countries", "Regionals"];

export default function DestinationFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = useCustomSearchParams("filter", filters[0].toLowerCase());

  return (
    <div className="flex justify-center mt-9 mb-6">
      <div className="flex gap-3 px-5 bg-secondary py-1.5 rounded-lg">
        {filters.map((v) => {
          const q = v.toLowerCase();
          return (
            <Button
              key={q}
              variant="ghost"
              onClick={() => {
                setSearchParams("filter", q, searchParams, router);
              }}
              className={`hover:bg-accent-foreground hover:text-white
                ${active === q ? "bg-accent-foreground text-white" : ""}`}
            >
              {v}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
