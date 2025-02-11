import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/private/b2c/header";
import { Sidebar } from "@/components/private/b2c/sidebar";
import languineConfig from "../../../../../languine.json";
import { redirect } from "@/i18n/routing";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Athlete",
  description: "Athlete page to manage your fitness goals.",
};

// Validate that the incoming `locale` parameter is valid
export function generateStaticParams() {
  return [...languineConfig.locale.targets, languineConfig.locale.source].map(
    (locale) => ({ locale })
  );
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { locale } = await params;

  if (
    ![...languineConfig.locale.targets, languineConfig.locale.source].includes(
      locale
    )
  ) {
    notFound();
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect({ href: "/login", locale });
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />

        <SidebarInset className="flex-1 bg-noise pb-8">
          <Header />

          <main className="pt-4">
            {children}

            {/* {!admins.includes(userData.email) && <ComingSoon />} */}
            <Toaster />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
