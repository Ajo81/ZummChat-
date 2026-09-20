// ============ CONEXIÓN SUPABASE (Mi Círculo) ============
const SUPABASE_URL = "https://biqjwbopvjyovxmmutly.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpcWp3Ym9wdmp5b3Z4bW11dGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNDg0ODQsImV4cCI6MjEwMzYyNDQ4NH0.q7IdjNy_OPDpPOJNUJ3FkxDm91LjJPmEP0pFu9CD4dA";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ============ SPLASH ============
const splash = document.getElementById("splash");
setTimeout(() => {
  if (!splash) return;
  splash.classList.add("hidden");
  if (window.stopMatrixRain) window.stopMatrixRain();
  setTimeout(() => splash.remove(), 500);
}, 2000);

// ============ REFERENCIAS DOM ============
const messagesEl      = document.getElementById("messages");
const inputEl         = document.getElementById("messageInput");
const sendBtn         = document.getElementById("sendBtn");
const shareBtn        = document.getElementById("shareBtn");
const chatTitle       = document.getElementById("chat-title");
const privateBtn      = document.getElementById("privateBtn");
const privRoomBar     = document.getElementById("priv-room-bar");
const emojiBtn        = document.getElementById("emojiBtn");
const emojiBar        = document.getElementById("emoji-bar");
const fileBtn         = document.getElementById("fileBtn");
const fileInput       = document.getElementById("fileInput");
const soundBtn        = document.getElementById("soundBtn");
const callBtn         = document.getElementById("callBtn");
const videoBtn        = document.getElementById("videoBtn");
const usersBtn        = document.getElementById("usersBtn");
const usersPanel      = document.getElementById("usersPanel");
const usersPanelClose = document.getElementById("usersPanelClose");
const userList        = document.getElementById("userList");
const noUsers         = document.getElementById("noUsers");
const callOverlay     = document.getElementById("callOverlay");
const callStatus      = document.getElementById("callStatus");
const localVideo      = document.getElementById("localVideo");
const remoteVideo     = document.getElementById("remoteVideo");
const muteBtn         = document.getElementById("muteBtn");
const acceptCallBtn   = document.getElementById("acceptCallBtn");
const hangupBtn       = document.getElementById("hangupBtn");
const switchCamBtn    = document.getElementById("switchCamBtn");
const incomingModal   = document.getElementById("incomingModal");
const incomingAvatar  = document.getElementById("incomingAvatar");
const incomingName    = document.getElementById("incomingName");
const incomingText    = document.getElementById("incomingText");
const rejectBtn       = document.getElementById("rejectBtn");
const incomingAcceptBtn = document.getElementById("incomingAcceptBtn");

const MAX_SIZE_MB = 5;

// Servidores ICE (STUN + TURN gratuitos)
const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  {
    urls: [
      "turn:turn.evan-brass.net:3478",
      "turn:turn.evan-brass.net:3478?transport=tcp"
    ],
    username: "user",
    credential: "password"
  },
  {
    urls: [
      "turn:openrelay.metered.ca:80",
      "turn:openrelay.metered.ca:443",
      "turn:openrelay.metered.ca:443?transport=tcp"
    ],
    username: "openrelayproject",
    credential: "openrelayproject"
  }
];

// ============ ALMACENAMIENTO SEGURO ============
function makeStorage(tipo) {
  try {
    const backend = tipo === "local" ? window.localStorage : window.sessionStorage;
    backend.setItem("__zumm_t", "1");
    backend.removeItem("__zumm_t");
    return backend;
  } catch (e) {
    const mem = {};
    return {
      getItem: k => Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null,
      setItem: (k, v) => { mem[k] = String(v); },
      removeItem: k => { delete mem[k]; }
    };
  }
}
const LS = makeStorage("local");
const SS = makeStorage("session");

// ============ USUARIO ============
let username = LS.getItem("zummchat_user");
if (!username) {
  username = prompt("¿Cómo te llamas?");
  if (!username || !username.trim()) username = "Anónimo";
  username = username.trim().substring(0, 20);
  LS.setItem("zummchat_user", username);
}

if (!SS.getItem("zummchat_cid")) {
  SS.setItem("zummchat_cid",
    (window.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : "c" + Date.now() + Math.random().toString(36).slice(2));
}
const myClientId = SS.getItem("zummchat_cid");

let currentRoom = "general";

// ============ SONIDO ============
let sonidoActivo = LS.getItem("zummchat_sonido") !== "off";
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch (e) { audioCtx = null; }
  }
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
}

