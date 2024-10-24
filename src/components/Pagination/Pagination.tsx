// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   const pageButtonsToShow = 5; // Number of pages to display around the current page
//   const pages = [];

//   if (totalPages <= pageButtonsToShow + 2) {
//     // If total pages are less than or equal to the limit, show all pages
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(i);
//     }
//   } else {
//     // If total pages exceed the limit
//     let startPage = Math.max(2, currentPage - Math.floor(pageButtonsToShow / 2));
//     let endPage = Math.min(totalPages - 1, currentPage + Math.floor(pageButtonsToShow / 2));

//     // Adjust the start and end if they go out of bounds
//     if (currentPage < Math.floor(pageButtonsToShow / 2) + 2) {
//       endPage = pageButtonsToShow;
//     }
//     if (currentPage > totalPages - Math.floor(pageButtonsToShow / 2) - 2) {
//       startPage = totalPages - pageButtonsToShow + 1;
//     }

//     pages.push(1); // Always show the first page

//     if (startPage > 2) {
//       pages.push('...'); // Ellipsis for pages before the startPage
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }

//     if (endPage < totalPages - 1) {
//       pages.push('...'); // Ellipsis for pages after the endPage
//     }

//     pages.push(totalPages); // Always show the last page
//   }

//   return (
//     <div className="flex justify-center gap-2 mt-6 mb-4 flex-wrap">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-4 py-2 rounded-md bg-white border border-stroke text-black disabled:opacity-50 dark:bg-gray-dark dark:text-white"
//       >
//         Previous
//       </button>

//       {pages.map((page, index) => (
//         <button
//           key={index}
//           onClick={() => typeof page === 'number' && onPageChange(page)}
//           disabled={typeof page !== 'number'}
//           className={`px-4 py-2 rounded-md ${
//             currentPage === page
//               ? "bg-primary text-white"
//               : "bg-white border border-stroke text-black dark:bg-gray-dark dark:text-white"
//           } ${typeof page !== 'number' && 'cursor-default'}`} // Disable pointer events for ellipses
//         >
//           {page}
//         </button>
//       ))}

//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-4 py-2 rounded-md bg-white border border-stroke text-black disabled:opacity-50 dark:bg-gray-dark dark:text-white"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const pageButtonsToShow = 5; // Number of pages to display around the current page
  const pages = [];

  if (totalPages <= pageButtonsToShow + 2) {
    // If total pages are less than or equal to the limit, show all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // If total pages exceed the limit
    let startPage = Math.max(2, currentPage - Math.floor(pageButtonsToShow / 2));
    let endPage = Math.min(totalPages - 1, currentPage + Math.floor(pageButtonsToShow / 2));

    // Adjust the start and end if they go out of bounds
    if (currentPage < Math.floor(pageButtonsToShow / 2) + 2) {
      endPage = pageButtonsToShow;
    }
    if (currentPage > totalPages - Math.floor(pageButtonsToShow / 2) - 2) {
      startPage = totalPages - pageButtonsToShow + 1;
    }

    pages.push(1); // Always show the first page

    if (startPage > 2) {
      pages.push('...'); // Ellipsis for pages before the startPage
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push('...'); // Ellipsis for pages after the endPage
    }

    pages.push(totalPages); // Always show the last page
  }

  return (
    <div className="flex justify-center gap-2 mt-6 mb-4 flex-wrap">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md bg-white border border-stroke text-black disabled:opacity-50 dark:bg-gray-dark dark:text-white"
      >
        Previous
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => {
            if(typeof page === 'number')
            {
              setCurrentPage(page)
            }
          }}
          disabled={typeof page !== 'number'}
          className={`px-4 py-2 rounded-md ${
            currentPage === page
              ? "bg-primary text-white"
              : "bg-white border border-stroke text-black dark:bg-gray-dark dark:text-white"
          } ${typeof page !== 'number' && 'cursor-default'}`} // Disable pointer events for ellipses
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-white border border-stroke text-black disabled:opacity-50 dark:bg-gray-dark dark:text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
