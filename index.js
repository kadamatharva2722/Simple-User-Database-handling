//Headers
const express = require('express');
const users = require('./MOCK_DATA.json');
const { connectMongoDB } = require('./connections');
const userRouter = require('./routes/user');
const { logReqRes } = require('./middleware/index');

//App
const app = express();
connectMongoDB('mongodb://127.0.0.1:27017/urlShortMaker');

//MIDDLEWARE-Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt'));
app.use("/user", userRouter);


app.listen(4000, () => {
    console.log("port is running on 4000");
});