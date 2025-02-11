"use client";

import { Section } from "@/components/section";
import OutlinedButton from "../ui/outlined-button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function CTA({ count }: { count: number }) {
  const t = useTranslations("cta");

  return (
    <Section id="cta">
      <div className="border overflow-hidden relative text-center py-16 mx-auto">
        <p className="max-w-3xl text-foreground mb-6 text-balance mx-auto font-mono text-3xl">
          {t("title")}
        </p>

        <div className="flex justify-center">
          <Link href="/login">
            <OutlinedButton
              className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-secondary-foreground text-xl"
              variant="secondary"
            >
              {count}+ {t("button")}
            </OutlinedButton>
          </Link>
        </div>
      </div>
    </Section>
  );
}
