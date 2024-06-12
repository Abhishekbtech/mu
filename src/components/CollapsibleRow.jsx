import React, { useState } from 'react';

const CollapsibleRow = ({ data, hiddenColumns }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = (data) => {
        if (sortConfig.key) {
            return [...data].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return data;
    };

    return (
        <>
            <tr onClick={() => setIsOpen(!isOpen)} className="cursor-pointer bg-emerald-300  hover:text-blue-800 hover:text-xl transition-all duration-300">
                {Object.keys(data).map((key) =>
                    key !== 'task' && !hiddenColumns.includes(key) ? (
                        <td key={key} className="border px-4 py-2 ">
                            {data[key]}
                        </td>
                    ) : null
                )}
            </tr>
            {isOpen && data.task && (
                <tr>
                    <td colSpan={Object.keys(data).length} className="border px-4 py-2">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className='bg-emerald-600'>
                                    {Object.keys(data.task[0]).map((key) => (
                                        <th
                                            key={key}
                                            className="border px-4 py-2 cursor-pointer"
                                            onClick={() => handleSort(key)}
                                        >
                                            {key}
                                            {sortConfig.key === key ? (
                                                sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽'
                                            ) : null}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sortedData(data.task).map((task, index) => (
                                    <tr key={index} className='bg-emerald-200 hover:text-blue-800 hover:text-xl transition-all duration-300'>
                                        {Object.keys(task).map((key) => (
                                            <td key={key} className="border px-4 py-2">
                                                {task[key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </td>
                </tr>
            )}
        </>
    );
};

export default CollapsibleRow;
