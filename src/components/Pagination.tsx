type IProps = {
  totalItem: number;
  page: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalPage: number;
  onSelectPage: (p: number) => void;
};
const Pagination = ({
  totalItem,
  page,
  size,
  totalPage,
  onSelectPage,
  hasNext,
  hasPrevious,
}: IProps) => {
  const getPageMeta = () => {
    return {
      from: (page - 1) * size + 1,
      to: Math.min(page * size, totalItem),
      page,
      totalPage,
      totalItem,
    };
  };

  const visiblePages = Array.from(
    { length: totalPage },
    (_, i) => i + 1
  ).filter(p => p >= page - 2 && p <= page + 2);

  return (
    <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-[var(--color-muted)]">
            Showing
            <span className="font-medium"> {getPageMeta().from} </span>
            to
            <span className="font-medium"> {getPageMeta().to} </span>
            of
            <span className="font-medium"> {getPageMeta().totalItem} </span>
            results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md"
          >
            <button
              onClick={() => hasPrevious && onSelectPage(page - 1)}
              className={`relative inline-flex transition-all ease-in duration-150 ${hasPrevious ? 'cursor-pointer' : 'cursor-not-allowed'} items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-[#313031] hover:bg-white/5 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                data-slot="icon"
                aria-hidden="true"
                className="size-5"
              >
                <path
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            {/* Current: "z-10 text-white focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-500 focus-visible:outline-indigo-500", Default: "inset-ring focus:outline-offset-0 text-gray-200 inset-ring-[#313031] hover:bg-white/5" */}
            {visiblePages.map(p => (
              <a
                key={p}
                className={`relative transition-all ease-in duration-150 inline-flex items-center px-4 py-2 text-sm font-semibold rounded ${!hasNext ? 'rounded-l-none' : 'rounded-r-none'} ${
                  p === page
                    ? 'z-10 bg-indigo-500 text-white focus-visible:outline-indigo-500'
                    : 'cursor-pointer text-gray-200 inset-ring inset-ring-[#313031] hover:!bg-white/5'
                }`}
                onClick={() => onSelectPage(p)}
              >
                {p}
              </a>
            ))}
            <button
              onClick={() => hasNext && onSelectPage(page + 1)}
              className={`relative inline-flex transition-all ease-in duration-150 items-center ${hasNext ? 'cursor-pointer' : 'cursor-not-allowed'} rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-[#313031] hover:bg-white/5 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Next</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                data-slot="icon"
                aria-hidden="true"
                className="size-5"
              >
                <path
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
