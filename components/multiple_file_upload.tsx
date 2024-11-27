// 'use client'

// import React, { useState, useCallback } from 'react'
// import Image from 'next/image'
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { X, FileText, Upload } from 'lucide-react'

// interface FileWithPreview extends File {
//     preview: string;
// }

// interface SimpleFileUploadProps {
//     onNext: (files: FileWithPreview[] , file :FileList | null ) => void;
// }

// export default function SimpleFileUpload({ onNext }: SimpleFileUploadProps) {
//     const [files, setFiles] = useState<FileWithPreview[]>([])
//     const [isOpen, setIsOpen] = useState(false)
//     const [originalfiles, setOriginalFile] = useState<FileList | null>()

//     const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//         const files = (e.target as HTMLInputElement).files;
//         setOriginalFile(files);
//         if (e.target.files) {
//             console.log("event.target.files", e.target.files)
//             const newFiles = Array.from(e.target.files).map(file =>
//                 Object.assign(file, {
//                     preview: URL.createObjectURL(file)
//                 })
//             ) as FileWithPreview[]
//             setFiles(prevFiles => [...prevFiles, ...newFiles])
//         }
//     }, [])

//     const handleNext = useCallback(() => {
//         // alert(originalfiles)
//         onNext(files,originalfiles)
//         setIsOpen(false)
//     }, [files, onNext])

//     const removeFile = useCallback((fileToRemove: FileWithPreview) => {
//         setFiles(files => files.filter(file => file !== fileToRemove))
//     }, [])

//     return (
//         <Dialog open={isOpen} onOpenChange={setIsOpen}>
//             <DialogTrigger asChild>
//                 <label className="flex items-center gap-2 px-2 py-1 bg-[#F0EDFF] rounded-md shadow-sm cursor-pointer border-[1px] border-[#4430BF]/20 hover:bg-[#E8E3FF] transition-colors">
//                     <Image src={'/svg/download.svg'} alt='downloadsvg' width={20} height={20} />
//                     <span className="font-medium text-[#4430BF]">
//                         {files.length > 0
//                             ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
//                             : "Receipt/Bill"}
//                     </span>
//                 </label>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>

//                     <DialogTitle className="text-center text-[30px] font-normal font-['Poppins'] text-black">Upload Document</DialogTitle>
//                 </DialogHeader>
//                 <div className="grid gap-4">
//                     <div className="">

//                         <label htmlFor="file-upload" className=" flex-col cursor-pointer px-4 py-2 rounded-md  transition-colors text-black flex items-center gap-2">
//                             {/* <Upload size={20} /> */}
//                             <Image src={`${'/svg/uploadFileIcon.svg'}`} alt="uploadIcon" width={150} height={50} />
//                             Choose Files
//                         </label>
//                         <Input
//                             id="file-upload"
//                             type="file"
//                             className="hidden"
//                             onChange={(e) => { handleFileChange(e) }}
//                             // onChange={handleFileChange}
//                             multiple
//                         />
//                     </div>
//                     {files.length > 0 && (
//                         <ScrollArea className="max-h-[200px] w-full text-black rounded-md border p-4">
//                             {files.map((file, index) => (
//                                 <div key={index} className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded">
//                                     <div className="flex items-center gap-2">
//                                         <FileText size={20} className="text-[#4430BF]" />
//                                         <div className="flex flex-col">
//                                             <span className="font-medium truncate max-w-[200px]">{file.name}</span>
//                                             <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</span>
//                                         </div>
//                                     </div>
//                                     <Button
//                                         variant="ghost"
//                                         size="icon"
//                                         onClick={() => removeFile(file)}
//                                     >
//                                         <X className="h-4 w-4" />
//                                     </Button>
//                                 </div>
//                             ))}
//                         </ScrollArea>
//                     )}
//                 </div>
//                 {/* <Button onClick={handleNext} className="w-full" disabled={files.length === 0}>
//           Upload {files.length} file{files.length !== 1 ? 's' : ''}
//         </Button> */}

//                 <Button className="border border-[#4430bf] text-[#FFF] px-6 bg-[#4430BF] text-[16px]" disabled={files.length === 0} onClick={handleNext}>
//                     Upload {files.length} file{files.length !== 1 ? 's' : ''}
//                 </Button>
//             </DialogContent>
//         </Dialog>
//     )
// }



'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, FileText } from 'lucide-react'

interface FileWithPreview extends File {
    preview: string;
}

interface SimpleFileUploadProps {
    onNext: (fileList: FileList | null) => void;
}

export default function SimpleFileUpload({ onNext }: SimpleFileUploadProps) {
    const [files, setFiles] = useState<File[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [originalFiles, setOriginalFiles] = useState<FileList | null>(null)

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files
        setOriginalFiles(selectedFiles)
        const filelist = Array.from(e.target.files || []);
        setFiles(prevFiles => [...prevFiles, ...filelist])
    }, [])

    const handleNext = useCallback(() => {
        onNext(originalFiles)
        setIsOpen(false)
    }, [files, originalFiles, onNext])

    const removeFile = useCallback((fileToRemove:File ) => {
        setFiles(files => files?.filter(file => file !== fileToRemove))
    }, [])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <label className="flex items-center gap-2 px-2 py-1 bg-[#F0EDFF] rounded-md shadow-sm cursor-pointer border-[1px] border-[#4430BF]/20 hover:bg-[#E8E3FF] transition-colors">
                    <Image src={'/svg/download.svg'} alt='downloadsvg' width={20} height={20} />
                    <span className="font-medium text-[#4430BF]">
                        {files.length > 0
                            ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
                            : "Receipt/Bill"}
                    </span>
                </label>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center text-[30px] font-normal font-['Poppins'] text-black">Upload Document</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="">
                        <label htmlFor="file-upload" className="flex-col cursor-pointer px-4 py-2 rounded-md transition-colors text-black flex items-center gap-2">
                            <Image src={`${'/svg/uploadFileIcon.svg'}`} alt="uploadIcon" width={150} height={50} />
                            Choose Files
                        </label>
                        <Input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            multiple
                        />
                    </div>
                    {files.length > 0 && (
                        <ScrollArea className="max-h-[200px] w-full text-black rounded-md border p-4">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded">
                                    <div className="flex items-center gap-2">
                                        <FileText size={20} className="text-[#4430BF]" />
                                        <div className="flex flex-col">
                                            <span className="font-medium truncate max-w-[200px]">{file.name}</span>
                                            <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFile(file)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </ScrollArea>
                    )}
                </div>
                <Button
                    className="border border-[#4430bf] text-[#FFF] px-6 bg-[#4430BF] text-[16px]"
                    disabled={files.length === 0}
                    onClick={handleNext}
                >
                    Upload {files.length} file{files.length !== 1 ? 's' : ''}
                </Button>
            </DialogContent>
        </Dialog>
    )
}
