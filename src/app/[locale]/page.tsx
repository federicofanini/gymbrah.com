import { getUserCount } from "@/actions/user/user-count";
import { CTA } from "@/components/sections/cta";
import { DemoVideo } from "@/components/sections/demo-video";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import languineConfig from "languine.json";

// Add this to validate locales
export function generateStaticParams() {
  return [...languineConfig.locale.targets, languineConfig.locale.source].map(
    (locale) => ({ locale })
  );
}

export default async function Home() {
  const response = await getUserCount();
  const count = response?.data?.data;
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <DemoVideo />
      <Pricing />
      {/* <Testimonials />
      <Statistics /> */}
      <CTA count={count} />
      <Footer />
    </main>
  );
}
