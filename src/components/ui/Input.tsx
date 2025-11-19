import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { theme } from '../../theme';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  inputSize?: InputSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      inputSize = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const getSizeStyles = () => {
      const sizes = {
        sm: {
          padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
          fontSize: theme.typography.fontSize.sm,
          height: '32px',
        },
        md: {
          padding: `${theme.spacing[2.5]} ${theme.spacing[3.5]}`,
          fontSize: theme.typography.fontSize.base,
          height: '40px',
        },
        lg: {
          padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
          fontSize: theme.typography.fontSize.md,
          height: '48px',
        },
      };
      return sizes[inputSize];
    };

    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing[1.5],
      width: fullWidth ? '100%' : 'auto',
    };

    const labelStyles: React.CSSProperties = {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text.primary,
      lineHeight: theme.typography.lineHeight.normal,
    };

    const inputWrapperStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    };

    const inputStyles: React.CSSProperties = {
      width: '100%',
      background: theme.colors.background.primary,
      color: theme.colors.text.primary,
      border: error
        ? `1px solid ${theme.colors.semantic.error}`
        : isFocused
        ? `1px solid ${theme.colors.border.focus}`
        : `1px solid ${theme.colors.border.light}`,
      borderRadius: theme.borderRadius.md,
      outline: 'none',
      lineHeight: theme.typography.lineHeight.normal,
      transition: `all ${theme.effects.transition.duration[150]} ${theme.effects.transition.timing.inOut}`,
      boxShadow: isFocused ? theme.boxShadow.focus : theme.boxShadow.xs,
      paddingLeft: leftIcon ? `${theme.spacing[10]}` : undefined,
      paddingRight: rightIcon ? `${theme.spacing[10]}` : undefined,
      ...getSizeStyles(),
      ...style,
    };

    const iconStyles: React.CSSProperties = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colors.text.tertiary,
      pointerEvents: 'none',
    };

    const leftIconStyles: React.CSSProperties = {
      ...iconStyles,
      left: theme.spacing[3],
    };

    const rightIconStyles: React.CSSProperties = {
      ...iconStyles,
      right: theme.spacing[3],
    };

    const helperTextStyles: React.CSSProperties = {
      fontSize: theme.typography.fontSize.sm,
      color: error ? theme.colors.semantic.error : theme.colors.text.secondary,
      lineHeight: theme.typography.lineHeight.normal,
    };

    return (
      <div style={containerStyles} className={`linear-input-container ${className}`}>
        {label && <label style={labelStyles}>{label}</label>}
        <div style={inputWrapperStyles}>
          {leftIcon && <span style={leftIconStyles}>{leftIcon}</span>}
          <input
            ref={ref}
            disabled={disabled}
            style={{
              ...inputStyles,
              cursor: disabled ? 'not-allowed' : 'text',
              opacity: disabled ? theme.effects.opacity[50] : theme.effects.opacity[100],
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {rightIcon && <span style={rightIconStyles}>{rightIcon}</span>}
        </div>
        {(error || helperText) && <span style={helperTextStyles}>{error || helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
