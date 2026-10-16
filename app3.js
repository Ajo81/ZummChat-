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
const menuContactBtn  = document.getElementById("menuContactBtn");
const fileInput       = document.getElementById("fileInput");
const cameraInput     = document.getElementById("cameraInput");
const usersBtn        = document.getElementById("usersBtn");
const callBtn         = document.getElementById("callBtn");
const videoBtn        = document.getElementById("videoBtn");
const deleteGroupBtn  = document.getElementById("deleteGroupBtn");
const dndIndicator    = document.getElementById("dndIndicator");
const filterBtn       = document.getElementById("filterBtn");
const globalSearchBtn = document.getElementById("globalSearchBtn");
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
const quickRepliesBar = document.getElementById("quickRepliesBar");
const quickRepliesBtn = document.getElementById("quickRepliesBtn");
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
const globalSearchModal = document.getElementById("globalSearchModal");
const globalSearchInput = document.getElementById("globalSearchInput");
const globalSearchResults = document.getElementById("globalSearchResults");
const globalSearchCloseBtn = document.getElementById("globalSearchCloseBtn");
const sendContactModal = document.getElementById("sendContactModal");
const sendContactList = document.getElementById("sendContactList");
const sendContactEmpty = document.getElementById("sendContactEmpty");
const sendContactCloseBtn = document.getElementById("sendContactCloseBtn");
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
const NOTES_ROOM = "notas:yo";

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
let usuarioParaContacto = null;

function limpiarNombre(texto) {
  if (!texto) return "user";
  return String(texto).toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n").replace(/[^a-z0-9]/g, "") || "user";
}

function getLastRead(room) { return LS.getItem("zummchat_lastread_" + room) || ""; }
function setLastRead(room) { if (!room) return; LS.setItem("zummchat_lastread_" + room, new Date().toISOString()); }

// ================= CHATS FIJADOS =================
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

// ================= ÚLTIMA CONEXIÓN =================
let ultimaConexionPorUsuario = {};
function formatearUltimaConexion(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const ahora = Date.now();
  const diff = ahora - d.getTime();
  if (diff < 60000) return "en línea";
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return "hace " + mins + " min";
  const horas = Math.floor(mins / 60);
  if (horas < 24) return "hace " + horas + " h";
  const dias = Math.floor(horas / 24);
  if (dias < 7) return "hace " + dias + " d";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return dd + "/" + mm;
}

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
  if (room === NOTES_ROOM) return "📝 Mis notas";
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
  if (currentRoom === NOTES_ROOM) return;
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
  else if (tipo.startsWith("vcard/")) texto = "📇 Contacto";
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

    crearItemChat("📝 Mis notas", NOTES_ROOM, "notas", { ultimo: null, noLeidos: 0 });

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
  const esNotas = tipo === "notas";
  const estaOnline = !esGrupo && !esNotas && usersOnline.some(u => u.toLowerCase() === nombreUsuario.toLowerCase());
  const urlAvatar = (!esGrupo && !esNotas) ? (avataresPorUsuario[nombreUsuario.toLowerCase()] || "") : "";
  if (estaFijado(roomId)) li.classList.add("pinned");
  if (chatEstaSilenciado(roomId)) li.classList.add("muted-chat");
  if (esNotas) li.classList.add("notes-chat");
  const avatar = document.createElement("div");
  avatar.className = "chat-avatar";
  if (esNotas) { avatar.style.background = "#ffd700"; avatar.textContent = "📝"; }
  else if (esGrupo) { avatar.style.background = "var(--accent)"; avatar.textContent = "👥"; }
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
  else if (esNotas) preview.textContent = "Tus notas personales";
  else if (esGrupo) preview.textContent = "Grupo de chat";
  else {
    if (estaOnline) { preview.textContent = "En línea"; preview.classList.add("online"); }
    else {
      const lastSeen = ultimaConexionPorUsuario[nombreUsuario.toLowerCase()];
      if (lastSeen) preview.textContent = "Últ. vez " + formatearUltimaConexion(lastSeen);
      else preview.textContent = "Desconectado";
    }
  }
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
  } else if (!esGrupo && !esNotas) {
    const dot = document.createElement("div");
    dot.className = "chat-status-dot" + (estaOnline ? "" : " offline");
    right.appendChild(dot);
  }
  li.appendChild(avatar); li.appendChild(infoEl); li.appendChild(right);
  li.addEventListener("click", () => {
    if (!esGrupo && !esNotas && !privateRooms.includes(roomId)) { privateRooms.push(roomId); savePrivateRooms(); }
    switchRoom(roomId);
  });
  if (!esNotas) {
    let longPressTimer = null;
    li.addEventListener("touchstart", (e) => {
      longPressTimer = setTimeout(() => { if (navigator.vibrate) navigator.vibrate(50); abrirOpcionesChat(roomId, nombreUsuario); }, 550);
    }, { passive: true });
    li.addEventListener("touchend", () => clearTimeout(longPressTimer));
    li.addEventListener("touchmove", () => clearTimeout(longPressTimer));
    li.addEventListener("contextmenu", (e) => { e.preventDefault(); abrirOpcionesChat(roomId, nombreUsuario); });
  }
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
      else if (tipo.startsWith("vcard/")) texto += " [📇 Contacto]";
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

// ================= BÚSQUEDA GLOBAL =================
if (globalSearchBtn) globalSearchBtn.addEventListener("click", () => {
  if (globalSearchInput) globalSearchInput.value = "";
  if (globalSearchResults) globalSearchResults.innerHTML = "<p style='text-align:center;color:var(--text-dim);font-size:12px;padding:20px;'>Escribe al menos 2 caracteres para buscar</p>";
  if (globalSearchModal) globalSearchModal.classList.add("show");
  setTimeout(() => { if (globalSearchInput) globalSearchInput.focus(); }, 100);
});
if (globalSearchCloseBtn) globalSearchCloseBtn.addEventListener("click", () => { if (globalSearchModal) globalSearchModal.classList.remove("show"); });
if (globalSearchModal) globalSearchModal.addEventListener("click", (e) => { if (e.target === globalSearchModal) globalSearchModal.classList.remove("show"); });

let busquedaTimeout = null;
if (globalSearchInput) globalSearchInput.addEventListener("input", () => {
  clearTimeout(busquedaTimeout);
  busquedaTimeout = setTimeout(ejecutarBusquedaGlobal, 400);
});

