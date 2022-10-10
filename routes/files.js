const routes = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("./models/fileSchema");
const express=require('express')
const app=express();
const { v4: uuid4 } = require('uuid');
const { append } = require("vary");
const { message } = require("statuses");
const { response } = require("express");
let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1E9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});
let upload = multer({
  storage: storage
}).single("myfile");
routes.post("/test", (req, resp) => {
//Store the file from uploads folder
upload(req, resp, async (err) => {
   //Validating the request
   if (!req.file) {
    return resp.json({ error: "Please upload your file" });
  }
  if (err) {
    return resp.status(500).send({ error: err.message });
  }
    
    //Storing in the database
  
    const file = new File({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size
    })
       const response = await file.save();
       const file_uuid=File.findOne({uuid: req.params.uuid});
        if(!file_uuid){
         return resp.json("Link is expired");
        }
        return resp.json({
          message: "File uploaded successfully",
          download: `${process.env.APP_BASE_URL}/file/download/${file.uuid}`
        //Actual Download link
      }
        )
       } 
   )
 });
module.exports = routes;
