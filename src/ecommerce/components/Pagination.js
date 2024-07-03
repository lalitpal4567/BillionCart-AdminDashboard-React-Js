import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Generate an array of page numbers
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    // Handle page change
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {/* Previous button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageClick(currentPage - 1)}
                        aria-disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>

                {/* Page numbers */}
                {pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageClick(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}

                {/* Next button */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageClick(currentPage + 1)}
                        aria-disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
