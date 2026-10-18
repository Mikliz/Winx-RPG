/*
  JavaScript do projeto.
  A estrutura, palavras e ícones permanecem no HTML.
  Aqui ficam apenas os comportamentos: seleção dos botões de navegação
  e controle de reprodução da música.
*/


const buttons = document.querySelectorAll('.nav');

function activateButton(id) {
  buttons.forEach(button => {
    button.classList.remove('active');
  });

  const selectedButton = document.querySelector(
    `.nav[data-id="${id}"]`
  );

  if (selectedButton) {
    selectedButton.classList.add('active');
    history.replaceState(null, '', '#' + id);
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    activateButton(button.dataset.id);
  });
});


const musicButton = document.getElementById("musicToggle");
const musicAudio = document.getElementById("backgroundMusic");

if (musicButton && musicAudio) {

    musicButton.addEventListener("click", async () => {

        if (musicAudio.paused) {

            try {
                await musicAudio.play();

                musicButton.setAttribute(
                    "aria-label",
                    "Pausar música"
                );

                musicButton.setAttribute(
                    "aria-pressed",
                    "true"
                );

            } catch (error) {
                console.error(
                    "Erro ao iniciar a música:",
                    error
                );
            }

        } else {

            musicAudio.pause();

            musicButton.setAttribute(
                "aria-label",
                "Ligar música"
            );

            musicButton.setAttribute(
                "aria-pressed",
                "false"
            );

        }

    });

}


/* ===== Modo lunar ===== */
const moonToggle = document.getElementById('moonToggle');

if (moonToggle) {
  const updateMoonMode = (enabled) => {
    document.body.classList.toggle('night-mode', enabled);
    moonToggle.classList.toggle('is-active', enabled);
    moonToggle.setAttribute('aria-pressed', String(enabled));
    moonToggle.setAttribute('aria-label', enabled ? 'Desativar modo lunar' : 'Ativar modo lunar');
  };

  moonToggle.addEventListener('click', () => {
    updateMoonMode(!document.body.classList.contains('night-mode'));
  });

  updateMoonMode(false);
}

const adventures = {
  ocean: {
    category: "PRIMEIRO CÍRCULO • MAGIAS SIMPLES",
    title: "Eternos I",
    intro: "O início da jornada mágica. Descubra feitiços essenciais, aprenda a controlar sua energia e pratique encantamentos simples que formam a base de toda magia.",
    words: ["Magias simples", "Fundamentos", "Primeiros encantamentos"],
    image: "https://depositode-imagens.weebly.com/uploads/1/4/6/0/146068298/captura-de-tela-2026-10-14-141447_orig.png",
    caption: "Toda grande magia começa com um primeiro feitiço.",
    link: "eternos-1.html"
  },
  space: {
    category: "SEGUNDO CÍRCULO • MAGIAS AVANÇADAS",
    title: "Eternos II",
    intro: "Vá além do básico e explore magias mais complexas. Aperfeiçoe sua técnica, combine encantamentos e descubra poderes que exigem conhecimento, precisão e domínio.",
    words: ["Magias complexas", "Técnicas avançadas", "Domínio mágico"],
    image: "https://depositode-imagens.weebly.com/uploads/1/4/6/0/146068298/captura-de-tela-2026-10-14-141433_orig.png",
    caption: "Um novo nível de poder espera por você.",
    link: "eternos-2.html"
  },
  adventure: {
    category: "CÍRCULO OCULTO • BRUXAS",
    title: "Eternos III",
    intro: "Um caminho reservado às bruxas. Investigue artes arcanas exclusivas, rituais secretos e conhecimentos sombrios que não são encontrados nos círculos anteriores.",
    words: ["Magias exclusivas", "Artes arcanas", "Segredos das bruxas"],
    image: "https://depositode-imagens.weebly.com/uploads/1/4/6/0/146068298/captura-de-tela-2026-10-14-141459_orig.png",
    caption: "Segredos antigos, poder além dos limites.",
    link: "eternos-3.html"
  }
};

const modal = document.getElementById("adventureModal");
// Mantém a janela diretamente no body para que o fundo escurecido cubra o site inteiro.
if (modal.parentElement !== document.body) document.body.appendChild(modal);
const title = document.getElementById("modalTitle");
const category = document.getElementById("modalCategory");
const intro = document.getElementById("modalIntro");
const words = document.getElementById("modalWords");
const image = document.getElementById("modalImage");
const caption = document.getElementById("wallpaperCaption");
const link = document.getElementById("modalLink");
const closeButton = modal.querySelector(".modal-close");
let lastFocusedElement = null;

function openAdventure(key) {
  const item = adventures[key];
  if (!item) return;
  lastFocusedElement = document.activeElement;
  category.textContent = item.category;
  title.textContent = item.title;
  intro.textContent = item.intro;
  image.src = item.image;
  image.alt = `Wallpaper de ${item.title}`;
  caption.textContent = item.caption;
  link.href = item.link;
  words.replaceChildren(...item.words.map(word => {
    const tag = document.createElement("span");
    tag.className = "keyword";
    tag.textContent = word;
    return tag;
  }));
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeButton.focus();
}

function closeAdventure() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll(".adventure-card").forEach(card => {
  card.addEventListener("click", () => openAdventure(card.dataset.adventure));
});
closeButton.addEventListener("click", closeAdventure);
modal.addEventListener("click", event => {
  if (event.target === modal) closeAdventure();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) closeAdventure();
});

