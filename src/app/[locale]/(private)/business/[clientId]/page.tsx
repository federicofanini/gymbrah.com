import { getClientById } from "@/actions/business/client/get-clients";
import { ClientPage } from "@/components/private/b2b/business/client-page/client-page";

// Define the type for the dynamic route params
type PageParams = { clientId: string } & Promise<any>;

export default async function ClientIdPage({ params }: { params: PageParams }) {
  const clientResponse = await getClientById({
    clientId: params.clientId,
  });

  if (!clientResponse?.data?.success || !clientResponse?.data?.data) {
    return (
      <div className="container max-w-[1050px] py-12">
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">Unable to load client details</p>
        </div>
      </div>
    );
  }

  const client = clientResponse.data.data;

  return <ClientPage client={client} />;
}
