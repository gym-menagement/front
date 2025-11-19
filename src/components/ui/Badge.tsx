import { HTMLAttributes, forwardRef } from 'react';
import { theme } from '../../theme';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      dot = false,
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
          background: theme.colors.background.tertiary,
          color: theme.colors.text.secondary,
        },
        success: {
          background: theme.colors.semantic.successSubtle,
          color: theme.colors.semantic.success,
        },
        warning: {
          background: theme.colors.semantic.warningSubtle,
          color: theme.colors.text.warning,
        },
        error: {
          background: theme.colors.semantic.errorSubtle,
          color: theme.colors.semantic.error,
        },
        info: {
          background: theme.colors.semantic.infoSubtle,
          color: theme.colors.semantic.info,
        },
      };
      return variants[variant];
    };

    const getSizeStyles = (): React.CSSProperties => {
      const sizes = {
        sm: {
          padding: `${theme.spacing[0.5]} ${theme.spacing[2]}`,
          fontSize: theme.typography.fontSize.xs,
          height: '20px',
        },
        md: {
          padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
          fontSize: theme.typography.fontSize.sm,
          height: '24px',
        },
        lg: {
          padding: `${theme.spacing[1.5]} ${theme.spacing[3]}`,
          fontSize: theme.typography.fontSize.base,
          height: '28px',
        },
      };
      return sizes[size];
    };

    const dotStyles: React.CSSProperties = {
      width: '6px',
      height: '6px',
      borderRadius: theme.borderRadius.full,
      background: 'currentColor',
      marginRight: theme.spacing[1.5],
    };

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.md,
      fontWeight: theme.typography.fontWeight.medium,
      lineHeight: theme.typography.lineHeight.tight,
      whiteSpace: 'nowrap',
      userSelect: 'none',
      ...getVariantStyles(),
      ...getSizeStyles(),
      ...style,
    };

    return (
      <span
        ref={ref}
        className={`linear-badge ${className}`}
        style={baseStyles}
        {...props}
      >
        {dot && <span style={dotStyles} />}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
