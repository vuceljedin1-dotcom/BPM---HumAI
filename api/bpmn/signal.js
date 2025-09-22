import { callHS } from '../_util.js';
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const { instanceId, userId, summary } = req.body||{};
  const data = await callHS({ intent:'SIGNAL', signal:'DAILY_SUMMARY', instanceId, correlationKey:userId, payload:summary||null });
  return res.status(200).json(data);
}

