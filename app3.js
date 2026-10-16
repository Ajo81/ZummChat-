// ============================================================
// ZummChat - App de mensajería con llamadas y videollamadas
// Creado por: José Yudier Arencibia Ajo
// GitHub: https://github.com/Ajo81/ZummChat-
// Año: 2026 - Todos los derechos reservados.
// ============================================================

const SUPABASE_URL = "https://biqjwbopvjyovxmmutly.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpcWp3Ym9wdmp5b3Z4bW11dGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNDg0ODQsImV4cCI6MjEwMzYyNDQ4NH0.q7IdjNy_OPDpPOJNUJ3FkxDm91LjJPmEP0pFu9CD4dA";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const splash = document.getElementById("splash");
setTimeout(() => {
  if (!splash) return;
  splash.classList.add("hidden");
  if (window.stopMatrixRain) window.stopMatrixRain();
  setTimeout(() => splash.remove(), 500);
}, 2000);

const messagesEl      = document.getElementById("messages");
const inputEl         = document.getElementById("messageInput");
const sendBtn         = document.getElementById("sendBtn");
const chatTitle       = document.getElementById("chat-title");
const emojiBtn        = document.getElementById("emojiBtn");
const emojiBar        = document.getElementById("emoji-bar");
const stickerBtn      = document.getElementById("stickerBtn");
const stickerBar      = document.getElementById("sticker-bar");
const attachBtn       = document.getElementById("attachBtn");
const attachMenu      = document.getElementById("attachMenu");
const menuFileBtn     = document.getElementById("menuFileBtn");
const menuCameraBtn   = document.getElementById("menuCameraBtn");
const menuLocationBtn = document.getElementById("menuLocationBtn");
const menuVoiceBtn    = document.getElementById("menuVoiceBtn");
const fileInput       = document.getElementById("fileInput");
const cameraInput     = document.getElementById("cameraInput");
const usersBtn        = document.getElementById("usersBtn");
const callBtn         = document.getElementById("callBtn");
const videoBtn        = document.getElementById("videoBtn");
const deleteGroupBtn  = document.getElementById("deleteGroupBtn");
const dndIndicator    = document.getElementById("dndIndicator");
const filterBtn       = document.getElementById("filterBtn");
const configBtn       = document.getElementById("configBtn");
const configPanel     = document.getElementById("configPanel");
const configPanelClose = document.getElementById("configPanelClose");
const themeBtn        = document.getElementById("themeBtn");
const colorBtn        = document.getElementById("colorBtn");
const searchBtn       = document.getElementById("searchBtn");
const soundBtn        = document.getElementById("soundBtn");
const soundIcon       = document.getElementById("soundIcon");
const soundsBtn       = document.getElementById("soundsBtn");
const dndBtn          = document.getElementById("dndBtn");
const statsBtn        = document.getElementById("statsBtn");
const groupStatsBtn   = document.getElementById("groupStatsBtn");
const favBtn          = document.getElementById("favBtn");
const shareBtn        = document.getElementById("shareBtn");
const highlightBtn    = document.getElementById("highlightBtn");
const remindersBtn    = document.getElementById("remindersBtn");
const pollBtn         = document.getElementById("pollBtn");
const blockedBtn      = document.getElementById("blockedBtn");
const contactsBtn     = document.getElementById("contactsBtn");
const searchBar       = document.getElementById("searchBar");
const searchInput     = document.getElementById("searchInput");
const searchClose     = document.getElementById("searchClose");
const scrollDownBtn   = document.getElementById("scrollDownBtn");
const editModal       = document.getElementById("editModal");
const editInput       = document.getElementById("editInput");
const editCancelBtn   = document.getElementById("editCancelBtn");
const editSaveBtn     = document.getElementById("editSaveBtn");
const msgMenu         = document.getElementById("msgMenu");
const menuSelectBtn   = document.getElementById("menuSelectBtn");
const menuReplyBtn    = document.getElementById("menuReplyBtn");
const menuForwardBtn  = document.getElementById("menuForwardBtn");
const menuFavBtn      = document.getElementById("menuFavBtn");
const menuPinBtn      = document.getElementById("menuPinBtn");
const menuCopyBtn     = document.getElementById("menuCopyBtn");
const menuEditBtn     = document.getElementById("menuEditBtn");
const menuDeleteBtn   = document.getElementById("menuDeleteBtn");
const reactionPicker  = document.getElementById("reactionPicker");
const typingIndicator = document.getElementById("typingIndicator");
const pinnedBar       = document.getElementById("pinnedBar");
const pinnedText      = document.getElementById("pinnedText");
const unpinBtn        = document.getElementById("unpinBtn");
const replyBar        = document.getElementById("reply-bar");
const replyAuthor     = document.getElementById("reply-author");
const replyPreview    = document.getElementById("reply-preview");
const replyCancelBtn  = document.getElementById("replyCancelBtn");
const filterBar       = document.getElementById("filterBar");
const filterBarText   = document.getElementById("filterBarText");
const filterBarClear  = document.getElementById("filterBarClear");
const selectionBar    = document.getElementById("selectionBar");
const selectionCancelBtn = document.getElementById("selectionCancelBtn");
const selectionCount  = document.getElementById("selectionCount");
const selectionForwardBtn = document.getElementById("selectionForwardBtn");
const selectionDeleteBtn = document.getElementById("selectionDeleteBtn");
const chatOptionsModal = document.getElementById("chatOptionsModal");
const chatOptionsTitle = document.getElementById("chatOptionsTitle");
const optPinChatBtn   = document.getElementById("optPinChatBtn");
const optArchiveChatBtn = document.getElementById("optArchiveChatBtn");
const optWallpaperBtn = document.getElementById("optWallpaperBtn");
const optMuteChatBtn  = document.getElementById("optMuteChatBtn");
const optExportBtn    = document.getElementById("optExportBtn");
const optCancelBtn    = document.getElementById("optCancelBtn");
const muteTimerModal  = document.getElementById("muteTimerModal");
const mute8hBtn       = document.getElementById("mute8hBtn");
const mute1wBtn       = document.getElementById("mute1wBtn");
const muteForeverBtn  = document.getElementById("muteForeverBtn");
const muteOffBtn      = document.getElementById("muteOffBtn");
const muteCancelBtn   = document.getElementById("muteCancelBtn");
const wallpaperModal  = document.getElementById("wallpaperModal");
const wallpaperColors = document.getElementById("wallpaperColors");
const wallpaperImageBtn = document.getElementById("wallpaperImageBtn");
const wallpaperRemoveBtn = document.getElementById("wallpaperRemoveBtn");
const wallpaperCancelBtn = document.getElementById("wallpaperCancelBtn");
const wallpaperInput  = document.getElementById("wallpaperInput");
const dndModal        = document.getElementById("dndModal");
const dnd30mBtn       = document.getElementById("dnd30mBtn");
const dnd2hBtn        = document.getElementById("dnd2hBtn");
const dnd8hBtn        = document.getElementById("dnd8hBtn");
const dndOffBtn       = document.getElementById("dndOffBtn");
const dndCancelBtn    = document.getElementById("dndCancelBtn");
const forwardModal    = document.getElementById("forwardModal");
const forwardList     = document.getElementById("forwardList");
const forwardCancelBtn = document.getElementById("forwardCancelBtn");
const forwardTitle    = document.getElementById("forwardTitle");
const filterModal     = document.getElementById("filterModal");
const filterList      = document.getElementById("filterList");
const filterClearBtn  = document.getElementById("filterClearBtn");
const filterCloseBtn  = document.getElementById("filterCloseBtn");
const statsModal      = document.getElementById("statsModal");
const statsCloseBtn   = document.getElementById("statsCloseBtn");
const statTotalMsgs   = document.getElementById("statTotalMsgs");
const statFiles       = document.getElementById("statFiles");
const statVoice       = document.getElementById("statVoice");
const statDays        = document.getElementById("statDays");
const statFirst       = document.getElementById("statFirst");
const groupStatsModal = document.getElementById("groupStatsModal");
const groupStatsCloseBtn = document.getElementById("groupStatsCloseBtn");
const gStatTotal      = document.getElementById("gStatTotal");
const gStatUsers      = document.getElementById("gStatUsers");
const gStatTop        = document.getElementById("gStatTop");
const gStatFiles      = document.getElementById("gStatFiles");
const gStatVoice      = document.getElementById("gStatVoice");
const gStatFirst      = document.getElementById("gStatFirst");
const gStatRanking    = document.getElementById("gStatRanking");
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
const profileBlockBtn = document.getElementById("profileBlockBtn");
const profileUnblockBtn = document.getElementById("profileUnblockBtn");
const profileAddContactBtn = document.getElementById("profileAddContactBtn");
const profileAvatarChangeBtn = document.getElementById("profileAvatarChangeBtn");
const favModal        = document.getElementById("favModal");
const favList         = document.getElementById("favList");
const favEmpty        = document.getElementById("favEmpty");
const favCloseBtn     = document.getElementById("favCloseBtn");
const highlightModal  = document.getElementById("highlightModal");
const highlightList   = document.getElementById("highlightList");
const highlightEmpty  = document.getElementById("highlightEmpty");
const highlightCloseBtn = document.getElementById("highlightCloseBtn");
const remindersModal  = document.getElementById("remindersModal");
const remindersList   = document.getElementById("remindersList");
const remindersEmpty  = document.getElementById("remindersEmpty");
const remindersCloseBtn = document.getElementById("remindersCloseBtn");
const newReminderBtn  = document.getElementById("newReminderBtn");
const newReminderModal = document.getElementById("newReminderModal");
const reminderText    = document.getElementById("reminderText");
const reminderDate    = document.getElementById("reminderDate");
const reminderCancelBtn = document.getElementById("reminderCancelBtn");
const reminderSaveBtn = document.getElementById("reminderSaveBtn");
const pollModal       = document.getElementById("pollModal");
const pollQuestion    = document.getElementById("pollQuestion");
const pollOpt1        = document.getElementById("pollOpt1");
const pollOpt2        = document.getElementById("pollOpt2");
const pollOpt3        = document.getElementById("pollOpt3");
const pollCancelBtn   = document.getElementById("pollCancelBtn");
const pollSaveBtn     = document.getElementById("pollSaveBtn");
const blockedModal    = document.getElementById("blockedModal");
const blockedList     = document.getElementById("blockedList");
const blockedEmpty    = document.getElementById("blockedEmpty");
const blockedCloseBtn = document.getElementById("blockedCloseBtn");
const contactsModal   = document.getElementById("contactsModal");
const contactsList    = document.getElementById("contactsList");
const contactsEmpty   = document.getElementById("contactsEmpty");
const contactsCloseBtn = document.getElementById("contactsCloseBtn");
const newContactBtn   = document.getElementById("newContactBtn");
const soundsModal     = document.getElementById("soundsModal");
const soundsList      = document.getElementById("soundsList");
const soundsCloseBtn  = document.getElementById("soundsCloseBtn");
const usersPanel      = document.getElementById("usersPanel");
const usersPanelClose = document.getElementById("usersPanelClose");
const userList        = document.getElementById("userList");
const noUsers         = document.getElementById("noUsers");
const userMeName      = document.getElementById("userMeName");
const changeNameBtn   = document.getElementById("changeNameBtn");
const userMeAvatar    = document.getElementById("userMeAvatar");
const avatarInput     = document.getElementById("avatarInput");
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
const recordingPanel  = document.getElementById("recordingPanel");
const recordingTime   = document.getElementById("recordingTime");
const cancelRecBtn    = document.getElementById("cancelRecBtn");
const stopRecBtn      = document.getElementById("stopRecBtn");

const chatListContainer = document.getElementById("chat-list-container");
const chatView          = document.getElementById("chat-view");
const chatListEl        = document.getElementById("chat-list");
const backBtn           = document.getElementById("backBtn");
const newGroupBtn       = document.getElementById("newGroupBtn");
const joinGroupBtn      = document.getElementById("joinGroupBtn");
const shareHomeBtn      = document.getElementById("shareHomeBtn");

const MAX_SIZE_MB = 5;
const BOT_NAME = "🤖 ZummBot";

const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: ["turn:turn.evan-brass.net:3478", "turn:turn.evan-brass.net:3478?transport=tcp"], username: "user", credential: "password" },
  { urls: ["turn:openrelay.metered.ca:80", "turn:openrelay.metered.ca:443", "turn:openrelay.metered.ca:443?transport=tcp"], username: "openrelayproject", credential: "openrelayproject" }
];

function makeStorage(tipo) {
  try {
    const backend = tipo === "local" ? window.localStorage : window.sessionStorage;
    backend.setItem("__zumm_t", "1"); backend.removeItem("__zumm_t");
    return backend;
  } catch (e) {
    const mem = {};
    return { getItem: k => Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null, setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
  }
}
const LS = makeStorage("local");
const SS = makeStorage("session");

let username = LS.getItem("zummchat_user");
if (!username) {
  username = prompt("¿Cómo te llamas?");
  if (!username || !username.trim()) username = "Anónimo";
  username = username.trim().substring(0, 20);
  LS.setItem("zummchat_user", username);
}
if (!SS.getItem("zummchat_cid")) {
  SS.setItem("zummchat_cid", (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : "c" + Date.now() + Math.random().toString(36).slice(2));
}
const myClientId = SS.getItem("zummchat_cid");
let myAvatarUrl = LS.getItem("zummchat_avatar") || "";
let myBio = LS.getItem("zummchat_bio") || "";
let myStatus = LS.getItem("zummchat_status") || "";
let currentRoom = "general";
let inChatView = false;
let replyTo = null;
let mensajeParaReenviar = null;
let chatOpcionesActual = null;
let chatParaSilenciar = null;
let chatParaWallpaper = null;
let modoSeleccion = false;
let mensajesSeleccionados = new Set();
let filtroUsuarioActual = null;
let filtroUsuarioModo = null;

function limpiarNombre(texto) {
  if (!texto) return "user";
  return String(texto).toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n").replace(/[^a-z0-9]/g, "") || "user";
}

function getLastRead(room) { return LS.getItem("zummchat_lastread_" + room) || ""; }
function setLastRead(room) { if (!room) return; LS.setItem("zummchat_lastread_" + room, new Date().toISOString()); }

let chatsFijados = JSON.parse(LS.getItem("zummchat_fijados") || "[]");
function guardarFijados() { LS.setItem("zummchat_fijados", JSON.stringify(chatsFijados)); }
function estaFijado(room) { return chatsFijados.includes(room); }
function toggleFijar(room) {
  if (chatsFijados.includes(room)) { chatsFijados = chatsFijados.filter(r => r !== room); alert("📌 Chat desfijado"); }
  else { chatsFijados.push(room); alert("📌 Chat fijado arriba"); }
  guardarFijados(); renderChatList();
}

let chatsArchivados = JSON.parse(LS.getItem("zummchat_archivados") || "[]");
function guardarArchivados() { LS.setItem("zummchat_archivados", JSON.stringify(chatsArchivados)); }
function estaArchivado(room) { return chatsArchivados.includes(room); }
function toggleArchivar(room) {
  if (chatsArchivados.includes(room)) { chatsArchivados = chatsArchivados.filter(r => r !== room); LS.removeItem("zummchat_archived_time_" + room); alert("📥 Chat desarchivado"); }
  else { chatsArchivados.push(room); LS.setItem("zummchat_archived_time_" + room, new Date().toISOString()); alert("📥 Chat archivado"); }
  guardarArchivados(); renderChatList();
}

let chatsSilenciados = JSON.parse(LS.getItem("zummchat_silenciados") || "[]");
function guardarSilenciados() { LS.setItem("zummchat_silenciados", JSON.stringify(chatsSilenciados)); }
function chatEstaSilenciado(room) {
  if (!chatsSilenciados.includes(room)) return false;
  const expira = LS.getItem("zummchat_silenced_until_" + room);
  if (expira) { if (Date.now() > parseInt(expira)) { chatsSilenciados = chatsSilenciados.filter(r => r !== room); LS.removeItem("zummchat_silenced_until_" + room); guardarSilenciados(); return false; } }
  return true;
}
function silenciarPor(room, ms) {
  if (!chatsSilenciados.includes(room)) chatsSilenciados.push(room);
  if (ms > 0) LS.setItem("zummchat_silenced_until_" + room, String(Date.now() + ms));
  else LS.removeItem("zummchat_silenced_until_" + room);
  guardarSilenciados(); renderChatList();
}
function quitarSilencio(room) {
  chatsSilenciados = chatsSilenciados.filter(r => r !== room);
  LS.removeItem("zummchat_silenced_until_" + room);
  guardarSilenciados(); renderChatList();
}

function dndEstaActivo() {
  const hasta = LS.getItem("zummchat_dnd_until");
  if (!hasta) return false;
  if (Date.now() > parseInt(hasta)) { LS.removeItem("zummchat_dnd_until"); return false; }
  return true;
}
function activarDnd(ms) { LS.setItem("zummchat_dnd_until", String(Date.now() + ms)); actualizarIndicadorDnd(); actualizarBotonDnd(); }
function desactivarDnd() { LS.removeItem("zummchat_dnd_until"); actualizarIndicadorDnd(); actualizarBotonDnd(); }
function actualizarIndicadorDnd() { if (!dndIndicator) return; dndIndicator.style.display = dndEstaActivo() ? "flex" : "none"; }
function actualizarBotonDnd() { if (!dndBtn) return; if (dndEstaActivo()) dndBtn.classList.add("activo"); else dndBtn.classList.remove("activo"); }
setInterval(() => { actualizarIndicadorDnd(); actualizarBotonDnd(); }, 30000);

const WALLPAPER_COLORS = [
  { id: "default", value: "var(--bg-secondary)", nombre: "Por defecto" },
  { id: "azul", value: "#0a1929", nombre: "Azul" },
  { id: "verde", value: "#0a1f0a", nombre: "Verde" },
  { id: "rojo", value: "#1f0a0a", nombre: "Rojo" },
  { id: "morado", value: "#150a29", nombre: "Morado" },
  { id: "rosa", value: "#290a1f", nombre: "Rosa" },
  { id: "gris", value: "#1a1a1a", nombre: "Gris" },
  { id: "crema", value: "#2a2418", nombre: "Crema" }
];
function getWallpaper(room) {
  if (!room) return null;
  const tipo = LS.getItem("zummchat_wallpaper_tipo_" + room);
  if (!tipo) return null;
  if (tipo === "color") return { tipo: "color", value: LS.getItem("zummchat_wallpaper_value_" + room) };
  if (tipo === "imagen") return { tipo: "imagen", value: LS.getItem("zummchat_wallpaper_value_" + room) };
  return null;
}
function aplicarWallpaper(room) {
  if (!messagesEl) return;
  const wp = getWallpaper(room);
  if (!wp) { messagesEl.style.backgroundImage = ""; messagesEl.style.background = "var(--bg-secondary)"; return; }
  if (wp.tipo === "color") { messagesEl.style.backgroundImage = ""; messagesEl.style.background = wp.value; }
  else if (wp.tipo === "imagen") { messagesEl.style.background = "var(--bg-secondary)"; messagesEl.style.backgroundImage = "url(" + wp.value + ")"; }
}
function setWallpaperColor(room, valor) { LS.setItem("zummchat_wallpaper_tipo_" + room, "color"); LS.setItem("zummchat_wallpaper_value_" + room, valor); }
function setWallpaperImagen(room, url) { LS.setItem("zummchat_wallpaper_tipo_" + room, "imagen"); LS.setItem("zummchat_wallpaper_value_" + room, url); }
function quitarWallpaper(room) { LS.removeItem("zummchat_wallpaper_tipo_" + room); LS.removeItem("zummchat_wallpaper_value_" + room); }

let bloqueados = new Set();
async function cargarBloqueados() {
  try {
    const { data } = await supabaseClient.from("zumm_bloqueados").select("bloqueado").eq("owner", username);
    bloqueados = new Set((data || []).map(b => b.bloqueado.toLowerCase()));
  } catch (e) {}
}

let misContactos = [];
async function cargarContactos() {
  try {
    const { data } = await supabaseClient.from("zumm_contactos").select("contacto").eq("owner", username).order("contacto", { ascending: true });
    misContactos = (data || []).map(c => c.contacto);
  } catch (e) { misContactos = []; }
}
async function añadirContacto(nombre) {
  if (!nombre) return;
  const limpio = nombre.trim().substring(0, 20);
  if (!limpio) return;
  if (limpio.toLowerCase() === username.toLowerCase()) { alert("No puedes añadirte."); return; }
  if (misContactos.some(c => c.toLowerCase() === limpio.toLowerCase())) { alert("Ya está en contactos."); return; }
  const { error } = await supabaseClient.from("zumm_contactos").insert([{ owner: username, contacto: limpio }]);
  if (error) { alert("Error: " + error.message); return; }
  misContactos.push(limpio);
  misContactos.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  alert("✅ " + limpio + " añadido");
}
async function eliminarContacto(nombre) {
  await supabaseClient.from("zumm_contactos").delete().eq("owner", username).eq("contacto", nombre);
  misContactos = misContactos.filter(c => c !== nombre);
}
function estaEnContactos(nombre) { return misContactos.some(c => c.toLowerCase() === (nombre || "").toLowerCase()); }

let temaActual = LS.getItem("zummchat_tema") || "dark";
let packActual = LS.getItem("zummchat_pack") || "";
function aplicarTema() {
  document.body.classList.toggle("theme-light", temaActual === "light");
  const icon = themeBtn ? themeBtn.querySelector(".config-icon") : null;
  if (icon) icon.textContent = temaActual === "light" ? "☀️" : "🌙";
}
function aplicarPack() {
  const packs = ["pack-neon","pack-ocean","pack-sunset","pack-forest","pack-rose","pack-gold","pack-midnight","pack-matrix"];
  document.body.classList.remove(...packs);
  if (packActual) document.body.classList.add("pack-" + packActual);
}
aplicarTema(); aplicarPack();
if (themeBtn) themeBtn.addEventListener("click", () => {
  temaActual = temaActual === "dark" ? "light" : "dark";
  LS.setItem("zummchat_tema", temaActual); aplicarTema();
});
const packsDisponibles = [
  { id: "", nombre: "🎨 Verde (original)" }, { id: "neon", nombre: "💜 Neón" },
  { id: "ocean", nombre: "🌊 Océano" }, { id: "sunset", nombre: "🌅 Atardecer" },
  { id: "forest", nombre: "🌲 Bosque" }, { id: "rose", nombre: "🌸 Rosa" },
  { id: "gold", nombre: "👑 Dorado" }, { id: "midnight", nombre: "🌌 Medianoche" },
  { id: "matrix", nombre: "🟢 Matrix" }
];
if (colorBtn) colorBtn.addEventListener("click", () => {
  const lista = packsDisponibles.map((p, i) => (i + 1) + ". " + p.nombre).join("\n");
  const eleccion = prompt("Tema:\n\n" + lista + "\n\nNúmero (1-9):");
  const idx = parseInt(eleccion) - 1;
  if (isNaN(idx) || idx < 0 || idx >= packsDisponibles.length) return;
  packActual = packsDisponibles[idx].id;
  LS.setItem("zummchat_pack", packActual); aplicarPack();
  alert("🎨 Tema: " + packsDisponibles[idx].nombre);
});

let sonidoActivo = LS.getItem("zummchat_sonido") !== "off";
let audioCtx = null;
function initAudio() {
  if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; } }
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
}

