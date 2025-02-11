import { redirect } from "next/navigation";
import { Metadata } from "next";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { DashboardHeader } from "@/components/dashboard-header";
import { prisma } from "@/lib/db";
import { Sidebar } from "@/components/private/b2b/sidebar";
import { Header } from "@/components/private/b2b/header";
import { Toaster } from "@/components/ui/sonner";
import { checkBusiness } from "@/actions/business/onboarding/check-business";
import { checkPlan } from "@/actions/business/onboarding/check-plan";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Gym Manager",
  description: "Gym Manager Account",
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const businessResponse = await checkBusiness({ user_id: data.user.id });

  console.log("business exists", businessResponse?.data?.data?.exists);

  if (
    businessResponse?.data?.success &&
    !businessResponse?.data?.data?.exists
  ) {
    redirect("/onboarding");
  }

  const planResponse = await checkPlan({ user_id: data.user.id });

  if (
    planResponse?.data?.success &&
    !planResponse?.data?.data?.hasActiveSubscription
  ) {
    redirect("/onboarding");
  }

  console.log("paid plan", planResponse?.data?.data?.hasActiveSubscription);

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
