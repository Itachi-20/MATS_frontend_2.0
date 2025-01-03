'use client'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react";
import { useDebounce } from 'use-debounce';
import { Search } from 'lucide-react';
type cityDropdown = {
  name: string;
  city: string;
}[];
type Props = {
  setCity: (value: string) => void;
  // fetchTableData: () => void;
  handleCityChange: (city_name: string, page_length: number, page_no: number) => void;
  city: string | null | undefined;
  citydropdown: cityDropdown | undefined | null;
}

const Details = ({ ...Props }: Props) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      Props.handleCityChange(debouncedSearchTerm, 10, 1);
    } 
    // else {
    //   Props.handleCityChange('', 10, 1);
    // }
  }, [debouncedSearchTerm]);
  console.log(Props.city,'Props.city')
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
            ? Props.citydropdown?.find((city) => city.name === city.name)?.city
            : "Select City..."}
            {/* {Props.city
            ? Props.city
            : "Select City..."} */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-white text-black font-normal">
        <Command>
          <div className='flex items-center p-1  border-b-2'>

            <Search className="mr-2 ml-1 h-5 w-5 shrink-0 opacity-50" />
            <Input
              placeholder="Search CITY..."
              className='border-none outline-none focus-visible:none ring-white '
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key="select-option"
                value=""
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
export default Details;
