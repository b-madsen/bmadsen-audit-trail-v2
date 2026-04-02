import { IconV2, BodyText } from '@bamboohr/fabric';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '4px 8px',
          border: '1px solid var(--border-neutral-medium)',
          borderRadius: '4px',
          background: 'white',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.5 : 1,
        }}
      >
        <IconV2 name="chevron-left-solid" size={12} color="neutral-strong" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            padding: '4px 12px',
            border: page === currentPage ? '1px solid var(--color-primary-strong)' : '1px solid var(--border-neutral-medium)',
            borderRadius: '4px',
            background: page === currentPage ? 'var(--color-primary-strong)' : 'white',
            color: page === currentPage ? 'white' : 'inherit',
            cursor: 'pointer',
          }}
        >
          <BodyText size="small" color={page === currentPage ? 'neutral-inverted' : undefined}>
            {page}
          </BodyText>
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '4px 8px',
          border: '1px solid var(--border-neutral-medium)',
          borderRadius: '4px',
          background: 'white',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.5 : 1,
        }}
      >
        <IconV2 name="chevron-right-solid" size={12} color="neutral-strong" />
      </button>
    </div>
  );
}

export default Pagination;
