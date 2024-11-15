"use client";

import { useState } from "react";

export default function ToggleButton() {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggle = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={toggle}
        className="w-16 h-8 flex items-center rounded-full p-1 transition-all duration-300 bg-slate-200"
      >
        <div
          className={`w-9 h-full ${
            isEnabled ? "bg-blue-600 " : ""
          } rounded-full`}
        ></div>
        <div
          className={`w-9 h-full ${
            isEnabled ? "" : "bg-white"
          } rounded-full`}
        ></div>
      </button>
      
    </div>
  );
}
