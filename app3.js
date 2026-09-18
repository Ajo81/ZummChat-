const supabaseClient = supabase.createClient(
  "https://gbnmgiaazffhunzwguhu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdibm1naWFhemZmaHVuendndWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1MjMyMTAsImV4cCI6MjEwNTA5OTIxMH0.h7biHjEprLOsxbm4Hgt28psiIHeAEdlTv9LClGPFGRg"
);

const splash = document.getElementById("splash");
setTimeout(() => {
  if (!splash) return;
  splash.classList.add("hidden");
  if (window.stopMatrixRain) window.stopMatrixRain();
  setTimeout(() => splash.remove(), 500);
}, 2000);

const messagesEl   = document.getElementById("messages");
const inputEl      = document.getElementById("messageInput");
const sendBtn      = document.getElementById("sendBtn");
const shareBtn     = document.getElementById("shareBtn");
const chatTitle    = document.getElementById("chat-title");
const privateBtn   = document.getElementById("privateBtn");
const privRoomBar  = document.getElementById("priv-room-bar");
const emojiBtn     = document.getElementById("emojiBtn");
const emojiBar     = document.getElementById("emoji-bar");
const fileBtn      = document.getElementById("fileBtn");
const fileInput    = document.getElementById("fileInput");
const soundBtn     = document.getElementById("soundBtn");
const callBtn      = document.getElementById("callBtn");
const videoBtn     = document.getElementById("videoBtn");

const MAX_SIZE_MB = 5;

let username = localStorage.getItem("zummchat_user");
if (!username) {
  username = prompt("¿Cómo te llamas?");
  if (!username || !username.trim()) username = "Anónimo";
  username = username.trim().substring(0, 20);
  localStorage.setItem("zummchat_user", username);
}

let currentRoom = "general";

// ============ SONIDO ============
let sonidoActivo = localStorage.getItem("zummchat_sonido") !== "off";
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
  if (!soundBtn) return;
  soundBtn.textContent = sonidoActivo ? "🔔" : "🔕";
  soundBtn.title = sonidoActivo ? "Silenciar" : "Activar sonido";
}
updateSoundBtn();

if (soundBtn) {
  soundBtn.addEventListener("click", () => {
    sonidoActivo = !sonidoActivo;
    localStorage.setItem("zummchat_sonido", sonidoActivo ? "on" : "off");
    updateSoundBtn();
    if (sonidoActivo) playBeep();
  });
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
      alert("El archivo pesa más de " + MAX_SIZE_MB + " MB.\nElige uno más pequeño.");
      fileInput.value = "";
      return;
    }

    const ext = file.name.split(".").pop() || "bin";
    const nombreArchivo = Date.now() + "_" + Math.random().toString(36).slice(2, 8) + "." + ext;

    fileBtn.textContent = "⏳";
    fileBtn.disabled = true;

    const { error: upErr } = await supabaseClient
      .storage.from("archivos")
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

    const { data, error } = await supabaseClient
      .from("messages")
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
      const { error } = await supabaseClient.from("messages").delete().eq("id", m.id);
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
  const { data, error } = await supabaseClient
    .from("messages")
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
  renderMessage(data, false);
}

if (sendBtn) sendBtn.addEventListener("click", sendMessage);
if (inputEl) inputEl.addEventListener("keydown", e => { if (e.key === "Enter") sendMessage(); });

supabaseClient
  .channel("messages-realtime")
  .on("postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      payload => renderMessage(payload.new, true))
  .on("postgres_changes",
      { event: "DELETE", schema: "public", table: "messages" },
      payload => { if (payload.old && payload.old.id) removeMessageFromDOM(payload.old.id); })
  .subscribe(status => console.log("Realtime:", status));

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
  if (ringInterval) {
    clearInterval(ringInterval);
    ringInterval = null;
  }
  if (navigator.vibrate) navigator.vibrate(0);
}

