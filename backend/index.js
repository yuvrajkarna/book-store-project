import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middlewares for handling CORS policy of browser
// option 1:
app.use(cors());
// option 2: (More controlled version)
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

// get Route
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome To MERN Book Store Project.");
});
//all routes here
app.use("/books", bookRoute);

//mongodb connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App Connected to database.");
    //When app is connected to database that time only server will start
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
