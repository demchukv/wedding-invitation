import { PageTitle } from "@/components/page-title";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InviTeam | Invitation design templates",
  description:
    "Choose a design to start creating your invitation with InviTeam.",
};
const TemplatesPage = () => {
  return (
    <>
      <PageTitle className="mb-[56px] mt-[56px] self-center">
        Templates
      </PageTitle>
    </>
  );
};

export default TemplatesPage;
