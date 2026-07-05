export default function BrandMark({ width, height }: { width: number; height: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 94 72">
      <polygon points="0,0 22,0 46,36 22,72 0,72 24,36" fill="#2A3B5E" />
      <polygon points="24,0 46,0 70,36 46,72 24,72 48,36" fill="#3A62C4" />
      <polygon points="48,0 70,0 94,36 70,72 48,72 72,36" fill="#4D7FFF" />
    </svg>
  );
}