function playBeep() {
  if (!sonidoActivo) return;
  initAudio();
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.15, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } catch (e) {}
}

document.body.addEventListener("touchstart", initAudio, { once: true });
document.body.addEventListener("click", initAudio, { once: true });

function updateSoundBtn() {
  if (soundBtn) soundBtn.textContent = sonidoActivo ? "🔔" : "🔕";
}
updateSoundBtn();

if (soundBtn) {
  soundBtn.addEventListener("click", () => {
    sonidoActivo = !sonidoActivo;
    LS.setItem("zummchat_sonido", sonidoActivo ? "on" : "off");
    updateSoundBtn();
    if (sonidoActivo) playBeep();
  });
}

// ============ RINGTONE ============
let ringInterval = null;

function playRingtone() {
  initAudio();
  if (!audioCtx) return;
  const tocarTono = () => {
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = 660;
      gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.55);
    } catch (e) {}
  };
  tocarTono();
  setTimeout(tocarTono, 600);
  ringInterval = setInterval(() => {
    tocarTono();
    setTimeout(tocarTono, 600);
    if (navigator.vibrate) navigator.vibrate([400, 200, 400]);
  }, 2000);
}

function stopRingtone() {
  if (ringInterval) { clearInterval(ringInterval); ringInterval = null; }
  if (navigator.vibrate) navigator.vibrate(0);
}

// ============ COLORES ============
function colorForUser(name) {
  if (!name) name = "Anónimo";
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return "hsl(" + (hash % 360) + ", 75%, 65%)";
}

function avatarLetter(name) {
  if (!name) return "?";
  const limpio = name.trim();
  if (!limpio) return "?";
  return limpio.charAt(0).toUpperCase();
}

function roomLabel(room) {
  if (room.startsWith("priv:")) {
    const partes = room.replace("priv:", "").split("|");
    const otro = partes.find(n => n.toLowerCase() !== username.toLowerCase()) || partes[0];
    return "🔒 " + otro;
  }
  return room.charAt(0).toUpperCase() + room.slice(1);
}

function hidePrivados() { if (privRoomBar) privRoomBar.style.display = "none"; }
function showPrivados() { if (privRoomBar) privRoomBar.style.display = "flex"; }

// ============ SALAS ============
function switchRoom(room) {
  currentRoom = room;
  if (!room.startsWith("priv:")) hidePrivados();
  else showPrivados();

  if (chatTitle) chatTitle.textContent = "ZummChat · " + roomLabel(room);
  rendered.clear();
  lastDateKey = "";
  if (messagesEl) messagesEl.innerHTML = "";
  updateActiveTab();
  loadHistory();
}

function updateActiveTab() {
  document.querySelectorAll(".room-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.room === currentRoom);
  });
}

document.querySelectorAll("#room-bar .room-btn").forEach(btn => {
  btn.addEventListener("click", () => switchRoom(btn.dataset.room));
});

let privateRooms = JSON.parse(LS.getItem("zummchat_privrooms") || "[]");
function savePrivateRooms() {
  LS.setItem("zummchat_privrooms", JSON.stringify(privateRooms));
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

function openPrivateWith(otroNombre) {
  const otroLimpio = String(otroNombre || "").trim().substring(0, 20);
  if (!otroLimpio) return;
  if (otroLimpio.toLowerCase() === username.toLowerCase()) return;
  const nombres = [username, otroLimpio].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const room = "priv:" + nombres[0] + "|" + nombres[1];
  if (!privateRooms.includes(room)) {
    privateRooms.push(room);
    savePrivateRooms();
    createPrivateButton(room);
  }
  switchRoom(room);
  if (usersPanel) usersPanel.classList.remove("show");
}

if (privateBtn) {
  privateBtn.addEventListener("click", () => {
    const otro = prompt("¿Con quién quieres hablar en privado? (escribe su nombre exacto)");
    if (!otro || !otro.trim()) return;
    openPrivateWith(otro);
  });
}

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

// ============ EMOJIS ============
const EMOJIS = [
  "😀","😂","🤣","😊","😍","😘","😎","🤔","😅","😢",
  "😭","😡","🥺","😴","🤗","😱","🤩","😇","🙃","😜",
  "👍","👎","👏","🙏","💪","✌️","🤝","👋","🖐️","✋",
  "❤️","💔","💚","💙","💜","🧡","💛","🖤","🤍","💯",
  "🔥","⭐","✨","🎉","🎊","🎁","🌈","☀️","🌙","⚡",
  "🐦","🐶","🐱","🌸","🌺","🍀","🍕","🍔","☕","🍺",
  "⚽","🏀","🎮","🎵","🎶","📱","💻","📷","🚀","🏆"
];

if (emojiBar) {
  EMOJIS.forEach(e => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = e;
    b.addEventListener("click", () => {
      if (inputEl) { inputEl.value += e; inputEl.focus(); }
    });
    emojiBar.appendChild(b);
  });
}