const SONIDOS_DISPONIBLES = [
  { id: "clasico", nombre: "🎵 Clásico", notas: [880, 1100, 880], gap: 350, tipo: "sine" },
  { id: "suave", nombre: "🌙 Suave", notas: [600, 800], gap: 400, tipo: "sine" },
  { id: "alegre", nombre: "🎉 Alegre", notas: [523, 659, 784, 1046], gap: 150, tipo: "sine" },
  { id: "grave", nombre: "🎸 Grave", notas: [440, 330, 220], gap: 300, tipo: "triangle" },
  { id: "campana", nombre: "🔔 Campana", notas: [1200, 1600, 1200], gap: 200, tipo: "sine" },
  { id: "susurro", nombre: "🤫 Susurro", notas: [1000, 1200], gap: 250, tipo: "sine" },
  { id: "urgente", nombre: "🚨 Urgente", notas: [900, 900, 900, 900], gap: 120, tipo: "square" },
  { id: "gotas", nombre: "💧 Gotas", notas: [700, 900, 700, 900], gap: 180, tipo: "sine" },
  { id: "cristal", nombre: "💎 Cristal Zumm", notas: [1046, 1318, 1568, 2093], gap: 90, tipo: "sine", eco: true },
  { id: "silencioso", nombre: "🔕 Solo vibración", notas: [], gap: 0, tipo: "sine" }
];
let sonidoActual = LS.getItem("zummchat_tono") || "clasico";

function reproducirSonidoInsistente() {
  if (!sonidoActivo) return;
  if (dndEstaActivo()) return;
  const sonido = SONIDOS_DISPONIBLES.find(s => s.id === sonidoActual) || SONIDOS_DISPONIBLES[0];
  initAudio();
  if (sonido.notas.length > 0 && audioCtx) {
    sonido.notas.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
          osc.type = sonido.tipo || "sine"; osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.22, audioCtx.currentTime + 0.015);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
          osc.connect(gain); gain.connect(audioCtx.destination);
          osc.start(); osc.stop(audioCtx.currentTime + 0.45);
          if (sonido.eco) {
            setTimeout(() => {
              try {
                const osc2 = audioCtx.createOscillator(); const gain2 = audioCtx.createGain();
                osc2.type = "sine"; osc2.frequency.value = freq * 2;
                gain2.gain.setValueAtTime(0.0001, audioCtx.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.02);
                gain2.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
                osc2.connect(gain2); gain2.connect(audioCtx.destination);
                osc2.start(); osc2.stop(audioCtx.currentTime + 0.35);
              } catch (e) {}
            }, 60);
          }
        } catch (e) {}
      }, idx * sonido.gap);
    });
  }
  if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
}

function reproducirSonidoPreview(sonidoId) {
  const sonido = SONIDOS_DISPONIBLES.find(s => s.id === sonidoId);
  if (!sonido || sonido.notas.length === 0) return;
  initAudio(); if (!audioCtx) return;
  sonido.notas.forEach((freq, idx) => {
    setTimeout(() => {
      try {
        const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
        osc.type = sonido.tipo || "sine"; osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.22, audioCtx.currentTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 0.45);
      } catch (e) {}
    }, idx * sonido.gap);
  });
}

document.body.addEventListener("touchstart", initAudio, { once: true });
document.body.addEventListener("click", initAudio, { once: true });
function updateSoundBtn() { if (soundIcon) soundIcon.textContent = sonidoActivo ? "🔔" : "🔕"; }
updateSoundBtn();
if (soundBtn) soundBtn.addEventListener("click", () => {
  sonidoActivo = !sonidoActivo;
  LS.setItem("zummchat_sonido", sonidoActivo ? "on" : "off");
  updateSoundBtn();
  if (sonidoActivo) reproducirSonidoInsistente();
});

if ("Notification" in window && Notification.permission === "default") {
  setTimeout(() => { Notification.requestPermission().catch(() => {}); }, 3000);
}
let mensajesNoLeidos = 0;
let tituloParpadeoInterval = null;
let tituloParpadeando = false;
const TITULO_BASE = "ZummChat";
function mostrarNotificacion(remitente, texto, room) {
  if (room && chatEstaSilenciado(room)) return;
  if (dndEstaActivo()) return;
  if (remitente === BOT_NAME) return;
  try {
    if ("Notification" in window && Notification.permission === "granted") {
      const n = new Notification("💬 " + remitente, {
        body: texto || "Nuevo mensaje", icon: "icon.png", badge: "icon.png",
        tag: "zummchat-msg", renotify: true, vibrate: [200, 100, 200, 100, 200], silent: false
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
      document.title = document.title.startsWith("(") ? "💬 ZummChat" : "(" + mensajesNoLeidos + ") 💬 ZummChat";
    }, 1000);
  }
  reproducirSonidoInsistente();
}

function mostrarNotificacionConexion(nombreUsuario) {
  const roomPrivado = "priv:" + nombreUsuario;
  if (chatEstaSilenciado(roomPrivado)) return;
  if (dndEstaActivo()) return;
  try {
    if ("Notification" in window && Notification.permission === "granted") {
      const n = new Notification("🟢 " + nombreUsuario + " se conectó", {
        body: "Está en línea ahora", icon: "icon.png", badge: "icon.png",
        tag: "zummchat-presence", renotify: false, silent: true, vibrate: [100]
      });
      n.onclick = () => { try { window.focus(); } catch (e) {} n.close(); };
      setTimeout(() => { try { n.close(); } catch (e) {} }, 5000);
    }
  } catch (e) {}
  if (sonidoActivo) reproducirSonidoConexion();
}

function reproducirSonidoConexion() {
  if (dndEstaActivo()) return;
  initAudio(); if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
    osc.type = "sine"; osc.frequency.value = 1200;
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.15, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.25);
  } catch (e) {}
}

function resetearTitulo() {
  mensajesNoLeidos = 0; document.title = TITULO_BASE;
  if (tituloParpadeoInterval) { clearInterval(tituloParpadeoInterval); tituloParpadeoInterval = null; tituloParpadeando = false; }
}
window.addEventListener("focus", resetearTitulo);
document.addEventListener("visibilitychange", () => { if (!document.hidden) resetearTitulo(); });

let ringInterval = null;
function playRingtone() {
  initAudio(); if (!audioCtx) return;
  const tocarTono = () => {
    try {
      const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
      osc.type = "sine"; osc.frequency.value = 660;
      gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + 0.55);
    } catch (e) {}
  };
  tocarTono(); setTimeout(tocarTono, 600);
  ringInterval = setInterval(() => {
    tocarTono(); setTimeout(tocarTono, 600);
    if (navigator.vibrate) navigator.vibrate([400, 200, 400]);
  }, 2000);
}
function stopRingtone() {
  if (ringInterval) { clearInterval(ringInterval); ringInterval = null; }
  if (navigator.vibrate) navigator.vibrate(0);
}

function colorForUser(name) {
  if (name === BOT_NAME) return "#00ff66";
  if (!name) name = "Anónimo";
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return "hsl(" + (hash % 360) + ", 75%, 65%)";
}
function avatarLetter(name) {
  if (name === BOT_NAME) return "🤖";
  if (!name) return "?";
  const limpio = name.trim(); if (!limpio) return "?";
  return limpio.charAt(0).toUpperCase();
}
function roomLabel(room) {
  if (room.startsWith("priv:")) {
    const partes = room.replace("priv:", "").split("|");
    const otro = partes.find(n => n.toLowerCase() !== username.toLowerCase()) || partes[0];
    return "🔒 " + otro;
  }
  if (room.startsWith("grupo:")) return "👥 " + room.replace("grupo:", "");
  return room.charAt(0).toUpperCase() + room.slice(1);
}
function formatearSegundos(s) { const m = Math.floor(s / 60); const seg = s % 60; return m + ":" + String(seg).padStart(2, "0"); }

function cerrarPaneles() {
  if (configPanel) configPanel.classList.remove("show");
  if (attachMenu) attachMenu.classList.remove("show");
  if (usersPanel) usersPanel.classList.remove("show");
}
if (configBtn) configBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const abierto = configPanel.classList.contains("show");
  cerrarPaneles();
  if (!abierto) configPanel.classList.add("show");
});
if (configPanelClose) configPanelClose.addEventListener("click", cerrarPaneles);
if (attachBtn) attachBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const abierto = attachMenu.classList.contains("show");
  cerrarPaneles();
  if (!abierto) attachMenu.classList.add("show");
});
document.addEventListener("touchstart", (e) => {
  if (configPanel && configPanel.classList.contains("show") && !configPanel.contains(e.target) && e.target !== configBtn) configPanel.classList.remove("show");
  if (attachMenu && attachMenu.classList.contains("show") && !attachMenu.contains(e.target) && e.target !== attachBtn) attachMenu.classList.remove("show");
});

function linkify(texto) {
  if (!texto) return "";
  const urlRegex = /(https?:\/\/[^\s<]+)/g;
  const partes = texto.split(urlRegex);
  const frag = document.createDocumentFragment();
  partes.forEach(parte => {
    if (urlRegex.test(parte)) {
      const a = document.createElement("a");
      a.href = parte; a.target = "_blank"; a.rel = "noopener noreferrer";
      a.className = "auto-link"; a.textContent = parte;
      frag.appendChild(a);
    } else frag.appendChild(document.createTextNode(parte));
    urlRegex.lastIndex = 0;
  });
  return frag;
}

const mensajesBienvenida = ["¡Hola {nombre}! 👋 Bienvenido a {sala}.","🎉 {nombre} se unió a {sala}. ¡Saluda!","👋 Hey {nombre}, bienvenido a {sala}.","🌟 Bienvenido {nombre} a {sala}.","🎊 Llegó {nombre} a {sala}."];
async function enviarMensajeBot(texto) {
  try { await supabaseClient.from("zumm_messages").insert([{ text: texto, username: BOT_NAME, room: currentRoom }]); } catch (e) {}
}
async function saludarBienvenida() {
  if (!currentRoom) return;
  const key = "zummchat_bot_" + currentRoom + "_" + username.toLowerCase();
  const ultimo = LS.getItem(key); const ahora = Date.now();
  if (ultimo && (ahora - parseInt(ultimo)) < 6 * 60 * 60 * 1000) return;
  LS.setItem(key, String(ahora));
  const plantilla = mensajesBienvenida[Math.floor(Math.random() * mensajesBienvenida.length)];
  const texto = plantilla.replace("{nombre}", username).replace("{sala}", roomLabel(currentRoom));
  setTimeout(() => { enviarMensajeBot(texto); }, 2000);
}

let gruposPersonalizados = JSON.parse(LS.getItem("zummchat_grupos") || "[]");
let gruposOcultos = JSON.parse(LS.getItem("zummchat_grupos_ocultos") || "[]");
function guardarGrupos() { LS.setItem("zummchat_grupos", JSON.stringify(gruposPersonalizados)); }
function guardarGruposOcultos() { LS.setItem("zummchat_grupos_ocultos", JSON.stringify(gruposOcultos)); }

if (newGroupBtn) newGroupBtn.addEventListener("click", async () => {
  const nombre = prompt("Nombre del grupo:");
  if (!nombre || !nombre.trim()) return;
  const limpio = nombre.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "").substring(0, 30);
  if (!limpio) { alert("Nombre inválido."); return; }
  const { data: existente } = await supabaseClient.from("zumm_grupos").select("nombre, password").eq("nombre", limpio).maybeSingle();
  if (existente) { alert("⚠️ Ya existe un grupo con ese nombre."); return; }
  const pass = prompt("Contraseña para el grupo (opcional):");
  const { error } = await supabaseClient.from("zumm_grupos").insert([{ nombre: limpio, password: (pass && pass.trim()) ? pass.trim() : null, creador: username }]);
  if (error) { alert("Error: " + error.message); return; }
  if (gruposOcultos.includes(limpio)) { gruposOcultos = gruposOcultos.filter(g => g !== limpio); guardarGruposOcultos(); }
  if (!gruposPersonalizados.includes(limpio)) { gruposPersonalizados.push(limpio); guardarGrupos(); }
  switchRoom("grupo:" + limpio);
  if (pass && pass.trim()) setTimeout(() => { alert("✅ Grupo '" + limpio + "' creado 🔒\n\nComparte:\n• Nombre: " + limpio + "\n• Contraseña: " + pass); }, 300);
  else setTimeout(() => { alert("✅ Grupo '" + limpio + "' creado (público)."); }, 300);
});

if (joinGroupBtn) joinGroupBtn.addEventListener("click", async () => {
  const nombre = prompt("Nombre del grupo:");
  if (!nombre || !nombre.trim()) return;
  const limpio = nombre.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "").substring(0, 30);
  if (!limpio) { alert("Nombre inválido."); return; }
  const { data: grupo, error } = await supabaseClient.from("zumm_grupos").select("nombre, password, creador").eq("nombre", limpio).maybeSingle();
  if (error) { alert("Error: " + error.message); return; }
  if (!grupo) { if (gruposPersonalizados.includes(limpio)) { switchRoom("grupo:" + limpio); return; } alert("❌ No existe ese grupo."); return; }
  if (grupo.password) {
    const pass = prompt("🔒 Este grupo está protegido:\nEscribe la contraseña:");
    if (pass === null) return;
    if (pass.trim() !== grupo.password) { alert("❌ Contraseña incorrecta."); return; }
  }
  if (gruposOcultos.includes(limpio)) { gruposOcultos = gruposOcultos.filter(g => g !== limpio); guardarGruposOcultos(); }
  if (!gruposPersonalizados.includes(limpio)) { gruposPersonalizados.push(limpio); guardarGrupos(); }
  switchRoom("grupo:" + limpio);
  setTimeout(() => alert("✅ Te uniste al grupo '" + limpio + "'"), 300);
});

function compartirEnlace() {
  const url = location.href;
  const datos = { title: "ZummChat", text: "¡Únete a mi chat ZummChat! 🐦💬", url: url };
  if (navigator.share) { navigator.share(datos).catch(() => {}); }
  else { navigator.clipboard.writeText(url).then(() => alert("✅ Enlace copiado")).catch(() => prompt("Copia:", url)); }
}
if (shareBtn) shareBtn.addEventListener("click", compartirEnlace);
if (shareHomeBtn) shareHomeBtn.addEventListener("click", compartirEnlace);

function showChatList() {
  inChatView = false;
  currentRoom = null;
  salirModoSeleccion();
  limpiarFiltroUsuario(false);
  if (chatTitle) chatTitle.textContent = "ZummChat · Chats";
  if (chatListContainer) chatListContainer.style.display = "flex";
  if (chatView) chatView.style.display = "none";
  if (backBtn) backBtn.style.display = "none";
  if (searchBar) searchBar.classList.remove("show");
  if (deleteGroupBtn) deleteGroupBtn.style.display = "none";
  if (filterBtn) filterBtn.style.display = "none";
  if (messagesEl) { messagesEl.style.backgroundImage = ""; messagesEl.style.background = "var(--bg-secondary)"; }
  ocultarReplyBar();
  renderChatList();
}
function showChatView() {
  inChatView = true;
  if (chatListContainer) chatListContainer.style.display = "none";
  if (chatView) chatView.style.display = "flex";
  if (backBtn) backBtn.style.display = "flex";
}
if (backBtn) backBtn.addEventListener("click", showChatList);

