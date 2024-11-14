import React from 'react'
import RequestDetails from "@/components/request_details"
import BudgetRequest from '@/components/logistics_budget';
import LogisticActualBudget from '@/components/logistic_actual_budget';

export default function BudgetRequestDetail()  {
  return (
    <div className='px-9 py-7'>
        <RequestDetails />
        <BudgetRequest RequestNo={10101}/>
        <LogisticActualBudget />
    </div>
  )}
