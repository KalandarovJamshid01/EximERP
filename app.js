const express = require("express");
const path = require("path");
const morgan = require("morgan");
const auth = require("./route/auth.js");
const user = require("./route/user");
const document = require("./route/document");
const result = require("./route/result_doc");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);
app.use("/api/v1/document", document);
app.use("/api/v1/result", result);
module.exports = app;

const multer = require("multer");
const path = require("path");
const Document = require("../models/Document");
const UserAdmin = require("./../models/UserAdmin");
let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "/server/files"),
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
    name: "transport_nak",
    maxCount: 1,
  },
  {
    name: "invoice",
    maxCount: 1,
  },
  {
    name: "package_list",
    maxCount: 1,
  },
  {
    name: "contract",
    maxCount: 1,
  },
  {
    name: "certificate",
    maxCount: 1,
  },
  {
    name: "extra_doc",
    maxCount: 1,
  },
  {
    name: "image_product",
    maxCount: 1,
  },
  {
    name: "prochie_doc",
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
      console.log("hello");
      let declarant = await UserAdmin.find({ role: "declarant" }).sort({
        count_work: 1,
      })[0];
      let accountant = await UserAdmin.find({ role: "accountant" })[0];
      for (file in req.files) {
        objElements[file] = req.files[file][0].filename;
      }
      objElements["procedure"] = req.body.procedure;
      objElements["rejim"] = req.body.rejim;
      objElements["comments"] = [
        {
          user_id: req.user._id,
          text: req.body.comment,
        },
      ];
      objElements["tnvd"] = req.body.tnvd;
      objElements["sostav_doc"] = req.body.sostav_doc;
      objElements["client_id"] = req.user._id;
      objElements["declarant._id"] = declarant._id;
      objElements["accountat._id"] = accountant._id;

      const fileDB = new Document(objElements);
      console.log(fileDB);
      // Store in Database
      await UserAdmin.findByIdAndUpdate(declarant._id, {
        count_work: declarant.count_work + 1,
      });
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
