import { IconV2 } from '@bamboohr/fabric';

interface StarRatingProps {
  rating: number; // 1-5
  className?: string;
}

export function StarRating({ rating, className = '' }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {stars.map((star) => {
        const isFilled = star <= rating;
        return (
          <IconV2
            key={star}
            name="star-solid"
            size={16}
            color={isFilled ? 'warning-strong' : 'neutral-weak'}
          />
        );
      })}
    </div>
  );
}

export default StarRating;
