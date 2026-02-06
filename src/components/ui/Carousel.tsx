import { useState, useEffect, useCallback, Children, type ReactNode } from 'react';
import { theme } from '../../theme';

export interface CarouselProps {
  children: ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  infinite?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Carousel = ({
  children,
  autoPlay = false,
  autoPlayInterval = 3000,
  showDots = true,
  showArrows = true,
  infinite = true,
  className = '',
  style,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = Children.toArray(children);
  const totalSlides = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;

      let newIndex = index;
      if (infinite) {
        if (index < 0) {
          newIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
          newIndex = 0;
        }
      } else {
        if (index < 0 || index >= totalSlides) {
          return;
        }
      }

      setIsAnimating(true);
      setCurrentIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 300);
    },
    [infinite, totalSlides, isAnimating]
  );

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext]);

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    borderRadius: theme.borderRadius.xl,
    ...style,
  };

  const slidesContainerStyles: React.CSSProperties = {
    display: 'flex',
    transition: `transform ${theme.effects.transition.duration[300]} ${theme.effects.transition.timing.custom}`,
    transform: `translateX(-${currentIndex * 100}%)`,
  };

  const slideStyles: React.CSSProperties = {
    minWidth: '100%',
    flex: '0 0 100%',
  };

  const arrowButtonStyles = (position: 'left' | 'right'): React.CSSProperties => ({
    position: 'absolute',
    top: '50%',
    [position]: theme.spacing[4],
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    border: 'none',
    borderRadius: theme.borderRadius.full,
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: theme.zIndex[10],
    transition: `all ${theme.effects.transition.duration[150]} ${theme.effects.transition.timing.inOut}`,
    boxShadow: theme.boxShadow.md,
    opacity: (!infinite && ((position === 'left' && currentIndex === 0) || (position === 'right' && currentIndex === totalSlides - 1))) ? 0.3 : 1,
    pointerEvents: (!infinite && ((position === 'left' && currentIndex === 0) || (position === 'right' && currentIndex === totalSlides - 1))) ? 'none' : 'auto',
  });

  const dotsContainerStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: theme.spacing[4],
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: theme.spacing[2],
    zIndex: theme.zIndex[10],
  };

  const dotStyles = (isActive: boolean): React.CSSProperties => ({
    width: isActive ? '24px' : '8px',
    height: '8px',
    borderRadius: theme.borderRadius.full,
    background: isActive ? theme.colors.brand.primary : 'rgba(255, 255, 255, 0.5)',
    border: 'none',
    cursor: 'pointer',
    transition: `all ${theme.effects.transition.duration[300]} ${theme.effects.transition.timing.custom}`,
    boxShadow: theme.boxShadow.sm,
  });

  const ArrowLeft = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ArrowRight = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M7.5 15L12.5 10L7.5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className={`linear-carousel ${className}`} style={containerStyles}>
      <div style={slidesContainerStyles}>
        {slides.map((slide, index) => (
          <div key={index} style={slideStyles}>
            {slide}
          </div>
        ))}
      </div>

      {showArrows && totalSlides > 1 && (
        <>
          <button
            style={arrowButtonStyles('left')}
            onClick={goToPrevious}
            onMouseEnter={(e) => {
              if (infinite || currentIndex > 0) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
            aria-label="Previous slide"
          >
            <ArrowLeft />
          </button>
          <button
            style={arrowButtonStyles('right')}
            onClick={goToNext}
            onMouseEnter={(e) => {
              if (infinite || currentIndex < totalSlides - 1) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
            aria-label="Next slide"
          >
            <ArrowRight />
          </button>
        </>
      )}

      {showDots && totalSlides > 1 && (
        <div style={dotsContainerStyles}>
          {slides.map((_, index) => (
            <button
              key={index}
              style={dotStyles(index === currentIndex)}
              onClick={() => goToSlide(index)}
              onMouseEnter={(e) => {
                if (index !== currentIndex) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentIndex) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
