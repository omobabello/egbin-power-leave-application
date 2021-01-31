const db = require('../database/dbconnection');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { reject } = require('lodash');


module.exports = {
    getStaffById(staff) {
        const query = `SELECT s.*, concat(alt.FirstName, ' ', alt.LastName) as Manager
                       FROM staffs as s
                       LEFT JOIN staffs as alt on s.ID = alt.LineManager 
                       WHERE s.ID = '${staff}'`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, data) => {
                if (error) reject(error);
                resolve(!!data ? data[0] : null);
            });
        });
    },
    getStaffs() {
        const query = "SELECT * FROM staffs ORDER BY DateRegistered DESC";
        return new Promise((resolve, reject) => {
            db.query(query, (error, data) => {
                if (error) reject(error);
                resolve(data);
            });
        })
    },
    getLineManagers() {
        const query = "SELECT * FROM staffs WHERE IsLineManager = 1 ORDER BY FirstName, LastName DESC";
        return new Promise((resolve, reject) => {
            db.query(query, (error, data) => {
                if (error) reject(error);
                resolve(data);
            })
        });
    },
    getLeaveBalance(staff, type) {
        const query = `SELECT * FROM staffs WHERE ID = ${staff}`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, data) => {
                if (error) reject(error);
                let leaveBalance = null;
                switch (type) {
                    case 'sickleave': leaveBalance = data[0].SickLeaveBalance; break;
                    case 'examleave': leaveBalance = data[0].ExamLeaveBalance; break;
                    case 'compassionateleave': leaveBalance = data[0].CompassionateLeaveBalance; break;
                    case 'annualleave': leaveBalance = data[0].AnnualLeaveBalance; break;
                }
                resolve(leaveBalance);
            });
        })
    },
    createStaff(staff) {
        staff.Password = bcrypt.hashSync(staff.Password, 10);
        staff.SickLeaveBalance = 10;
        staff.ExamLeaveBalance = 5;
        staff.CompassionateLeaveBalance = 15;
        staff.AnnualLeaveBalance = 20;
        staff.DateRegistered = moment().format("YYYY-MM-DD HH:mm:ss");
        const query = "INSERT INTO staffs SET ?";
        return new Promise((resolve, reject) => {
            db.query(query, staff, (error, result) => {
                if (error) reject(error);
                resolve({ ID: result.insertId, ...staff });
            })
        })
    },
    updateStaff(staff) {
        const query = `UPDATE staffs SET ? WHERE ID = ${staff.ID};
                       SELECT * FROM staffs WHERE ID = ${staff.ID}`;
        return new Promise((resolve, reject) => {
            db.query(query, staff, (error, result) => {
                if (error) reject(error);
                resolve(result[1][0]);
            })
        });
    },
    deleteStaff(staff) {
        const query = `DELETE FROM staffs WHERE ID = ${staff}`;
        return new Promise((resolve, reject) => {
            db.query(query, (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        });
    }
};

