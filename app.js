const supabaseClient = supabase.createClient(
  "https://gbnmgiaazffhunzwguhu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdibm1naWFhemZmaHVuendndWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1MjMyMTAsImV4cCI6MjEwNTA5OTIxMH0.h7biHjEprLOsxbm4Hgt28psiIHeAEdlTv9LClGPFGRg"
);

// --- Quitar el splash PRIMERO, pase lo que pase ---
const splash = document.getElementById("splash");
setTimeout(() => {
  if (!splash) return;
  splash.classList.add("hidden");
  if (window.stopMatrixRain) window.stopMatrixRain();
  setTimeout(() => splash.remove(), 500);
}, 2000);

// --- Referencias seguras ---
const messagesEl   = document.getElementById("messages");
const inputEl      = document.getElementById("messageInput");
const sendBtn      = document.getElementById("sendBtn");
const shareBtn     = document.getElementById("shareBtn");
const chatTitle    = document.getElementById("chat-title");
const privateBtn   = document.getElementById("privateBtn");
const privRoomBar  = document.getElementById("priv-room-bar");

// ---- Nombre de usuario ----
let username = localStorage.getItem("zummchat_user");
if (!username) {
  username = prompt("¿Cómo te llamas?");
  if (!username || !username.trim()) username = "Anónimo";
  username = username.trim().substring(0, 20);
  localStorage.setItem("zummchat_user", username);
}

// ---- Sala actual: SIEMPRE arranca en "general" ----
let currentRoom = "general";

// ---- Colores ----
function colorForUser(name) {
  if (!name) name = "Anónimo";
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return "hsl(" + (hash % 360) + ", 75%, 65%)";
}

// ---- Nombre visible ----
function roomLabel(room) {
  if (room.startsWith("priv:")) {
    const partes = room.replace("priv:", "").split("|");
    const otro = partes.find(n => n.toLowerCase() !== username.toLowerCase()) || partes[0];
    return "🔒 " + otro;
  }
  return room.charAt(0).toUpperCase() + room.slice(1);
}

// ---- Ocultar/mostrar privados (seguro si el elemento no existe) ----
function hidePrivados() {
  if (privRoomBar) privRoomBar.style.display = "none";
}
function showPrivados() {
  if (privRoomBar) privRoomBar.style.display = "flex";
}

// ---- Cambiar sala ----
function switchRoom(room) {
  currentRoom = room;
  if (!room.startsWith("priv:")) hidePrivados();
  else showPrivados();

  if (chatTitle) chatTitle.textContent = "ZummChat · " + roomLabel(room);
  rendered.clear();
  if (messagesEl) messagesEl.innerHTML = "";
  updateActiveTab();
  loadHistory();
}

// ---- Marcar activo ----
function updateActiveTab() {
  document.querySelectorAll(".room-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.room === currentRoom);
  });
}

// ---- Salas públicas ----
document.querySelectorAll("#room-bar .room-btn").forEach(btn => {
  btn.addEventListener("click", () => switchRoom(btn.dataset.room));
});

// ---- Chats privados ----
let privateRooms = JSON.parse(localStorage.getItem("zummchat_privrooms") || "[]");

function savePrivateRooms() {
  localStorage.setItem("zummchat_privrooms", JSON.stringify(privateRooms));
}

function createPrivateButton(room) {
  if (!privRoomBar) return;
  const btn = document.createElement("button");
  btn.className = "room-btn priv";
  btn.dataset.room = room;

  const label = document.createElement("span");
  label.textContent = roomLabel(room);
  btn.appendChild(label);

  const close = document.createElement("button");
  close.className = "close";
  close.textContent = "✕";
  close.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!confirm("¿Eliminar este chat privado de tu lista?")) return;
    privateRooms = privateRooms.filter(r => r !== room);
    savePrivateRooms();
    btn.remove();
    if (currentRoom === room) switchRoom("general");
  });
  btn.appendChild(close);

  btn.addEventListener("click", () => switchRoom(room));
  privRoomBar.appendChild(btn);
}

privateRooms.forEach(r => createPrivateButton(r));
hidePrivados();

// ---- Crear chat privado ----
if (privateBtn) {
  privateBtn.addEventListener("click", () => {
    const otro = prompt("¿Con quién quieres hablar en privado? (escribe su nombre exacto)");
    if (!otro || !otro.trim()) return;
    const otroLimpio = otro.trim().substring(0, 20);

    if (otroLimpio.toLowerCase() === username.toLowerCase()) {
      alert("No puedes chatear contigo mismo 😅");
      return;
    }

    const nombres = [username, otroLimpio].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    const room = "priv:" + nombres[0] + "|" + nombres[1];

    if (!privateRooms.includes(room)) {
      privateRooms.push(room);
      savePrivateRooms();
      createPrivateButton(room);
    }
    switchRoom(room);
  });
}

// ---- Compartir ----
if (shareBtn) {
  shareBtn.addEventListener("click", async () => {
    const url = location.href;
    const datos = { title: "ZummChat", text: "Únete a mi chat ZummChat 🐦💬", url };
    if (navigator.share) {
      try { await navigator.share(datos); } catch (e) {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Enlace copiado: " + url);
      } catch (e) { prompt("Copia este enlace:", url); }
    }
  });
}

// ---- Render ----
const rendered = new Set();
function scrollToBottom() {
  if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
}

function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return h + ":" + m;
}

function renderMessage(m) {
  if (!m || !m.id || rendered.has(m.id)) return;
  if (m.room !== currentRoom) return;
  if (!messagesEl) return;
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
  if (!inputEl) return;
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

if (sendBtn) sendBtn.addEventListener("click", sendMessage);
if (inputEl) inputEl.addEventListener("keydown", e => { if (e.key === "Enter") sendMessage(); });

// ---- Realtime ----
supabaseClient
  .channel("messages-realtime")
  .on("postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      payload => renderMessage(payload.new))
  .subscribe(status => console.log("Realtime:", status));

// ---- Arrancar ----
if (chatTitle) chatTitle.textContent = "ZummChat · General";
updateActiveTab();
loadHistory();
