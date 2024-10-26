import React from 'react'

export default function formstateindicator() {
    return (
            <div className="relative flex items-center justify-between *:font-medium *:text-[15px] *:leading-normal before:content-[''] before:absolute before:top-[70%] before:left-[4%] before:right-[4%] before:h-[7px] before:bg-[#f0f0f0] before:z-0">
                <div className=" flex flex-col items-center text-[#4430BF]">
                    <label>
                        Basic Details
                    </label>
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g filter="url(#filter0_ii_1106_495)">
                                <circle cx="10" cy="10" r="10" fill="url(#paint0_linear_1106_495)" />
                            </g>
                            <defs>
                                <filter id="filter0_ii_1106_495" x="0" y="-2" width="20" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="-2" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1106_495" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="2" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="effect1_innerShadow_1106_495" result="effect2_innerShadow_1106_495" />
                                </filter>
                                <linearGradient id="paint0_linear_1106_495" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#988AFF" />
                                    <stop offset="1" stop-color="#5945ED" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col items-center text-[#C6C6C6]">
                    <label>
                        Event Details
                    </label>
                    <div className="z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="10" fill="url(#paint0_linear_1261_822)" />
                            <defs>
                                <linearGradient id="paint0_linear_1261_822" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#F4F9FF" />
                                    <stop offset="1" stop-color="#E8EAEC" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col items-center text-[#C6C6C6]">
                    <label>
                        Vendor Details & Total Expense
                    </label>
                        <div className="z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="10" fill="url(#paint0_linear_1261_822)" />
                                <defs>
                                    <linearGradient id="paint0_linear_1261_822" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F4F9FF" />
                                        <stop offset="1" stop-color="#E8EAEC" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                </div>
                <div className="flex flex-col items-center text-[#C6C6C6]">
                    <label>
                        Attachments
                    </label>
                    <div className="z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="10" fill="url(#paint0_linear_1261_822)" />
                            <defs>
                                <linearGradient id="paint0_linear_1261_822" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#F4F9FF" />
                                    <stop offset="1" stop-color="#E8EAEC" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>

            </div>
    )
}