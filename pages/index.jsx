import withOutAuth from "@/auth/withOutAuth";
import LandingContent from "@/components/landingPage/LandingContent";

import MainLayout from "@/components/layout/MainLayout";

function Home() {
  return (
    <>
      <MainLayout
        showContentOnly={false}
        layoutProps={{ className: "", title: "Home" }}
      >
        <LandingContent />
      </MainLayout>
    </>
  );
}

export default withOutAuth(Home);
