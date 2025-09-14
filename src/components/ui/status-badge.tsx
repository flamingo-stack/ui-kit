import React from 'react';
import { cn } from '../../utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const statusBadgeVariants = cva(
  "inline-flex items-center justify-center rounded font-['Azeret_Mono'] font-medium uppercase tracking-wide",
  {
    variants: {
      variant: {
        card: "px-3 py-1.5 text-sm",
        button: "px-2 py-0.5 text-[10px] leading-none",
      },
      colorScheme: {
        cyan: "bg-[var(--ods-flamingo-cyan-base)] text-ods-text-on-accent",
        pink: "bg-[var(--ods-flamingo-pink-base)] text-ods-text-on-accent",
        yellow: "bg-[var(--ods-flamingo-yellow-base)] text-ods-text-on-accent",
        green: "bg-[var(--ods-flamingo-green-base)] text-ods-text-on-accent",
        purple: "bg-[var(--ods-flamingo-purple-base)] text-ods-text-on-accent",
        default: "bg-ods-bg-secondary text-ods-text-primary",
      },
    },
    defaultVariants: {
      variant: "card",
      colorScheme: "default",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  text: string;
}

function StatusBadge({
  text,
  variant,
  colorScheme,
  className,
  ...props
}: StatusBadgeProps) {
  // For button variant, split text into multiple lines for narrow badges
  const renderText = () => {
    if (variant === 'button' && text.includes(' ')) {
      const words = text.split(' ');
      return (
        <div className="flex flex-col items-center justify-center text-center gap-0">
          {words.map((word, index) => (
            <div key={index}>{word}</div>
          ))}
        </div>
      );
    }
    return text;
  };

  return (
    <div
      className={cn(statusBadgeVariants({ variant, colorScheme }), className)}
      {...props}
    >
      {renderText()}
    </div>
  );
}

export { StatusBadge, statusBadgeVariants };