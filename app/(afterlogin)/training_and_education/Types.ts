export type eventCostCenter = {
    cost_center: {
      name: string;
      cost_center_description: string;
    }[];
    division_category: {
      name: string;
      category: string;
    }[];
    therapy: {
      name: string;
      therapy: string;
    }[];
    event_division: {
      name: string;
      event_division: string;
    }[];
  };
  export type subtypeActivity = {
    name: string;
    division_sub_category: string;
  }[];
  
  export type reportingHeadDropdown = {
    reporting_name: string;
    reporting: string;
  }[];
  export type stateDropdown = {
    name: string;
    state: string;
  }[];
  
  export type FormErrors = {
    sub_type_of_activity?: string;
    event_cost_center?: string;
    division_category?: string;
    state?: string;
    reporting_head?: string
    event_division?:string
    faculty?:string
    participants?:string
  };
  export type CityDropdown = {
    name: string;
    city: string
  }

  export type DropdownDataType = {
    company: {
      name: string,
      company_name: string
    }[],
    currency: {
      name: string
    }[],
    division: {
      name: string,
      division_name: string
    }[],
    engagement_type:{
      name:string,
      engagement_type: string,
    }[],
    gst: {
      name: string,
      rate: string
    }[],
    hcp_ref_no: {
      name: string
    }[],
    requestor: {
      full_name: string,
      email: string
    }[],
    state: {
      name: string,
      state: string
    }[],
    city: {
      name: string,
      city: string
    }[],
    training_ref_no: {
      name: string
    }[],
    vendor_type: {
      name: string,
      vendor_type: string
    }[],
    event_division:{
      name:string;
      event_division:string;
    }[];
  };
  export type ActivityDropdownType = {
    name: string,
    document_name: string
   
  } [];
  export type PreviewDataType = {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: number;
    idx: number;
    event_type: string;
    company: string;
    event_cost_center: string;
    state: string;
    sub_type_of_activity: string;
    business_unit: string;
    division_category: string;
    city: string | null;
    therapy: string;
    event_requestor: string;
    division_sub_category: string ;
    reporting_head: string | null;
    status: string;
    current_stage: string;
    product_amount: number;
    quantity: number;
    organizer_name: string | null;
    sponsor_currency: number;
    sponsorship_amount: number;
    entitlement_in_lieu_of_sponsorship: string | null;
    comment_if_any: string | null;
    any_additional_expense: string | null;
    event_name: string | null;
    event_start_date: string;
    any_govt_hcp: string;
    comments: string | null;
    faculty: string;
    hcp_name: string;
    type_of_engagement: string;
    annual_plan: number;
    product_details: string;
    organization_name: string | null;
    event_venue: string | null;
    event_end_date: string;
    no_of_hcp: number;
    bu_rational: string;
    participants: string;
    training_ref_no: string | null;
    hcp_ref_no: string | null;
    sponsorship_ref_no: string | null;
    service_type: string | null;
    hospital_affiliation: string;
    requesting_hospital_name: string | null;
    bill_to: string | null;
    ship_to: string | null;
    total_compensation_expense: number;
    has_advance_expense: number;
    event_conclusion: string | null;
    total_logistics_expense: number;
    travel_vendors_status: string;
    total_estimated_expense: number;
    currency: string;
    preactivity_status: string;
    advance_status: string;
    advance_expense_check: number;
    post_activity_status: string;
    post_expense_status: string;
    post_expense_check: number;
    travel_expense_status: string;
    travel_expense_check: number;
    amended_from: string | null;
    document_no: string | null;
    invoice_date: string | null;
    invoice_amount: number;
    division: string | null;
    nature: string | null;
    gl_code: string | null;
    zone: string | null;
    remark: string | null;
    posting_date: string | null;
    basic_amount: number;
    tds: number;
    cost_centre: string | null;
    company_name: string | null;
    utr_number: string | null;
    finance_state: string | null;
    invoice_number: string | null;
    gst: number;
    net_amount: number;
    cc_name: string | null;
    gl_name: string | null;
    payment_date: string | null;
    finance_city: string | null;
    doctype: string;
    actual_vendors: any[];
    expense_attachments: any[];
    preactivity_approvers: any[];
    logistics: ChildVendor[];
    travel_expense_approvers: any[];
    post_activity_approvers: any[];
    post_expense_vendors: any[];
    travel_vendors: any[];
    occurrence_status: ChildOccurrence[];
    post_expense_approvers: any[];
    documents: Document[];
    advance_approvers: any[];
    compensation: ChildVendor[];
    occurrence_no: number;
    preactivity_submitted: number;
    preactivity_approved: number;
    advance_request_submitted: number;
    advance_request_approved: number;
    executed: number;
    post_activity_submitted: number;
    post_activity_approved: number;
    post_expense_submitted: number;
    post_expense_approved: number;
    travel_expense_submitted: number;
    travel_expense_approved: number;
    budget:string;
    event_division:string;
  };
   export  type ChildVendor = {
      name: string;
      owner: string;
      creation: string;
      modified: string;
      modified_by: string;
      docstatus: number;
      idx: number;
      vendor_type: string;
      actual_amount: number;
      status: string;
      file: string | null;
      event_conclusion: string | null;
      vendor_name: string | null;
      advance: number;
      budget_category: string;
      advance_expense_check: number;
      travel_expense_check: number;
      est_amount: number;
      gst_included: number;
      gst: string;
      occurrence_no: number;
      post_expense_check: number;
      document_no: string | null;
      invoice_date: string | null;
      invoice_amount: number;
      division: string | null;
      nature: string | null;
      gl_code: string | null;
      zone: string | null;
      narration: string | null;
      posting_date: string | null;
      basic_amount: number;
      tds: number;
      cost_center: string | null;
      company_name: string | null;
      utr_number: string | null;
      state: string | null;
      invoice_number: string | null;
      finance_gst: string | null;
      net_amount: number;
      cc_name: string | null;
      gl_name: string | null;
      payment_date: string | null;
      city: string | null;
      parent: string;
      parentfield: string;
      parenttype: string;
      doctype: string;
    };
   export type ChildOccurrence = {
      name: string;
      owner: string;
      creation: string;
      modified: string;
      modified_by: string;
      docstatus: number;
      idx: number;
      occurrence_no: number;
      is_declared: number;
      occurrence_date: string | null;
      travel_vendor_status: string;
      submitted_by: string | null;
      status: string;
      preactivity_submitted: number;
      preactivity_approved: number;
      executed: number;
      advance_request_submitted: number;
      advance_request_approved: number;
      post_activity_submitted: number;
      post_activity_approved: number;
      post_expense_submitted: number;
      post_expense_approved: number;
      travel_expense_submitted: number;
      travel_expense_approved: number;
      parent: string;
      parentfield: string;
      parenttype: string;
      doctype: string;
    };
   export type Document = {
      activity_type: string;
      document: {
          type: string;
          file: {
              name: string;
              url: string;
              file_name: string;
          }[];
      }[];
    };
  export type FormDataType = {
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
    compensation: CompensationType[];
    logistics: LogisticsType[];
    total_compensation_expense: number;
    total_logistics_expense: number;
    event_requestor: string;
    business_unit: string;
    division_category: string;
    division_sub_category: string;
    sub_type_of_activity: string;
    any_govt_hcp: string,
    no_of_hcp: number,
    hcp_ref_no:string,
    reporting_head:string,
    event_division:string
  };
   export type CompensationType = {
      vendor_type: string;
      vendor_name: string;
      est_amount: number;
      gst_included?: number;
    };
   export type LogisticsType = {
      vendor_type: string;
      est_amount: number;
    };
   export type cityDropdown = {
      name: string;
      city: string
    }[];