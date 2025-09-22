export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const { pass } = req.body||{};
  res.status(200).json({ authorized: pass === (process.env.DEMO_PASS || 'bpm2025') });
}
