const mongoose = require('mongoose');

async function connectMongoDB(url) {
    //Connection to MongoDB
    return mongoose.connect(url);
}

module.exports={
    connectMongoDB,
}