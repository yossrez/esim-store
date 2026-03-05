import { useRouter } from "next/router";

export default function PageCartDetails() {
  const router = useRouter();
  return <div>{router.query.plan}</div>;
}
