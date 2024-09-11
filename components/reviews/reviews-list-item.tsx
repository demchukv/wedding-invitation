"use server";

import { ReviewType } from "@/types/review";
import Image from "next/image";
import star from "@/public/icons/star.svg";
import quotes from "@/public/icons/quotes.svg";

export const ReviewsListItem = ({ review }: { review: ReviewType }) => {
  return (
    <li className="flex flex-col justify-between items-start relative rounded-[2px] border-[0.5px] border-mbrown gap-1 p-6 text-mblack">
      <div className="flex items-center justify-between absolute top-[-14px] left-3 right-3 text-mdarkbrown z-10">
        <div className="flex flex-row bg-mlightgreybg px-2">
          <p className="text-xl">{review.rating}</p>
          <Image priority src={star} alt={"star"} width={16} height={16} />
        </div>
        <div className=" bg-mlightgreybg px-2  ">
          <Image priority src={quotes} alt={"quotes"} width={24} height={24} />
        </div>
      </div>
      <p className="text-lg mb-8">{review.message}</p>
      <p className="font-bold text-sm leading-[20.8px] absolute bottom-6 right-6">
        {review.name}
      </p>
    </li>
  );
};
