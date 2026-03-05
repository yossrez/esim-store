import { useRouter } from "next/router";

export default function PageDataPlan() {
  const router = useRouter();
  return <div>{router.query.id}</div>;
}
