import { siteConfig } from "@/lib/config";
import Link from "next/link";

export function CTASection() {
  const { ctaSection } = siteConfig;

  return (
    <section
      id="cta"
      className="flex flex-col items-center justify-center w-full"
    >
      <div className="w-full">
        <div className="h-[400px] md:h-[400px] overflow-hidden shadow-xl w-full border border-border rounded-xl bg-secondary relative z-20">
          <div className="absolute inset-0 flex -z-10 [mask:linear-gradient(180deg,transparent,black_40%,black_40%,transparent)]">
            <div className="w-1/2 h-full flex items-start justify-between">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="w-px h-full bg-primary/20 first:bg-transparent"
                ></div>
              ))}
            </div>
            <div className="w-1/2 h-full border-x border-border/70 border-dashed flex items-start justify-between">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="w-px h-full bg-primary/20 first:bg-transparent"
                ></div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 -top-32 md:-top-40 flex flex-col items-center justify-center">
            <h1 className="text-primary text-4xl md:text-7xl font-medium tracking-tighter max-w-xs md:max-w-xl text-center">
              {ctaSection.title}
            </h1>
            <div className="absolute bottom-10 flex flex-col items-center justify-center gap-2">
              <Link
                href={ctaSection.button.href}
                className="bg-primary text-white font-semibold text-sm h-10 w-fit px-4 rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
              >
                {ctaSection.button.text}
              </Link>
              <span className="text-muted-foreground text-sm font-mono">
                {ctaSection.subtext}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
