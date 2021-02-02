const baseUrl = 'http://egbin-test-api.herokuapp.com'; 
const Endpoints = {
    Login: `${baseUrl}/login`,
    Staffs: `${baseUrl}/staffs`, 
    Leave: `${baseUrl}/leave`,
    RejectLeave: `${baseUrl}/rejectleave`, 
    ApproveLeave: `${baseUrl}/approveleave`, 
    LineManagers:  `${baseUrl}/linemanagers`,
    PendingLeave: `${baseUrl}/pendingleave`,
    ApprovedLeave: `${baseUrl}/approvedleave`,
    RejectedLeave: `${baseUrl}/rejectedleave`,
}; 

module.exports = Endpoints; 