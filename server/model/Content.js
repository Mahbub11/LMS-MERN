const mongoose = require("mongoose");

const FilecontentSchema = new mongoose.Schema(
  {
    type:{
        type: String,
        required: true
    },
    sectionId:{
      type: mongoose.Types.ObjectId,
      required: true
  },
  duration:{
    type:Number,
    required:true
  },
  size:{
    type: Number,
    required: true
},
  content:{
    type: String,
    required: true
},
name:{
  type: String,
  required: true
},
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", FilecontentSchema);
