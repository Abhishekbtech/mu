import React from 'react';

const CollapsibleColumn = ({ col, hiddenColumns, toggleColumn, onSort, sortConfig }) => {
    return (
        <th
            onClick={() => onSort(col)}
            className={`border px-4 py-2 cursor-pointer ${hiddenColumns.includes(col) ? 'hidden' : ''
                }`}
        >
            {col}
            {sortConfig.key === col ? (
                sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽'
            ) : null}
        </th>
    );
};

export default CollapsibleColumn;
