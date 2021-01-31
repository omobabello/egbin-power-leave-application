import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AdminHome from '@/components/AdminHome';
import NewStaff from '@/components/NewStaff';
import EditStaff from '@/components/EditStaff';
import AdminPendingRequests from '@/components/AdminPendingRequests';
import AdminApprovedRequests from '@/components/AdminApprovedRequests';
import AdminRejectedRequests from '@/components/AdminRejectedRequests';
import StaffLeaves from '@/components/StaffLeaves';
import NewLeaveRequest from '@/components/NewLeaveRequest';
import EditLeaveRequest from '@/components/EditLeaveRequest';
import ApprovedRequest from '@/components/ApprovedRequests';
import RejectedRequest from '@/components/RejectedRequests';
import PendingStaffRequest from '@/components/PendingStaffRequest';
import ApprovedStaffRequest from '@/components/ApprovedStaffRequests';
import RejectedStaffRequest from '@/components/RejectedStaffRequests';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'StaffLeaves', component: StaffLeaves },
    { path: '/Login', name: 'Login', component: Login},
    { path: '/admin/home', name: 'AdminHome', component: AdminHome},
    { path: '/admin/staffs', name: 'AdminHome', component: AdminHome},
    { path: '/admin/newstaff', name: 'NewStaff', component: NewStaff},
    { path: '/admin/editstaff', name: 'EditStaff', component: EditStaff},
    { path: '/admin/pendingrequests', name: 'AdminPendingRequests', component: AdminPendingRequests},
    { path: '/admin/approvedrequests', name: 'AdminApprovedRequests', component: AdminApprovedRequests},
    { path: '/admin/rejectedrequests', name: 'AdminRejectedRequests', component: AdminRejectedRequests},
    { path: '/home', name: 'StaffLeaves', component: StaffLeaves},
    { path: '/leaves', name: 'StaffLeaves', component: StaffLeaves}, 
    { path: '/newleaverequest', name: 'NewLeaveRequest', component: NewLeaveRequest}, 
    { path: '/editleaverequest', name: 'EditLeaveRequest', component: EditLeaveRequest}, 
    { path: '/approvedrequests', name: 'ApprovedRequests', component: ApprovedRequest}, 
    { path: '/rejectedrequests', name: 'RejectedRequests', component: RejectedRequest},  
    { path: '/pendingstaffrequests', name: 'PendingStaffRequest', component: PendingStaffRequest},  
    { path: '/approvedstaffrequests', name: 'ApprovedStaffRequest', component: ApprovedStaffRequest},  
    { path: '/rejectedstaffrequests', name: 'RejectedStaffRequests', component: RejectedStaffRequest},  
  ]
})
