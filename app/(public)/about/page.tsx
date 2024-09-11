import { ReviewsList } from "@/components/reviews/reviews-list";
import { PageTitle } from "@/components/page-title";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InviTeam | About service",
  description: "Information about wedding invitation service InviTeam",
};
const AboutPage = () => {
  return (
    <>
      <PageTitle className="mb-[56px] mt-[56px] self-center">
        About service
      </PageTitle>
    </>
  );
};

export default AboutPage;
