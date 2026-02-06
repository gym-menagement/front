import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { theme } from '../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const getVariantStyles = (): React.CSSProperties => {
      const variants = {
        primary: {
          background: theme.colors.brand.primary,
          color: '#FFFFFF',
          border: 'none',
          boxShadow: theme.boxShadow.xs,
        },
        secondary: {
          background: 'transparent',
          color: theme.colors.text.primary,
          border: `1px solid ${theme.colors.border.light}`,
        },
        ghost: {
          background: 'transparent',
          color: theme.colors.text.secondary,
          border: 'none',
        },
        danger: {
          background: theme.colors.semantic.error,
          color: '#FFFFFF',
          border: 'none',
          boxShadow: theme.boxShadow.xs,
        },
      };
      return variants[variant];
    };

    const getSizeStyles = (): React.CSSProperties => {
      const sizes = {
        sm: {
          padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
          fontSize: theme.typography.fontSize.sm,
          height: '32px',
        },
        md: {
          padding: `${theme.spacing[2.5]} ${theme.spacing[4]}`,
          fontSize: theme.typography.fontSize.base,
          height: '40px',
        },
        lg: {
          padding: `${theme.spacing[3]} ${theme.spacing[5]}`,
          fontSize: theme.typography.fontSize.md,
          height: '48px',
        },
      };
      return sizes[size];
    };

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing[2],
      borderRadius: theme.borderRadius.md,
      fontWeight: theme.typography.fontWeight.medium,
      lineHeight: theme.typography.lineHeight.normal,
      transition: `all ${theme.effects.transition.duration[150]} ${theme.effects.transition.timing.inOut}`,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled || loading ? theme.effects.opacity[50] : theme.effects.opacity[100],
      width: fullWidth ? '100%' : 'auto',
      outline: 'none',
      userSelect: 'none',
      ...getVariantStyles(),
      ...getSizeStyles(),
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`linear-button ${className}`}
        style={baseStyles}
        onMouseEnter={(e) => {
          if (disabled || loading) return;
          const target = e.currentTarget;
          if (variant === 'primary') {
            target.style.background = theme.colors.brand.primaryHover;
          } else if (variant === 'secondary') {
            target.style.background = theme.colors.background.secondary;
          } else if (variant === 'ghost') {
            target.style.background = theme.colors.background.secondary;
            target.style.color = theme.colors.text.primary;
          } else if (variant === 'danger') {
            target.style.background = '#DC2626';
          }
        }}
        onMouseLeave={(e) => {
          if (disabled || loading) return;
          const target = e.currentTarget;
          const variantStyles = getVariantStyles();
          target.style.background = variantStyles.background as string;
          if (variant === 'ghost') {
            target.style.color = theme.colors.text.secondary;
          }
        }}
        onMouseDown={(e) => {
          if (disabled || loading) return;
          const target = e.currentTarget;
          if (variant === 'primary') {
            target.style.background = theme.colors.brand.primaryActive;
          } else if (variant === 'secondary') {
            target.style.background = theme.colors.background.tertiary;
          } else if (variant === 'ghost') {
            target.style.background = theme.colors.background.tertiary;
          } else if (variant === 'danger') {
            target.style.background = '#B91C1C';
          }
        }}
        onMouseUp={(e) => {
          if (disabled || loading) return;
          const target = e.currentTarget;
          if (variant === 'primary') {
            target.style.background = theme.colors.brand.primaryHover;
          } else if (variant === 'secondary') {
            target.style.background = theme.colors.background.secondary;
          } else if (variant === 'ghost') {
            target.style.background = theme.colors.background.secondary;
          } else if (variant === 'danger') {
            target.style.background = '#DC2626';
          }
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = theme.boxShadow.focus;
        }}
        onBlur={(e) => {
          const variantStyles = getVariantStyles();
          e.currentTarget.style.boxShadow = (variantStyles.boxShadow as string) || 'none';
        }}
        {...props}
      >
        {loading && (
          <span
            style={{
              width: '16px',
              height: '16px',
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
            }}
          />
        )}
        {!loading && leftIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
