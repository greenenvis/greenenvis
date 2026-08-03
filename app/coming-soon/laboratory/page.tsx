import PortalComingSoon from "@/app/components/PortalComingSoon";

export default function Page() {
  return (
    <PortalComingSoon
      title="Laboratory Portal"
      description="The Laboratory Portal is currently under development and will be available in an upcoming update."
      features={[
        "NABL Report Upload",
        "Sample Tracking",
        "Report History",
        "Laboratory Dashboard",
        "Customer Management",
      ]}
    />
  );
}