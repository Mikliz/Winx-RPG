
/* =========================================
   1. NAVEGAÇÃO
   ========================================= */

const navButtons = document.querySelectorAll(".nav");

function activateButton(id) {
  navButtons.forEach((button) => {
    button.classList.remove("active");
  });

  const selectedButton = document.querySelector(
    `.nav[data-id="${id}"]`
  );

  if (selectedButton) {
    selectedButton.classList.add("active");
    history.replaceState(null, "", "#" + id);
  }
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateButton(button.dataset.id);
  });
});


/* =========================================
   2. MÚSICA DE FUNDO
   ========================================= */

const musicButton = document.getElementById("musicToggle");
const musicAudio = document.getElementById("backgroundMusic");

if (musicButton && musicAudio) {
  musicButton.addEventListener("click", async () => {
    if (musicAudio.paused) {
      try {
        await musicAudio.play();

        musicButton.setAttribute("aria-label", "Pausar música");
        musicButton.setAttribute("aria-pressed", "true");
      } catch (error) {
        console.error("Erro ao iniciar a música:", error);
      }
    } else {
      musicAudio.pause();

      musicButton.setAttribute("aria-label", "Ligar música");
      musicButton.setAttribute("aria-pressed", "false");
    }
  });
}


/* =========================================
   3. MODO LUNAR
   ========================================= */

const moonToggle = document.getElementById("moonToggle");

if (moonToggle) {
  const updateMoonMode = (enabled) => {
    document.body.classList.toggle("night-mode", enabled);
    moonToggle.classList.toggle("is-active", enabled);

    moonToggle.setAttribute("aria-pressed", String(enabled));
    moonToggle.setAttribute(
      "aria-label",
      enabled ? "Desativar modo lunar" : "Ativar modo lunar"
    );
  };

  moonToggle.addEventListener("click", () => {
    const enabled = !document.body.classList.contains("night-mode");
    updateMoonMode(enabled);
  });

  updateMoonMode(false);
}


/* =========================================
   4. MODAL DE AVENTURAS
   Eternos I, II e III
   ========================================= */

const adventures = {
  ocean: {
    category: "PRIMEIRO CÍRCULO • MAGIAS SIMPLES",
    title: "Eternos I",
    intro:
      "O início da jornada mágica. Descubra feitiços essenciais, aprenda a controlar sua energia e pratique encantamentos simples que formam a base de toda magia.",
    words: [
      "Magias simples",
      "Fundamentos",
      "Primeiros encantamentos"
    ],
    image:
      "https://depositode-imagens.weebly.com/uploads/1/4/6/0/146068298/captura-de-tela-2026-10-14-141447_orig.png",
    caption: "Toda grande magia começa com um primeiro feitiço.",
    link: "eternos-1.html"
  },

  space: {
    category: "SEGUNDO CÍRCULO • MAGIAS AVANÇADAS",
    title: "Eternos II",
    intro:
      "Vá além do básico e explore magias mais complexas. Aperfeiçoe sua técnica, combine encantamentos e descubra poderes que exigem conhecimento, precisão e domínio.",
    words: [
      "Magias complexas",
      "Técnicas avançadas",
      "Domínio mágico"
    ],
    image:
      "https://depositode-imagens.weebly.com/uploads/1/4/6/0/146068298/captura-de-tela-2026-10-14-141433_orig.png",
    caption: "Um novo nível de poder espera por você.",
    link: "eternos-2.html"
  },

  adventure: {
    category: "CÍRCULO OCULTO • BRUXAS",
    title: "Eternos III",
    intro:
      "Um caminho reservado às bruxas. Investigue artes arcanas exclusivas, rituais secretos e conhecimentos sombrios que não são encontrados nos círculos anteriores.",
    words: [
      "Magias exclusivas",
      "Artes arcanas",
      "Segredos das bruxas"
    ],
    image:
      "https://depositode-imagens.weebly.com/uploads/1/4/6/0/146068298/captura-de-tela-2026-10-14-141459_orig.png",
    caption: "Segredos antigos, poder além dos limites.",
    link: "eternos-3.html"
  }
};


/* =========================================
   5. GALERIA DE 27 HEXÁGONOS MÁGICOS
   ========================================= */

