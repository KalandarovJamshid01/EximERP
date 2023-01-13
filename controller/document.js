const multer = require("multer");
const path = require("path");
const Document = require("../model/document");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./files/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
}).fields([
  {
    name: "transport_nakladnoy",
    maxCount: 1,
  },
  {
    name: "invoys",
    maxCount: 1,
  },
  {
    name: "upakovicniy_list",
    maxCount: 1,
  },
  {
    name: "kontrakt",
    maxCount: 1,
  },
  {
    name: "sertifikat_proisxojdeniye",
    maxCount: 1,
  },
  {
    name: "dopolnitelniy_docs",
    maxCount: 1,
  },
  {
    name: "foto_tovar",
    maxCount: 1,
  },
  {
    name: "prochie_docs",
    maxCount: 1,
  },
]);

const addFile = async (req, res) => {
  //Storage file
  try {
    upload(req, res, async (err) => {
      //Validate request

      if (!req.files) {
        return res.json({ error: "All fileds are required" });
      }

      if (err) {
        return res.status(500).json({ error: err.message });
      }

      let objElements = {};
      for (file in req.files) {
        objElements[file] = req.files[file][0].filename;
      }

      objElements["tip_procedure"] = req.body.tip_procedure;
      objElements["tip_rejim"] = req.body.tip_rejim;
      objElements["comment"] = req.body.comment;
      objElements["TNVED"] = req.body.TNVED;
      objElements["sostavleniye_docs"] = req.body.sostavleniye_docs;
      objElements["user._id"] = req.user._id;
      const fileDB = new Document(objElements);
      console.log(fileDB);
      // Store in Database

      const response = await fileDB.save();

      return res.json({
        message: "Success",
        response,
      });
    });
  } catch (err) {
    return res.json(err);
  }
};

const get_all_doc = async (req, res) => {
  try {
    const documents = await Document.find();

    return res.status(200).json(documents);
  } catch (error) {
    return res.json(error);
  }
};
const get_one_document = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);

    return res.status(200).json(document);
  } catch (error) {
    return res.json(error);
  }
};

const get_doc_by_user_id = async (req, res, next) => {
  try {
    const documents = await Document.findOne({ user_id: req.params.user_id });
    res.status(200).json(documents);
  } catch (error) {
    return res.json(error);
  }
};

const downloadFile = async (req, res) => {
  console.log("hello");
  const file = await Document.findById(req.params.id);

  const filePath = `files/${req.params.doc_file}`;
  res.download(filePath);
};
module.exports = {
  addFile,
  downloadFile,
  get_all_doc,
  get_one_document,
  get_doc_by_user_id,
};
