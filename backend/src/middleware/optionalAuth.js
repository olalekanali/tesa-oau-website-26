import jwt from 'jsonwebtoken';
export function optionalAuth(req,_res,next){
  const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,'');
  if(token){try{req.user=jwt.verify(token,process.env.JWT_SECRET)}catch{/* Treat an invalid optional token as a public request. */}}
  next();
}
