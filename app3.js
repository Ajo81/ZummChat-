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
const incomingModal   = document.getElementById("incomingModal");
const incomingAvatar  = document.getElementById("incomingAvatar");
const incomingName    = document.getElementById("incomingName");
const incomingText    = document.getElementById("incomingText");
const rejectBtn       = document.getElementById("rejectBtn");
const incomingAcceptBtn = document.getElementById("incomingAcceptBtn");

const MAX_SIZE_MB = 5;

// ✅ SERVIDORES ICE CON TURN GRATUITO (más opciones para Cuba)
const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:stun2.l.google.com:19302" },
  {
    urls: [
      "turn:turn.evan-brass.net:3478",
      "turn:turn.evan-brass.net:3478?transport=tcp",
      "turns:turn.evan-brass.net:5349?transport=tcp"
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
  resuscribirPresence();
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
// ============ PRESENCE NATIVO (como Mi Círculo) ================
// ================================================================

let presenceChannel = null;
let presenceReady = false;
let usersOnline = [];

function presenceChannelName() {
  return "zumm-presence-" + currentRoom.replace(/[^a-zA-Z0-9]/g, "_");
}

function resuscribirPresence() {
  if (presenceChannel) {
    try { presenceChannel.unsubscribe(); } catch (e) {}
    try { supabaseClient.removeChannel(presenceChannel); } catch (e) {}
    presenceChannel = null;
  }
  presenceReady = false;
  usersOnline = [];
  renderUserList();

  presenceChannel = supabaseClient.channel(presenceChannelName(), {
    config: {
      presence: { key: username },
      broadcast: { self: false }
    }
  });

  presenceChannel
    .on("presence", { event: "sync" }, () => {
      try {
        const state = presenceChannel.presenceState();
        const nuevos = Object.keys(state).filter(u => u.toLowerCase() !== username.toLowerCase());
        console.log("👥 Presencia sync:", nuevos);
        usersOnline = nuevos;
        renderUserList();
      } catch (e) { console.error("Error presence sync:", e); }
    })
    .on("presence", { event: "join" }, ({ key }) => {
      console.log("➕ Se unió:", key);
    })
    .on("presence", { event: "leave" }, ({ key }) => {
      console.log("➖ Se fue:", key);
    })
    .on("broadcast", { event: "signal" }, msg => {
      handleSignal(msg.payload);
    })
    .subscribe(async (status, err) => {
      console.log("📡 Presence channel:", status, err || "");
      if (status === "SUBSCRIBED") {
        try {
          await presenceChannel.track({
            username: username,
            online_at: new Date().toISOString()
          });
          presenceReady = true;
          console.log("✅ Presencia registrada:", username);
          renderUserList();
        } catch (e) {
          console.error("Error al trackear presencia:", e);
        }
      } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
        presenceReady = false;
        renderUserList();
      }
    });
}

function sendSignal(payload) {
  if (!presenceChannel || !presenceReady) {
    console.warn("Señal no enviada, presence no listo");
    return;
  }
  presenceChannel.send({
    type: "broadcast",
    event: "signal",
    payload: Object.assign({ from: myClientId, fromName: username }, payload)
  });
}

// ================================================================
// ============ LISTA DE USUARIOS ================================
// ================================================================

function updateUsersBtn() {
  if (usersBtn) {
    const hay = presenceReady && usersOnline.length > 0;
    usersBtn.classList.toggle("has-users", hay);
  }
}

function renderUserList() {
  if (!userList) return;
  userList.innerHTML = "";

  if (!presenceReady) {
    if (noUsers) { noUsers.style.display = "block"; noUsers.textContent = "Conectando..."; }
    updateUsersBtn();
    return;
  }

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
  });
}
if (usersPanelClose) {
  usersPanelClose.addEventListener("click", () => {
    if (usersPanel) usersPanel.classList.remove("show");
  });
}

// ================================================================
// ============ LLAMADAS WEBRTC ==================================
// ================================================================

let pc = null;
let localStream = null;
let activeCall = null;
let incomingCall = null;
let iceQueue = [];
let inviteTimer = null;
let ringTimeout = null;
let muted = false;

