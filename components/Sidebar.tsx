import React from "react";

const Sidebar = () => {
  const moduleItems: string[] = [
    "Training & Education",
    "Awareness Program",
    "Monetary Grant",
    "HCP Services",
    "Poor Patient Support",
    "Sponsorship Support",
    "Non Monetary Grant",
  ];
  return (
    <div  className="flex flex-col justify-between h-screen">
      <div className="pt-10 text-black flex  flex-col">
        <div className="flex gap-3 pl-1">
          <svg
            className="mt-3 "
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              id="Ellipse 35"
              cx="20"
              cy="20"
              r="15"
              stroke="black"
              stroke-width="10"
            />
          </svg>
          <h1 className="text-black text-[40px] font-semibold pb-6">
            Mats
          </h1>
        </div>
        <div className="flex flex-col text-black gap-4">
          {/* <div className="group" id="parent"> */}
          <div id="parent">
            <div className="flex py-2 gap-2 pl-2 hover:border hover:rounded-xl hover:bg-[#4430bf] group hover:text-white hover:cursor-pointer">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Graph 1">
                  <mask
                    id="mask0_1630_2781"
                    //maskType="luminance"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="32"
                    height="32"
                  >
                    <rect
                      id="Graph 1 (Background/Mask)"
                      width="32"
                      height="32"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0_1630_2781)">
                    <path
                      id="Vector"
                      d="M13.6702 7.8457L14.0414 13.3656L14.2257 16.14C14.2277 16.4254 14.2723 16.7088 14.3586 16.9812C14.5811 17.51 15.1166 17.846 15.6991 17.8226L24.5754 17.2419C24.9598 17.2356 25.331 17.3794 25.6073 17.6416C25.8375 17.8602 25.9862 18.146 26.0331 18.4535L26.0489 18.6402C25.6815 23.7264 21.9459 27.9688 16.8702 29.0639C11.7944 30.159 6.58947 27.8456 4.08127 23.3798C3.35818 22.0823 2.90652 20.6563 2.75283 19.1852C2.68863 18.7498 2.66036 18.3099 2.6683 17.8699C2.66036 12.4169 6.54362 7.70253 11.9794 6.56601C12.6337 6.46413 13.275 6.81048 13.5374 7.40729C13.6053 7.5455 13.6501 7.69353 13.6702 7.8457Z"
                      fill="#636363"
                    />
                    <path
                      id="Vector_2"
                      opacity="0.4"
                      d="M29.3337 13.0829L29.3244 13.1263L29.2975 13.1895L29.3012 13.363C29.2873 13.5928 29.1985 13.8138 29.0457 13.9925C28.8864 14.1785 28.6688 14.3052 28.4292 14.3544L28.2831 14.3744L18.042 15.038C17.7013 15.0716 17.3621 14.9617 17.1089 14.7358C16.8977 14.5474 16.7628 14.2933 16.7247 14.0194L16.0373 3.79325C16.0253 3.75868 16.0253 3.7212 16.0373 3.68661C16.0467 3.40473 16.1708 3.13829 16.3819 2.94681C16.5928 2.75533 16.8733 2.65477 17.1604 2.6676C23.2403 2.82228 28.3501 7.19422 29.3337 13.0829Z"
                      fill="#636363"
                    />
                  </g>
                </g>
              </svg>

              <h1 className="pt-1">Modules</h1>
            </div>
            <div id="element" className="z-10" >
            {/* <div className="hidden group-hover:block duration-100 delay-100 transition-all" id="element"> */}
              {moduleItems &&
                moduleItems.map((data,index) => {
                  return (
                    <div key={index} className="child py-4 px-5 rounded-bl-xl text-black  border-l border-black ml-4 relative text-nowrap ">
                      <div className="absolute -bottom-5 hover:bg-white rounded-xl text-black hover:text-[#4430bf] text-[12px] px-1 py-2 cursor-pointer">
                        {data}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex py-2 gap-2 pl-2 hover:border hover:rounded-xl hover:bg-[#4430bf] hover:text-white hover:cursor-pointer">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Interface / Chart_Line">
                <path
                  id="Vector"
                  d="M28 26.6667H4V6.66675"
                  stroke="#636363"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  id="Vector_2"
                  opacity="0.4"
                  d="M28 9.33325L17.3333 18.6666L12 13.3333L4 19.9999"
                  stroke="#636363"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
            <h1 className="pt-1">Reports</h1>
          </div>
          <div className=" flex py-2 gap-2 pl-2 hover:border hover:rounded-xl hover:bg-[#4430bf] hover:text-white hover:cursor-pointer">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="mdi:cog-outline">
                <path
                  id="Vector"
                  d="M13.3329 29.3334C12.9995 29.3334 12.7195 29.0934 12.6662 28.7734L12.1729 25.2401C11.3329 24.9067 10.6129 24.4534 9.91953 23.9201L6.59953 25.2668C6.3062 25.3734 5.9462 25.2667 5.7862 24.9734L3.11953 20.3601C3.03793 20.2227 3.00916 20.0603 3.0386 19.9032C3.06805 19.7462 3.1537 19.6052 3.27953 19.5067L6.09286 17.2934L5.99953 16.0001L6.09286 14.6667L3.27953 12.4934C3.1537 12.3949 3.06805 12.254 3.0386 12.0969C3.00916 11.9399 3.03793 11.7775 3.11953 11.6401L5.7862 7.02675C5.9462 6.73341 6.3062 6.61342 6.59953 6.73342L9.91953 8.06675C10.6129 7.54675 11.3329 7.09342 12.1729 6.76008L12.6662 3.22675C12.7195 2.90675 12.9995 2.66675 13.3329 2.66675H18.6662C18.9995 2.66675 19.2795 2.90675 19.3329 3.22675L19.8262 6.76008C20.6662 7.09342 21.3862 7.54675 22.0795 8.06675L25.3995 6.73342C25.6929 6.61342 26.0529 6.73341 26.2129 7.02675L28.8795 11.6401C29.0529 11.9334 28.9729 12.2934 28.7195 12.4934L25.9062 14.6667L25.9995 16.0001L25.9062 17.3334L28.7195 19.5067C28.9729 19.7067 29.0529 20.0667 28.8795 20.3601L26.2129 24.9734C26.0529 25.2667 25.6929 25.3868 25.3995 25.2668L22.0795 23.9334C21.3862 24.4534 20.6662 24.9067 19.8262 25.2401L19.3329 28.7734C19.2795 29.0934 18.9995 29.3334 18.6662 29.3334H13.3329ZM14.9995 5.33341L14.5062 8.81342C12.9062 9.14675 11.4929 10.0001 10.4662 11.1867L7.25286 9.80008L6.25286 11.5334L9.0662 13.6001C8.53286 15.1556 8.53286 16.8445 9.0662 18.4001L6.23953 20.4801L7.23953 22.2134L10.4795 20.8267C11.5062 22.0001 12.9062 22.8534 14.4929 23.1734L14.9862 26.6667H17.0129L17.5062 23.1867C19.0929 22.8534 20.4929 22.0001 21.5195 20.8267L24.7595 22.2134L25.7595 20.4801L22.9329 18.4134C23.4662 16.8534 23.4662 15.1601 22.9329 13.6001L25.7462 11.5334L24.7462 9.80008L21.5329 11.1867C20.4852 9.97385 19.064 9.14365 17.4929 8.82675L16.9995 5.33341H14.9995Z"
                  fill="#636363"
                />
                <circle
                  id="Ellipse 106"
                  opacity="0.4"
                  cx="16"
                  cy="16"
                  r="3.75"
                  stroke="#636363"
                  stroke-width="2.5"
                />
              </g>
            </svg>
            <h1 className="pt-1">Settings</h1>
          </div>
        </div>
      </div>
      <div className="pb-24 flex gap-3 pl-3">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Sign Out Icon">
            <g id="Group 923">
              <path
                id="Union"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.7741 22.2011L26.3365 16.8777C26.5544 16.6292 26.6659 16.3154 26.666 16C26.6661 15.7842 26.6141 15.5676 26.5085 15.3706C26.4615 15.2828 26.4041 15.1994 26.3365 15.1223L21.7741 9.79894C21.2949 9.23982 20.4532 9.17502 19.8941 9.65422C19.3349 10.1334 19.2702 10.9751 19.7494 11.5343L22.4339 14.6666L12.1077 14.6666C11.3713 14.6666 10.7744 15.2636 10.7744 15.9999C10.7744 16.7363 11.3713 17.3333 12.1077 17.3333L22.4341 17.3333L19.7494 20.4658C19.2702 21.0249 19.3349 21.8666 19.8941 22.3458C20.4532 22.825 21.2949 22.7602 21.7741 22.2011ZM13.3327 7.99992C14.0691 7.99992 14.666 8.59687 14.666 9.33325L14.666 11.3333C14.666 12.0696 15.263 12.6666 15.9993 12.6666C16.7357 12.6666 17.3327 12.0696 17.3327 11.3333L17.3327 9.33325C17.3327 7.12411 15.5418 5.33325 13.3327 5.33325L9.33268 5.33325C7.12354 5.33325 5.33268 7.12411 5.33268 9.33325L5.33268 22.6666C5.33268 24.8757 7.12354 26.6666 9.33268 26.6666L13.3327 26.6666C15.5418 26.6666 17.3327 24.8757 17.3327 22.6666L17.3327 20.6666C17.3327 19.9302 16.7357 19.3333 15.9993 19.3333C15.263 19.3333 14.666 19.9302 14.666 20.6666L14.666 22.6666C14.666 23.403 14.0691 23.9999 13.3327 23.9999L9.33268 23.9999C8.5963 23.9999 7.99935 23.403 7.99935 22.6666L7.99935 9.33325C7.99935 8.59687 8.5963 7.99992 9.33268 7.99992L13.3327 7.99992Z"
                fill="#636363"
              />
            </g>
          </g>
        </svg>
        <div className="mt-[0.5px] text-[#636363] text-lg font-normal font-Poppins">
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
