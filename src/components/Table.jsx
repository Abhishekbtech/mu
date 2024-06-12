import React, { useState } from 'react';
import CollapsibleRow from './CollapsibleRow';
import CollapsibleColumn from './CollapsibleColumn';

const Table = ({ data }) => {
    const [hiddenColumns, setHiddenColumns] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const toggleColumn = (col) => {
        setHiddenColumns((prev) =>
            prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
        );
    };

    const onSort = (col) => {
        let direction = 'ascending';
        if (sortConfig.key === col && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key: col, direction });
    };

    const sortedData = React.useMemo(() => {
        if (sortConfig.key) {
            return [...data.subDepartments].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return data.subDepartments;
    }, [data.subDepartments, sortConfig]);

    return (
        <div className="mb-8">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className='bg-emerald-600 '>
                        {Object.keys(data.subDepartments[0]).map((key) =>
                            key !== 'task' ? (
                                <CollapsibleColumn
                                    key={key}
                                    col={key}
                                    hiddenColumns={hiddenColumns}
                                    toggleColumn={toggleColumn}
                                    onSort={onSort}
                                    sortConfig={sortConfig}
                                />
                            ) : null
                        )}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((subDept, index) => (
                        <CollapsibleRow key={index} data={subDept} hiddenColumns={hiddenColumns} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
