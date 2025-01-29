import { useOutsideClick } from '@/app/hooks/useOutsideClick'
import React from 'react'

interface Props {
    isOpen:Boolean;
    onClose:()=>void;
}


const SuggestionDialog = ({...Props}:Props) => {
    const suggestionRef = useOutsideClick<HTMLDivElement>(Props.onClose)
const suggestionDate = [
    {title:"suggestion1",value:"suggestion1"},
    {title:"suggestion2",value:"suggestion2"},
    {title:"suggestion3",value:"suggestion3"},
    {title:"suggestion4",value:"suggestion4"},
    {title:"suggestion5",value:"suggestion5"},
    {title:"suggestion6",value:"suggestion6"},
    {title:"suggestion7",value:"suggestion7"}
]

  return (
    <>
    {
        Props.isOpen &&
        <div ref={suggestionRef} className={`absolute -bottom-44 w-full z-30`}>
            <div className='text-black bg-white max-h-40 h-full border shadow-xl rounded-md p-3 overflow-y-scroll'>
        {
            suggestionDate?.map((item,index)=>(
                <div className='pb-2'>{item.title}</div>
            ))
        }
        </div>
        </div>
        }
        </>
  )
}

export default SuggestionDialog