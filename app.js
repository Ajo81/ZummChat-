const supabaseClient = supabase.createClient(
  "https://gbnmgiaazffhunzwguhu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdibm1naWFhemZmaHVuendndWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1MjMyMTAsImV4cCI6MjEwNTA5OTIxMH0.h7biHjEprLOsxbm4Hgt28psiIHeAEdlTv9LClGPFGRg"
);

const messagesEl = document.getElementById("messages");
const inputEl    = document.getElementById("messageInput");
const sendBtn    = document.getElementById("sendBtn");

// ---- Nombre de usuario ----
let username = localStorage.getItem("zummchat_user");
if (!username) {
  username = prompt("¿Cómo te llamas?");
  if (!username || !username.trim()) username = "Anónimo";
  username = username.trim().substring(0, 20);
  localStorage.setItem("zummchat_user", username);
}

// ---- Color por usuario ----
function colorForUser(name) {
  if (!name) name = "Anónimo";
  // Genera un color fijo a partir del nombre
  const colores = [
    "#00ff66", // verde
    "#4fc3f7", // azul claro
    "#ffb74d", // naranja
    "#ba68c8", // morado
    "#f06292", // rosa
    "#fff176", // amarillo
    "#4db6ac", // turquesa
    "#e57373", // rojo suave
    "#9575cd", // violeta
    "#aed581"  // verde lima
  ];
  let suma = 0;
  for (let i = 0; i < name.length; i++) suma += name.charCodeAt(i);
  return colores[suma % colores.length];
}

// ---- Splash ----
const splash = document.getElementById("splash");
setTimeout(() => {
  if (!splash) return;
  splash.classList.add("hidden");
  if (window.stopMatrixRain) window.stopMatrixRain();
  setTimeout(() => splash.remove(), 500);
}, 2000);

// ---- Render ----
const rendered = new Set();
function scrollToBottom() { messagesEl.scrollTop = messagesEl.scrollHeight; }

function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return h + ":" + m;
}

function renderMessage(m) {
  if (!m || !m.id || rendered.has(m.id)) return;
  rendered.add(m.id);

  const div = document.createElement("div");
  div.className = "msg";

  const header = document.createElement("div");
  header.className = "msg-header";

  const nameEl = document.createElement("span");
  nameEl.className = "msg-name";
  nameEl.textContent = m.username || "Anónimo";
  nameEl.style.color = colorForUser(m.username);

  const timeEl = document.createElement("span");
  timeEl.className = "msg-time";
  timeEl.textContent = formatTime(m.created_at);

  header.appendChild(nameEl);
  header.appendChild(timeEl);

  const body = document.createElement("div");
  body.className = "msg-body";
  body.textContent = m.text;

  div.appendChild(header);
  div.appendChild(body);
  messagesEl.appendChild(div);
  scrollToBottom();
}

// ---- Historial ----
async function loadHistory() {
  console.log("Cargando historial...");
  const { data, error } = await supabaseClient
    .from("messages")
    .select("id, text, username, created_at")
    .order("created_at", { ascending: true })
    .limit(200);
  if (error) { console.error("ERROR historial:", error); return; }
  console.log("Historial OK:", data.length, "mensajes");
  data.forEach(renderMessage);
}

// ---- Enviar ----
async function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = "";

  const { data, error } = await supabaseClient
    .from("messages")
    .insert([{ text: text, username: username }])
    .select()
    .single();

  if (error) {
    console.error("ERROR insert:", error);
    inputEl.value = text;
    alert("No se pudo enviar: " + error.message);
    return;
  }
  renderMessage(data);
}

sendBtn.addEventListener("click", sendMessage);
inputEl.addEventListener("keydown", e => { if (e.key === "Enter") sendMessage(); });

// ---- Realtime ----
supabaseClient
  .channel("messages-realtime")
  .on("postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      payload => renderMessage(payload.new))
  .subscribe(status => console.log("Realtime:", status));

loadHistory();
