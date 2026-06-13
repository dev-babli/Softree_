import ServicePageBreadcrumb from "@/components/services/ServicePageBreadcrumb";

export default function ServicesHubBreadcrumb() {
  return (
    <ServicePageBreadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Services" },
      ]}
    />
  );
}
