import mongoose from 'mongoose';
const leaderSchema = new mongoose.Schema({name:{type:String,required:true,trim:true},position:{type:String,required:true,trim:true},discipline:{type:String,default:''},phone:{type:String,default:''},email:{type:String,default:''},bio:{type:String,default:''},photo:{type:String,default:''},order:{type:Number,default:100},active:{type:Boolean,default:true}},{timestamps:true});
export default mongoose.model('Leader',leaderSchema);
