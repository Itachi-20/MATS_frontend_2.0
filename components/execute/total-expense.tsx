import React from 'react';
import { Input } from '@/components/ui/input';

const Totalexpense = () => {
  return (
    <div className="md:pb-8">
      <div className="flex gap-5">
        <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
          total expense
        </h1>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="flex flex-col md:gap-2">
          <label htmlFor='total_expense' className="text-black md:text-sm md:font-normal capitalize">
            total estimated expense<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="12,00,000"
            id='total_expense'
            name='total_expense'
            readOnly={true}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            currency<span className="text-[#e60000]">*</span>
          </label>
          <div className="grid md:grid-cols-2">

            <Input
              className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
              placeholder="INR"
              readOnly={true}
            ></Input>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Totalexpense