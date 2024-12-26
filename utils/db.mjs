import mongoose from "mongoose";
export const connect = () => {
  return mongoose
    .connect("mongodb://0.0.0.0:27017/birth_certificate ")
    .then(() => {
      console.log("connected to mongoose");
    })
    .catch((err) => {
        console.log("error in the database connection");
      console.log(err);
    });
};
