export const BASEURLLOGIN = 'http://13.48.210.251:3000/api';
export const BASEURL = 'http://13.48.210.251:3000/api/';
export const IMAGE_UPLOAD = 'http://13.48.210.251:3000/api/upload';
// export const SHOW_IMAGE = 'http://43.205.55.71:3000/images/';
export const PDF_UPLOAD = 'http://13.48.210.251:3000/api/job/upload-pdf';
const apiName = {
  GET_BANNER:'banner/get-banner',
  LOGIN: 'api',
  JOBSEEKER_REGISTER: 'signUp/',
  VERIFY_OTP: 'verify-otp?id=',
  EDIT_PROFILE_JobSEEKER: 'update-user-profile?userType=jobSeeker',
  CAMPANY_RESITER: 'job/create-company-profile/',
  EDIT_CAMPANY_PROFILE: 'update-user-profile?userType=jobProvider',
  GET_PROFILE_DATA: 'get-job-provider-profile',
  POST_JOB: 'job/job-profile-provider',
  CAMAPANY_POSTED_JOB: 'job/get-list-of-jobs-of-job-providers',
  JOBSEEKER_PROFILE_DATA: 'get-user-profile',
  JOBSEEKER_JOB_INFO: 'job/user-job-profile',
  SHOW_JOB_TO_JOBSEEKER: 'job/get-job-profiles?page=',
JOB_EDIT:'job/edit-job-profile?id=',
DELETE_UPLOADED_JOB:'job/delete-job-profile?id=',
USER_DELETE : 'job/delete-user-profile',
CONTACT_US:'job/create-contactUs',
REPORT_JOB : 'report/report-job?jobId=',
APPLY_JOB :'job/user-apply-jobs?jobId=',
GET_APPYLED_JOB_USER:'job/get-user-apply-jobs?jobId=',
GET_JOB_TYPE:'job/get-job-category',
SUB_CATEGORY_GET:'job/get-sub-category-on-the-basis-of-categories?id=',
LIKE_UNLIKE:'job/like-unlike-jobProfile',
GET_LIKED_JOBS:'job/list-Liked-jobs',
GET_APPLYED_JOBS:'job/get-all-applied-jobs',
POST_MESSAGE:'message',
Get_message:'message/get-message?id=',
get_all_jobs:'job/get-All-jobs?page=',
Delete_Appled_Jobs:'job/delete-applied-jobs?id=',
SEARCH_API:'/job/get-All-jobs?search=',
};
export default apiName;
