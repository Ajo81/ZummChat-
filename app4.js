// ============================================================
// ZummChat - Mejoras estilo WhatsApp (app4.js)
// Se carga DESPUÉS de app3.js. Solo mejora, no reemplaza.
// Creado por: José Yudier Arencibia Ajo - © 2026
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
        chk.classList.add(mensajeLeido(m) ? "leido" : "enviado");
        footer.appendChild(chk);
      }

      content.appendChild(footer);
    }

    if (!div.querySelector(".swipe-indicator")) {
      const sw = document.createElement("div");
      sw.className = "swipe-indicator";
      sw.textContent = "↩️";
      div.insertBefore(sw, div.firstChild);
    }

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

})();
