'use client'

import React, { useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { X, FileText } from 'lucide-react'

interface SimpleFileUploadProps {
    onNext: (name:string) => void;
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    buttonText: string;
    name:string
}

export default function SimpleFileUpload({ onNext, buttonText, files, setFiles,name }: SimpleFileUploadProps) {
    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
                setFiles([selectedFile]);
            }
        },
        [setFiles]
    );

    const handleNext = useCallback(() => {
        onNext(name);
        setIsOpen(false);
    }, [onNext]);

    const removeFile = useCallback((e: React.MouseEvent) => {
        e.stopPropagation(); 
        setFiles([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [setFiles]);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 px-2 py-1 bg-[#F0EDFF] rounded-md shadow-sm cursor-pointer border-[1px] border-[#4430BF]/20 hover:bg-[#E8E3FF] transition-colors">
                    <span className="font-medium text-[#4430BF]">
                        {buttonText}
                    </span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center text-[30px] font-normal font-['Poppins'] text-black">Upload File</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div>
                        <label htmlFor="file-upload" className="flex-col cursor-pointer px-4 py-2 rounded-md transition-colors text-black flex items-center gap-2">
                            <Image src="/svg/uploadFileIcon.svg" alt="uploadIcon" width={150} height={50} />
                            {files.length > 0 && files[0] ? (
                                <div className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded">
                                    <div className="flex items-center gap-2">
                                        <FileText size={20} className="text-[#4430BF]" />
                                        <div className="flex flex-col">
                                            <span className="font-medium truncate max-w-[200px]">{files[0].name}</span>
                                            <span className="text-xs text-gray-500">{(files[0].size / 1024).toFixed(2)} KB</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) => removeFile(e)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>

                                </div>
                            ) : "Choose File"}
                        </label>
                        <Input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <Button
                    className="border border-[#4430BF] text-[#FFF] px-6 bg-[#4430BF] text-[16px]"
                    disabled={files.length === 0}
                    onClick={handleNext}
                >
                    Upload {files.length} file{files.length !== 1 ? 's' : ''}
                </Button>
            </DialogContent>
        </Dialog>
    )
}
