// ============================================================
// ZummChat - App de mensajería con llamadas y videollamadas
// Creado por: José Yudier Arencibia Ajo
// GitHub: https://github.com/Ajo81/ZummChat-
// Año: 2026 - Todos los derechos reservados.
// ============================================================

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
const roomBar         = document.getElementById("room-bar");
const addRoomBtn      = document.getElementById("addRoomBtn");
const emojiBtn        = document.getElementById("emojiBtn");
const emojiBar        = document.getElementById("emoji-bar");
const fileBtn         = document.getElementById("fileBtn");
const fileInput       = document.getElementById("fileInput");
const voiceBtn        = document.getElementById("voiceBtn");
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
const userMeName      = document.getElementById("userMeName");
const changeNameBtn   = document.getElementById("changeNameBtn");
const userMeAvatar    = document.getElementById("userMeAvatar");
const avatarInput     = document.getElementById("avatarInput");
const recordingPanel  = document.getElementById("recordingPanel");
const recordingTime   = document.getElementById("recordingTime");
const cancelRecBtn    = document.getElementById("cancelRecBtn");
const stopRecBtn      = document.getElementById("stopRecBtn");
const themeBtn        = document.getElementById("themeBtn");
const colorBtn        = document.getElementById("colorBtn");
const searchBtn       = document.getElementById("searchBtn");
const searchBar       = document.getElementById("searchBar");
const searchInput     = document.getElementById("searchInput");
const searchClose     = document.getElementById("searchClose");
const scrollDownBtn   = document.getElementById("scrollDownBtn");
const editModal       = document.getElementById("editModal");
const editInput       = document.getElementById("editInput");
const editCancelBtn   = document.getElementById("editCancelBtn");
const editSaveBtn     = document.getElementById("editSaveBtn");
const msgMenu         = document.getElementById("msgMenu");
const menuPinBtn      = document.getElementById("menuPinBtn");
const menuCopyBtn     = document.getElementById("menuCopyBtn");
const menuEditBtn     = document.getElementById("menuEditBtn");
const menuDeleteBtn   = document.getElementById("menuDeleteBtn");
const reactionPicker  = document.getElementById("reactionPicker");
const typingIndicator = document.getElementById("typingIndicator");
const pinnedBar       = document.getElementById("pinnedBar");
const pinnedText      = document.getElementById("pinnedText");
const unpinBtn        = document.getElementById("unpinBtn");
const statsBtn        = document.getElementById("statsBtn");
const statsModal      = document.getElementById("statsModal");
const statsCloseBtn   = document.getElementById("statsCloseBtn");
const statTotalMsgs   = document.getElementById("statTotalMsgs");
const statFiles       = document.getElementById("statFiles");
const statVoice       = document.getElementById("statVoice");
const statDays        = document.getElementById("statDays");
const statFirst       = document.getElementById("statFirst");
const profileModal    = document.getElementById("profileModal");
const profileCloseBtn = document.getElementById("profileCloseBtn");
const profileAvatar   = document.getElementById("profileAvatar");
const profileName     = document.getElementById("profileName");
const profileBioDisplay = document.getElementById("profileBioDisplay");
const profileBioInput = document.getElementById("profileBioInput");
const profileStatusDisplay = document.getElementById("profileStatusDisplay");
const profileStatusInput = document.getElementById("profileStatusInput");
const profileEditBtn  = document.getElementById("profileEditBtn");
const profileSaveBtn  = document.getElementById("profileSaveBtn");
const profileCancelBtn = document.getElementById("profileCancelBtn");

const MAX_SIZE_MB = 5;

const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  {
    urls: ["turn:turn.evan-brass.net:3478", "turn:turn.evan-brass.net:3478?transport=tcp"],
    username: "user", credential: "password"
  },
  {
    urls: ["turn:openrelay.metered.ca:80", "turn:openrelay.metered.ca:443", "turn:openrelay.metered.ca:443?transport=tcp"],
    username: "openrelayproject", credential: "openrelayproject"
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
    (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : "c" + Date.now() + Math.random().toString(36).slice(2));
}
const myClientId = SS.getItem("zummchat_cid");

let myAvatarUrl = LS.getItem("zummchat_avatar") || "";
let myBio = LS.getItem("zummchat_bio") || "";
let myStatus = LS.getItem("zummchat_status") || "";

let currentRoom = "general";

// ============ TEMA Y COLOR ============
let temaActual = LS.getItem("zummchat_tema") || "dark";
let colorActual = LS.getItem("zummchat_color") || "green";

function aplicarTema() {
  document.body.classList.toggle("theme-light", temaActual === "light");
  if (themeBtn) themeBtn.textContent = temaActual === "light" ? "☀️" : "🌙";
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute("content", temaActual === "light" ? "#ffffff" : "#000000");
}

function aplicarColor() {
  document.body.classList.remove("color-blue", "color-red", "color-purple", "color-orange", "color-pink");
  if (colorActual !== "green") document.body.classList.add("color-" + colorActual);
}

aplicarTema();
aplicarColor();

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    temaActual = temaActual === "dark" ? "light" : "dark";
    LS.setItem("zummchat_tema", temaActual);
    aplicarTema();
  });
}

const coloresDisponibles = ["green", "blue", "red", "purple", "orange", "pink"];

if (colorBtn) {
  colorBtn.addEventListener("click", () => {
    const idxActual = coloresDisponibles.indexOf(colorActual);
    const siguiente = coloresDisponibles[(idxActual + 1) % coloresDisponibles.length];
    colorActual = siguiente;
    LS.setItem("zummchat_color", colorActual);
    aplicarColor();
    const nombres = { green: "Verde", blue: "Azul", red: "Rojo", purple: "Morado", orange: "Naranja", pink: "Rosa" };
    alert("🎨 Color cambiado a: " + nombres[colorActual]);
  });
}

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

function reproducirSonidoInsistente() {
  if (!sonidoActivo) return;
  initAudio();
  if (!audioCtx) return;
  const tonos = [880, 1100, 880];
  tonos.forEach((freq, idx) => {
    setTimeout(() => {
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } catch (e) {}
    }, idx * 350);
  });
  if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
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
    if (sonidoActivo) reproducirSonidoInsistente();
  });
}

// ============ NOTIFICACIONES ============
if ("Notification" in window && Notification.permission === "default") {
  setTimeout(() => { Notification.requestPermission().catch(() => {}); }, 3000);
}

let mensajesNoLeidos = 0;
let tituloParpadeoInterval = null;
let tituloParpadeando = false;
const TITULO_BASE = "ZummChat";

