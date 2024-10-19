import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from '@/components/ui/checkbox';
type Props = {
    nextForm: ()=>void
    prevForm: ()=>void
    isAddVendor: ()=>void
}
type Budget = "logistics" | "compansation" | "";
const Form3 = ({...Props}:Props) => {
  const [budgetType, setBudgetType] = useState<Budget>("");
  return (
    // </div>
    (<div>
      <div className='pb-8'>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Budget Details
      </h1>
      <div className="grid grid-cols-3 gap-12">
      <div className="flex flex-col gap-2">
          <label className="lable">
            Budget Type<span className="text-[#e60000]">*</span>
          </label>
          <Select
          onValueChange={(value:Budget)=>setBudgetType(value)}
          >
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="logistics">Logistics</SelectItem>
              <SelectItem value="compansation">Compansation</SelectItem>
            </SelectContent>
          </Select>
      </div>
        </div>
      </div>
      {  budgetType == "logistics"?
      <div className="grid grid-cols-3 gap-12 mb-7">
        <div className="flex flex-col gap-2">
          <label className="lable">
            vendor type<span className="text-[#e60000]">*</span>
          </label>
          <Select>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="lable">
            Amount<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow"
            placeholder="Type Here"
          ></Input>
        </div>
        <div className="flex justify-end pt-7">
        <Button className="bg-white text-[#4430bf] border border-[#4430bf] text-md font-normal hover:bg-white">
          Add
        </Button>
        </div>
      </div>
      : budgetType == "compansation"?
      <div>
      <div className="grid grid-cols-4 gap-12">
      <div className="flex flex-col gap-2">
        <label className="lable">
          vendor type<span className="text-[#e60000]">*</span>
        </label>
        <Select>
          <SelectTrigger className="dropdown">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="lable">
          vendor Name<span className="text-[#e60000]">*</span>
        </label>
        <Select>
          <SelectTrigger className="dropdown">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="lable">
          Amount<span className="text-[#e60000]">*</span>
        </label>
        <Input
          className="text-black shadow"
          placeholder="Type Here"
        ></Input>
      </div>
      <div className="flex flex-col gap-5 items-center">
        <label className="lable">
          Is GST Included?<span className="text-[#e60000]">*</span>
        </label>
        <Checkbox className='text-black w-5 h-5'/>
      </div>
    </div>
    <div className="flex justify-end pt-5 gap-4 pb-4">
    <div className="relative">
      <svg
        className="absolute top-3 left-4"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Vector"
          d="M14.8571 9.14286H9.14286V14.8571C9.14286 15.1602 9.02245 15.4509 8.80812 15.6653C8.59379 15.8796 8.30311 16 8 16C7.6969 16 7.40621 15.8796 7.19188 15.6653C6.97755 15.4509 6.85714 15.1602 6.85714 14.8571V9.14286H1.14286C0.839753 9.14286 0.549063 9.02245 0.334735 8.80812C0.120408 8.59379 0 8.3031 0 8C0 7.6969 0.120408 7.40621 0.334735 7.19188C0.549063 6.97755 0.839753 6.85714 1.14286 6.85714H6.85714V1.14286C6.85714 0.839752 6.97755 0.549062 7.19188 0.334735C7.40621 0.120407 7.6969 0 8 0C8.30311 0 8.59379 0.120407 8.80812 0.334735C9.02245 0.549062 9.14286 0.839752 9.14286 1.14286V6.85714H14.8571C15.1602 6.85714 15.4509 6.97755 15.6653 7.19188C15.8796 7.40621 16 7.6969 16 8C16 8.3031 15.8796 8.59379 15.6653 8.80812C15.4509 9.02245 15.1602 9.14286 14.8571 9.14286Z"
          fill="#635E5E"
        />
      </svg>
      <Button className="bg-white text-black border text-md font-normal rounded-xl pl-10 py-2 hover:bg-white" onClick={Props.isAddVendor}>
        Add New Vendor
      </Button>
    </div>
    <Button className="bg-white text-[#4430bf] border border-[#4430bf] text-md font-normal hover:bg-white">
      Add
    </Button>
  </div>
  </div>
  :
  ""
      }
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Logistics Budget
      </h1>
      <div className="border mb-8 border-[#848484] p-7 rounded-[50px] w-full mr-4  bg-white">
        <Table className={""}>
          <TableHeader className={"bg-[#E0E9FF]"}>
            <TableRow className={""}>
              <TableHead
                className={
                  "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Vendor Type
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Amount
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] rounded-r-2xl text-[15px] font-normal font-['Montserrat']"
                }
              >
                {"       "}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="text-black text-center">
              <TableCell>sadsaasd</TableCell>
              <TableCell>asdasda</TableCell>
              <TableCell>
                <div className="flex justify-around">
                  <div className="hover:cursor-pointer">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Group">
                        <g id="Vector">
                          <mask
                            id="path-1-inside-1_600_27491"
                            fill="white"
                          >
                            <path d="M3.52929 4.70557H2.35286C1.72884 4.70557 1.13038 4.95346 0.689136 5.3947C0.24789 5.83595 0 6.43441 0 7.05842V17.6463C0 18.2703 0.24789 18.8688 0.689136 19.31C1.13038 19.7512 1.72884 19.9991 2.35286 19.9991H12.9407C13.5647 19.9991 14.1632 19.7512 14.6044 19.31C15.0457 18.8688 15.2936 18.2703 15.2936 17.6463V16.4699" />
                          </mask>
                          <path
                            d="M2.35286 4.70557V3.70557V4.70557ZM0 7.05842H-1H0ZM0 17.6463H-1H0ZM3.52929 3.70557H2.35286V5.70557H3.52929V3.70557ZM2.35286 3.70557C1.46362 3.70557 0.610812 4.05881 -0.0179709 4.6876L1.39624 6.10181C1.64995 5.8481 1.99406 5.70557 2.35286 5.70557V3.70557ZM-0.0179709 4.6876C-0.646754 5.31638 -1 6.16919 -1 7.05842H1C1 6.69962 1.14253 6.35552 1.39624 6.10181L-0.0179709 4.6876ZM-1 7.05842V17.6463H1V7.05842H-1ZM-1 17.6463C-1 18.5355 -0.646754 19.3883 -0.0179709 20.0171L1.39624 18.6029C1.14253 18.3492 1 18.0051 1 17.6463H-1ZM-0.0179709 20.0171C0.610811 20.6459 1.46362 20.9991 2.35286 20.9991V18.9991C1.99406 18.9991 1.64995 18.8566 1.39624 18.6029L-0.0179709 20.0171ZM2.35286 20.9991H12.9407V18.9991H2.35286V20.9991ZM12.9407 20.9991C13.8299 20.9991 14.6828 20.6459 15.3115 20.0171L13.8973 18.6029C13.6436 18.8566 13.2995 18.9991 12.9407 18.9991V20.9991ZM15.3115 20.0171C15.9403 19.3883 16.2936 18.5355 16.2936 17.6463H14.2936C14.2936 18.0051 14.151 18.3492 13.8973 18.6029L15.3115 20.0171ZM16.2936 17.6463V16.4699H14.2936V17.6463H16.2936Z"
                            fill="#636363"
                            mask="url(#path-1-inside-1_600_27491)"
                          />
                        </g>
                        <path
                          id="Vector_2"
                          d="M19.2765 4.21762C19.7398 3.75429 20.0001 3.12588 20.0001 2.47063C20.0001 1.81538 19.7398 1.18696 19.2765 0.72363C18.8131 0.260297 18.1847 8.45587e-09 17.5295 0C16.8742 -8.45587e-09 16.2458 0.260297 15.7825 0.72363L6.61636 9.85705C6.14677 10.325 5.88281 10.9606 5.88281 11.6235C5.88281 13.0008 6.9993 14.1173 8.37655 14.1173C9.03947 14.1173 9.67511 13.8533 10.143 13.3837L19.2765 4.21762ZM14.1178 2.35298L17.6471 5.88227L14.1178 2.35298Z"
                          fill="black"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="hover:cursor-pointer">
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        id="Vector"
                        d="M14.6256 19.5H14.625H3.375C2.88779 19.5 2.48452 19.3344 2.13785 18.992C1.79142 18.6499 1.62565 18.254 1.625 17.7774V3.89583C1.625 3.30903 1.1493 2.83333 0.5625 2.83333C0.527982 2.83333 0.5 2.80535 0.5 2.77083V2.22222C0.5 1.88471 0.773604 1.61111 1.11111 1.61111H5.06944C5.65241 1.61111 6.125 1.13852 6.125 0.555556C6.125 0.524873 6.14987 0.5 6.18056 0.5H11.8194C11.8501 0.5 11.875 0.524873 11.875 0.555556C11.875 1.13852 12.3476 1.61111 12.9306 1.61111H16.8889C17.2264 1.61111 17.5 1.88471 17.5 2.22222V2.77083C17.5 2.80535 17.472 2.83333 17.4375 2.83333C16.8507 2.83333 16.375 3.30903 16.375 3.89583V17.7778C16.375 18.2534 16.2097 18.6493 15.863 18.9923C15.5165 19.3351 15.1133 19.5006 14.6256 19.5ZM5.125 14.4306C5.125 15.328 5.85254 16.0556 6.75 16.0556C7.64746 16.0556 8.375 15.328 8.375 14.4306V6.68056C8.375 5.78309 7.64746 5.05556 6.75 5.05556C5.85254 5.05556 5.125 5.78309 5.125 6.68056V14.4306ZM9.625 14.4306C9.625 15.328 10.3525 16.0556 11.25 16.0556C12.1475 16.0556 12.875 15.328 12.875 14.4306V6.68056C12.875 5.78309 12.1475 5.05556 11.25 5.05556C10.3525 5.05556 9.625 5.78309 9.625 6.68056V14.4306Z"
                        fill="#242424"
                        stroke="#636363"
                      />
                    </svg>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <h1 className="text-black text-2xl font-normal uppercase pb-8">
        Compenstation Budget
      </h1>
      <div className="border border-[#848484] p-7 rounded-[50px] w-full mr-4  bg-white">
        <Table className={""}>
          <TableHeader className={"bg-[#E0E9FF]"}>
            <TableRow className={""}>
              <TableHead
                className={
                  "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Vendor Type
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                Vendor Name
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                {"Amount (in INR)"}
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                }
              >
                GST Included?
              </TableHead>
              <TableHead
                className={
                  "text-center text-[#625d5d] rounded-r-2xl text-[15px] font-normal font-['Montserrat']"
                }
              >
                {"       "}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="text-black text-center">
              <TableCell>sadsaasd</TableCell>
              <TableCell>asdasda</TableCell>
              <TableCell>asdasda</TableCell>
              <TableCell>
                <div><Checkbox className='text-black w-5 h-5'/></div>
              </TableCell>
              <TableCell>
                <div className="flex justify-around">
                  <div className="hover:cursor-pointer">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Group">
                        <g id="Vector">
                          <mask
                            id="path-1-inside-1_600_27491"
                            fill="white"
                          >
                            <path d="M3.52929 4.70557H2.35286C1.72884 4.70557 1.13038 4.95346 0.689136 5.3947C0.24789 5.83595 0 6.43441 0 7.05842V17.6463C0 18.2703 0.24789 18.8688 0.689136 19.31C1.13038 19.7512 1.72884 19.9991 2.35286 19.9991H12.9407C13.5647 19.9991 14.1632 19.7512 14.6044 19.31C15.0457 18.8688 15.2936 18.2703 15.2936 17.6463V16.4699" />
                          </mask>
                          <path
                            d="M2.35286 4.70557V3.70557V4.70557ZM0 7.05842H-1H0ZM0 17.6463H-1H0ZM3.52929 3.70557H2.35286V5.70557H3.52929V3.70557ZM2.35286 3.70557C1.46362 3.70557 0.610812 4.05881 -0.0179709 4.6876L1.39624 6.10181C1.64995 5.8481 1.99406 5.70557 2.35286 5.70557V3.70557ZM-0.0179709 4.6876C-0.646754 5.31638 -1 6.16919 -1 7.05842H1C1 6.69962 1.14253 6.35552 1.39624 6.10181L-0.0179709 4.6876ZM-1 7.05842V17.6463H1V7.05842H-1ZM-1 17.6463C-1 18.5355 -0.646754 19.3883 -0.0179709 20.0171L1.39624 18.6029C1.14253 18.3492 1 18.0051 1 17.6463H-1ZM-0.0179709 20.0171C0.610811 20.6459 1.46362 20.9991 2.35286 20.9991V18.9991C1.99406 18.9991 1.64995 18.8566 1.39624 18.6029L-0.0179709 20.0171ZM2.35286 20.9991H12.9407V18.9991H2.35286V20.9991ZM12.9407 20.9991C13.8299 20.9991 14.6828 20.6459 15.3115 20.0171L13.8973 18.6029C13.6436 18.8566 13.2995 18.9991 12.9407 18.9991V20.9991ZM15.3115 20.0171C15.9403 19.3883 16.2936 18.5355 16.2936 17.6463H14.2936C14.2936 18.0051 14.151 18.3492 13.8973 18.6029L15.3115 20.0171ZM16.2936 17.6463V16.4699H14.2936V17.6463H16.2936Z"
                            fill="#636363"
                            mask="url(#path-1-inside-1_600_27491)"
                          />
                        </g>
                        <path
                          id="Vector_2"
                          d="M19.2765 4.21762C19.7398 3.75429 20.0001 3.12588 20.0001 2.47063C20.0001 1.81538 19.7398 1.18696 19.2765 0.72363C18.8131 0.260297 18.1847 8.45587e-09 17.5295 0C16.8742 -8.45587e-09 16.2458 0.260297 15.7825 0.72363L6.61636 9.85705C6.14677 10.325 5.88281 10.9606 5.88281 11.6235C5.88281 13.0008 6.9993 14.1173 8.37655 14.1173C9.03947 14.1173 9.67511 13.8533 10.143 13.3837L19.2765 4.21762ZM14.1178 2.35298L17.6471 5.88227L14.1178 2.35298Z"
                          fill="black"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="hover:cursor-pointer">
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        id="Vector"
                        d="M14.6256 19.5H14.625H3.375C2.88779 19.5 2.48452 19.3344 2.13785 18.992C1.79142 18.6499 1.62565 18.254 1.625 17.7774V3.89583C1.625 3.30903 1.1493 2.83333 0.5625 2.83333C0.527982 2.83333 0.5 2.80535 0.5 2.77083V2.22222C0.5 1.88471 0.773604 1.61111 1.11111 1.61111H5.06944C5.65241 1.61111 6.125 1.13852 6.125 0.555556C6.125 0.524873 6.14987 0.5 6.18056 0.5H11.8194C11.8501 0.5 11.875 0.524873 11.875 0.555556C11.875 1.13852 12.3476 1.61111 12.9306 1.61111H16.8889C17.2264 1.61111 17.5 1.88471 17.5 2.22222V2.77083C17.5 2.80535 17.472 2.83333 17.4375 2.83333C16.8507 2.83333 16.375 3.30903 16.375 3.89583V17.7778C16.375 18.2534 16.2097 18.6493 15.863 18.9923C15.5165 19.3351 15.1133 19.5006 14.6256 19.5ZM5.125 14.4306C5.125 15.328 5.85254 16.0556 6.75 16.0556C7.64746 16.0556 8.375 15.328 8.375 14.4306V6.68056C8.375 5.78309 7.64746 5.05556 6.75 5.05556C5.85254 5.05556 5.125 5.78309 5.125 6.68056V14.4306ZM9.625 14.4306C9.625 15.328 10.3525 16.0556 11.25 16.0556C12.1475 16.0556 12.875 15.328 12.875 14.4306V6.68056C12.875 5.78309 12.1475 5.05556 11.25 5.05556C10.3525 5.05556 9.625 5.78309 9.625 6.68056V14.4306Z"
                        fill="#242424"
                        stroke="#636363"
                      />
                    </svg>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <h1 className="text-black text-2xl font-normal uppercase py-8">
        Expense Details
      </h1>
      <div className="grid grid-cols-4 gap-12">
        <div className="flex flex-col col-span-2 gap-2">
          <label className="lable">
            Total Estimated Expense
            <span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow"
            placeholder="Type Here"
          ></Input>
        </div>
        <div className="flex flex-col col-span-1 gap-2">
          <label className="lable">
            Currency<span className="text-[#e60000]">*</span>
          </label>
          <Select>
            <SelectTrigger className="dropdown">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end pt-5 gap-4">
        <Button className="bg-white text-black border text-md font-normal hover:bg-white">
          {" "}
          Save as Draft
        </Button>
        <Button className="bg-white text-black border text-md font-normal hover:bg-white" onClick={Props.prevForm}>
          Back
        </Button>
        <Button className="bg-[#4430bf] text-white text-md font-normal border hover:bg-[#4430bf]" onClick={Props.nextForm}>
          Next
        </Button>
      </div>
    </div>)
  );
}

export default Form3