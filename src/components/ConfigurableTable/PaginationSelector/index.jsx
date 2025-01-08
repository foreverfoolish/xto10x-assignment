import React from 'react'

const PaginationSelector = ({setCurrentPage, setPaginationType, paginationType}) => {
    const handlePaginationTypeChange = (e) => {
        setCurrentPage(1);
        setPaginationType(e.target.value);
      };
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
        Pagination type:
        <label>
        <input
            type="radio"
            name="toggle"
            value="pages"
            checked={paginationType === "pages"}
            onChange={handlePaginationTypeChange}
        />
        Pagination
        </label>
        <label>
        <input
            type="radio"
            name="toggle"
            value="scroll"
            checked={paginationType === "scroll"}
            onChange={handlePaginationTypeChange}
        />
        Scroll
        </label>
    </div>
  )
}

export default PaginationSelector;
