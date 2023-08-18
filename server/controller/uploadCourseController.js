const catchAsyncError = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");

exports.uploadCourse = catchAsyncError(async (req, res, next) => {

    console.log(req.body)
    try {
        res.send(req.body)
    } catch (error) {
        
    }
   
})