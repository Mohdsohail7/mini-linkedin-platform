const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");

require("dotenv").config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const auth = require("./routes/authRoute");
const posts = require("./routes/posts");

// Routes
app.use("/api/auth",auth);
app.use("/api/posts",posts);

const port  = process.env.PORT || 4000;
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
    });
});
