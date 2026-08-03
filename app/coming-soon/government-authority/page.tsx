import PortalComingSoon from "@/app/components/PortalComingSoon";

export default function Page() {
  return (
    <PortalComingSoon
      title="Government Authority Portal"
      description="The Government Authority Portal is currently under development and will be available in an upcoming update."
      features={[
        "Inspection Management",
        "Compliance Verification",
        "Monitoring Dashboard",
        "Analytics & Reports",
        "Authority Login",
      ]}
    />
  );
}