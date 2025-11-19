import { HTMLAttributes, ReactNode } from 'react';
import { theme } from '../../theme';

export interface FooterColumn {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  description?: string;
  columns?: FooterColumn[];
  socialLinks?: ReactNode;
  copyright?: string;
  bottomLinks?: ReactNode;
}

const Footer = ({
  logo,
  description,
  columns = [],
  socialLinks,
  copyright,
  bottomLinks,
  className = '',
  style,
  ...props
}: FooterProps) => {
  const footerStyles: React.CSSProperties = {
    background: theme.colors.background.primary,
    borderTop: `1px solid ${theme.colors.border.light}`,
    ...style,
  };

  const containerStyles: React.CSSProperties = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `${theme.spacing[12]} ${theme.spacing[6]}`,
  };

  const topSectionStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing[8],
    marginBottom: theme.spacing[12],
  };

  const brandSectionStyles: React.CSSProperties = {
    gridColumn: 'span 2',
    maxWidth: '400px',
  };

  const logoStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[3],
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.lineHeight.relaxed,
    marginBottom: theme.spacing[4],
  };

  const columnTitleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[3],
    textTransform: 'uppercase',
    letterSpacing: theme.typography.letterSpacing.wider,
  };

  const linkStyles: React.CSSProperties = {
    display: 'block',
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    textDecoration: 'none',
    marginBottom: theme.spacing[2],
    transition: `color ${theme.effects.transition.duration[150]} ${theme.effects.transition.timing.inOut}`,
  };

  const bottomSectionStyles: React.CSSProperties = {
    paddingTop: theme.spacing[8],
    borderTop: `1px solid ${theme.colors.border.light}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing[4],
  };

  const copyrightStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
  };

  const mediaQueryStyles = `
    @media (max-width: 768px) {
      .footer-brand-section {
        grid-column: span 1 !important;
      }
      .footer-bottom-section {
        flex-direction: column;
        align-items: flex-start !important;
      }
    }
  `;

  return (
    <>
      <style>{mediaQueryStyles}</style>
      <footer className={`linear-footer ${className}`} style={footerStyles} {...props}>
        <div style={containerStyles}>
          {/* Top Section */}
          <div style={topSectionStyles}>
            {/* Brand Section */}
            {(logo || description || socialLinks) && (
              <div className="footer-brand-section" style={brandSectionStyles}>
                {logo && <div style={logoStyles}>{logo}</div>}
                {description && <p style={descriptionStyles}>{description}</p>}
                {socialLinks && <div>{socialLinks}</div>}
              </div>
            )}

            {/* Column Links */}
            {columns.map((column, index) => (
              <div key={index}>
                <h3 style={columnTitleStyles}>{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    style={linkStyles}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme.colors.text.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme.colors.text.secondary;
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          {(copyright || bottomLinks) && (
            <div className="footer-bottom-section" style={bottomSectionStyles}>
              {copyright && <div style={copyrightStyles}>{copyright}</div>}
              {bottomLinks && <div style={{ display: 'flex', gap: theme.spacing[4] }}>{bottomLinks}</div>}
            </div>
          )}
        </div>
      </footer>
    </>
  );
};

export default Footer;