async function ejecutarBusquedaGlobal() {
  if (!globalSearchResults) return;
  const q = (globalSearchInput.value || "").trim();
  if (q.length < 2) {
    globalSearchResults.innerHTML = "<p style='text-align:center;color:var(--text-dim);font-size:12px;padding:20px;'>Escribe al menos 2 caracteres para buscar</p>";
    return;
  }
  globalSearchResults.innerHTML = "<p style='text-align:center;color:var(--text-dim);font-size:12px;padding:20px;'>Buscando...</p>";
  try {
    const { data, error } = await supabaseClient.from("zumm_messages")
      .select("id, text, username, room, created_at, file_type, file_url")
      .ilike("text", "%" + q + "%")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) { globalSearchResults.innerHTML = "<p style='text-align:center;color:#ff5252;font-size:12px;padding:20px;'>Error: " + error.message + "</p>"; return; }
    if (!data || data.length === 0) {
      globalSearchResults.innerHTML = "<p style='text-align:center;color:var(--text-dim);font-size:12px;padding:20px;'>Sin resultados</p>";
      return;
    }
    const miUserLower = username.toLowerCase();
    const filtrados = data.filter(m => {
      if (!m.room) return false;
      if (m.room === NOTES_ROOM) return true;
      if (m.room.startsWith("priv:")) {
        const partes = m.room.replace("priv:", "").split("|");
        return partes.some(p => p.toLowerCase() === miUserLower);
      }
      if (m.room.startsWith("grupo:")) {
        const grupoNombre = m.room.replace("grupo:", "");
        return gruposPersonalizados.includes(grupoNombre);
      }
      return ["general", "amigos", "familia", "trabajo"].includes(m.room);
    });
    if (filtrados.length === 0) {
      globalSearchResults.innerHTML = "<p style='text-align:center;color:var(--text-dim);font-size:12px;padding:20px;'>Sin resultados en tus chats</p>";
      return;
    }
    globalSearchResults.innerHTML = "";
    filtrados.forEach(m => {
      const div = document.createElement("div");
      div.className = "gsr-item";
      const chat = document.createElement("div");
      chat.className = "gsr-chat";
      chat.textContent = roomLabel(m.room);
      const author = document.createElement("div");
      author.className = "gsr-author";
      author.textContent = (m.username || "Anónimo") + " · " + formatHoraCorta(m.created_at);
      const text = document.createElement("div");
      text.className = "gsr-text";
      const textoReal = (m.text || "").replace(/^\[REPLY:[^\]]+\]\s*/i, "").replace(/^\[FORWARD\]\s*/i, "🔁 ").replace(/\[STICKER\].+\[\/STICKER\]/, "🧩 Sticker");
      const idx = textoReal.toLowerCase().indexOf(q.toLowerCase());
      if (idx >= 0) {
        text.appendChild(document.createTextNode(textoReal.substring(0, idx)));
        const mark = document.createElement("mark");
        mark.textContent = textoReal.substring(idx, idx + q.length);
        text.appendChild(mark);
        text.appendChild(document.createTextNode(textoReal.substring(idx + q.length)));
      } else {
        text.textContent = textoReal;
      }
      div.appendChild(chat);
      div.appendChild(author);
      div.appendChild(text);
      div.addEventListener("click", () => {
        globalSearchModal.classList.remove("show");
        switchRoom(m.room);
        setTimeout(() => {
          const el = messagesEl.querySelector('[data-msg-id="' + m.id + '"]');
          if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.classList.add("highlight"); setTimeout(() => el.classList.remove("highlight"), 2000); }
        }, 800);
      });
      globalSearchResults.appendChild(div);
    });
  } catch (e) {
    globalSearchResults.innerHTML = "<p style='text-align:center;color:#ff5252;font-size:12px;padding:20px;'>Error: " + e.message + "</p>";
  }
}

