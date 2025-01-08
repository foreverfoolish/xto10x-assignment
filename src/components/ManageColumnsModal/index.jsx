import React from "react";

const ManageColumnsModal = ({columns, setColumns, setIsColumnsModalOpen}) =>{
    const toggleColumnVisibility = (key) => {
        setColumns((prev) =>
          prev.map((col) =>
            col.key === key ? { ...col, visible: !col.visible } : col
          )
        );
      };

    return(
        <div
            style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
        >
            <div
            style={{
                backgroundColor: "#fff",
                padding: "2rem",
                borderRadius: "8px",
                width: "300px",
            }}
            >
            <h3 style={{ marginBottom: "1rem" }}>Toggle Columns</h3>
            {columns.map((col) => (
                <label key={col.key} style={{ display: "block", marginBottom: "0.5rem" }}>
                <input
                    type="checkbox"
                    checked={col.visible}
                    onChange={() => toggleColumnVisibility(col.key)}
                    style={{ marginRight: "0.5rem" }}
                />
                {col.label}
                </label>
            ))}
            <button
                onClick={() => setIsColumnsModalOpen(false)}
                style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "1rem",
                }}
            >
                Close
            </button>
            </div>
        </div>
    )
}

export default ManageColumnsModal;