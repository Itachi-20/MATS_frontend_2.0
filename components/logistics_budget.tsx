import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface LogisticsProps {
    RequestNo: BigInteger
}

const LogisticBudget: React.FC<LogisticsProps> = ({ RequestNo }) => {
    return (
        <div className="pb-8">
            <div className="flex gap-6">
                <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
                    {RequestNo === 10101 ? 'LOGISTICS tentative BUDGET' : 'Logistics Budget'}
                </h1>
                {RequestNo === 10101 ? '' :
                    <div className="pt-3">
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Group">
                                <g id="Vector">
                                    <mask id="path-1-inside-1_605_29773" fill="white">
                                        <path d="M4.01679 5.35547H2.67786C1.96765 5.35547 1.28652 5.6376 0.784326 6.13979C0.282131 6.64199 0 7.32311 0 8.03333V20.0837C0 20.7939 0.282131 21.475 0.784326 21.9772C1.28652 22.4794 1.96765 22.7615 2.67786 22.7615H14.7282C15.4384 22.7615 16.1196 22.4794 16.6217 21.9772C17.1239 21.475 17.4061 20.7939 17.4061 20.0837V18.7448" />
                                    </mask>
                                    <path d="M2.67786 5.35547V4.35547V5.35547ZM0 8.03333H-1H0ZM0 20.0837H-1H0ZM4.01679 4.35547H2.67786V6.35547H4.01679V4.35547ZM2.67786 4.35547C1.70243 4.35547 0.766952 4.74296 0.0772194 5.43269L1.49143 6.8469C1.80609 6.53224 2.23286 6.35547 2.67786 6.35547V4.35547ZM0.0772194 5.43269C-0.612513 6.12242 -1 7.0579 -1 8.03333H1C1 7.58833 1.17677 7.16156 1.49143 6.8469L0.0772194 5.43269ZM-1 8.03333V20.0837H1V8.03333H-1ZM-1 20.0837C-1 21.0591 -0.612513 21.9946 0.0772194 22.6843L1.49143 21.2701C1.17677 20.9555 1 20.5287 1 20.0837H-1ZM0.0772194 22.6843C0.766951 23.3741 1.70243 23.7615 2.67786 23.7615V21.7615C2.23286 21.7615 1.80609 21.5848 1.49143 21.2701L0.0772194 22.6843ZM2.67786 23.7615H14.7282V21.7615H2.67786V23.7615ZM14.7282 23.7615C15.7036 23.7615 16.6391 23.3741 17.3289 22.6843L15.9146 21.2701C15.6 21.5848 15.1732 21.7615 14.7282 21.7615V23.7615ZM17.3289 22.6843C18.0186 21.9946 18.4061 21.0591 18.4061 20.0837H16.4061C16.4061 20.5287 16.2293 20.9555 15.9146 21.2701L17.3289 22.6843ZM18.4061 20.0837V18.7448H16.4061V20.0837H18.4061Z" fill="black" mask="url(#path-1-inside-1_605_29773)" />
                                </g>
                                <path id="Vector_2" d="M21.939 4.8002C22.4663 4.27287 22.7626 3.55765 22.7626 2.81189C22.7626 2.06613 22.4663 1.35092 21.939 0.823585C21.4117 0.296252 20.6965 9.62388e-09 19.9507 0C19.2049 -9.62388e-09 18.4897 0.296252 17.9624 0.823585L7.53019 11.2186C6.99573 11.7512 6.69531 12.4746 6.69531 13.2291C6.69531 14.7966 7.96602 16.0673 9.53351 16.0673C10.288 16.0673 11.0114 15.7669 11.544 15.2324L21.939 4.8002ZM16.0678 2.678L20.0846 6.69479L16.0678 2.678Z" fill="black" />
                            </g>
                        </svg>
                    </div>
                }
            </div>
            <div className="border border-[#848484] p-7 rounded-[50px] w-full mr-4  bg-white">
                <Table className={""}>
                    <TableHeader className={"bg-[#E0E9FF]"}>
                        <TableRow className={""}>
                            <TableHead
                                className={
                                    "text-center rounded-l-2xl text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                {/* Vendor Type */}
                            </TableHead>
                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Vendor Type
                            
                            </TableHead>

                            <TableHead
                                className={
                                    "text-center text-[#625d5d] text-[15px] font-normal font-['Montserrat']"
                                }
                            >
                                Amount (in INR)
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
                        <TableCell></TableCell>

                            <TableCell>Stationary</TableCell>
                            <TableCell>20000</TableCell>
                        </TableRow>
                        <TableRow className="text-black text-center">
                        <TableCell></TableCell>

                            <TableCell>Hotel</TableCell>
                            <TableCell>20000</TableCell>
                        </TableRow>
                        {RequestNo === 10101 ?                        
                            <TableRow className="text-black text-center">
                                <TableCell></TableCell>                                
                                <TableCell></TableCell>
                                <TableCell className='flex justify-end text-4 font-medium leading-normal font-["Poppins"] items-center space-x-4'><span>Total</span><span className='font-normal px-5 py-[10px] bg-[#F5F5F5]'>40,000</span></TableCell>  
                            </TableRow>                          
                            : ''
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default LogisticBudget;