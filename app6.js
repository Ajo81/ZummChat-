// ============================================================
// ZummChat - FASE 3 (app6.js)
// GIFs + Traducción + Stickers personalizados + Canales + Tabs unificadas
// © 2026 José Yudier Arencibia Ajo
// ============================================================

(function () {
  "use strict";

  // ==========================================================
  // TABS DE MEDIA UNIFICADAS (Emoji / Sticker / GIF)
  // ==========================================================
  const TENOR_KEY = "LIVDSRZULELA";

  const mediaTabs = document.getElementById("mediaTabs");
  const stickerBtnViejo = document.getElementById("stickerBtn");
  const stickerBarReal = document.getElementById("sticker-bar");
  const emojiBarReal = document.getElementById("emoji-bar");
  const gifBtnViejo = document.getElementById("gifBtn");
  const emojiBtnReal = document.getElementById("emojiBtn");

  if (stickerBtnViejo) stickerBtnViejo.style.display = "none";
  if (gifBtnViejo) gifBtnViejo.style.display = "none";

  let gifTimeout = null;
  let tabMediaActual = "emoji";

  function mostrarTabMedia(tab) {
    tabMediaActual = tab;
    if (!mediaTabs) return;
    mediaTabs.querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.tab === tab);
    });

    // Ocultar todas las barras
    if (emojiBarReal) emojiBarReal.classList.remove("show");
    if (stickerBarReal) stickerBarReal.classList.remove("show");
    const gifPanel = document.getElementById("gifPanelInBar");
    if (gifPanel) gifPanel.style.display = "none";

    // Mostrar la seleccionada
    if (tab === "emoji") {
      if (emojiBarReal) emojiBarReal.classList.add("show");
    } else if (tab === "sticker") {
      if (stickerBarReal) stickerBarReal.classList.add("show");
    } else if (tab === "gif") {
      if (!gifPanel) {
        const panel = document.createElement("div");
        panel.id = "gifPanelInBar";
        panel.style.cssText = "background:var(--bg-card);border-radius:0 0 10px 10px;padding:8px;margin-bottom:6px;display:flex;flex-direction:column;max-height:300px;";
        panel.innerHTML =
          '<input type="text" id="gifSearchInline" placeholder="🔍 Buscar GIFs..." style="padding:9px 14px;border-radius:20px;border:1px solid var(--border);background:var(--bg-input);color:var(--text);font-size:14px;margin-bottom:6px;outline:none;">' +
          '<div id="gifInlineResults" style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;overflow-y:auto;max-height:230px;padding:2px;"></div>';
        if (mediaTabs && mediaTabs.parentNode) {
          mediaTabs.parentNode.insertBefore(panel, mediaTabs.nextSibling);
        }
        setTimeout(function () {
          const inp = document.getElementById("gifSearchInline");
          if (inp) {
            inp.addEventListener("input", function () {
              clearTimeout(gifTimeout);
              const q = inp.value.trim();
              gifTimeout = setTimeout(function () {
                cargarGifsInline(q);
              }, 500);
            });
          }
          cargarGifsInline("");
        }, 100);
      } else {
        gifPanel.style.display = "flex";
      }
    }
  }

  async function cargarGifsInline(query) {
    const cont = document.getElementById("gifInlineResults");
    if (!cont) return;
    cont.innerHTML = "<p style='text-align:center;color:var(--text-dim);grid-column:1/-1;padding:12px;font-size:12px;'>Cargando...</p>";
    try {
      const base = (query && query.length >= 2)
        ? "https://g.tenor.com/v1/search?q=" + encodeURIComponent(query) + "&key=" + TENOR_KEY + "&limit=20&media_filter=minimal"
        : "https://g.tenor.com/v1/trending?key=" + TENOR_KEY + "&limit=20&media_filter=minimal";
      const r = await fetch(base);
      const data = await r.json();
      const items = data.results || [];
      if (!items.length) {
        cont.innerHTML = "<p style='text-align:center;color:var(--text-muted);grid-column:1/-1;padding:12px;font-size:12px;'>Sin resultados</p>";
        return;
      }
      cont.innerHTML = "";
      items.forEach(function (item) {
        const media = item.media && item.media[0];
        if (!media || !media.tinygif) return;
        const url = media.tinygif.url;
        const fullUrl = (media.gif && media.gif.url) || url;
        const img = document.createElement("img");
        img.src = url;
        img.loading = "lazy";
        img.style.cssText = "width:100%;aspect-ratio:1;object-fit:cover;border-radius:6px;cursor:pointer;background:var(--bg-secondary);";
        img.addEventListener("click", function () {
          enviarGif(fullUrl);
          cerrarMediaTabs();
        });
        cont.appendChild(img);
      });
    } catch (e) {
      cont.innerHTML = "<p style='text-align:center;color:#ff5252;grid-column:1/-1;padding:12px;font-size:12px;'>Error</p>";
    }
  }

  function cerrarMediaTabs() {
    if (mediaTabs) mediaTabs.classList.remove("show");
    if (emojiBarReal) emojiBarReal.classList.remove("show");
    if (stickerBarReal) stickerBarReal.classList.remove("show");
    const gifPanel = document.getElementById("gifPanelInBar");
    if (gifPanel) gifPanel.style.display = "none";
    if (emojiBtnReal) emojiBtnReal.classList.remove("activo");
  }

  if (mediaTabs) {
    mediaTabs.addEventListener("click", function (e) {
      const btn = e.target.closest("button[data-tab]");
      if (!btn) return;
      mostrarTabMedia(btn.dataset.tab);
    });
  }

  if (emojiBtnReal) {
    emojiBtnReal.addEventListener("click", function (e) {
      e.stopPropagation();
      const abierto = mediaTabs && mediaTabs.classList.contains("show");
      if (abierto) {
        cerrarMediaTabs();
      } else {
        if (mediaTabs) mediaTabs.classList.add("show");
        mostrarTabMedia("emoji");
        emojiBtnReal.classList.add("activo");
      }
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
  // TRADUCCIÓN
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
    translateResult.textContent = "Traduciendo...";
    try {
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
  if (translateCancelBtn) translateCancelBtn.addEventListener("click", function () { translateModal.classList.remove("show"); });
  if (translateCopyBtn) translateCopyBtn.addEventListener("click", async function () {
    if (!traduccionActual) return;
    try { await navigator.clipboard.writeText(traduccionActual); alert("📋 Copiado"); } catch (e) {}
  });
  if (translateSendBtn) translateSendBtn.addEventListener("click", async function () {
    if (!traduccionActual || !currentRoom) return;
    try {
      const { data, error } = await supabaseClient.from("zumm_messages")
        .insert([{ text: "🌐 " + traduccionActual, username: username, room: currentRoom }])
        .select().single();
      if (error) { alert("Error: " + error.message); return; }
      if (typeof renderMessage === "function") renderMessage(data, false);
      translateModal.classList.remove("show");
    } catch (e) { alert("Error: " + e.message); }
  });

  const menuTranslateBtn = document.getElementById("menuTranslateBtn");
  if (menuTranslateBtn) {
    menuTranslateBtn.addEventListener("click", function () {
      if (!mensajeMenuActual) return;
      const m = mensajeMenuActual;
      let texto = m.text || "";
      texto = texto.replace(/^\[REPLY:[^\]]+\]\s*/i, "").replace(/^\[FORWARD\]\s*/i, "");
      if (texto.startsWith("[STICKER]") || texto.startsWith("[GIF]") || texto.startsWith("[IMGSTICKER]")) {
        alert("No se puede traducir este tipo de mensaje."); return;
      }
      if (!texto.trim()) { alert("Este mensaje no tiene texto."); return; }
      cerrarMenu();
      setTimeout(function () { window.abrirTraduccion(texto); }, 150);
    });
  }

  // ==========================================================
  // STICKERS PERSONALIZADOS
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

  if (myStickersBtn) myStickersBtn.addEventListener("click", function () {
    cerrarPaneles();
    stickerManagerModal.classList.add("show");
    renderMisStickers();
  });
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
      del.className = "sticker-del"; del.textContent = "✕";
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
      } catch (e) { alert("Error: " + e.message); }
      finally {
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
  // RENDERIZAR GIF y STICKERS PERSONALIZADOS
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
  // CANALES
  // ==========================================================
  const newChannelBtn = document.getElementById("newChannelBtn");
  const newChannelModal = document.getElementById("newChannelModal");
  const channelName = document.getElementById("channelName");
  const channelDesc = document.getElementById("channelDesc");
  const newChannelCancelBtn = document.getElementById("newChannelCancelBtn");
  const newChannelSaveBtn = document.getElementById("newChannelSaveBtn");
  const channelReadOnly = document.getElementById("channelReadOnly");
  const inputAreaReal = document.getElementById("input-area");

  if (newChannelBtn) newChannelBtn.addEventListener("click", function () {
    channelName.value = "";
    channelDesc.value = "";
    newChannelModal.classList.add("show");
  });
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
      const misCanales = JSON.parse(localStorage.getItem("zummchat_mis_canales") || "[]");
      if (misCanales.some(function (c) { return c.nombre === nombre; })) {
        alert("Ya tienes un canal con ese nombre."); return;
      }
      misCanales.push({ nombre: nombre, desc: desc, creador: username, fecha: Date.now() });
      localStorage.setItem("zummchat_mis_canales", JSON.stringify(misCanales));
      try {
        await supabaseClient.from("zumm_grupos").insert([{
          nombre: "canal-" + nombre, password: null, creador: username
        }]);
      } catch (e) {}
      newChannelModal.classList.remove("show");
      alert("✅ Canal '" + nombre + "' creado\n\nSolo tú puedes publicar aquí.");
      if (typeof switchRoom === "function") switchRoom("canal:" + nombre);
    } catch (e) { alert("Error: " + e.message); }
    finally {
      newChannelSaveBtn.textContent = "Crear canal";
      newChannelSaveBtn.disabled = false;
    }
  });

  function actualizarModoCanal() {
    if (!currentRoom || !currentRoom.startsWith("canal:")) {
      if (channelReadOnly) channelReadOnly.style.display = "none";
      if (inputAreaReal) inputAreaReal.classList.remove("readonly");
      return;
    }
    const nombreCanal = currentRoom.replace("canal:", "");
    const misCanales = JSON.parse(localStorage.getItem("zummchat_mis_canales") || "[]");
    const esMio = misCanales.some(function (c) {
      return c.nombre === nombreCanal && c.creador.toLowerCase() === username.toLowerCase();
    });
    if (esMio) {
      if (channelReadOnly) channelReadOnly.style.display = "none";
      if (inputAreaReal) inputAreaReal.classList.remove("readonly");
    } else {
      if (channelReadOnly) channelReadOnly.style.display = "block";
      if (inputAreaReal) inputAreaReal.classList.add("readonly");
    }
  }

  const _switchRoomOrig = window.switchRoom;
  window.switchRoom = function (room) {
    _switchRoomOrig(room);
    setTimeout(actualizarModoCanal, 100);
  };

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
      info.appendChild(name); info.appendChild(preview);
      li.appendChild(avatar); li.appendChild(info);
      li.addEventListener("click", function () {
        if (typeof switchRoom === "function") switchRoom("canal:" + c.nombre);
      });
      chatListEl.insertBefore(li, chatListEl.firstChild);
    });
  }

  const ieStickerBtn = document.getElementById("ieStickerBtn");
  if (ieStickerBtn) {
    ieStickerBtn.addEventListener("click", function () {
      alert("💡 Truco: guarda esta imagen como sticker desde:\n\n⚙️ → ⭐ Mis stickers → ➕ Crear sticker");
    });
  }

  setTimeout(function () {
    pintarCanalesEnLista();
    actualizarModoCanal();
  }, 3500);

})();
