"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  checkAthleteExists,
  createAthlete,
  associateClientAthlete,
  createClientSubscription,
} from "@/actions/business/client/add-client";
import { useTranslations } from "next-intl";

export function AddClientDialog() {
  const t = useTranslations("private-business.clients-tab");

  const [step, setStep] = useState(1);
  const [athleteId, setAthleteId] = useState<string>("");
  const [clientAthleteId, setClientAthleteId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [searchType, setSearchType] = useState<"email" | "code">("email");
  const [foundAthlete, setFoundAthlete] = useState<{
    id: string;
    email: string;
    athlete_code: string;
    name: string;
    surname: string;
  } | null>(null);

  const { execute: executeCheckAthlete } = useAction(checkAthleteExists, {
    onSuccess: (response) => {
      if (response?.data?.data?.exists) {
        setFoundAthlete(response.data.data.athlete);
        setAthleteId(response.data.data.athlete.id);
      } else {
        setFoundAthlete(null);
        setStep(2); // Move to create athlete form
      }
    },
    onError: () => {
      toast.error("Athlete don't exists. Add it in GymBrah");
    },
  });

  const { execute: executeCreateAthlete } = useAction(createAthlete, {
    onSuccess: (response) => {
      if (response?.data?.data?.id) {
        setAthleteId(response.data.data.id);
        handleAssociateAthlete(response.data.data.id);
      } else {
        toast.error("Failed to create athlete");
      }
    },
  });

  const { execute: executeAssociateAthlete } = useAction(
    associateClientAthlete,
    {
      onSuccess: (response) => {
        if (response?.data?.data?.id) {
          setClientAthleteId(response.data.data.id);
          setStep(3); // Move to subscription form
          toast.success("Athlete associated successfully");
        } else {
          toast.error("Athlete already associated with this gym!");
        }
      },
    }
  );

  const { execute: executeCreateSubscription } = useAction(
    createClientSubscription,
    {
      onSuccess: (response) => {
        if (response?.data?.data?.id) {
          setOpen(false);
          setStep(1);
          setFoundAthlete(null);
          toast.success("Subscription created successfully");
        } else {
          toast.error("Failed to create subscription");
        }
      },
    }
  );

  const handleCheckAthlete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await executeCheckAthlete(
      searchType === "email"
        ? { email: formData.get("email") as string }
        : { athleteCode: formData.get("athleteCode") as string }
    );
  };

  const handleCreateAthlete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await executeCreateAthlete({
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      surname: formData.get("surname") as string,
      phone: formData.get("phone") as string,
      birthDate: formData.get("birthDate") as string,
      gender: formData.get("gender") as "male" | "female" | "other",
    });
  };

  const handleAssociateAthlete = async (athleteId: string) => {
    await executeAssociateAthlete({
      athleteId,
    });
  };

  const handleCreateSubscription = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await executeCreateSubscription({
      clientAthleteId,
      subType: formData.get("subType") as string,
      price: parseFloat(formData.get("price") as string),
      paymentDate: new Date(formData.get("paymentDate") as string),
      renewalDate: new Date(formData.get("renewalDate") as string),
      monthsPaid: "1", // Default to 1 month
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">{t("add-client")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === 1
              ? t("check-athlete")
              : step === 2
              ? t("create-athlete")
              : t("set-subscription")}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <form onSubmit={handleCheckAthlete} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="searchType">Search By</Label>
                <Select
                  value={searchType}
                  onValueChange={(value) =>
                    setSearchType(value as "email" | "code")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="code">Athlete Code</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {searchType === "email" ? (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="athleteCode">Athlete Code</Label>
                  <Input id="athleteCode" name="athleteCode" />
                </div>
              )}

              <Button type="submit" className="w-full">
                Check Athlete
              </Button>
            </form>

            {foundAthlete && (
              <div className="mt-4 p-4 border rounded-lg space-y-2">
                <h3 className="font-semibold">Found Athlete:</h3>
                <p>
                  Name: {foundAthlete.name} {foundAthlete.surname}
                </p>
                <p>Email: {foundAthlete.email}</p>
                <p>Athlete Code: {foundAthlete.athlete_code}</p>
                <Button
                  onClick={() => handleAssociateAthlete(foundAthlete.id)}
                  className="w-full mt-2"
                >
                  Associate Athlete
                </Button>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleCreateAthlete} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  onChange={(e) => {
                    e.target.value =
                      e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Surname</Label>
                <Input
                  id="surname"
                  name="surname"
                  required
                  onChange={(e) => {
                    e.target.value =
                      e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1);
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Birth Date</Label>
              <Input id="birthDate" name="birthDate" type="date" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Create Athlete
            </Button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleCreateSubscription} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subType">Subscription Type</Label>
              <Select name="subType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select subscription type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="bimestral">Bimestral</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="quadrimestral">Quadrimestral</SelectItem>
                  <SelectItem value="semestral">Semestral</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentDate">Payment Date</Label>
              <Input
                id="paymentDate"
                name="paymentDate"
                type="date"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="renewalDate">Renewal Date</Label>
              <Input id="renewalDate" name="renewalDate" type="date" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" required />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(2)}
              >
                Back
              </Button>
              <Button type="submit">Complete</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
