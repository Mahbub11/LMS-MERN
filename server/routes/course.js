const router= require('express').Router();
const uploadCourseController= require('../controller/uploadCourseController');

router.post('/upload-course',uploadCourseController.uploadCourse);


module.exports= router;