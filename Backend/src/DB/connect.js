import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async () => {
    try {
      const DatabaseInstance = await mongoose.connect(
        `${process.env.MONGODB_URI}/${DB_NAME}`
      );
      console.log(
        `MongoDB connected!! on the host ${DatabaseInstance.connection.host}`
      );
    } catch (error) {
      console.log("DATABASE CONNECTION FAILED : ", error);
    }
  };
  
  export default connectDB;