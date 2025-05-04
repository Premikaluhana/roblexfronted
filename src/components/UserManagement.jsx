import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../utlis/Api';

const UserManagement = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 1;

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  // Get current page data
  const currentData = data ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLeaderboard();
      setData(response);
    };
    fetchData();
  }, []);

  // Reset currentPage to 1 when data changes to avoid out of range page
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-start gap-12">
      <div className="w-full bg-[#181d35] rounded-xl p-8 flex flex-col items-center gap-10 shadow-lg">
        <h1 className="font-extrabold text-4xl flex items-center gap-5 select-none">
          User Management
        </h1>
        {/* user cards */}
        <div className="items-center w-full gap-2 grid grid-cols-4">
          {currentData?.map((v, k) => (
            <div key={k} className="w-ful text-center flex gap-2 flex-col items-center">
              <div className="w-25 h-25 rounded-full border border-[#b3c1ff] flex items-center justify-center">
                <img
                  alt={v.username}
                  className="w-full h-full object-cover"
                  src={v.avatar}
                />
              </div>
              <h2 className="font-extrabold text-xl">{v.username}</h2>
              <p className="font-semibold flex items-center gap-3 text-sm whitespace-nowrap">
                <span>Earned: {v.robuxBalance}</span>
                <i
                  aria-hidden="true"
                  className="fas fa-cube text-[#0F6B4A]"
                  style={{ textShadow: "0 0 2px #0f6b4a" }}
                ></i>
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination controls */}
      {data && data.length > itemsPerPage && (
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="flex items-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
