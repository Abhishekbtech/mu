import React, { useState } from 'react';
import Table from './Table';
import Result from './data.json';

const data = Result.data;

const Dashboard = () => {
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const handleDepartmentClick = (department) => {
        setSelectedDepartment(department === selectedDepartment ? null : department);
    };

    const onSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortConfig.key) {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        }
        return data;
    });

    return (
        <div className="p-4">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-emerald-600">
                        {['S. No.', 'Department', 'Total Tasks', 'In Progress', 'In Pipeline', 'For Review', 'Unassigned'].map((header, index) => (
                            <th
                                key={index}
                                className="border px-4 py-2 cursor-pointer"
                                onClick={() => onSort(header)}
                            >
                                {header}
                                {sortConfig.key === header ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ''}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((department, index) => (
                        <React.Fragment key={index}>
                            <tr className="bg-emerald-400 cursor-pointer hover:text-blue-800 hover:text-xl transition-all duration-300" onClick={() => handleDepartmentClick(department)}>
                                <td className="border px-4 py-2">{department['S. No.']}</td>
                                <td className="border px-4 py-2">{department.Department}</td>
                                <td className="border px-4 py-2">{department['Total Tasks']}</td>
                                <td className="border px-4 py-2">{department['In Progress']}</td>
                                <td className="border px-4 py-2">{department['In Pipeline']}</td>
                                <td className="border px-4 py-2">{department['For Review']}</td>
                                <td className="border px-4 py-2">{department.Unassigned}</td>
                            </tr>
                            {selectedDepartment === department && (
                                <tr>
                                    <td colSpan="7" className="border px-4 py-2">
                                        <Table data={department} />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
