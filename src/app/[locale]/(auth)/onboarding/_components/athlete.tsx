"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { updateAthlete } from "@/actions/athlete/update-athlete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Gender = "male" | "female" | "other";

interface FormData {
  name: string;
  surname: string;
  birth_date: string;
  gender: Gender | "";
  phone: string;
}

export function Athlete() {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    name: "",
    surname: "",
    birth_date: "",
    gender: "",
    phone: "",
  });

  const { execute: executeUpdateAthlete, status } = useAction(updateAthlete, {
    onSuccess: (response) => {
      if (response.data?.success) {
        toast.success("Profile updated successfully");
        router.push("/athlete");
      } else {
        toast.error(response.data?.error || "Failed to update profile");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.gender) return;
    executeUpdateAthlete({
      ...form,
      gender: form.gender as Gender,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">First Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="surname">Last Name</Label>
            <Input
              id="surname"
              value={form.surname}
              onChange={(e) => setForm({ ...form, surname: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birth_date">Date of Birth</Label>
            <Input
              id="birth_date"
              type="date"
              value={form.birth_date}
              onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={form.gender}
              onValueChange={(value: Gender) =>
                setForm({ ...form, gender: value })
              }
            >
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

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={status === "executing"}
          >
            {status === "executing" ? "Saving..." : "Complete Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
