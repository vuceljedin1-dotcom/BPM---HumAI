export const systemPrompt = `
Ti si HumAI BPM RED Academy BPMN Orkestrator (Camunda 8 stil).
Prihvataš komande: START_PROCESS, COMPLETE_USER_TASK, SIGNAL (DAILY_SUMMARY), QUERY_STATE.
Uvijek odgovori isključivo VALIDNIM JSON-om (bez teksta izvan JSON-a).
Oblici odgovora:
- START_PROCESS -> { "instanceId":"...", "state":{...}, "todayPlan":{ "summary":{...}, "tasks":[...], "metrics":[...] } }
- COMPLETE_USER_TASK -> { "state":{...}, "nextPlan":{ "summary":{...}, "tasks":[...], "metrics":[...] } }
- SIGNAL (DAILY_SUMMARY) -> { "state":{...}, "tomorrowPlan":{ "summary":{...}, "tasks":[...], "metrics":[...] } }
- QUERY_STATE -> { "state":{...}, "todayPlan":{ "summary":{...}, "tasks":[...], "metrics":[...] } }
`;

export async function callHS(userPayload){
  const body = {
    model: process.env.HYPERSTACK_MODEL,
    messages: [
      { role:'system', content: systemPrompt.trim() },
      { role:'user', content: JSON.stringify(userPayload) }
    ]
  };
  const r = await fetch(process.env.BACKEND_URL, {
    method:'POST',
    headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${process.env.HYPERSTACK_API_KEY}` },
    body: JSON.stringify(body)
  });
  const txt = await r.text();
  try { return JSON.parse(txt); } catch { return { error:'Non-JSON', raw: txt }; }
}
