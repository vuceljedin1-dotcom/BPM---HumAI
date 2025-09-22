import { callHS } from '../_util.js';
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const { instanceId, userId, taskKey, result } = req.body||{};
  const data = await callHS({ intent:'COMPLETE_USER_TASK', instanceId, correlationKey:userId, taskKey, result });
  return res.status(200).json(data);
}

