const mongoose = require("mongoose");

const CourseDesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category:{
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
      required: true,
    },
    learningoutcomes: {
      type: [String],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    requirenments: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    instructorId: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseDes", CourseDesSchema);
