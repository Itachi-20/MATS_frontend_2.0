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
type EventRequestor2 = {
    "user": string,
    "email": string,
}
type Props = {
    setEventRequestor: (value: string) => void;
    fetchTableData: () => void;
    event_requestor: string;
    requestor_dropdown: EventRequestor2[] | undefined;
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
                    className="w-[200px] justify-between shadow border hover:shadow-md active:shadow-lg lg:text-sm lg:rounded-[25px] rounded-[50px] gap-[9px] text-[9px] font-normal"
                >
                    {Props.event_requestor
                        ? Props.requestor_dropdown?.find((event_requestor) => event_requestor.email === event_requestor.email)?.user
                        : "Select Requestor..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0 bg-white text-black font-normal">
                <Command>
                    <CommandInput placeholder="Search Requestor..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {/* "Select" option to clear the selection */}
                            <CommandItem
                                key="select-option"
                                value="-select-"
                                onSelect={() => {
                                    Props.setEventRequestor(""); // Clear the selected value
                                    setOpen(false);
                                    Props.fetchTableData();
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        !Props.event_requestor ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                - Select -
                            </CommandItem>

                            {/* List the items in the dropdown */}
                            {Props.requestor_dropdown && Props.requestor_dropdown.map((item) => (
                                <CommandItem
                                    key={item.email}
                                    value={item.email}
                                    onSelect={(currentValue) => {
                                        Props.setEventRequestor(currentValue === Props.event_requestor ? "" : currentValue);
                                        Props.fetchTableData();
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            Props.event_requestor === item.email ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {item.user}
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