function mostrarNotificacion(remitente, texto) {
  try {
    if ("Notification" in window && Notification.permission === "granted") {
      const n = new Notification("💬 " + remitente, {
        body: texto || "Nuevo mensaje",
        icon: "icon.png",
        badge: "icon.png",
        tag: "zummchat-msg",
        renotify: true,
        vibrate: [200, 100, 200, 100, 200],
        silent: false
      });
      n.onclick = () => { try { window.focus(); } catch (e) {} n.close(); };
      setTimeout(() => { try { n.close(); } catch (e) {} }, 8000);
    }
  } catch (e) {}

  mensajesNoLeidos++;
  document.title = "(" + mensajesNoLeidos + ") 💬 ZummChat";
  if (!tituloParpadeando) {
    tituloParpadeando = true;
    tituloParpadeoInterval = setInterval(() => {
      document.title = document.title.startsWith("(")
        ? "💬 ZummChat"
        : "(" + mensajesNoLeidos + ") 💬 ZummChat";
    }, 1000);
  }
  reproducirSonidoInsistente();
}

function resetearTitulo() {
  mensajesNoLeidos = 0;
  document.title = TITULO_BASE;
  if (tituloParpadeoInterval) {
    clearInterval(tituloParpadeoInterval);
    tituloParpadeoInterval = null;
    tituloParpadeando = false;
  }
}

window.addEventListener("focus", resetearTitulo);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) resetearTitulo();
});

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
  if (room.startsWith("grupo:")) {
    return "👥 " + room.replace("grupo:", "");
  }
  return room.charAt(0).toUpperCase() + room.slice(1);
}

function hidePrivados() { if (privRoomBar) privRoomBar.style.display = "none"; }
function showPrivados() { if (privRoomBar) privRoomBar.style.display = "flex"; }

// ============ GRUPOS ============
let gruposPersonalizados = JSON.parse(LS.getItem("zummchat_grupos") || "[]");
let gruposOcultos = JSON.parse(LS.getItem("zummchat_grupos_ocultos") || "[]");

function guardarGrupos() {
  LS.setItem("zummchat_grupos", JSON.stringify(gruposPersonalizados));
}
function guardarGruposOcultos() {
  LS.setItem("zummchat_grupos_ocultos", JSON.stringify(gruposOcultos));
}

function crearBotonGrupo(nombreGrupo) {
  if (!roomBar) return;
  if (gruposOcultos.includes(nombreGrupo)) return;
  const roomId = "grupo:" + nombreGrupo;
  if (roomBar.querySelector('[data-room="' + roomId + '"]')) return;

  const btn = document.createElement("button");
  btn.className = "room-btn";
  btn.dataset.room = roomId;

  const label = document.createElement("span");
  label.textContent = "👥 " + nombreGrupo;
  btn.appendChild(label);

  const close = document.createElement("button");
  close.className = "close";
  close.textContent = "✕";
  close.style.cssText = "background:rgba(0,0,0,0.3);border:none;color:inherit;border-radius:50%;width:16px;height:16px;font-size:11px;line-height:1;cursor:pointer;margin-left:6px;padding:0;";
  close.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!confirm("¿SALIR del grupo '" + nombreGrupo + "'?\n\nNo verás más sus mensajes (pero el grupo sigue existiendo para los demás).")) return;

    if (!gruposOcultos.includes(nombreGrupo)) {
      gruposOcultos.push(nombreGrupo);
      guardarGruposOcultos();
    }
    gruposPersonalizados = gruposPersonalizados.filter(g => g !== nombreGrupo);
    guardarGrupos();

    btn.remove();
    if (currentRoom === roomId) switchRoom("general");
    alert("✅ Saliste del grupo '" + nombreGrupo + "'");
  });
  btn.appendChild(close);
  btn.addEventListener("click", () => switchRoom(roomId));
  roomBar.insertBefore(btn, addRoomBtn);
}

gruposPersonalizados.forEach(g => crearBotonGrupo(g));

if (addRoomBtn) {
  addRoomBtn.addEventListener("click", () => {
    const nombre = prompt("Nombre del nuevo grupo:\n\n(Solo letras, números y guiones)");
    if (!nombre || !nombre.trim()) return;
    const limpio = nombre.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "").substring(0, 30);
    if (!limpio) { alert("Nombre inválido."); return; }

    if (gruposOcultos.includes(limpio)) {
      gruposOcultos = gruposOcultos.filter(g => g !== limpio);
      guardarGruposOcultos();
    }

    if (gruposPersonalizados.includes(limpio)) {
      alert("Ese grupo ya existe.");
      switchRoom("grupo:" + limpio);
      return;
    }
    gruposPersonalizados.push(limpio);
    guardarGrupos();
    crearBotonGrupo(limpio);
    switchRoom("grupo:" + limpio);
    setTimeout(() => {
      alert("✅ Grupo '" + limpio + "' creado.\n\nPara invitar a otros, diles que toquen ➕ y escriban el mismo nombre: " + limpio);
    }, 300);
  });
}

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
  cargarMensajeFijado();
}

function updateActiveTab() {
  document.querySelectorAll(".room-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.room === currentRoom);
  });
}

document.querySelectorAll("#room-bar .room-btn").forEach(btn => {
  if (!btn.dataset.room) return;
  btn.addEventListener("click", () => switchRoom(btn.dataset.room));
});

let privateRooms = JSON.parse(LS.getItem("zummchat_privrooms") || "[]");
function savePrivateRooms() { LS.setItem("zummchat_privrooms", JSON.stringify(privateRooms)); }

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
    if (!confirm("¿Eliminar este chat privado?")) return;
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
    const otro = prompt("¿Con quién quieres hablar en privado?");
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
        text: texto || "", username: username, room: currentRoom,
        file_url: publicUrl, file_name: file.name,
        file_type: file.type || "application/octet-stream"
      }])
      .select().single();

    fileBtn.textContent = "📎";
    fileBtn.disabled = false;
    fileInput.value = "";

    if (error) { alert("No se pudo enviar: " + error.message); return; }
    renderMessage(data, false);
  });
}

// ============ NOTAS DE VOZ ============
let mediaRecorder = null;
let audioChunks = [];
let grabando = false;
let recTimerInterval = null;
let recSegundos = 0;
let audioStreamRec = null;

function formatearSegundos(s) {
  const m = Math.floor(s / 60);
  const seg = s % 60;
  return m + ":" + String(seg).padStart(2, "0");
}

