import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";
import { useProducts } from "@/network/api-hooks/query";

export default function PageMain() {
  const { data, isLoading, isError } = useProducts();
  console.log(isLoading, data, isError);
  return (
    <BaseLayout title="Home">
      <ContentLayout>
        <div>asdf</div>
      </ContentLayout>
    </BaseLayout>
  );
}
