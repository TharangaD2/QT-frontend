import { ServiceData, ServiceId, servicesData } from "@/data/servicesData";
import ServiceTemplate from "@/components/templates/serviceTemplate";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params; // ← FIXED

  const typedId = serviceId as ServiceId;
  const data: ServiceData | undefined = servicesData[typedId];

  if (!data) {
    return <div className="p-20 text-center text-2xl">Service Not Found</div>;
  }

  return <ServiceTemplate data={data} />;
}