function iniciarGrabacion() {
  if (grabando) return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Tu navegador no soporta grabación."); return;
  }
  if (!window.MediaRecorder) { alert("No soporta MediaRecorder."); return; }

  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    audioStreamRec = stream;
    audioChunks = [];
    let mimeType = "audio/webm";
    if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) mimeType = "audio/webm;codecs=opus";
    else if (MediaRecorder.isTypeSupported("audio/mp4")) mimeType = "audio/mp4";
    else if (MediaRecorder.isTypeSupported("audio/ogg")) mimeType = "audio/ogg";

    try { mediaRecorder = new MediaRecorder(stream, { mimeType: mimeType }); }
    catch (e) { mediaRecorder = new MediaRecorder(stream); }

    mediaRecorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) audioChunks.push(e.data); };
    mediaRecorder.onstop = () => {
      stream.getTracks().forEach(t => t.stop());
      audioStreamRec = null;
    };

    mediaRecorder.start();
    grabando = true;
    recSegundos = 0;

    if (voiceBtn) { voiceBtn.classList.add("recording"); voiceBtn.textContent = "⏹️"; }
    if (recordingPanel) recordingPanel.classList.add("show");
    if (recordingTime) recordingTime.textContent = "0:00";

    clearInterval(recTimerInterval);
    recTimerInterval = setInterval(() => {
      recSegundos++;
      if (recordingTime) recordingTime.textContent = formatearSegundos(recSegundos);
      if (recSegundos >= 120) detenerGrabacion(true);
    }, 1000);
  }).catch(e => alert("No se pudo acceder al micrófono:\n" + e.message));
}

function cancelarGrabacion() {
  if (!grabando) return;
  grabando = false;
  clearInterval(recTimerInterval); recTimerInterval = null;
  try {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.onstop = () => {
        if (audioStreamRec) { audioStreamRec.getTracks().forEach(t => t.stop()); audioStreamRec = null; }
      };
      mediaRecorder.stop();
    }
  } catch (e) {}
  audioChunks = [];
  if (voiceBtn) { voiceBtn.classList.remove("recording"); voiceBtn.textContent = "🎤"; }
  if (recordingPanel) recordingPanel.classList.remove("show");
}

async function detenerGrabacion(enviar) {
  if (!grabando) return;
  grabando = false;
  clearInterval(recTimerInterval); recTimerInterval = null;
  const duracionFinal = recSegundos;

  const promesa = new Promise(resolve => {
    if (!mediaRecorder || mediaRecorder.state === "inactive") { resolve(); return; }
    mediaRecorder.onstop = () => {
      if (audioStreamRec) { audioStreamRec.getTracks().forEach(t => t.stop()); audioStreamRec = null; }
      resolve();
    };
    try { mediaRecorder.stop(); } catch (e) { resolve(); }
  });
  await promesa;

  if (voiceBtn) { voiceBtn.classList.remove("recording"); voiceBtn.textContent = "🎤"; }
  if (recordingPanel) recordingPanel.classList.remove("show");

  if (!enviar) { audioChunks = []; return; }
  if (audioChunks.length === 0) { alert("No se grabó nada."); return; }

  const blob = new Blob(audioChunks, { type: audioChunks[0].type || "audio/webm" });
  audioChunks = [];
  if (blob.size > MAX_SIZE_MB * 1024 * 1024) { alert("Nota muy larga."); return; }
  if (voiceBtn) { voiceBtn.textContent = "⏳"; voiceBtn.disabled = true; }

  try {
    const ext = blob.type.includes("mp4") ? "m4a" : (blob.type.includes("ogg") ? "ogg" : "webm");
    const nombreArchivo = "audio_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8) + "." + ext;

    const { error: upErr } = await supabaseClient.storage.from("archivos")
      .upload(nombreArchivo, blob, { contentType: blob.type });
    if (upErr) { alert("No se pudo subir: " + upErr.message); return; }

    const { data: urlData } = supabaseClient.storage.from("archivos").getPublicUrl(nombreArchivo);
    const publicUrl = urlData.publicUrl;

    const { data, error } = await supabaseClient.from("zumm_messages")
      .insert([{
        text: "", username: username, room: currentRoom,
        file_url: publicUrl, file_name: "audio-" + formatearSegundos(duracionFinal),
        file_type: blob.type
      }])
      .select().single();
    if (error) { alert("No se pudo enviar: " + error.message); return; }
    renderMessage(data, false);
  } catch (e) { alert("Error: " + e.message); }
  finally { if (voiceBtn) { voiceBtn.textContent = "🎤"; voiceBtn.disabled = false; } }
}

if (voiceBtn) {
  voiceBtn.addEventListener("click", () => {
    if (grabando) detenerGrabacion(true);
    else iniciarGrabacion();
  });
}
if (cancelRecBtn) cancelRecBtn.addEventListener("click", cancelarGrabacion);
if (stopRecBtn) stopRecBtn.addEventListener("click", () => detenerGrabacion(true));

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

function avatarUrlDe(nombre) {
  if (nombre.toLowerCase() === username.toLowerCase()) return myAvatarUrl;
  return avataresPorUsuario[(nombre || "").toLowerCase()] || "";
}

