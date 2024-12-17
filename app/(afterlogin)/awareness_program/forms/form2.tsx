'use client'
import { useState, useRef } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from 'sonner';
import { Previewdata } from '@/app/(afterlogin)/hcp_services/page';
import { handleEventStartDateValidate, handleEventEndDateValidate } from "@/app/utility/dateValidation";

type Compensation = {
  vendor_type: string;
  vendor_name: string;
  est_amount: number;
  gst_included?: number;
};

type Logistics = {
  vendor_type: string;
  est_amount: number;
};

type formData = {
  name: string | null;
  event_type: string;
  company: string;
  event_cost_center: string;
  state: string;
  city: string;
  event_start_date: string;
  event_end_date: string;
  bu_rational: string;
  faculty: string;
  participants: string;
  therapy: string;
  event_name: string;
  event_venue: string;
  comments: string;
  compensation: Compensation[];
  logistics: Logistics[];
  total_compensation_expense: number;
  total_logistics_expense: number;
  event_requestor: string;
  business_unit: string;
  division_category: string;
  division_sub_category: string;
  sub_type_of_activity: string;
  any_govt_hcp: string,
  no_of_hcp: number
};

type Props = {
  previewData: Previewdata | null;
  refNo: string | undefined;
}
type FormErrors = {
  event_name?: string;
  event_venue?: string;
  event_start_date?: string;
  event_end_date?: string;
  any_govt_hcp?: string;
  no_of_hcp?: string;
  bu_rational?: string;
}
const Form2 = ({ ...Props }: Props) => {

  const router = useRouter();
  const start_date_ref: React.RefObject<any> = useRef(null);
  const end_date_ref: React.RefObject<any> = useRef(null);
  const [formdata, setFormData] = useState<formData>();
  const [errors, setErrors] = useState<FormErrors>();
  const [refNo, setRefNo] = useState<string | null>(Props.refNo ?? "");
  const [eventStartDate, setEventStartDate] = useState<any>(Props.previewData?.event_start_date ? new Date(Props.previewData?.event_start_date).getTime() : "");
  const [engagementHCP, setEngagementHCP] = useState<string>(Props.previewData?.any_govt_hcp ?? "");

  const handleStartDateClick = () => {
    if (start_date_ref.current) {
      start_date_ref.current.showPicker(); // For modern browsers
      start_date_ref.current.focus(); // Fallback for older browsers
    }
  };
  const handleEndDateClick = () => {
    if (end_date_ref.current) {
      end_date_ref.current.showPicker(); // For modern browsers
      end_date_ref.current.focus(); // Fallback for older browsers
    }
  };
  const validateAtSubmit = () => {
    const errors: FormErrors = {};
    console.log("Checking Formdata value", formdata?.event_name);
    if ((Props.previewData?.event_name ? (formdata && ("event_name" in formdata && formdata.event_name == '')) : !formdata?.event_name)) errors.event_name = "Program Name is required";
    if ((Props?.previewData?.event_venue ? (formdata && ("event_venue" in formdata && formdata.event_venue == '')) : !formdata?.event_venue)) errors.event_venue = "Program Venue is required";
    if ((Props?.previewData?.event_start_date ? (formdata && ("event_start_date" in formdata && formdata.event_start_date == '')) : !formdata?.event_start_date)) errors.event_start_date = "Program Start Date is required";
    if ((Props?.previewData?.event_end_date ? (formdata && ("event_end_date" in formdata && formdata.event_end_date == '')) : !formdata?.event_end_date)) errors.event_end_date = "Program End Date is required";
    if ((Props?.previewData?.any_govt_hcp ? (formdata && ("any_govt_hcp" in formdata && formdata.any_govt_hcp == '')) : !formdata?.any_govt_hcp)) errors.any_govt_hcp = "Engagement of any government hCP’s is required";
    if (((formdata?.any_govt_hcp  == "Yes") || (Props?.previewData?.any_govt_hcp  == "Yes")) && (Props?.previewData?.no_of_hcp ? (formdata && ("no_of_hcp" in formdata && !formdata.no_of_hcp)) : !formdata?.no_of_hcp)) errors.no_of_hcp = "No of HCP is required";
    if ((Props?.previewData?.bu_rational ? (formdata && ("bu_rational" in formdata && formdata.bu_rational == '')) : !formdata?.bu_rational)) errors.bu_rational = "BU Rational is required";
    return errors;
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationErrors = validateAtSubmit();
    if (Object.keys(validationErrors).length > 0) {
      console.error(validationErrors)
      setErrors(validationErrors);
      return;
    }

    const updatedFormData = {
      ...formdata
    };
    updatedFormData.event_type = "Awareness Program";

    if (refNo) {
      updatedFormData.name = refNo;
    }
    if (updatedFormData.any_govt_hcp == "No") {
      updatedFormData.no_of_hcp = 0;
    }

    try {
      const response = await fetch(
        "/api/training_and_education/handleSubmit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(updatedFormData)
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRefNo(data.message);
        router.push(`/awareness_program?forms=3&refno=${data.message}`)
      } else {
        console.log("submission failed");
      }
    } catch (error) {
      console.error("Error during Submission:", error);
    }
  };
  const handlefieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }) as formData);
  }
  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }) as formData);
  };

  console.log("Formdata", formdata)

  return (
    <>
      <div>
        <h1 className='text-black text-2xl font-normal uppercase pb-8'>
          Program Detail
        </h1>
        <div className='grid grid-cols-2 gap-6'>
          <div className='flex flex-col gap-2'>
            <label className={`lable ${(errors?.event_name && !formdata?.event_name) ? `text-red-600` : `text-black`}`}>Program Name <span className='text-[#e60000]'>*</span></label>
            <Input
              className={`${(errors?.event_name && !formdata?.event_name) ? `border border-red-600` : `border border-neutral-200`} dropdown h-10 rounded-md bg-white px-3 py-2 text-sm`}
              placeholder='Type Here'
              name='event_name'
              defaultValue={Props.previewData?.event_name ? Props.previewData.event_name : ""}
              onChange={(e) => handlefieldChange(e)}
            ></Input>
            {
              errors &&
              (errors?.event_name && !formdata?.event_name) &&
              (
                <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.event_name}
                </p>
              )
            }
          </div>
          <div className='flex flex-col gap-2'>
            <label className={`lable ${(errors?.event_venue && !formdata?.event_venue) ? `text-red-600` : `text-black`}`}>Program Venue and Location<span className='text-[#e60000]'>*</span></label>
            <Input
              className={`${(errors?.event_venue && !formdata?.event_venue) ? `border border-red-600` : `border border-neutral-200`} dropdown h-10 rounded-md bg-white px-3 py-2 text-sm`}
              placeholder='Type Here'
              name={"event_venue"}
              defaultValue={Props.previewData?.event_venue ? Props.previewData.event_venue : ""}
              onChange={(e) => handlefieldChange(e)}
            ></Input>
            {
              errors &&
              (errors?.event_venue && !formdata?.event_venue) &&
              (
                <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.event_venue}
                </p>
              )
            }
          </div>
          <div className='flex flex-col gap-2' onClick={() => { handleStartDateClick() }}>
            <label className={`lable ${(errors?.event_start_date && !formdata?.event_start_date) ? `text-red-600` : `text-black`}`} htmlFor='start_date'>
              Program Start Date<span className='text-[#e60000]'>*</span>
            </label>
            <input
              type='date'
              className={`${(errors?.event_start_date && !formdata?.event_start_date) ? `border border-red-600` : `border border-neutral-200`} dropdown h-10 rounded-md bg-white px-3 py-2 text-sm`}
              name='event_start_date'
              id='start_date'
              ref={start_date_ref}
              defaultValue={Props.previewData?.event_start_date ? Props.previewData.event_start_date : ""}
              onChange={(e) => handleEventStartDateValidate(
                {
                  e: e,
                  formData: formdata,
                  previewData: Props.previewData,
                  setEventStartDate: setEventStartDate,
                  eventStartDate: eventStartDate,
                  handlefieldChange: handlefieldChange
                }
              )}
            ></input>
            {
              errors &&
              (errors?.event_start_date && !formdata?.event_start_date) &&
              (
                <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.event_start_date}
                </p>
              )
            }
          </div>
          <div className='flex flex-col gap-2' onClick={() => { handleEndDateClick() }}>
            <label className={`lable ${(errors?.event_venue && !formdata?.event_venue) ? `text-red-600` : `text-black`}`}>
              Program End Date<span className='text-[#e60000]'>*</span>
            </label>
            <input
              type='date'
              className={`${(errors?.event_end_date && !formdata?.event_end_date) ? `border border-red-600` : `border border-neutral-200`} dropdown h-10 rounded-md bg-white px-3 py-2 text-sm`}
              name='event_end_date'
              ref={end_date_ref}
              id='end_date'
              defaultValue={Props.previewData?.event_end_date ? Props.previewData.event_end_date : ""}
              onChange={(e) => handleEventEndDateValidate(
                {
                  e: e,
                  formData: formdata,
                  previewData: Props.previewData,
                  setEventStartDate: setEventStartDate,
                  eventStartDate: eventStartDate,
                  handlefieldChange: handlefieldChange
                }
              )}
            ></input>
            {
              errors &&
              (errors?.event_end_date && !formdata?.event_end_date) &&
              (
                <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.event_end_date}
                </p>
              )
            }
          </div>
          <div className='flex flex-col gap-2'>
            <label className={`lable ${(errors?.any_govt_hcp && !formdata?.any_govt_hcp) ? `text-red-600` : `text-black`}`}>
              engagement of any government hCP’s?<span className='text-[#e60000]'>*</span>
            </label>
            <Select
              defaultValue={Props.previewData?.any_govt_hcp ? Props.previewData.any_govt_hcp : ""}
              onValueChange={(value) => { setEngagementHCP(value); handleSelectChange(value, "any_govt_hcp"); }}
            >
              <SelectTrigger className={`${(errors?.any_govt_hcp && !formdata?.any_govt_hcp) ? `border border-red-600` : ``} dropdown `}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
            {
              errors &&
              (errors?.any_govt_hcp && !formdata?.any_govt_hcp) &&
              (
                <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.any_govt_hcp}
                </p>
              )
            }
          </div>
          {
            engagementHCP == "Yes" ?
              <div className='flex flex-col gap-2'>
                <label className={`lable ${(errors?.no_of_hcp && !formdata?.no_of_hcp) ? `text-red-600` : `text-black`}`}>Total number of government hCP’s<span className='text-[#e60000]'>*</span></label>
                <Input
                  defaultValue={Props.previewData?.no_of_hcp ? Props.previewData.no_of_hcp : ""}
                  className={`${(errors?.no_of_hcp && !formdata?.no_of_hcp) ? `border border-red-600` : `border border-neutral-200`} dropdown h-10 rounded-md bg-white px-3 py-2 text-sm`}
                  placeholder='Type Here'
                  name='no_of_hcp'
                  type='number'
                  disabled={engagementHCP == "Yes" ? false : true}
                  onChange={(e) => handlefieldChange(e)}
                ></Input>
                {
                  errors &&
                  (errors?.no_of_hcp && !formdata?.no_of_hcp) &&
                  (
                    <p className="w-full text-red-500 text-[11px] font-normal text-left">
                      {errors?.no_of_hcp}
                    </p>
                  )
                }
              </div>
              :
              <div className='flex flex-col gap-2'></div>
          }

          <div className='flex flex-col gap-2'>
            <label className='lable'>Comments</label>
            <textarea className='text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl pl-2 pt-2' placeholder='Type Here'
              name='comments'
              defaultValue={Props.previewData?.comments ? Props.previewData?.comments : ""}
              onChange={(e) => { handlefieldChange(e) }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className={`lable ${(errors?.bu_rational && !formdata?.bu_rational) ? `text-red-600` : `text-black`}`}>BU Rational<span className='text-[#e60000]'>*</span></label>
            <textarea
              className={`${(errors?.bu_rational && !formdata?.bu_rational) ? `border border-red-600` : ``} text-black shadow-md border h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md pl-2 pt-2`}
              placeholder='Type Here'
              name='bu_rational'
              defaultValue={Props.previewData?.bu_rational ? Props.previewData.bu_rational : ""}
              onChange={(e) => { handlefieldChange(e) }}
            />
            {
              errors &&
              (errors?.bu_rational && !formdata?.bu_rational) &&
              (
                <p className="w-full text-red-500 text-[11px] font-normal text-left">
                  {errors?.bu_rational}
                </p>
              )
            }
          </div>
          <div className='flex flex-col gap-2'>
            <label className='lable'>{"HCP Name (if any)"}</label>
            <Input className='dropdown' placeholder='Type Here'
              name='hcp_name'
              defaultValue={Props.previewData?.hcp_name ? Props.previewData.hcp_name : ""}
              onChange={(e) => handlefieldChange(e)}
            ></Input>
          </div>
        </div>
        <div className='flex justify-end pt-5 gap-4'>
          {/* <Button className='bg-white text-black border text-md font-normal'> Save as Draft</Button> */}
          <Button className='bg-white text-black border text-md font-normal hover:text-white hover:bg-black' onClick={() => router.push(`/awareness_program?forms=1&refno=${refNo}`)}>Back</Button>
          <Button className='bg-[#4430bf] text-white text-md font-normal border' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>Next</Button>
          {/* <Button className='bg-white text-black border text-md font-normal' onClick={prevForm}>Back</Button>
        <Button className='bg-[#4430bf] text-white text-md font-normal border'onClick={nextForm}>Next</Button> */}
        </div>
      </div>

      <Toaster richColors position="bottom-right" />
    </>
  );
}

export default Form2