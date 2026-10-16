// ============================================================
// ZummChat - NIVEL MEDIO (app7.js)
// Álbum de fotos + Música compartida + Transcripción + Llamada grupal
// © 2026 José Yudier Arencibia Ajo
// ============================================================

(function () {
  "use strict";

  // ==========================================================
  // 1) ÁLBUM DE FOTOS MÚLTIPLES
  // ==========================================================
  const fileInputMulti = document.getElementById("fileInput");

  // Listener en el document (fase captura) para interceptar antes que otros
  document.addEventListener("change", async function (e) {
    if (!fileInputMulti || e.target !== fileInputMulti) return;
    const files = Array.from(fileInputMulti.files || []);
    if (files.length < 2) return; // deja pasar al editor de imagen de app4/5

    // Es álbum múltiple
    e.stopImmediatePropagation();
    e.stopPropagation();

    const imagenes = files.filter(function (f) { return f.type && f.type.startsWith("image/"); });
    if (imagenes.length === 0) {
      alert("Selecciona imágenes para el álbum.");
      fileInputMulti.value = "";
      return;
    }
    if (imagenes.length > 10) {
      alert("Máximo 10 fotos por álbum.");
      fileInputMulti.value = "";
      return;
    }

    // Mostrar progreso en el input
    const inputEl = document.getElementById("messageInput");
    const textoBase = inputEl ? inputEl.value.trim() : "";
    if (inputEl) { inputEl.value = ""; inputEl.disabled = true; inputEl.placeholder = "Subiendo " + imagenes.length + " fotos..."; }

    try {
      const urls = [];
      for (let i = 0; i < imagenes.length; i++) {
        const file = imagenes[i];
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
        const nombreArchivo = "album_" + Date.now() + "_" + i + "_" + Math.random().toString(36).slice(2, 6) + "." + ext;
        const { error: upErr } = await supabaseClient.storage.from("archivos")
          .upload(nombreArchivo, file, { contentType: file.type || "image/jpeg" });
        if (upErr) { alert("Error subiendo foto " + (i + 1) + ": " + upErr.message); continue; }
        const { data: urlData } = supabaseClient.storage.from("archivos").getPublicUrl(nombreArchivo);
        urls.push(urlData.publicUrl);
      }

      if (urls.length === 0) { alert("No se pudo subir ninguna imagen."); return; }

      // Enviar mensaje con álbum
      const texto = (textoBase || "") + (textoBase ? "\n" : "") + "[ALBUM]" + urls.join("|") + "[/ALBUM]";
      const { data, error } = await supabaseClient.from("zumm_messages")
        .insert([{ text: texto, username: username, room: currentRoom }])
        .select().single();
      if (error) { alert("Error: " + error.message); return; }
      if (typeof renderMessage === "function") renderMessage(data, false);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      if (inputEl) { inputEl.disabled = false; inputEl.placeholder = "Escribe un mensaje..."; }
      fileInputMulti.value = "";
    }
  }, true);

  // ==========================================================
  // 2) MÚSICA COMPARTIDA
  // ==========================================================
  const menuMusicBtn = document.getElementById("menuMusicBtn");
  const musicModal = document.getElementById("musicModal");
  const musicUrl = document.getElementById("musicUrl");
  const musicTitle = document.getElementById("musicTitle");
  const musicCancelBtn = document.getElementById("musicCancelBtn");
  const musicSendBtn = document.getElementById("musicSendBtn");

  if (menuMusicBtn) {
    menuMusicBtn.addEventListener("click", function () {
      cerrarPaneles();
      musicUrl.value = "";
      musicTitle.value = "";
      musicModal.classList.add("show");
      setTimeout(function () { musicUrl.focus(); }, 100);
    });
  }
  if (musicCancelBtn) musicCancelBtn.addEventListener("click", function () {
    musicModal.classList.remove("show");
  });

  if (musicSendBtn) {
    musicSendBtn.addEventListener("click", async function () {
      const url = (musicUrl.value || "").trim();
      let titulo = (musicTitle.value || "").trim();
      if (!url) { alert("Pega un link de música."); return; }

      // Extraer título automático de YouTube
      const ytId = extraerYouTubeId(url);
      if (ytId && !titulo) titulo = "Música de YouTube";
      if (!titulo) titulo = "Música compartida";

      const payload = "[MUSIC]" + url + "|" + titulo + "[/MUSIC]";
      try {
        const { data, error } = await supabaseClient.from("zumm_messages")
          .insert([{ text: payload, username: username, room: currentRoom }])
          .select().single();
        if (error) { alert("Error: " + error.message); return; }
        if (typeof renderMessage === "function") renderMessage(data, false);
        musicModal.classList.remove("show");
      } catch (e) { alert("Error: " + e.message); }
    });
  }

  function extraerYouTubeId(url) {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  // Reproductor flotante único
  let musicFloatingPlayer = document.getElementById("musicFloatingPlayer");
  if (!musicFloatingPlayer) {
    musicFloatingPlayer = document.createElement("div");
    musicFloatingPlayer.id = "musicFloatingPlayer";
    musicFloatingPlayer.innerHTML =
      '<button id="mfpPlay">⏸</button>' +
      '<span class="mfp-title" id="mfpTitle"></span>' +
      '<button id="mfpClose">✕</button>';
    document.body.appendChild(musicFloatingPlayer);
  }

  let musicaActual = {
    tipo: null, // "youtube" | "audio"
    ytPlayer: null,
    audio: null,
    titulo: "",
    msgId: null
  };

  function detenerMusica() {
    if (musicaActual.tipo === "youtube" && musicaActual.ytPlayer) {
      try { musicaActual.ytPlayer.pauseVideo(); } catch (e) {}
    }
    if (musicaActual.tipo === "audio" && musicaActual.audio) {
      try { musicaActual.audio.pause(); musicaActual.audio.currentTime = 0; } catch (e) {}
    }
    musicaActual.tipo = null;
    musicaActual.titulo = "";
    musicFloatingPlayer.classList.remove("show");
    document.querySelectorAll(".music-play-btn.playing").forEach(function (b) { b.classList.remove("playing"); b.textContent = "▶"; });
  }

  function reproducirMusica(url, titulo, btn) {
    detenerMusica();
    musicaActual.titulo = titulo;
    document.getElementById("mfpTitle").textContent = "🎵 " + titulo;

    const ytId = extraerYouTubeId(url);
    if (ytId) {
      musicaActual.tipo = "youtube";
      if (!window.YT || !window.YT.Player) {
        // Cargar la API si no está
        if (!document.getElementById("ytApiScript")) {
          const s = document.createElement("script");
          s.id = "ytApiScript";
          s.src = "https://www.youtube.com/iframe_api";
          document.head.appendChild(s);
          window.onYouTubeIframeAPIReady = function () { iniciarYT(ytId, btn); };
        } else {
          // Esperar
          setTimeout(function () { reproducirMusica(url, titulo, btn); }, 500);
          return;
        }
      } else {
        iniciarYT(ytId, btn);
      }
    } else {
      // Audio directo
      musicaActual.tipo = "audio";
      const audio = new Audio(url);
      audio.volume = 0.8;
      audio.play().catch(function () {});
      musicaActual.audio = audio;
      musicFloatingPlayer.classList.add("show");
      if (btn) { btn.classList.add("playing"); btn.textContent = "⏸"; }
      audio.addEventListener("ended", detenerMusica);
    }
  }

  function iniciarYT(ytId, btn) {
    let ytContainer = document.getElementById("ytMusicContainer");
    if (!ytContainer) {
      ytContainer = document.createElement("div");
      ytContainer.id = "ytMusicContainer";
      ytContainer.style.cssText = "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;top:-9999px;";
      document.body.appendChild(ytContainer);
    }
    ytContainer.innerHTML = '<div id="ytPlayerInner"></div>';

    musicaActual.ytPlayer = new YT.Player("ytPlayerInner", {
      height: "1",
      width: "1",
      videoId: ytId,
      playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, modestbranding: 1 },
      events: {
        onReady: function (ev) {
          ev.target.playVideo();
          musicFloatingPlayer.classList.add("show");
          if (btn) { btn.classList.add("playing"); btn.textContent = "⏸"; }
        },
        onStateChange: function (ev) {
          if (ev.data === 0) detenerMusica(); // ended
        }
      }
    });
  }

  document.getElementById("mfpPlay").addEventListener("click", function () {
    if (musicaActual.tipo === "youtube" && musicaActual.ytPlayer) {
      const st = musicaActual.ytPlayer.getPlayerState();
      if (st === 1) { musicaActual.ytPlayer.pauseVideo(); this.textContent = "▶"; }
      else { musicaActual.ytPlayer.playVideo(); this.textContent = "⏸"; }
    } else if (musicaActual.tipo === "audio" && musicaActual.audio) {
      if (musicaActual.audio.paused) { musicaActual.audio.play(); this.textContent = "⏸"; }
      else { musicaActual.audio.pause(); this.textContent = "▶"; }
    }
  });

  document.getElementById("mfpClose").addEventListener("click", detenerMusica);

  // ==========================================================
  // 3) TRANSCRIPCIÓN DE VOZ (Web Speech API)
  // ==========================================================
  let transcripcionActual = "";
  let reconocimiento = null;
  let reconActivo = false;

  function iniciarReconocimientoVoz() {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    reconocimiento = new SR();
    reconocimiento.lang = "es-ES";
    reconocimiento.continuous = true;
    reconocimiento.interimResults = true;

    transcripcionActual = "";
    const display = document.getElementById("recordingTranscript");

    reconocimiento.onresult = function (e) {
      let finalTxt = "";
      let interimTxt = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalTxt += t + " ";
        else interimTxt += t;
      }
      if (finalTxt) transcripcionActual += finalTxt;
      if (display) {
        display.style.display = "block";
        display.textContent = "📝 " + (transcripcionActual + " " + interimTxt).trim();
      }
    };
    reconocimiento.onerror = function () {};
    reconocimiento.onend = function () {
      // Si sigue activo y no se detuvo manualmente, reiniciar
      if (reconActivo && reconocimiento) {
        try { reconocimiento.start(); } catch (e) {}
      }
    };
    try {
      reconocimiento.start();
      reconActivo = true;
    } catch (e) {}
  }

  function detenerReconocimientoVoz() {
    reconActivo = false;
    if (reconocimiento) {
      try { reconocimiento.stop(); } catch (e) {}
      reconocimiento = null;
    }
  }

  // Hook: cuando se inicia grabación (menuVoiceBtn), arrancar transcripción
  const menuVoiceBtnReal = document.getElementById("menuVoiceBtn");
  if (menuVoiceBtnReal) {
    menuVoiceBtnReal.addEventListener("click", function () {
      setTimeout(function () {
        const recPanel = document.getElementById("recordingPanel");
        if (recPanel && recPanel.classList.contains("show")) {
          iniciarReconocimientoVoz();
        }
      }, 500);
    });
  }

  // Hook: cuando se detiene o cancela grabación
  const stopRecBtnReal = document.getElementById("stopRecBtn");
  const cancelRecBtnReal = document.getElementById("cancelRecBtn");
  if (stopRecBtnReal) {
    stopRecBtnReal.addEventListener("click", function () {
      setTimeout(detenerReconocimientoVoz, 100);
    });
  }
  if (cancelRecBtnReal) {
    cancelRecBtnReal.addEventListener("click", function () {
      detenerReconocimientoVoz();
      const display = document.getElementById("recordingTranscript");
      if (display) { display.style.display = "none"; display.textContent = ""; }
      transcripcionActual = "";
    });
  }

  // Hook al render para las notas de voz: añadir transcripción si existe en el formato [AUDIO:url|texto]
  const _renderOrig7 = window.renderMessage;
  window.renderMessage = function (m, esNuevo) {
    _renderOrig7(m, esNuevo);
    if (!messagesEl || !m || !m.id) return;
    const div = messagesEl.querySelector('[data-msg-id="' + m.id + '"]');
    if (!div) return;
    const body = div.querySelector(".msg-body");
    if (!body) return;
    const txt = (m.text || "");

    // ÁLBUM
    const albumMatch = txt.match(/\[ALBUM\]([^\[]+)\[\/ALBUM\]/);
    if (albumMatch && !body.dataset.albumRender) {
      body.dataset.albumRender = "1";
      const urls = albumMatch[1].split("|").filter(function (u) { return u.trim(); });
      if (urls.length > 0) {
        // Quitar el texto del álbum y dejar el texto normal antes
        const textoAntes = txt.replace(albumMatch[0], "").trim();
        if (textoAntes) {
          const txtDiv = document.createElement("div");
          txtDiv.style.marginBottom = "4px";
          txtDiv.appendChild(document.createTextNode(textoAntes));
          body.insertBefore(txtDiv, body.firstChild);
        }
        const album = document.createElement("div");
        album.className = "msg-album cols-" + Math.min(3, urls.length);
        urls.forEach(function (url) {
          const img = document.createElement("img");
          img.src = url;
          img.loading = "lazy";
          img.addEventListener("click", function (e) {
            e.stopPropagation();
            if (typeof openImageModal === "function") openImageModal(url);
          });
          album.appendChild(img);
        });
        body.appendChild(album);
        // Eliminar el texto crudo del álbum del body
        const children = Array.from(body.childNodes);
        children.forEach(function (n) {
          if (n.nodeType === 3 && n.textContent.indexOf("[ALBUM]") >= 0) n.remove();
          if (n.nodeType === 1 && n.textContent.indexOf("[ALBUM]") >= 0 && !n.classList.contains("msg-album")) n.remove();
        });
      }
      return;
    }

    // MÚSICA
    const musicMatch = txt.match(/^\[MUSIC\](.+?)\|(.+?)\[\/MUSIC\]$/);
    if (musicMatch && !body.dataset.musicRender) {
      body.dataset.musicRender = "1";
      body.innerHTML = "";
      const url = musicMatch[1];
      const titulo = musicMatch[2];
      const ytId = extraerYouTubeId(url);
      const tipo = ytId ? "YouTube" : "Audio";

      const box = document.createElement("div");
      box.className = "msg-music";
      const icon = document.createElement("div");
      icon.className = "music-icon"; icon.textContent = "🎵";
      const info = document.createElement("div");
      info.className = "music-info";
      const t = document.createElement("div");
      t.className = "music-title"; t.textContent = titulo;
      const s = document.createElement("div");
      s.className = "music-sub"; s.textContent = "🎧 " + tipo;
      info.appendChild(t); info.appendChild(s);
      const btn = document.createElement("button");
      btn.className = "music-play-btn"; btn.textContent = "▶";
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (btn.classList.contains("playing")) { detenerMusica(); return; }
        reproducirMusica(url, titulo, btn);
      });
      box.appendChild(icon); box.appendChild(info); box.appendChild(btn);
      body.appendChild(box);
      return;
    }
  };

  // ==========================================================
  // 4) LLAMADA GRUPAL (mesh P2P hasta 4 personas)
  // ==========================================================
  const groupCallBtn = document.getElementById("groupCallBtn");
  const groupCallOverlay = document.getElementById("groupCallOverlay");
  const gcTitle = document.getElementById("gcTitle");
  const gcGrid = document.getElementById("gcGrid");
  const gcMinBtn = document.getElementById("gcMinBtn");
  const gcLeaveBtn = document.getElementById("gcLeaveBtn");
  const gcMuteBtn = document.getElementById("gcMuteBtn");
  const gcCamBtn = document.getElementById("gcCamBtn");
  const gcAddBtn = document.getElementById("gcAddBtn");
  const groupCallIncoming = document.getElementById("groupCallIncoming");
  const gcIncomingName = document.getElementById("gcIncomingName");
  const gcIncomingText = document.getElementById("gcIncomingText");
  const gcRejectBtn = document.getElementById("gcRejectBtn");
  const gcAcceptBtn = document.getElementById("gcAcceptBtn");
  const gcAddPeopleModal = document.getElementById("gcAddPeopleModal");
  const gcAddList = document.getElementById("gcAddList");
  const gcAddEmpty = document.getElementById("gcAddEmpty");
  const gcAddCloseBtn = document.getElementById("gcAddCloseBtn");

  const MAX_GROUP = 4;

  let gc = null; // { callId, isHost, video, peers: { [name]: { pc, stream, muted, name } }, localStream, muted, camOff }

  async function iniciarLlamadaGrupal() {
    if (gc) { alert("Ya estás en una llamada grupal."); return; }
    if (typeof activeCall !== "undefined" && activeCall) { alert("Tienes otra llamada activa."); return; }

    // Elegir participantes
    const disponibles = usersOnline.filter(function (u) { return u.toLowerCase() !== username.toLowerCase(); });
    if (disponibles.length === 0) { alert("No hay usuarios en línea."); return; }

    let seleccion = disponibles;
    if (disponibles.length > 1) {
      const lista = disponibles.map(function (u, i) { return (i + 1) + ". " + u; }).join("\n");
      const resp = prompt("¿A quién invitar? Escribe números separados por coma (ej: 1,2)\n\n" + lista + "\n\nMáximo " + (MAX_GROUP - 1) + " personas:");
      if (!resp) return;
      seleccion = resp.split(",").map(function (n) { return disponibles[parseInt(n.trim()) - 1]; }).filter(function (u) { return u; });
      if (seleccion.length === 0) return;
      if (seleccion.length > MAX_GROUP - 1) { alert("Máximo " + (MAX_GROUP - 1) + " personas."); return; }
    }

    // Pedir cámara/micrófono
    const conVideo = confirm("¿Activar cámara?\n\nOK = Videollamada\nCancelar = Solo audio");
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: conVideo ? { width: 480, height: 360, facingMode: "user" } : false
      });
    } catch (e) { alert("No se pudo acceder al micrófono/cámara:\n" + e.message); return; }

    const callId = "gc-" + myClientId + "-" + Date.now();
    gc = {
      callId: callId,
      isHost: true,
      video: conVideo,
      peers: {},
      localStream: stream,
      muted: false,
      camOff: false
    };

    // Invitar a cada uno
    for (const nombre of seleccion) {
      await enviarSenal(nombre, "gc-invite", { callId: callId, video: conVideo, host: username });
    }

    mostrarOverlayGC();
    agregarTileLocal();
    gcTitle.textContent = "Llamada grupal (esperando...)";
  }

  function mostrarOverlayGC() {
    groupCallOverlay.classList.add("show");
    actualizarGridClases();
  }

  function actualizarGridClases() {
    if (!gcGrid) return;
    const n = gcGrid.querySelectorAll(".gc-tile").length;
    gcGrid.className = "count-" + Math.min(4, Math.max(1, n));
  }

  function agregarTileLocal() {
    if (!gc || !gc.localStream) return;
    const tile = document.createElement("div");
    tile.className = "gc-tile";
    tile.dataset.peer = "__local__";

    const video = document.createElement("video");
    video.autoplay = true;
    video.playsInline = true;
    video.muted = true;
    video.srcObject = gc.localStream;
    tile.appendChild(video);

    const name = document.createElement("div");
    name.className = "gc-name";
    name.textContent = username + " (Tú)";
    tile.appendChild(name);

    gcGrid.appendChild(tile);
    actualizarGridClases();
  }

  function agregarTilePeer(nombre) {
    if (!gcGrid) return;
    const tile = document.createElement("div");
    tile.className = "gc-tile";
    tile.dataset.peer = nombre;
    tile.id = "gc-tile-" + nombre.replace(/[^a-zA-Z0-9]/g, "_");

    const video = document.createElement("video");
    video.autoplay = true;
    video.playsInline = true;
    tile.appendChild(video);

    const name = document.createElement("div");
    name.className = "gc-name";
    name.textContent = nombre;
    tile.appendChild(name);

    gcGrid.appendChild(tile);
    actualizarGridClases();
  }

  function quitarTilePeer(nombre) {
    const tile = gcGrid.querySelector('[data-peer="' + CSS.escape(nombre) + '"]');
    if (tile) tile.remove();
    actualizarGridClases();
  }

  async function crearPeerGC(peerName, isOfferer) {
    if (!gc) return null;
    if (gc.peers[peerName]) return gc.peers[peerName];

    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    pc.onicecandidate = function (e) {
      if (e.candidate) {
        enviarSenal(peerName, "gc-ice", { callId: gc.callId, candidate: e.candidate });
      }
    };
    pc.ontrack = function (e) {
      const tile = document.getElementById("gc-tile-" + peerName.replace(/[^a-zA-Z0-9]/g, "_"));
      if (tile) {
        const video = tile.querySelector("video");
        if (video) { video.srcObject = e.streams[0]; video.play().catch(function () {}); }
      }
    };
    pc.onconnectionstatechange = function () {
      if (pc.connectionState === "failed" || pc.connectionState === "closed") {
        // Quitar peer
        delete gc.peers[peerName];
        quitarTilePeer(peerName);
      }
    };

    // Añadir tracks locales
    gc.localStream.getTracks().forEach(function (t) { pc.addTrack(t, gc.localStream); });

    gc.peers[peerName] = { pc: pc, stream: null, muted: false, name: peerName };
    agregarTilePeer(peerName);

    if (isOfferer) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      enviarSenal(peerName, "gc-offer", { callId: gc.callId, sdp: pc.localDescription });
    }
    return gc.peers[peerName];
  }

  // Hook: interceptar señales grupales desde app3.js
  // Como app3.js tiene su propio procesarSenal, añadimos un listener por separado
  const _leerSenalesOrig = window.leerSenales;

  // Extender procesarSenal no es fácil, así que hacemos un polling separado
  let gcSignalsLastId = 0;
  setInterval(async function () {
    if (!gc && !groupCallIncoming.classList.contains("show")) {
      // Aún así leemos señales por si nos invitan
    }
    try {
      const { data } = await supabaseClient.from("zumm_signals")
        .select("*")
        .eq("to_user", username)
        .gt("id", gcSignalsLastId)
        .order("id", { ascending: true })
        .limit(50);
      for (const s of (data || [])) {
        if (s.id > gcSignalsLastId) gcSignalsLastId = s.id;
        if (s.from_client === myClientId) continue;
        if (!s.signal_type.startsWith("gc-")) continue;
        const edad = Date.now() - new Date(s.created_at).getTime();
        if (edad > 60000) continue;
        await procesarSenalGC(s);
      }
    } catch (e) {}
  }, 1500);

  async function procesarSenalGC(s) {
    let payload = {};
    try { payload = JSON.parse(s.payload || "{}"); } catch (e) {}
    const fromName = s.from_user;
    const callId = payload.callId;

    switch (s.signal_type) {
      case "gc-invite":
        if (gc || groupCallIncoming.classList.contains("show")) {
          enviarSenal(fromName, "gc-reject", { callId: callId });
          return;
        }
        // Mostrar invitación
        gcIncomingName.textContent = fromName;
        gcIncomingText.textContent = payload.video ? "Videollamada grupal" : "Llamada grupal";
        groupCallIncoming.classList.add("show");
        window.__gcPendingInvite = { callId: callId, fromName: fromName, video: !!payload.video };
        if (typeof playRingtone === "function") playRingtone();
        break;

      case "gc-accept":
        if (!gc || gc.callId !== callId) return;
        // El invitado aceptó: crear oferta hacia él
        await crearPeerGC(fromName, true);
        break;

      case "gc-offer":
        if (!gc || gc.callId !== callId) return;
        {
          const peer = await crearPeerGC(fromName, false);
          if (!peer) return;
          try {
            await peer.pc.setRemoteDescription(new RTCSessionDescription(payload.sdp));
            const ans = await peer.pc.createAnswer();
            await peer.pc.setLocalDescription(ans);
            enviarSenal(fromName, "gc-answer", { callId: callId, sdp: peer.pc.localDescription });
          } catch (e) {}
        }
        break;

      case "gc-answer":
        if (!gc || gc.callId !== callId) return;
        if (gc.peers[fromName]) {
          try {
            await gc.peers[fromName].pc.setRemoteDescription(new RTCSessionDescription(payload.sdp));
          } catch (e) {}
        }
        break;

      case "gc-ice":
        if (!gc || gc.callId !== callId) return;
        if (gc.peers[fromName] && payload.candidate) {
          try {
            await gc.peers[fromName].pc.addIceCandidate(new RTCIceCandidate(payload.candidate));
          } catch (e) {}
        }
        break;

      case "gc-hangup":
        if (gc && gc.callId === callId && gc.peers[fromName]) {
          try { gc.peers[fromName].pc.close(); } catch (e) {}
          delete gc.peers[fromName];
          quitarTilePeer(fromName);
        }
        break;

      case "gc-reject":
        if (gc && gc.callId === callId) {
          quitarTilePeer(fromName);
        }
        break;
    }
  }

  if (groupCallBtn) {
    groupCallBtn.addEventListener("click", function () { iniciarLlamadaGrupal(); });
  }

  if (gcLeaveBtn) {
    gcLeaveBtn.addEventListener("click", function () { salirLlamadaGrupal(); });
  }

  if (gcMinBtn) {
    gcMinBtn.addEventListener("click", function () {
      if (gc) {
        gcGrid.style.display = gcGrid.style.display === "none" ? "grid" : "none";
      }
    });
  }

  if (gcMuteBtn) {
    gcMuteBtn.addEventListener("click", function () {
      if (!gc) return;
      gc.muted = !gc.muted;
      gc.localStream.getAudioTracks().forEach(function (t) { t.enabled = !gc.muted; });
      gcMuteBtn.classList.toggle("muted", gc.muted);
      gcMuteBtn.textContent = gc.muted ? "🔇 Mic" : "🎤 Mic";
    });
  }

  if (gcCamBtn) {
    gcCamBtn.addEventListener("click", function () {
      if (!gc) return;
      gc.camOff = !gc.camOff;
      gc.localStream.getVideoTracks().forEach(function (t) { t.enabled = !gc.camOff; });
      gcCamBtn.classList.toggle("muted", gc.camOff);
      gcCamBtn.textContent = gc.camOff ? "🚫 Cám" : "📹 Cám";
    });
  }

  if (gcAddBtn) {
    gcAddBtn.addEventListener("click", function () {
      if (!gc) return;
      const ocupados = Object.keys(gc.peers);
      const disponibles = usersOnline.filter(function (u) {
        const l = u.toLowerCase();
        return l !== username.toLowerCase() && ocupados.indexOf(u) < 0;
      });
      gcAddList.innerHTML = "";
      if (disponibles.length === 0) {
        gcAddEmpty.style.display = "block";
      } else {
        gcAddEmpty.style.display = "none";
        disponibles.forEach(function (u) {
          const li = document.createElement("li");
          li.textContent = u;
          li.addEventListener("click", async function () {
            if (Object.keys(gc.peers).length + 2 >= MAX_GROUP) {
              alert("Máximo " + MAX_GROUP + " personas."); return;
            }
            await enviarSenal(u, "gc-invite", { callId: gc.callId, video: gc.video, host: username });
            gcAddPeopleModal.classList.remove("show");
            alert("Invitación enviada a " + u);
          });
          gcAddList.appendChild(li);
        });
      }
      gcAddPeopleModal.classList.add("show");
    });
  }

  if (gcAddCloseBtn) {
    gcAddCloseBtn.addEventListener("click", function () {
      gcAddPeopleModal.classList.remove("show");
    });
  }

  function salirLlamadaGrupal() {
    if (!gc) return;
    // Avisar a todos
    Object.keys(gc.peers).forEach(function (name) {
      enviarSenal(name, "gc-hangup", { callId: gc.callId });
      try { gc.peers[name].pc.close(); } catch (e) {}
    });
    gc.peers = {};
    if (gc.localStream) {
      gc.localStream.getTracks().forEach(function (t) { t.stop(); });
    }
    gc = null;
    gcGrid.innerHTML = "";
    groupCallOverlay.classList.remove("show");
    if (typeof stopRingtone === "function") stopRingtone();
  }

  if (gcAcceptBtn) {
    gcAcceptBtn.addEventListener("click", async function () {
      const inv = window.__gcPendingInvite;
      if (!inv) return;
      groupCallIncoming.classList.remove("show");
      if (typeof stopRingtone === "function") stopRingtone();

      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: inv.video ? { width: 480, height: 360, facingMode: "user" } : false
        });
      } catch (e) { alert("Error mic/cám: " + e.message); enviarSenal(inv.fromName, "gc-reject", { callId: inv.callId }); return; }

      gc = {
        callId: inv.callId,
        isHost: false,
        video: inv.video,
        peers: {},
        localStream: stream,
        muted: false,
        camOff: false
      };
      mostrarOverlayGC();
      agregarTileLocal();
      gcTitle.textContent = "Llamada grupal";

      // Avisar al host que aceptamos
      enviarSenal(inv.fromName, "gc-accept", { callId: inv.callId });
      window.__gcPendingInvite = null;
    });
  }

  if (gcRejectBtn) {
    gcRejectBtn.addEventListener("click", function () {
      const inv = window.__gcPendingInvite;
      if (inv) enviarSenal(inv.fromName, "gc-reject", { callId: inv.callId });
      groupCallIncoming.classList.remove("show");
      if (typeof stopRingtone === "function") stopRingtone();
      window.__gcPendingInvite = null;
    });
  }

  // ==========================================================
  // 5) HOOK PARA TRANSCRIPCIÓN EN NOTAS DE VOZ
  // ==========================================================
  // Sobrescribimos construirTextoConReply NO — modificamos el audio que se envía.
  // En lugar de eso: al detener grabación, app3 inserta el audio. Interceptamos el cambio
  // añadiendo la transcripción al file_name o como mensaje aparte.

  // Mejor: añadimos la transcripción como segundo mensaje si existe
  const _detenerGrabOrig = window.detenerGrabacion;
  // No la tenemos expuesta, así que escuchamos el botón stop
  if (stopRecBtnReal) {
    stopRecBtnReal.addEventListener("click", async function () {
      // Esperar a que se suba el audio (delay)
      setTimeout(async function () {
        const texto = (transcripcionActual || "").trim();
        if (texto.length < 3) return;
        try {
          await supabaseClient.from("zumm_messages").insert([{
            text: "📝 Transcripción: " + texto,
            username: username,
            room: currentRoom
          }]);
        } catch (e) {}
        transcripcionActual = "";
        const display = document.getElementById("recordingTranscript");
        if (display) { display.style.display = "none"; display.textContent = ""; }
      }, 2500);
    });
  }

})();