async function getInfoChat(room) {
  try {
    const { data } = await supabaseClient.from("zumm_messages").select("created_at, username, text, file_type, file_url").eq("room", room).order("created_at", { ascending: false }).limit(1);
    const ultimo = data && data[0] ? data[0] : null;
    let noLeidos = 0;
    const lastRead = getLastRead(room);
    if (lastRead) {
      const { count } = await supabaseClient.from("zumm_messages").select("*", { count: "exact", head: true }).eq("room", room).gt("created_at", lastRead).neq("username", username);
      noLeidos = count || 0;
    }
    return { ultimo, noLeidos };
  } catch (e) { return { ultimo: null, noLeidos: 0 }; }
}

function formatHoraCorta(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const ahora = new Date();
  if (d.toDateString() === ahora.toDateString()) return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  const ayer = new Date(ahora); ayer.setDate(ahora.getDate() - 1);
  if (d.toDateString() === ayer.toDateString()) return "Ayer";
  const dd = String(d.getDate()).padStart(2, "0"); const mm = String(d.getMonth() + 1).padStart(2, "0");
  return dd + "/" + mm;
}

function previewUltimoMsg(m) {
  if (!m) return "Sin mensajes";
  let texto = "";
  const tipo = m.file_type || "";
  if (m.text && m.text.startsWith("[STICKER]")) texto = "🧩 Sticker";
  else if (m.text && m.text.startsWith("[FORWARD]")) texto = "🔁 " + m.text.replace("[FORWARD] ", "");
  else if (tipo.startsWith("audio/")) texto = "🎤 Nota de voz";
  else if (tipo.startsWith("location/")) texto = "📍 Ubicación";
  else if (tipo.startsWith("poll/")) texto = "📊 Encuesta";
  else if (m.file_url) texto = "📎 Archivo";
  else texto = m.text || "";
  texto = texto.replace(/^\[REPLY:[^\]]+\]\s*/i, "");
  const esMio = (m.username || "").toLowerCase() === username.toLowerCase();
  if (esMio) texto = "Tú: " + texto;
  return texto;
}

let renderizandoLista = false;
async function renderChatList() {
  if (renderizandoLista) return;
  if (!chatListEl) return;
  renderizandoLista = true;
  try {
    chatListEl.innerHTML = "";
    const gruposBase = ["general", "amigos", "familia", "trabajo"];
    const todosGrupos = [...gruposBase, ...gruposPersonalizados.filter(g => !gruposOcultos.includes(g)).map(g => "grupo:" + g)];
    const privados = [];
    const usuariosMostrados = new Set();
    const miUserLower = username.toLowerCase();
    privateRooms.forEach(room => {
      const partes = room.replace("priv:", "").split("|");
      const otro = partes.find(n => n.toLowerCase() !== miUserLower);
      if (otro && !usuariosMostrados.has(otro.toLowerCase())) { usuariosMostrados.add(otro.toLowerCase()); privados.push({ otro, room }); }
    });
    usersOnline.forEach(u => {
      if (u.toLowerCase() !== miUserLower && !usuariosMostrados.has(u.toLowerCase())) {
        usuariosMostrados.add(u.toLowerCase());
        const partes = [username, u].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        privados.push({ otro: u, room: "priv:" + partes[0] + "|" + partes[1] });
      }
    });
    misContactos.forEach(c => {
      if (c.toLowerCase() !== miUserLower && !usuariosMostrados.has(c.toLowerCase())) {
        usuariosMostrados.add(c.toLowerCase());
        const partes = [username, c].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        privados.push({ otro: c, room: "priv:" + partes[0] + "|" + partes[1] });
      }
    });
    const promesas = [];
    todosGrupos.forEach(room => { promesas.push(getInfoChat(room).then(info => ({ tipo: "grupo", room, info }))); });
    privados.forEach(p => { promesas.push(getInfoChat(p.room).then(info => ({ tipo: "priv", room: p.room, otro: p.otro, info }))); });
    const resultados = await Promise.all(promesas);
    const fijados = []; const normales = [];
    resultados.forEach(r => {
      if (estaFijado(r.room)) fijados.push(r);
      else if (estaArchivado(r.room)) {
        const archTime = LS.getItem("zummchat_archived_time_" + r.room);
        const lastMsgTime = r.info && r.info.ultimo ? r.info.ultimo.created_at : null;
        if (archTime && lastMsgTime && new Date(lastMsgTime) > new Date(archTime)) {
          chatsArchivados = chatsArchivados.filter(x => x !== r.room);
          LS.removeItem("zummchat_archived_time_" + r.room);
          guardarArchivados(); normales.push(r);
        }
      } else normales.push(r);
    });
    fijados.forEach(r => { if (r.tipo === "grupo") crearItemChat(roomLabel(r.room), r.room, "grupo", r.info); else crearItemChat(r.otro, r.room, "priv", r.info); });
    normales.forEach(r => { if (r.tipo === "grupo") crearItemChat(roomLabel(r.room), r.room, "grupo", r.info); else crearItemChat(r.otro, r.room, "priv", r.info); });
  } catch (e) { console.error("Error renderChatList:", e); }
  finally { renderizandoLista = false; }
}

function crearItemChat(nombreUsuario, roomId, tipo, info) {
  const li = document.createElement("li");
  li.className = "chat-item";
  const esGrupo = tipo === "grupo";
  const estaOnline = !esGrupo && usersOnline.some(u => u.toLowerCase() === nombreUsuario.toLowerCase());
  const urlAvatar = !esGrupo ? (avataresPorUsuario[nombreUsuario.toLowerCase()] || "") : "";
  if (estaFijado(roomId)) li.classList.add("pinned");
  if (chatEstaSilenciado(roomId)) li.classList.add("muted-chat");
  const avatar = document.createElement("div");
  avatar.className = "chat-avatar";
  if (esGrupo) { avatar.style.background = "var(--accent)"; avatar.textContent = "👥"; }
  else if (urlAvatar) { avatar.style.backgroundImage = "url(" + urlAvatar + ")"; avatar.textContent = ""; }
  else { avatar.style.background = colorForUser(nombreUsuario); avatar.textContent = avatarLetter(nombreUsuario); }
  const infoEl = document.createElement("div");
  infoEl.className = "chat-info";
  const name = document.createElement("div");
  name.className = "chat-name";
  name.textContent = nombreUsuario;
  if (estaFijado(roomId)) { const pin = document.createElement("span"); pin.className = "pin-icon"; pin.textContent = " 📌"; name.appendChild(pin); }
  if (chatEstaSilenciado(roomId)) { const mI = document.createElement("span"); mI.className = "mute-icon"; mI.textContent = " 🔕"; name.appendChild(mI); }
  const preview = document.createElement("div");
  preview.className = "chat-preview";
  if (info && info.ultimo) preview.textContent = previewUltimoMsg(info.ultimo);
  else preview.textContent = esGrupo ? "Grupo de chat" : (estaOnline ? "En línea" : "Desconectado");
  infoEl.appendChild(name); infoEl.appendChild(preview);
  const right = document.createElement("div");
  right.className = "chat-item-right";
  if (info && info.ultimo) {
    const timeEl = document.createElement("div");
    timeEl.className = "chat-item-time" + (info.noLeidos > 0 ? " nuevo" : "");
    timeEl.textContent = formatHoraCorta(info.ultimo.created_at);
    right.appendChild(timeEl);
  }
  if (info && info.noLeidos > 0) {
    const badge = document.createElement("div");
    badge.className = "chat-unread-badge";
    badge.textContent = info.noLeidos > 99 ? "99+" : info.noLeidos;
    right.appendChild(badge);
  } else if (!esGrupo) {
    const dot = document.createElement("div");
    dot.className = "chat-status-dot" + (estaOnline ? "" : " offline");
    right.appendChild(dot);
  }
  li.appendChild(avatar); li.appendChild(infoEl); li.appendChild(right);
  li.addEventListener("click", () => {
    if (!esGrupo && !privateRooms.includes(roomId)) { privateRooms.push(roomId); savePrivateRooms(); }
    switchRoom(roomId);
  });
  let longPressTimer = null;
  li.addEventListener("touchstart", (e) => {
    longPressTimer = setTimeout(() => { if (navigator.vibrate) navigator.vibrate(50); abrirOpcionesChat(roomId, nombreUsuario); }, 550);
  }, { passive: true });
  li.addEventListener("touchend", () => clearTimeout(longPressTimer));
  li.addEventListener("touchmove", () => clearTimeout(longPressTimer));
  li.addEventListener("contextmenu", (e) => { e.preventDefault(); abrirOpcionesChat(roomId, nombreUsuario); });
  chatListEl.appendChild(li);
}

function abrirOpcionesChat(roomId, nombreVisible) {
  chatOpcionesActual = { room: roomId, nombre: nombreVisible };
  if (chatOptionsTitle) chatOptionsTitle.textContent = nombreVisible;
  if (optPinChatBtn) optPinChatBtn.textContent = estaFijado(roomId) ? "📌 Desfijar" : "📌 Fijar arriba";
  if (optArchiveChatBtn) optArchiveChatBtn.textContent = estaArchivado(roomId) ? "📥 Desarchivar" : "📥 Archivar";
  if (optMuteChatBtn) optMuteChatBtn.textContent = chatEstaSilenciado(roomId) ? "🔔 Activar sonido" : "🔕 Silenciar";
  if (chatOptionsModal) chatOptionsModal.classList.add("show");
}
if (optCancelBtn) optCancelBtn.addEventListener("click", () => { chatOptionsModal.classList.remove("show"); chatOpcionesActual = null; });
if (chatOptionsModal) chatOptionsModal.addEventListener("click", (e) => { if (e.target === chatOptionsModal) { chatOptionsModal.classList.remove("show"); chatOpcionesActual = null; } });
if (optPinChatBtn) optPinChatBtn.addEventListener("click", () => { if (!chatOpcionesActual) return; toggleFijar(chatOpcionesActual.room); chatOptionsModal.classList.remove("show"); chatOpcionesActual = null; });
if (optArchiveChatBtn) optArchiveChatBtn.addEventListener("click", () => { if (!chatOpcionesActual) return; toggleArchivar(chatOpcionesActual.room); chatOptionsModal.classList.remove("show"); chatOpcionesActual = null; });
if (optMuteChatBtn) optMuteChatBtn.addEventListener("click", () => {
  if (!chatOpcionesActual) return;
  chatParaSilenciar = chatOpcionesActual.room;
  chatOptionsModal.classList.remove("show"); chatOpcionesActual = null;
  if (muteTimerModal) muteTimerModal.classList.add("show");
});
if (optWallpaperBtn) optWallpaperBtn.addEventListener("click", () => {
  if (!chatOpcionesActual) return;
  chatParaWallpaper = chatOpcionesActual.room;
  chatOptionsModal.classList.remove("show"); chatOpcionesActual = null;
  abrirModalWallpaper();
});
if (optExportBtn) optExportBtn.addEventListener("click", () => {
  if (!chatOpcionesActual) return;
  const room = chatOpcionesActual.room;
  const nombre = chatOpcionesActual.nombre;
  chatOptionsModal.classList.remove("show"); chatOpcionesActual = null;
  exportarChat(room, nombre);
});

async function exportarChat(room, nombreVisible) {
  try {
    const { data, error } = await supabaseClient.from("zumm_messages")
      .select("id, text, username, created_at, file_url, file_name, file_type")
      .eq("room", room).order("created_at", { ascending: true }).limit(2000);
    if (error) { alert("Error: " + error.message); return; }
    if (!data || data.length === 0) { alert("Este chat no tiene mensajes."); return; }
    let contenido = "═══════════════════════════════════════\n";
    contenido += "   ZummChat - Exportación de chat\n";
    contenido += "═══════════════════════════════════════\n\n";
    contenido += "Chat: " + nombreVisible + "\n";
    contenido += "Exportado por: " + username + "\n";
    contenido += "Fecha: " + new Date().toLocaleString() + "\n";
    contenido += "Total de mensajes: " + data.length + "\n\n";
    contenido += "───────────────────────────────────────\n\n";
    data.forEach(m => {
      const fecha = new Date(m.created_at);
      const fechaStr = String(fecha.getDate()).padStart(2, "0") + "/" + String(fecha.getMonth() + 1).padStart(2, "0") + "/" + fecha.getFullYear() + " " + String(fecha.getHours()).padStart(2, "0") + ":" + String(fecha.getMinutes()).padStart(2, "0");
      let texto = m.text || "";
      texto = texto.replace(/^\[REPLY:[^\]]+\]\s*/i, "[↩️ Responde a un mensaje]\n");
      texto = texto.replace(/^\[FORWARD\]\s*/i, "[🔁 Reenviado] ");
      const stickerMatch = texto.match(/^\[STICKER\](.+)\[\/STICKER\]$/);
      if (stickerMatch) texto = "[🧩 Sticker: " + stickerMatch[1] + "]";
      const tipo = m.file_type || "";
      if (tipo.startsWith("audio/")) texto += " [🎤 Nota de voz]";
      else if (tipo.startsWith("location/")) texto += " [📍 Ubicación: " + (m.file_url || "") + "]";
      else if (tipo.startsWith("poll/")) texto += " [📊 Encuesta]";
      else if (m.file_url) texto += " [📎 Archivo: " + (m.file_name || "") + "]";
      contenido += "[" + fechaStr + "] " + (m.username || "Anónimo") + ":\n" + texto + "\n\n";
    });
    contenido += "───────────────────────────────────────\n";
    contenido += "Fin del chat. Exportado desde ZummChat © 2026\n";
    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const nombreArchivo = "ZummChat_" + limpiarNombre(nombreVisible) + "_" + Date.now() + ".txt";
    if (navigator.share && navigator.canShare) {
      try {
        const file = new File([blob], nombreArchivo, { type: "text/plain" });
        if (navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: "Chat exportado" }); return; }
      } catch (e) {}
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = nombreArchivo;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    alert("✅ Chat exportado como " + nombreArchivo);
  } catch (e) { alert("Error al exportar: " + e.message); }
}

if (muteCancelBtn) muteCancelBtn.addEventListener("click", () => { muteTimerModal.classList.remove("show"); chatParaSilenciar = null; });
if (muteTimerModal) muteTimerModal.addEventListener("click", (e) => { if (e.target === muteTimerModal) { muteTimerModal.classList.remove("show"); chatParaSilenciar = null; } });
if (mute8hBtn) mute8hBtn.addEventListener("click", () => { if (chatParaSilenciar) { silenciarPor(chatParaSilenciar, 8 * 60 * 60 * 1000); alert("🔕 Silenciado 8 horas"); } muteTimerModal.classList.remove("show"); chatParaSilenciar = null; });
if (mute1wBtn) mute1wBtn.addEventListener("click", () => { if (chatParaSilenciar) { silenciarPor(chatParaSilenciar, 7 * 24 * 60 * 60 * 1000); alert("🔕 Silenciado 1 semana"); } muteTimerModal.classList.remove("show"); chatParaSilenciar = null; });
if (muteForeverBtn) muteForeverBtn.addEventListener("click", () => { if (chatParaSilenciar) { silenciarPor(chatParaSilenciar, 0); alert("🔕 Silenciado para siempre"); } muteTimerModal.classList.remove("show"); chatParaSilenciar = null; });
if (muteOffBtn) muteOffBtn.addEventListener("click", () => { if (chatParaSilenciar) { quitarSilencio(chatParaSilenciar); alert("🔔 Sonido activado"); } muteTimerModal.classList.remove("show"); chatParaSilenciar = null; });

function abrirModalWallpaper() {
  if (!wallpaperModal || !wallpaperColors) return;
  wallpaperColors.innerHTML = "";
  const actual = getWallpaper(chatParaWallpaper);
  WALLPAPER_COLORS.forEach(col => {
    const btn = document.createElement("button");
    btn.type = "button"; btn.style.background = col.value; btn.title = col.nombre;
    if (actual && actual.tipo === "color" && actual.value === col.value) btn.classList.add("selected");
    btn.addEventListener("click", () => { setWallpaperColor(chatParaWallpaper, col.value); aplicarWallpaper(currentRoom); abrirModalWallpaper(); });
    wallpaperColors.appendChild(btn);
  });
  wallpaperModal.classList.add("show");
}
if (wallpaperCancelBtn) wallpaperCancelBtn.addEventListener("click", () => { wallpaperModal.classList.remove("show"); chatParaWallpaper = null; });
if (wallpaperModal) wallpaperModal.addEventListener("click", (e) => { if (e.target === wallpaperModal) { wallpaperModal.classList.remove("show"); chatParaWallpaper = null; } });
if (wallpaperImageBtn) wallpaperImageBtn.addEventListener("click", () => { if (wallpaperInput) wallpaperInput.click(); });
if (wallpaperRemoveBtn) wallpaperRemoveBtn.addEventListener("click", () => {
  if (chatParaWallpaper) { quitarWallpaper(chatParaWallpaper); aplicarWallpaper(currentRoom); alert("🗑️ Fondo eliminado"); }
  wallpaperModal.classList.remove("show"); chatParaWallpaper = null;
});
if (wallpaperInput) wallpaperInput.addEventListener("change", async () => {
  const file = wallpaperInput.files[0]; if (!file) return;
  if (file.size > 3 * 1024 * 1024) { alert("Máx 3 MB."); wallpaperInput.value = ""; return; }
  try {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const nombreLimpio = limpiarNombre(username);
    const nombreArchivo = "wallpaper_" + nombreLimpio + "_" + Date.now() + "." + ext;
    const { error: upErr } = await supabaseClient.storage.from("archivos").upload(nombreArchivo, file, { contentType: file.type || "image/jpeg" });
    if (upErr) { alert("Error: " + upErr.message); wallpaperInput.value = ""; return; }
    const { data: urlData } = supabaseClient.storage.from("archivos").getPublicUrl(nombreArchivo);
    setWallpaperImagen(chatParaWallpaper, urlData.publicUrl);
    aplicarWallpaper(currentRoom);
    alert("✅ Fondo aplicado");
    wallpaperModal.classList.remove("show");
    chatParaWallpaper = null;
  } catch (e) { alert("Error: " + e.message); }
  finally { wallpaperInput.value = ""; }
});

if (dndBtn) dndBtn.addEventListener("click", () => {
  cerrarPaneles();
  if (dndEstaActivo()) { if (confirm("¿Desactivar modo no molestar?")) { desactivarDnd(); alert("🔔 Notificaciones activadas"); } }
  else if (dndModal) dndModal.classList.add("show");
});
if (dndCancelBtn) dndCancelBtn.addEventListener("click", () => dndModal.classList.remove("show"));
if (dndModal) dndModal.addEventListener("click", (e) => { if (e.target === dndModal) dndModal.classList.remove("show"); });
if (dnd30mBtn) dnd30mBtn.addEventListener("click", () => { activarDnd(30 * 60 * 1000); alert("🌙 No molestar 30 min"); dndModal.classList.remove("show"); });
if (dnd2hBtn) dnd2hBtn.addEventListener("click", () => { activarDnd(2 * 60 * 60 * 1000); alert("🌙 No molestar 2h"); dndModal.classList.remove("show"); });
if (dnd8hBtn) dnd8hBtn.addEventListener("click", () => { activarDnd(8 * 60 * 60 * 1000); alert("🌙 No molestar 8h"); dndModal.classList.remove("show"); });
if (dndOffBtn) dndOffBtn.addEventListener("click", () => { desactivarDnd(); alert("🔔 Notificaciones activadas"); dndModal.classList.remove("show"); });

