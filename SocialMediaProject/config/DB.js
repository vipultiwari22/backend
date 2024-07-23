import mongoose from "mongoose";

const connectToDataBase = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log(`connection Establish${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

export default connectToDataBase;