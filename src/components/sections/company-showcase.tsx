import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import sponsorConfig from "./company-showcase-config.json";

export function CompanyShowcase() {
  const sponsors = sponsorConfig.sponsors;

  return (
    <section
      id="company"
      className="flex flex-col items-center justify-center gap-10 py-10 pt-10 w-full relative px-6"
    >
      <p className="text-muted-foreground font-medium">
        Support the project by becoming a sponsor
      </p>
      <div className="grid w-full max-w-7xl grid-cols-2 md:grid-cols-4 overflow-hidden border-y border-border items-center justify-center z-20">
        {sponsors.map((sponsor) => (
          <Link
            href={sponsor.url}
            className="group w-full h-28 flex items-center justify-center relative p-4 before:absolute before:-left-1 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-1 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-['']"
            key={sponsor.id}
            target="_blank"
          >
            <div className="transition-all duration-200 [cubic-bezier(0.165, 0.84, 0.44, 1)] translate-y-0 group-hover:-translate-y-4 duration-300 flex items-center justify-center w-full h-full">
              {sponsor.isUsed && sponsor.logo ? (
                <div className="flex flex-col items-center justify-center gap-1 max-w-[180px]">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name || "Sponsor logo"}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-xs text-center text-muted-foreground line-clamp-1">
                      {sponsor.name ? sponsor.name : "Your logo here"}
                    </p>
                    <p className="text-xs text-center text-muted-foreground line-clamp-2 mt-1">
                      {sponsor.description}
                    </p>
                  </div>
                </div>
              ) : (
                <span className="text-gray-400">Your logo here</span>
              )}
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-4 transition-all duration-300 ease-[cubic-bezier(0.165, 0.84, 0.44, 1)]">
              <div className="absolute inset-0 bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-lg z-0" />
              <span className="flex items-center gap-2 text-sm font-medium z-10 relative">
                {sponsor.isUsed ? `Visit ${sponsor.name}` : "Become a Sponsor"}{" "}
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