// ================= RESPONDER =================
function construirTextoConReply(textoReal) {
  if (!replyTo) return textoReal;
  const autor = replyTo.username || "Alguien";
  let preview = replyTo.text || "";
  if (replyTo.file_type && replyTo.file_type.startsWith("audio/")) preview = "🎤 Nota de voz";
  else if (replyTo.file_type && replyTo.file_type.startsWith("location/")) preview = "📍 Ubicación";
  else if (replyTo.file_type && replyTo.file_type.startsWith("poll/")) preview = "📊 Encuesta";
  else if (replyTo.file_type && replyTo.file_type.startsWith("vcard/")) preview = "📇 Contacto";
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
  else if (m.file_type && m.file_type.startsWith("vcard/")) preview = "📇 Contacto";
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

// ================= RESPUESTAS RÁPIDAS =================
if (quickRepliesBtn) quickRepliesBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (emojiBar) emojiBar.classList.remove("show");
  if (stickerBar) stickerBar.classList.remove("show");
  if (quickRepliesBar) quickRepliesBar.classList.toggle("show");
  quickRepliesBtn.classList.toggle("activo", quickRepliesBar && quickRepliesBar.classList.contains("show"));
});
if (quickRepliesBar) {
  quickRepliesBar.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const texto = btn.dataset.reply || btn.textContent;
      if (!texto || !inputEl) return;
      inputEl.value = texto;
      inputEl.focus();
      sendMessage();
      quickRepliesBar.classList.remove("show");
      if (quickRepliesBtn) quickRepliesBtn.classList.remove("activo");
    });
  });
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
function parseVcard(m) {
  if (!m.file_type || !m.file_type.startsWith("vcard/")) return null;
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
      else if (tipo.startsWith("vcard/")) textoNotif = "📇 Contacto";
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
  const vcardData = parseVcard(m);

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
  } else if (vcardData) {
    const card = document.createElement("div");
    card.className = "vcard-box";
    const av = document.createElement("div");
    av.className = "vcard-avatar";
    av.style.background = colorForUser(vcardData.nombre);
    av.textContent = avatarLetter(vcardData.nombre);
    const info = document.createElement("div");
    info.className = "vcard-info";
    const nm = document.createElement("div");
    nm.className = "vcard-name";
    nm.textContent = vcardData.nombre;
    const sub = document.createElement("div");
    sub.className = "vcard-sub";
    sub.textContent = "Toca para abrir el contacto";
    info.appendChild(nm); info.appendChild(sub);
    const ic = document.createElement("div");
    ic.className = "vcard-icon"; ic.textContent = "📇";
    card.appendChild(av); card.appendChild(info); card.appendChild(ic);
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      abrirPerfil(vcardData.nombre, false);
    });
    body.appendChild(card);
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

  if (m.file_url && !pollData && !vcardData) {
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

    let lastTapTime = 0;
    div.addEventListener("touchend", (e) => {
      if (modoSeleccion) return;
      const ahora = Date.now();
      if (ahora - lastTapTime < 300) {
        mostrarCorazon(div);
        toggleReaccion(m.id, "❤️");
        lastTapTime = 0;
      } else {
        lastTapTime = ahora;
      }
    }, { passive: true });
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

function mostrarCorazon(div) {
  const heart = document.createElement("div");
  heart.className = "heart-pop";
  heart.textContent = "❤️";
  div.style.position = "relative";
  div.appendChild(heart);
  setTimeout(() => { if (heart.parentNode) heart.parentNode.removeChild(heart); }, 900);
  if (navigator.vibrate) navigator.vibrate(30);
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
  if (!currentRoom || currentRoom === NOTES_ROOM) return;
  const ahora = Date.now();
  if (ahora - ultimoTypingEnviado < 2000) return;
  ultimoTypingEnviado = ahora;
  supabaseClient.from("zumm_presence").upsert({ username: username, room: currentRoom, last_seen: new Date().toISOString(), avatar_url: myAvatarUrl || null, typing_at: new Date().toISOString() }, { onConflict: "username,room" }).then(() => {}).catch(() => {});
}
function enviarTypingStop() {
  if (!currentRoom || currentRoom === NOTES_ROOM) return;
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
  else if (m.file_type && m.file_type.startsWith("vcard/")) preview += "📇 Contacto";
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
  if (m.file_type && m.file_type.startsWith("vcard/")) { alert("No puedes editar un contacto."); return; }
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
  const esVcard = m.file_type && m.file_type.startsWith("vcard/");
  const esSticker = m.text && m.text.startsWith("[STICKER]");
  if (menuEditBtn) menuEditBtn.style.display = esMio && m.text && !esPoll && !esVcard && !esSticker ? "block" : "none";
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
    if (m.file_type && m.file_type.startsWith("vcard/")) preview = "📇 Contacto";
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

// ================= ENVIAR CONTACTO (vCard) =================
if (menuContactBtn) menuContactBtn.addEventListener("click", () => {
  cerrarPaneles();
  abrirModalEnviarContacto();
});
function abrirModalEnviarContacto() {
  if (!sendContactModal || !sendContactList) return;
  sendContactList.innerHTML = "";
  if (sendContactEmpty) sendContactEmpty.style.display = "none";
  const contactosOrdenados = [...misContactos].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  if (contactosOrdenados.length === 0) {
    if (sendContactEmpty) sendContactEmpty.style.display = "block";
    sendContactModal.classList.add("show");
    return;
  }
  contactosOrdenados.forEach(c => {
    const li = document.createElement("li");
    const av = document.createElement("div");
    av.className = "vcard-avatar";
    const url = avataresPorUsuario[c.toLowerCase()] || "";
    if (url) { av.style.backgroundImage = "url(" + url + ")"; av.textContent = ""; }
    else { av.style.background = colorForUser(c); av.textContent = avatarLetter(c); }
    li.appendChild(av);
    const span = document.createElement("span");
    span.textContent = c;
    li.appendChild(span);
    li.addEventListener("click", () => {
      enviarVcard(c);
      sendContactModal.classList.remove("show");
    });
    sendContactList.appendChild(li);
  });
  sendContactModal.classList.add("show");
}
if (sendContactCloseBtn) sendContactCloseBtn.addEventListener("click", () => sendContactModal.classList.remove("show"));
if (sendContactModal) sendContactModal.addEventListener("click", (e) => { if (e.target === sendContactModal) sendContactModal.classList.remove("show"); });

async function enviarVcard(nombreContacto) {
  if (!currentRoom) return;
  const vcardData = {
    nombre: nombreContacto,
    avatar: avataresPorUsuario[nombreContacto.toLowerCase()] || ""
  };
  const { data, error } = await supabaseClient.from("zumm_messages").insert([{
    text: "📇 Contacto compartido",
    username: username,
    room: currentRoom,
    file_url: JSON.stringify(vcardData),
    file_name: nombreContacto,
    file_type: "vcard/1"
  }]).select().single();
  if (error) { alert("Error: " + error.message); return; }
  renderMessage(data, false);
}

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
if (contactsCloseBtn) contactsCloseBtn.addEventListener("click", () => contactsModal.classList.remove("show"));
if (contactsModal) contactsModal.addEventListener("click", (e) => { if (e.target === contactsModal) contactsModal.classList.remove("show"); });
if (contactsBtn) contactsBtn.addEventListener("click", async () => { cerrarPaneles(); if (!contactsModal) return; await mostrarContactos(); });
if (newContactBtn) newContactBtn.addEventListener("click", async () => {
  const nombre = prompt("Nombre del contacto:");
  if (!nombre || !nombre.trim()) return;
  await añadirContacto(nombre.trim());
  await mostrarContactos();
});

// ============================================================
// ESTADO GLOBAL ADICIONAL
// ============================================================
let privateRooms = JSON.parse(LS.getItem("zummchat_privados") || "[]");
function savePrivateRooms() { LS.setItem("zummchat_privados", JSON.stringify(privateRooms)); }

let usersOnline = new Set();
let avataresPorUsuario = {};
let typingPorUsuario = {};
let perfilActual = null;

// ============================================================
// MATRIX RAIN (splash)
// ============================================================
(function initMatrixRain() {
  const canvas = document.getElementById("matrixRain");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  let animId = null;
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  resize();
  window.addEventListener("resize", resize);
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ZummChat";
  const fontSize = 14;
  let drops = [];
  const initDrops = () => {
    const cols = Math.ceil(canvas.width / fontSize);
    drops = new Array(cols).fill(0).map(() => Math.random() * canvas.height / fontSize);
  };
  initDrops();
  window.addEventListener("resize", initDrops);
  const draw = () => {
    ctx.fillStyle = "rgba(0,0,0,0.07)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff66";
    ctx.font = fontSize + "px monospace";
    drops.forEach((y, i) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
    animId = requestAnimationFrame(draw);
  };
  draw();
  window.stopMatrixRain = () => { if (animId) { cancelAnimationFrame(animId); animId = null; } };
})();

// ============================================================
// PRESENCIA
// ============================================================
async function enviarPresencia(room) {
  if (!room || room === NOTES_ROOM) return;
  try {
    await supabaseClient.from("zumm_presence").upsert({
      username: username, room: room,
      last_seen: new Date().toISOString(),
      avatar_url: myAvatarUrl || null
    }, { onConflict: "username,room" });
  } catch (e) {}
}

async function actualizarPresencia() {
  try {
    const hace5min = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data } = await supabaseClient.from("zumm_presence")
      .select("username, last_seen, avatar_url, room").gte("last_seen", hace5min);
    const nuevoOnline = new Set();
    const nuevosAvatares = { ...avataresPorUsuario };
    (data || []).forEach(p => {
      if (!p.username) return;
      nuevoOnline.add(p.username);
      if (p.avatar_url) nuevosAvatares[p.username.toLowerCase()] = p.avatar_url;
      if (p.last_seen) ultimaConexionPorUsuario[p.username.toLowerCase()] = p.last_seen;
    });
    const anteriores = usersOnline;
    usersOnline = nuevoOnline;
    avataresPorUsuario = nuevosAvatares;
    nuevoOnline.forEach(u => {
      if (!anteriores.has(u) && u.toLowerCase() !== username.toLowerCase() && anteriores.size > 0) {
        mostrarNotificacionConexion(u);
      }
    });
    if (!inChatView) renderChatList();
    else if (usersPanel && usersPanel.classList.contains("show")) renderUserList();
  } catch (e) {}
}

function actualizarTypingDesdePresence() {
  const ahora = Date.now();
  const typing = [];
  Object.entries(typingPorUsuario).forEach(([u, t]) => {
    if (ahora - t < 4500 && u.toLowerCase() !== username.toLowerCase()) typing.push(u);
  });
  actualizarIndicadorTyping(typing);
}

supabaseClient.channel("zumm-presence-rt")
  .on("postgres_changes", { event: "*", schema: "public", table: "zumm_presence" }, payload => {
    const p = payload.new || payload.old;
    if (!p || !p.username) return;
    if (p.typing_at && p.username.toLowerCase() !== username.toLowerCase()) typingPorUsuario[p.username] = new Date(p.typing_at).getTime();
    else delete typingPorUsuario[p.username];
    if (p.avatar_url) avataresPorUsuario[p.username.toLowerCase()] = p.avatar_url;
    if (p.last_seen) ultimaConexionPorUsuario[p.username.toLowerCase()] = p.last_seen;
    actualizarTypingDesdePresence();
  })
  .subscribe();
setInterval(actualizarTypingDesdePresence, 2000);
setInterval(() => { if (currentRoom && currentRoom !== NOTES_ROOM) enviarPresencia(currentRoom); }, 45000);
setInterval(actualizarPresencia, 30000);

// ============================================================
// PANEL DE USUARIOS
// ============================================================
function renderUserList() {
  if (!userList) return;
  userList.innerHTML = "";
  if (userMeName) userMeName.textContent = username + (myStatus ? " · " + myStatus : "");
  if (userMeAvatar) {
    if (myAvatarUrl) { userMeAvatar.style.backgroundImage = "url(" + myAvatarUrl + ")"; userMeAvatar.style.background = ""; userMeAvatar.textContent = ""; }
    else { userMeAvatar.style.backgroundImage = ""; userMeAvatar.style.background = colorForUser(username); userMeAvatar.textContent = avatarLetter(username); }
  }
  const otros = [...usersOnline].filter(u => u.toLowerCase() !== username.toLowerCase())
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  if (otros.length === 0) { if (noUsers) noUsers.style.display = "block"; return; }
  if (noUsers) noUsers.style.display = "none";
  otros.forEach(u => {
    const li = document.createElement("li");
    const av = document.createElement("div");
    av.className = "chat-avatar";
    av.style.cssText = "width:32px;height:32px;font-size:14px;";
    const url = avataresPorUsuario[u.toLowerCase()] || "";
    if (url) { av.style.backgroundImage = "url(" + url + ")"; av.textContent = ""; }
    else { av.style.background = colorForUser(u); av.textContent = avatarLetter(u); }
    li.appendChild(av);
    const span = document.createElement("span");
    span.textContent = u;
    li.appendChild(span);
    li.addEventListener("click", () => { usersPanel.classList.remove("show"); openPrivateWith(u); });
    userList.appendChild(li);
  });
}
if (usersBtn) usersBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  cerrarPaneles();
  if (usersPanel) { usersPanel.classList.add("show"); renderUserList(); }
});
if (usersPanelClose) usersPanelClose.addEventListener("click", () => usersPanel.classList.remove("show"));

if (changeNameBtn) changeNameBtn.addEventListener("click", () => {
  const nuevo = prompt("Nuevo nombre de usuario:", username);
  if (!nuevo || !nuevo.trim()) return;
  const limpio = nuevo.trim().substring(0, 20);
  if (limpio.toLowerCase() === username.toLowerCase()) return;
  LS.setItem("zummchat_user", limpio);
  alert("✅ Nombre cambiado a " + limpio + ". Recargando…");
  location.reload();
});