function renderMessage(m, esNuevo) {
  if (!m || !m.id || rendered.has(m.id)) return;
  if (m.room !== currentRoom) return;
  if (!messagesEl) return;
  rendered.add(m.id);

  if (esNuevo) {
    const esMio = (m.username || "").toLowerCase() === username.toLowerCase();
    if (!esMio) {
      const tipo = m.file_type || "";
      let textoNotif;
      if (tipo.startsWith("audio/")) textoNotif = "🎤 Nota de voz";
      else if (m.file_url) textoNotif = "📎 Archivo";
      else textoNotif = m.text || "Nuevo mensaje";
      mostrarNotificacion(m.username || "Alguien", textoNotif);
    }
  }

  maybeAddDateSeparator(m.created_at);

  const div = document.createElement("div");
  div.className = "msg";
  div.dataset.msgId = m.id;
  if (m.pinned) div.classList.add("pinned");

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  const url = avatarUrlDe(m.username || "");
  if (url) {
    avatar.style.backgroundImage = "url(" + url + ")";
    avatar.textContent = "";
  } else {
    avatar.style.background = colorForUser(m.username);
    avatar.textContent = avatarLetter(m.username);
  }
  div.appendChild(avatar);

  const content = document.createElement("div");
  content.className = "msg-content";

  const header = document.createElement("div");
  header.className = "msg-header";

  const nameEl = document.createElement("span");
  nameEl.className = "msg-name";
  nameEl.textContent = (m.username || "Anónimo") + (m.pinned ? " 📌" : "");
  nameEl.style.color = colorForUser(m.username);
  nameEl.addEventListener("click", (e) => {
    e.stopPropagation();
    abrirPerfil(m.username, false);
  });

  const rightSide = document.createElement("span");
  rightSide.className = "msg-right";

  const timeEl = document.createElement("span");
  timeEl.className = "msg-time";
  timeEl.textContent = formatTime(m.created_at);
  rightSide.appendChild(timeEl);

  if (m.edited_at) {
    const ed = document.createElement("span");
    ed.className = "msg-edited";
    ed.textContent = "(editado)";
    rightSide.appendChild(ed);
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
    if (tipo.startsWith("audio/")) {
      const voiceDiv = document.createElement("div");
      voiceDiv.className = "voice-note";
      const playBtn = document.createElement("button");
      playBtn.className = "voice-play-btn";
      playBtn.textContent = "▶";
      const audio = document.createElement("audio");
      audio.src = m.file_url;
      audio.preload = "metadata";
      const wave = document.createElement("div");
      wave.className = "voice-wave";
      for (let i = 0; i < 20; i++) {
        const span = document.createElement("span");
        span.style.height = (5 + Math.random() * 25) + "px";
        wave.appendChild(span);
      }
      const duracion = document.createElement("span");
      duracion.className = "voice-duration";
      duracion.textContent = "0:00";
      audio.addEventListener("loadedmetadata", () => {
        if (isFinite(audio.duration)) duracion.textContent = formatearSegundos(Math.round(audio.duration));
      });
      audio.addEventListener("timeupdate", () => {
        if (isFinite(audio.duration) && audio.duration > 0) {
          duracion.textContent = formatearSegundos(Math.max(0, Math.round(audio.duration - audio.currentTime)));
        }
      });
      playBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (audio.paused) {
          document.querySelectorAll("audio").forEach(a => { if (a !== audio) { try { a.pause(); a.currentTime = 0; } catch (e) {} } });
          audio.play().catch(() => {});
        } else audio.pause();
      });
      audio.addEventListener("play", () => { playBtn.textContent = "⏸"; });
      audio.addEventListener("pause", () => { playBtn.textContent = "▶"; });
      audio.addEventListener("ended", () => {
        playBtn.textContent = "▶"; audio.currentTime = 0;
        if (isFinite(audio.duration)) duracion.textContent = formatearSegundos(Math.round(audio.duration));
      });
      voiceDiv.appendChild(playBtn);
      voiceDiv.appendChild(wave);
      voiceDiv.appendChild(duracion);
      voiceDiv.appendChild(audio);
      body.appendChild(voiceDiv);
    } else if (tipo.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = m.file_url;
      img.className = "msg-file-img";
      img.loading = "lazy";
      img.addEventListener("click", (e) => { e.stopPropagation(); openImageModal(m.file_url); });
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

  const reacciones = (m.reactions || "").split(",").filter(x => x.trim());
  if (reacciones.length > 0) {
    const bar = document.createElement("div");
    bar.className = "reactions-bar";
    const conteo = {};
    reacciones.forEach(r => {
      const emoji = r.split(":")[0];
      conteo[emoji] = (conteo[emoji] || 0) + 1;
    });
    Object.keys(conteo).forEach(emoji => {
      const b = document.createElement("div");
      b.className = "reaction-bubble";
      b.textContent = emoji;
      if (conteo[emoji] > 1) {
        const c = document.createElement("span");
        c.className = "count";
        c.textContent = conteo[emoji];
        b.appendChild(c);
      }
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleReaccion(m.id, emoji);
      });
      bar.appendChild(b);
    });
    content.appendChild(bar);
  }

  div.appendChild(content);

  let longPressTimer = null;
  div.addEventListener("touchstart", (e) => {
    longPressTimer = setTimeout(() => {
      mostrarMenuMensaje(m, e.touches[0].clientX, e.touches[0].clientY);
      if (navigator.vibrate) navigator.vibrate(50);
    }, 500);
  }, { passive: true });
  div.addEventListener("touchend", () => clearTimeout(longPressTimer));
  div.addEventListener("touchmove", () => clearTimeout(longPressTimer));
  div.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    mostrarMenuMensaje(m, e.clientX, e.clientY);
  });

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
    .select("id, text, username, created_at, room, file_url, file_name, file_type, edited_at, reactions, pinned")
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
  enviarTypingStop();

  const { data, error } = await supabaseClient.from("zumm_messages")
    .insert([{ text: text, username: username, room: currentRoom }])
    .select().single();

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
      { event: "UPDATE", schema: "public", table: "zumm_messages" },
      payload => {
        const m = payload.new;
        if (!m || !m.id) return;
        if (m.room !== currentRoom) return;
        const el = messagesEl.querySelector('[data-msg-id="' + m.id + '"]');
        if (el) {
          rendered.delete(m.id);
          el.remove();
          renderMessage(m, false);
        }
        if (m.pinned) {
          cargarMensajeFijado();
        }
      })
  .on("postgres_changes",
      { event: "DELETE", schema: "public", table: "zumm_messages" },
      payload => { if (payload.old && payload.old.id) removeMessageFromDOM(payload.old.id); })
  .subscribe();

// ============ INDICADOR "ESCRIBIENDO..." ============
let typingTimeout = null;
let ultimoTypingEnviado = 0;

function enviarTyping() {
  const ahora = Date.now();
  if (ahora - ultimoTypingEnviado < 2000) return;
  ultimoTypingEnviado = ahora;
  supabaseClient.from("zumm_presence").upsert({
    username: username,
    room: currentRoom,
    last_seen: new Date().toISOString(),
    avatar_url: myAvatarUrl || null,
    typing_at: new Date().toISOString()
  }, { onConflict: "username,room" }).then(() => {}).catch(() => {});
}

function enviarTypingStop() {
  supabaseClient.from("zumm_presence").upsert({
    username: username,
    room: currentRoom,
    last_seen: new Date().toISOString(),
    avatar_url: myAvatarUrl || null,
    typing_at: null
  }, { onConflict: "username,room" }).then(() => {}).catch(() => {});
}

if (inputEl) {
  inputEl.addEventListener("input", () => {
    if (!inputEl.value.trim()) {
      enviarTypingStop();
      clearTimeout(typingTimeout);
      return;
    }
    enviarTyping();
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => { enviarTypingStop(); }, 3500);
  });
}

function actualizarIndicadorTyping(usuariosTyping) {
  if (!typingIndicator) return;
  if (usuariosTyping.length === 0) {
    typingIndicator.classList.remove("show");
    return;
  }
  let texto;
  if (usuariosTyping.length === 1) texto = usuariosTyping[0] + " está escribiendo...";
  else if (usuariosTyping.length === 2) texto = usuariosTyping[0] + " y " + usuariosTyping[1] + " están escribiendo...";
  else texto = usuariosTyping.length + " personas están escribiendo...";
  typingIndicator.textContent = texto;
  typingIndicator.classList.add("show");
}

// ============ MENSAJE FIJADO ============
async function cargarMensajeFijado() {
  if (!pinnedBar || !pinnedText) return;
  try {
    const { data } = await supabaseClient.from("zumm_messages")
      .select("text, username, file_type")
      .eq("room", currentRoom)
      .eq("pinned", true)
      .order("created_at", { ascending: false })
      .limit(1);

    if (!data || data.length === 0) {
      pinnedBar.classList.remove("show");
      return;
    }
    const m = data[0];
    let preview = (m.username || "?") + ": ";
    if (m.file_type && m.file_type.startsWith("audio/")) preview += "🎤 Nota de voz";
    else if (m.text) preview += m.text;
    else preview += "📎 Archivo";
    if (preview.length > 60) preview = preview.substring(0, 60) + "...";
    pinnedText.textContent = "📌 " + preview;
    pinnedBar.classList.add("show");
  } catch (e) { console.warn(e); }
}

