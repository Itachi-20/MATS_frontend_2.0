
'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from 'use-debounce';

type Dropdown = {
  name: string;
  city: string;
}[];

type Props = {
    setsearchValue: (value: string) => void;
    handleValueChange: (city_name: string, page_length: number, page_no: number) => void;
  searchValue: string | null | undefined;
  dropdown: Dropdown | undefined | null;
  clearValue: () => void;
  placeholder:string
};

const Details = ({ setsearchValue, handleValueChange, searchValue, dropdown, clearValue,placeholder }: Props) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
        handleValueChange(debouncedSearchTerm, 10, 1);
    } else if (searchValue) {
        handleValueChange(searchValue, 10, 1);
    } else {
        handleValueChange('', 10, 1);
    }
  }, [debouncedSearchTerm]);

  const handleClearCity = () => {
    clearValue();
    setSearchTerm('');
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0)
  };

  const toggleDropdown = () => {
    console.log('open dropdwon')
    if (searchValue) {
      setOpen(false);
    } else {
      setOpen(!open);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };
  return (
    <div className="relative w-full" ref={dropdownRef}>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full font-normal flex justify-start dropdown"
        onClick={toggleDropdown}
      >
        <div className={`${searchValue ? "bg-gray-100 rounded-sm p-[2px]" : ""}`}>
          {searchValue
            ? dropdown?.find((item) => item.name === searchValue)?.city
            : "Select"}
        </div>
        {searchValue ? (
          <div
            className="ml-2 text-black"
            onClick={(e) => {
              e.stopPropagation();
              handleClearCity();
            }}
          >
            <X className="h-4 w-4 text-black cursor-pointer" />
          </div>
        ) : (
          // <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
          <></>
        )}
      </Button>

      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white shadow-lg border rounded-lg">
          <div className="flex items-center p-2 border-b text-black">
            <Search className="mr-2 ml-1 h-5 w-5 shrink-0 opacity-50" />
            <Input
              ref={inputRef} 
              placeholder={placeholder}
              className="border-none outline-none focus-visible:none ring-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="max-h-60 overflow-y-auto p-2">
            {dropdown && dropdown.length > 0 ? (
              dropdown.map((item) => (
                <div
                  key={item.name}
                  className={cn(
                    "flex items-center p-2 cursor-pointer text-black hover:bg-gray-100",
                    searchValue === item.name ? "bg-gray-200" : ""
                  )}
                  onClick={() => {
                    setsearchValue(item.name);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      searchValue === item.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.city}
                </div>
              ))
            ) : (
                <div className='flex justify-end'>
              <Button className="bg-[#4430bf] text-white text-md font-normal border">Add New</Button>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
