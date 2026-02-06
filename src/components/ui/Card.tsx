import { forwardRef, type HTMLAttributes } from 'react';
import { theme } from '../../theme';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'ghost';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  clickable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hoverable = false,
      clickable = false,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const getVariantStyles = (): React.CSSProperties => {
      const variants = {
        default: {
          background: theme.colors.background.primary,
          border: `1px solid ${theme.colors.border.light}`,
          boxShadow: theme.boxShadow.sm,
        },
        elevated: {
          background: theme.colors.background.elevated,
          border: 'none',
          boxShadow: theme.boxShadow.md,
        },
        outlined: {
          background: 'transparent',
          border: `1px solid ${theme.colors.border.light}`,
          boxShadow: 'none',
        },
        ghost: {
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
        },
      };
      return variants[variant];
    };

    const getPaddingStyles = (): React.CSSProperties => {
      const paddings = {
        none: { padding: '0' },
        sm: { padding: theme.spacing[3] },
        md: { padding: theme.spacing[6] },
        lg: { padding: theme.spacing[8] },
        xl: { padding: theme.spacing[10] },
      };
      return paddings[padding];
    };

    const baseStyles: React.CSSProperties = {
      borderRadius: theme.borderRadius.xl,
      transition: `all ${theme.effects.transition.duration[150]} ${theme.effects.transition.timing.inOut}`,
      cursor: clickable ? 'pointer' : 'default',
      ...getVariantStyles(),
      ...getPaddingStyles(),
      ...style,
    };

    const hoverStyles: React.CSSProperties = hoverable || clickable
      ? {
          transform: 'translateY(-2px)',
          boxShadow: variant === 'ghost' ? theme.boxShadow.sm : theme.boxShadow.lg,
        }
      : {};

    return (
      <div
        ref={ref}
        className={`linear-card ${className}`}
        style={baseStyles}
        onMouseEnter={(e) => {
          if (hoverable || clickable) {
            Object.assign(e.currentTarget.style, hoverStyles);
          }
        }}
        onMouseLeave={(e) => {
          if (hoverable || clickable) {
            const variantStyles = getVariantStyles();
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = (variantStyles.boxShadow as string) || 'none';
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
