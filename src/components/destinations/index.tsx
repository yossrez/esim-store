import useCustomSearchParams from "@/lib/hooks/search-params-hook";
import { useDestinationsQuery } from "@/network/api-hooks/query";
import { CountryDestination, RegionDestination } from "@/types";
import Link from "next/link";

const fallback = "populars";
export default function Destinations() {
  const filter = useCustomSearchParams("filter", fallback);

  const { data, isLoading, isError } = useDestinationsQuery(filter);

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-3.5">
      {isLoading && "Loading ..."}
      {isError && "Error!"}
      {data?.data[filter].map((dest) => (
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
    <Link href={`/store/${data.slug}`}>
      <div className="px-4 py-3.5 outline rounded-lg">{data.name}</div>
    </Link>
  );
}