if (unpinBtn) {
  unpinBtn.addEventListener("click", async () => {
    if (!confirm("¿Quitar el mensaje fijado?")) return;
    try {
      await supabaseClient.from("zumm_messages")
        .update({ pinned: false })
        .eq("room", currentRoom)
        .eq("pinned", true);
      pinnedBar.classList.remove("show");
    } catch (e) {}
  });
}

// ============ EDITAR MENSAJE ============
let mensajeEditando = null;

function abrirEditorMensaje(m) {
  if (!editModal || !editInput) return;
  if ((m.username || "").toLowerCase() !== username.toLowerCase()) {
    alert("Solo puedes editar tus propios mensajes."); return;
  }
  mensajeEditando = m;
  editInput.value = m.text || "";
  editModal.classList.add("show");
  setTimeout(() => editInput.focus(), 100);
}

if (editCancelBtn) editCancelBtn.addEventListener("click", () => {
  editModal.classList.remove("show"); mensajeEditando = null;
});

if (editSaveBtn) {
  editSaveBtn.addEventListener("click", async () => {
    if (!mensajeEditando || !editInput) return;
    const nuevoTexto = editInput.value.trim();
    if (!nuevoTexto) { alert("El mensaje no puede estar vacío."); return; }
    if (nuevoTexto === mensajeEditando.text) {
      editModal.classList.remove("show"); mensajeEditando = null; return;
    }
    const { error } = await supabaseClient.from("zumm_messages")
      .update({ text: nuevoTexto, edited_at: new Date().toISOString() })
      .eq("id", mensajeEditando.id);
    if (error) { alert("No se pudo editar: " + error.message); return; }
    editModal.classList.remove("show"); mensajeEditando = null;
  });
}

// ============ MENÚ DE MENSAJE ============
let mensajeMenuActual = null;

function mostrarMenuMensaje(m, x, y) {
  if (!msgMenu) return;
  mensajeMenuActual = m;
  const esMio = (m.username || "").toLowerCase() === username.toLowerCase();
  if (menuEditBtn) menuEditBtn.style.display = esMio && m.text ? "block" : "none";
  if (menuDeleteBtn) menuDeleteBtn.style.display = esMio ? "block" : "none";
  if (menuPinBtn) menuPinBtn.textContent = m.pinned ? "📌 Desfijar" : "📌 Fijar";

  msgMenu.classList.add("show");
  const ancho = 170; const alto = 220;
  const xFinal = Math.min(x, window.innerWidth - ancho - 10);
  const yFinal = Math.min(y, window.innerHeight - alto - 10);
  msgMenu.style.left = Math.max(10, xFinal) + "px";
  msgMenu.style.top = Math.max(10, yFinal) + "px";
}

function cerrarMenu() {
  if (msgMenu) msgMenu.classList.remove("show");
  if (reactionPicker) reactionPicker.classList.remove("show");
}

document.addEventListener("touchstart", (e) => {
  if (msgMenu && msgMenu.classList.contains("show") && !msgMenu.contains(e.target)) cerrarMenu();
  if (reactionPicker && reactionPicker.classList.contains("show") && !reactionPicker.contains(e.target)) {
    reactionPicker.classList.remove("show");
  }
});

if (menuPinBtn) {
  menuPinBtn.addEventListener("click", async () => {
    if (!mensajeMenuActual) return;
    const m = mensajeMenuActual;
    const nuevo = !m.pinned;
    cerrarMenu();
    try {
      if (nuevo) {
        await supabaseClient.from("zumm_messages").update({ pinned: false })
          .eq("room", currentRoom).eq("pinned", true);
      }
      await supabaseClient.from("zumm_messages").update({ pinned: nuevo }).eq("id", m.id);
      cargarMensajeFijado();
    } catch (e) {}
  });
}

if (menuCopyBtn) {
  menuCopyBtn.addEventListener("click", async () => {
    if (!mensajeMenuActual) return;
    try {
      await navigator.clipboard.writeText(mensajeMenuActual.text || "");
      alert("📋 Mensaje copiado");
    } catch (e) { alert("No se pudo copiar."); }
    cerrarMenu();
  });
}

if (menuEditBtn) {
  menuEditBtn.addEventListener("click", () => {
    if (!mensajeMenuActual) return;
    const m = mensajeMenuActual;
    cerrarMenu();
    setTimeout(() => abrirEditorMensaje(m), 150);
  });
}

if (menuDeleteBtn) {
  menuDeleteBtn.addEventListener("click", async () => {
    if (!mensajeMenuActual) return;
    const m = mensajeMenuActual;
    cerrarMenu();
    if (!confirm("¿Borrar este mensaje?")) return;
    const { error } = await supabaseClient.from("zumm_messages").delete().eq("id", m.id);
    if (error) { alert("No se pudo borrar: " + error.message); return; }
    removeMessageFromDOM(m.id);
  });
}

// ============ REACCIONES ============
async function toggleReaccion(msgId, emoji) {
  try {
    const { data: msg } = await supabaseClient.from("zumm_messages")
      .select("reactions").eq("id", msgId).single();
    if (!msg) return;
    const actuales = (msg.reactions || "").split(",").filter(x => x.trim());
    const miTag = emoji + ":" + username;
    let nuevas;
    if (actuales.includes(miTag)) {
      nuevas = actuales.filter(x => x !== miTag);
    } else {
      nuevas = actuales.filter(x => !x.endsWith(":" + username));
      nuevas.push(miTag);
    }
    await supabaseClient.from("zumm_messages")
      .update({ reactions: nuevas.join(",") })
      .eq("id", msgId);
  } catch (e) { console.warn(e); }
}

// ============ BÚSQUEDA ============
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    if (!searchBar) return;
    searchBar.classList.toggle("show");
    if (searchBar.classList.contains("show") && searchInput) setTimeout(() => searchInput.focus(), 100);
    else limpiarBusqueda();
  });
}

if (searchClose) {
  searchClose.addEventListener("click", () => {
    if (searchBar) searchBar.classList.remove("show");
    limpiarBusqueda();
  });
}