if (userMeAvatar) userMeAvatar.addEventListener("click", () => { if (avatarInput) avatarInput.click(); });
if (avatarInput) avatarInput.addEventListener("change", async () => {
  const file = avatarInput.files[0]; if (!file) return;
  if (file.size > 2 * 1024 * 1024) { alert("Máximo 2 MB."); avatarInput.value = ""; return; }
  try {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const nombreArchivo = "avatar_" + limpiarNombre(username) + "_" + Date.now() + "." + ext;
    const { error } = await supabaseClient.storage.from("archivos").upload(nombreArchivo, file, { contentType: file.type || "image/jpeg" });
    if (error) { alert("Error: " + error.message); return; }
    const { data } = supabaseClient.storage.from("archivos").getPublicUrl(nombreArchivo);
    myAvatarUrl = data.publicUrl;
    LS.setItem("zummchat_avatar", myAvatarUrl);
    renderUserList();
    if (currentRoom && currentRoom !== NOTES_ROOM) enviarPresencia(currentRoom);
    alert("✅ Avatar actualizado");
  } catch (e) { alert("Error: " + e.message); }
  finally { avatarInput.value = ""; }
});

// ============================================================
// CAMBIO DE SALA
// ============================================================
async function openPrivateWith(nombre) {
  if (!nombre) return;
  const partes = [username, nombre].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const room = "priv:" + partes[0] + "|" + partes[1];
  if (!privateRooms.includes(room)) { privateRooms.push(room); savePrivateRooms(); }
  switchRoom(room);
}

async function switchRoom(room) {
  if (!room) return;
  currentRoom = room;
  rendered.clear();
  mensajesSeleccionados.clear();
  ocultarReplyBar();
  salirModoSeleccion();
  limpiarFiltroUsuario(false);
  if (messagesEl) messagesEl.innerHTML = "";
  lastDateKey = "";
  showChatView();
  if (chatTitle) chatTitle.textContent = roomLabel(room);
  aplicarWallpaper(room);
  if (deleteGroupBtn) deleteGroupBtn.style.display = room.startsWith("grupo:") ? "flex" : "none";
  if (filterBtn) filterBtn.style.display = "flex";
  if (pinnedBar) pinnedBar.classList.remove("show");
  if (callBtn) callBtn.style.display = room.startsWith("priv:") ? "flex" : "none";
  if (videoBtn) videoBtn.style.display = room.startsWith("priv:") ? "flex" : "none";
  setLastRead(room);
  enviarPresencia(room);
  await loadHistory();
  await cargarMensajeFijado();
  scrollToBottom();
  if (!room.startsWith("priv:") && room !== NOTES_ROOM) saludarBienvenida();
  resetearTitulo();
  if (emojiBar) emojiBar.classList.remove("show");
  if (stickerBar) stickerBar.classList.remove("show");
  if (quickRepliesBar) quickRepliesBar.classList.remove("show");
}

// ============================================================
// BÚSQUEDA LOCAL
// ============================================================
if (searchBtn) searchBtn.addEventListener("click", () => {
  cerrarPaneles();
  if (searchBar) {
    searchBar.classList.toggle("show");
    if (searchBar.classList.contains("show") && searchInput) setTimeout(() => searchInput.focus(), 100);
  }
});
if (searchClose) searchClose.addEventListener("click", () => {
  if (searchBar) searchBar.classList.remove("show");
  if (searchInput) searchInput.value = "";
  document.querySelectorAll(".msg").forEach(el => el.style.display = "flex");
});
if (searchInput) searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  document.querySelectorAll(".msg").forEach(el => {
    if (!q) { el.style.display = "flex"; return; }
    const txt = (el.textContent || "").toLowerCase();
    el.style.display = txt.includes(q) ? "flex" : "none";
  });
});

// ============================================================
// SCROLL DOWN
// ============================================================
if (messagesEl) messagesEl.addEventListener("scroll", () => {
  if (!scrollDownBtn) return;
  const cercaFinal = messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight < 120;
  scrollDownBtn.classList.toggle("show", !cercaFinal && messagesEl.scrollHeight > messagesEl.clientHeight + 200);
});
if (scrollDownBtn) scrollDownBtn.addEventListener("click", scrollToBottom);

// ============================================================
// SONIDOS (modal)
// ============================================================
if (soundsBtn) soundsBtn.addEventListener("click", () => {
  cerrarPaneles();
  if (!soundsModal || !soundsList) return;
  soundsList.innerHTML = "";
  SONIDOS_DISPONIBLES.forEach(s => {
    const li = document.createElement("li");
    if (s.id === sonidoActual) li.classList.add("seleccionado");
    const name = document.createElement("span");
    name.className = "snd-name";
    name.textContent = s.nombre;
    li.appendChild(name);
    const play = document.createElement("button");
    play.className = "snd-play";
    play.type = "button";
    play.textContent = "▶";
    play.addEventListener("click", (e) => { e.stopPropagation(); reproducirSonidoPreview(s.id); });
    li.appendChild(play);
    const check = document.createElement("span");
    check.className = "snd-check";
    check.textContent = s.id === sonidoActual ? "✅" : "";
    li.appendChild(check);
    li.addEventListener("click", () => {
      sonidoActual = s.id;
      LS.setItem("zummchat_tono", s.id);
      reproducirSonidoPreview(s.id);
      soundsModal.classList.remove("show");
    });
    soundsList.appendChild(li);
  });
  soundsModal.classList.add("show");
});
if (soundsCloseBtn) soundsCloseBtn.addEventListener("click", () => soundsModal.classList.remove("show"));
if (soundsModal) soundsModal.addEventListener("click", (e) => { if (e.target === soundsModal) soundsModal.classList.remove("show"); });

// ============================================================
// EMOJIS Y STICKERS
// ============================================================
const EMOJIS = ["😀","😂","🤣","😊","😍","😘","😎","🤔","😅","😭","😡","🥳","😴","🤗","🤩","😇","🙃","😉","😌","😜","🤪","🤨","😐","😑","😶","🙄","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺","😢","😤","😠","🤬","🤯","😳","🥵","🥶","😱","😨","😰","😥","😓","🤭","🤫","🤥","😬","😯","😦","😧","😮","😲","🥱","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾","👋","🤚","🖐","✋","🖖","👌","🤏","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","👇","☝️","👍","👎","✊","👊","🤛","🤜","👏","🙌","👐","🤲","🤝","🙏","✍️","💅","🤳","💪","🦾","🦵","🦶","👂","👃","🧠","🦷","🦴","👀","👁","👅","👄","💋","❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❣️","💕","💞","💓","💗","💖","💘","💝","💟","🔥","✨","⭐","🌟","💫","⚡","💥","🎉","🎊","🎈","🎁","🏆","🥇","🎯","🎮","🎵","🎶","☕","🍕","🍔","🍟","🌮","🍩","🍰","🍺","🍻","🥂","⚽","🏀","🏈","⚾","🎾","🏐","🚀","✈️","🚗","🏠","🌍","🌙","☀️","⛅","🌈","❄️","💧","💦","🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🐔","🐧","🐦","🦆","🦅","🦉","🦇","🐺","🐗","🐴","🦄","🐝","🐛","🦋","🐌","🐞","🐜","🕷","🦂","🐢","🐍","🦎","🦖","🐙","🦑","🦐","🦞","🦀","🐡","🐠","🐟","🐬","🐳","🐋","🦈","🐊","🐅","🐆","🦓","🦍","🦧","🐘","🦛","🦏","🐪","🐫","🦒","🦘","🐃","🐂","🐄","🐎","🐖","🐏","🐑","🦙","🐐","🦌","🐕","🐩","🦮","🐕‍🦺","🐈","🐓","🦃","🦚","🦜","🦢","🦩","🕊","🐇","🦝","🦨","🦡","🦦","🦥","🐁","🐀","🐿","🦔"];

