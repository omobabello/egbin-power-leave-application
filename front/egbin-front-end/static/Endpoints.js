const baseUrl = 'http://localhost:3000'; 

const Endpoints = {
    Login: `${baseUrl}/login`,
    Staffs: `${baseUrl}/staffs`, 
    Leave: `${baseUrl}/leave`,
    LineManagers:  `${baseUrl}/linemanagers`,
    PendingLeave: `${baseUrl}/pendingleave`,
    ApprovedLeave: `${baseUrl}/approvedleave`,
    RejectedLeave: `${baseUrl}/rejectedleave`,
}; 

module.exports = Endpoints; 