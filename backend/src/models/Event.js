import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema({title:{type:String,required:true,trim:true,maxlength:180},description:{type:String,required:true},location:{type:String,default:'Obafemi Awolowo University, Ile-Ife'},startDate:{type:Date,required:true},endDate:{type:Date},image:{type:String,default:''},registrationUrl:{type:String,default:''},published:{type:Boolean,default:true}},{timestamps:true});
export default mongoose.model('Event',eventSchema);
