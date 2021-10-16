const paginate = (totalItems, currentPage, pageSize, maxPages) => {
  let startPage;
  let endPage;

  if (currentPage === undefined) { currentPage = 1; }
  if (pageSize === undefined) { pageSize = 9; }
  if (maxPages === undefined) { maxPages = 10; }

  const totalPages = Math.ceil(totalItems / pageSize);

  if (currentPage < 1) {
    currentPage = 1;
  }
  else if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  if (totalPages <= maxPages) {
    startPage = 1;
    endPage = totalPages;
  }
  else {
    const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = maxPages;
    }
    else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    }
    else {
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  const pages = Array.from(Array((endPage + 1) - startPage).keys()).map((i) => startPage + i);

  return {
    totalItems,
    currentPage,
    pageSize,
    totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
    pages
  };
}
export default paginate;
