"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Mail } from "lucide-react";

const faqs = [
  {
    question: "What makes GymBrah different from other fitness apps?",
    answer:
      "GymBrah is built specifically for both athletes and fitness creators, offering a platform that combines workout tracking, client management, and community features. Our focus on real-time accountability and personalized experiences sets us apart.",
  },
  {
    question: "Is GymBrah suitable for beginners?",
    answer:
      "Absolutely! GymBrah caters to all fitness levels. Whether you're just starting your fitness journey or you're an experienced athlete, our platform adapts to your needs and helps you progress at your own pace.",
  },
  {
    question: "How does the lifetime pricing work?",
    answer:
      "Our lifetime pricing means you pay once and get access forever. This plan will be available for a limited time only, while in beta. This includes all current features and future updates. We believe in building long-term relationships with our users rather than charging recurring fees.",
  },
  {
    question: "Can I use GymBrah to manage my fitness business?",
    answer:
      "Yes! Our platform includes powerful tools for fitness creators, including client management, workout builders, and scheduling features. You can efficiently manage your business while providing an excellent experience for your clients.",
  },
  {
    question: "How do I get started with GymBrah?",
    answer:
      "During our presale period, you can reserve your spot at a very special price. Simply choose your plan (athlete or fitness creator) and complete the registration. You'll receive an email when we launch our private beta with instructions to access the platform. Join our Discord community in the meantime to connect with other early members and stay updated on our progress.",
  },
];

export function FAQ() {
  return (
    <div className="relative mx-auto max-w-screen-xl px-4 py-16" id="faq">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2] text-balance mb-4">
          <span className="relative inline-block px-1">
            Frequently Asked Questions
            <span className="hidden md:block absolute -bottom-1 left-0 w-full h-2 md:h-3 bg-[#a3e635]/30 -rotate-1 -z-10" />
          </span>
          <br />
          <span className="text-sm md:text-md text-muted-foreground font-medium tracking-normal">
            Got questions? We&apos;ve got answers.
          </span>
        </h2>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#a3e635]/20 via-transparent to-transparent opacity-30" />
      </div>

      <div className="w-full max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions? We&apos;re here to help!
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="https://x.com/FedericoFan"
              target="_blank"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Button variant="outline" size="sm">
                <Icons.twitter className="h-4 w-4 mr-2" />
                DM on X
              </Button>
            </Link>
            <Link
              href="mailto:fedef@gymbrah.com"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email me
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
