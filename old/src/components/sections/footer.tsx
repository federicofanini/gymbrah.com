import { BorderText } from "@/components/ui/border-number";
import { siteConfig } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { SubscribeInput } from "../ui/subscribe-input";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { text: "Features", url: "/#features" },
      { text: "Pricing", url: "/#pricing" },
      { text: "For Athletes", url: "/#athletes" },
      { text: "For Business", url: "/#business" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { text: "About", url: "/#" },
      { text: "Blog", url: "/#" },
      { text: "Careers", url: "/#" },
      { text: "Contact", url: "/#" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { text: "Privacy", url: "/privacy" },
      { text: "Terms", url: "/terms" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="flex flex-col gap-y-8 rounded-lg py-12 max-w-screen-xl px-4 mx-auto border-t">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-x-2 mb-4">
            <Image
              src="/logo/logo_black.png"
              alt="GymBrah"
              width={100}
              height={100}
              className="size-10"
            />
            <p className="text-xl font-extrabold font-mono">GymBrah</p>
          </div>
          <div className="mt-4 items-start justify-start">
            <SubscribeInput />
          </div>
          <div className="mt-4 flex flex-col ">
            <a
              href="https://startupfa.me/s/gymbrah?utm_source=gymbrah.com"
              target="_blank"
            >
              <img
                src="https://startupfa.me/badges/featured-badge-small-light.webp"
                alt="GymBrah - Run Your Fitness Business Without Chaos | Startup Fame"
                width="224"
                height="36"
              />
            </a>
            <a
              href="https://frogdr.com?via=fedef"
              target="_blank"
              className="mt-4"
            >
              <img
                src="https://frogdr.com/gymbrah.com/badge-white-tiny.svg"
                alt="Monitor&#0032;your&#0032;Domain&#0032;Rating&#0032;with&#0032;FrogDR"
                width="224"
                height="20"
              />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 col-span-1 md:col-span-3 gap-8">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      href={link.url}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t">
        <div className="flex gap-x-4">
          {siteConfig.footer.socialLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.icon}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            Made with ☕️ and 🥐 by
            <Image
              src="/ff.jpg"
              alt="Federico"
              width={24}
              height={24}
              className="rounded-full"
            />
            <Link
              href="https://x.com/FedericoFan"
              target="_blank"
              className="font-semibold"
            >
              Federico
            </Link>
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          {siteConfig.footer.bottomText}
        </p>
      </div>

      <BorderText
        text={siteConfig.footer.brandText}
        className="text-[clamp(3rem,15vw,10rem)] overflow-hidden font-mono tracking-tighter font-medium"
      />
    </footer>
  );
}
