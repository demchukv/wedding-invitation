import ReviewsList from "@/components/reviews/reviews-list";

const AboutPage = () => {
  return (
    <div className="container mx-auto md:container lg:container">
      <h1 className="text-3xl">About service</h1>
      <ReviewsList />
    </div>
  );
};

export default AboutPage;
