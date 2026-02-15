
import { Search, Calendar, Filter, UserCircle, ChevronDown } from "lucide-react";
import { Employee } from "../_types";


interface FilterBarProps {
    searchTerm: string;
    onSearchChange: (val: string) => void;

    dateFilter: 'All' | 'Today';
    onDateChange: (val: 'All' | 'Today') => void;

    statusFilter: string;
    onStatusChange: (val: string) => void;

    employeeFilter: string;
    onEmployeeChange: (val: string) => void;
    employees?: Employee[];
}

export default function FilterBar({
    searchTerm,
    onSearchChange,
    dateFilter,
    onDateChange,
    statusFilter,
    onStatusChange,
    employeeFilter,
    onEmployeeChange,
    employees = []
}: FilterBarProps) {
    return (
        <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                    type="text"
                    placeholder="Search Order ID or Customer..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-[#1E1E1E] border border-gray-800 rounded-xl py-2.5 pl-12 pr-4 text-sm text-gray-200 focus:outline-none focus:border-teal-500 transition-colors"
                />
            </div>

            {/* Date Filter */}
            <button
                onClick={() => onDateChange(dateFilter === 'Today' ? 'All' : 'Today')}
                className={`border rounded-xl px-4 py-2.5 text-sm flex items-center gap-2 transition-all ${dateFilter === 'Today'
                    ? 'bg-[#4FD1C5]/10 border-[#4FD1C5] text-[#4FD1C5]'
                    : 'bg-[#1E1E1E] border-gray-800 text-gray-300 hover:bg-[#252525]'
                    }`}
            >
                <Calendar size={16} />
                {dateFilter === 'Today' ? 'Today Only' : 'All Dates'}
            </button>

            {/* Status Filter */}
            <div className="relative">
                <select
                    value={statusFilter}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="appearance-none bg-[#1E1E1E] border border-gray-800 rounded-xl px-4 py-2.5 pl-10 pr-8 text-sm text-gray-300 focus:outline-none hover:bg-[#252525] cursor-pointer min-w-[140px]"
                >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Ready">Ready</option>
                    <option value="Completed">Completed</option>
                </select>
                <Filter size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>

            {/* Employee Filter */}
            <div className="relative">
                <select
                    value={employeeFilter}
                    onChange={(e) => onEmployeeChange(e.target.value)}
                    className="appearance-none bg-[#1E1E1E] border border-gray-800 rounded-xl px-4 py-2.5 pl-10 pr-8 text-sm text-gray-300 focus:outline-none hover:bg-[#252525] cursor-pointer min-w-[150px]"
                >
                    <option value="All">All Employees</option>
                    {employees.map((employee) => (
                        <option key={employee.id} value={employee.name}>
                            {employee.name}
                        </option>
                    ))}
                </select>
                <UserCircle size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
        </div>
    );
}
