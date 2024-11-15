"use client"
import React, { useState } from 'react';
import Form1 from "./forms/form1";
import FormState1 from "./form_state_indicartor/form_state_1";
import FormState2 from "./form_state_indicartor/form_state_2";
import FormState3 from "./form_state_indicartor/form_state_3";
import FormState4 from "./form_state_indicartor/form_state_4";
import Form2 from "./forms/form2";
import Form3 from "./forms/form3";
import Form4 from "./forms/form4";
import Preview_Form from './forms/preview_form';
import Addvendor from '@/components/add_vendor';
import Adddocument from '@/components/add_document';
import { AppWrapper } from '@/app/context/module';
import { usePathname } from 'next/navigation';
const index = () => {
  const pathname = usePathname();
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
      <AppWrapper>
        <div className="px-7 pb-7 pt-4 w-full relative z-20">
          {
            form == 1 ? (
              <>
                <FormState1/>
                <Form1
                  nextForm={nextForm}
                />
              </>
            )
              :
              form == 2 ?
                (

                  <Form2
                    nextForm={nextForm}
                    prevForm={prevForm}
                  />
                ) :
                form == 3 ?
                  (
                    <Form3
                      nextForm={nextForm}
                      prevForm={prevForm}
                      isAddVendor={isAddVendor}
                    />
                  ) :
                  form == 4 ?
                    (
                      <Form4
                        nextForm={nextForm}
                        prevForm={prevForm}
                      />
                    ) :
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
      </AppWrapper>
    </>
  )
}

export default index