
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function EventFinanceReportPopup() {
  return (
    <Dialog>
      <DialogTrigger asChild>      
            <Image src={"/svg/view.svg"} width={20} height={20} alt="view-svg" className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] pt-20">
        <DialogHeader>
          <DialogTitle className="text-[27px] text-black font-semibold border-b border-slate-300 pb-3 w-full">Uploaded Documents</DialogTitle>
          <DialogDescription className="text-black font-semibold w-full justify-center">
            <div className="grid grid-cols-4 gap-4 items-center justify-center pt-4 pl-10 text-[20px] text-black font-semibold border-b-4 border-slate-300 pb-3">
                <h1>Document</h1>
                <h1>Created Date</h1><h1>Created By</h1><h1>Download</h1>   
            </div>
            <div className="grid grid-cols-4 gap-4 pt-3 justify-center items-center">
               <span className=" text-center text-blue-500 cursor-pointer">invoice.pdf</span>
               <span className=" text-center">13-Nov-2024 02:45 PM</span>                
                <span className=" text-center">MH Khan</span>
                <span className="pl-10 cursor-pointer">
                    <Image src={'/svg/downloadIcon.svg'} alt="downloadIcon" width={20} height={20} />
                </span>
            </div>           
          </DialogDescription>
        </DialogHeader>       
      </DialogContent>
    </Dialog>
  )
}
