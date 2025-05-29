const express = require('express');
const Employee = require('../model/user');
const Attendance = require('../model/Attendance');
const router = express.Router();
router.get('/user', async(req, res) => {
    const employees = await Employee.find({}, { password: 0 });
    res.json(employees);
});


router.get('/attendances', async(req, res) => {
    const records = await Attendance.find({});
    res.json(records);
});

module.exports = router;