import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "user"
  },
  email:String,
  password:{
    type:String,
    require:true
  },
  links:{
    type:Array,
    require:true
  }
});

export default mongoose.model("users", UserSchema);
