import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  primary: 'bg-gold hover:bg-gold-light text-navy-dark font-semibold',
  secondary: 'bg-navy hover:bg-navy-light text-white font-semibold',
  ghost: 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
} as const;

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
} as const;

export function CTAButton({
  href,
  children,
  variant,
  size = 'md',
  className = '',
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center min-h-[56px] rounded-button transition-colors duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