if (emojiBtn) {
  emojiBtn.addEventListener("click", () => {
    if (emojiBar) emojiBar.classList.toggle("show");
  });
}

// ============ ARCHIVOS ============
if (fileBtn) fileBtn.addEventListener("click", () => fileInput && fileInput.click());

if (fileInput) {
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert("El archivo pesa más de " + MAX_SIZE_MB + " MB.");
      fileInput.value = "";
      return;
    }
    const ext = file.name.split(".").pop() || "bin";
    const nombreArchivo = Date.now() + "_" + Math.random().toString(36).slice(2, 8) + "." + ext;
    fileBtn.textContent = "⏳";
    fileBtn.disabled = true;

    const { error: upErr } = await supabaseClient.storage.from("archivos")
      .upload(nombreArchivo, file, { contentType: file.type || "application/octet-stream" });

    if (upErr) {
      alert("No se pudo subir: " + upErr.message);
      fileBtn.textContent = "📎";
      fileBtn.disabled = false;
      fileInput.value = "";
      return;
    }

    const { data: urlData } = supabaseClient.storage.from("archivos").getPublicUrl(nombreArchivo);
    const publicUrl = urlData.publicUrl;
    const texto = inputEl ? inputEl.value.trim() : "";
    if (inputEl) inputEl.value = "";

    const { data, error } = await supabaseClient.from("zumm_messages")
      .insert([{
        text: texto || "",
        username: username,
        room: currentRoom,
        file_url: publicUrl,
        file_name: file.name,
        file_type: file.type || "application/octet-stream"
      }])
      .select()
      .single();

    fileBtn.textContent = "📎";
    fileBtn.disabled = false;
    fileInput.value = "";

    if (error) { alert("No se pudo enviar: " + error.message); return; }
    renderMessage(data, false);
  });
}

// ============ FECHAS ============
let lastDateKey = "";
function dateKey(d) { return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }

function dateLabel(d) {
  const hoy = new Date();
  const ayer = new Date();
  ayer.setDate(hoy.getDate() - 1);
  if (dateKey(d) === dateKey(hoy)) return "HOY";
  if (dateKey(d) === dateKey(ayer)) return "AYER";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return dd + "/" + mm + "/" + d.getFullYear();
}

function maybeAddDateSeparator(iso) {
  if (!iso || !messagesEl) return;
  const d = new Date(iso);
  const key = dateKey(d);
  if (key === lastDateKey) return;
  lastDateKey = key;
  const sep = document.createElement("div");
  sep.className = "date-sep";
  sep.textContent = dateLabel(d);
  messagesEl.appendChild(sep);
}

// ============ MENSAJES ============
const rendered = new Set();
function scrollToBottom() { if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight; }

function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
}