function entrarModoSeleccion() {
  modoSeleccion = true;
  mensajesSeleccionados.clear();
  if (selectionBar) selectionBar.classList.add("show");
  if (replyBar) replyBar.classList.remove("show");
  actualizarContadorSeleccion();
  document.querySelectorAll(".msg").forEach(el => el.classList.add("modo-seleccion"));
  document.querySelectorAll(".msg").forEach(el => { el.addEventListener("click", clickEnMensajeSeleccion, true); });
}
function salirModoSeleccion() {
  modoSeleccion = false;
  mensajesSeleccionados.clear();
  if (selectionBar) selectionBar.classList.remove("show");
  document.querySelectorAll(".msg").forEach(el => {
    el.classList.remove("modo-seleccion", "seleccionado");
    el.removeEventListener("click", clickEnMensajeSeleccion, true);
  });
}
function clickEnMensajeSeleccion(e) {
  if (!modoSeleccion) return;
  e.preventDefault(); e.stopPropagation();
  const div = e.currentTarget;
  const id = div.dataset.msgId;
  if (!id) return;
  if (mensajesSeleccionados.has(id)) { mensajesSeleccionados.delete(id); div.classList.remove("seleccionado"); }
  else { mensajesSeleccionados.add(id); div.classList.add("seleccionado"); }
  actualizarContadorSeleccion();
  if (mensajesSeleccionados.size === 0) salirModoSeleccion();
}
function actualizarContadorSeleccion() {
  if (selectionCount) { const n = mensajesSeleccionados.size; selectionCount.textContent = n + " seleccionado" + (n === 1 ? "" : "s"); }
}
if (selectionCancelBtn) selectionCancelBtn.addEventListener("click", salirModoSeleccion);
if (selectionDeleteBtn) selectionDeleteBtn.addEventListener("click", async () => {
  const n = mensajesSeleccionados.size;
  if (n === 0) return;
  if (!confirm("¿Borrar " + n + " mensaje" + (n === 1 ? "" : "s") + "?")) return;
  try {
    for (const id of mensajesSeleccionados) { await supabaseClient.from("zumm_messages").delete().eq("id", id); }
    salirModoSeleccion(); rendered.clear();
    if (messagesEl) messagesEl.innerHTML = "";
    loadHistory();
  } catch (e) { alert("Error: " + e.message); }
});
if (selectionForwardBtn) selectionForwardBtn.addEventListener("click", async () => {
  if (mensajesSeleccionados.size === 0) return;
  const primerId = Array.from(mensajesSeleccionados)[0];
  const { data: msg } = await supabaseClient.from("zumm_messages").select("*").eq("id", primerId).single();
  if (!msg) { alert("Error al cargar mensaje"); return; }
  mensajesSeleccionados.clear();
  salirModoSeleccion();
  abrirMenuReenvio(msg);
});

async function abrirFiltroUsuarios() {
  if (!filterModal || !filterList) return;
  filterList.innerHTML = "";
  if (!currentRoom) return;
  try {
    const { data } = await supabaseClient.from("zumm_messages").select("username").eq("room", currentRoom).limit(2000);
    if (!data) { alert("Error al cargar usuarios"); return; }
    const conteo = {};
    data.forEach(m => { const u = m.username || "Anónimo"; conteo[u] = (conteo[u] || 0) + 1; });
    const usuarios = Object.entries(conteo).sort((a, b) => b[1] - a[1]);
    if (usuarios.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Sin mensajes aún";
      li.style.cursor = "default";
      filterList.appendChild(li);
      filterModal.classList.add("show");
      return;
    }
    usuarios.forEach(([u, n]) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = u + (u.toLowerCase() === username.toLowerCase() ? " (Tú)" : "");
      li.appendChild(span);
      const cnt = document.createElement("span");
      cnt.className = "filter-user-count";
      cnt.textContent = n;
      li.appendChild(cnt);
      li.addEventListener("click", () => { aplicarFiltroUsuario(u); filterModal.classList.remove("show"); });
      filterList.appendChild(li);
    });
    filterModal.classList.add("show");
  } catch (e) { alert("Error: " + e.message); }
}
function aplicarFiltroUsuario(nombre) {
  filtroUsuarioActual = nombre;
  if (filterBarText) filterBarText.textContent = "🔎 Mostrando solo mensajes de: " + nombre;
  if (filterBar) filterBar.classList.add("show");
  if (filterBtn) filterBtn.classList.add("filtro-activo");
  document.querySelectorAll(".msg").forEach(el => {
    const nameEl = el.querySelector(".msg-name");
    if (nameEl) {
      const nombreMsg = (nameEl.textContent || "").replace(" 📌", "").trim();
      el.style.display = (nombreMsg === nombre) ? "flex" : "none";
    }
  });
}
function limpiarFiltroUsuario(ocultar = true) {
  filtroUsuarioActual = null;
  if (filterBar) filterBar.classList.remove("show");
  if (filterBtn) filterBtn.classList.remove("filtro-activo");
  document.querySelectorAll(".msg").forEach(el => { el.style.display = "flex"; });
}
if (filterBtn) filterBtn.addEventListener("click", abrirFiltroUsuarios);
if (filterBarClear) filterBarClear.addEventListener("click", () => limpiarFiltroUsuario());
if (filterClearBtn) filterClearBtn.addEventListener("click", () => { limpiarFiltroUsuario(); filterModal.classList.remove("show"); });
if (filterCloseBtn) filterCloseBtn.addEventListener("click", () => filterModal.classList.remove("show"));
if (filterModal) filterModal.addEventListener("click", (e) => { if (e.target === filterModal) filterModal.classList.remove("show"); });

async function abrirMenuReenvio(m) {
  if (!forwardModal || !forwardList) return;
  mensajeParaReenviar = m;
  forwardList.innerHTML = "";
  const gruposBase = ["general", "amigos", "familia", "trabajo"];
  const todosGrupos = [...gruposBase, ...gruposPersonalizados.filter(g => !gruposOcultos.includes(g)).map(g => "grupo:" + g)];
  todosGrupos.forEach(room => {
    const li = document.createElement("li");
    li.textContent = "👥 " + roomLabel(room);
    li.addEventListener("click", () => reenviarA(room));
    forwardList.appendChild(li);
  });
  const usuariosMostrados = new Set();
  const miUserLower = username.toLowerCase();
  const agregarPrivado = (otro) => {
    if (usuariosMostrados.has(otro.toLowerCase())) return;
    usuariosMostrados.add(otro.toLowerCase());
    const partes = [username, otro].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    const room = "priv:" + partes[0] + "|" + partes[1];
    const li = document.createElement("li");
    li.textContent = "🔒 " + otro;
    li.addEventListener("click", () => reenviarA(room));
    forwardList.appendChild(li);
  };
  privateRooms.forEach(room => {
    const partes = room.replace("priv:", "").split("|");
    const otro = partes.find(n => n.toLowerCase() !== miUserLower);
    if (otro) agregarPrivado(otro);
  });
  usersOnline.forEach(u => { if (u.toLowerCase() !== miUserLower) agregarPrivado(u); });
  misContactos.forEach(c => { if (c.toLowerCase() !== miUserLower) agregarPrivado(c); });
  forwardModal.classList.add("show");
}
async function reenviarA(roomDestino) {
  if (!mensajeParaReenviar) return;
  const m = mensajeParaReenviar;
  forwardModal.classList.remove("show");
  mensajeParaReenviar = null;
  let texto = m.text || "";
  const extraido = extraerReply(texto);
  texto = extraido.textoReal || texto;
  texto = "[FORWARD] " + texto;
  const payload = { text: texto, username: username, room: roomDestino };
  if (m.file_url && !(m.file_type && m.file_type.startsWith("poll/"))) {
    payload.file_url = m.file_url;
    payload.file_name = m.file_name || "archivo";
    payload.file_type = m.file_type || "application/octet-stream";
  } else if (m.file_type && m.file_type.startsWith("poll/")) {
    payload.file_url = m.file_url;
    payload.file_name = m.file_name || "Encuesta";
    payload.file_type = m.file_type;
  }
  const { error } = await supabaseClient.from("zumm_messages").insert([payload]);
  if (error) { alert("No se pudo reenviar: " + error.message); return; }
  alert("✅ Reenviado a " + roomLabel(roomDestino));
}
if (forwardCancelBtn) forwardCancelBtn.addEventListener("click", () => { forwardModal.classList.remove("show"); mensajeParaReenviar = null; });
if (forwardModal) forwardModal.addEventListener("click", (e) => { if (e.target === forwardModal) { forwardModal.classList.remove("show"); mensajeParaReenviar = null; } });

function switchRoom(room) {
  currentRoom = room;
  showChatView();
  registrarPresencia();
  setLastRead(room);
  salirModoSeleccion();
  limpiarFiltroUsuario();
  if (chatTitle) chatTitle.textContent = roomLabel(room);
  rendered.clear(); lastDateKey = "";
  if (messagesEl) messagesEl.innerHTML = "";
  ocultarReplyBar();
  aplicarWallpaper(room);
  loadHistory(); cargarMensajeFijado();
  actualizarBotonEliminarGrupo();
  if (filterBtn) filterBtn.style.display = "flex";
  setTimeout(saludarBienvenida, 1500);
}

let privateRooms = JSON.parse(LS.getItem("zummchat_privrooms") || "[]");
function savePrivateRooms() { LS.setItem("zummchat_privrooms", JSON.stringify(privateRooms)); }

function openPrivateWith(otroNombre) {
  const otroLimpio = String(otroNombre || "").trim().substring(0, 20);
  if (!otroLimpio) return;
  if (otroLimpio.toLowerCase() === username.toLowerCase()) return;
  const nombres = [username, otroLimpio].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const room = "priv:" + nombres[0] + "|" + nombres[1];
  if (!privateRooms.includes(room)) { privateRooms.push(room); savePrivateRooms(); }
  switchRoom(room);
  if (usersPanel) usersPanel.classList.remove("show");
}

async function actualizarBotonEliminarGrupo() {
  if (!deleteGroupBtn) return;
  if (!currentRoom || !currentRoom.startsWith("grupo:")) { deleteGroupBtn.style.display = "none"; return; }
  const nombreGrupo = currentRoom.replace("grupo:", "");
  try {
    const { data: grupo } = await supabaseClient.from("zumm_grupos").select("creador").eq("nombre", nombreGrupo).maybeSingle();
    if (grupo && grupo.creador && grupo.creador.toLowerCase() === username.toLowerCase()) deleteGroupBtn.style.display = "flex";
    else deleteGroupBtn.style.display = "none";
  } catch (e) { deleteGroupBtn.style.display = "none"; }
}
if (deleteGroupBtn) deleteGroupBtn.addEventListener("click", async () => {
  if (!currentRoom || !currentRoom.startsWith("grupo:")) return;
  const nombreGrupo = currentRoom.replace("grupo:", "");
  if (!confirm("⚠️ ¿Eliminar el grupo '" + nombreGrupo + "'?\n\nSe borrará para TODOS.")) return;
  try {
    await supabaseClient.from("zumm_grupos").delete().eq("nombre", nombreGrupo);
    await supabaseClient.from("zumm_messages").delete().eq("room", "grupo:" + nombreGrupo);
    gruposPersonalizados = gruposPersonalizados.filter(g => g !== nombreGrupo);
    guardarGrupos();
    alert("✅ Grupo eliminado");
    showChatList();
  } catch (e) { alert("Error: " + e.message); }
});

const STICKERS = ["😂","😍","🥰","😎","🤩","😱","🤔","😴","🤗","😇","🥳","🤯","🤪","😏","😬","🙄","😒","😤","🤬","😭","❤️","🧡","💛","💚","💙","💜","🖤","🤍","💔","💖","🔥","⭐","✨","🎉","🎊","🎁","🌈","⚡","💯","👏","👍","👎","🙏","💪","👋","🤝","✌️","🤞","👊","✊","🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🦁","🍕","🍔","🍟","🌮","🍩","🍰","🍫","🍿","🍎","🍉","⚽","🏀","🎮","🎯","🎸","🎤","🚀","🏆","👑","💎"];
if (stickerBar) STICKERS.forEach(s => {
  const b = document.createElement("button");
  b.type = "button"; b.textContent = s;
  b.addEventListener("click", () => { if (stickerBar) stickerBar.classList.remove("show"); enviarSticker(s); });
  stickerBar.appendChild(b);
});
async function enviarSticker(sticker) {
  if (!currentRoom) return;
  const texto = "[STICKER]" + sticker + "[/STICKER]";
  const { data, error } = await supabaseClient.from("zumm_messages").insert([{ text: texto, username: username, room: currentRoom }]).select().single();
  if (error) { alert("Error: " + error.message); return; }
  renderMessage(data, false);
}
if (stickerBtn) stickerBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (emojiBar) emojiBar.classList.remove("show");
  if (stickerBar) stickerBar.classList.toggle("show");
});

const EMOJIS = ["😀","😂","🤣","😊","😍","😘","😎","🤔","😅","😢","😭","😡","🥺","😴","🤗","😱","🤩","😇","🙃","😜","👍","👎","👏","🙏","💪","✌️","🤝","👋","🖐️","✋","❤️","💔","💚","💙","💜","🧡","💛","🖤","🤍","💯","🔥","⭐","✨","🎉","🎊","🎁","🌈","☀️","🌙","⚡","🐦","🐶","🐱","🌸","🌺","🍀","🍕","🍔","☕","🍺","⚽","🏀","🎮","🎵","🎶","📱","💻","📷","🚀","🏆"];
if (emojiBar) EMOJIS.forEach(e => {
  const b = document.createElement("button");
  b.type = "button"; b.textContent = e;
  b.addEventListener("click", () => { if (inputEl) { inputEl.value += e; inputEl.focus(); } });
  emojiBar.appendChild(b);
});
if (emojiBtn) emojiBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (stickerBar) stickerBar.classList.remove("show");
  if (emojiBar) emojiBar.classList.toggle("show");
});

async function subirYEnviarArchivo(file, tipo) {
  if (!file) return;
  if (file.size > MAX_SIZE_MB * 1024 * 1024) { alert("Máx " + MAX_SIZE_MB + " MB"); return; }
  const ext = file.name.split(".").pop() || "bin";
  const nombreArchivo = Date.now() + "_" + Math.random().toString(36).slice(2, 8) + "." + ext;
  const { error: upErr } = await supabaseClient.storage.from("archivos").upload(nombreArchivo, file, { contentType: file.type || "application/octet-stream" });
  if (upErr) { alert("No se pudo subir: " + upErr.message); return; }
  const { data: urlData } = supabaseClient.storage.from("archivos").getPublicUrl(nombreArchivo);
  const publicUrl = urlData.publicUrl;
  const texto = inputEl ? inputEl.value.trim() : "";
  if (inputEl) inputEl.value = "";
  const textoConReply = construirTextoConReply(texto || "");
  const { data, error } = await supabaseClient.from("zumm_messages").insert([{ text: textoConReply, username: username, room: currentRoom, file_url: publicUrl, file_name: file.name, file_type: tipo || file.type || "application/octet-stream" }]).select().single();
  if (error) { alert("Error: " + error.message); return; }
  ocultarReplyBar();
  renderMessage(data, false);
}
if (menuFileBtn) menuFileBtn.addEventListener("click", () => { cerrarPaneles(); fileInput.click(); });
if (fileInput) fileInput.addEventListener("change", async () => { const file = fileInput.files[0]; if (!file) return; await subirYEnviarArchivo(file); fileInput.value = ""; });
if (menuCameraBtn) menuCameraBtn.addEventListener("click", () => { cerrarPaneles(); cameraInput.click(); });
if (cameraInput) cameraInput.addEventListener("change", async () => { const file = cameraInput.files[0]; if (!file) return; await subirYEnviarArchivo(file, file.type || "image/jpeg"); cameraInput.value = ""; });
if (menuLocationBtn) menuLocationBtn.addEventListener("click", () => {
  cerrarPaneles();
  if (!navigator.geolocation) { alert("No soporta ubicación."); return; }
  if (!confirm("¿Compartir ubicación?")) return;
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude.toFixed(6);
    const lon = pos.coords.longitude.toFixed(6);
    const url = "https://www.google.com/maps?q=" + lat + "," + lon;
    const texto = "📍 Mi ubicación: " + url;
    const { data, error } = await supabaseClient.from("zumm_messages").insert([{ text: texto, username: username, room: currentRoom, file_url: url, file_name: "Ubicación", file_type: "location/maps" }]).select().single();
    if (error) alert("Error: " + error.message); else renderMessage(data, false);
  }, (err) => alert("Error: " + err.message), { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 });
});
if (menuVoiceBtn) menuVoiceBtn.addEventListener("click", () => { cerrarPaneles(); iniciarGrabacion(); });

let mediaRecorder = null, audioChunks = [], grabando = false;
let recTimerInterval = null, recSegundos = 0, audioStreamRec = null;
function iniciarGrabacion() {
  if (grabando) return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { alert("No soporta grabación."); return; }
  if (!window.MediaRecorder) { alert("No soporta MediaRecorder."); return; }
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    audioStreamRec = stream; audioChunks = [];
    let mimeType = "audio/webm";
    if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) mimeType = "audio/webm;codecs=opus";
    else if (MediaRecorder.isTypeSupported("audio/mp4")) mimeType = "audio/mp4";
    else if (MediaRecorder.isTypeSupported("audio/ogg")) mimeType = "audio/ogg";
    try { mediaRecorder = new MediaRecorder(stream, { mimeType: mimeType }); }
    catch (e) { mediaRecorder = new MediaRecorder(stream); }
    mediaRecorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) audioChunks.push(e.data); };
    mediaRecorder.onstop = () => { stream.getTracks().forEach(t => t.stop()); audioStreamRec = null; };
    mediaRecorder.start(); grabando = true; recSegundos = 0;
    if (recordingPanel) recordingPanel.classList.add("show");
    if (recordingTime) recordingTime.textContent = "0:00";
    clearInterval(recTimerInterval);
    recTimerInterval = setInterval(() => {
      recSegundos++;
      if (recordingTime) recordingTime.textContent = formatearSegundos(recSegundos);
      if (recSegundos >= 120) detenerGrabacion(true);
    }, 1000);
  }).catch(e => alert("Error mic: " + e.message));
}
function cancelarGrabacion() {
  if (!grabando) return;
  grabando = false; clearInterval(recTimerInterval); recTimerInterval = null;
  try { if (mediaRecorder && mediaRecorder.state !== "inactive") { mediaRecorder.onstop = () => { if (audioStreamRec) { audioStreamRec.getTracks().forEach(t => t.stop()); audioStreamRec = null; } }; mediaRecorder.stop(); } } catch (e) {}
  audioChunks = [];
  if (recordingPanel) recordingPanel.classList.remove("show");
}
async function detenerGrabacion(enviar) {
  if (!grabando) return;
  grabando = false; clearInterval(recTimerInterval); recTimerInterval = null;
  const duracionFinal = recSegundos;
  const promesa = new Promise(resolve => {
    if (!mediaRecorder || mediaRecorder.state === "inactive") { resolve(); return; }
    mediaRecorder.onstop = () => { if (audioStreamRec) { audioStreamRec.getTracks().forEach(t => t.stop()); audioStreamRec = null; } resolve(); };
    try { mediaRecorder.stop(); } catch (e) { resolve(); }
  });
  await promesa;
  if (recordingPanel) recordingPanel.classList.remove("show");
  if (!enviar) { audioChunks = []; return; }
  if (audioChunks.length === 0) { alert("No se grabó nada."); return; }
  const blob = new Blob(audioChunks, { type: audioChunks[0].type || "audio/webm" });
  audioChunks = [];
  if (blob.size > MAX_SIZE_MB * 1024 * 1024) { alert("Muy larga."); return; }
  try {
    const ext = blob.type.includes("mp4") ? "m4a" : (blob.type.includes("ogg") ? "ogg" : "webm");
    const nombreArchivo = "audio_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8) + "." + ext;
    const { error: upErr } = await supabaseClient.storage.from("archivos").upload(nombreArchivo, blob, { contentType: blob.type });
    if (upErr) { alert("Error: " + upErr.message); return; }
    const { data: urlData } = supabaseClient.storage.from("archivos").getPublicUrl(nombreArchivo);
    const publicUrl = urlData.publicUrl;
    const { data, error } = await supabaseClient.from("zumm_messages").insert([{ text: "", username: username, room: currentRoom, file_url: publicUrl, file_name: "audio-" + formatearSegundos(duracionFinal), file_type: blob.type }]).select().single();
    if (error) { alert("Error: " + error.message); return; }
    renderMessage(data, false);
  } catch (e) { alert("Error: " + e.message); }
}
if (cancelRecBtn) cancelRecBtn.addEventListener("click", cancelarGrabacion);
if (stopRecBtn) stopRecBtn.addEventListener("click", () => detenerGrabacion(true));

