// ============================================================
// ZummChat - Mejoras WhatsApp (app4.js)
// © 2026 José Yudier Arencibia Ajo
// ============================================================

(function () {
  "use strict";

  const mensajesPorId = new Map();
  const _renderOriginal = window.renderMessage;

  function mensajeLeido(m) {
    if (!m || !m.username) return false;
    if (m.username.toLowerCase() !== username.toLowerCase()) return false;
    if (typeof usersOnline === "undefined" || !usersOnline || usersOnline.length === 0) return false;
    const miUser = username.toLowerCase();
    if (currentRoom && currentRoom.startsWith("priv:")) {
      const partes = currentRoom.replace("priv:", "").split("|");
      const otro = partes.find(function (n) { return n.toLowerCase() !== miUser; });
      if (!otro) return false;
      return usersOnline.some(function (u) { return u.toLowerCase() === otro.toLowerCase(); });
    }
    return usersOnline.some(function (u) { return u.toLowerCase() !== miUser; });
  }

  function esSoloEmoji(texto) {
    if (!texto) return false;
    const limpio = texto.trim();
    if (limpio.length === 0 || limpio.length > 12) return false;
    try {
      const regex = /^[\p{Extended_Pictographic}\p{Emoji_Component}\u200d\ufe0f\s]+$/u;
      return regex.test(limpio);
    } catch (e) {
      return /^[\u2600-\u27BF\uD83C-\uDBFF\uDC00-\uDFFF\s]+$/.test(limpio);
    }
  }

  function extraerPrimeraUrl(texto) {
    if (!texto) return null;
    const m = texto.match(/https?:\/\/[^\s<>"']+/);
    return m ? m[0] : null;
  }

  window.renderMessage = function (m, esNuevo) {
    _renderOriginal(m, esNuevo);

    if (!messagesEl || !m || !m.id) return;
    const div = messagesEl.querySelector('[data-msg-id="' + m.id + '"]');
    if (!div) return;

    const esMio = (m.username || "").toLowerCase() === username.toLowerCase();
    const esBot = (m.username === BOT_NAME);

    div.classList.add(esMio ? "mio" : "otro");
    mensajesPorId.set(m.id, m);

    const content = div.querySelector(".msg-content");
    const header = div.querySelector(".msg-header");
    if (content && header) {
      const viejo = header.querySelector(".msg-right");
      if (viejo) viejo.remove();

      if (!content.querySelector(".msg-footer")) {
        const footer = document.createElement("div");
        footer.className = "msg-footer";

        if (m.edited_at) {
          const ed = document.createElement("span");
          ed.className = "msg-edited";
          ed.textContent = "(editado)";
          footer.appendChild(ed);
        }

        const t = document.createElement("span");
        t.className = "msg-time";
        t.textContent = formatTime(m.created_at);
        footer.appendChild(t);

        if (esMio && !esBot) {
          const chk = document.createElement("span");
          chk.className = "msg-checks";
          chk.textContent = "✓✓";
          chk.classList.toggle("leido", mensajeLeido(m));
          footer.appendChild(chk);
        }

        content.appendChild(footer);
      }
    }

    const body = div.querySelector(".msg-body");
    if (body && !body.querySelector("img, video, audio, .poll-box, .location-msg, .voice-note")) {
      if (esSoloEmoji(body.textContent)) {
        body.classList.add("emoji-only");
      }
    }

    if (!div.querySelector(".swipe-indicator")) {
      const sw = document.createElement("div");
      sw.className = "swipe-indicator";
      sw.textContent = "↩️";
      div.insertBefore(sw, div.firstChild);
    }

    if (!div.dataset.gestosListos) {
      div.dataset.gestosListos = "1";

      let touchStartX = 0, touchStartY = 0;
      let isSwiping = false, swipeReady = false;
      let lastTapTime = 0;

      div.addEventListener("touchstart", function (e) {
        if (modoSeleccion) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = false;
        swipeReady = false;
      }, { passive: true });

      div.addEventListener("touchmove", function (e) {
        if (modoSeleccion) return;
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        if (Math.abs(dy) > 25) { isSwiping = false; return; }
        if (dx > 10 && Math.abs(dy) < 25) {
          isSwiping = true;
          div.classList.add("swiping");
          const offset = Math.min(dx, 80);
          div.style.transform = "translateX(" + offset + "px)";
          if (offset > 55) {
            div.classList.add("swipe-ready");
            swipeReady = true;
          } else {
            div.classList.remove("swipe-ready");
            swipeReady = false;
          }
        }
      }, { passive: true });

      div.addEventListener("touchend", function (e) {
        if (modoSeleccion) return;

        if (isSwiping) {
          div.classList.remove("swiping");
          if (swipeReady) {
            mostrarReplyBar(m);
            if (navigator.vibrate) navigator.vibrate(30);
          }
          div.style.transform = "";
          setTimeout(function () { div.classList.remove("swipe-ready"); }, 250);
          isSwiping = false;
          swipeReady = false;
          return;
        }

        const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
        const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
        if (dx > 10 || dy > 10) return;

        const now = Date.now();
        if (now - lastTapTime < 300) {
          toggleReaccion(m.id, "❤️");
          const heart = document.createElement("div");
          heart.className = "double-tap-heart";
          heart.textContent = "❤️";
          div.appendChild(heart);
          setTimeout(function () { heart.remove(); }, 800);
          if (navigator.vibrate) navigator.vibrate(20);
          lastTapTime = 0;
        } else {
          lastTapTime = now;
        }
      });
    }

    if (!esBot && m.text && !div.querySelector(".link-preview") && !div.dataset.previewHecha) {
      const url = extraerPrimeraUrl(m.text.replace(/^\[REPLY:[^\]]+\]\s*/i, "").replace(/^\[FORWARD\]\s*/i, ""));
      if (url) {
        div.dataset.previewHecha = "1";
        cargarLinkPreview(url, content, m.id);
      }
    }
  };

  setInterval(function () {
    if (!messagesEl) return;
    messagesEl.querySelectorAll(".msg.mio .msg-checks").forEach(function (chk) {
      const el = chk.closest(".msg");
      if (!el) return;
      const m = mensajesPorId.get(el.dataset.msgId);
      if (!m) return;
      chk.classList.toggle("leido", mensajeLeido(m));
    });
  }, 4000);

  const typingBubble = document.createElement("div");
  typingBubble.className = "msg typing-bubble otro";
  typingBubble.style.display = "none";
  typingBubble.innerHTML =
    '<div class="msg-body">' +
    '<span class="typing-dot"></span>' +
    '<span class="typing-dot"></span>' +
    '<span class="typing-dot"></span>' +
    '</div>';

  window.actualizarIndicadorTyping = function (usuariosTyping) {
    if (usuariosTyping && usuariosTyping.length > 0) {
      if (messagesEl && typingBubble.parentNode !== messagesEl) {
        messagesEl.appendChild(typingBubble);
      }
      typingBubble.style.display = "flex";
      if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
    } else {
      typingBubble.style.display = "none";
    }
  };

  // ==========================================================
  // VISTA PREVIA DE LINKS
  // ==========================================================
  const linkPreviewCache = JSON.parse(localStorage.getItem("zummchat_linkpreviews") || "{}");
  function guardarCacheLinks() {
    try { localStorage.setItem("zummchat_linkpreviews", JSON.stringify(linkPreviewCache)); } catch (e) {}
  }

  async function cargarLinkPreview(url, contentDiv, msgId) {
    if (linkPreviewCache[url] && linkPreviewCache[url].data) {
      pintarLinkPreview(contentDiv, url, linkPreviewCache[url].data);
      return;
    }
    if (linkPreviewCache[url] && linkPreviewCache[url].loading) return;
    linkPreviewCache[url] = { loading: true };

    const placeholder = document.createElement("div");
    placeholder.className = "link-preview";
    placeholder.innerHTML = '<div class="link-preview-loading">Cargando vista previa...</div>';
    contentDiv.appendChild(placeholder);

    try {
      const endpoint = "https://api.microlink.io/?url=" + encodeURIComponent(url) + "&meta=true";
      const r = await fetch(endpoint);
      const json = await r.json();
      if (json.status === "success" && json.data) {
        const data = {
          title: json.data.title || "",
          description: json.data.description || "",
          image: (json.data.image && json.data.image.url) || "",
          domain: json.data.publisher || (new URL(url)).hostname.replace("www.", "")
        };
        linkPreviewCache[url] = { data: data };
        guardarCacheLinks();
        placeholder.remove();
        pintarLinkPreview(contentDiv, url, data);
      } else {
        linkPreviewCache[url] = { data: null };
        placeholder.remove();
      }
    } catch (e) {
      linkPreviewCache[url] = { data: null };
      placeholder.remove();
    }
  }

  function pintarLinkPreview(contentDiv, url, data) {
    if (contentDiv.querySelector(".link-preview")) return;
    const box = document.createElement("a");
    box.href = url;
    box.target = "_blank";
    box.rel = "noopener noreferrer";
    box.className = "link-preview";

    if (data.image) {
      const img = document.createElement("img");
      img.className = "link-preview-img";
      img.src = data.image;
      img.loading = "lazy";
      img.onerror = function () { img.remove(); };
      box.appendChild(img);
    }

    const body = document.createElement("div");
    body.className = "link-preview-body";

    if (data.title) {
      const t = document.createElement("div");
      t.className = "link-preview-title";
      t.textContent = data.title;
      body.appendChild(t);
    }
    if (data.description) {
      const d = document.createElement("div");
      d.className = "link-preview-desc";
      d.textContent = data.description;
      body.appendChild(d);
    }
    const dom = document.createElement("div");
    dom.className = "link-preview-domain";
    dom.textContent = "🔗 " + (data.domain || "link");
    body.appendChild(dom);

    box.appendChild(body);
    contentDiv.appendChild(box);
  }

  // ==========================================================
  // BÚSQUEDA EN GALERÍA + CONTADORES
  // ==========================================================
  const gallerySearch = document.getElementById("gallerySearch");
  const gallerySearchClear = document.getElementById("gallerySearchClear");
  let busquedaGaleria = "";

  const _abrirGaleriaOrig = window.abrirGaleria;
  window.abrirGaleria = async function (room, nombre) {
    busquedaGaleria = "";
    if (gallerySearch) gallerySearch.value = "";
    if (gallerySearchClear) gallerySearchClear.classList.remove("show");
    await _abrirGaleriaOrig(room, nombre);
    actualizarContadoresTabs();
  };

  const _renderGaleriaOrig = window.renderGaleria;
  window.renderGaleria = function () {
    if (typeof _renderGaleriaOrig === "function") _renderGaleriaOrig();
    setTimeout(actualizarContadoresTabs, 30);
    setTimeout(aplicarFiltroBusquedaGaleria, 40);
  };

  function actualizarContadoresTabs() {
    if (typeof galleryItems === "undefined" || !Array.isArray(galleryItems)) return;
    const tabs = document.querySelectorAll("#galleryTabs button");
    if (!tabs.length) return;

    const conteos = { image: 0, video: 0, audio: 0, doc: 0, link: 0 };
    galleryItems.forEach(function (it) {
      const cat = clasificarItemLocal(it);
      if (conteos[cat] !== undefined) conteos[cat]++;
    });

    const etiquetas = {
      image: "📷 Fotos",
      video: "🎬 Videos",
      audio: "🎤 Audio",
      doc: "📄 Docs",
      link: "🔗 Links"
    };

    tabs.forEach(function (btn) {
      const cat = btn.dataset.tab;
      const base = etiquetas[cat] || cat;
      const n = conteos[cat] || 0;
      btn.innerHTML = base + (n > 0 ? ' <span class="tab-count">(' + n + ')</span>' : '');
    });
  }

  function clasificarItemLocal(it) {
    const t = (it.tipo || "").toLowerCase();
    if (t.startsWith("image/")) return "image";
    if (t.startsWith("video/")) return "video";
    if (t.startsWith("audio/")) return "audio";
    if (t.startsWith("location/")) return "link";
    if (it.text && /https?:\/\//.test(it.text)) return "link";
    return "doc";
  }

  function aplicarFiltroBusquedaGaleria() {
    if (!busquedaGaleria) {
      document.querySelectorAll("#galleryContent .gallery-item, #galleryContent .gallery-list-item").forEach(function (el) {
        el.style.display = "";
      });
      return;
    }
    const q = busquedaGaleria.toLowerCase();
    document.querySelectorAll("#galleryContent .gallery-item, #galleryContent .gallery-list-item").forEach(function (el) {
      const txt = (el.textContent || "").toLowerCase();
      const img = el.querySelector("img");
      const src = img ? img.src.toLowerCase() : "";
      if (!txt.includes(q) && !src.includes(q)) {
        el.style.display = "none";
      } else {
        el.style.display = "";
      }
    });
  }

  if (gallerySearch) {
    gallerySearch.addEventListener("input", function () {
      busquedaGaleria = gallerySearch.value.trim();
      if (gallerySearchClear) gallerySearchClear.classList.toggle("show", busquedaGaleria.length > 0);
      aplicarFiltroBusquedaGaleria();
    });
  }
  if (gallerySearchClear) {
    gallerySearchClear.addEventListener("click", function () {
      gallerySearch.value = "";
      busquedaGaleria = "";
      gallerySearchClear.classList.remove("show");
      aplicarFiltroBusquedaGaleria();
    });
  }

  // ==========================================================
  // ESTADOS / HISTORIAS (tabla zumm_estados)
  // ==========================================================
  const estadosBar = document.getElementById("estadosBar");
  const estadoViewer = document.getElementById("estadoViewer");
  const estadoStage = document.getElementById("estadoStage");
  const estadoViewerAvatar = document.getElementById("estadoViewerAvatar");
  const estadoViewerNombre = document.getElementById("estadoViewerNombre");
  const estadoViewerTime = document.getElementById("estadoViewerTime");
  const estadoViewerClose = document.getElementById("estadoViewerClose");
  const estadoPrev = document.getElementById("estadoPrev");
  const estadoNext = document.getElementById("estadoNext");
  const estadoProgressBar = document.getElementById("estadoProgressBar");
  const estadoInput = document.getElementById("estadoInput");

  let estadosPorUsuario = {};
  let estadoActualUser = null;
  let estadoActualIdx = 0;
  let estadoProgressAnim = null;

  const vistos = JSON.parse(localStorage.getItem("zummchat_estados_vistos") || "{}");
  function guardarVistos() { try { localStorage.setItem("zummchat_estados_vistos", JSON.stringify(vistos)); } catch (e) {} }

  async function cargarEstados() {
    if (!estadosBar) return;
    try {
      const hace24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { data, error } = await supabaseClient.from("zumm_estados")
        .select("id, username, created_at, file_url, file_name, file_type")
        .gte("created_at", hace24h)
        .order("created_at", { ascending: true });
      if (error) { console.warn("Estados error:", error); return; }

      estadosPorUsuario = {};
      (data || []).forEach(function (e) {
        if (!e.file_url) return;
        if (!estadosPorUsuario[e.username]) estadosPorUsuario[e.username] = [];
        estadosPorUsuario[e.username].push({
          id: e.id,
          url: e.file_url,
          fecha: e.created_at,
          esImagen: (e.file_type || "").startsWith("image/")
        });
      });

      renderEstadosBar();
    } catch (e) { console.warn("Estados error:", e); }
  }

  function renderEstadosBar() {
    if (!estadosBar) return;
    estadosBar.innerHTML = "";

    const misEstados = estadosPorUsuario[username] || [];
    const miDiv = document.createElement("div");
    miDiv.className = "estado-item";
    const miRing = document.createElement("div");
    miRing.className = "estado-ring propio";
    const miInner = document.createElement("div");
    miInner.className = "estado-ring-inner";

    if (myAvatarUrl) {
      miInner.style.backgroundImage = "url(" + myAvatarUrl + ")";
    } else {
      miInner.style.background = colorForUser(username);
      miInner.textContent = avatarLetter(username);
    }
    miRing.appendChild(miInner);

    const badge = document.createElement("div");
    badge.className = "estado-add-badge";
    badge.textContent = "+";
    miRing.appendChild(badge);
    miDiv.appendChild(miRing);

    const miNombre = document.createElement("div");
    miNombre.className = "estado-nombre";
    miNombre.textContent = "Mi estado";
    miDiv.appendChild(miNombre);

    miDiv.addEventListener("click", function () {
      if (misEstados.length > 0) {
        abrirEstadoViewer(username, 0);
      } else {
        estadoInput.click();
      }
    });
    estadosBar.appendChild(miDiv);

    Object.keys(estadosPorUsuario).forEach(function (user) {
      if (user.toLowerCase() === username.toLowerCase()) return;
      const lista = estadosPorUsuario[user];
      if (!lista || !lista.length) return;

      const div = document.createElement("div");
      div.className = "estado-item";
      const ring = document.createElement("div");
      ring.className = "estado-ring";

      const todosVistos = lista.every(function (e) {
        return vistos[user + ":" + e.id];
      });
      if (todosVistos) ring.classList.add("visto");

      const inner = document.createElement("div");
      inner.className = "estado-ring-inner";
      const urlAvatar = avataresPorUsuario[user.toLowerCase()] || "";
      if (urlAvatar) {
        inner.style.backgroundImage = "url(" + urlAvatar + ")";
      } else {
        inner.style.background = colorForUser(user);
        inner.textContent = avatarLetter(user);
      }
      ring.appendChild(inner);
      div.appendChild(ring);

      const nom = document.createElement("div");
      nom.className = "estado-nombre";
      nom.textContent = user;
      div.appendChild(nom);

      div.addEventListener("click", function () {
        abrirEstadoViewer(user, 0);
      });
      estadosBar.appendChild(div);
    });
  }

  function abrirEstadoViewer(user, idx) {
    const lista = estadosPorUsuario[user];
    if (!lista || !lista.length) return;
    estadoActualUser = user;
    estadoActualIdx = Math.max(0, Math.min(idx, lista.length - 1));
    estadoViewer.classList.add("show");
    pintarEstadoActual();
  }

  function pintarEstadoActual() {
    const lista = estadosPorUsuario[estadoActualUser];
    if (!lista) return;
    const est = lista[estadoActualIdx];
    if (!est) { cerrarEstadoViewer(); return; }

    const urlAvatar = estadoActualUser.toLowerCase() === username.toLowerCase()
      ? myAvatarUrl
      : (avataresPorUsuario[estadoActualUser.toLowerCase()] || "");
    if (urlAvatar) {
      estadoViewerAvatar.style.backgroundImage = "url(" + urlAvatar + ")";
      estadoViewerAvatar.textContent = "";
    } else {
      estadoViewerAvatar.style.backgroundImage = "";
      estadoViewerAvatar.style.background = colorForUser(estadoActualUser);
      estadoViewerAvatar.textContent = avatarLetter(estadoActualUser);
    }
    estadoViewerNombre.textContent = estadoActualUser.toLowerCase() === username.toLowerCase()
      ? "Mi estado"
      : estadoActualUser;

    const diff = Date.now() - new Date(est.fecha).getTime();
    const mins = Math.floor(diff / 60000);
    let hace;
    if (mins < 1) hace = "ahora";
    else if (mins < 60) hace = "hace " + mins + " min";
    else hace = "hace " + Math.floor(mins / 60) + " h";
    estadoViewerTime.textContent = hace;

    estadoStage.innerHTML = "";
    if (est.esImagen) {
      const img = document.createElement("img");
      img.src = est.url;
      estadoStage.appendChild(img);
    } else {
      const v = document.createElement("video");
      v.src = est.url;
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      estadoStage.appendChild(v);
    }

    vistos[estadoActualUser + ":" + est.id] = true;
    guardarVistos();
    iniciarProgreso();
  }

  function iniciarProgreso() {
    clearInterval(estadoProgressAnim);
    if (estadoProgressBar) estadoProgressBar.style.width = "0%";
    const duracion = 5000;
    const inicio = Date.now();
    estadoProgressAnim = setInterval(function () {
      const pct = Math.min(100, ((Date.now() - inicio) / duracion) * 100);
      if (estadoProgressBar) estadoProgressBar.style.width = pct + "%";
      if (pct >= 100) {
        clearInterval(estadoProgressAnim);
        siguienteEstado();
      }
    }, 50);
  }

  function siguienteEstado() {
    const lista = estadosPorUsuario[estadoActualUser];
    if (!lista) { cerrarEstadoViewer(); return; }
    if (estadoActualIdx < lista.length - 1) {
      estadoActualIdx++;
      pintarEstadoActual();
    } else {
      const usuarios = Object.keys(estadosPorUsuario);
      const miIdx = usuarios.indexOf(estadoActualUser);
      let siguiente = null;
      for (let i = miIdx + 1; i < usuarios.length; i++) {
        if (usuarios[i].toLowerCase() !== username.toLowerCase()) { siguiente = usuarios[i]; break; }
      }
      if (siguiente) abrirEstadoViewer(siguiente, 0);
      else cerrarEstadoViewer();
    }
  }

  function anteriorEstado() {
    if (estadoActualIdx > 0) {
      estadoActualIdx--;
      pintarEstadoActual();
    } else {
      const usuarios = Object.keys(estadosPorUsuario);
      const miIdx = usuarios.indexOf(estadoActualUser);
      let anterior = null;
      for (let i = miIdx - 1; i >= 0; i--) {
        if (usuarios[i].toLowerCase() !== username.toLowerCase()) { anterior = usuarios[i]; break; }
      }
      if (anterior) {
        const lista = estadosPorUsuario[anterior];
        abrirEstadoViewer(anterior, lista.length - 1);
      }
    }
  }

  function cerrarEstadoViewer() {
    clearInterval(estadoProgressAnim);
    if (estadoViewer) estadoViewer.classList.remove("show");
    if (estadoStage) estadoStage.innerHTML = "";
    estadoActualUser = null;
    estadoActualIdx = 0;
    renderEstadosBar();
  }

  if (estadoViewerClose) estadoViewerClose.addEventListener("click", cerrarEstadoViewer);
  if (estadoNext) estadoNext.addEventListener("click", siguienteEstado);
  if (estadoPrev) estadoPrev.addEventListener("click", anteriorEstado);

  if (estadoInput) {
    estadoInput.addEventListener("change", async function () {
      const file = estadoInput.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        alert("Máximo 5 MB.");
        estadoInput.value = "";
        return;
      }
      try {
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
        const nombreArchivo = "estado_" + limpiarNombre(username) + "_" + Date.now() + "." + ext;
        const { error: upErr } = await supabaseClient.storage
          .from("archivos")
          .upload(nombreArchivo, file, { contentType: file.type || "image/jpeg" });
        if (upErr) { alert("Error al subir: " + upErr.message); estadoInput.value = ""; return; }
        const { data: urlData } = supabaseClient.storage.from("archivos").getPublicUrl(nombreArchivo);
        const publicUrl = urlData.publicUrl;

        const { error } = await supabaseClient.from("zumm_estados").insert([{
          username: username,
          file_url: publicUrl,
          file_name: file.name,
          file_type: file.type || "image/jpeg"
        }]);
        if (error) { alert("Error: " + error.message); estadoInput.value = ""; return; }
        estadoInput.value = "";
        alert("✅ Estado publicado (durará 24h)");
        await cargarEstados();
      } catch (e) {
        alert("Error: " + e.message);
        estadoInput.value = "";
      }
    });
  }

  setTimeout(cargarEstados, 2500);
  setInterval(function () {
    if (!document.hidden) cargarEstados();
  }, 60000);

  try {
    supabaseClient.channel("zumm-estados-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "zumm_estados" },
        function () { cargarEstados(); })
      .subscribe();
  } catch (e) {}

})();
