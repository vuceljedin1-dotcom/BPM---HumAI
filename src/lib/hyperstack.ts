export async function callHyperstack(model: string, payload: any) {
  const res = await fetch("https://api.hyperstack.cloud/v1/infer", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HYPERSTACK_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: payload
    })
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Hyperstack error: ${res.status} ${t}`);
  }
  return res.json();
}

