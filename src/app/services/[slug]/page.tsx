import ServicePageClient from "@/components/ServicePageClient";
import { servicesConfig } from "@/config/services";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return servicesConfig.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicesConfig.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServicePageClient service={service} />;
}