// ============ LLAMADAS CON JITSI ============
function crearRoomId(a, b, tipo) {
  const orden = [a.toLowerCase(), b.toLowerCase()].sort();
  return "ZummChat-" + orden[0] + "-" + orden[1] + "-" + tipo + "-" + Date.now();
}

function abrirJitsi(roomId, video) {
  // Jitsi con opciones: sin login, directo a la sala
  const url = "https://meet.jit.si/" + roomId + "#config.prejoinPageEnabled=false&config.startWithAudioMuted=false&config.startWithVideoMuted=" + (video ? "false" : "true");
  window.open(url, "_blank");
}

async function iniciarLlamada(video) {
  const nombreDestino = prompt(
    "¿A quién quieres " + (video ? "videollamar" : "llamar") + "?\n(Escribe su nombre de usuario exacto)"
  );
  if (!nombreDestino || !nombreDestino.trim()) return;

  const destino = nombreDestino.trim().substring(0, 20);

  if (destino.toLowerCase() === username.toLowerCase()) {
    alert("No puedes llamarte a ti mismo 😅");
    return;
  }

  const tipo = video ? "video" : "audio";
  const roomId = crearRoomId(username, destino, tipo);

  // Insertar señal de llamada en Supabase
  const { error } = await supabaseClient
    .from("llamadas")
    .insert([{
      emisor: username,
      receptor: destino,
      tipo: tipo,
      room_id: roomId,
      estado: "llamando"
    }]);

  if (error) {
    alert("No se pudo iniciar la llamada: " + error.message);
    return;
  }

  // El emisor abre Jitsi directamente
  abrirJitsi(roomId, video);

  // Avisar al usuario
  alert("📞 Llamando a " + destino + "...\n\nSe abrió la sala. Espera ahí a que " + destino + " acepte.");
}

// Escuchar señales de llamada entrantes
supabaseClient
  .channel("llamadas-realtime")
  .on("postgres_changes",
      { event: "INSERT", schema: "public", table: "llamadas" },
      payload => {
        const l = payload.new;
        if (!l) return;
        if (l.receptor.toLowerCase() !== username.toLowerCase()) return;
        if (l.estado !== "llamando") return;

        // Verificar que no sea vieja (> 60 segundos)
        const edad = Date.now() - new Date(l.created_at).getTime();
        if (edad > 60000) return;

        mostrarModalEntrante(l.emisor, l.tipo === "video", l.room_id, l.id);
      })
  .subscribe(status => console.log("Llamadas realtime:", status));

let idLlamadaActual = null;

function mostrarModalEntrante(nombre, video, roomId, llamadaId) {
  idLlamadaActual = llamadaId;

  let modal = document.getElementById("incomingModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "incomingModal";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="incoming-name">${video ? "📹" : "📞"} ${nombre}</div>
    <div class="incoming-text">${video ? "Videollamada entrante..." : "Llamada entrante..."}</div>
    <div class="incoming-actions">
      <button id="rejectBtn" title="Rechazar">❌</button>
      <button id="acceptBtn" title="Aceptar">✅</button>
    </div>
  `;

  modal.classList.add("show");
  playRingtone();

  document.getElementById("rejectBtn").onclick = async () => {
    stopRingtone();
    modal.classList.remove("show");
    if (llamadaId) {
      await supabaseClient.from("llamadas").update({ estado: "rechazada" }).eq("id", llamadaId);
    }
  };

  document.getElementById("acceptBtn").onclick = async () => {
    stopRingtone();
    modal.classList.remove("show");
    if (llamadaId) {
      await supabaseClient.from("llamadas").update({ estado: "aceptada" }).eq("id", llamadaId);
    }
    abrirJitsi(roomId, video);
  };
}

if (callBtn) callBtn.addEventListener("click", () => iniciarLlamada(false));
if (videoBtn) videoBtn.addEventListener("click", () => iniciarLlamada(true));

if (chatTitle) chatTitle.textContent = "ZummChat · General";
updateActiveTab();
loadHistory();
