const express = require("express");
const connectDB = require("./config/database");

const userRoute = require("./routes/api/users");
const authRoute = require("./routes/api/auth");
const transcationRoute = require("./routes/api/transactions");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/transaction", transcationRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
