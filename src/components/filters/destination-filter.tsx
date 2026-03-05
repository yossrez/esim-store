import { Button } from "../ui/button";
import { setSearchParams } from "@/lib/search-params";
import useCustomSearchParams from "@/lib/hooks/search-params-hook";

const filters = ["Populars", "Countries", "Regionals"];

export default function DestinationFilter() {
  const filter = useCustomSearchParams("filter");

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
                setSearchParams(window, "filter", q);
              }}
              className={`hover:bg-accent-foreground hover:text-white
                ${filter === q ? "bg-accent-foreground text-white" : ""}`}
            >
              {v}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
