import React from 'react'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Table from "@/app/(afterlogin)/advance_payment/table"

const page = () => {
  return (
    
        <div className='p-7 w-full relative z-20 text-black'>
        <div className="flex justify-between pb-5">
            <Input
              className="w-[40%] rounded-[50px] bg-[#ecf2ff]"
              placeholder="Search"
            />
            <div className="flex gap-5">
              <Select>
                <SelectTrigger className="dropdown rounded-[25px] gap-4">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="dropdown rounded-[25px] gap-4">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Button className="text-black text-md font-normal bg-white hover:bg-white border rounded-[25px] px-8 py-5 shadow">
                Back
              </Button>
              <div className="">
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group 1707480146">
                    <path
                      id="Vector"
                      d="M25 0C21.717 0 18.4661 0.646644 15.4329 1.90301C12.3998 3.15938 9.6438 5.00087 7.32233 7.32233C2.63392 12.0107 0 18.3696 0 25C0 31.6304 2.63392 37.9893 7.32233 42.6777C9.6438 44.9991 12.3998 46.8406 15.4329 48.097C18.4661 49.3534 21.717 50 25 50C31.6304 50 37.9893 47.3661 42.6777 42.6777C47.3661 37.9893 50 31.6304 50 25C50 21.717 49.3534 18.4661 48.097 15.4329C46.8406 12.3998 44.9991 9.6438 42.6777 7.32233C40.3562 5.00087 37.6002 3.15938 34.5671 1.90301C31.5339 0.646644 28.283 0 25 0Z"
                      fill="#ECF2FF"
                    />
                    <rect
                      id="Rectangle 3959"
                      x="22"
                      y="22"
                      width="6"
                      height="16"
                      rx="2"
                      fill="#4430BF"
                    />
                    <rect
                      id="Rectangle 3960"
                      x="22"
                      y="12"
                      width="6"
                      height="6"
                      rx="3"
                      fill="#4430BF"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <Table/>
        </div>
  )
}

export default page