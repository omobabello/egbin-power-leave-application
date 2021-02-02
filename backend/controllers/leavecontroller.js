const Leave = require('../models/leave');
const moment = require('moment');
require('moment-business-days');
const { getStaffById, getLeaveBalance } = require('../models/staff');
const { request } = require('express');
const routes = (app) => {

    app.post('/leave', async (request, response) => {
        try {
            const workingDays = moment(request.body.StartDate, 'YYYY-MM-DD').businessDiff(moment(request.body.EndDate, 'YYYY-MM-DD'));
            let leaveBalance = 0;
            if (workingDays <= 14) {
                leaveBalance = await getLeaveBalance(request.body.RequestedBy, request.body.LeaveType);
                if (leaveBalance >= 0) {
                    const leave = await Leave.requestLeave(request.body);
                    return response.json({
                        success: true,
                        leave
                    })
                }
            }
            response.json({
                success: false,
                message: "Your request exceeds the allowed number of days"
            })
        } catch (error) {
            response.json({
                success: false,
                error: error.toString()
            })
        }
    });

    app.get('/leave/:id', async (request, response) => {
        try {
            const leave = await Leave.getLeave(request.params.id);
            response.json({
                success: true,
                leave
            })
        } catch (error) {
            response.json({
                success: false,
                error: error.toString()
            })
        }
    });

    app.put('/leave', async (request, response) => {
        try {
            const leave = await Leave.editLeave(request.body);
            response.json({
                success: true,
                leave
            });
        } catch (error) {
            response.json({
                success: false,
                error: error.toString()
            })
        }
    });


    app.delete('/leave/:id', async (request, response) => {
        try {
            const data = await Leave.deleteLeave(request.params.id);
            const message = !!data ? 'Request Deleted' : 'Request Not Found';
            response.json({
                success: true,
                message
            })
        } catch (error) {
            response.json({
                success: false,
                error: error.toString()
            })
        }
    });


    app.post('/approveleave', async (request, response) => {
        try {
            const workingDays = moment(request.body.StartDate, 'YYYY-MM-DD').businessDiff(moment(request.body.EndDate, 'YYYY-MM-DD'));
            const LeaveBalanceBefore = await getLeaveBalance(request.body.RequestedBy, request.body.LeaveType);
            const LeaveBalanceAfter = LeaveBalanceBefore - workingDays;
            if (LeaveBalanceAfter >= 0) {
                const leave = {
                    LeaveID: request.body.LeaveID,
                    ApprovedBy: request.body.ApprovedBy,
                    ApprovalComment: request.body.ApprovalComment,
                    LeaveBalanceBefore,
                    LeaveBalanceAfter
                };
                const approval = await Leave.approveLeave(request.body.LeaveType,workingDays,leave,request.body.RequestedBy);
                response.json({
                    success: true,
                    approval
                });
            } else {
                response.json({
                    success: false,
                    message: 'Number of days requested exceeds available balance',
                    LeaveBalanceBefore,
                    LeaveBalanceAfter
                })
            }
        } catch (error) {
            response.json({
                success: false,
                error: error.toString()
            })
        }
    });


    app.post('/rejectleave', async (request, response) => {
        try {
            const rejection = await Leave.rejectLeave(request.body);
            response.json({
                success: false,
                rejection
            });
        } catch (error) {
            response.json({
                success: false,
                error: error.toString()
            })
        }
    });

    app.get('/pendingleave/:requester/:id?', async (request, response) => {
        try {
            let leaves = null;
            switch (request.params.requester) {
                case 'staff': leaves = await Leave.getStaffsPendingLeaveRequests(request.params.id); break;
                case 'linemanager': leaves = await Leave.getLineManagersPendingLeaveRequests(request.params.id); break;
                case 'admin': leaves = await Leave.getAdminPendingLeaveRequests(); break;
                default: return response.status(404).json(null);
            }
            response.json({
                success: true,
                leaves
            });
        } catch (error) {
            response.json({
                success: false,
                error: error.toString()
            })
        }
    });

    app.get('/approvedleave/:requester/:id?', async (request, response) => {
        try {
            let leaves = null;
            switch (request.params.requester) {
                case 'staff': leaves = await Leave.getStaffsApprovedLeaveRequests(request.params.id); break;
                case 'linemanager': leaves = await Leave.getLineManagersApprovedLeaveRequests(request.params.id); break;
                case 'admin': leaves = await Leave.getAdminApprovedLeaveReqeusts(); break;
                default: return response.status(404).json(null);
            }
            response.json({
                success: true,
                leaves
            })
        } catch (error) {
            response.json({
                success: false,
                error: error.toString()
            })
        }
    });

    app.get('/rejectedleave/:requester/:id?', async (request, response) => {
        try {
            let leaves = null;
            switch (request.params.requester) {
                case 'staff': leaves = await Leave.getStaffsRejectedLeaveRequests(request.params.id); break;
                case 'linemanager': leaves = await Leave.getLineManagersRejectedLeaveRequests(request.params.id); break;
                case 'admin': leaves = await Leave.getAdminRejectedLeaveRequests(); break;
                default: return response.status(404).json(null);
            }
            response.json({
                success: true,
                leaves
            })
        } catch (error) {
            response.json({
                success: false,
                error: error.toString()
            });
        }
    });

};

module.exports = routes; 