// ============================================================
// ZummChat - FASE 3 (app6.js)
// GIFs + Traducción + Stickers personalizados + Canales
// © 2026 José Yudier Arencibia Ajo
// ============================================================

(function () {
  "use strict";

  // ==========================================================
  // 1) GIFs (Tenor API pública)
  // ==========================================================
  const TENOR_KEY = "LIVDSRZULELA"; // clave demo pública
  const gifBtn = document.getElementById("gifBtn");
  const gifPickerModal = document.getElementById("gifPickerModal");
  const gifCloseBtn = document.getElementById("gifCloseBtn");
  const gifSearchInput = document.getElementById("gifSearchInput");
  const gifResults = document.getElementById("gifResults");

  let gifTimeout = null;

  if (gifBtn) {
    gifBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (emojiBar) emojiBar.classList.remove("show");
      if (stickerBar) stickerBar.classList.remove("show");
      gifPickerModal.classList.add("show");
      cargarGifsTrending();
    });
  }

  if (gifCloseBtn) {
    gifCloseBtn.addEventListener("click", function () {
      gifPickerModal.classList.remove("show");
    });
  }

  if (gifSearchInput) {
    gifSearchInput.addEventListener("input", function () {
      clearTimeout(gifTimeout);
      const q = gifSearchInput.value.trim();
      gifTimeout = setTimeout(function () {
        if (q.length < 2) cargarGifsTrending();
        else buscarGifs(q);
      }, 500);
    });
  }

  async function cargarGifsTrending() {
    gifResults.innerHTML = "<p style='text-align:center;color:var(--text-dim);padding:20px;grid-column:1/-1;'>Cargando GIFs...</p>";
    try {
      const r = await fetch("https://g.tenor.com/v1/trending?key=" + TENOR_KEY + "&limit=20&media_filter=minimal");
      const data = await r.json();
      pintarGifs(data.results || []);
    } catch (e) {
      gifResults.innerHTML = "<p style='text-align:center;color:#ff5252;padding:20px;grid-column:1/-1;'>Error al cargar GIFs</p>";
    }
  }

  async function buscarGifs(query) {
    gifResults.innerHTML = "<p style='text-align:center;color:var(--text-dim);padding:20px;grid-column:1/-1;'>Buscando...</p>";
    try {
      const r = await fetch("https://g.tenor.com/v1/search?q=" + encodeURIComponent(query) + "&key=" + TENOR_KEY + "&limit=20&media_filter=minimal");
      const data = await r.json();
      pintarGifs(data.results || []);
    } catch (e) {
      gifResults.innerHTML = "<p style='text-align:center;color:#ff5252;padding:20px;grid-column:1/-1;'>Error</p>";
    }
  }

  function pintarGifs(items) {
    if (!items.length) {
      gifResults.innerHTML = "<p style='text-align:center;color:var(--text-muted);padding:20px;grid-column:1/-1;'>Sin resultados</p>";
      return;
    }
    gifResults.innerHTML = "";
    items.forEach(function (item) {
      const media = item.media && item.media[0];
      if (!media || !media.tinygif) return;
      const url = media.tinygif.url;
      const fullUrl = (media.gif && media.gif.url) || url;
      const div = document.createElement("div");
      div.className = "gif-item";
      const img = document.createElement("img");
      img.src = url;
      img.loading = "lazy";
      div.appendChild(img);
      div.addEventListener("click", function () {
        enviarGif(fullUrl);
        gifPickerModal.classList.remove("show");
        gifSearchInput.value = "";
      });
      gifResults.appendChild(div);
    });
  }

  async function enviarGif(url) {
    if (!currentRoom) return;
    try {
      const texto = "[GIF]" + url + "[/GIF]";
      const { data, error } = await supabaseClient.from("zumm_messages")
        .insert([{ text: texto, username: username, room: currentRoom }])
        .select().single();
      if (error) { alert("Error: " + error.message); return; }
      if (typeof renderMessage === "function") renderMessage(data, false);
    } catch (e) { alert("Error: " + e.message); }
  }

  // ==========================================================
  // 2) TRADUCCIÓN AUTOMÁTICA (MyMemory API - gratis)
  // ==========================================================
  const translateModal = document.getElementById("translateModal");
  const translateOriginal = document.getElementById("translateOriginal");
  const translateResult = document.getElementById("translateResult");
  const translateLang = document.getElementById("translateLang");
  const translateCancelBtn = document.getElementById("translateCancelBtn");
  const translateCopyBtn = document.getElementById("translateCopyBtn");
  const translateSendBtn = document.getElementById("translateSendBtn");

  let textoParaTraducir = "";
  let traduccionActual = "";
  let idiomaDestinoActual = "en";

  window.abrirTraduccion = function (texto) {
    if (!translateModal || !texto) return;
    textoParaTraducir = texto;
    translateOriginal.textContent = texto;
    translateResult.textContent = "Traduciendo...";
    traduccionActual = "";
    translateModal.classList.add("show");
    traducirTexto(texto, translateLang.value || "en");
  };

  async function traducirTexto(texto, destino) {
    idiomaDestinoActual = destino;
    translateResult.textContent = "Traduciendo...";
    try {
      // Detectar idioma origen (por defecto español)
      const r = await fetch("https://api.mymemory.translated.net/get?q=" + encodeURIComponent(texto) + "&langpair=es|" + destino);
      const data = await r.json();
      if (data && data.responseData && data.responseData.translatedText) {
        traduccionActual = data.responseData.translatedText;
        translateResult.textContent = traduccionActual;
      } else {
        translateResult.textContent = "(No se pudo traducir)";
      }
    } catch (e) {
      translateResult.textContent = "Error: " + e.message;
    }
  }

  if (translateLang) {
    translateLang.addEventListener("change", function () {
      if (textoParaTraducir) traducirTexto(textoParaTraducir, translateLang.value);
    });
  }

  if (translateCancelBtn) translateCancelBtn.addEventListener("click", function () {
    translateModal.classList.remove("show");
  });

  if (translateCopyBtn) translateCopyBtn.addEventListener("click", async function () {
    if (!traduccionActual) return;
    try { await navigator.clipboard.writeText(traduccionActual); alert("📋 Copiado"); } catch (e) {}
  });

  if (translateSendBtn) translateSendBtn.addEventListener("click", async function () {
    if (!traduccionActual || !currentRoom) return;
    try {
      const texto = "🌐 " + traduccionActual;
      const { data, error } = await supabaseClient.from("zumm_messages")
        .insert([{ text: texto, username: username, room: currentRoom }])
        .select().single();
      if (error) { alert("Error: " + error.message); return; }
      if (typeof renderMessage === "function") renderMessage(data, false);
      translateModal.classList.remove("show");
    } catch (e) { alert("Error: " + e.message); }
  });

  // Añadir botón al menú de mensajes
  const menuTranslateBtn = document.getElementById("menuTranslateBtn");
  if (menuTranslateBtn) {
    menuTranslateBtn.addEventListener("click", function () {
      if (!mensajeMenuActual) return;
      const m = mensajeMenuActual;
      let texto = m.text || "";
      // Limpiar reply/forward
      texto = texto.replace(/^\[REPLY:[^\]]+\]\s*/i, "").replace(/^\[FORWARD\]\s*/i, "");
      // Ignorar stickers y gifs
      if (texto.startsWith("[STICKER]") || texto.startsWith("[GIF]") || texto.startsWith("[IMGSTICKER]")) {
        alert("No se puede traducir este tipo de mensaje.");
        return;
      }
      if (!texto.trim()) { alert("Este mensaje no tiene texto."); return; }
      cerrarMenu();
      setTimeout(function () { window.abrirTraduccion(texto); }, 150);
    });
  }

  // ==========================================================
  // 3) STICKERS PERSONALIZADOS
  // ==========================================================
  const myStickersBtn = document.getElementById("myStickersBtn");
  const stickerManagerModal = document.getElementById("stickerManagerModal");
  const myStickersGrid = document.getElementById("myStickersGrid");
  const myStickersEmpty = document.getElementById("myStickersEmpty");
  const stickerManagerCloseBtn = document.getElementById("stickerManagerCloseBtn");
  const newStickerBtn = document.getElementById("newStickerBtn");
  const newStickerModal = document.getElementById("newStickerModal");
  const newStickerName = document.getElementById("newStickerName");
  const newStickerPickBtn = document.getElementById("newStickerPickBtn");
  const newStickerInput = document.getElementById("newStickerInput");
  const newStickerPreview = document.getElementById("newStickerPreview");
  const newStickerCancelBtn = document.getElementById("newStickerCancelBtn");
  const newStickerSaveBtn = document.getElementById("newStickerSaveBtn");

  let archivoStickerNuevo = null;

  function cargarMisStickers() {
    try { return JSON.parse(localStorage.getItem("zummchat_mis_stickers") || "[]"); }
    catch (e) { return []; }
  }
  function guardarMisStickers(lista) {
    try { localStorage.setItem("zummchat_mis_stickers", JSON.stringify(lista)); } catch (e) {}
  }

  if (myStickersBtn) {
    myStickersBtn.addEventListener("click", function () {
      cerrarPaneles();
      stickerManagerModal.classList.add("show");
      renderMisStickers();
    });
  }

  if (stickerManagerCloseBtn) stickerManagerCloseBtn.addEventListener("click", function () {
    stickerManagerModal.classList.remove("show");
  });

  function renderMisStickers() {
    if (!myStickersGrid) return;
    const lista = cargarMisStickers();
    myStickersGrid.innerHTML = "";
    if (lista.length === 0) {
      if (myStickersEmpty) myStickersEmpty.style.display = "block";
      return;
    }
    if (myStickersEmpty) myStickersEmpty.style.display = "none";
    lista.forEach(function (st, i) {
      const div = document.createElement("div");
      div.className = "my-sticker-item";
      const img = document.createElement("img");
      img.src = st.url; img.alt = st.name;
      div.appendChild(img);
      const del = document.createElement("button");
      del.className = "sticker-del";
      del.textContent = "✕";
      del.addEventListener("click", function (e) {
        e.stopPropagation();
        if (!confirm("¿Borrar sticker '" + st.name + "'?")) return;
        lista.splice(i, 1);
        guardarMisStickers(lista);
        renderMisStickers();
      });
      div.appendChild(del);
      div.addEventListener("click", function () {
        enviarStickerPersonalizado(st.url);
        stickerManagerModal.classList.remove("show");
      });
      myStickersGrid.appendChild(div);
    });
  }

  if (newStickerBtn) newStickerBtn.addEventListener("click", function () {
    newStickerName.value = "";
    newStickerPreview.innerHTML = "";
    archivoStickerNuevo = null;
    newStickerModal.classList.add("show");
  });

  if (newStickerCancelBtn) newStickerCancelBtn.addEventListener("click", function () {
    newStickerModal.classList.remove("show");
  });

  if (newStickerPickBtn) newStickerPickBtn.addEventListener("click", function () {
    if (newStickerInput) newStickerInput.click();
  });

  if (newStickerInput) {
    newStickerInput.addEventListener("change", function () {
      const file = newStickerInput.files[0];
      if (!file) return;
      archivoStickerNuevo = file;
      const reader = new FileReader();
      reader.onload = function (e) {
        newStickerPreview.innerHTML = '<img src="' + e.target.result + '" alt="preview">';
      };
      reader.readAsDataURL(file);
    });
  }

  if (newStickerSaveBtn) {
    newStickerSaveBtn.addEventListener("click", async function () {
      const nombre = (newStickerName.value || "").trim();
      if (!nombre) { alert("Ponle un nombre al sticker."); return; }
      if (!archivoStickerNuevo) { alert("Elige una imagen primero."); return; }
      newStickerSaveBtn.textContent = "Subiendo...";
      newStickerSaveBtn.disabled = true;
      try {
        const ext = (archivoStickerNuevo.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
        const nombreArchivo = "sticker_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6) + "." + ext;
        const { error: upErr } = await supabaseClient.storage.from("archivos")
          .upload(nombreArchivo, archivoStickerNuevo, { contentType: archivoStickerNuevo.type || "image/png" });
        if (upErr) { alert("Error al subir: " + upErr.message); return; }
        const { data: urlData } = supabaseClient.storage.from("archivos").getPublicUrl(nombreArchivo);
        const lista = cargarMisStickers();
        lista.push({ id: Date.now(), name: nombre, url: urlData.publicUrl });
        guardarMisStickers(lista);
        alert("✅ Sticker creado");
        newStickerModal.classList.remove("show");
        renderMisStickers();
      } catch (e) {
        alert("Error: " + e.message);
      } finally {
        newStickerSaveBtn.textContent = "Guardar";
        newStickerSaveBtn.disabled = false;
      }
    });
  }

  async function enviarStickerPersonalizado(url) {
    if (!currentRoom) return;
    try {
      const texto = "[IMGSTICKER]" + url + "[/IMGSTICKER]";
      const { data, error } = await supabaseClient.from("zumm_messages")
        .insert([{ text: texto, username: username, room: currentRoom }])
        .select().single();
      if (error) { alert("Error: " + error.message); return; }
      if (typeof renderMessage === "function") renderMessage(data, false);
    } catch (e) { alert("Error: " + e.message); }
  }

  // ==========================================================
  // 4) RENDERIZAR GIF y STICKERS PERSONALIZADOS
  // ==========================================================
  const _renderOrig6 = window.renderMessage;
  window.renderMessage = function (m, esNuevo) {
    _renderOrig6(m, esNuevo);
    if (!messagesEl || !m || !m.id) return;
    const div = messagesEl.querySelector('[data-msg-id="' + m.id + '"]');
    if (!div) return;

    const body = div.querySelector(".msg-body");
    if (!body) return;

    const txt = (m.text || "");

    // GIF
    const gifMatch = txt.match(/^\[GIF\](.+)\[\/GIF\]$/);
    if (gifMatch && !body.dataset.gifRender) {
      body.dataset.gifRender = "1";
      body.innerHTML = "";
      const img = document.createElement("img");
      img.className = "msg-gif";
      img.src = gifMatch[1];
      img.loading = "lazy";
      body.appendChild(img);
      return;
    }

    // Sticker personalizado
    const stMatch = txt.match(/^\[IMGSTICKER\](.+)\[\/IMGSTICKER\]$/);
    if (stMatch && !body.dataset.stickerRender) {
      body.dataset.stickerRender = "1";
      body.innerHTML = "";
      const img = document.createElement("img");
      img.className = "msg-custom-sticker";
      img.src = stMatch[1];
      img.loading = "lazy";
      body.appendChild(img);
      return;
    }
  };

  // ==========================================================
  // 5) CANALES / DIFUSIÓN
  // ==========================================================
  const newChannelBtn = document.getElementById("newChannelBtn");
  const newChannelModal = document.getElementById("newChannelModal");
  const channelName = document.getElementById("channelName");
  const channelDesc = document.getElementById("channelDesc");
  const newChannelCancelBtn = document.getElementById("newChannelCancelBtn");
  const newChannelSaveBtn = document.getElementById("newChannelSaveBtn");
  const channelReadOnly = document.getElementById("channelReadOnly");
  const inputArea = document.getElementById("input-area");

  if (newChannelBtn) {
    newChannelBtn.addEventListener("click", function () {
      channelName.value = "";
      channelDesc.value = "";
      newChannelModal.classList.add("show");
    });
  }

  if (newChannelCancelBtn) newChannelCancelBtn.addEventListener("click", function () {
    newChannelModal.classList.remove("show");
  });

  if (newChannelSaveBtn) newChannelSaveBtn.addEventListener("click", async function () {
    const nombre = (channelName.value || "").trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "").substring(0, 30);
    const desc = (channelDesc.value || "").trim().substring(0, 80);
    if (!nombre) { alert("Ponle un nombre al canal."); return; }
    newChannelSaveBtn.textContent = "Creando...";
    newChannelSaveBtn.disabled = true;
    try {
      // Guardar en localStorage: lista de canales creados por mí
      const misCanales = JSON.parse(localStorage.getItem("zummchat_mis_canales") || "[]");
      if (misCanales.some(function (c) { return c.nombre === nombre; })) {
        alert("Ya tienes un canal con ese nombre.");
        return;
      }
      misCanales.push({ nombre: nombre, desc: desc, creador: username, fecha: Date.now() });
      localStorage.setItem("zummchat_mis_canales", JSON.stringify(misCanales));

      // Guardar en zumm_grupos con password null pero con un campo "tipo"
      // para que otros usuarios puedan encontrarlo
      const { error } = await supabaseClient.from("zumm_grupos").insert([{
        nombre: "canal-" + nombre,
        password: null,
        creador: username
      }]);
      if (error && !error.message.includes("duplicate")) {
        // Si falla, no es crítico, seguimos
      }

      newChannelModal.classList.remove("show");
      alert("✅ Canal '" + nombre + "' creado\n\nSolo tú puedes publicar aquí.");
      switchRoom("canal:" + nombre);
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      newChannelSaveBtn.textContent = "Crear canal";
      newChannelSaveBtn.disabled = false;
    }
  });

  // Detectar si estoy en un canal y aplicar solo lectura
  function actualizarModoCanal() {
    if (!currentRoom || !currentRoom.startsWith("canal:")) {
      if (channelReadOnly) channelReadOnly.style.display = "none";
      if (inputArea) inputArea.classList.remove("readonly");
      return;
    }
    const nombreCanal = currentRoom.replace("canal:", "");
    const misCanales = JSON.parse(localStorage.getItem("zummchat_mis_canales") || "[]");
    const esMio = misCanales.some(function (c) {
      return c.nombre === nombreCanal && c.creador.toLowerCase() === username.toLowerCase();
    });
    if (esMio) {
      if (channelReadOnly) channelReadOnly.style.display = "none";
      if (inputArea) inputArea.classList.remove("readonly");
    } else {
      if (channelReadOnly) channelReadOnly.style.display = "block";
      if (inputArea) inputArea.classList.add("readonly");
    }
  }

  // Hook a switchRoom para actualizar el modo canal
  const _switchRoomOrig = window.switchRoom;
  window.switchRoom = function (room) {
    _switchRoomOrig(room);
    setTimeout(actualizarModoCanal, 100);
  };

  // Hook a renderChatList para añadir canales
  const _renderChatListOrig = window.renderChatList;
  window.renderChatList = async function () {
    await _renderChatListOrig();
    setTimeout(pintarCanalesEnLista, 150);
  };

  function pintarCanalesEnLista() {
    const chatListEl = document.getElementById("chat-list");
    if (!chatListEl) return;
    const misCanales = JSON.parse(localStorage.getItem("zummchat_mis_canales") || "[]");
    if (misCanales.length === 0) return;

    misCanales.forEach(function (c) {
      // Verificar que no esté ya pintado
      const existe = Array.from(chatListEl.querySelectorAll(".chat-item")).some(function (li) {
        return li.dataset.canalRoom === "canal:" + c.nombre;
      });
      if (existe) return;

      const li = document.createElement("li");
      li.className = "chat-item canal-item";
      li.dataset.canalRoom = "canal:" + c.nombre;

      const avatar = document.createElement("div");
      avatar.className = "chat-avatar";
      avatar.textContent = "📢";

      const info = document.createElement("div");
      info.className = "chat-info";
      const name = document.createElement("div");
      name.className = "chat-name";
      name.textContent = c.nombre;
      const badge = document.createElement("span");
      badge.className = "canal-badge";
      badge.textContent = "CANAL";
      name.appendChild(badge);

      const preview = document.createElement("div");
      preview.className = "chat-preview";
      preview.textContent = c.desc || "Canal de difusión";

      info.appendChild(name);
      info.appendChild(preview);
      li.appendChild(avatar);
      li.appendChild(info);

      li.addEventListener("click", function () {
        if (typeof switchRoom === "function") switchRoom("canal:" + c.nombre);
      });

      chatListEl.insertBefore(li, chatListEl.firstChild);
    });
  }

  // ==========================================================
  // 6) BOTÓN DE STICKER PERSONALIZADO EN EL EDITOR DE IMAGEN
  // ==========================================================
  const ieStickerBtn = document.getElementById("ieStickerBtn");
  if (ieStickerBtn) {
    ieStickerBtn.addEventListener("click", function () {
      alert("💡 Truco: guarda esta imagen como sticker desde:\n\n⚙️ → ⭐ Mis stickers → ➕ Crear sticker");
    });
  }

  // ==========================================================
  // 7) INICIALIZACIÓN
  // ==========================================================
  setTimeout(function () {
    pintarCanalesEnLista();
    actualizarModoCanal();
  }, 3500);

})();