function renderMessage(m, esNuevo) {
  if (!m || !m.id || rendered.has(m.id)) return;
  if (m.room !== currentRoom) return;
  if (!messagesEl) return;
  rendered.add(m.id);

  if (esNuevo) {
    const esMio = (m.username || "").toLowerCase() === username.toLowerCase();
    if (!esMio) playBeep();
  }

  maybeAddDateSeparator(m.created_at);

  const div = document.createElement("div");
  div.className = "msg";
  div.dataset.msgId = m.id;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.style.background = colorForUser(m.username);
  avatar.textContent = avatarLetter(m.username);
  div.appendChild(avatar);

  const content = document.createElement("div");
  content.className = "msg-content";

  const header = document.createElement("div");
  header.className = "msg-header";

  const nameEl = document.createElement("span");
  nameEl.className = "msg-name";
  nameEl.textContent = m.username || "Anónimo";
  nameEl.style.color = colorForUser(m.username);

  const rightSide = document.createElement("span");
  rightSide.className = "msg-right";

  const timeEl = document.createElement("span");
  timeEl.className = "msg-time";
  timeEl.textContent = formatTime(m.created_at);
  rightSide.appendChild(timeEl);

  if ((m.username || "").toLowerCase() === username.toLowerCase()) {
    const delBtn = document.createElement("button");
    delBtn.className = "del-btn";
    delBtn.textContent = "🗑️";
    delBtn.addEventListener("click", async () => {
      if (!confirm("¿Borrar este mensaje?")) return;
      const { error } = await supabaseClient.from("zumm_messages").delete().eq("id", m.id);
      if (error) { alert("No se pudo borrar: " + error.message); return; }
      removeMessageFromDOM(m.id);
    });
    rightSide.appendChild(delBtn);
  }

  header.appendChild(nameEl);
  header.appendChild(rightSide);

  const body = document.createElement("div");
  body.className = "msg-body";

  if (m.text) {
    const txt = document.createElement("div");
    txt.textContent = m.text;
    body.appendChild(txt);
  }

  if (m.file_url) {
    const tipo = m.file_type || "";
    if (tipo.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = m.file_url;
      img.className = "msg-file-img";
      img.loading = "lazy";
      img.addEventListener("click", () => openImageModal(m.file_url));
      body.appendChild(img);
    } else {
      const a = document.createElement("a");
      a.href = m.file_url;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "msg-file-link";
      const icon = document.createElement("span");
      icon.className = "icon";
      icon.textContent = tipo.includes("pdf") ? "📄" : "📎";
      const name = document.createElement("span");
      name.className = "name";
      name.textContent = m.file_name || "archivo";
      a.appendChild(icon);
      a.appendChild(name);
      body.appendChild(a);
    }
  }

  content.appendChild(header);
  content.appendChild(body);
  div.appendChild(content);
  messagesEl.appendChild(div);
  scrollToBottom();
}

function removeMessageFromDOM(id) {
  rendered.delete(id);
  const el = messagesEl.querySelector('[data-msg-id="' + id + '"]');
  if (el) el.remove();
}

async function loadHistory() {
  const { data, error } = await supabaseClient.from("zumm_messages")
    .select("id, text, username, created_at, room, file_url, file_name, file_type")
    .eq("room", currentRoom)
    .order("created_at", { ascending: true })
    .limit(200);
  if (error) { console.error("ERROR historial:", error); return; }
  data.forEach(m => renderMessage(m, false));
}

async function sendMessage() {
  if (!inputEl) return;
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = "";

  const { data, error } = await supabaseClient.from("zumm_messages")
    .insert([{ text: text, username: username, room: currentRoom }])
    .select()
    .single();

  if (error) {
    console.error("ERROR insert:", error);
    inputEl.value = text;
    alert("No se pudo enviar: " + error.message);
    return;
  }
  renderMessage(data, false);
}

if (sendBtn) sendBtn.addEventListener("click", sendMessage);
if (inputEl) inputEl.addEventListener("keydown", e => { if (e.key === "Enter") sendMessage(); });

supabaseClient
  .channel("zumm-messages-realtime")
  .on("postgres_changes",
      { event: "INSERT", schema: "public", table: "zumm_messages" },
      payload => renderMessage(payload.new, true))
  .on("postgres_changes",
      { event: "DELETE", schema: "public", table: "zumm_messages" },
      payload => { if (payload.old && payload.old.id) removeMessageFromDOM(payload.old.id); })
  .subscribe(status => console.log("Realtime mensajes:", status));

function openImageModal(url) {
  let modal = document.getElementById("imgModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "imgModal";
    const img = document.createElement("img");
    const close = document.createElement("button");
    close.className = "close-modal";
    close.textContent = "✕";
    close.addEventListener("click", () => modal.classList.remove("show"));
    modal.appendChild(img);
    modal.appendChild(close);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("show");
    });
    document.body.appendChild(modal);
  }
  modal.querySelector("img").src = url;
  modal.classList.add("show");
}

// ================================================================
// ============ PRESENCIA VIA TABLA (postgres_changes) ============
// ================================================================

let usersOnline = [];
let presenceInterval = null;
let presenceRefreshInterval = null;

