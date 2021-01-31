const Staffs = require('../models/staff');
const bcrypt = require('bcrypt');
const routes = (app) => {

    app.get('/staffs', async (request, response) => {
        try {
            const staffs = await Staffs.getStaffs();
            response.json({
                success: true,
                staffs
            });
        } catch (error) {
            response.json({
                success: false,
                error: error.toString()
            })
        }
    });

    app.get('/linemanagers', async (request, response) => {
        try {
            const staffs = await Staffs.getLineManagers();
            response.json({
                success: true,
                staffs
            })
        } catch (error) {
            response.json({
                success: false,
                error: error.toString()
            })
        }
    });

    app.get('/staffs/:id', async (request, response) => {
        try {
            const staff = await Staffs.getStaffById(request.params.id);
            if (!!staff) {
                response.json({
                    success: true,
                    staff
                });
            } else {
                response.json({
                    success: false,
                    error: "Staff not found"
                });
            }
        } catch (error) {
            response.json({
                success: false,
                error: error.toString()
            })
        }
    });

    app.post('/login', async (request, response) => {
        try {
            const staff = await Staffs.getStaffById(request.body.StaffId);
            if (!!staff) {
                const isCorectPassword = bcrypt.compareSync(request.body.Password, staff.Password);
                if (isCorectPassword) {
                    return response.json({
                        success: true,
                        staff,
                    })
                }
            }
            response.json({
                success: false,
                error: "Wrong credentials submitted"
            });
        } catch (error) {
            response.json({
                success: false,
                error: error.toString()
            })
        }
    });

    app.post('/staffs', async (request, response) => {
        try {
            const staff = await Staffs.createStaff(request.body);
            return response.json({
                success: true,
                staff
            });
        } catch (error) {
            response.json({
                success: false,
                error: error.toString()
            })
        }
    });

    app.put('/staffs', async (request, response) => {
        try {
            let staff = await Staffs.getStaffById(request.body.ID);
            if (!!staff) {
                let updatedStaff = await Staffs.updateStaff(request.body);
                response.json({
                    success: true,
                    data: updatedStaff
                });
            } else {
                response.json({
                    success: false,
                    error: `Staff with ID ${request.params.id} not found`
                })
            }
        } catch (error) {
            response.json({
                success: false,
                error: error.toString()
            })
        }
    });

    app.delete('/staffs/:id', async (request, response) => {
        try {
            let data = await Staffs.deleteStaff(request.params.id);
            let message = !!data ? 'Staff deleted' : 'Staff not found';
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
}


module.exports = routes; 