if (emojiBtn) emojiBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (stickerBar) stickerBar.classList.remove("show");
  if (quickRepliesBar) quickRepliesBar.classList.remove("show");
  if (emojiBar) emojiBar.classList.toggle("show");
});
if (emojiBar) {
  emojiBar.innerHTML = "";
  EMOJIS.forEach(em => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = em;
    b.addEventListener("click", () => { if (inputEl) { inputEl.value += em; inputEl.focus(); } });
    emojiBar.appendChild(b);
  });
}

const STICKERS = ["👍","❤️","😂","😮","😢","🙏","🔥","🎉","💯","🤔","👏","🥳","😎","🤩","😍","💪","✌️","🤝","🙌","✨","🐦","🐤","🐣","🌟"];
if (stickerBtn) stickerBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (emojiBar) emojiBar.classList.remove("show");
  if (quickRepliesBar) quickRepliesBar.classList.remove("show");
  if (stickerBar) stickerBar.classList.toggle("show");
});
if (stickerBar) {
  stickerBar.innerHTML = "";
  STICKERS.forEach(s => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = s;
    b.addEventListener("click", async () => {
      if (!currentRoom) return;
      stickerBar.classList.remove("show");
      const { data, error } = await supabaseClient.from("zumm_messages").insert([{ text: "[STICKER]" + s + "[/STICKER]", username: username, room: currentRoom }]).select().single();
      if (!error && data) renderMessage(data, false);
    });
    stickerBar.appendChild(b);
  });
}

// ============================================================
// ADJUNTOS
// ============================================================
if (menuFileBtn) menuFileBtn.addEventListener("click", () => { cerrarPaneles(); if (fileInput) fileInput.click(); });
if (menuCameraBtn) menuCameraBtn.addEventListener("click", () => { cerrarPaneles(); if (cameraInput) cameraInput.click(); });
if (menuLocationBtn) menuLocationBtn.addEventListener("click", () => {
  cerrarPaneles();
  if (!navigator.geolocation) { alert("Geolocalización no soportada."); return; }
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude.toFixed(6);
    const lng = pos.coords.longitude.toFixed(6);
    const url = "https://www.google.com/maps?q=" + lat + "," + lng;
    const { data, error } = await supabaseClient.from("zumm_messages").insert([{
      text: "📍 Ubicación compartida", username: username, room: currentRoom,
      file_url: url, file_name: "Ubicación", file_type: "location/1"
    }]).select().single();
    if (!error && data) renderMessage(data, false);
  }, () => alert("No se pudo obtener la ubicación."));
});

if (fileInput) fileInput.addEventListener("change", async () => {
  const file = fileInput.files[0]; if (!file) return;
  if (file.size > MAX_SIZE_MB * 1024 * 1024) { alert("Máximo " + MAX_SIZE_MB + " MB."); fileInput.value = ""; return; }
  try {
    const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
    const nombreArchivo = "file_" + limpiarNombre(username) + "_" + Date.now() + "." + ext;
    const { error } = await supabaseClient.storage.from("archivos").upload(nombreArchivo, file, { contentType: file.type || "application/octet-stream" });
    if (error) { alert("Error: " + error.message); return; }
    const { data } = supabaseClient.storage.from("archivos").getPublicUrl(nombreArchivo);
    const tipo = file.type || "application/octet-stream";
    const { data: msg, error: err2 } = await supabaseClient.from("zumm_messages").insert([{
      text: "", username: username, room: currentRoom,
      file_url: data.publicUrl, file_name: file.name, file_type: tipo
    }]).select().single();
    if (!err2 && msg) renderMessage(msg, false);
  } catch (e) { alert("Error: " + e.message); }
  finally { fileInput.value = ""; }
});

if (cameraInput) cameraInput.addEventListener("change", async () => {
  const file = cameraInput.files[0]; if (!file) return;
  if (file.size > MAX_SIZE_MB * 1024 * 1024) { alert("Máximo " + MAX_SIZE_MB + " MB."); cameraInput.value = ""; return; }
  try {
    const nombreArchivo = "foto_" + limpiarNombre(username) + "_" + Date.now() + ".jpg";
    const { error } = await supabaseClient.storage.from("archivos").upload(nombreArchivo, file, { contentType: file.type || "image/jpeg" });
    if (error) { alert("Error: " + error.message); return; }
    const { data } = supabaseClient.storage.from("archivos").getPublicUrl(nombreArchivo);
    const { data: msg, error: err2 } = await supabaseClient.from("zumm_messages").insert([{
      text: "", username: username, room: currentRoom,
      file_url: data.publicUrl, file_name: nombreArchivo, file_type: file.type || "image/jpeg"
    }]).select().single();
    if (!err2 && msg) renderMessage(msg, false);
  } catch (e) { alert("Error: " + e.message); }
  finally { cameraInput.value = ""; }
});

// ============================================================
// NOTA DE VOZ
// ============================================================
let mediaRecorder = null, audioChunks = [], recInterval = null, recSeconds = 0;
if (menuVoiceBtn) menuVoiceBtn.addEventListener("click", () => { cerrarPaneles(); iniciarGrabacion(); });

async function iniciarGrabacion() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];
    mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunks.push(e.data); };
    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach(t => t.stop());
      const cancelado = audioChunks.length === 0;
      if (recSeconds < 1 || cancelado) return;
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      if (blob.size > MAX_SIZE_MB * 1024 * 1024) { alert("Audio demasiado grande."); return; }
      const nombreArchivo = "audio_" + limpiarNombre(username) + "_" + Date.now() + ".webm";
      const { error } = await supabaseClient.storage.from("archivos").upload(nombreArchivo, blob, { contentType: "audio/webm" });
      if (error) { alert("Error: " + error.message); return; }
      const { data } = supabaseClient.storage.from("archivos").getPublicUrl(nombreArchivo);
      const { data: msg, error: err2 } = await supabaseClient.from("zumm_messages").insert([{
        text: "🎤 Nota de voz", username: username, room: currentRoom,
        file_url: data.publicUrl, file_name: nombreArchivo, file_type: "audio/webm"
      }]).select().single();
      if (!err2 && msg) renderMessage(msg, false);
    };
    mediaRecorder.start();
    recSeconds = 0;
    if (recordingTime) recordingTime.textContent = "0:00";
    if (recordingPanel) recordingPanel.classList.add("show");
    recInterval = setInterval(() => {
      recSeconds++;
      if (recordingTime) recordingTime.textContent = formatearSegundos(recSeconds);
      if (recSeconds >= 120) detenerGrabacion(false);
    }, 1000);
  } catch (e) { alert("No se pudo acceder al micrófono."); }
}
function detenerGrabacion(cancelar) {
  if (recInterval) { clearInterval(recInterval); recInterval = null; }
  if (recordingPanel) recordingPanel.classList.remove("show");
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    if (cancelar) audioChunks = [];
    mediaRecorder.stop();
  }
}
if (stopRecBtn) stopRecBtn.addEventListener("click", () => detenerGrabacion(false));
if (cancelRecBtn) cancelRecBtn.addEventListener("click", () => detenerGrabacion(true));

// ============================================================
// REACCIONES
// ============================================================
const REACCIONES_RAPIDAS = ["❤️","😂","😮","😢","👍","🔥","🎉","🙏"];
async function toggleReaccion(msgId, emoji) {
  const { data: msg } = await supabaseClient.from("zumm_messages").select("reactions").eq("id", msgId).single();
  if (!msg) return;
  let reacciones = (msg.reactions || "").split(",").filter(x => x.trim());
  const miUser = username.toLowerCase();
  const prefijo = emoji + ":";
  const mias = reacciones.filter(r => r.startsWith(prefijo) && r.slice(prefijo.length).toLowerCase() === miUser);
  if (mias.length > 0) reacciones = reacciones.filter(r => !(r.startsWith(prefijo) && r.slice(prefijo.length).toLowerCase() === miUser));
  else reacciones.push(emoji + ":" + miUser);
  await supabaseClient.from("zumm_messages").update({ reactions: reacciones.join(",") }).eq("id", msgId);
}