async function registrarPresencia() {
  try {
    const { error } = await supabaseClient
      .from("zumm_presence")
      .upsert({
        username: username,
        room: currentRoom,
        last_seen: new Date().toISOString()
      }, { onConflict: "username,room" });
    if (error) console.warn("Presencia error:", error.message);
  } catch (e) { console.warn("Presencia excepción:", e); }
}

async function leerPresencia() {
  try {
    const hace30s = new Date(Date.now() - 30000).toISOString();
    const { data, error } = await supabaseClient
      .from("zumm_presence")
      .select("username, last_seen")
      .eq("room", currentRoom)
      .gte("last_seen", hace30s);

    if (error) { console.warn("Leer presencia error:", error.message); return; }

    usersOnline = (data || [])
      .map(u => u.username)
      .filter(u => u.toLowerCase() !== username.toLowerCase());

    renderUserList();
  } catch (e) { console.warn("Leer presencia excepción:", e); }
}

function iniciarPresencia() {
  registrarPresencia();
  leerPresencia();

  clearInterval(presenceInterval);
  presenceInterval = setInterval(registrarPresencia, 8000);

  clearInterval(presenceRefreshInterval);
  presenceRefreshInterval = setInterval(leerPresencia, 5000);
}

supabaseClient
  .channel("zumm-presence-realtime")
  .on("postgres_changes",
      { event: "*", schema: "public", table: "zumm_presence" },
      () => { leerPresencia(); })
  .subscribe(status => console.log("Realtime presencia:", status));

// ================================================================
// ============ LISTA DE USUARIOS ================================
// ================================================================

function updateUsersBtn() {
  if (usersBtn) {
    const hay = usersOnline.length > 0;
    usersBtn.classList.toggle("has-users", hay);
  }
}

function renderUserList() {
  if (!userList) return;
  userList.innerHTML = "";

  if (usersOnline.length === 0) {
    if (noUsers) { noUsers.style.display = "block"; noUsers.textContent = "Nadie más conectado"; }
    updateUsersBtn();
    return;
  }

  if (noUsers) noUsers.style.display = "none";

  usersOnline.forEach(name => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = name;
    li.appendChild(span);

    const actions = document.createElement("div");
    actions.className = "user-actions";

    const mkBtn = (texto, titulo, fn) => {
      const b = document.createElement("button");
      b.type = "button";
      b.title = titulo;
      b.textContent = texto;
      b.addEventListener("click", (e) => { e.stopPropagation(); fn(); });
      return b;
    };

    actions.appendChild(mkBtn("💬", "Chat privado", () => openPrivateWith(name)));
    actions.appendChild(mkBtn("📞", "Llamar", () => startCall(name, false)));
    actions.appendChild(mkBtn("📹", "Videollamada", () => startCall(name, true)));

    li.appendChild(actions);
    li.addEventListener("click", () => openPrivateWith(name));
    userList.appendChild(li);
  });
  updateUsersBtn();
}

if (usersBtn) {
  usersBtn.addEventListener("click", () => {
    if (usersPanel) usersPanel.classList.toggle("show");
    leerPresencia();
  });
}
if (usersPanelClose) {
  usersPanelClose.addEventListener("click", () => {
    if (usersPanel) usersPanel.classList.remove("show");
  });
}

// ================================================================
// ============ LLAMADAS WEBRTC VIA TABLA ========================
// ================================================================

let pc = null;
let localStream = null;
let activeCall = null;
let incomingCall = null;
let iceQueue = [];
let inviteTimer = null;
let ringTimeout = null;
let muted = false;
let signalsLastId = 0;
let signalsCheckInterval = null;
let currentFacingMode = "user"; // "user" = frontal, "environment" = trasera

async function enviarSenal(toUser, signalType, payload) {
  try {
    const { error } = await supabaseClient
      .from("zumm_signals")
      .insert([{
        from_user: username,
        to_user: toUser,
        from_client: myClientId,
        signal_type: signalType,
        payload: JSON.stringify(payload || {})
      }]);
    if (error) console.warn("Enviar señal error:", error.message);
  } catch (e) { console.warn("Enviar señal excepción:", e); }
}

