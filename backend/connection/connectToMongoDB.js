const mongoose = require("mongoose");

const connectToMongoDB = () => {
    return mongoose.connect(process.env.MONGODB_URI)
}

module.exports = connectToMongoDB