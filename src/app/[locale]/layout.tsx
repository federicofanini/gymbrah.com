import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/config";
import { cn, constructMetadata } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Provider as Analytics } from "@/utils/events/client";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import languineConfig from "../../../languine.json";
import { getMessages } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = constructMetadata({
  title: `${siteConfig.name} | ${siteConfig.description}`,
});

// Validate that the incoming `locale` parameter is valid
export function generateStaticParams() {
  return [...languineConfig.locale.targets, languineConfig.locale.source].map(
    (locale) => ({ locale })
  );
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;

  if (
    ![...languineConfig.locale.targets, languineConfig.locale.source].includes(
      locale
    )
  ) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(GeistSans.variable, GeistMono.variable)}
    >
      <body
        className={cn(
          "min-h-screen bg-background antialiased w-full mx-auto scroll-smooth font-sans"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <NuqsAdapter>
            <NextIntlClientProvider messages={messages} locale={locale}>
              {children}
            </NextIntlClientProvider>
          </NuqsAdapter>
          <TailwindIndicator />
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
