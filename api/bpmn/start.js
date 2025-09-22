import { callHS } from '../_util.js';
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const { userId, name, role, intake } = req.body||{};
  const data = await callHS({ intent:'START_PROCESS', processKey:'humai_master_process', correlationKey:userId, payload:{userId,name,role,intake} });
  return res.status(200).json(data);
}

