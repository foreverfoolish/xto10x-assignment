import React from "react";

const FilterSection = ({ filters, setFilters, setIsColumnsModalOpen }) => {
	const handleFilterChange = (key, filter) => {
		setFilters({ ...filters, [key]: filter });
	};
	return (
		<div className="table-actions">
            <div className="name-and-column">
                <input
                    type="text"
                    placeholder="Filter by Name"
                    className="name-filter"
                    onChange={(e) =>
                        handleFilterChange("name", { type: "text", value: e.target.value })
                    }
                />
                <button
                    onClick={() => setIsColumnsModalOpen(true)}
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                    className="manage-column-button"
                >
                    Manage Columns
                </button>
            </div>
			<div className="range-filters">
				Range filters on amount:&nbsp;
				<input
					type="number"
					placeholder="Min Amount"
                    className="range-filter"
					onChange={(e) =>
						handleFilterChange("amount", {
							type: "range",
							min: Number(e.target.value || 0),
							max: filters.amount?.max || Infinity,
						})
					}
				/>
				<input
					type="number"
					placeholder="Max Amount"
                    className="range-filter"
					onChange={(e) =>
						handleFilterChange("amount", {
							type: "range",
							min: filters.amount?.min || 0,
							max: Number(e.target.value || Infinity),
						})
					}
				/>
			</div>
		</div>
	);
};

export default FilterSection;