if (reactionPicker) {
  reactionPicker.innerHTML = "";
  REACCIONES_RAPIDAS.forEach(em => {
    const b = document.createElement("button");
    b.type = "button"; b.textContent = em;
    b.addEventListener("click", () => {
      if (mensajeMenuActual) toggleReaccion(mensajeMenuActual.id, em);
      reactionPicker.classList.remove("show");
      cerrarMenu();
    });
    reactionPicker.appendChild(b);
  });
}

// ============================================================
// REENVÍO
// ============================================================
function abrirMenuReenvio(m) {
  if (!forwardModal || !forwardList) return;
  mensajeParaReenviar = m;
  forwardList.innerHTML = "";
  const salas = [
    { room: "general", label: "General" },
    { room: "amigos", label: "Amigos" },
    { room: "familia", label: "Familia" },
    { room: "trabajo", label: "Trabajo" }
  ];
  gruposPersonalizados.forEach(g => salas.push({ room: "grupo:" + g, label: "👥 " + g }));
  privateRooms.forEach(r => salas.push({ room: r, label: roomLabel(r) }));
  const unicas = [], vistos = new Set();
  salas.forEach(s => { if (!vistos.has(s.room)) { vistos.add(s.room); unicas.push(s); } });
  unicas.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s.label + (s.room === currentRoom ? " (actual)" : "");
    li.addEventListener("click", async () => { await reenviarMensaje(s.room, mensajeParaReenviar); forwardModal.classList.remove("show"); });
    forwardList.appendChild(li);
  });
  forwardModal.classList.add("show");
}
async function reenviarMensaje(roomDestino, m) {
  if (!roomDestino || !m) return;
  const textoBase = m.text || "";
  const textoFinal = "[FORWARD] " + textoBase;
  const payload = { text: textoFinal, username: username, room: roomDestino };
  if (m.file_url) { payload.file_url = m.file_url; payload.file_name = m.file_name; payload.file_type = m.file_type; }
  const { error } = await supabaseClient.from("zumm_messages").insert([payload]);
  if (error) { alert("Error: " + error.message); return; }
  if (roomDestino !== currentRoom) alert("🔁 Mensaje reenviado");
}
if (forwardCancelBtn) forwardCancelBtn.addEventListener("click", () => forwardModal.classList.remove("show"));
if (forwardModal) forwardModal.addEventListener("click", (e) => { if (e.target === forwardModal) forwardModal.classList.remove("show"); });

// ============================================================
// MODAL DE IMAGEN
// ============================================================
function openImageModal(url) {
  if (!url) return;
  const overlay = document.createElement("div");
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.93);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;cursor:zoom-out;";
  const img = document.createElement("img");
  img.src = url;
  img.style.cssText = "max-width:100%;max-height:100%;object-fit:contain;border-radius:8px;box-shadow:0 0 40px rgba(0,0,0,0.8);";
  overlay.appendChild(img);
  overlay.addEventListener("click", () => overlay.remove());
  document.body.appendChild(overlay);
}

// ============================================================
// SALIR DE GRUPO
// ============================================================
if (deleteGroupBtn) deleteGroupBtn.addEventListener("click", async () => {
  if (!currentRoom || !currentRoom.startsWith("grupo:")) return;
  const nombreGrupo = currentRoom.replace("grupo:", "");
  if (!confirm("¿Salir del grupo '" + nombreGrupo + "'?")) return;
  gruposPersonalizados = gruposPersonalizados.filter(g => g !== nombreGrupo);
  guardarGrupos();
  if (!gruposOcultos.includes(nombreGrupo)) { gruposOcultos.push(nombreGrupo); guardarGruposOcultos(); }
  showChatList();
});

// ============================================================
// ESTADÍSTICAS
// ============================================================
if (statsBtn) statsBtn.addEventListener("click", async () => {
  cerrarPaneles();
  if (!statsModal) return;
  statsModal.classList.add("show");
  if (statTotalMsgs) statTotalMsgs.textContent = "…";
  try {
    const { data, error } = await supabaseClient.from("zumm_messages").select("username, created_at, file_type, file_url").eq("username", username).limit(10000);
    if (error) { alert("Error: " + error.message); return; }
    const arr = data || [];
    const archivos = arr.filter(m => m.file_url && !(m.file_type || "").startsWith("audio/")).length;
    const voz = arr.filter(m => (m.file_type || "").startsWith("audio/")).length;
    const dias = new Set(arr.map(m => (m.created_at || "").slice(0, 10))).size;
    const primero = arr.length ? arr[arr.length - 1].created_at : null;
    if (statTotalMsgs) statTotalMsgs.textContent = arr.length;
    if (statFiles) statFiles.textContent = archivos;
    if (statVoice) statVoice.textContent = voz;
    if (statDays) statDays.textContent = dias;
    if (statFirst) statFirst.textContent = primero ? new Date(primero).toLocaleDateString() : "—";
  } catch (e) { alert("Error: " + e.message); }
});
if (statsCloseBtn) statsCloseBtn.addEventListener("click", () => statsModal.classList.remove("show"));
if (statsModal) statsModal.addEventListener("click", (e) => { if (e.target === statsModal) statsModal.classList.remove("show"); });

if (groupStatsBtn) groupStatsBtn.addEventListener("click", async () => {
  cerrarPaneles();
  if (!groupStatsModal || !currentRoom) return;
  groupStatsModal.classList.add("show");
  try {
    const { data } = await supabaseClient.from("zumm_messages")
      .select("username, created_at, file_type, file_url").eq("room", currentRoom).limit(10000);
    const arr = data || [];
    const usuarios = new Set(arr.map(m => m.username).filter(Boolean));
    const conteo = {};
    arr.forEach(m => { if (m.username) conteo[m.username] = (conteo[m.username] || 0) + 1; });
    const ranking = Object.entries(conteo).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const archivos = arr.filter(m => m.file_url && !(m.file_type || "").startsWith("audio/")).length;
    const voz = arr.filter(m => (m.file_type || "").startsWith("audio/")).length;
    const primero = arr.length ? arr[arr.length - 1].created_at : null;
    if (gStatTotal) gStatTotal.textContent = arr.length;
    if (gStatUsers) gStatUsers.textContent = usuarios.size;
    if (gStatTop) gStatTop.textContent = ranking[0] ? ranking[0][0] : "—";
    if (gStatFiles) gStatFiles.textContent = archivos;
    if (gStatVoice) gStatVoice.textContent = voz;
    if (gStatFirst) gStatFirst.textContent = primero ? new Date(primero).toLocaleDateString() : "—";
    if (gStatRanking) {
      gStatRanking.innerHTML = "";
      ranking.forEach(([u, n], i) => {
        const div = document.createElement("div");
        div.className = "rank-row";
        const pos = document.createElement("span"); pos.className = "rank-pos"; pos.textContent = "#" + (i + 1);
        const nm = document.createElement("span"); nm.className = "rank-name"; nm.textContent = u;
        const cnt = document.createElement("span"); cnt.className = "rank-count"; cnt.textContent = n;
        div.appendChild(pos); div.appendChild(nm); div.appendChild(cnt);
        gStatRanking.appendChild(div);
      });
    }
  } catch (e) { alert("Error: " + e.message); }
});
if (groupStatsCloseBtn) groupStatsCloseBtn.addEventListener("click", () => groupStatsModal.classList.remove("show"));
if (groupStatsModal) groupStatsModal.addEventListener("click", (e) => { if (e.target === groupStatsModal) groupStatsModal.classList.remove("show"); });

