interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div
      className={
        centered ? 'text-center max-w-3xl mx-auto' : ''
      }
    >
      {badge && (
        <span className="uppercase tracking-wide text-teal font-semibold text-sm">
          {badge}
        </span>
      )}
      <h2 className="text-section font-bold text-gray-900 mt-2">{title}</h2>
      {subtitle && (
        <p className="text-body-lg text-gray-600 mt-4">{subtitle}</p>
      )}
    </div>
  );
}
