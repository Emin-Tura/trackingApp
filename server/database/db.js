import mongoose from "mongoose";

const startServer = async () => {
  const connect = await mongoose.connect("mongodb://admin:password@mongodb", {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB connected: ${connect.connection.host}`);
};
export default startServer;
