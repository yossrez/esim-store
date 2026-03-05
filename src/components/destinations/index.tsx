// "use client";

import { useDestinationsQuery } from "@/network/api-hooks/query";
import { useSearchParams } from "next/navigation";
import DestinationFilter from "../filters/destination-filter";

export default function Destinations() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const { data, isLoading, isError } = useDestinationsQuery(filter);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <div>
      <DestinationFilter />
      {data?.data[filter ?? "populars"].map((dest) => (
        <div key={dest.id}>{dest.name}</div>
      ))}
    </div>
  );
}

// function DestinationLink(props: CountryDestination): ReactNode {
//   return <div>asdf</div>;
// }
