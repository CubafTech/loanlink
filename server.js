import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import app from "./app.js";

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connect) => {
    const server = app.listen(process.env.PORT, (result) => {
      console.log(
        `Server running at port ${process.env.PORT} with the database connected`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
