import PortalComingSoon from "@/app/components/PortalComingSoon";

export default function Page() {
  return (
    <PortalComingSoon
      title="Consultant Portal"
      description="The Consultant Portal is currently under development and will be available in an upcoming update."
      features={[
        "Manage Multiple Clients",
        "AMC Management",
        "Compliance Calendar",
        "Invoice & Billing",
        "Client Dashboard",
      ]}
    />
  );
}