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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";


export default function DialogDemo() {
  return (
    <Dialog> 
      <DialogTrigger asChild >        
        <Button className="flex space-x-2">
             <span>Add New </span>
             <Image src={"/svg/addIcon.svg"} alt="add-Icon" width={13} height={13} />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="flex justify-end">
            
        </DialogTitle>
          <DialogDescription>
          <div className="grid grid-cols-2 gap-6">
                <div className=" space-y-2">
                    <Label className="lable" htmlFor="country_name">
                      Country Name <span className="text-red-400">*</span>
                    </Label>
                    <Select>
                    <SelectTrigger className="dropdown">
                        <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="China">China</SelectItem>
                        <SelectItem value="usa">USA</SelectItem>                    
                    </SelectContent>
                    </Select>
                </div>
                <div className=" space-y-2">
                    <Label className="lable" htmlFor="region_name">
                      Region Name
                    </Label>
                    <Select>
                    <SelectTrigger className="dropdown">
                        <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="north">Noth</SelectItem>
                        <SelectItem value="south">South</SelectItem>
                        <SelectItem value="east">East</SelectItem>     
                        <SelectItem value="west">West</SelectItem>  
                        <SelectItem value="nothing">Nothing Selected</SelectItem>                  
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label className="lable" htmlFor="state_name">
                      State Name
                    </Label>
                    <Select>
                    <SelectTrigger className="dropdown">
                        <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="up">Uttar Pradesh</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>     
                                       
                    </SelectContent>
                    </Select>
                </div>
                <div className="col-span-1 space-y-2">
                    <Label htmlFor="business_place">Business Place</Label>
                    <Input type="text" id="business_place" name="business_place" placeholder="Business Place"/>
                </div>
                <div className="col-span-1 space-y-2">
                    <Label htmlFor="hsn_code">HSN Code</Label>
                    <Input type="text" id="hsn_code" name="hsn_code" placeholder="HSN Code"/>
                </div>
                <div className="space-y-2">
                    <Label className="lable" htmlFor="company_name">
                      GST Registered Company
                    </Label>
                    <Select>
                    <SelectTrigger className="dropdown">
                        <SelectValue placeholder="Select Company" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="company1">company 1</SelectItem>
                        <SelectItem value="company2">Company 2</SelectItem>
                        <SelectItem value="company3">Company 3</SelectItem>     
                                       
                    </SelectContent>
                    </Select>
                </div>
                <div className="col-span-1">

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
