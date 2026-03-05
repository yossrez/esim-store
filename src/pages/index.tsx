import { Button } from "@/components/ui/button";
import Image from "next/image";
import vn from "@/assets/images/flags/vn.webp";
import { useEffect, useState } from "react";
import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";

export default function PageMain() {
  const [data, setData] = useState();
  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/products");
      const json = await res.json();
      setData(json);
    }

    loadData();
  }, []);
  console.log(data);
  return (
    <BaseLayout title="Home">
      <ContentLayout>
        <div>asdf</div>
        <Image alt="vn" src={vn} width={vn.width} priority={false} />
        <Button onClick={() => console.log("shadcn")}>Click me</Button>
      </ContentLayout>
    </BaseLayout>
  );
}
