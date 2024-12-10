"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";
import Cookies from "js-cookie";
type modules = {
  module: string;
  route: string;
};
type reports = {
  name: string;
  route: string;
};

type settings = {
  name: string;
  route: string;
};
type masters = {
  name: string;
  route: string;
};

type sidebarItems = {
  modules: modules[];
  reports: reports[];
  settings: settings[];
  masters: masters[];
};

const Sidebar = () => {
  const router = useRouter();
  const { role, userid, name } = useAuth();
  let moduleItems: sidebarItems | null = null;

  if (role == "Event Requestor") {
    moduleItems = {
      modules: [
        {
          module: "Training & Education",
          route: "/training_and_education?forms=1",
        },
        {
          module: "Awareness Program",
          route: "/awareness_program?forms=1",
        },
        {
          module: "Monetary Grant",
          route: "/monetary_grant?forms=1",
        },
        {
          module: "HCP Services",
          route: "/hcp_services?forms=1",
        },
        {
          module: "Patient Support",
          route: "/patient_support?forms=1",
        },
        {
          module: "Sponsorship Support",
          route: "/sponsorship_support?forms=1",
        },
        {
          module: "Non Monetary Grant",
          route: "/non_monetary_grant?forms=1",
        },
        {
          module: "Event List",
          route: "/event_list",
        },
      ],
      masters: [],
      reports: [
        {
          name: "Document Repository Type",
          route: "/repository_document_type",
        },
        {
          name: "Document Repository List",
          route: "/repository_document_list",
        },
      ],
      settings: [
        {
          name: "Change Password",
          route: "/change_password",
        },
      ],
    };
  } else if (role == "Event Approver") {
    moduleItems = {
      modules: [
        {
          module: "Event Request Approval",
          route: "/event_approver_list",
        },
        {
          module: "Advance Approval",
          route: "/advance_payment",
        },
        {
          module: "Post Document Approval",
          route: "/post_activity_document_approval_list",
        },
      ],
      masters: [],
      reports: [
        {
          name: "Audit Trail",
          route: "/audit_trail",
        },
        {
          name: "Event Summary Repost",
          route: "/event_summary_report",
        },
      ],
      settings: [
        {
          name: "Change Password",
          route: "/change_password",
        },
      ],
    };
  } else if (role == "Event Compliance") {
    moduleItems = {
      modules: [
        {
          module: "Event Request Approval",
          route: "/event_approver_list",
        },
        {
          module: "Post Document Approval",
          route: "/post_activity_document_approval_list",
        },
      ],
      reports: [
        {
          name: "Audit Trail",
          route: "/audit_trail",
        },
        {
          name: "Event Summary Repost",
          route: "/event_summary_report",
        },
      ],
      masters: [
        {
          name: "Document Repository Type",
          route: "/repository_document_type",
        },
        {
          name: "Document Repository List",
          route: "/repository_document_list",
        },
      ],
      settings: [
        {
          name: "Change Password",
          route: "/change_password",
        },
      ],
    };
  } else if (role == "Event Finance") {
    moduleItems = {
      modules: [
        {
          module: "Advance Approval",
          route: "/advance_payment",
        },
        {
          module: "Post Expense Approval",
          route: "/post_expense_approval",
        },
      ],
      reports: [
        {
          name: "Audit Trail",
          route: "/audit_trail",
        },
        {
          name: "Event Summary Repost",
          route: "/event_summary_report",
        },
      ],
      masters: [
        {
          name: "Event Vendor",
          route: "/event_vendor_list",
        },
        {
          name: "Document Repository List",
          route: "/repository_document_list",
        },
        {
          name: "Document Repository Type",
          route: "/repository_document_Type",
        },
      ],
      settings: [
        {
          name: "Change Password",
          route: "/change_password",
        },
      ],
    };
  } else if (role == "Event Travel") {
    moduleItems = {
      modules: [
        {
          module: "Travel Expense",
          route: "/travel_desk",
        },
      ],
      reports: [
        {
          name: "Event Summary Repost",
          route: "/event_summary_report",
        },
      ],
      masters: [],
      settings: [
        {
          name: "Change Password",
          route: "/change_password",
        },
      ],
    };
  } else if (role == "Event Accounts") {
    moduleItems = {
      modules: [
        {
          module: "Account Approval",
          route: "/travel_desk",
        },
      ],
      reports: [
        {
          name: "Event Summary Repost",
          route: "/event_summary_report",
        },
      ],
      masters: [],
      settings: [
        {
          name: "Change Password",
          route: "/change_password",
        },
      ],
    };
  }

  const handleLogout = async () => {
    try {
      const response = await fetch(`/api/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        Cookies.remove("full_name");
        Cookies.remove("role");
        Cookies.remove("system_user");
        Cookies.remove("user_id");
        Cookies.remove("user_image");
        router.push("/");
      }
    } catch (error) {
      console.log("server error:- ", error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="pt-10 text-black flex  flex-col">
        <div className="flex items-start justify-start gap-1 pl-1 pb-2 cursor-pointer" onClick={() => { router.replace("/dashboard") }}>
          <div className="">
            <svg
              width="40"
              height="100"
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
          <h1 className="text-black text-[40px] font-semibold pt-6">MATS</h1>
        </div>
        <div className=" text-black">
          {/* <div className="group" id="parent"> */}
          <div className="group text-2xl">
            <button className=" text-gray-700 py-2 px-3 group-hover:text-white group-hover:bg-[#4430bf] group-hover:border group-hover:rounded-xl rounded inline-flex items-center gap-3">
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
                      fill="currentColor"
                    />
                    <path
                      id="Vector_2"
                      opacity="0.4"
                      d="M29.3337 13.0829L29.3244 13.1263L29.2975 13.1895L29.3012 13.363C29.2873 13.5928 29.1985 13.8138 29.0457 13.9925C28.8864 14.1785 28.6688 14.3052 28.4292 14.3544L28.2831 14.3744L18.042 15.038C17.7013 15.0716 17.3621 14.9617 17.1089 14.7358C16.8977 14.5474 16.7628 14.2933 16.7247 14.0194L16.0373 3.79325C16.0253 3.75868 16.0253 3.7212 16.0373 3.68661C16.0467 3.40473 16.1708 3.13829 16.3819 2.94681C16.5928 2.75533 16.8733 2.65477 17.1604 2.6676C23.2403 2.82228 28.3501 7.19422 29.3337 13.0829Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
              </svg>
              <span className="mr-1 text-[1.125rem]">Modules</span>
            </button>

            {/* menu list */}
            <ul className="rounded max-h-0 overflow-hidden transition-[max-height] duration-1000 ease-in-out text-gray-700 pt-1 w-56 px-5 group-hover:max-h-96 text-[0.625rem]">
              {moduleItems &&
                moduleItems.modules?.map((item, index) => {
                  return (
                    <li
                      className=" hover:bg-white hover:rounded-xl hover:text-[#4430bf] text-[12px] py-1 cursor-pointer max-w-fit px-2 relative text-nowrap"
                      onClick={() => {router.push(`${item.route}`);
                      }}
                    >
                      <div className="absolute -left-3 -top-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="37"
                          viewBox="0 0 13 37"
                          fill="none"
                        >
                          <path
                            d="M12 36L10.6 36C7.23969 36 5.55953 36 4.27606 35.346C3.14708 34.7708 2.2292 33.8529 1.65396 32.7239C1 31.4405 1 29.7603 1 26.4L0.999999 1"
                            stroke="#848484"
                            stroke-width="0.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>

                      {item.module}
                    </li>
                  );
                })}
            </ul>
          </div>
          {/* START SETTING MANU  */}
          {/* <div id="parent">
            <div className="flex py-2 gap-2 pl-2 hover:border hover:rounded-xl hover:bg-[#4430bf] group hover:text-white hover:cursor-pointer">
              
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M28 26.6665H4V6.6665" stroke="#636363" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path opacity="0.4" d="M28 9.3335L17.3333 18.6668L12 13.3335L4 20.0002" stroke="#636363" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              <h1 className="pt-1">Reports</h1>
            </div>           
            <div id="element" className="z-10" >
                {moduleItems &&
                  moduleItems.reports?.map((data,index) => { 
                    return (
                      <div key={index} className="child py-4 px-5 rounded-bl-xl text-black  border-l border-black ml-4 relative text-nowrap">
                       <Link href={data.route}>
                          <div className="absolute -bottom-9 hover:bg-white rounded-xl text-black hover:text-[#4430bf] text-[12px] px-1 my-5 py-2 cursor-pointer">
                          {data.name} 
                          </div>
                      </Link>
                      </div>
                    );
                  })}
            </div>           
          </div> */}
          <div className="group text-2xl">
            <button className=" text-gray-700 py-2 px-3 group-hover:text-white group-hover:bg-[#4430bf] group-hover:border group-hover:rounded-xl rounded inline-flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M28 26.667H4V6.66699" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path opacity="0.4" d="M28 9.33301L17.3333 18.6663L12 13.333L4 19.9997" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span className="mr-1 text-[1.125rem]">Reports</span>
            </button>

            {/* menu list */}
            <ul className="rounded max-h-0 overflow-hidden transition-[max-height] duration-1000 ease-in-out text-gray-700 pt-1 w-56 px-5 group-hover:max-h-96 text-[0.625rem]">
              {moduleItems &&
                moduleItems.reports?.map((item, index) => {
                  return (
                    <li
                      className=" hover:bg-white hover:rounded-xl hover:text-[#4430bf] text-[12px] py-1 cursor-pointer max-w-fit px-2 relative text-nowrap"
                      onClick={() => {router.push(`${item.route}`);
                      }}
                    >
                      <div className="absolute -left-3 -top-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="37"
                          viewBox="0 0 13 37"
                          fill="none"
                        >
                          <path
                            d="M12 36L10.6 36C7.23969 36 5.55953 36 4.27606 35.346C3.14708 34.7708 2.2292 33.8529 1.65396 32.7239C1 31.4405 1 29.7603 1 26.4L0.999999 1"
                            stroke="#848484"
                            stroke-width="0.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>

                      {item.name}
                    </li>
                  );
                })}
            </ul>
          </div>
          {/* END SETTING MANU  */}

          {
            (role == "Event Compliance" || role == "Event Finance") &&
            <div className="group text-2xl">
              <button className=" text-gray-700 py-2 px-3 group-hover:text-white group-hover:bg-[#4430bf] group-hover:border group-hover:rounded-xl rounded inline-flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <path opacity="0.4" d="M2.5 7.75C2.5 5.86438 2.5 4.92157 3.08579 4.33579C3.67157 3.75 4.61438 3.75 6.5 3.75H23.5C25.3856 3.75 26.3284 3.75 26.9142 4.33579C27.5 4.92157 27.5 5.86438 27.5 7.75V9.25C27.5 10.1928 27.5 10.6642 27.2071 10.9571C26.9142 11.25 26.4428 11.25 25.5 11.25H4.5C3.55719 11.25 3.08579 11.25 2.79289 10.9571C2.5 10.6642 2.5 10.1928 2.5 9.25V7.75Z" fill="currentColor" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.87868 25.3713C5 24.4926 5 23.0784 5 20.25V13.75H25V20.25C25 23.0784 25 24.4926 24.1213 25.3713C23.2426 26.25 21.8284 26.25 19 26.25H11C8.17157 26.25 6.75736 26.25 5.87868 25.3713ZM12.5 19C11.9477 19 11.5 19.4477 11.5 20C11.5 20.5523 11.9477 21 12.5 21H17.5C18.0523 21 18.5 20.5523 18.5 20C18.5 19.4477 18.0523 19 17.5 19H12.5Z" fill="currentColor" />
                </svg>
                <span className="mr-1 text-[1.125rem]">Masters</span>
              </button>

              {/* menu list */}
              <ul className="rounded max-h-0 overflow-hidden transition-[max-height] duration-1000 ease-in-out text-gray-700 pt-1 w-56 px-5 group-hover:max-h-96 text-[0.625rem]">
                {moduleItems &&
                  moduleItems.masters?.map((item, index) => {
                    return (
                      <li
                        className=" hover:bg-white hover:rounded-xl hover:text-[#4430bf] text-[12px] py-1 cursor-pointer max-w-fit px-4 relative text-nowrap"
                        onClick={() => {
                          router.push(`${item.route}`);
                        }}
                      >
                        <div className="absolute -left-3 -top-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="37"
                            viewBox="0 0 13 37"
                            fill="none"
                          >
                            <path
                              d="M12 36L10.6 36C7.23969 36 5.55953 36 4.27606 35.346C3.14708 34.7708 2.2292 33.8529 1.65396 32.7239C1 31.4405 1 29.7603 1 26.4L0.999999 1"
                              stroke="#848484"
                              stroke-width="0.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>

                        {item.name}
                      </li>
                    );
                  })}
              </ul>
            </div>
          }

          {/* START SETTING MANU  */}
          <div className="group text-2xl">
            <button className=" text-gray-700 py-2 px-3 group-hover:text-white group-hover:bg-[#4430bf] group-hover:border group-hover:rounded-xl rounded inline-flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M13.3329 29.3337C12.9995 29.3337 12.7195 29.0937 12.6662 28.7737L12.1729 25.2403C11.3329 24.907 10.6129 24.4537 9.91953 23.9203L6.59953 25.267C6.3062 25.3737 5.9462 25.267 5.7862 24.9737L3.11953 20.3603C3.03793 20.2229 3.00916 20.0605 3.0386 19.9035C3.06805 19.7464 3.1537 19.6055 3.27953 19.507L6.09286 17.2937L5.99953 16.0003L6.09286 14.667L3.27953 12.4937C3.1537 12.3952 3.06805 12.2542 3.0386 12.0972C3.00916 11.9401 3.03793 11.7777 3.11953 11.6403L5.7862 7.02699C5.9462 6.73366 6.3062 6.61366 6.59953 6.73366L9.91953 8.06699C10.6129 7.54699 11.3329 7.09366 12.1729 6.76033L12.6662 3.22699C12.7195 2.90699 12.9995 2.66699 13.3329 2.66699H18.6662C18.9995 2.66699 19.2795 2.90699 19.3329 3.22699L19.8262 6.76033C20.6662 7.09366 21.3862 7.54699 22.0795 8.06699L25.3995 6.73366C25.6929 6.61366 26.0529 6.73366 26.2129 7.02699L28.8795 11.6403C29.0529 11.9337 28.9729 12.2937 28.7195 12.4937L25.9062 14.667L25.9995 16.0003L25.9062 17.3337L28.7195 19.507C28.9729 19.707 29.0529 20.067 28.8795 20.3603L26.2129 24.9737C26.0529 25.267 25.6929 25.387 25.3995 25.267L22.0795 23.9337C21.3862 24.4537 20.6662 24.907 19.8262 25.2403L19.3329 28.7737C19.2795 29.0937 18.9995 29.3337 18.6662 29.3337H13.3329ZM14.9995 5.33366L14.5062 8.81366C12.9062 9.14699 11.4929 10.0003 10.4662 11.187L7.25286 9.80033L6.25286 11.5337L9.0662 13.6003C8.53286 15.1559 8.53286 16.8448 9.0662 18.4003L6.23953 20.4803L7.23953 22.2137L10.4795 20.827C11.5062 22.0003 12.9062 22.8537 14.4929 23.1737L14.9862 26.667H17.0129L17.5062 23.187C19.0929 22.8537 20.4929 22.0003 21.5195 20.827L24.7595 22.2137L25.7595 20.4803L22.9329 18.4137C23.4662 16.8537 23.4662 15.1603 22.9329 13.6003L25.7462 11.5337L24.7462 9.80033L21.5329 11.187C20.4852 9.97409 19.064 9.14389 17.4929 8.82699L16.9995 5.33366H14.9995Z" fill="currentColor" />
                <circle opacity="0.4" cx="16" cy="16" r="3.75" stroke="currentColor" stroke-width="2.5" />
              </svg>
              <span className="mr-1 text-[1.125rem]">Settings</span>
            </button>

            {/* menu list */}
            <ul className="rounded max-h-0 overflow-hidden transition-[max-height] duration-1000 ease-in-out text-gray-700 pt-1 w-56 px-5 group-hover:max-h-96 text-[0.625rem]">
              {moduleItems &&
                moduleItems.settings?.map((item, index) => {
                  return (
                    <li
                      className=" hover:bg-white hover:rounded-xl hover:text-[#4430bf] text-[12px] py-1 cursor-pointer max-w-fit px-2 relative text-nowrap"
                      onClick={() => {router.push(`${item.route}`);
                      }}
                    >
                      <div className="absolute -left-3 -top-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="37"
                          viewBox="0 0 13 37"
                          fill="none"
                        >
                          <path
                            d="M12 36L10.6 36C7.23969 36 5.55953 36 4.27606 35.346C3.14708 34.7708 2.2292 33.8529 1.65396 32.7239C1 31.4405 1 29.7603 1 26.4L0.999999 1"
                            stroke="#848484"
                            stroke-width="0.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>

                      {item.name}
                    </li>
                  );
                })}
            </ul>
          </div>
          {/* END SETTING MANU  */}
        </div>
      </div>
      <div
        className="flex absolute bottom-[7%] space-x-1 left-[3%] cursor-pointer text-gray-700 py-2 px-3 hover:text-white hover:bg-[#4430bf] hover:border hover:rounded-xl rounded items-center"
        onClick={() => {
          handleLogout();
        }}
      >
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.7741 22.2011L26.3365 16.8777C26.5544 16.6292 26.6659 16.3154 26.666 16C26.6661 15.7842 26.6141 15.5676 26.5085 15.3706C26.4615 15.2828 26.4041 15.1994 26.3365 15.1223L21.7741 9.79894C21.2949 9.23982 20.4532 9.17502 19.8941 9.65422C19.3349 10.1334 19.2702 10.9751 19.7494 11.5343L22.4339 14.6666L12.1077 14.6666C11.3713 14.6666 10.7744 15.2636 10.7744 15.9999C10.7744 16.7363 11.3713 17.3333 12.1077 17.3333L22.4341 17.3333L19.7494 20.4658C19.2702 21.0249 19.3349 21.8666 19.8941 22.3458C20.4532 22.825 21.2949 22.7602 21.7741 22.2011ZM13.3327 7.99992C14.0691 7.99992 14.666 8.59687 14.666 9.33325L14.666 11.3333C14.666 12.0696 15.263 12.6666 15.9993 12.6666C16.7357 12.6666 17.3327 12.0696 17.3327 11.3333L17.3327 9.33325C17.3327 7.12411 15.5418 5.33325 13.3327 5.33325L9.33268 5.33325C7.12354 5.33325 5.33268 7.12411 5.33268 9.33325L5.33268 22.6666C5.33268 24.8757 7.12354 26.6666 9.33268 26.6666L13.3327 26.6666C15.5418 26.6666 17.3327 24.8757 17.3327 22.6666L17.3327 20.6666C17.3327 19.9302 16.7357 19.3333 15.9993 19.3333C15.263 19.3333 14.666 19.9302 14.666 20.6666L14.666 22.6666C14.666 23.403 14.0691 23.9999 13.3327 23.9999L9.33268 23.9999C8.5963 23.9999 7.99935 23.403 7.99935 22.6666L7.99935 9.33325C7.99935 8.59687 8.5963 7.99992 9.33268 7.99992L13.3327 7.99992Z"
                fill="currentColor"
              />
            </g>
          </g>
        </svg>
        <div className="mt-[0.5px] text-[#currentColor] text-lg font-normal font-Poppins cursor-pointer">
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
