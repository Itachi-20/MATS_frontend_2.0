import { Toaster, toast } from 'sonner';
type Props = {
    e: React.ChangeEvent<HTMLInputElement>
    formData: any,
    previewData: any,
    setEventStartDate: (value:number)=>void,
    eventStartDate: any,
    handlefieldChange: (value:React.ChangeEvent<HTMLInputElement>)=>void,
}

export const handleEventStartDateValidate = ({...Props}:Props)=>{
    const currentDate = new Date().setHours(0, 0, 0, 0);
    if(Props.e.target.valueAsNumber < currentDate){
      toast.error("You are choosing previous date");
    }
    if(Props?.e.target.valueAsNumber > new Date(Props.formData?.event_end_date).getTime()){
      toast.error("You are choosing date greater than end date");
      Props.e.target.value = "";
    }

    if(Props?.previewData?.event_end_date){
        if(Props.formData?.event_end_date != "" && Props.e.target.valueAsNumber > (Props.formData?.event_end_date ? new Date(Props.formData?.event_end_date).getTime() : new Date(Props.previewData?.event_end_date).getTime())){
            toast.error("You are choosing date greater than end date");
            Props.e.target.value = "";
        }
    }

    Props.setEventStartDate(Props.e.target.valueAsNumber)
    Props.handlefieldChange(Props.e);
  };

export const handleEventEndDateValidate = ({...Props}:Props)=>{
    if(Props.eventStartDate && Props.e.target.valueAsNumber < Props.eventStartDate){
      toast.error("End Date should be greater than or equal to start date");
      Props.e.target.value = "";
    }
    Props.handlefieldChange(Props.e);
  };