function construirTextoConReply(textoReal) {
  if (!replyTo) return textoReal;
  const autor = replyTo.username || "Alguien";
  let preview = replyTo.text || "";
  if (replyTo.file_type && replyTo.file_type.startsWith("audio/")) preview = "🎤 Nota de voz";
  else if (replyTo.file_type && replyTo.file_type.startsWith("location/")) preview = "📍 Ubicación";
  else if (replyTo.file_type && replyTo.file_type.startsWith("poll/")) preview = "📊 Encuesta";
  else if (replyTo.text && replyTo.text.startsWith("[STICKER]")) preview = "🧩 Sticker";
  else if (replyTo.file_url && !preview) preview = "📎 Archivo";
  preview = preview.replace(/^\[REPLY:[^\]]+\]\s*/i, "");
  if (preview.length > 80) preview = preview.substring(0, 80) + "...";
  preview = preview.replace(/\|/g, "¦");
  return "[REPLY:" + autor + "|" + preview + "]\n\n" + textoReal;
}
function ocultarReplyBar() { replyTo = null; if (replyBar) replyBar.classList.remove("show"); }
function mostrarReplyBar(m) {
  replyTo = m;
  if (!replyBar) return;
  const autor = (m.username || "").toLowerCase() === username.toLowerCase() ? "Tú" : (m.username || "Alguien");
  if (replyAuthor) replyAuthor.textContent = autor;
  let preview = m.text || "";
  if (m.file_type && m.file_type.startsWith("audio/")) preview = "🎤 Nota de voz";
  else if (m.file_type && m.file_type.startsWith("location/")) preview = "📍 Ubicación";
  else if (m.file_type && m.file_type.startsWith("poll/")) preview = "📊 Encuesta";
  else if (m.text && m.text.startsWith("[STICKER]")) preview = "🧩 Sticker";
  else if (m.file_url && !preview) preview = "📎 Archivo";
  preview = preview.replace(/^\[REPLY:[^\]]+\]\s*/i, "");
  if (preview.length > 60) preview = preview.substring(0, 60) + "...";
  if (replyPreview) replyPreview.textContent = preview;
  replyBar.classList.add("show");
  if (inputEl) inputEl.focus();
}
if (replyCancelBtn) replyCancelBtn.addEventListener("click", ocultarReplyBar);

function extraerReply(texto) {
  if (!texto) return { reply: null, textoReal: "" };
  const match = texto.match(/^\[REPLY:([^|]+)\|([^\]]*)\]\s*([\s\S]*)$/);
  if (!match) return { reply: null, textoReal: texto };
  return { reply: { autor: match[1], preview: match[2] }, textoReal: match[3] };
}

let lastDateKey = "";
function dateKey(d) { return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
function dateLabel(d) {
  const hoy = new Date(); const ayer = new Date();
  ayer.setDate(hoy.getDate() - 1);
  if (dateKey(d) === dateKey(hoy)) return "HOY";
  if (dateKey(d) === dateKey(ayer)) return "AYER";
  const dd = String(d.getDate()).padStart(2, "0"); const mm = String(d.getMonth() + 1).padStart(2, "0");
  return dd + "/" + mm + "/" + d.getFullYear();
}
function maybeAddDateSeparator(iso) {
  if (!iso || !messagesEl) return;
  const d = new Date(iso); const key = dateKey(d);
  if (key === lastDateKey) return;
  lastDateKey = key;
  const sep = document.createElement("div");
  sep.className = "date-sep"; sep.textContent = dateLabel(d);
  messagesEl.appendChild(sep);
}
function parsePoll(m) {
  if (!m.file_type || !m.file_type.startsWith("poll/")) return null;
  try { return JSON.parse(m.file_url || "{}"); } catch (e) { return null; }
}

const rendered = new Set();
let favoritosIds = new Set();
function scrollToBottom() { if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight; }
function formatTime(iso) { if (!iso) return ""; const d = new Date(iso); return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); }
function avatarUrlDe(nombre) { if (nombre.toLowerCase() === username.toLowerCase()) return myAvatarUrl; return avataresPorUsuario[(nombre || "").toLowerCase()] || ""; }

function renderMessage(m, esNuevo) {
  if (!m || !m.id || rendered.has(m.id)) return;
  if (m.room !== currentRoom) return;
  if (!messagesEl) return;
  if (m.username && bloqueados.has(m.username.toLowerCase())) return;
  rendered.add(m.id);
  const esBot = (m.username === BOT_NAME);

  if (esNuevo) {
    const esMio = (m.username || "").toLowerCase() === username.toLowerCase();
    if (!esMio && !esBot) {
      const tipo = m.file_type || "";
      let textoNotif;
      if (tipo.startsWith("audio/")) textoNotif = "🎤 Nota de voz";
      else if (tipo.startsWith("location/")) textoNotif = "📍 Ubicación";
      else if (tipo.startsWith("poll/")) textoNotif = "📊 Encuesta";
      else if (m.file_url) textoNotif = "📎 Archivo";
      else if (m.text && m.text.startsWith("[STICKER]")) textoNotif = "🧩 Sticker";
      else if (m.text && m.text.startsWith("[FORWARD]")) textoNotif = "🔁 " + m.text.replace("[FORWARD] ", "");
      else textoNotif = m.text || "Nuevo mensaje";
      textoNotif = textoNotif.replace(/^\[REPLY:[^\]]+\]\s*/i, "");
      mostrarNotificacion(m.username || "Alguien", textoNotif, m.room);
    }
  }

  maybeAddDateSeparator(m.created_at);
  const div = document.createElement("div");
  div.className = "msg";
  if (esBot) div.classList.add("bot-msg");
  div.dataset.msgId = m.id;
  if (m.pinned) div.classList.add("pinned");
  if (favoritosIds.has(m.id)) div.classList.add("favorite");
  const reacciones = (m.reactions || "").split(",").filter(x => x.trim());
  if (reacciones.length >= 3) div.classList.add("hot");

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  const url = esBot ? "" : avatarUrlDe(m.username || "");
  if (url) { avatar.style.backgroundImage = "url(" + url + ")"; avatar.textContent = ""; }
  else if (esBot) { avatar.style.background = "var(--accent)"; avatar.textContent = "🤖"; }
  else { avatar.style.background = colorForUser(m.username); avatar.textContent = avatarLetter(m.username); }
  div.appendChild(avatar);

  const content = document.createElement("div");
  content.className = "msg-content";
  const header = document.createElement("div");
  header.className = "msg-header";
  const nameEl = document.createElement("span");
  nameEl.className = "msg-name";
  nameEl.textContent = (esBot ? BOT_NAME : (m.username || "Anónimo")) + (m.pinned ? " 📌" : "");
  nameEl.style.color = colorForUser(m.username);
  if (!esBot) nameEl.addEventListener("click", (e) => { e.stopPropagation(); abrirPerfil(m.username, false); });
  const rightSide = document.createElement("span");
  rightSide.className = "msg-right";
  const timeEl = document.createElement("span");
  timeEl.className = "msg-time"; timeEl.textContent = formatTime(m.created_at);
  rightSide.appendChild(timeEl);
  if (m.edited_at) { const ed = document.createElement("span"); ed.className = "msg-edited"; ed.textContent = "(editado)"; rightSide.appendChild(ed); }
  header.appendChild(nameEl); header.appendChild(rightSide);

  const body = document.createElement("div");
  body.className = "msg-body";
  const extraido = extraerReply(m.text || "");
  let textoParaMostrar = extraido.textoReal;

  if (extraido.reply) {
    const q = document.createElement("div");
    q.className = "reply-quote";
    const qa = document.createElement("div");
    qa.className = "reply-quote-author"; qa.textContent = extraido.reply.autor;
    const qt = document.createElement("div");
    qt.className = "reply-quote-text"; qt.textContent = extraido.reply.preview;
    q.appendChild(qa); q.appendChild(qt);
    body.appendChild(q);
  }

  if (textoParaMostrar && textoParaMostrar.startsWith("[FORWARD] ")) {
    textoParaMostrar = textoParaMostrar.replace("[FORWARD] ", "");
    const fwd = document.createElement("div");
    fwd.className = "msg-forwarded"; fwd.textContent = "🔁 Reenviado";
    body.appendChild(fwd);
  }

  const pollData = parsePoll(m);
  if (pollData) {
    const box = document.createElement("div");
    box.className = "poll-box";
    const q = document.createElement("div");
    q.className = "poll-question"; q.textContent = "📊 " + pollData.question;
    box.appendChild(q);
    const votos = pollData.votes || {};
    const opciones = pollData.options || [];
    let totalVotos = 0;
    opciones.forEach((_, idx) => { totalVotos += (votos[idx] || []).length; });
    opciones.forEach((op, idx) => {
      const votosOpt = votos[idx] || [];
      const porcentaje = totalVotos > 0 ? Math.round((votosOpt.length / totalVotos) * 100) : 0;
      const yoVote = votosOpt.includes(username.toLowerCase());
      const optDiv = document.createElement("div");
      optDiv.className = "poll-option";
      if (yoVote) optDiv.classList.add("mine");
      const bar = document.createElement("div");
      bar.className = "poll-bar"; bar.style.width = porcentaje + "%";
      optDiv.appendChild(bar);
      const txt = document.createElement("span");
      txt.className = "poll-text"; txt.textContent = (yoVote ? "✅ " : "") + op;
      optDiv.appendChild(txt);
      const cnt = document.createElement("span");
      cnt.className = "poll-count"; cnt.textContent = porcentaje + "%";
      optDiv.appendChild(cnt);
      optDiv.addEventListener("click", (e) => { e.stopPropagation(); votarEncuesta(m.id, idx); });
      box.appendChild(optDiv);
    });
    const info = document.createElement("div");
    info.style.cssText = "text-align:center;color:var(--text-dim);font-size:11px;margin-top:6px;";
    info.textContent = totalVotos + " voto" + (totalVotos === 1 ? "" : "s");
    box.appendChild(info);
    body.appendChild(box);
  } else if (textoParaMostrar) {
    const stickerMatch = textoParaMostrar.match(/^\[STICKER\](.+)\[\/STICKER\]$/);
    if (stickerMatch) {
      const stickerEl = document.createElement("div");
      stickerEl.className = "msg-sticker"; stickerEl.textContent = stickerMatch[1];
      body.appendChild(stickerEl);
    } else {
      const txt = document.createElement("div");
      txt.appendChild(linkify(textoParaMostrar));
      body.appendChild(txt);
    }
  }

  if (m.file_url && !pollData) {
    const tipo = m.file_type || "";
    if (tipo.startsWith("audio/")) {
      const voiceDiv = document.createElement("div");
      voiceDiv.className = "voice-note";
      const playBtn = document.createElement("button");
      playBtn.className = "voice-play-btn"; playBtn.textContent = "▶";
      const audio = document.createElement("audio");
      audio.src = m.file_url; audio.preload = "metadata";
      const wave = document.createElement("div");
      wave.className = "voice-wave";
      for (let i = 0; i < 20; i++) {
        const span = document.createElement("span");
        span.style.height = (5 + Math.random() * 25) + "px";
        wave.appendChild(span);
      }
      const duracion = document.createElement("span");
      duracion.className = "voice-duration"; duracion.textContent = "0:00";
      const speedBtn = document.createElement("button");
      speedBtn.className = "voice-speed-btn"; speedBtn.type = "button"; speedBtn.textContent = "1x";
      const velocidades = [1, 1.5, 2];
      let velIdx = 0;
      speedBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        velIdx = (velIdx + 1) % velocidades.length;
        const v = velocidades[velIdx];
        audio.playbackRate = v; speedBtn.textContent = v + "x";
        speedBtn.classList.toggle("rapido", v !== 1);
      });
      audio.addEventListener("loadedmetadata", () => { if (isFinite(audio.duration)) duracion.textContent = formatearSegundos(Math.round(audio.duration)); });
      audio.addEventListener("timeupdate", () => {
        if (isFinite(audio.duration) && audio.duration > 0) {
          const restante = Math.max(0, (audio.duration - audio.currentTime) / audio.playbackRate);
          duracion.textContent = formatearSegundos(Math.round(restante));
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
      audio.addEventListener("ended", () => { playBtn.textContent = "▶"; audio.currentTime = 0; if (isFinite(audio.duration)) duracion.textContent = formatearSegundos(Math.round(audio.duration)); });
      voiceDiv.appendChild(playBtn); voiceDiv.appendChild(wave);
      voiceDiv.appendChild(duracion); voiceDiv.appendChild(speedBtn);
      voiceDiv.appendChild(audio);
      body.appendChild(voiceDiv);
    } else if (tipo.startsWith("location/")) {
      const a = document.createElement("a");
      a.href = m.file_url; a.target = "_blank"; a.rel = "noopener";
      a.className = "location-msg";
      const icon = document.createElement("span");
      icon.className = "loc-icon"; icon.textContent = "📍";
      const txt = document.createElement("span");
      txt.className = "loc-text"; txt.textContent = "Ver ubicación";
      a.appendChild(icon); a.appendChild(txt);
      a.addEventListener("click", (e) => e.stopPropagation());
      body.appendChild(a);
    } else if (tipo.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = m.file_url; img.className = "msg-file-img"; img.loading = "lazy";
      img.addEventListener("click", (e) => { e.stopPropagation(); openImageModal(m.file_url); });
      body.appendChild(img);
    } else {
      const a = document.createElement("a");
      a.href = m.file_url; a.target = "_blank"; a.rel = "noopener";
      a.className = "msg-file-link";
      const icon = document.createElement("span");
      icon.className = "icon"; icon.textContent = tipo.includes("pdf") ? "📄" : "📎";
      const name = document.createElement("span");
      name.className = "name"; name.textContent = m.file_name || "archivo";
      a.appendChild(icon); a.appendChild(name);
      body.appendChild(a);
    }
  }

  content.appendChild(header);
  content.appendChild(body);

  if (reacciones.length > 0 && !pollData) {
    const bar = document.createElement("div");
    bar.className = "reactions-bar";
    const conteo = {};
    reacciones.forEach(r => { const emoji = r.split(":")[0]; conteo[emoji] = (conteo[emoji] || 0) + 1; });
    Object.keys(conteo).forEach(emoji => {
      const b = document.createElement("div");
      b.className = "reaction-bubble"; b.textContent = emoji;
      if (conteo[emoji] > 1) { const c = document.createElement("span"); c.className = "count"; c.textContent = conteo[emoji]; b.appendChild(c); }
      b.addEventListener("click", (e) => { e.stopPropagation(); toggleReaccion(m.id, emoji); });
      bar.appendChild(b);
    });
    content.appendChild(bar);
  }

  div.appendChild(content);

  if (!esBot) {
    let longPressTimer = null;
    div.addEventListener("touchstart", (e) => {
      longPressTimer = setTimeout(() => {
        if (modoSeleccion) return;
        mostrarMenuMensaje(m, e.touches[0].clientX, e.touches[0].clientY);
        if (navigator.vibrate) navigator.vibrate(50);
      }, 500);
    }, { passive: true });
    div.addEventListener("touchend", () => clearTimeout(longPressTimer));
    div.addEventListener("touchmove", () => clearTimeout(longPressTimer));
    div.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (modoSeleccion) return;
      mostrarMenuMensaje(m, e.clientX, e.clientY);
    });
  }

  messagesEl.appendChild(div);
  scrollToBottom();

  if (modoSeleccion && !esBot) {
    div.classList.add("modo-seleccion");
    div.addEventListener("click", clickEnMensajeSeleccion, true);
  }
  if (filtroUsuarioActual) {
    const nombreMsg = (m.username || "").trim();
    div.style.display = (nombreMsg === filtroUsuarioActual) ? "flex" : "none";
  }
}

function removeMessageFromDOM(id) {
  rendered.delete(id);
  const el = messagesEl.querySelector('[data-msg-id="' + id + '"]');
  if (el) el.remove();
}
async function loadHistory() {
  if (!currentRoom) return;
  const { data, error } = await supabaseClient.from("zumm_messages")
    .select("id, text, username, created_at, room, file_url, file_name, file_type, edited_at, reactions, pinned")
    .eq("room", currentRoom).order("created_at", { ascending: true }).limit(200);
  if (error) { console.error("ERROR:", error); return; }
  data.forEach(m => renderMessage(m, false));
}
async function sendMessage() {
  if (!inputEl || !currentRoom) return;
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = ""; enviarTypingStop();
  const textoFinal = construirTextoConReply(text);
  const { data, error } = await supabaseClient.from("zumm_messages")
    .insert([{ text: textoFinal, username: username, room: currentRoom }])
    .select().single();
  if (error) { inputEl.value = text; alert("Error: " + error.message); return; }
  ocultarReplyBar();
  renderMessage(data, false);
}
if (sendBtn) sendBtn.addEventListener("click", sendMessage);
if (inputEl) inputEl.addEventListener("keydown", e => { if (e.key === "Enter") sendMessage(); });

supabaseClient
  .channel("zumm-messages-realtime")
  .on("postgres_changes", { event: "INSERT", schema: "public", table: "zumm_messages" },
      payload => {
        const m = payload.new;
        if (m.room === currentRoom) { renderMessage(m, true); setLastRead(currentRoom); }
        else if (!inChatView) renderChatList();
      })
  .on("postgres_changes", { event: "UPDATE", schema: "public", table: "zumm_messages" },
      payload => {
        const m = payload.new;
        if (!m || !m.id || m.room !== currentRoom) return;
        const el = messagesEl.querySelector('[data-msg-id="' + m.id + '"]');
        if (el) { rendered.delete(m.id); el.remove(); renderMessage(m, false); }
        if (m.pinned) cargarMensajeFijado();
      })
  .on("postgres_changes", { event: "DELETE", schema: "public", table: "zumm_messages" },
      payload => { if (payload.old && payload.old.id) removeMessageFromDOM(payload.old.id); })
  .subscribe();

