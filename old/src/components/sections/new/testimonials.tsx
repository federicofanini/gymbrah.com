"use client";

import { useState } from "react";
import { Loader2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MdAttachFile } from "react-icons/md";
import { addReview } from "@/actions/review/add-review";
import { toast } from "sonner";

const testimonials = [
  {
    name: "Pontus",
    role: "Midday Founder",
    content:
      "Hey man, gymbrah looks awesome, you should really do it OSS and I will help you with localization 🔥",
    image:
      "https://pbs.twimg.com/profile_images/1755611130368770048/JwLEqyeo_400x400.jpg",
  },
];

function AddTestimonialDialog() {
  const [formData, setFormData] = useState({
    name: "",
    x_username: "",
    role: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await addReview(formData);
      if (result?.data?.success) {
        toast.success("Your review has been added successfully!");
        setOpen(false);
        setFormData({
          name: "",
          x_username: "",
          role: "",
          content: "",
        });
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md",
            "relative overflow-hidden",
            "border-dashed border-primary/50 hover:border-primary cursor-pointer",
            "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          )}
        >
          <div className="space-y-4">
            <Quote className="h-6 w-6 text-blue-400" />
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-400/10 flex items-center justify-center">
                <MdAttachFile className="text-blue-400" />
              </div>
              <div>
                <div className="font-medium">Maybe you?</div>
                <div className="text-sm text-muted-foreground">
                  Leave a review, means the world to me.
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full hover:bg-blue-400">
              Leave a review
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Story</DialogTitle>
          <DialogDescription>Tell us about GymBrah</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="Name"
            className="border-primary/20 focus-visible:ring-primary"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              x.com/
            </span>
            <Input
              placeholder="username"
              className="border-primary/20 focus-visible:ring-primary pl-[4.5rem]"
              value={formData.x_username}
              onChange={(e) =>
                setFormData({ ...formData, x_username: e.target.value })
              }
            />
          </div>
          <Input
            placeholder="Role"
            className="border-primary/20 focus-visible:ring-primary"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <Textarea
            placeholder="Your experience..."
            className="min-h-[100px] border-primary/20 focus-visible:ring-primary"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Submitting...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <MdAttachFile className="w-4 h-4 mr-2" />
                Submit
              </div>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Testimonials() {
  const [showAll, setShowAll] = useState(false);
  const displayedTestimonials = showAll
    ? testimonials
    : testimonials.slice(0, 4);

  return (
    <div
      className="relative mx-auto max-w-screen-xl px-4 py-16"
      id="testimonials"
    >
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2] text-balance mb-4">
          <span className="relative inline-block px-1">
            What People Are Saying
            <span className="hidden md:block absolute -bottom-1 left-0 w-full h-2 md:h-3 bg-blue-400 -rotate-1 -z-10" />
          </span>
          <br />
          <span className="text-sm md:text-md text-muted-foreground font-medium tracking-normal">
            Real stories from our community
          </span>
        </h2>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-500/20 via-transparent to-transparent opacity-30" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {displayedTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className={cn(
              "rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md",
              "relative overflow-hidden",
              "border-solid hover:border-primary/50",
              "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
            )}
          >
            <div className="mb-4 text-primary">
              <Quote className="h-6 w-6 text-blue-400" />
            </div>
            <div className="space-y-4">
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: testimonial.content }}
              />
              <div className="flex items-center space-x-2">
                {testimonial.image && (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <AddTestimonialDialog />
      </div>

      {!showAll && testimonials.length > 4 && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={() => setShowAll(true)}
            className="text-primary border-primary hover:bg-primary/10"
          >
            Show More Testimonials
          </Button>
        </div>
      )}
    </div>
  );
}
