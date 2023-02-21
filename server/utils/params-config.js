const { v4: uuidv4 } = require("uuid");

const params = (fileName) => {
  const myFile = fileName.originalname.split(".");
  const fileType = myFile[myFile.length - 1];
  //params config
  const imageParams = {
    Bucket: config.bucket,
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
    // allow read access to this file
    ACL: 'public-read', 
  };

  return imageParams;
};
module.exports = params;
