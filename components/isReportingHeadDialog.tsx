import React from 'react'
type Props = {
  handleIsReportingDialog:()=>void;
}
const isReportingHeadDialog = ({...Props}:Props) => {
  return (
    <div className=" absolute z-50 flex pt-10 items-end justify-center bg-black bg-opacity-50 w-full h-full inset-0">
          <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl border  md:max-w-[600px] md:max-h-[350px] gap-8 text-black md:text-md font-light relative">
              <div className='absolute right-5 top-3 cursor-pointer font-semibold text-xl' onClick={()=>{Props.handleIsReportingDialog()}}>X</div>
              <div className="text-2xl flex justify-center font-poppins pt-8">
                <svg
                  width="800px"
                  height="100px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16.99V17M12 7V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-center px-7 pb-5">
                <h1>Approval Matrix is not set for you. Kindly connect with Admin.</h1>
              </div>
            </div>
          </div>
        </div>
  )
}

export default isReportingHeadDialog