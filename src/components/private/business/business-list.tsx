"use client";

import { useState } from "react";
import { BusinessWithDetails } from "@/packages/database/business";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { DeleteBusinessDialog } from "./delete-business-dialog";

type BusinessListProps = {
  businesses: BusinessWithDetails[];
};

export function BusinessList({ businesses }: BusinessListProps) {
  const [selectedBusiness, setSelectedBusiness] = useState<{
    id: string;
    name: string;
  } | null>(null);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {businesses.map((business) => (
          <Card key={business.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{business.name}</CardTitle>
                  <CardDescription>{business.type}</CardDescription>
                </div>
                <Badge
                  variant={business.meta?.isVerified ? "default" : "secondary"}
                >
                  {business.meta?.isVerified ? "Verified" : "Pending"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {business.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {business.services.slice(0, 3).map((service) => (
                    <Badge key={service.name} variant="outline">
                      {service.name}
                    </Badge>
                  ))}
                  {business.services.length > 3 && (
                    <Badge variant="outline">
                      +{business.services.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1"
                  >
                    <Link href={`/listing/${business.slug}/edit`}>
                      <PencilIcon className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      setSelectedBusiness({
                        id: business.id,
                        name: business.name,
                      })
                    }
                  >
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedBusiness && (
        <DeleteBusinessDialog
          businessId={selectedBusiness.id}
          businessName={selectedBusiness.name}
          isOpen={true}
          onOpenChange={(open) => {
            if (!open) setSelectedBusiness(null);
          }}
        />
      )}
    </>
  );
}
