const catchAsyncError = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
const ContentModel = require("../model/Content");
const CourseDes = require("../model/CourseDes");
const CourseSection = require("../model/CourseSection");
var currentPath = process.cwd();
const { getVideoDurationInSeconds } = require("get-video-duration");
var mongoose = require('mongoose')

exports.addCourse = catchAsyncError(async (req, res, next) => {
  const {
    title,
    category,
    subtitle,
    description,
    learningOutcomes,
    requirenments,
    price,
    discount,
  } = req.body;
  try {
    const data = await CourseDes.create({
      title: title,
      category: category,
      subtitle: subtitle,
      description: description,
      price: price,
      discount: discount,
      learningoutcomes: learningOutcomes,
      requirenments: requirenments,
      instructorId: "64e6727698ed7e98ee9f48ee",
    });


    res.status(201).json({
      success: true,
      message: `Couerse Descripton Successfully`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: `error: ${error}`,
    });
  }
});

exports.uploadContent = catchAsyncError(async (req, res, next) => {
  const { size, filename, originalname, path } = req.file;
  const { sectionId, type } = req.body;
  let duration;
  await getVideoDurationInSeconds(path).then((frametime) => {
    duration = frametime;
  });


  try {
    const data = await ContentModel.create({
      content: filename,
      name: originalname,
      duration: duration,
      sectionId: sectionId,
      size: size,
      type: type,
    });

      await CourseSection.findOneAndUpdate({_id:sectionId},
      {$push:{content: data._id}})

    res.status(201).json({
      success: true,
      message: `Couerse Added Successfully`,
      content: data,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `error: ${error}`,
    });
  }
});

exports.getFile = catchAsyncError(async (req, res, next) => {
  try {
    const { sectionId } = req.params;
  

    const data = await ContentModel.find({
      sectionId: sectionId,
    });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {}
});
exports.deleteContent = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  try {
    // delete from disl storage
    const directoryPath = currentPath + "/uploads/content/";
    await ContentModel.findByIdAndDelete(id).then((res) => {
    
      fs.unlinkSync(directoryPath + res.content);
    });
    res.status(201).json({
      success: true,
      message: "Content deleted",
    });
  } catch (error) {}
});

exports.addCoursesection = catchAsyncError(async (req, res, next) => {
  const { title, description, courseId } = req.body;
  try {
    const data = await CourseSection.create({
      title: title,
      description: description,
      courseId: courseId,
    });

    res.status(201).json({
      success: true,
      message: "Sections created successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: true,
      message: "Section Creation failed",
      error: error.message,
    });
  }
});

exports.getSections = catchAsyncError(async (req, res, next) => {
  const { courseId } = req.params;
  try {

    // const data= await CourseSection.find({
    //   'courseId':courseId 
    // }).populate({
    //   path:'content'
    // }).then(async(res)=>{
    //   console.log(res)
    //  const totalDuration= await ContentModel.aggregate([
    //     {
    //     $match: { "sectionId":(res._id) }
    //   },
    // ])

    // return totalDuration
    // })
  //   const data= await CourseSection.find({'courseId':courseId }
  //   , function(err, data) {
      
  //     return data
     
  // });
  

// 
  
    const data = await CourseSection.aggregate([
      {
        $match: { "courseId":new mongoose.Types.ObjectId(courseId) }
      },
      {
      $lookup:{
        from:'Content',
        localField: "_id",
        foreignField: "sectionId",
        as:"Sections"
      }
    },
    {
      "$addFields":{
        "duration":{
          "$sum":'Sections.duration'
        }
      }
    }
  ])

  // const data= await ContentModel.aggregate([
  //   {
  //     $match:{'type':"video"}
  //   },
  //   {
  //     $lookup:{
  //       from:'coursesections',
  //       localField:"sectionId",
  //       foreignField:'_id',
  //       as:"Sections"
  //     }
  //   }
  // ])
    
    
    // .aggregate({
    //   $lookup:{
    //     from:ContentModel,
    //     localField: "_id",
    //     foreignField: "sectionId",
    //     as:"Sections"

    //   }
    // })
    // .populate({
    //   path:"content"
    // })
  

    res.status(201).json({
      success: true,
      message: "Section Fetched successfully",
      // length:data.length,
      data,
      
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: true,
      message: "Section Factory Failed",
      error: error.message,
    });
  }
});