function limpiarBusqueda() {
  if (searchInput) searchInput.value = "";
  document.querySelectorAll(".msg.highlight").forEach(el => el.classList.remove("highlight"));
  document.querySelectorAll(".msg").forEach(el => { el.style.display = "flex"; });
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase().trim();
    const mensajes = document.querySelectorAll(".msg");
    if (!q) { mensajes.forEach(el => { el.style.display = "flex"; el.classList.remove("highlight"); }); return; }
    mensajes.forEach(el => {
      const texto = (el.textContent || "").toLowerCase();
      const coincide = texto.includes(q);
      el.style.display = coincide ? "flex" : "none";
      el.classList.toggle("highlight", coincide);
    });
  });
}

// ============ BOTÓN IR ABAJO ============
function actualizarBotonAbajo() {
  if (!messagesEl || !scrollDownBtn) return;
  const distanciaAbajo = messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight;
  scrollDownBtn.classList.toggle("show", distanciaAbajo > 150);
}
if (messagesEl) messagesEl.addEventListener("scroll", actualizarBotonAbajo);
if (scrollDownBtn) {
  scrollDownBtn.addEventListener("click", () => {
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
    scrollDownBtn.classList.remove("show");
  });
}

// ============ MODAL DE IMAGEN ============
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
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("show"); });
    document.body.appendChild(modal);
  }
  modal.querySelector("img").src = url;
  modal.classList.add("show");
}

// ============ PRESENCIA ============
let usersOnline = [];
let presenceInterval = null;
let presenceRefreshInterval = null;
let avataresPorUsuario = {};

async function registrarPresencia() {
  try {
    const { error } = await supabaseClient.from("zumm_presence")
      .upsert({
        username: username, room: currentRoom,
        last_seen: new Date().toISOString(),
        avatar_url: myAvatarUrl || null
      }, { onConflict: "username,room" });
    if (error) console.warn("Presencia error:", error.message);
  } catch (e) { console.warn("Presencia excepción:", e); }
}

async function leerPresencia() {
  try {
    const hace30s = new Date(Date.now() - 30000).toISOString();
    const { data, error } = await supabaseClient.from("zumm_presence")
      .select("username, last_seen, avatar_url, typing_at")
      .eq("room", currentRoom)
      .gte("last_seen", hace30s);
    if (error) { console.warn("Leer presencia error:", error.message); return; }

    usersOnline = (data || [])
      .map(u => u.username)
      .filter(u => u.toLowerCase() !== username.toLowerCase());

    avataresPorUsuario = {};
    (data || []).forEach(u => {
      if (u.avatar_url) avataresPorUsuario[u.username.toLowerCase()] = u.avatar_url;
    });

    const ahora = Date.now();
    const escribiendo = (data || [])
      .filter(u => u.username.toLowerCase() !== username.toLowerCase())
      .filter(u => u.typing_at && (ahora - new Date(u.typing_at).getTime() < 5000))
      .map(u => u.username);

    actualizarIndicadorTyping(escribiendo);
    renderUserList();
  } catch (e) { console.warn("Leer presencia excepción:", e); }
}

function iniciarPresencia() {
  registrarPresencia();
  leerPresencia();
  clearInterval(presenceInterval);
  presenceInterval = setInterval(registrarPresencia, 8000);
  clearInterval(presenceRefreshInterval);
  presenceRefreshInterval = setInterval(leerPresencia, 3000);
}

supabaseClient
  .channel("zumm-presence-realtime")
  .on("postgres_changes",
      { event: "*", schema: "public", table: "zumm_presence" },
      () => { leerPresencia(); })
  .subscribe();

// ============ LISTA DE USUARIOS ============
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
    span.addEventListener("click", (e) => { e.stopPropagation(); abrirPerfil(name, false); });
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

// ============ PERFIL ============
let perfilActual = null;

function mostrarAvatarPropio() {
  if (!userMeAvatar) return;
  if (myAvatarUrl) {
    userMeAvatar.textContent = "";
    userMeAvatar.style.backgroundImage = "url(" + myAvatarUrl + ")";
  } else {
    userMeAvatar.textContent = avatarLetter(username);
    userMeAvatar.style.backgroundImage = "";
  }
}

mostrarAvatarPropio();

function abrirPerfil(nombre, editable) {
  if (!profileModal) return;
  perfilActual = nombre;
  const esMio = nombre.toLowerCase() === username.toLowerCase();

  const url = esMio ? myAvatarUrl : (avataresPorUsuario[nombre.toLowerCase()] || "");
  if (url) {
    profileAvatar.style.backgroundImage = "url(" + url + ")";
    profileAvatar.textContent = "";
  } else {
    profileAvatar.style.backgroundImage = "";
    profileAvatar.textContent = avatarLetter(nombre);
    profileAvatar.style.background = colorForUser(nombre);
  }

  profileName.textContent = nombre;

  if (esMio) {
    profileBioDisplay.textContent = myBio || "Sin bio";
    profileStatusDisplay.textContent = myStatus || "Sin estado";
  } else {
    profileBioDisplay.textContent = "Cargando...";
    profileStatusDisplay.textContent = "Cargando...";
    supabaseClient.from("zumm_presence").select("bio, status_text")
      .eq("username", nombre).limit(1).then(({ data }) => {
        if (data && data[0]) {
          profileBioDisplay.textContent = data[0].bio || "Sin bio";
          profileStatusDisplay.textContent = data[0].status_text || "Sin estado";
        }
      });
  }

  profileBioInput.style.display = "none";
  profileStatusInput.style.display = "none";
  profileBioDisplay.style.display = "block";
  profileStatusDisplay.style.display = "block";
  profileEditBtn.style.display = esMio ? "block" : "none";
  profileSaveBtn.style.display = "none";
  profileCancelBtn.style.display = "none";

  profileModal.classList.add("show");
}

if (userMeAvatar) {
  userMeAvatar.addEventListener("click", () => abrirPerfil(username, true));
}

if (profileCloseBtn) {
  profileCloseBtn.addEventListener("click", () => profileModal.classList.remove("show"));
}

if (profileEditBtn) {
  profileEditBtn.addEventListener("click", () => {
    if (!perfilActual || perfilActual.toLowerCase() !== username.toLowerCase()) return;
    profileBioInput.value = myBio;
    profileStatusInput.value = myStatus;
    profileBioDisplay.style.display = "none";
    profileStatusDisplay.style.display = "none";
    profileBioInput.style.display = "block";
    profileStatusInput.style.display = "block";
    profileEditBtn.style.display = "none";
    profileSaveBtn.style.display = "block";
    profileCancelBtn.style.display = "block";
  });
}

if (profileCancelBtn) {
  profileCancelBtn.addEventListener("click", () => abrirPerfil(username, true));
}

