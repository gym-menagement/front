import { forwardRef } from 'react';
import { theme } from '../../theme';
import Button from './Button';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean; // 처음/끝 버튼 표시 여부
  maxVisible?: number; // 한 번에 표시할 최대 페이지 수 (기본: 10)
}

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      showFirstLast = true,
      maxVisible = 10,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    // Generate page numbers array (최대 10개씩 표시)
    const generatePagination = () => {
      // If total pages is small, show all
      if (totalPages <= maxVisible) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      // 현재 페이지 기준으로 10개씩 그룹화
      const currentGroup = Math.floor((currentPage - 1) / maxVisible);
      const startPage = currentGroup * maxVisible + 1;
      const endPage = Math.min(startPage + maxVisible - 1, totalPages);

      const pages: (number | string)[] = [];

      // 첫 페이지 그룹이 아니면 ... 표시
      if (startPage > 1) {
        pages.push('...');
      }

      // 현재 그룹의 페이지들
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // 마지막 페이지 그룹이 아니면 ... 표시
      if (endPage < totalPages) {
        pages.push('...');
      }

      return pages;
    };

    const pages = generatePagination();

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing[1],
      ...style,
    };

    if (totalPages === 0) return null;

    return (
      <div ref={ref} className={`linear-pagination ${className}`} style={containerStyle} {...props}>
        {/* 처음으로 버튼 */}
        {showFirstLast && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            aria-label="First page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11 12L7 8L11 4M6 12L6 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        )}

        {/* 이전 버튼 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>

        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`dots-${index}`}
                style={{
                  padding: `0 ${theme.spacing[2]}`,
                  color: theme.colors.text.tertiary,
                  userSelect: 'none',
                }}
              >
                ...
              </span>
            );
          }

          const isCurrent = page === currentPage;
          return (
            <Button
              key={page}
              variant={isCurrent ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onPageChange(page as number)}
              style={
                isCurrent
                  ? {
                      background: theme.colors.background.tertiary,
                      color: theme.colors.text.primary,
                      fontWeight: theme.typography.fontWeight.semibold,
                    }
                  : {
                      fontWeight: theme.typography.fontWeight.normal,
                      color: theme.colors.text.secondary,
                    }
              }
            >
              {page}
            </Button>
          );
        })}

        {/* 다음 버튼 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>

        {/* 끝으로 버튼 */}
        {showFirstLast && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12L9 8L5 4M10 12L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        )}
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

export default Pagination;