(() => {
  "use strict";

  /* -----------------------------------------
     5.1. ELEMENTOS PRINCIPAIS
     ----------------------------------------- */

  const gallery = document.querySelector(".gallery");
  const modal = document.getElementById("hexModal");

  if (!gallery || !modal) {
    console.warn(
      "Galeria ou janela modal não encontrada. Verifique o HTML."
    );
    return;
  }

  /*
   * Move o modal para o body.
   * Isso ajuda a evitar que os contêineres da página
   * limitem a camada visual do modal.
   */
  if (modal.parentElement !== document.body) {
    document.body.appendChild(modal);
  }

  const panel = modal.querySelector(".hex-modal__panel");
  const modalImage = document.getElementById("hexModalImage");
  const modalTitle = document.getElementById("hexModalTitle");
  const modalBody = document.getElementById("hexModalBody");
  const modalContent = document.getElementById("hexModalContent");
  const closeButton = document.getElementById("hexModalClose");
  const contentLibrary = document.querySelector(".hex-content-library");

  let lastTrigger = null;
  let previousBodyOverflow = "";

  /* -----------------------------------------
     5.2. LOCALIZAR O ARTIGO DO HEXÁGONO
     ----------------------------------------- */

  function getContentArticle(button) {
    const contentId = button.dataset.contentId;

    if (!contentId) {
      return null;
    }

    return document.getElementById(contentId);
  }

  /* -----------------------------------------
     5.3. LOCALIZAR A IMAGEM PERSONALIZADA
     ----------------------------------------- */

  function getCustomImage(article) {
    if (!article) {
      return "";
    }

    const image = article.querySelector(".hex-content-image");

    if (!image) {
      return "";
    }

    const source = image.getAttribute("src");

    if (
      !source ||
      source.trim() === "" ||
      source.startsWith("TROQUE-PELA-URL")
    ) {
      return "";
    }

    return image.src;
  }

  /* -----------------------------------------
     5.4. ABRIR A JANELA
     ----------------------------------------- */

  function openModal(button) {
    if (
      !button ||
      !modalImage ||
      !modalTitle ||
      !modalBody ||
      !modalContent
    ) {
      return;
    }

    lastTrigger = button;

    const thumbnail = button.querySelector("img");
    const article = getContentArticle(button);

    /*
     * Prioridade da imagem:
     * 1. Imagem personalizada do artigo.
     * 2. Imagem definida em data-modal-image.
     * 3. Miniatura do hexágono.
     */

    const customImage = getCustomImage(article);
    const modalImageAttribute = button.dataset.modalImage || "";
    const thumbnailImage = thumbnail ? thumbnail.src : "";

    const selectedImage =
      customImage ||
      (
        modalImageAttribute &&
        !modalImageAttribute.startsWith("TROQUE-PELA-URL")
          ? modalImageAttribute
          : ""
      ) ||
      thumbnailImage;

    /* Atualizar imagem */

    modalImage.onerror = null;
    modalImage.removeAttribute("src");

    modalImage.alt =
      (
        article &&
        article.querySelector(".hex-content-image")?.alt
      ) ||
      (thumbnail ? thumbnail.alt : "") ||
      button.dataset.title ||
      "";

    modalImage.onerror = function () {
      if (
        thumbnailImage &&
        modalImage.src !== thumbnailImage
      ) {
        modalImage.onerror = null;
        modalImage.src = thumbnailImage;
      }
    };

    if (selectedImage) {
      modalImage.src = selectedImage;
    }

    /* Atualizar título */

    const articleHeading = article
      ? article.querySelector("h1, h2, h3, h4")
      : null;

    modalTitle.textContent =
      button.dataset.title ||
      (articleHeading ? articleHeading.textContent.trim() : "") ||
      (thumbnail ? thumbnail.alt : "") ||
      "Conteúdo";

    /* Atualizar corpo */

    modalBody.replaceChildren();

    if (article) {
      const clonedArticle = article.cloneNode(true);

      /* Remover o título duplicado */

      const firstHeading = clonedArticle.querySelector(
        "h1, h2, h3, h4"
      );

      if (firstHeading) {
        firstHeading.remove();
      }

      /* Remover a imagem já exibida à esquerda */

      clonedArticle
        .querySelectorAll(".hex-content-image")
        .forEach((image) => image.remove());

      /* Transferir o conteúdo para o modal */

      while (clonedArticle.firstChild) {
        modalBody.appendChild(clonedArticle.firstChild);
      }
    } else {
      const description = button.dataset.description || "";

      if (description) {
        const paragraph = document.createElement("p");
        paragraph.textContent = description;
        modalBody.appendChild(paragraph);
      }
    }

    /* Aplicar papel de parede opcional */

    const wallpaper = button.dataset.wallpaper || "";

    if (wallpaper) {
      modalContent.classList.add("has-wallpaper");

      modalContent.style.setProperty(
        "--hex-modal-wallpaper",
        `url("${wallpaper.replace(/["\\]/g, "\\$&")}")`
      );
    } else {
      modalContent.classList.remove("has-wallpaper");
      modalContent.style.removeProperty("--hex-modal-wallpaper");
    }

    /* Abrir modal */

    previousBodyOverflow = document.body.style.overflow;

    modal.inert = false;
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("is-open");

    document.body.classList.add("hex-modal-open");
    document.body.style.overflow = "hidden";

    /* Levar o foco ao botão de fechar */

    if (closeButton) {
      closeButton.focus();
    } else if (panel) {
      panel.focus();
    }
  }

  /* -----------------------------------------
     5.5. FECHAR A JANELA
     ----------------------------------------- */

  function closeModal() {
    if (!modal.classList.contains("is-open")) {
      return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modal.inert = true;

    document.body.classList.remove("hex-modal-open");
    document.body.style.overflow = previousBodyOverflow;

    /* Evitar tentativas de carregar imagens ao fechar */

    modalImage.onerror = null;

    /* Limpar conteúdo */

    modalBody.replaceChildren();
    modalTitle.textContent = "";

    /* Limpar papel de parede */

    modalContent.classList.remove("has-wallpaper");
    modalContent.style.removeProperty("--hex-modal-wallpaper");

    /* Restaurar o foco */

    if (lastTrigger && lastTrigger.isConnected) {
      lastTrigger.focus();
    }

    lastTrigger = null;
  }

  /* -----------------------------------------
     5.6. CLIQUES NOS HEXÁGONOS
     ----------------------------------------- */

  gallery.querySelectorAll(".hexagon-btn").forEach((button) => {
    button.addEventListener("click", () => {
      openModal(button);
    });
  });

  /* -----------------------------------------
     5.7. BOTÃO DE FECHAR
     ----------------------------------------- */

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  /* -----------------------------------------
     5.8. CLIQUE NO FUNDO ESCURO
     ----------------------------------------- */

  modal.querySelectorAll("[data-hex-close]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  /* -----------------------------------------
     5.9. TECLA ESC
     ----------------------------------------- */

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      modal.classList.contains("is-open")
    ) {
      closeModal();
    }
  });

  /* -----------------------------------------
     5.10. INICIALIZAÇÃO
     ----------------------------------------- */

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modal.inert = true;

  if (contentLibrary) {
    contentLibrary.hidden = true;
  }
})();
