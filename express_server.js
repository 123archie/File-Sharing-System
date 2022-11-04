const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors=require("cors");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5500;
const connectDB = require("./database");
const { Router } = require("express");
app.set("./views", path.join(__dirname, "/views"));
app.set("view engine");
app.use("/api/file_sharing", require("./routes/files"));
// app.use("/api/file_sharing", require("./routes/download"));
app.use("/file/download", require("./routes/downloadlink"));
connectDB();
const corsOptions={
   origin: '*',
  //  credentials:true,
  //  operationSucessStatus:200,
  //  corsOptions: "*"
   }
   
app.use(cors(corsOptions));
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
