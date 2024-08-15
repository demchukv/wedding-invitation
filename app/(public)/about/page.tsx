import { ReviewsList } from "@/components/reviews/reviews-list";

const AboutPage = () => {
  return (
    <div className="w-full">
      <h1 className="text-3xl">About service</h1>
      <ReviewsList take={6} />
    </div>
  );
};

export default AboutPage;