function handleSignal(p) {
  if (!p || p.from === myClientId) return;
  if (p.to !== myClientId) return;

  console.log("📨 Señal recibida:", p.type);

  switch (p.type) {
    case "invite":  onInvite(p);          break;
    case "cancel":  onCallerCanceled(p); break;
    case "accept":  onAccept(p);          break;
    case "reject":  onRejected(p);        break;
    case "offer":   onOffer(p);           break;
    case "answer":  onAnswer(p);          break;
    case "ice":     onRemoteIce(p);       break;
    case "hangup":  onHangup(p);          break;
  }
}

function supportsCalls() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) return true;
  alert("Tu navegador no soporta llamadas.\nUsa Chrome actualizado y una conexión HTTPS.");
  return false;
}

async function startCall(targetName, withVideo) {
  if (activeCall || incomingCall) { alert("Ya tienes una llamada activa."); return; }
  if (!presenceReady) { alert("Conectando...\nEspera unos segundos."); return; }
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
    alert("No se pudo acceder a tu micrófono/cámara:\n" + e.message);
    return;
  }

  localStream = stream;
  activeCall = {
    callId: myClientId + "-" + Date.now(),
    peerName: targetName,
    peerId: null,
    role: "caller",
    video: !!withVideo
  };

  showCallOverlay("Llamando a " + targetName + "...");

  sendSignal({
    type: "invite",
    to: null,
    targetName: targetName,
    callId: activeCall.callId,
    video: !!withVideo
  });

  clearTimeout(inviteTimer);
  inviteTimer = setTimeout(() => {
    if (activeCall && activeCall.role === "caller" && !pc) {
      sendSignal({ type: "cancel", targetName: targetName, callId: activeCall.callId });
      endCall(false);
      alert(targetName + " no respondió.");
    }
  }, 35000);
}

function onInvite(p) {
  if (p.targetName && p.targetName.toLowerCase() !== username.toLowerCase()) return;

  if (activeCall || incomingCall) {
    sendSignal({ type: "reject", to: p.from, callId: p.callId, reason: "busy" });
    return;
  }

  incomingCall = {
    callId: p.callId,
    fromName: p.fromName,
    fromId: p.from,
    video: !!p.video
  };

  if (incomingAvatar) {
    incomingAvatar.textContent = avatarLetter(p.fromName);
    incomingAvatar.style.background = colorForUser(p.fromName);
  }
  if (incomingName) incomingName.textContent = p.fromName || "Alguien";
  if (incomingText) incomingText.textContent = p.video ? "Videollamada entrante..." : "Llamada entrante...";

  if (incomingModal) incomingModal.classList.add("show");
  playRingtone();

  clearTimeout(ringTimeout);
  ringTimeout = setTimeout(() => {
    if (incomingCall && incomingCall.callId === p.callId) dismissIncoming(false);
  }, 35000);
}

function dismissIncoming(notify) {
  if (!incomingCall) return;
  if (notify) sendSignal({ type: "reject", to: incomingCall.fromId, callId: incomingCall.callId });
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
      sendSignal({ type: "reject", to: call.fromId, callId: call.callId });
      return;
    }

    try {
      localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: call.video ? { width: 640, height: 480, facingMode: "user" } : false
      });
    } catch (e) {
      alert("No se pudo acceder a tu micrófono/cámara:\n" + e.message);
      sendSignal({ type: "reject", to: call.fromId, callId: call.callId });
      return;
    }

    activeCall = {
      callId: call.callId,
      peerName: call.fromName,
      peerId: call.fromId,
      role: "callee",
      video: call.video
    };

    showCallOverlay("Conectando con " + call.fromName + "...");
    sendSignal({ type: "accept", to: call.fromId, callId: call.callId });
    attachLocalPreview();
  });
}

function onCallerCanceled(p) {
  if (incomingCall && incomingCall.callId === p.callId) dismissIncoming(false);
}

