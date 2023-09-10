const catchAsyncError = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
const ContentModel = require("../model/Content");
const CourseDesModel = require("../model/CourseDes");
const CourseSectionModel = require("../model/CourseSection");
var currentPath = process.cwd();
const { getVideoDurationInSeconds } = require("get-video-duration");
var mongoose = require("mongoose");

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
    const data = await CourseDesModel.create({
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
  const { size, filename, originalname, path,order } = req.file;
  const { sectionId, type } = req.body;
  let duration;
  await getVideoDurationInSeconds(path).then((frametime) => {
    duration = frametime;
  });

  try {
    const length= await ContentModel.count();
    const data = await ContentModel.create({
      content: filename,
      name: originalname,
      duration: duration,
      sectionId: sectionId,
      size: size,
      type: type,
      order: length
    });

    await CourseSectionModel.findOneAndUpdate(
      { _id: sectionId },
      { $push: { content: data._id } }
    );

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

exports.updateContent = catchAsyncError(async (req, res, next) => {

  // print the req data

  const data=req.body;
  try {
    
   const updated= data.map(async (item) => {
      await ContentModel.findByIdAndUpdate({_id: item._id},{order:item.order})
  })

  res.status(201).json({
    success: true,
    message: `Repository updated`,
    updated
    
  });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Repository failed `,
      error: error
    });
  }

})

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
    const data = await CourseSectionModel.create({
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
    const data = await CourseSectionModel.aggregate([
      {
        $match: { courseId: new mongoose.Types.ObjectId(courseId) },
      },
      {
        $project: {
          _id: {
            $toObjectId: "$_id",
          },
          title: 1,
          description: 1,
        },
      },

      {
        $lookup: {
          from: "contents",
          localField: "_id",
          foreignField: "sectionId",
          as: "Sections",
        },
      },
      {
        $addFields: {
          totalDuration: {
            $sum: "$Sections.duration",
          },
        },
      },
    ]);

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

// Steps
// filtering Data
// Query Content
// get total Duration

exports.fetchSections = catchAsyncError(async (req, res, next) => {
  const { courseId } = req.params;

  try {
    const outData = await CourseSectionModel.find().then((items, index) => {
      const sections = items.filter(
        (item) => String(item.courseId) === String(courseId)
      );

      const d = sections.map(
        (content, index) => console.log(content._id)
        //      ContentModel.aggregate([

        //   {
        //     $match: { "sectionId":new mongoose.Types.ObjectId(content._id) }
        //   },
        //   // {
        //   //   $group:{
        //   //     _id:null,
        //   //     totalDuration:{
        //   //       $sum:'$duration'
        //   //     }
        //   //   }
        //   // }

        //  ])
      );

      // console.log(d)
      // data.map(content,index=>
      // console.log(content)
      //   ContentModel.aggregate([

      //   {
      //     $match: { "sectionId":new mongoose.Types.ObjectId(content._id) }
      //   },
      //   {
      //     $group:{
      //       _id:null,
      //       totalDuration:{
      //         $sum:'$duration'
      //       }
      //     }
      //   }

      //  ])
      // )

      //  return newData
    });
    // console.log(outData)

    res.status(201).json({
      success: true,
      message: "Section Fetched",
      // length:data.length,
      outData,
    });
  } catch (error) {
    res.status(201).json({
      success: true,
      message: "Section Fetched Failed",
      // length:data.length,
      error,
    });
  }
});