if (profileSaveBtn) {
  profileSaveBtn.addEventListener("click", async () => {
    const nuevaBio = (profileBioInput.value || "").trim().substring(0, 100);
    const nuevoStatus = (profileStatusInput.value || "").trim().substring(0, 60);
    myBio = nuevaBio;
    myStatus = nuevoStatus;
    LS.setItem("zummchat_bio", myBio);
    LS.setItem("zummchat_status", myStatus);

    try {
      await supabaseClient.from("zumm_presence").upsert({
        username: username, room: currentRoom,
        last_seen: new Date().toISOString(),
        avatar_url: myAvatarUrl || null,
        bio: myBio,
        status_text: myStatus
      }, { onConflict: "username,room" });
    } catch (e) {}

    abrirPerfil(username, true);
    alert("✅ Perfil actualizado");
  });
}

// Foto de perfil
if (avatarInput) {
  avatarInput.addEventListener("change", async () => {
    const file = avatarInput.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("La foto debe pesar menos de 2 MB.");
      avatarInput.value = ""; return;
    }
    userMeAvatar.textContent = "⏳";
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const nombreArchivo = "avatar_" + username.toLowerCase().replace(/\s/g, "") + "_" + Date.now() + "." + ext;
      const { error: upErr } = await supabaseClient.storage.from("archivos")
        .upload(nombreArchivo, file, { contentType: file.type, upsert: true });
      if (upErr) { alert("No se pudo subir: " + upErr.message); mostrarAvatarPropio(); return; }
      const { data: urlData } = supabaseClient.storage.from("archivos").getPublicUrl(nombreArchivo);
      myAvatarUrl = urlData.publicUrl;
      LS.setItem("zummchat_avatar", myAvatarUrl);
      mostrarAvatarPropio();
      await supabaseClient.from("zumm_presence").upsert({
        username: username, room: currentRoom,
        last_seen: new Date().toISOString(), avatar_url: myAvatarUrl,
        bio: myBio, status_text: myStatus
      }, { onConflict: "username,room" });
      alert("✅ Foto de perfil actualizada");
    } catch (e) { alert("Error: " + e.message); mostrarAvatarPropio(); }
    finally { avatarInput.value = ""; }
  });
}

// Botón de foto (desde el modal de perfil se puede cambiar tocando el avatar)
// No hace falta agregar otro botón, ya está en el panel de usuarios

// Cambiar nombre
function actualizarNombreEnUI() {
  if (userMeName) userMeName.textContent = "Tú: " + username;
}
actualizarNombreEnUI();

if (changeNameBtn) {
  changeNameBtn.addEventListener("click", async () => {
    const nuevo = prompt("Escribe tu nuevo nombre:", username);
    if (!nuevo || !nuevo.trim()) return;
    const limpio = nuevo.trim().substring(0, 20);
    if (limpio.toLowerCase() === username.toLowerCase()) return;
    const viejo = username;
    username = limpio;
    LS.setItem("zummchat_user", username);
    actualizarNombreEnUI();
    try {
      await supabaseClient.from("zumm_presence").delete().eq("username", viejo);
      await supabaseClient.from("zumm_presence").upsert({
        username: username, room: currentRoom,
        last_seen: new Date().toISOString(), avatar_url: myAvatarUrl,
        bio: myBio, status_text: myStatus
      }, { onConflict: "username,room" });
    } catch (e) {}
    alert("✅ Nombre cambiado a: " + username + "\n\nRecarga la página para que todos lo vean.");
  });
}

// ============ ESTADÍSTICAS ============
if (statsBtn) {
  statsBtn.addEventListener("click", async () => {
    if (!statsModal) return;
    statsModal.classList.add("show");
    if (statTotalMsgs) statTotalMsgs.textContent = "...";
    if (statFiles) statFiles.textContent = "...";
    if (statVoice) statVoice.textContent = "...";
    if (statDays) statDays.textContent = "...";
    if (statFirst) statFirst.textContent = "...";

    try {
      const { data } = await supabaseClient.from("zumm_messages")
        .select("created_at, file_type")
        .eq("username", username);

      if (!data || data.length === 0) {
        if (statTotalMsgs) statTotalMsgs.textContent = "0";
        if (statFiles) statFiles.textContent = "0";
        if (statVoice) statVoice.textContent = "0";
        if (statDays) statDays.textContent = "0";
        if (statFirst) statFirst.textContent = "—";
        return;
      }

      const total = data.length;
      const conArchivo = data.filter(m => m.file_type && !m.file_type.startsWith("audio/")).length;
      const conVoz = data.filter(m => m.file_type && m.file_type.startsWith("audio/")).length;

      const fechas = new Set(data.map(m => m.created_at.substring(0, 10)));
      const dias = fechas.size;

      const primera = new Date(data[data.length - 1].created_at);
      const primeraStr = primera.getDate().toString().padStart(2, "0") + "/" + (primera.getMonth() + 1).toString().padStart(2, "0") + "/" + primera.getFullYear();

      if (statTotalMsgs) statTotalMsgs.textContent = total;
      if (statFiles) statFiles.textContent = conArchivo;
      if (statVoice) statVoice.textContent = conVoz;
      if (statDays) statDays.textContent = dias;
      if (statFirst) statFirst.textContent = primeraStr;
    } catch (e) {
      console.warn(e);
    }
  });
}

if (statsCloseBtn) {
  statsCloseBtn.addEventListener("click", () => statsModal.classList.remove("show"));
}

// ============ LLAMADAS WEBRTC ============
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
let currentFacingMode = "user";
let listaCamaras = [];

async function cargarListaCamaras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    listaCamaras = devices.filter(d => d.kind === "videoinput");
  } catch (e) { console.warn("Error cámaras:", e); }
}

async function enviarSenal(toUser, signalType, payload) {
  try {
    const { error } = await supabaseClient.from("zumm_signals")
      .insert([{
        from_user: username, to_user: toUser, from_client: myClientId,
        signal_type: signalType, payload: JSON.stringify(payload || {})
      }]);
    if (error) console.warn("Enviar señal error:", error.message);
  } catch (e) { console.warn("Enviar señal excepción:", e); }
}

async function leerSenales() {
  try {
    const { data, error } = await supabaseClient.from("zumm_signals")
      .select("*").eq("to_user", username)
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

  switch (s.signal_type) {
    case "invite":
      if (payload.targetName && payload.targetName.toLowerCase() !== username.toLowerCase()) return;
      if (activeCall || incomingCall) {
        enviarSenal(fromName, "reject", { callId, reason: "busy" }); return;
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
      clearTimeout(inviteTimer); inviteTimer = null;
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
      } else { iceQueue.push(payload.candidate); }
      break;

    case "hangup":
      const enActiva = activeCall && activeCall.callId === callId;
      const enEntrante = incomingCall && incomingCall.callId === callId;
      if (enEntrante) dismissIncoming(false);
      if (enActiva) { endCall(false); alert(fromName + " colgó."); }
      break;

    case "reject":
      if (!activeCall || activeCall.callId !== callId) return;
      const razon = (payload.reason === "busy") ? fromName + " está en otra llamada." : fromName + " rechazó.";
      endCall(false); alert(razon);
      break;
  }
}

function supportsCalls() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) return true;
  alert("Tu navegador no soporta llamadas.");
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
  } catch (e) { alert("No se pudo acceder al micrófono/cámara:\n" + e.message); return; }

  localStream = stream;
  currentFacingMode = "user";
  await cargarListaCamaras();

  const callId = myClientId + "-" + Date.now();
  activeCall = { callId, peerName: targetName, peerId: null, role: "caller", video: !!withVideo };
  showCallOverlay("Llamando a " + targetName + "...");
  await enviarSenal(targetName, "invite", { targetName, callId, video: !!withVideo });

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

