const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");

require("dotenv").config();
const app = express();

// middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

const auth = require("./routes/authRoute");
const posts = require("./routes/posts");
const users = require("./routes/users");

// Routes
app.use("/api/auth",auth);
app.use("/api/posts",posts);
app.use("/api/users", users);

const port  = process.env.PORT || 4000;
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
    });
});
