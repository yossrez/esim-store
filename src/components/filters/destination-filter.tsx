import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import setSearchParams from "@/lib/search-params";

const filters = ["populars", "countries", "regionals"];
export default function DestinationFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div>
      {filters.map((v) => (
        <Button
          key={v}
          onClick={() => setSearchParams("filter", v, searchParams, router)}
        >
          {v}
        </Button>
      ))}
    </div>
  );
}
