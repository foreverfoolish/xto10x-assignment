import React from "react";

const FilterSection = ({ filters, setFilters, setIsColumnsModalOpen }) => {
	const handleFilterChange = (key, filter) => {
		setFilters({ ...filters, [key]: filter });
	};
	return (
		<div className="table-actions">
			<input
				type="text"
				placeholder="Filter by Name"
				onChange={(e) =>
					handleFilterChange("name", { type: "text", value: e.target.value })
				}
			/>
			<div>
				Range filters on amount:
				<input
					type="number"
					placeholder="Min Amount"
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
					onChange={(e) =>
						handleFilterChange("amount", {
							type: "range",
							min: filters.amount?.min || 0,
							max: Number(e.target.value || Infinity),
						})
					}
				/>
			</div>
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
			>
				Manage Columns
			</button>
		</div>
	);
};

export default FilterSection;
