import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogClose } from "@radix-ui/react-dialog"

export default function DialogDemo() {
  return (
    
    <Dialog> 
      <DialogTrigger asChild>        
        <Button className="flex space-x-2">
             <span>Add New </span>
             <Image src={"/svg/addIcon.svg"} alt="add-Icon" width={13} height={13} />
        </Button>
      </DialogTrigger>
      <DialogContent className="pt-[100px]  h-[200px] !important">
        <DialogHeader className="h-[60px]">
          <DialogTitle className="flex justify-end">
            
        </DialogTitle>
          <DialogDescription>
          <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 space-y-2">
                    <Label htmlFor="person_name">Person Name<span className="text-red-500">*</span></Label>
                    <Input type="text" id="person_name" name="person_name" required />
                </div>
                <div className="col-span-1 space-y-2">
                    <Label htmlFor="state_name">State Name</Label>
                    <Input type="text" id="state_name" name="state_name" />
                </div>
                <div className="col-span-1 space-y-2">
                    <Label htmlFor="region" className="label">Region</Label>
                    <Input type="text" id="region" name="region" />
                </div>
                <div className="col-span-1 space-y-2 text-center flex justify-end items-center ">
                    <Button type="submit" className="mt-7 bg-blue-500 text-white px-9 py-2 font-normal leading-3 text-[18px] rounded-[8px]">Save</Button>                
                </div>
            </div>
          </DialogDescription>
        </DialogHeader>
       
      </DialogContent>
    </Dialog>
  )
}
