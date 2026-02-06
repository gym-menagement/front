import type { HTMLAttributes, ReactNode } from 'react';
import { theme } from '../../theme';

export type HeroAlignment = 'left' | 'center';
export type HeroSize = 'md' | 'lg' | 'xl';

export interface HeroProps extends HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  description?: string;
  actions?: ReactNode;
  image?: ReactNode;
  alignment?: HeroAlignment;
  size?: HeroSize;
  background?: string;
  overlay?: boolean;
}

const Hero = ({
  title,
  subtitle,
  description,
  actions,
  image,
  alignment = 'center',
  size = 'lg',
  background,
  overlay = false,
  className = '',
  style,
  ...props
}: HeroProps) => {
  const getSizeStyles = () => {
    const sizes = {
      md: {
        padding: `${theme.spacing[16]} ${theme.spacing[6]}`,
        titleSize: theme.typography.fontSize['4xl'],
        subtitleSize: theme.typography.fontSize.xl,
      },
      lg: {
        padding: `${theme.spacing[24]} ${theme.spacing[6]}`,
        titleSize: theme.typography.fontSize['5xl'],
        subtitleSize: theme.typography.fontSize['2xl'],
      },
      xl: {
        padding: `${theme.spacing[32]} ${theme.spacing[6]}`,
        titleSize: theme.typography.fontSize['6xl'],
        subtitleSize: theme.typography.fontSize['3xl'],
      },
    };
    return sizes[size];
  };

  const sizeStyles = getSizeStyles();

  const heroStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    background: background || theme.colors.background.wash,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    ...style,
  };

  const overlayStyles: React.CSSProperties = overlay
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.colors.background.overlay,
        zIndex: theme.zIndex[10],
      }
    : {};

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    zIndex: theme.zIndex[20],
    maxWidth: '1280px',
    margin: '0 auto',
    padding: sizeStyles.padding,
    display: 'flex',
    flexDirection: image ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing[12],
  };

  const contentStyles: React.CSSProperties = {
    flex: image ? '1' : 'auto',
    textAlign: alignment,
    maxWidth: image ? '600px' : alignment === 'center' ? '800px' : '100%',
    margin: alignment === 'center' && !image ? '0 auto' : '0',
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.brand.primary,
    textTransform: 'uppercase',
    letterSpacing: theme.typography.letterSpacing.wider,
    marginBottom: theme.spacing[3],
  };

  const titleStyles: React.CSSProperties = {
    fontSize: sizeStyles.titleSize,
    fontWeight: theme.typography.fontWeight.extrabold,
    color: overlay ? '#FFFFFF' : theme.colors.text.primary,
    lineHeight: theme.typography.lineHeight.tight,
    marginBottom: theme.spacing[4],
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: sizeStyles.subtitleSize,
    color: overlay ? 'rgba(255, 255, 255, 0.9)' : theme.colors.text.secondary,
    lineHeight: theme.typography.lineHeight.relaxed,
    marginBottom: theme.spacing[8],
  };

  const actionsStyles: React.CSSProperties = {
    display: 'flex',
    gap: theme.spacing[3],
    justifyContent: alignment === 'center' ? 'center' : 'flex-start',
    flexWrap: 'wrap',
  };

  const imageContainerStyles: React.CSSProperties = {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '600px',
  };

  const mediaQueryStyles = `
    @media (max-width: 768px) {
      .hero-container {
        flex-direction: column !important;
        text-align: center !important;
      }
      .hero-content {
        text-align: center !important;
        max-width: 100% !important;
      }
      .hero-actions {
        justify-content: center !important;
      }
      .hero-title {
        font-size: ${theme.typography.fontSize['3xl']} !important;
      }
      .hero-description {
        font-size: ${theme.typography.fontSize.lg} !important;
      }
    }
  `;

  return (
    <>
      <style>{mediaQueryStyles}</style>
      <section className={`linear-hero ${className}`} style={heroStyles} {...props}>
        {overlay && <div style={overlayStyles} />}
        <div className="hero-container" style={containerStyles}>
          <div className="hero-content" style={contentStyles}>
            {subtitle && <div style={subtitleStyles}>{subtitle}</div>}
            <h1 className="hero-title" style={titleStyles}>{title}</h1>
            {description && <p className="hero-description" style={descriptionStyles}>{description}</p>}
            {actions && <div className="hero-actions" style={actionsStyles}>{actions}</div>}
          </div>
          {image && <div style={imageContainerStyles}>{image}</div>}
        </div>
      </section>
    </>
  );
};

export default Hero;
