const Document = require("./../model/document");

const addDocument = async (req, res, next) => {
  console.log("hello");
  res.send("Image Uploaded");
};

module.exports = { addDocument };