// ============================================================
// PERFIL DE USUARIO
// ============================================================
async function abrirPerfil(nombre, esMio) {
  if (!nombre) return;
  perfilActual = nombre;
  if (!profileModal) return;
  const esMiPerfil = esMio || nombre.toLowerCase() === username.toLowerCase();

  if (profileAvatar) {
    const url = esMiPerfil ? myAvatarUrl : (avataresPorUsuario[nombre.toLowerCase()] || "");
    if (url) { profileAvatar.style.backgroundImage = "url(" + url + ")"; profileAvatar.style.background = ""; profileAvatar.textContent = ""; }
    else { profileAvatar.style.backgroundImage = ""; profileAvatar.style.background = colorForUser(nombre); profileAvatar.textContent = avatarLetter(nombre); }
  }
  if (profileName) profileName.textContent = nombre;
  if (profileBioDisplay) profileBioDisplay.textContent = esMiPerfil ? (myBio || "Sin biografía") : "—";
  if (profileStatusDisplay) {
    if (esMiPerfil) profileStatusDisplay.textContent = myStatus || "Sin estado";
    else profileStatusDisplay.textContent = usersOnline.has(nombre) ? "🟢 En línea" : "⚪ Desconectado";
  }

  if (profileEditBtn) profileEditBtn.style.display = esMiPerfil ? "inline-block" : "none";
  if (profileAvatarChangeBtn) profileAvatarChangeBtn.style.display = esMiPerfil ? "inline-block" : "none";
  if (profileBioInput) profileBioInput.style.display = "none";
  if (profileStatusInput) profileStatusInput.style.display = "none";
  if (profileSaveBtn) profileSaveBtn.style.display = "none";
  if (profileCancelBtn) profileCancelBtn.style.display = "none";
  if (profileBioDisplay) profileBioDisplay.style.display = "block";
  if (profileStatusDisplay) profileStatusDisplay.style.display = "block";

  const estaBloqueado = bloqueados.has(nombre.toLowerCase());
  if (profileBlockBtn) profileBlockBtn.style.display = (!esMiPerfil && !estaBloqueado) ? "inline-block" : "none";
  if (profileUnblockBtn) profileUnblockBtn.style.display = (!esMiPerfil && estaBloqueado) ? "inline-block" : "none";
  if (profileAddContactBtn) profileAddContactBtn.style.display = (!esMiPerfil && !estaEnContactos(nombre)) ? "inline-block" : "none";

  profileModal.classList.add("show");
}
if (profileCloseBtn) profileCloseBtn.addEventListener("click", () => profileModal.classList.remove("show"));
if (profileModal) profileModal.addEventListener("click", (e) => { if (e.target === profileModal) profileModal.classList.remove("show"); });

if (profileEditBtn) profileEditBtn.addEventListener("click", () => {
  if (profileBioInput) { profileBioInput.value = myBio || ""; profileBioInput.style.display = "block"; }
  if (profileStatusInput) { profileStatusInput.value = myStatus || ""; profileStatusInput.style.display = "block"; }
  if (profileBioDisplay) profileBioDisplay.style.display = "none";
  if (profileStatusDisplay) profileStatusDisplay.style.display = "none";
  if (profileEditBtn) profileEditBtn.style.display = "none";
  if (profileSaveBtn) profileSaveBtn.style.display = "inline-block";
  if (profileCancelBtn) profileCancelBtn.style.display = "inline-block";
});
if (profileCancelBtn) profileCancelBtn.addEventListener("click", () => { if (perfilActual) abrirPerfil(perfilActual, true); });
if (profileSaveBtn) profileSaveBtn.addEventListener("click", () => {
  myBio = (profileBioInput.value || "").trim().substring(0, 100);
  myStatus = (profileStatusInput.value || "").trim().substring(0, 50);
  LS.setItem("zummchat_bio", myBio);
  LS.setItem("zummchat_status", myStatus);
  if (perfilActual) abrirPerfil(perfilActual, true);
  alert("✅ Perfil guardado");
});
if (profileAvatarChangeBtn) profileAvatarChangeBtn.addEventListener("click", () => { if (avatarInput) avatarInput.click(); });
if (profileAddContactBtn) profileAddContactBtn.addEventListener("click", async () => {
  if (!perfilActual) return;
  await añadirContacto(perfilActual);
  profileModal.classList.remove("show");
});

// ============================================================
// LLAMADAS Y VIDEOLLAMADAS (WebRTC)
// ============================================================
let peerConnection = null;
let localStream = null;
let callChannel = null;
let callPollInterval = null;
let currentCallId = null;
let currentCallTarget = null;
let callRoomId = null;
let incomingCallId = null;
let micMuted = false;

async function crearPeer() {
  if (peerConnection) return;
  peerConnection = new RTCPeerConnection({ iceServers: ICE_SERVERS });
  localStream.getTracks().forEach(t => peerConnection.addTrack(t, localStream));
  peerConnection.ontrack = (e) => {
    if (remoteVideo) { remoteVideo.srcObject = e.streams[0]; remoteVideo.play().catch(() => {}); }
    if (callStatus) callStatus.textContent = "Conectado";
    stopRingtone();
  };
  peerConnection.onicecandidate = (e) => {
    if (e.candidate && callChannel) {
      callChannel.send({ type: "broadcast", event: "signal", payload: { from: username, type: "ice", data: e.candidate } });
    }
  };
}

function setupSignalChannel(roomId) {
  if (callChannel) { try { supabaseClient.removeChannel(callChannel); } catch (e) {} }
  callChannel = supabaseClient.channel("call-" + roomId);
  callChannel.on("broadcast", { event: "signal" }, async ({ payload }) => {
    if (!payload || payload.from === username) return;
    try {
      if (payload.type === "offer") {
        await crearPeer();
        await peerConnection.setRemoteDescription(new RTCSessionDescription(payload.data));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        callChannel.send({ type: "broadcast", event: "signal", payload: { from: username, type: "answer", data: answer } });
      } else if (payload.type === "answer") {
        if (peerConnection) await peerConnection.setRemoteDescription(new RTCSessionDescription(payload.data));
      } else if (payload.type === "ice") {
        if (peerConnection && payload.data) { try { await peerConnection.addIceCandidate(new RTCIceCandidate(payload.data)); } catch (e) {} }
      }
    } catch (e) {}
  });
  callChannel.subscribe();
}

function limpiarLlamada() {
  stopRingtone();
  if (callPollInterval) { clearInterval(callPollInterval); callPollInterval = null; }
  if (peerConnection) { try { peerConnection.close(); } catch (e) {} peerConnection = null; }
  if (localStream) { localStream.getTracks().forEach(t => t.stop()); localStream = null; }
  if (callChannel) { try { supabaseClient.removeChannel(callChannel); } catch (e) {} callChannel = null; }
  if (callOverlay) callOverlay.classList.remove("show");
  if (incomingModal) incomingModal.classList.remove("show");
  if (localVideo) localVideo.srcObject = null;
  if (remoteVideo) remoteVideo.srcObject = null;
  currentCallId = null; currentCallTarget = null; callRoomId = null; incomingCallId = null;
  micMuted = false;
  if (muteBtn) muteBtn.textContent = "🎤 Mic";
}

async function startCall(targetUser, isVideo) {
  if (!targetUser) return;
  if (currentCallId) { alert("Ya estás en una llamada."); return; }
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: isVideo });
  } catch (e) { alert("No se pudo acceder a cámara/micrófono."); return; }
  callRoomId = [username, targetUser].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).join("|");
  const { data, error } = await supabaseClient.from("zumm_calls").insert([{
    room_id: callRoomId, caller: username, receiver: targetUser,
    tipo: isVideo ? "video" : "audio", estado: "ringing"
  }]).select().single();
  if (error) { alert("Error: " + error.message); limpiarLlamada(); return; }
  currentCallId = data.id;
  currentCallTarget = targetUser;
  setupSignalChannel(callRoomId);
  if (callOverlay) callOverlay.classList.add("show");
  if (callStatus) callStatus.textContent = "Llamando a " + targetUser + "…";
  if (acceptCallBtn) acceptCallBtn.style.display = "none";
  if (hangupBtn) hangupBtn.style.display = "inline-block";
  if (muteBtn) muteBtn.style.display = "inline-block";
  if (switchCamBtn) switchCamBtn.style.display = isVideo ? "inline-block" : "none";
  if (localVideo) { localVideo.srcObject = localStream; localVideo.muted = true; localVideo.style.display = isVideo ? "block" : "none"; localVideo.play().catch(() => {}); }
  if (remoteVideo) remoteVideo.style.display = isVideo ? "block" : "none";
  playRingtone();
  await crearPeer();
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  callChannel.send({ type: "broadcast", event: "signal", payload: { from: username, type: "offer", data: offer } });
  if (callPollInterval) clearInterval(callPollInterval);
  callPollInterval = setInterval(async () => {
    if (!currentCallId) return;
    const { data } = await supabaseClient.from("zumm_calls").select("estado").eq("id", currentCallId).maybeSingle();
    if (!data) return;
    if (data.estado === "rejected" || data.estado === "ended") { limpiarLlamada(); }
    else if (data.estado === "accepted") stopRingtone();
  }, 2000);
}