async function leerSenales() {
  try {
    const { data, error } = await supabaseClient
      .from("zumm_signals")
      .select("*")
      .eq("to_user", username)
      .gt("id", signalsLastId)
      .order("id", { ascending: true })
      .limit(50);

    if (error) { console.warn("Leer señales error:", error.message); return; }

    for (const s of (data || [])) {
      if (s.from_client === myClientId) continue;
      if (s.id > signalsLastId) signalsLastId = s.id;

      const edad = Date.now() - new Date(s.created_at).getTime();
      if (edad > 60000) continue;

      procesarSenal(s);
    }
  } catch (e) { console.warn("Leer señales excepción:", e); }
}

function procesarSenal(s) {
  let payload = {};
  try { payload = JSON.parse(s.payload || "{}"); } catch (e) {}

  const fromName = s.from_user;
  const callId = payload.callId;

  console.log("📨 Señal:", s.signal_type, "de", fromName);

  switch (s.signal_type) {
    case "invite":
      if (payload.targetName && payload.targetName.toLowerCase() !== username.toLowerCase()) return;
      if (activeCall || incomingCall) {
        enviarSenal(fromName, "reject", { callId, reason: "busy" });
        return;
      }
      incomingCall = { callId, fromName, fromId: s.from_client, video: !!payload.video };
      if (incomingAvatar) {
        incomingAvatar.textContent = avatarLetter(fromName);
        incomingAvatar.style.background = colorForUser(fromName);
      }
      if (incomingName) incomingName.textContent = fromName;
      if (incomingText) incomingText.textContent = payload.video ? "Videollamada entrante..." : "Llamada entrante...";
      if (incomingModal) incomingModal.classList.add("show");
      playRingtone();
      clearTimeout(ringTimeout);
      ringTimeout = setTimeout(() => {
        if (incomingCall && incomingCall.callId === callId) dismissIncoming(false);
      }, 35000);
      break;

    case "accept":
      if (!activeCall || activeCall.role !== "caller" || activeCall.callId !== callId) return;
      activeCall.peerId = s.from_client;
      clearTimeout(inviteTimer);
      inviteTimer = null;
      if (callStatus) callStatus.textContent = "Conectando...";
      crearOferta();
      break;

    case "offer":
      if (!activeCall || activeCall.role !== "callee" || activeCall.callId !== callId) return;
      if (!localStream) return;
      recibirOferta(payload.sdp);
      break;

    case "answer":
      if (!activeCall || activeCall.role !== "caller" || activeCall.callId !== callId || !pc) return;
      recibirRespuesta(payload.sdp);
      break;

    case "ice":
      if (!payload.candidate) return;
      if (pc && pc.remoteDescription) {
        pc.addIceCandidate(new RTCIceCandidate(payload.candidate)).catch(() => {});
      } else {
        iceQueue.push(payload.candidate);
      }
      break;

    case "hangup":
      const enActiva = activeCall && activeCall.callId === callId;
      const enEntrante = incomingCall && incomingCall.callId === callId;
      if (enEntrante) dismissIncoming(false);
      if (enActiva) {
        endCall(false);
        alert(fromName + " colgó.");
      }
      break;

    case "reject":
      if (!activeCall || activeCall.callId !== callId) return;
      const razon = (payload.reason === "busy") ? fromName + " está en otra llamada." : fromName + " rechazó la llamada.";
      endCall(false);
      alert(razon);
      break;
  }
}

function supportsCalls() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) return true;
  alert("Tu navegador no soporta llamadas.\nUsa Chrome actualizado y HTTPS.");
  return false;
}

async function startCall(targetName, withVideo) {
  if (activeCall || incomingCall) { alert("Ya tienes una llamada activa."); return; }
  if (!supportsCalls()) return;

  const match = usersOnline.find(u => u.toLowerCase() === targetName.toLowerCase());
  if (!match) { alert(targetName + " no está en línea."); return; }
  targetName = match;

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: withVideo ? { width: 640, height: 480, facingMode: "user" } : false
    });
  } catch (e) {
    alert("No se pudo acceder al micrófono/cámara:\n" + e.message);
    return;
  }

  localStream = stream;
  currentFacingMode = "user";
  const callId = myClientId + "-" + Date.now();
  activeCall = {
    callId,
    peerName: targetName,
    peerId: null,
    role: "caller",
    video: !!withVideo
  };

  showCallOverlay("Llamando a " + targetName + "...");

  await enviarSenal(targetName, "invite", {
    targetName,
    callId,
    video: !!withVideo
  });

  clearTimeout(inviteTimer);
  inviteTimer = setTimeout(() => {
    if (activeCall && activeCall.role === "caller" && !pc) {
      enviarSenal(targetName, "cancel", { callId });
      endCall(false);
      alert(targetName + " no respondió.");
    }
  }, 35000);
}

