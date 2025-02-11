"use client";

import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: "yearly" | "monthly") => void;
  className?: string;
  children: (activeTab: string) => React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  onClick: () => void;
  children: React.ReactNode;
  isActive: boolean;
}

const Tabs = ({ activeTab, setActiveTab, className, children }: TabsProps) => {
  return (
    <div
      className={cn(
        "mx-auto flex w-full items-center justify-center",
        className
      )}
    >
      {children(activeTab)}
    </div>
  );
};

const TabsList = ({ children }: TabsListProps) => {
  return (
    <div className="relative flex w-fit items-center rounded-full border p-1.5">
      {children}
    </div>
  );
};

const TabsTrigger = ({
  value,
  onClick,
  children,
  isActive,
}: TabsTriggerProps) => {
  return (
    <button
      onClick={onClick}
      className={cn("relative z-[1] px-4 py-2", { "z-0": isActive })}
    >
      {isActive && (
        <motion.div
          layoutId="active-tab"
          className="absolute inset-0 rounded-full bg-accent"
          transition={{
            duration: 0.2,
            type: "spring",
            stiffness: 300,
            damping: 25,
            velocity: 2,
          }}
        />
      )}
      <span
        className={cn(
          "relative block text-sm font-medium duration-200",
          isActive ? "delay-100 text-primary" : ""
        )}
      >
        {children}
      </span>
    </button>
  );
};

const pricingTiers = [
  {
    name: "pricing.athlete.name",
    price: { yearly: 25 },
    description: "pricing.athlete.description",
    features: [
      "pricing.athlete.features.notes",
      "pricing.athlete.features.achievements",
      "pricing.athlete.features.progress",
      "pricing.athlete.features.community",
      "pricing.athlete.features.support",
    ],
    cta: "pricing.athlete.cta",
  },
  {
    name: "pricing.business.name",
    price: { yearly: 250 },
    description: "pricing.business.description",
    features: [
      "pricing.business.features.management",
      "pricing.business.features.analytics",
      "pricing.business.features.workouts",
      "pricing.business.features.website",
      "pricing.business.features.support",
    ],
    cta: "pricing.business.cta",
    popular: true,
  },
  {
    name: "pricing.enterprise.name",
    price: { yearly: 500 },
    description: "pricing.enterprise.description",
    features: [
      "pricing.enterprise.features.all",
      "pricing.enterprise.features.custom",
    ],
    cta: "pricing.enterprise.cta",
  },
];

function PricingTier({
  tier,
  billingCycle,
}: {
  tier: (typeof pricingTiers)[0];
  billingCycle: "monthly" | "yearly";
}) {
  const t = useTranslations();

  return (
    <div
      className={cn(
        "outline-focus transition-transform-background relative z-10 box-border grid h-full w-full overflow-hidden text-foreground motion-reduce:transition-none lg:border-r border-t last:border-r-0",
        tier.popular ? "bg-primary/5" : "text-foreground"
      )}
    >
      <div className="flex flex-col h-full">
        <CardHeader className="border-b p-4 grid grid-rows-2 h-fit">
          <CardTitle className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {t(tier.name)}
            </span>
            {tier.popular && (
              <Badge
                variant="secondary"
                className="bg-primary text-primary-foreground hover:bg-secondary-foreground"
              >
                {t("pricing.popular_badge")}
              </Badge>
            )}
          </CardTitle>
          <div className="pt-2 text-3xl font-bold">
            <motion.div
              key={tier.price.yearly}
              initial={{
                opacity: 0,
                x: billingCycle === "yearly" ? -10 : 10,
                filter: "blur(5px)",
              }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.25,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {t("pricing.currency")}
              {tier.price.yearly}
              <span className="text-sm font-medium text-muted-foreground">
                {t("pricing.lifetime")}
              </span>
            </motion.div>
          </div>
          <p className="text-[15px] font-medium text-muted-foreground">
            {t(tier.description)}
          </p>
        </CardHeader>

        <CardContent className="flex-grow p-4 pt-5">
          <ul className="space-y-2">
            {tier.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center">
                <Check className="mr-2 size-4 text-green-500" />
                <span className="font-medium">{t(feature)}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <Button
          size="lg"
          className={cn(
            "w-full rounded-none shadow-none",
            tier.popular
              ? "bg-primary text-primary-foreground hover:bg-secondary-foreground"
              : "bg-muted text-foreground hover:bg-muted/80"
          )}
        >
          <Link href="/login">{t(tier.cta)}</Link>
        </Button>
      </div>
    </div>
  );
}

export function Pricing() {
  const t = useTranslations();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "yearly"
  );

  const handleTabChange = (tab: "yearly" | "monthly") => {
    setBillingCycle(tab);
  };

  return (
    <Section id="pricing" title={t("pricing.section_title")}>
      <div className="border border-b-0 grid grid-rows-1">
        <div className="grid grid-rows-1 gap-y-10 p-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
              {t("pricing.title")}
            </h2>

            <p className="mt-6 text-balance text-muted-foreground flex items-center gap-2 text-center justify-center">
              {t("pricing.subtitle")}
              <Image
                src="/logo/logo_black.png"
                alt="GymBrah"
                width={100}
                height={100}
                className="size-6"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <PricingTier key={index} tier={tier} billingCycle={billingCycle} />
          ))}
        </div>
      </div>
    </Section>
  );
}
