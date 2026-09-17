const supabaseClient = supabase.createClient(
  "https://gbnmgiaazffhunzwguhu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdibm1naWFhemZmaHVuendndWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1MjMyMTAsImV4cCI6MjEwNTA5OTIxMH0.h7biHjEprLOsxbm4Hgt28psiIHeAEdlTv9LClGPFGRg"
);

const messagesEl = document.getElementById("messages");
const inputEl    = document.getElementById("messageInput");
const sendBtn    = document.getElementById("sendBtn");

const splash = document.getElementById("splash");
setTimeout(() => {
  if (!splash) return;
  splash.classList.add("hidden");
  if (window.stopMatrixRain) window.stopMatrixRain();
  setTimeout(() => splash.remove(), 500);
}, 2000);

const rendered = new Set();
function scrollToBottom() { messagesEl.scrollTop = messagesEl.scrollHeight; }

function renderMessage(m) {
  if (!m || !m.id || rendered.has(m.id)) return;
  rendered.add(m.id);
  const div = document.createElement("div");
  div.className = "msg";
  div.textContent = m.text;
  messagesEl.appendChild(div);
  scrollToBottom();
}

async function loadHistory() {
  console.log("Cargando historial...");
  const { data, error } = await supabaseClient
    .from("messages")
    .select("id, text, created_at")
    .order("created_at", { ascending: true })
    .limit(200);
  if (error) { console.error("ERROR historial:", error); return; }
  console.log("Historial OK:", data.length, "mensajes");
  data.forEach(renderMessage);
}

async function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = "";

  console.log("Enviando:", text);
  const { data, error } = await supabaseClient
    .from("messages")
    .insert([{ text }])
    .select()
    .single();

  if (error) {
    console.error("ERROR insert:", error);
    inputEl.value = text;
    alert("No se pudo enviar: " + error.message);
    return;
  }
  console.log("Insert OK:", data);
  renderMessage(data);
}

sendBtn.addEventListener("click", sendMessage);
inputEl.addEventListener("keydown", e => { if (e.key === "Enter") sendMessage(); });

supabaseClient
  .channel("messages-realtime")
  .on("postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      payload => {
        console.log("Realtime llega:", payload.new);
        renderMessage(payload.new);
      })
  .subscribe(status => console.log("Realtime estado:", status));

loadHistory();
