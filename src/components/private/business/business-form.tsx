"use client";

import { BusinessType, PriceRange } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreateBusinessInput } from "@/packages/database/business";
import { slugify } from "@/lib/utils";

export const businessSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.nativeEnum(BusinessType),
  description: z.string().min(10, "Description must be at least 10 characters"),
  profile: z.object({
    priceRange: z.nativeEnum(PriceRange),
  }),
  location: z
    .object({
      address: z.string().min(5, "Address must be at least 5 characters"),
      city: z.string().min(2, "City must be at least 2 characters"),
      country: z.string().min(2, "Country must be at least 2 characters"),
      zipCode: z.string().min(4, "Zip code must be at least 4 characters"),
      latitude: z.number().optional().nullable(),
      longitude: z.number().optional().nullable(),
    })
    .refine(
      (data) => {
        const hasLatitude = data.latitude != null;
        const hasLongitude = data.longitude != null;
        return hasLatitude === hasLongitude;
      },
      {
        message: "Both latitude and longitude must be provided together",
      }
    ),
  contact: z.object({
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    websiteUrl: z.string().url("Invalid URL").optional(),
  }),
  services: z.array(z.string()).min(1, "Add at least one service"),
});

type BusinessFormProps = {
  initialData?: Partial<CreateBusinessInput>;
  onSubmit: (data: z.infer<typeof businessSchema>) => Promise<void>;
  isLoading?: boolean;
};

export function BusinessForm({
  initialData,
  onSubmit,
  isLoading,
}: BusinessFormProps) {
  const form = useForm<z.infer<typeof businessSchema>>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: initialData?.name || "",
      type: initialData?.type || BusinessType.GYM,
      description: initialData?.description || "",
      profile: {
        priceRange: initialData?.profile?.priceRange || PriceRange.MEDIUM,
      },
      location: {
        address: initialData?.location?.address || "",
        city: initialData?.location?.city || "",
        country: initialData?.location?.country || "",
        zipCode: initialData?.location?.zipCode || "",
      },
      contact: {
        email: initialData?.contact?.email || "",
        phone: initialData?.contact?.phone || "",
        websiteUrl: initialData?.contact?.websiteUrl || "",
      },
      services: initialData?.services || [],
    },
  });

  const handleSubmit = async (values: z.infer<typeof businessSchema>) => {
    const formData = {
      ...values,
      slug: slugify(values.name),
    };
    await onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Elite Fitness" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a business type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(BusinessType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your business..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profile.priceRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Range</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a price range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(PriceRange).map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="font-medium">Location</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="location.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Fitness Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="10001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Contact</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="contact.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="contact@business.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact.websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://www.example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Services</h3>
          <FormField
            control={form.control}
            name="services"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Services (comma-separated)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Gym, Personal Training, Yoga"
                    value={field.value.join(", ")}
                    onChange={(e) => {
                      const services = e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean);
                      field.onChange(services);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Business"}
        </Button>
      </form>
    </Form>
  );
}