function onAccept(p) {
  if (!activeCall || activeCall.role !== "caller" || p.callId !== activeCall.callId) return;
  activeCall.peerId = p.from;
  clearTimeout(inviteTimer);
  inviteTimer = null;
  if (callStatus) callStatus.textContent = "Conectando...";
  (async () => {
    try {
      createPeer();
      attachLocalPreview();
      localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      sendSignal({ type: "offer", to: activeCall.peerId, callId: activeCall.callId, sdp: pc.localDescription });
    } catch (e) {
      alert("Error al iniciar la llamada: " + e.message);
      endCall(true);
    }
  })();
}

function onOffer(p) {
  if (!activeCall || activeCall.role !== "callee" || p.callId !== activeCall.callId) return;
  if (!localStream) return;
  (async () => {
    try {
      if (!pc) createPeer();
      attachLocalPreview();
      localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
      await pc.setRemoteDescription(new RTCSessionDescription(p.sdp));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      sendSignal({ type: "answer", to: activeCall.peerId, callId: activeCall.callId, sdp: pc.localDescription });
      flushIce();
    } catch (e) {
      alert("Error al conectar: " + e.message);
      endCall(true);
    }
  })();
}

function onAnswer(p) {
  if (!activeCall || activeCall.role !== "caller" || p.callId !== activeCall.callId || !pc) return;
  (async () => {
    try {
      await pc.setRemoteDescription(new RTCSessionDescription(p.sdp));
      flushIce();
    } catch (e) {
      console.error("Error answer:", e);
      endCall(true);
    }
  })();
}

function onRejected(p) {
  if (!activeCall || p.callId !== activeCall.callId) return;
  const razon = (p.reason === "busy") ? activeCall.peerName + " está en otra llamada." : activeCall.peerName + " rechazó la llamada.";
  endCall(false);
  alert(razon);
}

function onHangup(p) {
  const enActiva = activeCall && activeCall.callId === p.callId;
  const enEntrante = incomingCall && incomingCall.callId === p.callId;
  if (!enActiva && !enEntrante) return;
  if (enEntrante) dismissIncoming(false);
  endCall(false);
  alert((p.fromName || "Tu contacto") + " colgó.");
}

function onRemoteIce(p) {
  if (!p.candidate) return;
  if (pc && pc.remoteDescription) {
    pc.addIceCandidate(new RTCIceCandidate(p.candidate)).catch(() => {});
  } else {
    iceQueue.push(p.candidate);
  }
}

function flushIce() {
  while (iceQueue.length && pc && pc.remoteDescription) {
    const c = iceQueue.shift();
    pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {});
  }
}

function createPeer() {
  pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

  pc.onicecandidate = (e) => {
    if (e.candidate && activeCall && activeCall.peerId) {
      sendSignal({ type: "ice", to: activeCall.peerId, callId: activeCall.callId, candidate: e.candidate });
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

  muted = false;
  if (muteBtn) { muteBtn.textContent = "🎤 Mic"; muteBtn.classList.remove("muted"); }
}

function endCall(notify) {
  if (notify && activeCall && activeCall.peerId) {
    sendSignal({ type: "hangup", to: activeCall.peerId, callId: activeCall.callId });
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

  if (muteBtn) { muteBtn.textContent = "🎤 Mic"; muteBtn.classList.remove("muted"); }
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

if (hangupBtn) {
  hangupBtn.addEventListener("click", () => endCall(true));
}

if (callBtn) {
  callBtn.addEventListener("click", () => {
    if (usersOnline.length === 0) {
      alert(presenceReady ? "No hay otros usuarios en línea." : "Conectando... espera unos segundos.");
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
      alert(presenceReady ? "No hay otros usuarios en línea." : "Conectando... espera unos segundos.");
      return;
    }
    const target = usersOnline.length === 1 ? usersOnline[0] : prompt("¿A quién videollamar?\nEn línea: " + usersOnline.join(", "));
    if (!target || !target.trim()) return;
    startCall(target.trim(), true);
  });
}

function avisarSalida() {
  if (activeCall && activeCall.peerId) sendSignal({ type: "hangup", to: activeCall.peerId, callId: activeCall.callId });
}

window.addEventListener("beforeunload", avisarSalida);
window.addEventListener("pagehide", avisarSalida);

// ============ ARRANCAR ============
if (chatTitle) chatTitle.textContent = "ZummChat · General";
updateActiveTab();
loadHistory();
resuscribirPresence();
