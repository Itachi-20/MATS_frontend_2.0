import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import DialogBox from "@/components/dialogbox"
import { DialogClose } from "@radix-ui/react-dialog";

export default function DialogDemo({ button, uplaodmsg, setFile, FileUpload }) {
  const [fileName, setFileName] = useState();
  const [openPopup, setPopup] = useState(true)

  const handleFileChange: any = (e: any) => {
    setFileName(e.target.files[0]?.name)
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    setFile(files);
  }

  return (

    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-[#4430BF] text-[18px]">{button}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-[30px] font-normal font-['Poppins'] text-black">{uplaodmsg}</DialogTitle>

        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex justify-center items-center">
            <label className="items-center justify-center py-2 px-16 rounded-md cursor-pointer">
              <p className="">
                <Image src={`${fileName ? '/svg/uploadedFileIcon.svg' : '/svg/uploadFileIcon.svg'}`} alt="uploadIcon" width={150} height={50} />
                <Input type="file" className="hidden" onChange={handleFileUpload} multiple />
              </p>
              <p className="space-y-2">
                <span className="text-[18px] font-medium leading-normal flex justify-center text-black text-wrap">{fileName ? fileName : 'Upload files'}</span>
                <span className="flex justify-center text-black">{fileName ? 'Remove file' : ''}</span>
              </p>
            </label>
          </div>
        </div>
        <DialogFooter>
          <div className="flex gap-4 bg-white leading-normal">

            <Button className="bg-white text-black border px-6 hover:bg-white text-[18px]">Back</Button>
            <Button className="border border-[#4430bf] text-[#FFF] px-6 bg-[#4430BF] text-[16px]" onClick={() => FileUpload()}>Next</Button>

          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}
