# HumAI — BPM RED Academy
Human-Centred Health/Sport-Tech Platform  
[https://humai.bpm.ba](https://humai.bpm.ba)

---

## 🌍 O projektu
**HumAI** je digitalna platforma za razvoj psihofizičke moći unutar **BPM RED Academy**.  
Kombinuje:
- 🎯 **BPMN orkestraciju** (Camunda 8 stil procesa)  
- 🤖 **AI modele trenirane na Hyperstack Cloud**  
- 🏃‍♂️ **Intake formular** → šestomjesečna strategija → mjesečni trackeri → sedmični mikrociklusi → dnevni planovi  
- 📊 **Effort-based credentialing** i real-time evaluacija zadataka

Cilj: **profesionalni dashboard** gdje svaki korisnik može pratiti svoje zadatke, označavati izvršenje, unositi komentare i dobiti dnevne/periodične sažetke.

---

## 📂 Struktura projekta
/public
index.html → landing stranica
register/index.html → registracija + Google Forms intake
login/index.html → demo login
dashboard/index.html→ dnevni plan, taskovi, summary
styles.css → dizajn

/api
_util.js → helper za Hyperstack pozive
bpmn/start.js → start procesa
bpmn/task.js → označi task
bpmn/signal.js → nightly summary
dashboard.js → današnji plan
forms-url.js → Google Forms link
auth-demo.js → demo login provjera


---

## ⚙️ Tehnologije
- **Frontend:** statički HTML/CSS/JS (hosted on [Vercel](https://vercel.com/))  
- **Backend:** Vercel serverless functions (Node.js / ESM)  
- **AI Orkestracija:** Hyperstack Cloud (finetuned model)  
- **DNS/Domena:** `humai.bpm.ba`  

---

## 🚀 Deploy (Vercel)
1. **Fork/clone repo** → poveži sa [Vercel](https://vercel.com/)  
2. **Framework Preset:** `Other`  
3. **Root directory:** `/`  
4. **Environment Variables** → dodaj:
   - `BACKEND_URL` → Hyperstack Cloud endpoint  
   - `HYPERSTACK_API_KEY` → tvoj API ključ  
   - `HYPERSTACK_MODEL` → naziv tvog modela (npr. `BPM_HumAI_Absolute_wF`)  
   - `GOOGLE_FORM_URL` → link na intake formu (`https://forms.gle/...`)  
   - `DEMO_PASS` → demo lozinka (npr. `bpm2025`)  

---

## 🔑 User Flow
1. **Register** → otvara Google Forms (intake) + pokreće BPMN instancu  
2. **Dashboard** → prikazuje dnevni plan:
   - taskovi ✅/❌  
   - komentari ✍️  
   - linkovi (forms, vizualizacija, itd.)  
   - effort-based metrika  
3. **Nightly Summary** → u 22h se generiše sažetak + priprema sutrašnji plan  

---

## 📸 Demo Screenshots
*(nakon prvog deploya dodaćemo screenshot landing stranice, dashboarda i intake procesa)*

---

## 🧑‍💻 Development
Lokalno testiranje (Node 18+):
```bash
npm install
vercel dev

📜 Licenca

© bpm.ba • HumAI — BPM RED Academy
