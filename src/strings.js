import Vue from 'vue'

const strings = Vue.observable({
  alerts: {
    ok: 'Ok',
    cancel: 'Cancel',
  },
  table: {
    action_details: 'Details',
    action_edit: 'Edit',
    action_delete: 'Delete',
    action_delete_selected: 'Delete selected',
    delete_confirmation_title: 'Proceed with deleting?',
    delete_confirmation: 'Please, confirm deleting this record',
    delete_selected_confirmation: 'Please, confirm deleting selected records',
    search: 'Search ...',
    search_clear: 'Clear',
    selected: 'Selected ({count})',
    selected_actions: 'Actions',
    total_records: 'Total records: {count}',
  },
  auth: {
    email: 'Email',
    password: 'Password',
    login_header: 'Login to your account',
    login_desc: 'Enter your credentials below',
    login_register_text: 'Have not account yet?',
    login_forgot_text: 'Forgot password?',
    sign_in: 'Sign in',
    sign_up: 'Sign up',
    sign_out: 'Logout',
    register_header: 'Create account',
    register_desc: 'All fields are required',
    register_login_text: 'Already Have Account?',
    forgot_submit: 'Send instructions',
    forgot_header: 'Password recovery',
    forgot_desc: "We'll send you instructions in email",
    forgot_login_text: 'Back to login',
  },
})

export default strings