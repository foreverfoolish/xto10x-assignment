import React from 'react'

const PageSelector = ({totalPages, currentPage, setCurrentPage}) => {
  return (
    <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
            <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
            >
                {i + 1}
            </button>
        ))}
    </div>
  )
}

export default PageSelector;
