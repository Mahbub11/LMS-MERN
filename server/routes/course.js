const router= require('express').Router();
const uploadCourseController= require('../controller/uploadCourseController');
const { upload}= require('../multer')

router.post('/add-course',uploadCourseController.addCourse);
router.post('/add-section',uploadCourseController.addCoursesection);
router.put('/update-content',uploadCourseController.updateContent);
router.post('/upload-content',upload('content').single("file"),uploadCourseController.uploadContent);
router.get('/files/:sectionId',uploadCourseController.getFile);
router.get('/get-sections/:courseId',uploadCourseController.getSections);
router.get('/get-section/:courseId',uploadCourseController.fetchSections);
router.delete('/files/:id',uploadCourseController.deleteContent)



module.exports= router;