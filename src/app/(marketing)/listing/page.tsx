import { ComingSoon } from "@/components/coming-soon";
import { getSubscriberCount } from "@/packages/resend/subscribe";

export default async function ListingPage() {
  const response = await getSubscriberCount();
  const memberCount =
    response.success && "data" in response
      ? (response.data as { count: number }).count
      : 0;

  return (
    <div className="container py-10">
      <ComingSoon members={memberCount} />
    </div>
  );
}
