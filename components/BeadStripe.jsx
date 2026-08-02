// Six-band Maasai beadwork-derived colour stripe, used as a recurring
// section divider across the site. Order is fixed per the brand spec.
const BAND_COLORS = [
  "var(--color-bone)",
  "var(--color-ochre)",
  "var(--color-earth)",
  "var(--color-indigo)",
  "var(--color-gold)",
  "var(--color-earth)",
];

export default function BeadStripe({ height = 7, reverse = false, className = "" }) {
  // Reversed order is used at section bottoms per the brand spec.
  const bands = reverse ? [...BAND_COLORS].reverse() : BAND_COLORS;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`flex w-full ${className}`}
      style={{ height: typeof height === "number" ? `${height}px` : height }}
    >
      {bands.map((color, index) => (
        <span
          key={index}
          className="flex-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
