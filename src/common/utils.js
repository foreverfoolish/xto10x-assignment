export const handleSort = (key, sortColumns, setSortColumns) => {
    const existingSort = sortColumns.find((col) => col.key === key);
    let updatedSortColumns;

    if (existingSort) {
        if (existingSort.order === "asc") {
            existingSort.order = "desc";
        } else {
            updatedSortColumns = sortColumns.filter((col) => col.key !== key);
        }
    } else {
        updatedSortColumns = [...sortColumns, { key, order: "asc" }];
    }

    setSortColumns(updatedSortColumns || [...sortColumns]);
};

export const applyFilters = (data, filters) => {
    return data.filter((row) => {
        for (const key in filters) {
            const filter = filters[key];
            if (filter.type === "range") {
                const value = row[key];
                if (value < filter.min || value > filter.max) return false;
            } else if (filter.type === "text") {
                if (!row[key].toLowerCase().includes(filter.value.toLowerCase())) {
                    return false;
                }
            }
        }
        return true;
    });
};

export const addPageOnScroll = (target, fetching, data, setFetching, setCurrentPage, paginatedData) => {
    if (
        target.scrollTop + target.clientHeight >= target.scrollHeight &&
        !fetching &&
        paginatedData.length < data.length
    ) {
        setFetching(true);
        setTimeout(() => {
            setCurrentPage((prev) => prev + 1);
            setFetching(false);
        }, 500);
    }
}