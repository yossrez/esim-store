import { destinationTab } from "@/lib/const/destination-filter";
import useCustomSearchParams from "@/lib/hooks/custom-search-params";
import { useDestinationsQuery } from "@/network/api-hooks/query";
import { CountryDestination, RegionDestination } from "@/types";
import Link from "next/link";

export default function Destinations() {
  const filter = useCustomSearchParams(
    destinationTab.paramKey,
    destinationTab.fallback,
  );

  const { data, isLoading, isError } = useDestinationsQuery(filter);

  // useEffect(() => {
  //   if (isError && (error as HTTPError).response.status === 404) {
  //     router.replace("/not-found");
  //   }
  // }, [isError, error, router]);

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-3.5">
      {isLoading && "Loading ..."}
      {isError && "Error!"}
      {data?.data[filter]?.map((dest) => (
        <DestinationLink key={dest.id} data={dest} />
      ))}
    </div>
  );
}

function DestinationLink({
  data,
}: {
  data: CountryDestination | RegionDestination;
}) {
  return (
    <Link
      href={`/store/${data.scale === "regional" ? "region-" + data.slug : data.slug}`}
    >
      <div className="px-4 py-3.5 outline rounded-lg">{data.name}</div>
    </Link>
  );
}
