
import React from "react";

const Loader = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] isolation-isolate"
      style={{ zIndex: 9999 }}
    >
      <div className="flex justify-center items-center bg-white p-4 shadow-xl rounded-full">
        <div className="animate-flip-horizontal">
          <svg
            width="60"
            height="60"
            viewBox="0 0 143 145"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="98" cy="13" r="13" fill="#5291CD" />
            <circle cx="45" cy="13" r="13" fill="#FCBB2D" />
            <path
              d="M38 144.5V41.5001H49.5V59.0001C58.0236 43.8083 65.0459 39.0847 82.5 39.0001V52.0001C63.7404 51.5761 57.9145 57.934 53.6565 69.9362C51.6683 75.5405 51 81.517 51 87.4636V144.5H38Z"
              fill="#5291CD"
            />
            <path d="M92 144.5V41H104V144.5H92Z" fill="#6193B5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loader;
