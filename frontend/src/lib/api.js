export const API=(import.meta.env.VITE_API_URL||'http://localhost:5000/api').replace(/\/$/,'');
export function getToken(){return localStorage.getItem('tesa_token')||''}
export async function api(path,options={}){const headers={...(options.body instanceof FormData?{}:{'Content-Type':'application/json'}),...(options.headers||{})};if(getToken())headers.Authorization=`Bearer ${getToken()}`;const res=await fetch(`${API}${path}`,{...options,headers});const data=await res.json().catch(()=>({}));if(!res.ok)throw new Error(data.message||'Request failed');return data}
export const imageUrl=(value)=>value?(value.startsWith('http')?value:`${API.replace(/\/api$/,'')}${value}`):'';
