import PortalComingSoon from "@/app/components/PortalComingSoon";

export default function Page() {
  return (
    <PortalComingSoon
      title="Small Business Portal"
      description="The Small Business Portal is currently under development and will be available in an upcoming update."
      features={[
        "Easy Compliance",
        "Renewal Reminders",
        "Document Storage",
        "Simple Dashboard",
        "Affordable Plans",
      ]}
    />
  );
}