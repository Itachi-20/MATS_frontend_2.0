import React from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

const addHCP = () => {
  return (
    <div className="absolute z-50 flex inset-0 items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl border  md:max-w-[600px] md:max-h-[350px] h-full w-full gap-8 text-black md:text-md font-light ">
        <h1 className="text-2xl flex justify-start font-poppins p-7">Add HCP</h1>
        <div className="px-6">
        {/* <Textarea
          className="h-full md:max-h-40"
        //   value={remarks}
        //   onChange={(e) => setRemarks(e.target.value)}
        /> */}
        <div className='grid grid-cols-2 gap-6'>
        <div className='flex flex-col gap-2'>
          <label className='lable'>HCP Name<span className='text-[#e60000]'>*</span></label>
          <input type='text'
            name='hospital_affiliation'
            // onChange={(e) => { handlefieldChange(e) }}
            // defaultValue={Props.previewData?.hospital_affiliation ? Props.previewData.hospital_affiliation : ""}
            className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'></input>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>Pincode<span className='text-[#e60000]'>*</span></label>
          <input type='text'
            name='hospital_affiliation'
            // onChange={(e) => { handlefieldChange(e) }}
            // defaultValue={Props.previewData?.hospital_affiliation ? Props.previewData.hospital_affiliation : ""}
            className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'></input>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable'>City<span className='text-[#e60000]'>*</span></label>
          <input type='text'
            name='hospital_affiliation'
            // onChange={(e) => { handlefieldChange(e) }}
            // defaultValue={Props.previewData?.hospital_affiliation ? Props.previewData.hospital_affiliation : ""}
            className='dropdown h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm'></input>
        </div>
        </div>
        <div className="flex justify-end pt-5 gap-4 w-full">
          <Button className="bg-white text-black border text-md font-normal px-12 rounded-md hover:bg-white">
            Back
          </Button>
          <Button className={`text-black text-md font-normal border px-8`}>
            Add
          </Button>
        </div>

        </div>
      </div>
    </div >
  )
}

export default addHCP