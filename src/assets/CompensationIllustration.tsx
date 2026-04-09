export function CompensationIllustration() {
  return (
    <svg width="120" height="96" viewBox="0 0 120 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Coin */}
      <circle cx="34" cy="40" r="28" fill="#E0E0E0" stroke="#CACACA" strokeWidth="2" />
      <circle cx="34" cy="40" r="20" fill="#D4D4D4" stroke="#BDBDBD" strokeWidth="1.5" />
      <text x="34" y="46" textAnchor="middle" fontSize="18" fontWeight="600" fill="#B0B0B0" fontFamily="sans-serif">$</text>

      {/* Bars — increasing height, right side */}
      <rect x="64" y="72" width="12" height="16" rx="2" fill="#D9D9D9" />
      <rect x="80" y="56" width="12" height="32" rx="2" fill="#D9D9D9" />
      <rect x="96" y="40" width="12" height="48" rx="2" fill="#D9D9D9" />
      <rect x="112" y="24" width="8" height="64" rx="2" fill="#D9D9D9" />
    </svg>
  );
}
