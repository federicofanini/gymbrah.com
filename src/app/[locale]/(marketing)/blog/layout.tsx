import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import languineConfig from "../../../../../languine.json";

interface MarketingLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts and articles.",
};

// Validate that the incoming `locale` parameter is valid
export function generateStaticParams() {
  return [...languineConfig.locale.targets, languineConfig.locale.source].map(
    (locale) => ({ locale })
  );
}

export default async function Layout({
  children,
  params,
}: MarketingLayoutProps) {
  const { locale } = await params;

  if (
    ![...languineConfig.locale.targets, languineConfig.locale.source].includes(
      locale
    )
  ) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
