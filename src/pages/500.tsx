import BaseLayout from "@/components/layout/base-layout";

export default function Page500() {
  return (
    <BaseLayout title="Something went wrong...">
      <div>
        <h1>500 - Server-side error occurred</h1>
      </div>
    </BaseLayout>
  );
}
