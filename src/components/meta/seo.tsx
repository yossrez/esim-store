import Head from "next/head";

interface SEOProps {
  title: string;
  description?: string;
}

const author = "yossrez";
export default function SEO({ title, description }: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta
        name="description"
        content={description ?? "Best eSIM data plan on the planet!"}
      />
      <meta name="author" content={author} />
    </Head>
  );
}
