import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose
        .connect('mongodb+srv://tiwarivipul155:Ry46b8V4H123@vipuldata.r9zjdnt.mongodb.net/ShortURL')
        .then((conn) => {
            console.log(`connection Established ${conn.connection.host}`);
        })
        .catch((err) => {
            console.log(err);
            process.exit(1);
        });
};


