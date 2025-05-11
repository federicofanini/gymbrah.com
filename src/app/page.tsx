import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";

import { Header } from "@/components/sections/new/header";
import { Pricing } from "@/components/sections/pricing";

// new components
import { Hero } from "@/components/sections/new/hero";
import { ServicesBusiness } from "@/components/sections/new/services-business";
import { ServicesAthletes } from "@/components/sections/new/services-athletes";
import { Community } from "@/components/sections/new/community";
import { UseCases } from "@/components/sections/new/use-cases";
import { getSubscriberCount } from "@/actions/subscribe-action";
import { Loader2 } from "lucide-react";
import { FAQ } from "@/components/sections/new/faq";
import { Testimonials } from "@/components/sections/new/testimonials";
import { WhoAmI } from "@/components/sections/new/whoami";

export const revalidate = 3600; // revalidate every hour

export default async function Home() {
  const subscriberCountResponse = await getSubscriberCount();
  const subscriberCount = subscriberCountResponse.success ? (
    subscriberCountResponse.data.count
  ) : (
    <Loader2 className="w-4 h-4 animate-spin" />
  );

  const githubResponse = await fetch(
    "https://api.github.com/repos/federicofanini/gymbrah.com"
  );
  const githubData = await githubResponse.json();
  const starCount = githubData.stargazers_count;

  return (
    <main>
      <Header />

      <div className="space-y-16 max-w-screen-xl mx-auto">
        <Hero gyms={20} pts={1} members={subscriberCount} />
        <ServicesBusiness subscriberCount={subscriberCount} />
        <ServicesAthletes subscriberCount={subscriberCount} />
        <UseCases subscriberCount={subscriberCount} />
        <WhoAmI />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Community />

        <CTA subscriberCount={subscriberCount} />
        <Footer />
      </div>
    </main>
  );
}
