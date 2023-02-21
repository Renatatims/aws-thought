//Require express, multer and aws-sdk
const express = require("express");
const router = express.Router();
const multer = require("multer");
const AWS = require("aws-sdk");
const paramsConfig = require("../utils/params-config");

//Instantiate the service object - s3 - to communicate with the S3 web service - so the image can be uploaded to the S3 bucket
const s3 = new AWS.S3({
  apiVersion: "2006-03-01", //locked the API version - lower chance of breaking
});

//temporary storage container that will hold the image files
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

// upload object - single method defines that this upload function will only receive 1 image - "image" is the key
const upload = multer({ storage }).single("image");

//Image upload Route
router.post("/image-upload", upload, (req, res) => {
  // params config
  console.log("post('/api/image-upload'", req.file);
  const params = paramsConfig(req.file);
  // S3 service call
  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.json(data);
  });
});

module.exports = router;
