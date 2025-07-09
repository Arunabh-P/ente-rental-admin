import React from 'react';
import SelectField from './select-field';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface PaginationControlsProps {
    page: number;
    limit: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
    page,
    limit,
    totalItems,
    onPageChange,
    onLimitChange
}) => {
    const totalPages = Math.ceil(totalItems / limit);
    const generatePageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 6) {
            // Show all pages directly
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first 3 pages
            pages.push(1);
            if (page > 4) pages.push('...');

            if (page > 3 && page < totalPages - 2) {
                pages.push(page - 1, page, page + 1);
            } else if (page <= 4) {
                pages.push(2, 3, 4);
            } else if (page >= totalPages - 3) {
                pages.push(totalPages - 4, totalPages - 3, totalPages - 2);
            }

            if (page < totalPages - 3) pages.push('...');
            pages.push(totalPages - 1, totalPages);
        }

        // Remove duplicates and keep order
        return [...new Set(pages)];
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-2 lg:gap-4 mt-6 border border-gray-200 rounded-md lg:rounded-xl p-3 lg:p-5 ">
            <div className="flex items-center gap-2">
                <label htmlFor="limit" className='text-[12px] md:text-[14px] lg:text-[16px]'>Items per page : </label>
                <div className="relative w-fit">
                    <select
                        id="limit"
                        value={limit}
                        onChange={(e) => {
                            onLimitChange(Number(e.target.value));
                            onPageChange(1);
                        }}
                        className="appearance-none text-[12px] md:text-[12px] lg:text-[14px] px-2 lg:px-3 py-1 bg-white border border-gray-200 rounded pr-6 cursor-pointer max-w-[60px] lg:min-w-[60px]"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                    <MdKeyboardArrowDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 text-sm lg:text-lg" />
                </div>

            </div>
            <div className="flex items-center gap-1 lg:gap-2 flex-wrap">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                    className="px-2 lg:px-3 py-1 bg-white border border-gray-200 rounded disabled:opacity-50 text-[12px] md:text-[12px] lg:text-[14px] cursor-pointer disabled:cursor-default"
                >
                    Prev
                </button>

                {pageNumbers.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => typeof item === 'number' && onPageChange(item)}
                        disabled={item === '...'}
                        className={`text-[12px] md:text-[12px] lg:text-[14px] px-2 lg:px-3 py-1 rounded ${page === item ? 'bg-black text-white' : 'bg-white border border-gray-200'} ${item === '...' ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                        {item}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-2 lg:px-3 py-1 bg-white border border-gray-200 rounded disabled:opacity-50 text-[12px] md:text-[12px] lg:text-[14px] cursor-pointer disabled:cursor-default"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationControls;
