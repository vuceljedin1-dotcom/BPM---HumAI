import { callHS } from './_util.js';
export default async function handler(req,res){
  const userId = req.query.userId || 'demo@bpm.ba';
  // Ako nemaš još HS env postavljen, vrati demo da UI radi
  if(!process.env.BACKEND_URL) {
    return res.status(200).json({
      state:{ status:"DEMO" },
      todayPlan:{ summary:{ name:"Athlete", program:"Base Day", effortPct:78, aiSuggestion:"Hidratacija + istezanje" },
        tasks:[{id:"mobility-1",name:"Mobilnost",target:"10 min",done:true,priority:2},
               {id:"tempo-400x4",name:"Tempo 4×400m",target:"85% HR",done:false,priority:1}],
        metrics:[{t:1,hr:86},{t:2,hr:113},{t:3,hr:141}] }
    });
  }
  const data = await callHS({ intent:'QUERY_STATE', correlationKey:userId, instanceId:null });
  return res.status(200).json(data);
}

