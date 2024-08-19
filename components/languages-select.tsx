"use client";

import Image from "next/image";
import iconUA from "@/public/icons/ua.svg";

export const LanguagesSelect = () => {
  return (
    <div className="text-xl flex gap-2">
      <Image priority src={iconUA} alt="menu" width={36} height={24} /> UA
    </div>
  );
};
