import request from './request';

// post requests with data
export function candidateLogin(data) {
  return request({
    url: 'candidatemobilelogin',
    method: 'post',
    data,
  });
}

export function getStatusList(id) {
  return request({
    url: `timesheet?account_id=${id}&type=status_list`,
    method: 'get',
  });
}
export function addTimeSheet(data) {
  return request({
    url: `timesheet?isApp=1`,
    method: 'post',
    data,
  });
}
export function EditTimeSheet(id, data) {
  return request({
    url: `timesheet/${id}`,
    method: 'put',
    data,
  });
}
export function EditExpense(id, data) {
  return request({
    url: `expenses/${id}`,
    method: 'put',
    data,
  });
}
export function addExpense(data) {
  return request({
    url: `expenses`,
    method: 'post',
    data,
  });
}

export function addLeaveRequest(data) {
  return request({
    url: `leaves`,
    method: 'post',
    data,
  });
}

export function updateLeaveRequest(data, id) {
  return request({
    url: `leaves/${id}`,
    method: 'put',
    data,
  });
}

export function DeleteLeaveRequest(id) {
  return request({
    url: `leaves/${id}`,
    method: 'delete',
  });
}
/// get requests
export function getCandidateDetailsById(id) {
  return request({
    url: `candidates/${id}`,
    method: 'get',
  });
}

export function listTimeSheetByCandidateId(account_id, candidate_id) {
  return request({
    url: `timesheet?account_id=${account_id}&candidate_id=${candidate_id}&type=timesheet_list`,
    method: 'get',
  });
}

export function jobTimeTypes(account_id, job_id) {
  return request({
    url: `timesheet?account_id=${account_id}&job_id=${job_id}&type=job_time_types`,
    method: 'get',
  });
}

export function getEditTimeSheetDetails(
  time_sheet_id,
  candidate_id,
  account_id,
  job_id,
) {
  return request({
    url: `timesheet?account_id=${account_id}&job_id=${job_id}&time_sheet_id=${time_sheet_id}&candidate_id=${candidate_id}&type=timesheet_edit_details`,
    method: 'get',
  });
}

export function timeSheetDetailsById(timesheet_id, account_id) {
  return request({
    url: `timesheet?account_id=${account_id}&time_sheet_id=${timesheet_id}&type=timesheet_details`,
    method: 'get',
  });
}

export function listCandidateJobs(account_id, candidate_id, approver_type = 1) {
  return request({
    url: `timesheet?account_id=${account_id}&approver_type=${approver_type}&candidate_id=${candidate_id}&type=job_list`,
    method: 'get',
  });
}

export function getJobWorkingDays(account_id, job_id) {
  return request({
    url: `timesheet?account_id=${account_id}&job_id=${job_id}&type=work_days`,
    method: 'get',
  });
}

export function getExpenseslist(account_id, candidate_id) {
  return request({
    url: `expenses?account_id=${account_id}&candidate_id=${candidate_id}&type=expenses_list`,
    method: 'get',
  });
}

export function getExpensesDetails(account_id, expense_id) {
  return request({
    url: `expenses?account_id=${account_id}&expense_id=${expense_id}&type=expenses_details`,
    method: 'get',
  });
}

export function getExpenseTypeCategoryBillType(account_id, company_id) {
  return request({
    url: `expenses?account_id=${account_id}&company_id=${company_id}&type=expenses_type`,
    method: 'get',
  });
}

export function getJobs(account_id, item_id) {
  console.log(
    `jobs?associatedjobs=career_portal_jobs&account_id=${account_id}&type=candidate&item_id=${item_id}`,
  );
  return request({
    url: `jobs?associatedjobs=career_portal_jobs&account_id=${account_id}&type=candidate&item_id=${item_id}`,
    method: 'get',
  });
}
export function getEditExpensesDetails(account_id, expense_id, candidate_id) {
  return request({
    url: `expenses?account_id=${account_id}&expense_id=${expense_id}&candidate_id=${candidate_id}&type=edit_expenses_details`,
    method: 'get',
  });
}

export function getLeavesList(account_id, candidate_id) {
  return request({
    url: `leaves?account_id=${account_id}&candidate_id=${candidate_id}&type=list_candidate_leaves`,
    method: 'get',
  });
}

export function getleavesBalance(account_id, candidate_id, policy_id) {
  return request({
    url: `leaves?account_id=${account_id}&policy_id=${policy_id}&candidate_id=${candidate_id}&type=leave_balance`,
    method: 'get',
  });
}

export function getpolicylist(account_id) {
  return request({
    url: `leaves?account_id=${account_id}&type=list_policy`,
    method: 'get',
  });
}
export async function uploadFile(data) {
  var myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
  );
  // myHeaders.append("Content-Type", "multipart/form-data; boundary=<calculated when request is sent>");
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow',
  };

  return fetch('https://0a7f-203-82-55-110.ngrok.io/files', requestOptions);
}

// delete request

export async function DeleteTimeSheet(id) {
  return request({
    url: `timesheet/${id}`,
    method: 'delete',
  });
}

export async function DeleteExpense(id) {
  return request({
    url: `expenses/${id}`,
    method: 'delete',
  });
}
