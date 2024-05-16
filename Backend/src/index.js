import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import connectDB from "./DB/connect.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`port is running on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("ERROR IS : ", error);
    process.exit(1);
  });


