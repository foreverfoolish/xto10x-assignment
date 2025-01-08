import React, { useState, useMemo } from "react";
import tableData from "../../data/tableData";
import "./ConfigurableTable.css";
import ManageColumnsModal from "../ManageColumnsModal";
import PaginationSelector from "./PaginationSelector";
import FilterSection from "./FilterSection";
import PageSelector from "./PageSelector";
import { addPageOnScroll, applyFilters, handleSort } from "../../common/utils";

const ConfigurableTable = () => {
	const data = tableData;
	const [filters, setFilters] = useState({});
	const [isColumnsModalOpen, setIsColumnsModalOpen] = useState(false);
	const [fetching, setFetching] = useState(false);
	const [paginationType, setPaginationType] = useState("pages");
	const [currentPage, setCurrentPage] = useState(1);
	const [sortColumns, setSortColumns] = useState([]);

	const pageSize = 10;
	const [columns, setColumns] = useState([
		{ key: "id", label: "ID", visible: true },
		{ key: "name", label: "Name", visible: true },
		{ key: "date", label: "Date", visible: true },
		{ key: "status", label: "Status", visible: true },
		{ key: "amount", label: "Amount", visible: true },
	]);

	const applySort = (data) => {
		if (sortColumns.length === 0) return data;

		return [...data].sort((a, b) => {
			for (const { key, order } of sortColumns) {
				if (a[key] < b[key]) return order === "asc" ? -1 : 1;
				if (a[key] > b[key]) return order === "asc" ? 1 : -1;
			}
			return 0;
		});
	};

	const filteredAndSortedData = useMemo(() => {
		return applySort(applyFilters(data, filters));
	}, [data, sortColumns, filters]);


	const paginatedData =
		paginationType === "pages"
			? filteredAndSortedData.slice(
					(currentPage - 1) * pageSize,
					currentPage * pageSize
			  )
			: filteredAndSortedData.slice(0, currentPage * 10);

	const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

	const handleScroll = (e) => {
		const target = e.target;
		addPageOnScroll(target, fetching, data, setFetching, setCurrentPage, paginatedData)
	};

	return (
		<div className="table-container">
			<PaginationSelector
				setCurrentPage={setCurrentPage}
				setPaginationType={setPaginationType}
				paginationType={paginationType}
			/>
			<FilterSection
				filters={filters}
				setFilters={setFilters}
				setIsColumnsModalOpen={setIsColumnsModalOpen}
			/>

			<div
				style={{
					maxHeight: `${paginationType === "scroll" ? "620px" : "none"}`,
					overflowY: "auto",
					border: "1px solid #ddd",
				}}
				onScroll={handleScroll}
			>
				<table>
					<thead>
						<tr>
							{columns
								.filter((col) => col.visible)
								.map((col) => (
									<th
										key={col.key}
										onClick={() => handleSort(col.key, sortColumns, setSortColumns)}
										className={
											sortColumns.find((sc) => sc.key === col.key)?.order || ""
										}
									>
										{col.label}
									</th>
								))}
						</tr>
					</thead>
					<tbody>
						{paginatedData.map((row) => (
							<tr key={row.id}>
								{columns
									.filter((col) => col.visible)
									.map((col) => (
										<td key={col.key}>{row[col.key]}</td>
									))}
							</tr>
						))}
					</tbody>
				</table>
				{paginationType === "scroll" && fetching && (
					<p style={{ textAlign: "center" }}>Loading...</p>
				)}
			</div>

            {paginationType === "pages" && (
                <PageSelector totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            )}

			{isColumnsModalOpen && (
				<ManageColumnsModal
					columns={columns}
                    setColumns={setColumns}
					setIsColumnsModalOpen={setIsColumnsModalOpen}
				/>
			)}
		</div>
	);
};

export default ConfigurableTable;
