// ============================================================
// ZummChat - FASE 2 (app5.js)
// Editor de imagen + búsqueda global + PDF viewer + gráfico
// © 2026 José Yudier Arencibia Ajo
// ============================================================

(function () {
  "use strict";

  // ==========================================================
  // 1) EDITOR DE IMAGEN AL ENVIAR FOTO
  // ==========================================================
  const imageEditorModal = document.getElementById("imageEditorModal");
  const ieCanvas = document.getElementById("ieCanvas");
  const ieCancelBtn = document.getElementById("ieCancelBtn");
  const ieSendBtn = document.getElementById("ieSendBtn");
  const ieRotateBtn = document.getElementById("ieRotateBtn");
  const ieTextBtn = document.getElementById("ieTextBtn");
  const ieCropBtn = document.getElementById("ieCropBtn");
  const ieTextPanel = document.getElementById("ieTextPanel");
  const ieTextInput = document.getElementById("ieTextInput");
  const ieTextColor = document.getElementById("ieTextColor");
  const ieTextSize = document.getElementById("ieTextSize");
  const ieTextPos = document.getElementById("ieTextPos");
  const ieFilters = document.getElementById("ieFilters");

  let imagenOriginal = null;
  let filtroActual = "none";
  let rotacion = 0;
  let textoOverlay = null; // { texto, color, size, pos }
  let archivoOriginal = null;
  let contextoEditor = null; // "chat" o "estado"

  function abrirEditorImagen(file, contexto) {
    if (!imageEditorModal || !ieCanvas) return;
    contextoEditor = contexto || "chat";
    archivoOriginal = file;
    filtroActual = "none";
    rotacion = 0;
    textoOverlay = null;
    if (ieTextInput) ieTextInput.value = "";
    if (ieTextPanel) ieTextPanel.style.display = "none";

    // Marcar filtro original
    if (ieFilters) {
      ieFilters.querySelectorAll("button").forEach(function (b) {
        b.classList.toggle("active", b.dataset.f === "none");
      });
    }

    const reader = new FileReader();
    reader.onload = function (ev) {
      const img = new Image();
      img.onload = function () {
        imagenOriginal = img;
        dibujarCanvas();
        imageEditorModal.classList.add("show");
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  function dibujarCanvas() {
    if (!imagenOriginal || !ieCanvas) return;
    const ctx = ieCanvas.getContext("2d");

    // Determinar dimensiones base
    let ancho = imagenOriginal.width;
    let alto = imagenOriginal.height;

    // Limitar a 1080 de ancho máximo para rendimiento
    const maxAncho = 1080;
    if (ancho > maxAncho) {
      alto = Math.round(alto * (maxAncho / ancho));
      ancho = maxAncho;
    }

    // Aplicar rotación (dims intercambiadas si es 90 o 270)
    const esVertical = (rotacion % 180) !== 0;
    const canvasAncho = esVertical ? alto : ancho;
    const canvasAlto = esVertical ? ancho : alto;

    ieCanvas.width = canvasAncho;
    ieCanvas.height = canvasAlto;
    ctx.clearRect(0, 0, canvasAncho, canvasAlto);

    ctx.save();
    ctx.translate(canvasAncho / 2, canvasAlto / 2);
    ctx.rotate((rotacion * Math.PI) / 180);

    // Aplicar filtro
    ctx.filter = filtroActual === "none" ? "none" : filtroActual;

    // Dibujar imagen centrada
    if (esVertical) {
      ctx.drawImage(imagenOriginal, -alto / 2, -ancho / 2, alto, ancho);
    } else {
      ctx.drawImage(imagenOriginal, -ancho / 2, -alto / 2, ancho, alto);
    }
    ctx.restore();

    // Texto overlay
    if (textoOverlay && textoOverlay.texto) {
      ctx.save();
      const size = parseInt(textoOverlay.size) || 28;
      ctx.font = "bold " + size + "px system-ui, Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = textoOverlay.color || "#ffffff";
      ctx.strokeStyle = "rgba(0,0,0,.8)";
      ctx.lineWidth = Math.max(2, size / 12);
      ctx.shadowColor = "rgba(0,0,0,.6)";
      ctx.shadowBlur = 6;

      let y = canvasAlto - size * 1.2;
      if (textoOverlay.pos === "top") y = size * 1.2;
      else if (textoOverlay.pos === "center") y = canvasAlto / 2;

      const lineas = wrapTexto(ctx, textoOverlay.texto, canvasAncho - 40);
      lineas.forEach(function (linea, i) {
        const offsetY = y + (i - (lineas.length - 1) / 2) * (size + 6);
        ctx.strokeText(linea, canvasAncho / 2, offsetY);
        ctx.fillText(linea, canvasAncho / 2, offsetY);
      });
      ctx.restore();
    }
  }

  function wrapTexto(ctx, texto, maxAncho) {
    const palabras = texto.split(" ");
    const lineas = [];
    let actual = "";
    palabras.forEach(function (p) {
      const prueba = actual ? (actual + " " + p) : p;
      if (ctx.measureText(prueba).width > maxAncho && actual) {
        lineas.push(actual);
        actual = p;
      } else {
        actual = prueba;
      }
    });
    if (actual) lineas.push(actual);
    return lineas;
  }

  // Filtros
  if (ieFilters) {
    ieFilters.addEventListener("click", function (e) {
      const btn = e.target.closest("button[data-f]");
      if (!btn) return;
      filtroActual = btn.dataset.f;
      ieFilters.querySelectorAll("button").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      dibujarCanvas();
    });
  }

  if (ieRotateBtn) {
    ieRotateBtn.addEventListener("click", function () {
      rotacion = (rotacion + 90) % 360;
      dibujarCanvas();
    });
  }

  if (ieTextBtn) {
    ieTextBtn.addEventListener("click", function () {
      ieTextPanel.style.display = ieTextPanel.style.display === "none" ? "block" : "none";
      if (ieTextPanel.style.display === "block") ieTextInput.focus();
    });
  }

  if (ieTextInput) {
    ieTextInput.addEventListener("input", function () {
      actualizarOverlay();
    });
  }
  if (ieTextColor) ieTextColor.addEventListener("input", actualizarOverlay);
  if (ieTextSize) ieTextSize.addEventListener("input", actualizarOverlay);
  if (ieTextPos) ieTextPos.addEventListener("change", actualizarOverlay);

  function actualizarOverlay() {
    const txt = (ieTextInput.value || "").trim();
    if (!txt) {
      textoOverlay = null;
    } else {
      textoOverlay = {
        texto: txt,
        color: ieTextColor.value,
        size: ieTextSize.value,
        pos: ieTextPos.value
      };
    }
    dibujarCanvas();
  }

  if (ieCropBtn) {
    ieCropBtn.addEventListener("click", function () {
      // Recorte simple: cuadrar centrado
      if (!imagenOriginal) return;
      const lado = Math.min(imagenOriginal.width, imagenOriginal.height);
      const x = (imagenOriginal.width - lado) / 2;
      const y = (imagenOriginal.height - lado) / 2;
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = lado;
      tempCanvas.height = lado;
      const tctx = tempCanvas.getContext("2d");
      tctx.drawImage(imagenOriginal, x, y, lado, lado, 0, 0, lado, lado);
      const nuevaImg = new Image();
      nuevaImg.onload = function () {
        imagenOriginal = nuevaImg;
        rotacion = 0;
        dibujarCanvas();
      };
      nuevaImg.src = tempCanvas.toDataURL("image/jpeg", 0.92);
    });
  }

  if (ieCancelBtn) {
    ieCancelBtn.addEventListener("click", function () {
      imageEditorModal.classList.remove("show");
      imagenOriginal = null;
      archivoOriginal = null;
      textoOverlay = null;
      contextoEditor = null;
    });
  }

  if (ieSendBtn) {
    ieSendBtn.addEventListener("click", async function () {
      if (!archivoOriginal) return;
      ieSendBtn.textContent = "⏳ Subiendo...";
      ieSendBtn.disabled = true;

      ieCanvas.toBlob(async function (blob) {
        try {
          const ext = "jpg";
          const nombreArchivo = "img_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8) + "." + ext;
          const archivoFinal = new File([blob], nombreArchivo, { type: "image/jpeg" });

          const { error: upErr } = await supabaseClient.storage
            .from("archivos")
            .upload(nombreArchivo, archivoFinal, { contentType: "image/jpeg" });

          if (upErr) {
            alert("Error al subir: " + upErr.message);
            ieSendBtn.textContent = "Enviar ➤";
            ieSendBtn.disabled = false;
            return;
          }

          const { data: urlData } = supabaseClient.storage.from("archivos").getPublicUrl(nombreArchivo);
          const publicUrl = urlData.publicUrl;

          if (contextoEditor === "estado") {
            const { error } = await supabaseClient.from("zumm_estados").insert([{
              username: username,
              file_url: publicUrl,
              file_name: nombreArchivo,
              file_type: "image/jpeg"
            }]);
            if (error) { alert("Error: " + error.message); }
            else { alert("✅ Estado publicado"); if (typeof cargarEstados === "function") cargarEstados(); }
          } else {
            const texto = (typeof inputEl !== "undefined" && inputEl) ? inputEl.value.trim() : "";
            if (inputEl) inputEl.value = "";
            const textoConReply = (typeof construirTextoConReply === "function") ? construirTextoConReply(texto || "") : (texto || "");
            const { error } = await supabaseClient.from("zumm_messages").insert([{
              text: textoConReply,
              username: username,
              room: currentRoom,
              file_url: publicUrl,
              file_name: nombreArchivo,
              file_type: "image/jpeg"
            }]);
            if (error) { alert("Error: " + error.message); }
            else {
              if (typeof ocultarReplyBar === "function") ocultarReplyBar();
            }
          }

          imageEditorModal.classList.remove("show");
          imagenOriginal = null;
          archivoOriginal = null;
          textoOverlay = null;
          contextoEditor = null;
          ieSendBtn.textContent = "Enviar ➤";
          ieSendBtn.disabled = false;
        } catch (e) {
          alert("Error: " + e.message);
          ieSendBtn.textContent = "Enviar ➤";
          ieSendBtn.disabled = false;
        }
      }, "image/jpeg", 0.92);
    });
  }

  // Interceptar fileInput y cameraInput para abrir editor
  const fileInput = document.getElementById("fileInput");
  const cameraInput = document.getElementById("cameraInput");
  const estadoInputReal = document.getElementById("estadoInput");

  if (fileInput) {
    fileInput.addEventListener("change", function (e) {
      const file = fileInput.files[0];
      if (!file) return;
      if (file.type && file.type.startsWith("image/")) {
        e.stopImmediatePropagation();
        abrirEditorImagen(file, "chat");
        fileInput.value = "";
      }
    }, true);
  }

  if (cameraInput) {
    cameraInput.addEventListener("change", function (e) {
      const file = cameraInput.files[0];
      if (!file) return;
      e.stopImmediatePropagation();
      abrirEditorImagen(file, "chat");
      cameraInput.value = "";
    }, true);
  }

  if (estadoInputReal) {
    estadoInputReal.addEventListener("change", function (e) {
      const file = estadoInputReal.files[0];
      if (!file) return;
      if (file.type && file.type.startsWith("image/")) {
        e.stopImmediatePropagation();
        abrirEditorImagen(file, "estado");
        estadoInputReal.value = "";
      }
    }, true);
  }

  // ==========================================================
  // 2) BÚSQUEDA GLOBAL EN TODOS LOS CHATS
  // ==========================================================
  const globalSearchBtn = document.getElementById("globalSearchBtn");
  const globalSearchModal = document.getElementById("globalSearchModal");
  const gsCloseBtn = document.getElementById("gsCloseBtn");
  const gsInput = document.getElementById("gsInput");
  const gsResults = document.getElementById("gsResults");
  const gsEmpty = document.getElementById("gsEmpty");

  let gsTimeout = null;

  if (globalSearchBtn) {
    globalSearchBtn.addEventListener("click", function () {
      globalSearchModal.classList.add("show");
      setTimeout(function () { if (gsInput) gsInput.focus(); }, 100);
    });
  }

  if (gsCloseBtn) {
    gsCloseBtn.addEventListener("click", function () {
      globalSearchModal.classList.remove("show");
      gsInput.value = "";
      gsResults.innerHTML = "";
      gsEmpty.style.display = "block";
      gsEmpty.textContent = "Escribe algo para buscar...";
    });
  }

  if (gsInput) {
    gsInput.addEventListener("input", function () {
      clearTimeout(gsTimeout);
      const q = gsInput.value.trim();
      if (q.length < 2) {
        gsResults.innerHTML = "";
        gsEmpty.style.display = "block";
        gsEmpty.textContent = "Escribe al menos 2 letras...";
        return;
      }
      gsTimeout = setTimeout(function () { buscarGlobal(q); }, 400);
    });
  }

  async function buscarGlobal(query) {
    gsResults.innerHTML = "<p style='text-align:center;color:var(--text-dim);padding:20px;'>Buscando...</p>";
    gsEmpty.style.display = "none";

    try {
      const q = query.toLowerCase();
      const { data, error } = await supabaseClient.from("zumm_messages")
        .select("id, text, username, room, created_at, file_type")
        .ilike("text", "%" + query + "%")
        .neq("room", "estados")
        .order("created_at", { ascending: false })
        .limit(80);

      if (error) { gsResults.innerHTML = "<p style='text-align:center;color:#ff5252;padding:20px;'>Error: " + error.message + "</p>"; return; }

      if (!data || data.length === 0) {
        gsResults.innerHTML = "";
        gsEmpty.style.display = "block";
        gsEmpty.textContent = "Sin resultados para: " + query;
        return;
      }

      gsResults.innerHTML = "";
      data.forEach(function (m) {
        const div = document.createElement("div");
        div.className = "gs-result";

        const head = document.createElement("div");
        head.className = "gs-result-head";
        const name = document.createElement("span");
        name.className = "gs-result-name";
        name.textContent = m.username || "Anónimo";
        const fecha = document.createElement("span");
        fecha.textContent = formatHoraCorta(m.created_at);
        head.appendChild(name); head.appendChild(fecha);

        const texto = document.createElement("div");
        texto.className = "gs-result-text";
        const txt = m.text || "";
        const idx = txt.toLowerCase().indexOf(q);
        if (idx >= 0) {
          const antes = txt.substring(0, idx);
          const match = txt.substring(idx, idx + query.length);
          const despues = txt.substring(idx + query.length);
          const mark = document.createElement("mark");
          mark.textContent = match;
          texto.appendChild(document.createTextNode(antes));
          texto.appendChild(mark);
          texto.appendChild(document.createTextNode(despues));
        } else {
          texto.textContent = txt.substring(0, 150);
        }

        const room = document.createElement("div");
        room.className = "gs-result-room";
        room.textContent = "📁 " + roomLabel(m.room);

        div.appendChild(head);
        div.appendChild(texto);
        div.appendChild(room);

        div.addEventListener("click", function () {
          globalSearchModal.classList.remove("show");
          if (typeof switchRoom === "function") {
            switchRoom(m.room);
            setTimeout(function () {
              const el = messagesEl.querySelector('[data-msg-id="' + m.id + '"]');
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                el.classList.add("highlight");
                setTimeout(function () { el.classList.remove("highlight"); }, 2000);
              }
            }, 800);
          }
        });

        gsResults.appendChild(div);
      });
    } catch (e) {
      gsResults.innerHTML = "<p style='text-align:center;color:#ff5252;padding:20px;'>Error: " + e.message + "</p>";
    }
  }

  // ==========================================================
  // 3) VISOR DE PDF
  // ==========================================================
  const pdfViewerModal = document.getElementById("pdfViewerModal");
  const pdfCloseBtn = document.getElementById("pdfCloseBtn");
  const pdfFrame = document.getElementById("pdfFrame");
  const pdfTitle = document.getElementById("pdfTitle");
  const pdfDownloadBtn = document.getElementById("pdfDownloadBtn");

  window.abrirPDF = function (url, nombre) {
    if (!pdfViewerModal) return;
    pdfFrame.src = url;
    pdfTitle.textContent = nombre || "PDF";
    pdfDownloadBtn.href = url;
    pdfViewerModal.classList.add("show");
  };

  if (pdfCloseBtn) {
    pdfCloseBtn.addEventListener("click", function () {
      pdfViewerModal.classList.remove("show");
      pdfFrame.src = "";
    });
  }

  // Interceptar clicks en enlaces de archivos PDF para abrirlos en el visor
  document.addEventListener("click", function (e) {
    const a = e.target.closest(".msg-file-link");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    const nombre = a.querySelector(".name") ? a.querySelector(".name").textContent : "";
    if (href.toLowerCase().includes(".pdf") || nombre.toLowerCase().includes(".pdf")) {
      e.preventDefault();
      e.stopPropagation();
      abrirPDF(href, nombre);
    }
  }, true);

  // ==========================================================
  // 4) GRÁFICO DE ACTIVIDAD EN ESTADÍSTICAS
  // ==========================================================
  const statsChart = document.getElementById("statsChart");
  const statsBtnReal = document.getElementById("statsBtn");

  function dibujarGraficoEstadisticas(datos) {
    if (!statsChart) return;
    statsChart.innerHTML = "";

    // datos: array de {dia: "Lun", cantidad: 5}
    const max = Math.max(1, ...datos.map(function (d) { return d.cantidad; }));
    const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    datos.forEach(function (d) {
      const wrap = document.createElement("div");
      wrap.className = "stat-bar-wrap";

      const valor = document.createElement("div");
      valor.className = "stat-bar-value";
      valor.textContent = d.cantidad > 0 ? d.cantidad : "";
      wrap.appendChild(valor);

      const bar = document.createElement("div");
      bar.className = "stat-bar";
      const altura = d.cantidad === 0 ? 3 : Math.max(6, Math.round((d.cantidad / max) * 80));
      bar.style.height = altura + "px";
      wrap.appendChild(bar);

      const label = document.createElement("div");
      label.className = "stat-bar-label";
      label.textContent = d.dia;
      wrap.appendChild(label);

      statsChart.appendChild(wrap);
    });
  }

  if (statsBtnReal) {
    statsBtnReal.addEventListener("click", async function () {
      // Esperar a que se abra el modal
      setTimeout(async function () {
        if (!statsChart) return;
        statsChart.innerHTML = "<p style='text-align:center;color:var(--text-dim);font-size:12px;padding:8px;'>Cargando gráfico...</p>";
        try {
          const hace7dias = new Date();
          hace7dias.setDate(hace7dias.getDate() - 6);
          hace7dias.setHours(0, 0, 0, 0);

          const { data } = await supabaseClient.from("zumm_messages")
            .select("created_at")
            .eq("username", username)
            .gte("created_at", hace7dias.toISOString());

          const conteo = {};
          for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            const key = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            conteo[key] = 0;
          }

          (data || []).forEach(function (m) {
            const d = new Date(m.created_at);
            const key = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            if (conteo[key] !== undefined) conteo[key]++;
          });

          const datos = [];
          for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            const key = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            datos.push({
              dia: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"][d.getDay()],
              cantidad: conteo[key] || 0
            });
          }

          dibujarGraficoEstadisticas(datos);
        } catch (e) {
          if (statsChart) statsChart.innerHTML = "<p style='text-align:center;color:#ff5252;font-size:12px;'>Error</p>";
        }
      }, 400);
    });
  }

  // ==========================================================
  // 5) FIX: PDFs en mensajes se abren con visor
  // ==========================================================
  const _renderOrig5 = window.renderMessage;
  window.renderMessage = function (m, esNuevo) {
    _renderOrig5(m, esNuevo);
    if (!messagesEl || !m || !m.id) return;
    const div = messagesEl.querySelector('[data-msg-id="' + m.id + '"]');
    if (!div) return;

    // Detectar si es PDF y reemplazar el enlace por uno bonito
    if (m.file_url && (m.file_type || "").includes("pdf")) {
      const enlaceViejo = div.querySelector(".msg-file-link");
      if (enlaceViejo && !enlaceViejo.dataset.pdfMejorado) {
        enlaceViejo.dataset.pdfMejorado = "1";
        enlaceViejo.classList.add("pdf-embed-link");
        enlaceViejo.innerHTML = "";
        const icon = document.createElement("div");
        icon.className = "pdf-icon";
        icon.textContent = "📄";
        const info = document.createElement("div");
        info.className = "pdf-info";
        const nom = document.createElement("div");
        nom.className = "pdf-name";
        nom.textContent = m.file_name || "documento.pdf";
        const tip = document.createElement("div");
        tip.className = "pdf-tip";
        tip.textContent = "Toca para ver en la app";
        info.appendChild(nom); info.appendChild(tip);
        enlaceViejo.appendChild(icon);
        enlaceViejo.appendChild(info);
      }
    }
  };

})();