async function aceptarLlamada() {
  const callId = incomingCallId;
  if (!callId) return;
  const { data: c } = await supabaseClient.from("zumm_calls").select("*").eq("id", callId).maybeSingle();
  if (!c) { limpiarLlamada(); return; }
  const esVideo = c.tipo === "video";
  try { localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: esVideo }); }
  catch (e) { alert("No se pudo acceder a cámara/micrófono."); limpiarLlamada(); return; }
  currentCallId = callId;
  currentCallTarget = c.caller;
  callRoomId = c.room_id;
  await supabaseClient.from("zumm_calls").update({ estado: "accepted" }).eq("id", callId);
  setupSignalChannel(callRoomId);
  stopRingtone();
  if (incomingModal) incomingModal.classList.remove("show");
  if (callOverlay) callOverlay.classList.add("show");
  if (callStatus) callStatus.textContent = "Conectando…";
  if (acceptCallBtn) acceptCallBtn.style.display = "none";
  if (hangupBtn) hangupBtn.style.display = "inline-block";
  if (muteBtn) muteBtn.style.display = "inline-block";
  if (switchCamBtn) switchCamBtn.style.display = esVideo ? "inline-block" : "none";
  if (localVideo) { localVideo.srcObject = localStream; localVideo.muted = true; localVideo.style.display = esVideo ? "block" : "none"; localVideo.play().catch(() => {}); }
  if (remoteVideo) remoteVideo.style.display = esVideo ? "block" : "none";
  await crearPeer();
  if (callPollInterval) clearInterval(callPollInterval);
  callPollInterval = setInterval(async () => {
    if (!currentCallId) return;
    const { data } = await supabaseClient.from("zumm_calls").select("estado").eq("id", currentCallId).maybeSingle();
    if (data && (data.estado === "ended" || data.estado === "rejected")) limpiarLlamada();
  }, 2000);
}

if (callBtn) callBtn.addEventListener("click", () => {
  if (!currentRoom || !currentRoom.startsWith("priv:")) { alert("Solo disponible en chats privados."); return; }
  const partes = currentRoom.replace("priv:", "").split("|");
  const otro = partes.find(n => n.toLowerCase() !== username.toLowerCase());
  if (!otro) return;
  startCall(otro, false);
});
if (videoBtn) videoBtn.addEventListener("click", () => {
  if (!currentRoom || !currentRoom.startsWith("priv:")) { alert("Solo disponible en chats privados."); return; }
  const partes = currentRoom.replace("priv:", "").split("|");
  const otro = partes.find(n => n.toLowerCase() !== username.toLowerCase());
  if (!otro) return;
  startCall(otro, true);
});
if (hangupBtn) hangupBtn.addEventListener("click", async () => {
  if (currentCallId) await supabaseClient.from("zumm_calls").update({ estado: "ended" }).eq("id", currentCallId);
  else if (incomingCallId) await supabaseClient.from("zumm_calls").update({ estado: "rejected" }).eq("id", incomingCallId);
  limpiarLlamada();
});
if (rejectBtn) rejectBtn.addEventListener("click", async () => {
  if (incomingCallId) await supabaseClient.from("zumm_calls").update({ estado: "rejected" }).eq("id", incomingCallId);
  limpiarLlamada();
});
if (incomingAcceptBtn) incomingAcceptBtn.addEventListener("click", aceptarLlamada);
if (acceptCallBtn) acceptCallBtn.addEventListener("click", aceptarLlamada);

if (switchCamBtn) switchCamBtn.addEventListener("click", () => {
  if (!localStream) return;
  const videoTrack = localStream.getVideoTracks()[0];
  if (!videoTrack) return;
  const settings = videoTrack.getSettings ? videoTrack.getSettings() : {};
  const facing = settings.facingMode === "user" ? "environment" : "user";
  videoTrack.applyConstraints({ facingMode: facing }).catch(() => {});
});
if (muteBtn) muteBtn.addEventListener("click", () => {
  if (!localStream) return;
  micMuted = !micMuted;
  localStream.getAudioTracks().forEach(t => { t.enabled = !micMuted; });
  muteBtn.textContent = micMuted ? "🔇 Mic" : "🎤 Mic";
  muteBtn.classList.toggle("muted", micMuted);
});

setInterval(async () => {
  if (currentCallId || incomingCallId) return;
  try {
    const { data } = await supabaseClient.from("zumm_calls").select("*")
      .eq("receiver", username).eq("estado", "ringing")
      .order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (!data) return;
    if (Date.now() - new Date(data.created_at).getTime() > 35000) {
      await supabaseClient.from("zumm_calls").update({ estado: "ended" }).eq("id", data.id);
      return;
    }
    incomingCallId = data.id;
    if (incomingModal) incomingModal.classList.add("show");
    if (incomingAvatar) {
      const url = avataresPorUsuario[(data.caller || "").toLowerCase()] || "";
      if (url) { incomingAvatar.style.backgroundImage = "url(" + url + ")"; incomingAvatar.textContent = ""; }
      else { incomingAvatar.style.background = colorForUser(data.caller); incomingAvatar.textContent = avatarLetter(data.caller); }
    }
    if (incomingName) incomingName.textContent = data.caller;
    if (incomingText) incomingText.textContent = data.tipo === "video" ? "📹 Videollamada entrante…" : "📞 Llamada entrante…";
    playRingtone();
  } catch (e) {}
}, 3000);

// ============================================================
// INICIALIZACIÓN
// ============================================================
(async function initApp() {
  try { await cargarBloqueados(); } catch (e) {}
  try { await cargarContactos(); } catch (e) {}
  try { await cargarFavoritos(); } catch (e) {}
  try { await actualizarPresencia(); } catch (e) {}
  showChatList();
  renderChatList();
  actualizarIndicadorDnd();
  actualizarBotonDnd();
  updateSoundBtn();
})();

// ============================================================
// CIERRE AUTOMÁTICO DE MODALES
// ============================================================
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  [chatOptionsModal, muteTimerModal, wallpaperModal, dndModal, forwardModal, filterModal,
   globalSearchModal, sendContactModal, statsModal, groupStatsModal, profileModal,
   favModal, highlightModal, remindersModal, newReminderModal, pollModal,
   blockedModal, contactsModal, soundsModal, editModal].forEach(m => { if (m) m.classList.remove("show"); });
  if (msgMenu) msgMenu.classList.remove("show");
  if (reactionPicker) reactionPicker.classList.remove("show");
  if (configPanel) configPanel.classList.remove("show");
  if (attachMenu) attachMenu.classList.remove("show");
  if (usersPanel) usersPanel.classList.remove("show");
});

// ============================================================
// LIMPIEZA AL CERRAR
// ============================================================
window.addEventListener("beforeunload", () => {
  stopRingtone();
  if (callPollInterval) clearInterval(callPollInterval);
  if (localStream) localStream.getTracks().forEach(t => t.stop());
  try { if (currentRoom && currentRoom !== NOTES_ROOM) enviarPresencia(currentRoom); } catch (e) {}
});

// ============================================================
// ZummChat © 2026 — José Yudier Arencibia Ajo
// ============================================================
