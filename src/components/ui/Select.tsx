import React from 'react';
import { theme } from '../../theme';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  selectSize?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      selectSize = 'md',
      fullWidth = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: {
        padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
        fontSize: theme.typography.fontSize.sm,
      },
      md: {
        padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
        fontSize: theme.typography.fontSize.base,
      },
      lg: {
        padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
        fontSize: theme.typography.fontSize.lg,
      },
    };

    const selectStyles: React.CSSProperties = {
      width: fullWidth ? '100%' : 'auto',
      ...sizeStyles[selectSize],
      borderRadius: theme.borderRadius.md,
      border: `1px solid ${error ? theme.colors.semantic.error : theme.colors.border.light}`,
      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary,
      cursor: 'pointer',
      outline: 'none',
      transition: `all ${theme.effects.transition.duration[200]} ${theme.effects.transition.timing.inOut}`,
      fontFamily: 'inherit',
      ...style,
    };

    const labelStyles: React.CSSProperties = {
      display: 'block',
      marginBottom: theme.spacing[1],
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text.primary,
    };

    const helperStyles: React.CSSProperties = {
      marginTop: theme.spacing[1],
      fontSize: theme.typography.fontSize.sm,
      color: error ? theme.colors.semantic.error : theme.colors.text.secondary,
    };

    return (
      <div style={{ width: fullWidth ? '100%' : 'auto' }}>
        {label && <label style={labelStyles}>{label}</label>}
        <select
          ref={ref}
          className={className}
          style={selectStyles}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {(error || helperText) && (
          <div style={helperStyles}>{error || helperText}</div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
