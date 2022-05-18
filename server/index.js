require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const express = require("express");
const app = express();

const authRouter = require('./routes/AuthenticationRouter')
// const mainRouter = require('./routes/MainRouter')
const mealkitRouter = require('./routes/MealkitRouter')
const todayMenuRouter = require('./routes/Today_menuRouter')
const userRouter = require('./routes/UserRouter')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
  })
);

app.use(cookieParser());

app.use('/auth', authRouter);
// app.use('/main', mainRouter);
app.use('/mealkit', mealkitRouter);
app.use('/todaymenu', todayMenuRouter);
app.use('/user',userRouter) 


const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;
if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };
  
  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log("서버 정상 작동"));

} else {
  server = app.listen(HTTPS_PORT)
}
module.exports = server;