async function votarEncuesta(msgId, idx) {
  const { data: msg } = await supabaseClient.from("zumm_messages").select("file_url").eq("id", msgId).single();
  if (!msg) return;
  let poll; try { poll = JSON.parse(msg.file_url || "{}"); } catch (e) { return; }
  if (!poll.options) return;
  const miUser = username.toLowerCase();
  const votes = poll.votes || {};
  Object.keys(votes).forEach(k => { votes[k] = (votes[k] || []).filter(u => u !== miUser); });
  if (!votes[idx]) votes[idx] = [];
  votes[idx].push(miUser);
  poll.votes = votes;
  await supabaseClient.from("zumm_messages").update({ file_url: JSON.stringify(poll) }).eq("id", msgId);
}

let typingTimeout = null, ultimoTypingEnviado = 0;
function enviarTyping() {
  if (!currentRoom) return;
  const ahora = Date.now();
  if (ahora - ultimoTypingEnviado < 2000) return;
  ultimoTypingEnviado = ahora;
  supabaseClient.from("zumm_presence").upsert({ username: username, room: currentRoom, last_seen: new Date().toISOString(), avatar_url: myAvatarUrl || null, typing_at: new Date().toISOString() }, { onConflict: "username,room" }).then(() => {}).catch(() => {});
}
function enviarTypingStop() {
  if (!currentRoom) return;
  supabaseClient.from("zumm_presence").upsert({ username: username, room: currentRoom, last_seen: new Date().toISOString(), avatar_url: myAvatarUrl || null, typing_at: null }, { onConflict: "username,room" }).then(() => {}).catch(() => {});
}
if (inputEl) inputEl.addEventListener("input", () => {
  if (!inputEl.value.trim()) { enviarTypingStop(); clearTimeout(typingTimeout); return; }
  enviarTyping(); clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => { enviarTypingStop(); }, 3500);
});
function actualizarIndicadorTyping(usuariosTyping) {
  if (!typingIndicator) return;
  if (usuariosTyping.length === 0) { typingIndicator.classList.remove("show"); return; }
  let texto;
  if (usuariosTyping.length === 1) texto = usuariosTyping[0] + " está escribiendo...";
  else if (usuariosTyping.length === 2) texto = usuariosTyping[0] + " y " + usuariosTyping[1] + " están escribiendo...";
  else texto = usuariosTyping.length + " personas están escribiendo...";
  typingIndicator.textContent = texto;
  typingIndicator.classList.add("show");
}

async function cargarMensajeFijado() {
  if (!pinnedBar || !pinnedText || !currentRoom) return;
  const { data } = await supabaseClient.from("zumm_messages").select("text, username, file_type").eq("room", currentRoom).eq("pinned", true).order("created_at", { ascending: false }).limit(1);
  if (!data || data.length === 0) { pinnedBar.classList.remove("show"); return; }
  const m = data[0];
  let preview = (m.username || "?") + ": ";
  if (m.file_type && m.file_type.startsWith("audio/")) preview += "🎤 Nota de voz";
  else if (m.file_type && m.file_type.startsWith("location/")) preview += "📍 Ubicación";
  else if (m.file_type && m.file_type.startsWith("poll/")) preview += "📊 Encuesta";
  else if (m.text) preview += m.text;
  else preview += "📎 Archivo";
  if (preview.length > 60) preview = preview.substring(0, 60) + "...";
  pinnedText.textContent = "📌 " + preview;
  pinnedBar.classList.add("show");
}
if (unpinBtn) unpinBtn.addEventListener("click", async () => {
  if (!confirm("¿Quitar fijado?")) return;
  await supabaseClient.from("zumm_messages").update({ pinned: false }).eq("room", currentRoom).eq("pinned", true);
  pinnedBar.classList.remove("show");
});

let mensajeEditando = null;
function abrirEditorMensaje(m) {
  if (!editModal || !editInput) return;
  if ((m.username || "").toLowerCase() !== username.toLowerCase()) { alert("Solo los tuyos."); return; }
  if (m.file_type && m.file_type.startsWith("poll/")) { alert("No puedes editar una encuesta."); return; }
  if (m.text && m.text.startsWith("[STICKER]")) { alert("No puedes editar un sticker."); return; }
  const extraido = extraerReply(m.text || "");
  let txt = extraido.textoReal || "";
  txt = txt.replace(/^\[FORWARD\]\s*/i, "");
  mensajeEditando = m; editInput.value = txt;
  editModal.classList.add("show");
  setTimeout(() => editInput.focus(), 100);
}
if (editCancelBtn) editCancelBtn.addEventListener("click", () => { editModal.classList.remove("show"); mensajeEditando = null; });
if (editSaveBtn) editSaveBtn.addEventListener("click", async () => {
  if (!mensajeEditando || !editInput) return;
  const nuevoTexto = editInput.value.trim();
  if (!nuevoTexto) { alert("Vacío."); return; }
  const extraido = extraerReply(mensajeEditando.text || "");
  const textoFinal = extraido.reply ? ("[REPLY:" + extraido.reply.autor + "|" + extraido.reply.preview + "]\n\n" + nuevoTexto) : nuevoTexto;
  const { error } = await supabaseClient.from("zumm_messages").update({ text: textoFinal, edited_at: new Date().toISOString() }).eq("id", mensajeEditando.id);
  if (error) { alert("Error: " + error.message); return; }
  editModal.classList.remove("show"); mensajeEditando = null;
});

let mensajeMenuActual = null;
function mostrarMenuMensaje(m, x, y) {
  if (!msgMenu) return;
  mensajeMenuActual = m;
  const esMio = (m.username || "").toLowerCase() === username.toLowerCase();
  const esPoll = m.file_type && m.file_type.startsWith("poll/");
  const esSticker = m.text && m.text.startsWith("[STICKER]");
  if (menuEditBtn) menuEditBtn.style.display = esMio && m.text && !esPoll && !esSticker ? "block" : "none";
  if (menuDeleteBtn) menuDeleteBtn.style.display = esMio ? "block" : "none";
  if (menuPinBtn) menuPinBtn.textContent = m.pinned ? "📌 Desfijar" : "📌 Fijar";
  if (menuFavBtn) menuFavBtn.textContent = favoritosIds.has(m.id) ? "⭐ Quitar fav" : "⭐ Favorito";
  msgMenu.classList.add("show");
  const ancho = 180, alto = 380;
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
  if (reactionPicker && reactionPicker.classList.contains("show") && !reactionPicker.contains(e.target)) reactionPicker.classList.remove("show");
});
if (menuSelectBtn) menuSelectBtn.addEventListener("click", () => {
  if (!mensajeMenuActual) return;
  const m = mensajeMenuActual; cerrarMenu();
  entrarModoSeleccion();
  const el = messagesEl.querySelector('[data-msg-id="' + m.id + '"]');
  if (el) { el.classList.add("seleccionado"); mensajesSeleccionados.add(m.id); actualizarContadorSeleccion(); }
});
if (menuReplyBtn) menuReplyBtn.addEventListener("click", () => { if (!mensajeMenuActual) return; const m = mensajeMenuActual; cerrarMenu(); mostrarReplyBar(m); });
if (menuForwardBtn) menuForwardBtn.addEventListener("click", () => { if (!mensajeMenuActual) return; const m = mensajeMenuActual; cerrarMenu(); abrirMenuReenvio(m); });
if (menuPinBtn) menuPinBtn.addEventListener("click", async () => {
  if (!mensajeMenuActual) return;
  const m = mensajeMenuActual; const nuevo = !m.pinned;
  cerrarMenu();
  if (nuevo) await supabaseClient.from("zumm_messages").update({ pinned: false }).eq("room", currentRoom).eq("pinned", true);
  await supabaseClient.from("zumm_messages").update({ pinned: nuevo }).eq("id", m.id);
  cargarMensajeFijado();
});
if (menuCopyBtn) menuCopyBtn.addEventListener("click", async () => {
  if (!mensajeMenuActual) return;
  const extraido = extraerReply(mensajeMenuActual.text || "");
  try { await navigator.clipboard.writeText(extraido.textoReal || ""); alert("📋 Copiado"); } catch (e) { alert("No se pudo copiar."); }
  cerrarMenu();
});
if (menuEditBtn) menuEditBtn.addEventListener("click", () => { if (!mensajeMenuActual) return; const m = mensajeMenuActual; cerrarMenu(); setTimeout(() => abrirEditorMensaje(m), 150); });
if (menuDeleteBtn) menuDeleteBtn.addEventListener("click", async () => {
  if (!mensajeMenuActual) return;
  const m = mensajeMenuActual; cerrarMenu();
  if (!confirm("¿Borrar?")) return;
  const { error } = await supabaseClient.from("zumm_messages").delete().eq("id", m.id);
  if (error) { alert("Error: " + error.message); return; }
  removeMessageFromDOM(m.id);
});

async function cargarFavoritos() {
  try {
    const { data } = await supabaseClient.from("zumm_favoritos").select("mensaje_id").eq("username", username);
    favoritosIds = new Set((data || []).map(f => f.mensaje_id));
  } catch (e) {}
}
if (menuFavBtn) menuFavBtn.addEventListener("click", async () => {
  if (!mensajeMenuActual) return;
  const m = mensajeMenuActual; cerrarMenu();
  if (favoritosIds.has(m.id)) {
    await supabaseClient.from("zumm_favoritos").delete().eq("username", username).eq("mensaje_id", m.id);
    favoritosIds.delete(m.id); alert("⭐ Quitado");
  } else {
    let preview = m.text || "📎";
    if (m.file_type && m.file_type.startsWith("audio/")) preview = "🎤 Nota de voz";
    if (m.file_type && m.file_type.startsWith("location/")) preview = "📍 Ubicación";
    if (m.file_type && m.file_type.startsWith("poll/")) preview = "📊 Encuesta";
    if (m.text && m.text.startsWith("[STICKER]")) preview = "🧩 Sticker";
    preview = preview.replace(/^\[REPLY:[^\]]+\]\s*/i, "");
    if (preview.length > 60) preview = preview.substring(0, 60) + "...";
    await supabaseClient.from("zumm_favoritos").insert([{ username: username, mensaje_id: m.id, room: currentRoom, preview: (m.username || "?") + ": " + preview }]);
    favoritosIds.add(m.id); alert("⭐ Guardado");
  }
  const el = messagesEl.querySelector('[data-msg-id="' + m.id + '"]');
  if (el) el.classList.toggle("favorite", favoritosIds.has(m.id));
});
if (favBtn) favBtn.addEventListener("click", async () => {
  cerrarPaneles();
  if (!favModal) return;
  favModal.classList.add("show");
  favList.innerHTML = ""; favEmpty.style.display = "none";
  const { data } = await supabaseClient.from("zumm_favoritos").select("*").eq("username", username).order("created_at", { ascending: false });
  if (!data || data.length === 0) { favEmpty.style.display = "block"; return; }
  data.forEach(f => {
    const li = document.createElement("li");
    const meta = document.createElement("div");
    meta.className = "list-meta";
    meta.textContent = new Date(f.created_at).toLocaleDateString() + " · " + (f.room || "general");
    li.appendChild(meta);
    const texto = document.createElement("div");
    texto.textContent = f.preview || "(sin texto)";
    li.appendChild(texto);
    const del = document.createElement("button");
    del.className = "list-del"; del.textContent = "✕";
    del.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (!confirm("¿Quitar?")) return;
      await supabaseClient.from("zumm_favoritos").delete().eq("username", username).eq("mensaje_id", f.mensaje_id);
      favoritosIds.delete(f.mensaje_id); li.remove();
      if (favList.children.length === 0) favEmpty.style.display = "block";
    });
    li.appendChild(del);
    li.addEventListener("click", (e) => {
      if (e.target === del) return;
      favModal.classList.remove("show");
      if (f.room === currentRoom) {
        const el = messagesEl.querySelector('[data-msg-id="' + f.mensaje_id + '"]');
        if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.classList.add("highlight"); setTimeout(() => el.classList.remove("highlight"), 2000); }
      } else if (f.room) {
        if (confirm("¿Ir a '" + f.room + "'?")) {
          switchRoom(f.room);
          setTimeout(() => {
            const el = messagesEl.querySelector('[data-msg-id="' + f.mensaje_id + '"]');
            if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.classList.add("highlight"); setTimeout(() => el.classList.remove("highlight"), 2000); }
          }, 600);
        }
      }
    });
    favList.appendChild(li);
  });
});
if (favCloseBtn) favCloseBtn.addEventListener("click", () => favModal.classList.remove("show"));

if (highlightBtn) highlightBtn.addEventListener("click", async () => {
  cerrarPaneles();
  if (!highlightModal) return;
  highlightModal.classList.add("show");
  highlightList.innerHTML = ""; highlightEmpty.style.display = "none";
  const { data } = await supabaseClient.from("zumm_messages").select("*").eq("room", currentRoom).not("reactions", "is", null).order("created_at", { ascending: false }).limit(100);
  const conReacciones = (data || []).map(m => ({ ...m, numReacc: (m.reactions || "").split(",").filter(x => x.trim()).length })).filter(m => m.numReacc >= 2).sort((a, b) => b.numReacc - a.numReacc).slice(0, 20);
  if (conReacciones.length === 0) { highlightEmpty.textContent = "Aún no hay destacados."; highlightEmpty.style.display = "block"; return; }
  conReacciones.forEach(m => {
    const li = document.createElement("li");
    const meta = document.createElement("div");
    meta.className = "list-meta";
    meta.textContent = (m.username || "?") + " · " + formatTime(m.created_at) + " · " + m.numReacc + " 🔥";
    li.appendChild(meta);
    const texto = document.createElement("div");
    let preview = m.text || "📎";
    if (m.file_type && m.file_type.startsWith("audio/")) preview = "🎤 Nota de voz";
    if (m.file_type && m.file_type.startsWith("poll/")) preview = "📊 Encuesta";
    preview = preview.replace(/^\[REPLY:[^\]]+\]\s*/i, "");
    if (preview.length > 100) preview = preview.substring(0, 100) + "...";
    texto.textContent = preview;
    li.appendChild(texto);
    li.addEventListener("click", () => {
      highlightModal.classList.remove("show");
      const el = messagesEl.querySelector('[data-msg-id="' + m.id + '"]');
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.classList.add("highlight"); setTimeout(() => el.classList.remove("highlight"), 2000); }
    });
    highlightList.appendChild(li);
  });
});
if (highlightCloseBtn) highlightCloseBtn.addEventListener("click", () => highlightModal.classList.remove("show"));

function formatearFechaRecordatorio(iso) {
  const d = new Date(iso);
  return String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0") + "/" + d.getFullYear() + " " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
}
async function cargarRecordatorios() {
  if (!remindersList) return;
  remindersList.innerHTML = ""; remindersEmpty.style.display = "none";
  const { data } = await supabaseClient.from("zumm_recordatorios").select("*").eq("owner", username).order("fecha", { ascending: true });
  if (!data || data.length === 0) { remindersEmpty.style.display = "block"; return; }
  const ahora = Date.now();
  data.forEach(r => {
    const li = document.createElement("li");
    const fecha = new Date(r.fecha);
    const vencido = fecha.getTime() < ahora;
    const meta = document.createElement("div");
    meta.className = "list-meta";
    meta.textContent = (vencido ? "⏰ " : "📅 ") + formatearFechaRecordatorio(r.fecha) + (r.enviado ? " (enviado)" : "");
    li.appendChild(meta);
    const texto = document.createElement("div");
    texto.textContent = r.texto;
    li.appendChild(texto);
    const del = document.createElement("button");
    del.className = "list-del"; del.textContent = "✕";
    del.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (!confirm("¿Eliminar?")) return;
      await supabaseClient.from("zumm_recordatorios").delete().eq("id", r.id);
      li.remove();
      if (remindersList.children.length === 0) remindersEmpty.style.display = "block";
    });
    li.appendChild(del);
    remindersList.appendChild(li);
  });
}
if (remindersBtn) remindersBtn.addEventListener("click", () => { cerrarPaneles(); if (!remindersModal) return; remindersModal.classList.add("show"); cargarRecordatorios(); });
if (remindersCloseBtn) remindersCloseBtn.addEventListener("click", () => remindersModal.classList.remove("show"));
if (newReminderBtn) newReminderBtn.addEventListener("click", () => { reminderText.value = ""; reminderDate.value = ""; newReminderModal.classList.add("show"); });
if (reminderCancelBtn) reminderCancelBtn.addEventListener("click", () => newReminderModal.classList.remove("show"));
if (reminderSaveBtn) reminderSaveBtn.addEventListener("click", async () => {
  const texto = reminderText.value.trim(); const fecha = reminderDate.value;
  if (!texto) { alert("Escribe el texto."); return; }
  if (!fecha) { alert("Elige fecha."); return; }
  const fechaISO = new Date(fecha).toISOString();
  if (new Date(fechaISO).getTime() < Date.now()) { alert("Fecha futura."); return; }
  const { error } = await supabaseClient.from("zumm_recordatorios").insert([{ owner: username, room: currentRoom || "general", texto: texto, fecha: fechaISO }]);
  if (error) { alert("Error: " + error.message); return; }
  newReminderModal.classList.remove("show");
  cargarRecordatorios();
});
setInterval(async () => {
  try {
    const ahora = new Date().toISOString();
    const { data } = await supabaseClient.from("zumm_recordatorios").select("*").eq("owner", username).eq("enviado", false).lte("fecha", ahora);
    if (!data || data.length === 0) return;
    for (const r of data) {
      await supabaseClient.from("zumm_messages").insert([{ text: "⏰ Recordatorio: " + r.texto, username: username, room: r.room }]);
      await supabaseClient.from("zumm_recordatorios").update({ enviado: true }).eq("id", r.id);
    }
  } catch (e) {}
}, 30000);

if (pollBtn) pollBtn.addEventListener("click", () => { cerrarPaneles(); pollQuestion.value = ""; pollOpt1.value = ""; pollOpt2.value = ""; pollOpt3.value = ""; pollModal.classList.add("show"); });
if (pollCancelBtn) pollCancelBtn.addEventListener("click", () => pollModal.classList.remove("show"));
if (pollSaveBtn) pollSaveBtn.addEventListener("click", async () => {
  const q = pollQuestion.value.trim(); const o1 = pollOpt1.value.trim();
  const o2 = pollOpt2.value.trim(); const o3 = pollOpt3.value.trim();
  if (!q || !o1 || !o2) { alert("Pregunta y 2 opciones mínimo."); return; }
  const opciones = [o1, o2]; if (o3) opciones.push(o3);
  const pollData = { question: q, options: opciones, votes: {} };
  const { data, error } = await supabaseClient.from("zumm_messages").insert([{ text: "", username: username, room: currentRoom, file_url: JSON.stringify(pollData), file_name: "Encuesta", file_type: "poll/1" }]).select().single();
  if (error) { alert("Error: " + error.message); return; }
  pollModal.classList.remove("show"); renderMessage(data, false);
});

