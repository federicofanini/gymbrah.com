"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { addBusiness } from "@/actions/business/onboarding/add-business";
import { addBusinessPlan } from "@/actions/business/onboarding/add-business-plan";
import { saveUser } from "@/actions/user/save-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  // Business Form State
  const [businessForm, setBusinessForm] = useState({
    name: "",
    address: "",
    city: "",
    province: "",
    zip: "",
    country: "",
    vat: "",
  });

  // Plan Form State
  // TODO: replace with stripe payment
  const [planForm, setPlanForm] = useState({
    stripeCustomerId: "",
    stripeSubscriptionId: "",
    stripePriceId: "",
    planName: "",
  });

  const { execute: executeAddBusiness, status: addBusinessStatus } = useAction(
    addBusiness,
    {
      onSuccess: (response) => {
        if (response?.data?.success) {
          toast.success("Business information saved successfully");
          setStep(2);
        } else {
          toast.error("Failed to save business information");
        }
      },
    }
  );

  const { execute: executeAddBusinessPlan, status: addPlanStatus } = useAction(
    addBusinessPlan,
    {
      onSuccess: (response) => {
        if (response?.data?.success) {
          toast.success("Business plan added successfully");
          executeCreateUser();
        } else {
          toast.error("Failed to add business plan");
        }
      },
    }
  );

  const { execute: executeCreateUser } = useAction(saveUser, {
    onSuccess: (response) => {
      if (response?.data) {
        router.push("/business");
      } else {
        toast.error("Failed to create user");
      }
    },
  });

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeAddBusiness(businessForm);
  };

  const handlePlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeAddBusinessPlan(planForm);
  };

  return (
    <>
      {step === 1 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Welcome to{" "}
              <div className="flex items-center gap-2">
                <Image
                  src="/logo/logo_black.png"
                  alt="GB"
                  width={32}
                  height={32}
                />
                <span className="text-2xl font-bold font-mono">GymBrah</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBusinessSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Business Name{" "}
                  <span className="text-xs text-muted-foreground">
                    (Gym name or PT name)
                  </span>
                </Label>
                <Input
                  id="name"
                  value={businessForm.name}
                  onChange={(e) =>
                    setBusinessForm({ ...businessForm, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={businessForm.address}
                  onChange={(e) =>
                    setBusinessForm({
                      ...businessForm,
                      address: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={businessForm.city}
                    onChange={(e) =>
                      setBusinessForm({ ...businessForm, city: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="province">Province/State</Label>
                  <Input
                    id="province"
                    value={businessForm.province}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        province: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP/Postal Code</Label>
                  <Input
                    id="zip"
                    value={businessForm.zip}
                    onChange={(e) =>
                      setBusinessForm({ ...businessForm, zip: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={businessForm.country}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        country: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vat">VAT Number</Label>
                <Input
                  id="vat"
                  value={businessForm.vat}
                  onChange={(e) =>
                    setBusinessForm({ ...businessForm, vat: e.target.value })
                  }
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={addBusinessStatus === "executing"}
              >
                {addBusinessStatus === "executing"
                  ? "Saving..."
                  : "Save and Continue"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Business Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePlanSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="planName">Plan Name</Label>
                <Input
                  id="planName"
                  value={planForm.planName}
                  onChange={(e) =>
                    setPlanForm({ ...planForm, planName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stripeCustomerId">Stripe Customer ID</Label>
                <Input
                  id="stripeCustomerId"
                  value={planForm.stripeCustomerId}
                  onChange={(e) =>
                    setPlanForm({
                      ...planForm,
                      stripeCustomerId: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stripeSubscriptionId">
                  Stripe Subscription ID
                </Label>
                <Input
                  id="stripeSubscriptionId"
                  value={planForm.stripeSubscriptionId}
                  onChange={(e) =>
                    setPlanForm({
                      ...planForm,
                      stripeSubscriptionId: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stripePriceId">Stripe Price ID</Label>
                <Input
                  id="stripePriceId"
                  value={planForm.stripePriceId}
                  onChange={(e) =>
                    setPlanForm({ ...planForm, stripePriceId: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-full"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={addPlanStatus === "executing"}
                >
                  {addPlanStatus === "executing"
                    ? "Saving..."
                    : "Complete Onboarding"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
