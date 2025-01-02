'use client'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../app/context/AuthContext";
import { tableData } from "@/app/(afterlogin)/dashboard/page"
import { useRouter } from 'nextjs-toploader/app';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { PopoverClose } from '@radix-ui/react-popover';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react";
import { EventRequestor } from '@/app/(afterlogin)/event_approver_list/page';
type cityDropdown = {
    name: string;
    city: string;
  }[];
type Props = {
    setCity: (value: string) => void;
    // fetchTableData: () => void;
    city: string;
    citydropdown: cityDropdown | undefined | null;
}

const details = ({ ...Props }: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
                   <PopoverTrigger asChild>
                     <Button
                       variant="outline"
                       role="combobox"
                       aria-expanded={open}
                       className=" w-full font-normal justify-between  dropdown"
                     >
                       {Props.city
                         ? Props.citydropdown?.find((event_requestor) => event_requestor.name === event_requestor.name)?.city
                         : "Select City..."}
                       <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
                     </Button>
                   </PopoverTrigger>
                   <PopoverContent className="w-[300px] p-0 bg-white text-black font-normal">
                     <Command>
                       <CommandInput placeholder="Search CITY..." />
                       <CommandList>
                         <CommandEmpty>No framework found.</CommandEmpty>
                         <CommandGroup>
                           {/* "Select" option to clear the selection */}
                           <CommandItem
                             key="select-option"
                             value="-select-"
                             onSelect={() => {
                                Props.setCity("");
                               setOpen(false);
                             }}
                           >
                             <Check
                               className={cn(
                                 "mr-2 h-4 w-4 text-black  ",
                                 !Props.city ? "opacity-100" : "opacity-0"
                               )}
                             />
                             - Select -
                           </CommandItem>
                           {Props.citydropdown && Props.citydropdown.map((item) => (
                             <CommandItem
                               className="cursor-pointer text-black "
                               key={item.name}
                               value={item.name}
                               onSelect={(currentValue) => {
                                Props.setCity(currentValue === Props.city ? "" : currentValue);
                                 // Props.fetchTableData();
                                 setOpen(false);
                               }}
                             >
                               <Check
                                 className={cn(
                                   "mr-2 h-4 w-4",
                                   Props.city === item.name ? "opacity-100" : "opacity-0"
                                 )}
                               />
                               {item.city}
                             </CommandItem>
                           ))}
                         </CommandGroup>
                       </CommandList>
                     </Command>
                   </PopoverContent>
                 </Popover>

    )
}

export default details