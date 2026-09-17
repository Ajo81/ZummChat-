const supabaseClient = supabase.createClient(
  "https://gbnmgiaazffhunzwguhu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdibm1naWFhemZmaHVuendndWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1MjMyMTAsImV4cCI6MjEwNTA5OTIxMH0.h7biHjEprLOsxbm4Hgt28psiIHeAEdlTv9LClGPFGRg"
);

const messagesEl = document.getElementById("messages");
const inputEl    = document.getElementById("messageInput");
const sendBtn    = document.getElementById("sendBtn");
const shareBtn   = document.getElementById("shareBtn");
const chatTitle  = document.getElementById("chat-title");
const roomBar    = document.getElementById("room-bar");
const privateBtn = document.getElementById("privateBtn");

// ---- Nombre de usuario ----
let username = localStorage.getItem("zummchat_user");
if (!username) {
  username = prompt("¿Cómo te llamas?");
  if (!username || !username.trim()) username = "Anónimo";
  username = username.trim().substring(0, 20);
  localStorage.setItem("zummchat_user", username);
}

// ---- Sala actual ----
let currentRoom = localStorage.getItem("zummchat_room") || "general";
let currentPartner = localStorage.getItem("zummchat_partner") || null;

// ---- Colores ----
function colorForUser(name) {
  if (!name) name = "Anónimo";
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return "hsl(" + (hash % 360) + ", 75%, 65%)";
}

// ---- Nombre visible de la sala ----
function roomLabel(room) {
  if (room.startsWith("priv:")) {
    const partes = room.replace("priv:", "").split("|");
    const otro = partes.find(n => n.toLowerCase() !== username.toLowerCase()) || partes[0];
    return "🔒 " + otro;
  }
  return room.charAt(0).toUpperCase() + room.slice(1);
}

// ---- Cambiar sala ----
function switchRoom(room) {
  currentRoom = room;
  currentPartner = room.startsWith("priv:") ? room : null;
  localStorage.setItem("zummchat_room", currentRoom);
  if (currentPartner) localStorage.setItem("zummchat_partner", currentPartner);
  else localStorage.removeItem("zummchat_partner");

  chatTitle.textContent = "ZummChat · " + roomLabel(room);
  rendered.clear();
  messagesEl.innerHTML = "";
  updateActiveTab();
  loadHistory();
}

// ---- Marcar pestaña activa ----
function updateActiveTab() {
  document.querySelectorAll(".room-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.room === currentRoom);
  });
}

// ---- Pestañas ----
function createRoomButton(room) {
  const btn = document.createElement("button");
  btn.className = "room-btn";
  if (room.startsWith("priv:")) btn.classList.add("priv");
  btn.dataset.room = room;
  btn.textContent = roomLabel(room);
  btn.addEventListener("click", () => switchRoom(room));
  roomBar.appendChild(btn);
  return btn;
}

// Salas privadas guardadas
const privateRooms = JSON.parse(localStorage.getItem("zummchat_privrooms") || "[]");
privateRooms.forEach(r => createRoomButton(r));

// Click en pestañas públicas
document.querySelectorAll(".room-btn[data-room]").forEach(btn => {
  btn.addEventListener("click", () => switchRoom(btn.dataset.room));
});

// ---- Crear chat privado ----
privateBtn.addEventListener("click", () => {
  const otro = prompt("¿Con quién quieres hablar en privado? (escribe su nombre exacto)");
  if (!otro || !otro.trim()) return;
  const otroLimpio = otro.trim().substring(0, 20);

  if (otroLimpio.toLowerCase() === username.toLowerCase()) {
    alert("No puedes chatear contigo mismo 😅");
    return;
  }

  // Sala ordenada alfabéticamente para que ambos vean la misma
  const nombres = [username, otroLimpio].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const room = "priv:" + nombres[0] + "|" + nombres[1];

  if (!privateRooms.includes(room)) {
    privateRooms.push(room);
    localStorage.setItem("zummchat_privrooms", JSON.stringify(privateRooms));
    createRoomButton(room);
  }

  switchRoom(room);
});

// ---- Compartir ----
shareBtn.addEventListener("click", async () => {
  const url = location.href;
  const datos = {
    title: "ZummChat",
    text: "Únete a mi chat ZummChat 🐦💬",
    url: url
  };
  if (navigator.share) {
    try { await navigator.share(datos); } catch (e) {}
  } else {
    try {
      await navigator.clipboard.writeText(url);
      alert("Enlace copiado: " + url);
    } catch (e) { prompt("Copia este enlace:", url); }
  }
});

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
  if (m.room !== currentRoom) return; // solo la sala actual
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

// ---- Historial de la sala ----
async function loadHistory() {
  const { data, error } = await supabaseClient
    .from("messages")
    .select("id, text, username, created_at, room")
    .eq("room", currentRoom)
    .order("created_at", { ascending: true })
    .limit(200);
  if (error) { console.error("ERROR historial:", error); return; }
  data.forEach(renderMessage);
}

// ---- Enviar ----
async function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = "";

  const { data, error } = await supabaseClient
    .from("messages")
    .insert([{ text: text, username: username, room: currentRoom }])
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

// ---- Arrancar ----
chatTitle.textContent = "ZummChat · " + roomLabel(currentRoom);
updateActiveTab();
loadHistory();
