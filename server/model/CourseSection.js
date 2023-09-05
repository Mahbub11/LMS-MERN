const mongoose = require("mongoose");

const CourseSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description:{
      type:String,
      required: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    content:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coursesection", CourseSectionSchema);