function dismissIncoming(notify) {
  if (!incomingCall) return;
  if (notify) enviarSenal(incomingCall.fromName, "reject", { callId: incomingCall.callId });
  incomingCall = null;
  stopRingtone();
  clearTimeout(ringTimeout);
  if (incomingModal) incomingModal.classList.remove("show");
}

if (rejectBtn) {
  rejectBtn.addEventListener("click", () => dismissIncoming(true));
}

if (incomingAcceptBtn) {
  incomingAcceptBtn.addEventListener("click", async () => {
    if (!incomingCall) return;
    const call = incomingCall;
    incomingCall = null;
    stopRingtone();
    clearTimeout(ringTimeout);
    if (incomingModal) incomingModal.classList.remove("show");

    if (!supportsCalls()) {
      enviarSenal(call.fromName, "reject", { callId: call.callId });
      return;
    }

    try {
      localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: call.video ? { width: 640, height: 480, facingMode: "user" } : false
      });
    } catch (e) {
      alert("No se pudo acceder al micrófono/cámara:\n" + e.message);
      enviarSenal(call.fromName, "reject", { callId: call.callId });
      return;
    }

    currentFacingMode = "user";
    activeCall = {
      callId: call.callId,
      peerName: call.fromName,
      peerId: call.fromId,
      role: "callee",
      video: call.video
    };

    showCallOverlay("Conectando con " + call.fromName + "...");
    attachLocalPreview();
    await enviarSenal(call.fromName, "accept", { callId: call.callId });
  });
}

function createPeer() {
  pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

  pc.onicecandidate = (e) => {
    if (e.candidate && activeCall) {
      enviarSenal(activeCall.peerName, "ice", {
        callId: activeCall.callId,
        candidate: e.candidate
      });
    }
  };

  pc.ontrack = (e) => {
    if (remoteVideo) {
      remoteVideo.srcObject = e.streams[0];
      remoteVideo.play().catch(() => {});
    }
  };

  pc.onconnectionstatechange = () => {
    if (!pc || !activeCall) return;
    if (pc.connectionState === "connected") {
      if (callStatus) callStatus.textContent = "En llamada con " + activeCall.peerName;
    } else if (pc.connectionState === "failed") {
      alert("Se perdió la conexión.");
      endCall(true);
    }
  };
}

async function crearOferta() {
  try {
    createPeer();
    attachLocalPreview();
    localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    await enviarSenal(activeCall.peerName, "offer", {
      callId: activeCall.callId,
      sdp: pc.localDescription
    });
  } catch (e) {
    alert("Error al iniciar la llamada: " + e.message);
    endCall(true);
  }
}

async function recibirOferta(sdp) {
  try {
    if (!pc) createPeer();
    attachLocalPreview();
    localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    await enviarSenal(activeCall.peerName, "answer", {
      callId: activeCall.callId,
      sdp: pc.localDescription
    });
    flushIce();
  } catch (e) {
    alert("Error al conectar: " + e.message);
    endCall(true);
  }
}

async function recibirRespuesta(sdp) {
  try {
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    flushIce();
  } catch (e) {
    console.error("Error respuesta:", e);
    endCall(true);
  }
}

function flushIce() {
  while (iceQueue.length && pc && pc.remoteDescription) {
    const c = iceQueue.shift();
    pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {});
  }
}

function attachLocalPreview() {
  if (localVideo && localStream) {
    localVideo.srcObject = localStream;
    localVideo.play().catch(() => {});
  }
}

function showCallOverlay(texto) {
  if (callOverlay) callOverlay.classList.add("show");
  if (callStatus) callStatus.textContent = texto;
  if (acceptCallBtn) acceptCallBtn.style.display = "none";

  const videos = document.querySelector(".videos");
  const soloAudio = !(activeCall && activeCall.video);
  if (videos) videos.classList.toggle("audio-only", soloAudio);

  const audioAvatar = document.getElementById("audioAvatar");
  if (audioAvatar) {
    if (soloAudio && activeCall) {
      audioAvatar.textContent = avatarLetter(activeCall.peerName);
      audioAvatar.style.background = colorForUser(activeCall.peerName);
    } else {
      audioAvatar.textContent = "";
    }
  }

  // Mostrar/ocultar el botón de cambiar cámara
  if (switchCamBtn) {
    if (activeCall && activeCall.video) {
      switchCamBtn.style.display = "inline-block";
      switchCamBtn.textContent = "🔄 Frontal";
    } else {
      switchCamBtn.style.display = "none";
    }
  }

  muted = false;
  if (muteBtn) { muteBtn.textContent = "🎤 Mic"; muteBtn.classList.remove("muted"); }
}

