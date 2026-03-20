import ComingSoon from "@/components/global/coming-soon";
import RegistrationBanner from "@/components/registration/registration-banner";

export const metadata = {
  title: "Food Fest | DevDay '26",
  description: "Food Fest at DevDay '26 – coming soon.",
};

export default function FoodFestPage() {
  return (
    <>
      <ComingSoon
        title="FOOD_FEST"
        description="FUEL_UP_FOR_THE_COMPETITION._A_DELICIOUS_EXPERIENCE_AWAITS._COMING_SOON."
      />
      <RegistrationBanner />
    </>
  );
}
