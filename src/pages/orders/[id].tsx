import { useRouter } from "next/router";

export default function PageOrderDetails() {
  const router = useRouter();
  return <div>{router.query.id}</div>;
}