function endCall(notify) {
  if (notify && activeCall) {
    enviarSenal(activeCall.peerName, "hangup", { callId: activeCall.callId });
  }
  clearTimeout(inviteTimer);
  inviteTimer = null;
  clearTimeout(ringTimeout);

  if (pc) { try { pc.close(); } catch (e) {} pc = null; }
  if (localStream) {
    localStream.getTracks().forEach(t => t.stop());
    localStream = null;
  }
  iceQueue = [];
  activeCall = null;
  muted = false;
  currentFacingMode = "user";

  if (muteBtn) { muteBtn.textContent = "🎤 Mic"; muteBtn.classList.remove("muted"); }
  if (switchCamBtn) switchCamBtn.style.display = "none";
  if (localVideo) localVideo.srcObject = null;
  if (remoteVideo) remoteVideo.srcObject = null;
  if (callOverlay) callOverlay.classList.remove("show");
}

if (muteBtn) {
  muteBtn.addEventListener("click", () => {
    if (!localStream) return;
    muted = !muted;
    localStream.getAudioTracks().forEach(t => t.enabled = !muted);
    muteBtn.textContent = muted ? "🔇 Mic" : "🎤 Mic";
    muteBtn.classList.toggle("muted", muted);
  });
}

// ============ CAMBIAR CÁMARA (frontal/trasera) ============
async function cambiarCamara() {
  if (!localStream || !activeCall || !activeCall.video || !pc) return;

  try {
    currentFacingMode = currentFacingMode === "user" ? "environment" : "user";

    const nuevoStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: currentFacingMode, width: 640, height: 480 }
    });

    const nuevaPistaVideo = nuevoStream.getVideoTracks()[0];

    const senders = pc.getSenders();
    const senderVideo = senders.find(s => s.track && s.track.kind === "video");
    if (senderVideo) {
      await senderVideo.replaceTrack(nuevaPistaVideo);
    }

    const pistaVieja = localStream.getVideoTracks()[0];
    if (pistaVieja) pistaVieja.stop();
    localStream.removeTrack(pistaVieja);
    localStream.addTrack(nuevaPistaVideo);

    if (localVideo) {
      localVideo.srcObject = localStream;
      localVideo.play().catch(() => {});
    }

    if (switchCamBtn) {
      switchCamBtn.textContent = currentFacingMode === "user" ? "🔄 Frontal" : "🔄 Trasera";
    }
  } catch (e) {
    console.warn("Error al cambiar cámara:", e);
    if (switchCamBtn) switchCamBtn.textContent = "🔄 Cám";
  }
}

if (switchCamBtn) {
  switchCamBtn.addEventListener("click", cambiarCamara);
}

if (hangupBtn) {
  hangupBtn.addEventListener("click", () => endCall(true));
}

if (callBtn) {
  callBtn.addEventListener("click", () => {
    if (usersOnline.length === 0) {
      alert("No hay otros usuarios en línea.");
      return;
    }
    const target = usersOnline.length === 1 ? usersOnline[0] : prompt("¿A quién llamar?\nEn línea: " + usersOnline.join(", "));
    if (!target || !target.trim()) return;
    startCall(target.trim(), false);
  });
}

if (videoBtn) {
  videoBtn.addEventListener("click", () => {
    if (usersOnline.length === 0) {
      alert("No hay otros usuarios en línea.");
      return;
    }
    const target = usersOnline.length === 1 ? usersOnline[0] : prompt("¿A quién videollamar?\nEn línea: " + usersOnline.join(", "));
    if (!target || !target.trim()) return;
    startCall(target.trim(), true);
  });
}

clearInterval(signalsCheckInterval);
signalsCheckInterval = setInterval(leerSenales, 1500);

// ============ ARRANCAR ============
if (chatTitle) chatTitle.textContent = "ZummChat · General";
updateActiveTab();
loadHistory();
iniciarPresencia();
leerSenales();