async function bloquearUsuario(nombre) {
  if (!nombre) return;
  if (nombre.toLowerCase() === username.toLowerCase()) { alert("No puedes bloquearte."); return; }
  await supabaseClient.from("zumm_bloqueados").insert([{ owner: username, bloqueado: nombre }]);
  bloqueados.add(nombre.toLowerCase());
  rendered.clear(); if (messagesEl) messagesEl.innerHTML = "";
  if (currentRoom) loadHistory(); alert("🚫 " + nombre + " bloqueado.");
}
async function desbloquearUsuario(nombre) {
  await supabaseClient.from("zumm_bloqueados").delete().eq("owner", username).eq("bloqueado", nombre);
  bloqueados.delete(nombre.toLowerCase());
  rendered.clear(); if (messagesEl) messagesEl.innerHTML = "";
  if (currentRoom) loadHistory(); alert("✅ " + nombre + " desbloqueado.");
}
if (profileBlockBtn) profileBlockBtn.addEventListener("click", async () => { if (!perfilActual) return; if (!confirm("¿Bloquear a " + perfilActual + "?")) return; await bloquearUsuario(perfilActual); profileModal.classList.remove("show"); });
if (profileUnblockBtn) profileUnblockBtn.addEventListener("click", async () => { if (!perfilActual) return; if (!confirm("¿Desbloquear?")) return; await desbloquearUsuario(perfilActual); profileModal.classList.remove("show"); });
if (blockedBtn) blockedBtn.addEventListener("click", async () => {
  cerrarPaneles();
  if (!blockedModal) return;
  blockedModal.classList.add("show");
  blockedList.innerHTML = ""; blockedEmpty.style.display = "none";
  const { data } = await supabaseClient.from("zumm_bloqueados").select("bloqueado").eq("owner", username);
  if (!data || data.length === 0) { blockedEmpty.style.display = "block"; return; }
  data.forEach(b => {
    const li = document.createElement("li");
    const texto = document.createElement("div"); texto.textContent = b.bloqueado; li.appendChild(texto);
    const del = document.createElement("button"); del.className = "list-del"; del.textContent = "✕";
    del.addEventListener("click", async (e) => {
      e.stopPropagation();
      await desbloquearUsuario(b.bloqueado);
      li.remove();
      if (blockedList.children.length === 0) blockedEmpty.style.display = "block";
    });
    li.appendChild(del); blockedList.appendChild(li);
  });
});
if (blockedCloseBtn) blockedCloseBtn.addEventListener("click", () => blockedModal.classList.remove("show"));

async function mostrarContactos() {
  if (!contactsList) return;
  contactsList.innerHTML = ""; contactsEmpty.style.display = "none";
  await cargarContactos();
  if (misContactos.length === 0) { contactsEmpty.style.display = "block"; return; }
  misContactos.forEach(c => {
    const li = document.createElement("li");
    const meta = document.createElement("div");
    meta.className = "list-meta";
    const estaOnline = usersOnline.some(u => u.toLowerCase() === c.toLowerCase());
    meta.innerHTML = '<span class="' + (estaOnline ? "contact-online" : "contact-offline") + '">● ' + (estaOnline ? "En línea" : "Desconectado") + '</span>';
    li.appendChild(meta);
    const nombreDiv = document.createElement("div");
    nombreDiv.style.fontWeight = "bold"; nombreDiv.style.fontSize = "15px";
    nombreDiv.textContent = c;
    li.appendChild(nombreDiv);
    const actions = document.createElement("div");
    actions.className = "contact-actions";
    const btnChat = document.createElement("button");
    btnChat.textContent = "💬 Chat";
    btnChat.addEventListener("click", (e) => { e.stopPropagation(); openPrivateWith(c); contactsModal.classList.remove("show"); });
    actions.appendChild(btnChat);
    if (estaOnline) {
      const btnLlamar = document.createElement("button");
      btnLlamar.textContent = "📞 Llamar";
      btnLlamar.addEventListener("click", (e) => { e.stopPropagation(); contactsModal.classList.remove("show"); startCall(c, false); });
      actions.appendChild(btnLlamar);
    }
    const btnDel = document.createElement("button");
    btnDel.textContent = "🗑️";
    btnDel.style.flex = "0 0 auto"; btnDel.style.padding = "6px 10px";
    btnDel.style.color = "#ff5252"; btnDel.style.borderColor = "#ff5252";
    btnDel.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (!confirm("¿Quitar?")) return;
      await eliminarContacto(c);
      li.remove();
      if (contactsList.children.length === 0) contactsEmpty.style.display = "block";
    });
    actions.appendChild(btnDel);
    li.appendChild(actions);
    contactsList.appendChild(li);
  });
}
if (contactsBtn) contactsBtn.addEventListener("click", () => { cerrarPaneles(); if (!contactsModal) return; contactsModal.classList.add("show"); mostrarContactos(); });
if (contactsCloseBtn) contactsCloseBtn.addEventListener("click", () => contactsModal.classList.remove("show"));
if (newContactBtn) newContactBtn.addEventListener("click", async () => { const nombre = prompt("Nombre del contacto:"); if (!nombre || !nombre.trim()) return; await añadirContacto(nombre); mostrarContactos(); });
if (profileAddContactBtn) profileAddContactBtn.addEventListener("click", async () => { if (!perfilActual) return; if (estaEnContactos(perfilActual)) { alert("Ya está."); return; } await añadirContacto(perfilActual); abrirPerfil(perfilActual, false); });

async function toggleReaccion(msgId, emoji) {
  const { data: msg } = await supabaseClient.from("zumm_messages").select("reactions").eq("id", msgId).single();
  if (!msg) return;
  const actuales = (msg.reactions || "").split(",").filter(x => x.trim());
  const miTag = emoji + ":" + username;
  let nuevas;
  if (actuales.includes(miTag)) nuevas = actuales.filter(x => x !== miTag);
  else { nuevas = actuales.filter(x => !x.endsWith(":" + username)); nuevas.push(miTag); }
  await supabaseClient.from("zumm_messages").update({ reactions: nuevas.join(",") }).eq("id", msgId);
}

if (searchBtn) searchBtn.addEventListener("click", () => { cerrarPaneles(); if (!searchBar) return; searchBar.classList.add("show"); if (searchInput) setTimeout(() => searchInput.focus(), 100); });
if (searchClose) searchClose.addEventListener("click", () => { if (searchBar) searchBar.classList.remove("show"); limpiarBusqueda(); });
function limpiarBusqueda() {
  if (searchInput) searchInput.value = "";
  document.querySelectorAll(".msg.highlight").forEach(el => el.classList.remove("highlight"));
  document.querySelectorAll(".msg").forEach(el => { if (!filtroUsuarioActual) el.style.display = "flex"; });
}
if (searchInput) searchInput.addEventListener("input", () => {
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

function actualizarBotonAbajo() {
  if (!messagesEl || !scrollDownBtn) return;
  const distanciaAbajo = messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight;
  scrollDownBtn.classList.toggle("show", distanciaAbajo > 150);
}
if (messagesEl) messagesEl.addEventListener("scroll", actualizarBotonAbajo);
if (scrollDownBtn) scrollDownBtn.addEventListener("click", () => { if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight; scrollDownBtn.classList.remove("show"); });

function openImageModal(url) {
  let modal = document.getElementById("imgModal");
  if (!modal) {
    modal = document.createElement("div"); modal.id = "imgModal";
    const img = document.createElement("img");
    const close = document.createElement("button");
    close.className = "close-modal"; close.textContent = "✕";
    close.addEventListener("click", () => modal.classList.remove("show"));
    modal.appendChild(img); modal.appendChild(close);
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("show"); });
    document.body.appendChild(modal);
  }
  modal.querySelector("img").src = url; modal.classList.add("show");
}

function renderSoundsList() {
  if (!soundsList) return;
  soundsList.innerHTML = "";
  SONIDOS_DISPONIBLES.forEach(sonido => {
    const li = document.createElement("li");
    if (sonido.id === sonidoActual) li.classList.add("seleccionado");
    const name = document.createElement("span");
    name.className = "snd-name"; name.textContent = sonido.nombre;
    li.appendChild(name);
    const play = document.createElement("button");
    play.className = "snd-play"; play.type = "button"; play.textContent = "▶"; play.title = "Escuchar";
    play.addEventListener("click", (e) => { e.stopPropagation(); reproducirSonidoPreview(sonido.id); });
    li.appendChild(play);
    if (sonido.id === sonidoActual) { const check = document.createElement("span"); check.className = "snd-check"; check.textContent = "✓"; li.appendChild(check); }
    li.addEventListener("click", () => { sonidoActual = sonido.id; LS.setItem("zummchat_tono", sonidoActual); reproducirSonidoPreview(sonido.id); renderSoundsList(); });
    soundsList.appendChild(li);
  });
}
if (soundsBtn) soundsBtn.addEventListener("click", () => { cerrarPaneles(); if (soundsModal) { renderSoundsList(); soundsModal.classList.add("show"); } });
if (soundsCloseBtn) soundsCloseBtn.addEventListener("click", () => { if (soundsModal) soundsModal.classList.remove("show"); });
if (soundsModal) soundsModal.addEventListener("click", (e) => { if (e.target === soundsModal) soundsModal.classList.remove("show"); });

if (profileAvatarChangeBtn) {
  profileAvatarChangeBtn.addEventListener("click", () => { if (!avatarInput) return; try { avatarInput.click(); } catch (e) { alert("Tu navegador no permite abrir el selector de fotos."); } });
}

let usersOnline = [];
let usuariosConocidos = new Set();
let primeraCargaPresencia = true;
let presenceInterval = null, presenceRefreshInterval = null;
let avataresPorUsuario = {};

async function registrarPresencia() {
  const sala = currentRoom || "general";
  await supabaseClient.from("zumm_presence").upsert({ username: username, room: sala, last_seen: new Date().toISOString(), avatar_url: myAvatarUrl || null }, { onConflict: "username,room" }).catch(() => {});
}

async function leerPresencia() {
  try {
    const hace30s = new Date(Date.now() - 30000).toISOString();
    const { data, error } = await supabaseClient.from("zumm_presence").select("username, room, last_seen, avatar_url, typing_at").gte("last_seen", hace30s);
    if (error) return;
    const usuariosUnicos = {};
    (data || []).forEach(u => { if (!usuariosUnicos[u.username] || new Date(u.last_seen) > new Date(usuariosUnicos[u.username].last_seen)) usuariosUnicos[u.username] = u; });
    const nuevaLista = Object.values(usuariosUnicos).map(u => u.username).filter(u => u.toLowerCase() !== username.toLowerCase());
    if (!primeraCargaPresencia && document.hidden && sonidoActivo) {
      nuevaLista.forEach(u => { const yaEstaba = usuariosConocidos.has(u.toLowerCase()); if (!yaEstaba && !bloqueados.has(u.toLowerCase())) mostrarNotificacionConexion(u); });
    }
    usuariosConocidos = new Set(nuevaLista.map(u => u.toLowerCase()));
    const listaCambio = nuevaLista.length !== usersOnline.length || nuevaLista.some((u, i) => u !== usersOnline[i]);
    primeraCargaPresencia = false;
    usersOnline = nuevaLista;
    avataresPorUsuario = {};
    Object.values(usuariosUnicos).forEach(u => { if (u.avatar_url) avataresPorUsuario[u.username.toLowerCase()] = u.avatar_url; });
    const ahora = Date.now();
    const escribiendo = (data || []).filter(u => u.room === currentRoom && u.username.toLowerCase() !== username.toLowerCase()).filter(u => u.typing_at && (ahora - new Date(u.typing_at).getTime() < 5000)).map(u => u.username);
    actualizarIndicadorTyping(escribiendo);
    renderUserList();
    if (!inChatView && (listaCambio || !chatListEl.children.length)) renderChatList();
  } catch (e) {}
}

function iniciarPresencia() {
  registrarPresencia(); leerPresencia();
  clearInterval(presenceInterval); presenceInterval = setInterval(registrarPresencia, 8000);
  clearInterval(presenceRefreshInterval); presenceRefreshInterval = setInterval(leerPresencia, 8000);
}
supabaseClient.channel("zumm-presence-realtime").on("postgres_changes", { event: "*", schema: "public", table: "zumm_presence" }, () => { leerPresencia(); }).subscribe();

document.addEventListener("visibilitychange", () => { if (!document.hidden) { registrarPresencia(); leerPresencia(); } });
window.addEventListener("focus", () => { registrarPresencia(); leerPresencia(); });
document.body.addEventListener("touchstart", () => { registrarPresencia(); }, { once: true, passive: true });
document.body.addEventListener("click", () => { registrarPresencia(); }, { once: true });
setInterval(() => { if (!document.hidden && document.hasFocus()) registrarPresencia(); }, 15000);

function updateUsersBtn() { if (usersBtn) { const hay = usersOnline.length > 0; usersBtn.classList.toggle("has-users", hay); } }
function renderUserList() {
  if (!userList) return;
  userList.innerHTML = "";
  if (usersOnline.length === 0) { if (noUsers) { noUsers.style.display = "block"; noUsers.textContent = "Nadie más conectado"; } updateUsersBtn(); return; }
  if (noUsers) noUsers.style.display = "none";
  usersOnline.forEach(name => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = name;
    span.addEventListener("click", (e) => { e.stopPropagation(); abrirPerfil(name, false); });
    li.appendChild(span);
    const actions = document.createElement("div");
    actions.className = "user-actions";
    const mkBtn = (texto, titulo, fn) => { const b = document.createElement("button"); b.type = "button"; b.title = titulo; b.textContent = texto; b.addEventListener("click", (e) => { e.stopPropagation(); fn(); }); return b; };
    actions.appendChild(mkBtn("💬", "Chat privado", () => openPrivateWith(name)));
    actions.appendChild(mkBtn("📞", "Llamar", () => startCall(name, false)));
    actions.appendChild(mkBtn("📹", "Videollamada", () => startCall(name, true)));
    li.appendChild(actions);
    userList.appendChild(li);
  });
  updateUsersBtn();
}
if (usersBtn) usersBtn.addEventListener("click", () => { cerrarPaneles(); if (usersPanel) usersPanel.classList.add("show"); registrarPresencia(); leerPresencia(); });
if (usersPanelClose) usersPanelClose.addEventListener("click", () => { if (usersPanel) usersPanel.classList.remove("show"); });

let perfilActual = null;
function mostrarAvatarPropio() { if (!userMeAvatar) return; if (myAvatarUrl) { userMeAvatar.textContent = ""; userMeAvatar.style.backgroundImage = "url(" + myAvatarUrl + ")"; } else { userMeAvatar.textContent = avatarLetter(username); userMeAvatar.style.backgroundImage = ""; } }
mostrarAvatarPropio();

function abrirPerfil(nombre, editable) {
  if (!profileModal) return;
  if (nombre === BOT_NAME) return;
  perfilActual = nombre;
  const esMio = nombre.toLowerCase() === username.toLowerCase();
  const url = esMio ? myAvatarUrl : (avataresPorUsuario[nombre.toLowerCase()] || "");
  if (url) { profileAvatar.style.backgroundImage = "url(" + url + ")"; profileAvatar.textContent = ""; }
  else { profileAvatar.style.backgroundImage = ""; profileAvatar.textContent = avatarLetter(nombre); profileAvatar.style.background = colorForUser(nombre); }
  profileName.textContent = nombre;
  if (esMio) { profileBioDisplay.textContent = myBio || "Sin bio"; profileStatusDisplay.textContent = myStatus || "Sin estado"; }
  else {
    profileBioDisplay.textContent = "Cargando..."; profileStatusDisplay.textContent = "Cargando...";
    supabaseClient.from("zumm_presence").select("bio, status_text").eq("username", nombre).limit(1).then(({ data }) => {
      if (data && data[0]) { profileBioDisplay.textContent = data[0].bio || "Sin bio"; profileStatusDisplay.textContent = data[0].status_text || "Sin estado"; }
    });
  }
  profileBioInput.style.display = "none"; profileStatusInput.style.display = "none";
  profileBioDisplay.style.display = "block"; profileStatusDisplay.style.display = "block";
  profileEditBtn.style.display = esMio ? "block" : "none";
  profileSaveBtn.style.display = "none"; profileCancelBtn.style.display = "none";
  if (profileAvatarChangeBtn) profileAvatarChangeBtn.style.display = esMio ? "block" : "none";
  if (!esMio) {
    const estaBloqueado = bloqueados.has(nombre.toLowerCase());
    profileBlockBtn.style.display = estaBloqueado ? "none" : "block";
    profileUnblockBtn.style.display = estaBloqueado ? "block" : "none";
    profileAddContactBtn.style.display = estaEnContactos(nombre) ? "none" : "block";
  } else { profileBlockBtn.style.display = "none"; profileUnblockBtn.style.display = "none"; profileAddContactBtn.style.display = "none"; }
  profileModal.classList.add("show");
}
if (userMeAvatar) userMeAvatar.addEventListener("click", () => abrirPerfil(username, true));
if (profileCloseBtn) profileCloseBtn.addEventListener("click", () => profileModal.classList.remove("show"));
if (profileEditBtn) profileEditBtn.addEventListener("click", () => {
  if (!perfilActual || perfilActual.toLowerCase() !== username.toLowerCase()) return;
  profileBioInput.value = myBio; profileStatusInput.value = myStatus;
  profileBioDisplay.style.display = "none"; profileStatusDisplay.style.display = "none";
  profileBioInput.style.display = "block"; profileStatusInput.style.display = "block";
  profileEditBtn.style.display = "none"; profileSaveBtn.style.display = "block"; profileCancelBtn.style.display = "block";
});
if (profileCancelBtn) profileCancelBtn.addEventListener("click", () => abrirPerfil(username, true));
if (profileSaveBtn) profileSaveBtn.addEventListener("click", async () => {
  myBio = (profileBioInput.value || "").trim().substring(0, 100);
  myStatus = (profileStatusInput.value || "").trim().substring(0, 60);
  LS.setItem("zummchat_bio", myBio); LS.setItem("zummchat_status", myStatus);
  const sala = currentRoom || "general";
  await supabaseClient.from("zumm_presence").upsert({ username: username, room: sala, last_seen: new Date().toISOString(), avatar_url: myAvatarUrl || null, bio: myBio, status_text: myStatus }, { onConflict: "username,room" });
  abrirPerfil(username, true); alert("✅ Perfil actualizado");
});

if (avatarInput) avatarInput.addEventListener("change", async () => {
  const file = avatarInput.files[0]; if (!file) return;
  if (file.size > 2 * 1024 * 1024) { alert("Máx 2 MB."); avatarInput.value = ""; return; }
  userMeAvatar.textContent = "⏳";
  try {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const nombreLimpio = limpiarNombre(username);
    const nombreArchivo = "avatar_" + nombreLimpio + "_" + Date.now() + "." + ext;
    const { error: upErr } = await supabaseClient.storage.from("archivos").upload(nombreArchivo, file, { contentType: file.type || "image/jpeg", upsert: true });
    if (upErr) { alert("Error: " + upErr.message); mostrarAvatarPropio(); return; }
    const { data: urlData } = supabaseClient.storage.from("archivos").getPublicUrl(nombreArchivo);
    myAvatarUrl = urlData.publicUrl; LS.setItem("zummchat_avatar", myAvatarUrl);
    mostrarAvatarPropio();
    const sala = currentRoom || "general";
    await supabaseClient.from("zumm_presence").upsert({ username: username, room: sala, last_seen: new Date().toISOString(), avatar_url: myAvatarUrl, bio: myBio, status_text: myStatus }, { onConflict: "username,room" });
    alert("✅ Foto actualizada");
    if (profileModal && profileModal.classList.contains("show") && perfilActual && perfilActual.toLowerCase() === username.toLowerCase()) abrirPerfil(username, true);
  } catch (e) { alert("Error: " + e.message); mostrarAvatarPropio(); }
  finally { avatarInput.value = ""; }
});

