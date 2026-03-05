import useCustomSearchParams from "@/lib/hooks/search-params-hook";
import { useDestinationsQuery } from "@/network/api-hooks/query";

export default function Destinations() {
  const filter = useCustomSearchParams("filter");

  const { data, isLoading, isError } = useDestinationsQuery(filter);

  return (
    <div>
      {isLoading && "Loading ..."}
      {isError && "Error!"}
      {data?.data[filter ?? "populars"].map((dest) => (
        <div key={dest.id}>{dest.name}</div>
      ))}
    </div>
  );
}

// function DestinationLink(props: CountryDestination): ReactNode {
//   return <div>asdf</div>;
// }