if (rejectBtn) rejectBtn.addEventListener("click", () => dismissIncoming(true));

if (incomingAcceptBtn) {
  incomingAcceptBtn.addEventListener("click", async () => {
    if (!incomingCall) return;
    const call = incomingCall;
    incomingCall = null;
    stopRingtone(); clearTimeout(ringTimeout);
    if (incomingModal) incomingModal.classList.remove("show");
    if (!supportsCalls()) { enviarSenal(call.fromName, "reject", { callId: call.callId }); return; }
    try {
      localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: call.video ? { width: 640, height: 480, facingMode: "user" } : false
      });
    } catch (e) {
      alert("No se pudo acceder al micrófono/cámara:\n" + e.message);
      enviarSenal(call.fromName, "reject", { callId: call.callId }); return;
    }
    currentFacingMode = "user";
    await cargarListaCamaras();
    activeCall = { callId: call.callId, peerName: call.fromName, peerId: call.fromId, role: "callee", video: call.video };
    showCallOverlay("Conectando con " + call.fromName + "...");
    attachLocalPreview();
    await enviarSenal(call.fromName, "accept", { callId: call.callId });
  });
}

function createPeer() {
  pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
  pc.onicecandidate = (e) => {
    if (e.candidate && activeCall) {
      enviarSenal(activeCall.peerName, "ice", { callId: activeCall.callId, candidate: e.candidate });
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
      alert("Se perdió la conexión."); endCall(true);
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
    await enviarSenal(activeCall.peerName, "offer", { callId: activeCall.callId, sdp: pc.localDescription });
  } catch (e) { alert("Error: " + e.message); endCall(true); }
}

async function recibirOferta(sdp) {
  try {
    if (!pc) createPeer();
    attachLocalPreview();
    localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    await enviarSenal(activeCall.peerName, "answer", { callId: activeCall.callId, sdp: pc.localDescription });
    flushIce();
  } catch (e) { alert("Error: " + e.message); endCall(true); }
}

async function recibirRespuesta(sdp) {
  try {
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    flushIce();
  } catch (e) { endCall(true); }
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
    } else { audioAvatar.textContent = ""; }
  }

  if (switchCamBtn) {
    if (activeCall && activeCall.video) {
      switchCamBtn.style.display = "inline-block";
      switchCamBtn.textContent = "🔄 Frontal";
    } else { switchCamBtn.style.display = "none"; }
  }

  muted = false;
  if (muteBtn) { muteBtn.textContent = "🎤 Mic"; muteBtn.classList.remove("muted"); }
}

function endCall(notify) {
  if (notify && activeCall) enviarSenal(activeCall.peerName, "hangup", { callId: activeCall.callId });
  clearTimeout(inviteTimer); inviteTimer = null;
  clearTimeout(ringTimeout);
  if (pc) { try { pc.close(); } catch (e) {} pc = null; }
  if (localStream) { localStream.getTracks().forEach(t => t.stop()); localStream = null; }
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

async function cambiarCamara() {
  if (!localStream) { alert("No hay stream activo."); return; }
  if (!activeCall || !activeCall.video) { alert("Solo en videollamadas."); return; }
  try {
    localStream.getVideoTracks().forEach(t => {
      try { t.stop(); } catch (e) {}
      try { localStream.removeTrack(t); } catch (e) {}
    });
    await new Promise(r => setTimeout(r, 300));
    await cargarListaCamaras();
    currentFacingMode = currentFacingMode === "user" ? "environment" : "user";

    let nuevoStream = null;
    if (listaCamaras.length >= 2) {
      const idxDeseado = currentFacingMode === "user" ? 0 : (listaCamaras.length - 1);
      try {
        nuevoStream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { deviceId: { exact: listaCamaras[idxDeseado].deviceId }, width: { ideal: 640 }, height: { ideal: 480 } }
        });
      } catch (e1) {}
    }
    if (!nuevoStream) {
      try {
        nuevoStream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: { exact: currentFacingMode }, width: { ideal: 640 }, height: { ideal: 480 } }
        });
      } catch (e2) {}
    }
    if (!nuevoStream) {
      try {
        nuevoStream = await navigator.mediaDevices.getUserMedia({
          audio: false, video: { facingMode: currentFacingMode }
        });
      } catch (e3) {}
    }
    if (!nuevoStream) { alert("No se pudo cambiar la cámara."); return; }

    const nuevaPistaVideo = nuevoStream.getVideoTracks()[0];
    if (pc) {
      const senderVideo = pc.getSenders().find(s => s.track && s.track.kind === "video");
      if (senderVideo) await senderVideo.replaceTrack(nuevaPistaVideo);
    }
    localStream.addTrack(nuevaPistaVideo);

    if (localVideo) {
      localVideo.srcObject = null;
      localVideo.srcObject = localStream;
      await localVideo.play().catch(() => {});
    }
    if (switchCamBtn) {
      switchCamBtn.textContent = currentFacingMode === "user" ? "🔄 Frontal" : "🔄 Trasera";
    }
  } catch (e) {
    alert("No se pudo cambiar la cámara:\n" + e.message);
    if (switchCamBtn) switchCamBtn.textContent = "🔄 Cám";
  }
}

if (switchCamBtn) switchCamBtn.addEventListener("click", cambiarCamara);
if (hangupBtn) hangupBtn.addEventListener("click", () => endCall(true));

if (callBtn) {
  callBtn.addEventListener("click", () => {
    if (usersOnline.length === 0) { alert("No hay usuarios en línea."); return; }
    const target = usersOnline.length === 1 ? usersOnline[0] : prompt("¿A quién llamar?\nEn línea: " + usersOnline.join(", "));
    if (!target || !target.trim()) return;
    startCall(target.trim(), false);
  });
}

if (videoBtn) {
  videoBtn.addEventListener("click", () => {
    if (usersOnline.length === 0) { alert("No hay usuarios en línea."); return; }
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
cargarListaCamaras();
actualizarBotonAbajo();
cargarMensajeFijado();

// © 2026 - José Yudier Arencibia Ajo - Todos los derechos reservados.
