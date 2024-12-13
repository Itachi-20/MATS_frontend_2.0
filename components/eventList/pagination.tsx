import React from 'react';
import { useState } from 'react';

type props = {
    currentPage:number,
    setCurrentPage: (value:number)=>void,
    total_event_list: number
}

export default function Pagination({...Props}:props){
    const [perPage, setPerPage] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(5);
    // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams.toString())
  //     params.set(name, value)
  //     return params.toString()
  //   },
  //   [searchParams]
  // )

  const handlePrev = async () => {
    if (Props.currentPage > 1) {
      Props.setCurrentPage(Props.currentPage - 1);
      // createQueryString("page", (currentPage-1).toString());
    }

  };
  const handleNext = async () => {
    Props.setCurrentPage(Props.currentPage + 1);
    // createQueryString("page", (currentPage+1).toString());
  };
  return (
    <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs font-normal">Showing {((Props.currentPage - 1) * perPage) + 1} to {(Props.currentPage + 1 - 1) * perPage} of {Props.total_event_list} entries</p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <button onClick={handlePrev} className={`bg-white border border-[#e5e7eb] rounded-md py-2 px-4 hover:bg-gray-50 disabled:bg-gray-100 ${Props.currentPage ? '' : 'disabled'}`}>
            Previous
          </button>
          <button onClick={handleNext} className={`bg-white border border-[#e5e7eb] rounded-md py-2 px-4 hover:bg-gray-50 disabled:bg-gray-100 ${Props.currentPage == (totalPages - 1) ? 'disabled' : ''}`}>
            Next
          </button>
        </div>
      </div>
  )
}

