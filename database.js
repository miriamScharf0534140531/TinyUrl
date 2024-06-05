import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const uri =process.env.DB_URI
// const uriLocal = "mongodb://localhost:27017/<dbname>";

const connectDB = async () => {
  await mongoose.connect(uri);

};
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
})

database.once('connected', () => {
  console.log('Database Connected');
})
mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
    }
  });  

export default connectDB;
