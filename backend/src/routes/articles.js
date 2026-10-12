import {Router} from 'express';import Article from '../models/Article.js';import {requireAuth} from '../middleware/auth.js';import {optionalAuth} from '../middleware/optionalAuth.js';import {slugify} from '../utils/slug.js';
const router=Router();
router.get('/',optionalAuth,async(req,res,next)=>{try{const filter=req.query.admin==='true'&&req.user?{}:{published:true};const items=await Article.find(filter).sort({publishedAt:-1,createdAt:-1});res.json(items)}catch(e){next(e)}});
router.get('/:id',async(req,res,next)=>{try{const item=/^[0-9a-fA-F]{24}$/.test(req.params.id)?await Article.findById(req.params.id):await Article.findOne({slug:req.params.id,published:true});if(!item)return res.status(404).json({message:'Article not found'});res.json(item)}catch(e){next(e)}});
router.post('/',requireAuth,async(req,res,next)=>{try{const data={...req.body,slug:slugify(req.body.slug||req.body.title)};const item=await Article.create(data);res.status(201).json(item)}catch(e){next(e)}});
router.put('/:id',requireAuth,async(req,res,next)=>{try{const data={...req.body};if(data.title&&!data.slug)data.slug=slugify(data.title);const item=await Article.findByIdAndUpdate(req.params.id,data,{new:true,runValidators:true});if(!item)return res.status(404).json({message:'Article not found'});res.json(item)}catch(e){next(e)}});
router.delete('/:id',requireAuth,async(req,res,next)=>{try{const item=await Article.findByIdAndDelete(req.params.id);if(!item)return res.status(404).json({message:'Article not found'});res.json({message:'Article deleted'})}catch(e){next(e)}});
export default router;
