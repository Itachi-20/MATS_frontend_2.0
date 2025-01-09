
'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from 'use-debounce';

type CityDropdown = {
  name: string;
  city: string;
}[];

type Props = {
  setCity: (value: string) => void;
  handleCityChange: (city_name: string, page_length: number, page_no: number) => void;
  city: string | null | undefined;
  citydropdown: CityDropdown | undefined | null;
  clearCity: () => void;
};

const Details = ({ setCity, handleCityChange, city, citydropdown, clearCity }: Props) => {
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
      handleCityChange(debouncedSearchTerm, 10, 1);
    } else if (city) {
      handleCityChange(city, 10, 1);
    } else {
      handleCityChange('', 10, 1);
    }
  }, [debouncedSearchTerm]);

  const handleClearCity = () => {
    clearCity();
    setSearchTerm('');
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0)
  };

  const toggleDropdown = () => {
    console.log('open dropdwon')
    if (city) {
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
        <div className={`${city ? "bg-gray-100 rounded-sm p-[2px]" : ""}`}>
          {city
            ? citydropdown?.find((item) => item.name === city)?.city
            : "Select City..."}
        </div>
        {city ? (
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
              placeholder="Search CITY..."
              className="border-none outline-none focus-visible:none ring-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="max-h-60 overflow-y-auto">
            {citydropdown && citydropdown.length > 0 ? (
              citydropdown.map((item) => (
                <div
                  key={item.name}
                  className={cn(
                    "flex items-center p-2 cursor-pointer text-black hover:bg-gray-100",
                    city === item.name ? "bg-gray-200" : ""
                  )}
                  onClick={() => {
                    setCity(item.name);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      city === item.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.city}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No city found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
