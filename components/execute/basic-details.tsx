// // components/DynamicInput.tsx
// import React from 'react';

// interface InputField {
//     id: string; // Unique identifier for each field
//     label: string; // Label text for the input
//     value: string; // Default or initial value for the input
//   }
 
// interface DynamicInputProps {
//   field: InputField;
//   onChange: (id: string, value: string) => void;
// }

// const DynamicInput: React.FC<DynamicInputProps> = ({ field, onChange }) => {
    
//   return (
//     <div className="mb-4 ">
//       <label className="block text-sm font-medium text-gray-700">
//         {field.label}
//       </label>
//       <input
//         type="text"
//         value={field.value}
//         onChange={(e) => onChange(field.id, e.target.value)}
//         className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//       />
//     </div>
//   );
// };

// export default DynamicInput;



import React from 'react'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BeneficiaryDetails from "@/components/beneficiary_details";

type Props = {
  pathname: string
}

const Basic_Details = ({ ...Props }: Props) => {
  console.log(Props.pathname, "this is pathname")
  return (
    <div className="md:pb-8">
      <div className="flex md:gap-6" >
        <h1 className="text-black md:text-[30px] md:font-medium uppercase md:pb-4">
          Basic Details
        </h1>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="flex flex-col md:gap-2">
          <label htmlFor="company_name" className="text-black md:text-sm md:font-normal capitalize">
            Company Name<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Micro Life Sciences Private Limited"
            id='company_name'
            name='company_name'
            readOnly={true}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label htmlFor='business_unit' className="text-black md:text-sm md:font-normal capitalize">
            Business Unit<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Cardiology"
            id='business_unit'
            name='business_unit'
            readOnly={true}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label htmlFor="event_requester" className="text-black md:text-sm md:font-normal capitalize">
            Event Requester<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Event user name"
            id='event_requester'
            name="event_requester"
            readOnly={true}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label htmlFor='event_cost-center' className="text-black md:text-sm md:font-normal capitalize">
            Event Cost Center<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Lorem ipsum dolor sit amet"
            id='event_cost_center'
            name='event_cost_center'
            readOnly={true}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            Budget<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="National"
            readOnly={true}
          ></Input>
        </div>
       
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            state<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Gujarat"
            readOnly={true}
          ></Input>
        </div>
        <div className={`flex flex-col md:gap-2  ${Props.pathname == "/assesment_program" ? "hidden" : ""}`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
            Therapy<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Pheriperal"
            readOnly={true}
          ></Input>
        </div>
        <div className={`flex flex-col md:gap-2  ${Props.pathname == "/assesment_program" ? "hidden" : ""}`}>
          <label className="text-black md:text-sm md:font-normal capitalize">
            reporting head<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="lorem ipsum"
            readOnly={true}
          ></Input>
        </div>
        <div className="flex flex-col md:gap-2">
          <label className="text-black md:text-sm md:font-normal capitalize">
            sub type of activity<span className="text-[#e60000]">*</span>
          </label>
          <Input
            className="text-black shadow md:rounded-xl bg-[#f6f6f6] md:py-5"
            placeholder="Meril Event"
            readOnly={true}
          ></Input>
        </div>
      </div>
    </div>
  )
}

export default Basic_Details



