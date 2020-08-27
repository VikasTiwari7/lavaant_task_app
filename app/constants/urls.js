// api base url
export const BASE_URL = 'http://93.188.167.68:6100/api';

// login/register
export const LOGIN_URL = '/users/login';
export const REGISTER_USER_URL = "/users/register";

// get user
export const GET_USER_URL = "/users/getById/";

// update device token  -- firebase token
export const UPDATE_USER_DEVICE_TOKEN = "/users/deviceToken/addOrRemove/";

// user update
export const UPDATE_USER_URL = "/users/update/";
export const UPLOADIMAGE_URL = '/uploads/image/'

// password
export const ResetPassword_URL = '/users/resetPassword';
export const SEND_OTP_URL = '/users/otp'
export const VERIFY_OTP_URL = '/users/otp/verify'
export const FORGOTPASSWORD_URL = '/users/forgotPassword'

// tasks
export const CREATE_TASKCATEGORIES_URL = "/categories"
export const GET_TASKCATEGORIES_URL = "/categories?"
export const PUT_TASKCATEGORIES_URL = "/categories/"
export const CREATE_TASK_URL = "/tasks"
export const GET_TASKLIST_URL = '/tasks?'
export const PUT_UPDATE_TASK_BY_STATUS_URL = '/tasks/updateStatus/'
export const DELETE_TASK_URL = '/tasks/delete/'
export const UPDATE_TASK_URL = "/tasks/update/"
export const TASK_LIST_URL = "/tasks/list?"
export const FACEBOOK_LOGIN = "/users/facebook/login"
// polices
export const TERM_AND_POLICIES = "http://93.188.167.68:6100/term&policies"