function actualizarNombreEnUI() { if (userMeName) userMeName.textContent = "Tú: " + username; }
actualizarNombreEnUI();
if (changeNameBtn) changeNameBtn.addEventListener("click", async () => {
  const nuevo = prompt("Nuevo nombre:", username);
  if (!nuevo || !nuevo.trim()) return;
  const limpio = nuevo.trim().substring(0, 20);
  if (limpio.toLowerCase() === username.toLowerCase()) return;
  const viejo = username; username = limpio;
  LS.setItem("zummchat_user", username); actualizarNombreEnUI();
  await supabaseClient.from("zumm_presence").delete().eq("username", viejo);
  const sala = currentRoom || "general";
  await supabaseClient.from("zumm_presence").upsert({ username: username, room: sala, last_seen: new Date().toISOString(), avatar_url: myAvatarUrl, bio: myBio, status_text: myStatus }, { onConflict: "username,room" });
  alert("✅ Nombre: " + username);
});

if (statsBtn) statsBtn.addEventListener("click", async () => {
  cerrarPaneles(); if (!statsModal) return;
  statsModal.classList.add("show");
  statTotalMsgs.textContent = "..."; statFiles.textContent = "..."; statVoice.textContent = "..."; statDays.textContent = "..."; statFirst.textContent = "...";
  const { data } = await supabaseClient.from("zumm_messages").select("created_at, file_type").eq("username", username);
  if (!data || data.length === 0) { statTotalMsgs.textContent = "0"; statFiles.textContent = "0"; statVoice.textContent = "0"; statDays.textContent = "0"; statFirst.textContent = "—"; return; }
  const total = data.length;
  const conArchivo = data.filter(m => m.file_type && !m.file_type.startsWith("audio/") && !m.file_type.startsWith("location/") && !m.file_type.startsWith("poll/")).length;
  const conVoz = data.filter(m => m.file_type && m.file_type.startsWith("audio/")).length;
  const fechas = new Set(data.map(m => m.created_at.substring(0, 10)));
  const primera = new Date(data[data.length - 1].created_at);
  const primeraStr = primera.getDate().toString().padStart(2, "0") + "/" + (primera.getMonth() + 1).toString().padStart(2, "0") + "/" + primera.getFullYear();
  statTotalMsgs.textContent = total; statFiles.textContent = conArchivo; statVoice.textContent = conVoz; statDays.textContent = fechas.size; statFirst.textContent = primeraStr;
});
if (statsCloseBtn) statsCloseBtn.addEventListener("click", () => statsModal.classList.remove("show"));

if (groupStatsBtn) groupStatsBtn.addEventListener("click", async () => {
  cerrarPaneles(); if (!groupStatsModal) return;
  groupStatsModal.classList.add("show");
  gStatTotal.textContent = "..."; gStatUsers.textContent = "..."; gStatTop.textContent = "..."; gStatFiles.textContent = "..."; gStatVoice.textContent = "..."; gStatFirst.textContent = "...";
  gStatRanking.innerHTML = "<p style='text-align:center;color:var(--text-dim);font-size:13px;'>Cargando...</p>";
  if (!currentRoom) { alert("Selecciona un chat primero."); return; }
  const { data } = await supabaseClient.from("zumm_messages").select("username, created_at, file_type").eq("room", currentRoom);
  if (!data || data.length === 0) { gStatTotal.textContent = "0"; gStatUsers.textContent = "0"; gStatTop.textContent = "—"; gStatFiles.textContent = "0"; gStatVoice.textContent = "0"; gStatFirst.textContent = "—"; gStatRanking.innerHTML = "<p style='text-align:center;color:var(--text-muted);font-size:13px;'>Sin mensajes</p>"; return; }
  const total = data.length;
  const usuarios = {};
  const sinBot = data.filter(m => m.username !== BOT_NAME);
  sinBot.forEach(m => { const u = m.username || "Anónimo"; usuarios[u] = (usuarios[u] || 0) + 1; });
  const lista = Object.entries(usuarios).sort((a, b) => b[1] - a[1]);
  const numUsuarios = lista.length;
  const top = lista[0] ? lista[0][0] + " (" + lista[0][1] + ")" : "—";
  const conArchivo = sinBot.filter(m => m.file_type && !m.file_type.startsWith("audio/") && !m.file_type.startsWith("location/") && !m.file_type.startsWith("poll/")).length;
  const conVoz = sinBot.filter(m => m.file_type && m.file_type.startsWith("audio/")).length;
  const primera = new Date(data[0].created_at);
  const primeraStr = primera.getDate().toString().padStart(2, "0") + "/" + (primera.getMonth() + 1).toString().padStart(2, "0") + "/" + primera.getFullYear();
  gStatTotal.textContent = total; gStatUsers.textContent = numUsuarios; gStatTop.textContent = top;
  gStatFiles.textContent = conArchivo; gStatVoice.textContent = conVoz; gStatFirst.textContent = primeraStr;
  gStatRanking.innerHTML = "<div style='color:var(--accent);font-weight:bold;margin:14px 0 8px 0;font-size:14px;text-align:center;'>🏆 Ranking</div>";
  const medallas = ["🥇", "🥈", "🥉"];
  lista.forEach((entry, idx) => {
    const row = document.createElement("div");
    row.className = "rank-row";
    const pos = document.createElement("span"); pos.className = "rank-pos"; pos.textContent = medallas[idx] || ("#" + (idx + 1));
    const nombre = document.createElement("span"); nombre.className = "rank-name"; nombre.textContent = entry[0];
    const count = document.createElement("span"); count.className = "rank-count"; count.textContent = entry[1] + " 💬";
    row.appendChild(pos); row.appendChild(nombre); row.appendChild(count);
    gStatRanking.appendChild(row);
  });
});
if (groupStatsCloseBtn) groupStatsCloseBtn.addEventListener("click", () => groupStatsModal.classList.remove("show"));

let pc = null, localStream = null, activeCall = null, incomingCall = null;
let iceQueue = [], inviteTimer = null, ringTimeout = null, muted = false;
let signalsLastId = 0, signalsCheckInterval = null;
let currentFacingMode = "user", listaCamaras = [];

async function cargarListaCamaras() { try { const devices = await navigator.mediaDevices.enumerateDevices(); listaCamaras = devices.filter(d => d.kind === "videoinput"); } catch (e) {} }
async function enviarSenal(toUser, signalType, payload) { await supabaseClient.from("zumm_signals").insert([{ from_user: username, to_user: toUser, from_client: myClientId, signal_type: signalType, payload: JSON.stringify(payload || {}) }]); }
async function leerSenales() {
  const { data } = await supabaseClient.from("zumm_signals").select("*").eq("to_user", username).gt("id", signalsLastId).order("id", { ascending: true }).limit(50);
  for (const s of (data || [])) {
    if (s.from_client === myClientId) continue;
    if (s.id > signalsLastId) signalsLastId = s.id;
    const edad = Date.now() - new Date(s.created_at).getTime();
    if (edad > 60000) continue;
    procesarSenal(s);
  }
}
function procesarSenal(s) {
  let payload = {};
  try { payload = JSON.parse(s.payload || "{}"); } catch (e) {}
  const fromName = s.from_user; const callId = payload.callId;
  switch (s.signal_type) {
    case "invite":
      if (payload.targetName && payload.targetName.toLowerCase() !== username.toLowerCase()) return;
      if (activeCall || incomingCall) { enviarSenal(fromName, "reject", { callId, reason: "busy" }); return; }
      incomingCall = { callId, fromName, fromId: s.from_client, video: !!payload.video };
      if (incomingAvatar) { incomingAvatar.textContent = avatarLetter(fromName); incomingAvatar.style.background = colorForUser(fromName); }
      if (incomingName) incomingName.textContent = fromName;
      if (incomingText) incomingText.textContent = payload.video ? "Videollamada entrante..." : "Llamada entrante...";
      if (incomingModal) incomingModal.classList.add("show");
      playRingtone(); clearTimeout(ringTimeout);
      ringTimeout = setTimeout(() => { if (incomingCall && incomingCall.callId === callId) dismissIncoming(false); }, 35000);
      break;
    case "accept":
      if (!activeCall || activeCall.role !== "caller" || activeCall.callId !== callId) return;
      activeCall.peerId = s.from_client; clearTimeout(inviteTimer); inviteTimer = null;
      if (callStatus) callStatus.textContent = "Conectando...";
      crearOferta(); break;
    case "offer":
      if (!activeCall || activeCall.role !== "callee" || activeCall.callId !== callId) return;
      if (!localStream) return;
      recibirOferta(payload.sdp); break;
    case "answer":
      if (!activeCall || activeCall.role !== "caller" || activeCall.callId !== callId || !pc) return;
      recibirRespuesta(payload.sdp); break;
    case "ice":
      if (!payload.candidate) return;
      if (pc && pc.remoteDescription) pc.addIceCandidate(new RTCIceCandidate(payload.candidate)).catch(() => {});
      else iceQueue.push(payload.candidate);
      break;
    case "hangup":
      if (incomingCall && incomingCall.callId === callId) dismissIncoming(false);
      if (activeCall && activeCall.callId === callId) { endCall(false); alert(fromName + " colgó."); }
      break;
    case "reject":
      if (!activeCall || activeCall.callId !== callId) return;
      endCall(false);
      alert((payload.reason === "busy") ? fromName + " está ocupado." : fromName + " rechazó.");
      break;
  }
}
function supportsCalls() { if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) return true; alert("Tu navegador no soporta llamadas."); return false; }
async function startCall(targetName, withVideo) {
  if (activeCall || incomingCall) { alert("Ya tienes una llamada activa."); return; }
  if (!supportsCalls()) return;
  const match = usersOnline.find(u => u.toLowerCase() === targetName.toLowerCase());
  if (!match) { alert(targetName + " no está en línea."); return; }
  targetName = match;
  let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: withVideo ? { width: 640, height: 480, facingMode: "user" } : false }); }
  catch (e) { alert("No se pudo acceder al micrófono/cámara:\n" + e.message); return; }
  localStream = stream; currentFacingMode = "user"; await cargarListaCamaras();
  const callId = myClientId + "-" + Date.now();
  activeCall = { callId, peerName: targetName, peerId: null, role: "caller", video: !!withVideo };
  showCallOverlay("Llamando a " + targetName + "...");
  await enviarSenal(targetName, "invite", { targetName, callId, video: !!withVideo });
  clearTimeout(inviteTimer);
  inviteTimer = setTimeout(() => { if (activeCall && activeCall.role === "caller" && !pc) { enviarSenal(targetName, "cancel", { callId }); endCall(false); alert(targetName + " no respondió."); } }, 35000);
}
function dismissIncoming(notify) {
  if (!incomingCall) return;
  if (notify) enviarSenal(incomingCall.fromName, "reject", { callId: incomingCall.callId });
  incomingCall = null; stopRingtone(); clearTimeout(ringTimeout);
  if (incomingModal) incomingModal.classList.remove("show");
}
if (rejectBtn) rejectBtn.addEventListener("click", () => dismissIncoming(true));
if (incomingAcceptBtn) incomingAcceptBtn.addEventListener("click", async () => {
  if (!incomingCall) return;
  const call = incomingCall; incomingCall = null;
  stopRingtone(); clearTimeout(ringTimeout);
  if (incomingModal) incomingModal.classList.remove("show");
  if (!supportsCalls()) { enviarSenal(call.fromName, "reject", { callId: call.callId }); return; }
  try { localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: call.video ? { width: 640, height: 480, facingMode: "user" } : false }); }
  catch (e) { alert("Error mic/cámara:\n" + e.message); enviarSenal(call.fromName, "reject", { callId: call.callId }); return; }
  currentFacingMode = "user"; await cargarListaCamaras();
  activeCall = { callId: call.callId, peerName: call.fromName, peerId: call.fromId, role: "callee", video: call.video };
  showCallOverlay("Conectando con " + call.fromName + "...");
  attachLocalPreview();
  await enviarSenal(call.fromName, "accept", { callId: call.callId });
});
function createPeer() {
  pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
  pc.onicecandidate = (e) => { if (e.candidate && activeCall) enviarSenal(activeCall.peerName, "ice", { callId: activeCall.callId, candidate: e.candidate }); };
  pc.ontrack = (e) => { if (remoteVideo) { remoteVideo.srcObject = e.streams[0]; remoteVideo.play().catch(() => {}); } };
  pc.onconnectionstatechange = () => {
    if (!pc || !activeCall) return;
    if (pc.connectionState === "connected") { if (callStatus) callStatus.textContent = "En llamada con " + activeCall.peerName; }
    else if (pc.connectionState === "failed") { alert("Se perdió la conexión."); endCall(true); }
  };
}
async function crearOferta() {
  try { createPeer(); attachLocalPreview(); localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
    const offer = await pc.createOffer(); await pc.setLocalDescription(offer);
    await enviarSenal(activeCall.peerName, "offer", { callId: activeCall.callId, sdp: pc.localDescription });
  } catch (e) { alert("Error: " + e.message); endCall(true); }
}
async function recibirOferta(sdp) {
  try {
    if (!pc) createPeer();
    attachLocalPreview();
    localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    const answer = await pc.createAnswer(); await pc.setLocalDescription(answer);
    await enviarSenal(activeCall.peerName, "answer", { callId: activeCall.callId, sdp: pc.localDescription });
    flushIce();
  } catch (e) { alert("Error: " + e.message); endCall(true); }
}
async function recibirRespuesta(sdp) { try { await pc.setRemoteDescription(new RTCSessionDescription(sdp)); flushIce(); } catch (e) { endCall(true); } }
function flushIce() { while (iceQueue.length && pc && pc.remoteDescription) { const c = iceQueue.shift(); pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {}); } }
function attachLocalPreview() { if (localVideo && localStream) { localVideo.srcObject = localStream; localVideo.play().catch(() => {}); } }
function showCallOverlay(texto) {
  if (callOverlay) callOverlay.classList.add("show");
  if (callStatus) callStatus.textContent = texto;
  if (acceptCallBtn) acceptCallBtn.style.display = "none";
  const videos = document.querySelector(".videos");
  const soloAudio = !(activeCall && activeCall.video);
  if (videos) videos.classList.toggle("audio-only", soloAudio);
  const audioAvatar = document.getElementById("audioAvatar");
  if (audioAvatar) { if (soloAudio && activeCall) { audioAvatar.textContent = avatarLetter(activeCall.peerName); audioAvatar.style.background = colorForUser(activeCall.peerName); } else audioAvatar.textContent = ""; }
  if (switchCamBtn) { if (activeCall && activeCall.video) { switchCamBtn.style.display = "inline-block"; switchCamBtn.textContent = "🔄 Frontal"; } else switchCamBtn.style.display = "none"; }
  muted = false;
  if (muteBtn) { muteBtn.textContent = "🎤 Mic"; muteBtn.classList.remove("muted"); }
}
function endCall(notify) {
  if (notify && activeCall) enviarSenal(activeCall.peerName, "hangup", { callId: activeCall.callId });
  clearTimeout(inviteTimer); inviteTimer = null; clearTimeout(ringTimeout);
  if (pc) { try { pc.close(); } catch (e) {} pc = null; }
  if (localStream) { localStream.getTracks().forEach(t => t.stop()); localStream = null; }
  iceQueue = []; activeCall = null; muted = false; currentFacingMode = "user";
  if (muteBtn) { muteBtn.textContent = "🎤 Mic"; muteBtn.classList.remove("muted"); }
  if (switchCamBtn) switchCamBtn.style.display = "none";
  if (localVideo) localVideo.srcObject = null;
  if (remoteVideo) remoteVideo.srcObject = null;
  if (callOverlay) callOverlay.classList.remove("show");
}
if (muteBtn) muteBtn.addEventListener("click", () => { if (!localStream) return; muted = !muted; localStream.getAudioTracks().forEach(t => t.enabled = !muted); muteBtn.textContent = muted ? "🔇 Mic" : "🎤 Mic"; muteBtn.classList.toggle("muted", muted); });
async function cambiarCamara() {
  if (!localStream || !activeCall || !activeCall.video) return;
  try {
    localStream.getVideoTracks().forEach(t => { try { t.stop(); } catch (e) {} try { localStream.removeTrack(t); } catch (e) {} });
    await new Promise(r => setTimeout(r, 300));
    await cargarListaCamaras();
    currentFacingMode = currentFacingMode === "user" ? "environment" : "user";
    let nuevoStream = null;
    if (listaCamaras.length >= 2) { const idxDeseado = currentFacingMode === "user" ? 0 : (listaCamaras.length - 1); try { nuevoStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId: { exact: listaCamaras[idxDeseado].deviceId }, width: { ideal: 640 }, height: { ideal: 480 } } }); } catch (e1) {} }
    if (!nuevoStream) { try { nuevoStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { exact: currentFacingMode }, width: { ideal: 640 }, height: { ideal: 480 } } }); } catch (e2) {} }
    if (!nuevoStream) return;
    const nuevaPistaVideo = nuevoStream.getVideoTracks()[0];
    if (pc) { const senderVideo = pc.getSenders().find(s => s.track && s.track.kind === "video"); if (senderVideo) await senderVideo.replaceTrack(nuevaPistaVideo); }
    localStream.addTrack(nuevaPistaVideo);
    if (localVideo) { localVideo.srcObject = null; localVideo.srcObject = localStream; await localVideo.play().catch(() => {}); }
    if (switchCamBtn) switchCamBtn.textContent = currentFacingMode === "user" ? "🔄 Frontal" : "🔄 Trasera";
  } catch (e) {}
}
if (switchCamBtn) switchCamBtn.addEventListener("click", cambiarCamara);
if (hangupBtn) hangupBtn.addEventListener("click", () => endCall(true));

if (callBtn) callBtn.addEventListener("click", () => {
  if (inChatView && currentRoom && currentRoom.startsWith("priv:")) {
    const partes = currentRoom.replace("priv:", "").split("|");
    const otro = partes.find(n => n.toLowerCase() !== username.toLowerCase());
    if (otro) { startCall(otro, false); return; }
  }
  if (usersOnline.length === 0) { alert("No hay usuarios en línea."); return; }
  const target = usersOnline.length === 1 ? usersOnline[0] : prompt("¿A quién llamar?\nEn línea: " + usersOnline.join(", "));
  if (!target || !target.trim()) return;
  startCall(target.trim(), false);
});
if (videoBtn) videoBtn.addEventListener("click", () => {
  if (inChatView && currentRoom && currentRoom.startsWith("priv:")) {
    const partes = currentRoom.replace("priv:", "").split("|");
    const otro = partes.find(n => n.toLowerCase() !== username.toLowerCase());
    if (otro) { startCall(otro, true); return; }
  }
  if (usersOnline.length === 0) { alert("No hay usuarios en línea."); return; }
  const target = usersOnline.length === 1 ? usersOnline[0] : prompt("¿A quién videollamar?\nEn línea: " + usersOnline.join(", "));
  if (!target || !target.trim()) return;
  startCall(target.trim(), true);
});

clearInterval(signalsCheckInterval);
signalsCheckInterval = setInterval(leerSenales, 1500);

actualizarIndicadorDnd();
actualizarBotonDnd();
showChatList();
iniciarPresencia();
leerSenales();
cargarListaCamaras();
actualizarBotonAbajo();
cargarBloqueados();
cargarContactos();

// © 2026 - José Yudier Arencibia Ajo - Todos los derechos reservados.
