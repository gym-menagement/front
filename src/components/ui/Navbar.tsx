import { HTMLAttributes, ReactNode, useState } from 'react';
import { theme } from '../../theme';

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  leftItems?: ReactNode;
  rightItems?: ReactNode;
  sticky?: boolean;
  transparent?: boolean;
  bordered?: boolean;
}

const Navbar = ({
  logo,
  leftItems,
  rightItems,
  sticky = true,
  transparent = false,
  bordered = true,
  className = '',
  style,
  ...props
}: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navStyles: React.CSSProperties = {
    position: sticky ? 'sticky' : 'relative',
    top: sticky ? 0 : undefined,
    width: '100%',
    background: transparent ? 'transparent' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: transparent ? 'none' : 'blur(12px)',
    borderBottom: bordered ? '1px solid rgba(230, 232, 235, 0.8)' : 'none',
    zIndex: theme.zIndex.sticky,
    transition: `all ${theme.effects.transition.duration[200]} ${theme.effects.transition.timing.inOut}`,
    ...style,
  };

  const containerStyles: React.CSSProperties = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `${theme.spacing[4]} ${theme.spacing[6]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const logoStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[2],
  };

  const navItemsStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[2],
  };

  const mobileMenuButtonStyles: React.CSSProperties = {
    display: 'none',
    padding: theme.spacing[2],
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: theme.colors.text.primary,
  };

  const mobileMenuStyles: React.CSSProperties = {
    display: 'none',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: theme.colors.background.primary,
    borderBottom: `1px solid ${theme.colors.border.light}`,
    padding: theme.spacing[4],
    flexDirection: 'column',
    gap: theme.spacing[3],
    boxShadow: theme.boxShadow.lg,
  };

  const mediaQueryStyles = `
    @media (max-width: 768px) {
      .navbar-items {
        display: none !important;
      }
      .navbar-mobile-button {
        display: flex !important;
      }
      .navbar-mobile-menu {
        display: ${isMobileMenuOpen ? 'flex' : 'none'} !important;
      }
    }
  `;

  const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  return (
    <>
      <style>{mediaQueryStyles}</style>
      <nav className={`linear-navbar ${className}`} style={navStyles} {...props}>
        <div style={containerStyles}>
          <div style={logoStyles}>{logo}</div>

          {/* Desktop Navigation */}
          <div className="navbar-items" style={navItemsStyles}>
            {leftItems}
          </div>

          <div className="navbar-items" style={navItemsStyles}>
            {rightItems}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="navbar-mobile-button"
            style={mobileMenuButtonStyles}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="navbar-mobile-menu" style={mobileMenuStyles}>
          {leftItems}
          {rightItems}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
