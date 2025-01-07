import React, { useState } from "react";
import tableData from "../data/tableData";
import columns from "../data/columnsConfig";
import "./ConfigurableTable.css";

const ConfigurableTable = () => {
  const [data, setData] = useState(tableData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [filterText, setFilterText] = useState("");

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterText(value);
    setData(
      tableData.filter((row) =>
        row.name.toLowerCase().includes(value)
      )
    );
  };

  const pageSize = 10; 
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <div className="table-container">
      <div className="table-actions">
        <input
          type="text"
          placeholder="Filter by Name"
          value={filterText}
          onChange={handleFilter}
        />
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className={sortConfig.key === col.key ? sortConfig.direction : ""}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
};

export default ConfigurableTable;
