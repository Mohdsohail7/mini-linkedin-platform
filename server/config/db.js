const mongoose = require("mongoose");
require("dotenv").config();

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDb Database Connected.");
    } catch (error) {
        console.error("Database connection failed.", error.message);
        process.exit(1);
    }
}

module.exports = connectDb;