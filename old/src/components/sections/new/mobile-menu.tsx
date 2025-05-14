"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { GithubStars } from "../github-stars";
import { Suspense } from "react";
import OutlinedButton from "@/components/ui/outlined-button";
import { Icons } from "@/components/icons";
import { TwitterCard } from "./twitter";

function SignInButton() {
  return (
    <Link href="/access" className="text-xs text-secondary underline">
      <OutlinedButton
        className="text-xs h-6 bg-primary text-white"
        variant="secondary"
      >
        Start now
      </OutlinedButton>
    </Link>
  );
}

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/exercises", label: "1,300+ Exercises", isSpecial: true },
    { href: "#business", label: "Business" },
    { href: "#athletes", label: "Athletes" },
    { href: "#pricing", label: "Pricing" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <div className="flex md:hidden">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <MdClose className="size-6" />
          ) : (
            <MdMenu className="size-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 z-50 bg-background bg-noise w-full bottom-0 h-screen left-0 right-0 top-[70px]"
          >
            <div className="flex flex-col h-full px-4">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: links.length * 0.02 + index * 0.02,
                    duration: 0.1,
                  }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block mt-4 mb-4 text-primary hover:text-primary/80 relative",
                      pathname?.endsWith(link.href) &&
                        "text-primary underline underline-offset-4",
                      link.isSpecial &&
                        "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:animate-pulse"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="py-5 border-t border-border flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: links.length * 0.02 + 0.04,
                  duration: 0.1,
                }}
              >
                <Link href="https://x.com/FedericoFan" className="block">
                  <TwitterCard />
                </Link>
              </motion.div>
              <motion.div
                className="py-5 border-t border-border flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: links.length * 0.02 + 0.04,
                  duration: 0.1,
                }}
              >
                <Link
                  href="https://github.com/federicofanini/gymbrah.com"
                  className="block"
                >
                  <Suspense fallback={<GithubStars />}>
                    <GithubStars />
                  </Suspense>
                </Link>
              </motion.div>

              <motion.div
                className="py-5 border-t border-border"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: links.length * 0.02 + 0.05,
                  duration: 0.1,
                }}
              >
                <SignInButton />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
