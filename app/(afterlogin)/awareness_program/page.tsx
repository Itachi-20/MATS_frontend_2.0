"use client"

import React, { useState } from 'react';
import Form1 from "@/app/(afterlogin)/awareness_program/forms/form1";
import Form2 from "@/app/(afterlogin)/awareness_program/forms/form2";
import Form3 from "@/app/(afterlogin)/awareness_program/forms/form3";
import Form4 from "@/app/(afterlogin)/awareness_program/forms/form4";
import Preview_Form from './forms/preview_form';
import Addvendor from '@/components/add_vendor';
import Adddocument from '@/components/add_document';
import { useRouter } from 'next/router'

const Index = () => {
  const [form, setForm] = useState(1);
  const [addVendor, setAddVendor] = useState(false);
  const [addDocument, setAddDocument] = useState(false);
  // const router = useRouter();
  const nextForm = (): void => {
    setForm(prev => prev + 1);
    // router.push("/modules#form_top")
  }
  const prevForm = () => {
    setForm(prev => prev - 1);
    // router.push("/modules#form_top")
  }
  const isAddVendor = () => {
    setAddVendor(prev => !prev)
  }
  const isAddDocument = () => {
    setAddDocument(prev => !prev)
  }

  return (
    <>
      <div className="px-7 pb-7 pt-4 w-full relative z-20">
        <div>
          <h1 className="text-black text-[30px] font-medium capitalize" id="form_top">
            Training & Education
          </h1>
          <div className='py-9'></div>
        </div>
        {
          form == 1 ?
            <Form1
              nextForm={nextForm}
            /> :
            form == 2 ?
              <Form2
                nextForm={nextForm}
                prevForm={prevForm}
              /> :
              form == 3 ?
                <Form3
                  nextForm={nextForm}
                  prevForm={prevForm}
                  isAddVendor={isAddVendor}
                /> :
                form == 4 ?
                  <Form4
                    nextForm={nextForm}
                    prevForm={prevForm}
                  /> :
                  form == 5 ?
                    <Preview_Form
                      prevForm={prevForm}
                    /> : ""
        }
      </div>

      {
        addVendor &&
        <Addvendor
          isAddVendor={isAddVendor} isAddDocument={isAddDocument}
        />
      }
      {
        addDocument &&
        <Adddocument isAddDocument={isAddDocument} />
      }

    </>
  )
}

export default Index