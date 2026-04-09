interface RatingCirclesProps {
  selectedRating: number; // 1–5
}

export function RatingCircles({ selectedRating }: RatingCirclesProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0' }}>
      {[1, 2, 3, 4, 5].map((rating) => {
        const isSelected = rating === selectedRating;
        return (
          <div
            key={rating}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              lineHeight: '20px',
              flexShrink: 0,
              background: isSelected ? 'var(--color-primary-strong)' : 'white',
              border: isSelected ? 'none' : '1px solid var(--color-border-neutral-medium)',
              color: isSelected ? 'white' : 'var(--color-text-neutral-medium)',
            }}
          >
            {rating}
          </div>
        );
      })}
    </div>
  );
}

export default RatingCircles;
