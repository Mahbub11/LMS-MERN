const router = require("express").Router();
const courseRoute= require('./course')


router.use('/api/v1/course',courseRoute);


module.exports= router