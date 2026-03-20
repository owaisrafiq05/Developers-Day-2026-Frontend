import ComingSoon from "@/components/global/coming-soon";
import RegistrationBanner from "@/components/registration/registration-banner";

export const metadata = {
  title: "Mini Games | DevDay '26",
  description: "Mini Games at DevDay '26 – coming soon.",
};

export default function MiniGamesPage() {
  return (
    <>
      <ComingSoon
        title="MINI_GAMES"
        description="TAKE_A_BREAK_AND_COMPETE_FOR_FUN._MINI_GAMES_COMING_SOON."
      />
      <RegistrationBanner />
    </>
  );
}
