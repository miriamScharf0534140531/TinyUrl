import mongoose from "mongoose";

// Replace the uri string with your connection string.
const uri =
"mongodb+srv://miriamsch0531:!E4r6GHaKWEd_RA@cluster0.xjmoop1.mongodb.net/TinyURL?retryWrites=true&w=majority&appName=Cluster0";
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
