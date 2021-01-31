import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import AdminHome from '@/components/AdminHome';
import NewStaff from '@/components/NewStaff';
import EditStaff from '@/components/EditStaff';
import AdminLeaveRequests from '@/components/AdminLeaveRequests';
import StaffLeaves from '@/components/StaffLeaves';
import NewLeaveRequest from '@/components/NewLeaveRequest';

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Login', component: HelloWorld },
    { path: '/Login', name: 'Login', component: Login},
    { path: '/admin/home', name: 'AdminHome', component: AdminHome},
    { path: '/admin/staffs', name: 'AdminHome', component: AdminHome},
    { path: '/admin/newstaff', name: 'NewStaff', component: NewStaff},
    { path: '/admin/editstaff', name: 'EditStaff', component: EditStaff},
    { path: '/admin/leaverequests', name: 'AdminLeaveRequests', component: AdminLeaveRequests},
    { path: '/home', name: 'StaffLeaves', component: StaffLeaves},
    { path: '/leaves', name: 'StaffLeaves', component: StaffLeaves}, 
    { path: '/newleaverequest', name: 'NewLeaveRequest', component: NewLeaveRequest}, 
  ]
})
