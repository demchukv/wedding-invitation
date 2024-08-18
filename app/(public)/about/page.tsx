import { ReviewsList } from "@/components/reviews/reviews-list";
import { PageTitle } from "@/components/page-title";

const AboutPage = () => {
  return (
    <>
      <PageTitle className="mb-[56px] mt-[56px] self-center">
        About service
      </PageTitle>
      <ReviewsList take={6} />
    </>
  );
};

export default AboutPage;
