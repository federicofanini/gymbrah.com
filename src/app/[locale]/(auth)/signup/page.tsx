"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { signup } from "../login/actions";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showVerifyMessage, setShowVerifyMessage] = useState(false);

  async function handleSignup(formData: FormData) {
    try {
      setIsLoading(true);
      await signup(formData);
      setShowVerifyMessage(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Create an account</h1>
                    <p className="text-balance text-muted-foreground">
                      Enter your details to get started
                    </p>
                  </div>

                  {showVerifyMessage ? (
                    <div className="rounded-lg bg-muted p-4 text-center">
                      <p className="font-medium">Check your email</p>
                      <p className="text-sm text-muted-foreground">
                        We sent you a verification link. Please check your email
                        to verify your account.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="tom@cruise.com"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                        </div>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••••••"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <Button
                        formAction={handleSignup}
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating account..." : "Sign up"}
                      </Button>
                      <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Button
                          variant="link"
                          className="underline underline-offset-4"
                          disabled={isLoading}
                        >
                          <Link href="/login">Login</Link>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </form>
              <div className="relative hidden bg-muted md:block">
                <Image
                  src="/hero.png"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover"
                  width={500}
                  height={500}
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <a href="/terms">Terms of Service</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
