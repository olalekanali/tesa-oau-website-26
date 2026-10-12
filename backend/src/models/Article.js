import mongoose from 'mongoose';
const articleSchema = new mongoose.Schema({title:{type:String,required:true,trim:true,maxlength:180},slug:{type:String,required:true,unique:true,index:true},excerpt:{type:String,default:'',maxlength:500},content:{type:String,required:true},coverImage:{type:String,default:''},author:{type:String,default:'TESA OAU'},category:{type:String,default:'News'},published:{type:Boolean,default:true},publishedAt:{type:Date,default:Date.now}},{timestamps:true});
export default mongoose.model('Article',articleSchema);
