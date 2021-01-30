const db = require('../database/dbconnection');
const uuid = require('uuid');
const moment = require('moment');
module.exports = {
    requestLeave(leave) {
        leave.LeaveID = uuid();
        leave.DateRequested = moment().format("YYYY-MM-DD HH:mm:ss");
        const query = "INSERT INTO leaverequests SET ? ";
        return new Promise((resolve, reject) => {
            db.query(query, leave, (error, data) => {
                if (error) reject(error);
                resolve(leave);
            });
        });
    },
    approveLeave(leave) {
        leave.ApprovalID = uuid();
        leave.DateApproved = moment().format("YYYY-MM-DD HH:mm:ss");
        const query = "INSERT INTO approvedleaverequests SET ? ";
        return new Promise((resolve, reject) => {
            db.query(query, leave, (error, data) => {
                if (error) reject(error);
                resolve(leave)
            })
        })
    },
    rejectLeave(leave) {
        leave.RejectionID = uuid();
        leave.DateRejected = moment().format('YYYY-MM-DD HH:mm:ss');
        const query = "INSERT INTO rejectedleaverequests SET ? ";
        return new Promise((resolve, reject) => {
            db.query(query, leave, (error, data) => {
                if (error) reject(error);
                resolve(leave);
            })
        });
    },
    editLeave(leave) {
        const query = `UPDATE leaverequests SET ? WHERE LeaveID = '${leave.LeaveID}'; 
                       SELECT * FROM leaverequests WHERE LeaveID = '${leave.LeaveID}' `;
        return new Promise((resolve, reject) => {
            db.query(query, leave, (error, data) => {
                if (error) reject(error);
                resolve(data[1][0]);
            });
        });
    },
    deleteLeave(leave) {
        const query = `DELETE FROM leaverequests WHERE LeaveID = '${leave}'`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, data) => {
                if (error) reject(error);
                resolve(data);
            });
        })
    },
    getStaffsPendingLeaveRequests(staff) {
        const query = `SELECT lr.* FROM leaverequests as lr 
                       LEFT JOIN approvedleaverequests as ar ON lr.LeaveID = ar.LeaveID
                       LEFT JOIN rejectedleaverequests as rr ON lr.LeaveID = rr.LeaveID
                       WHERE ar.LeaveID IS NULL AND rr.LeaveID IS NULL and lr.RequestedBy = ${staff}
                       ORDER BY lr.DateRequested DESC`;

        return new Promise((resolve, reject) => {
            db.query(query, (error, data) => {
                if (error) reject(error);
                resolve(data);
            });
        });
    },
    getLineManagersPendingLeaveRequests(manager) {
        const query = `SELECT lr.*, concat(s.FirstName,' ',s.LastName) as Requester 
                        FROM leaverequests as lr
                        JOIN staffs as s ON lr.RequestedBy = s.ID
                        LEFT JOIN approvedleaverequests as ar ON lr.LeaveID = ar.LeaveID
                        LEFT JOIN rejectedleaverequests as rr ON lr.LeaveID = rr.LeaveID
                        WHERE ar.LeaveID IS NULL AND rr.LeaveID IS NULL AND s.LineManager = '${manager}'
                        ORDER BY lr.DateRequested DESC`;

        return new Promise((resolve, reject) => {
            db.query(query, (error, data) => {
                if (error) reject(error);
                resolve(data);
            })
        });
    },
    getAdminPendingLeaveRequests() {
        const query = `SELECT lr.*, concat(s.FirstName,' ',s.LastName) as Requester 
                        FROM leaverequests as lr
                        JOIN staffs as s ON lr.RequestedBy = s.ID
                        LEFT JOIN approvedleaverequests as ar ON lr.LeaveID = ar.LeaveID
                        LEFT JOIN rejectedleaverequests as rr ON lr.LeaveID = rr.LeaveID
                        WHERE ar.LeaveID IS NULL AND rr.LeaveID IS NULL
                        ORDER BY lr.DateRequested DESC`;

        return new Promise((resolve, reject) => {
            db.query(query, (error, data) => {
                if (error) reject(error);
                resolve(data);
            })
        });
    },
    getStaffsApprovedLeaveRequests(staff) {
        const query = `SELECT lr.*, ar.* , concat(s.FirstName,' ',s.LastName) as Approver
                       FROM leaverequests as lr
                       JOIN approvedleaverequests as ar ON lr.LeaveID = ar.LeaveID
                       LEFT JOIN staffs as s ON ar.ApprovedBy = s.ID
                       WHERE lr.RequestedBy = '${staff}'`;

        return new Promise((resolve, reject) => {
            db.query(query, (error, data) => {
                if (error) reject(error);
                resolve(data);
            });
        });
    },
    getLineManagersApprovedLeaveRequests(manager) {
        const query = `SELECT lr.*, ar.* , concat(s.FirstName,' ',s.LastName) as Requester
                       FROM approvedleaverequests as ar
                       JOIN leaverequests as lr ON ar.LeaveID = lr.LeaveID
                       LEFT JOIN staffs as s ON lr.RequestedBy = s.ID
                       WHERE ar.ApprovedBy = '${manager}'`;

        return new Promise((resolve, reject) => {
            db.query(query, (error, data) => {
                if (error) reject(error);
                resolve(data);
            });
        });
    },
    getStaffsRejectedLeaveRequests(staff) {
        const query = `SELECT lr.*, rr.* , concat(s.FirstName,' ',s.LastName) as Rejecter
                       FROM leaverequests as lr
                       JOIN rejectedleaverequests as rr ON lr.LeaveID = rr.LeaveID
                       LEFT JOIN staffs as s ON rr.RejectedBy = s.ID
                       WHERE lr.RequestedBy = '${staff}'`;

        return new Promise((resolve, reject) => {
            db.query(query, (error, data) => {
                if (error) reject(error);
                resolve(data);
            });
        });
    },
    getLineManagersRejectedLeaveRequests(manager) {
        const query = `SELECT lr.*, rr.*, concat(s.FirstName,' ',s.LastName) as Requester
                       FROM rejectedleaverequests as rr 
                       JOIN leaverequests as lr ON rr.LeaveID = lr.LeaveID
                       LEFT JOIN staffs as s ON lr.RequestedBy = s.ID
                       WHERE rr.RejectedBy = '${manager}'`;

        return new Promise((resolve, reject) => {
            db.query(query, (error, data) => {
                if (error) reject(error);
                resolve(data);
            });
        });
    },
}