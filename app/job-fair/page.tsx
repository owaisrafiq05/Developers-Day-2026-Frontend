import ComingSoon from "@/components/global/coming-soon";
import RegistrationBanner from "@/components/registration/registration-banner";

export const metadata = {
  title: "Job Fair | DevDay '26",
  description: "Job Fair at DevDay '26 – coming soon.",
};

export default function JobFairPage() {
  return (
    <>
      <ComingSoon
        title="JOB_FAIR"
        description="CONNECT_WITH_TOP_EMPLOYERS_AND_LAUNCH_YOUR_CAREER._COMING_SOON."
      />
      <RegistrationBanner />
    </>
  );
}
