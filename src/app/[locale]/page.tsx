import { CTA } from "@/components/sections/cta";
import { DemoVideo } from "@/components/sections/demo-video";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Link } from "@/i18n/routing";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <main>
      <div>
        <h1>{t("title")}</h1>
        <Link href="/about">{t("about")}</Link>
      </div>
      <Header />
      <Hero />
      <Features />
      <DemoVideo />
      <Pricing />
      {/* <Testimonials />
      <Statistics /> */}
      <CTA />
      <Footer />
    </main>
  );
}
