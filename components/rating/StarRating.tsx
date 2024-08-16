import React, { HTMLAttributes, useState } from "react";
import "./StarRating.css";

type StarRatingProps = {
  totalStars: number;
  size?: number;
  rating?: number;
  handleClick?: (value: number) => void;
} & HTMLAttributes<HTMLElement>;

const StarRating: React.FC<StarRatingProps> = ({
  totalStars,
  size = 24,
  rating = 0,
  handleClick = () => {},
  ...props
}) => {
  const [filledStars, setFilledStars] = useState<number>(rating);
  const [selectedStar, setSelectedStar] = useState<number | null>(rating);

  const handleStarHover = (hoveredStars: number): void => {
    setFilledStars(hoveredStars);
  };

  const handleStarLeave = () => {
    if (!selectedStar) {
      setFilledStars(0);
    } else {
      setFilledStars(selectedStar);
    }
  };

  const handleStarClick = (clickedStars: number): void => {
    setFilledStars(clickedStars);
    setSelectedStar(clickedStars);
    handleClick(clickedStars);
  };

  const renderStars = (): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${filledStars >= i ? "filled" : ""}`}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={() => handleStarLeave()}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      {...props}
      style={{ fontSize: `${size}px` }}
      className={`${props.className ? props.className : ""} starRating`}
    >
      {renderStars()}
    </div>
  );
};

export default StarRating;
