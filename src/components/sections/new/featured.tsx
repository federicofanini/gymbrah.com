import Image from "next/image";

export function Featured() {
  return (
    <section className="w-full py-8 md:py-12 bg-background">
      <div className="mx-auto max-w-screen-xl px-4">
        <h3 className="text-center text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-widest">
          Featured On
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <a
            href="https://supabase.com/changelog#made-with-supabase"
            target="_blank"
            aria-label="Supabase"
            className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition"
          >
            <Image
              src="/featured/supabase.png"
              alt="Supabase logo"
              width={120}
              height={32}
              className="h-8 w-auto"
              priority={false}
            />
          </a>
          <a
            href="https://startupfa.me/s/gymbrah?utm_source=gymbrah.com"
            target="_blank"
            aria-label="StartupFame"
            className="opacity-60 grayscale hover:opacity-100 flex items-center gap-2 hover:grayscale-0 transition"
          >
            <Image
              src="/featured/fame.svg"
              alt="StartupFame logo"
              width={140}
              height={32}
              className="h-8 w-auto"
              priority={false}
            />
            <p className="text-xl font-bold">StartupFame</p>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Featured;
