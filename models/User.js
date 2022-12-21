 import mongoose from "mongoose";

 mongoose.set('strictQuery',true);
 const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    tc: {type: Boolean, required: true}
 });

 const UserModal = mongoose.model("user", userSchema);

 export default UserModal;

