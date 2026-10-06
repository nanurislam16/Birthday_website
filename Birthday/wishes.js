const lanternContainer = document.getElementById("lanternContainer");

/* Create a dense, continuously moving lantern sky */
function createLanterns(amount = 42) {
  lanternContainer.innerHTML = "";

  for (let i = 0; i < amount; i++) {
    const lantern = document.createElement("div");
    lantern.className = "sky-lantern";

    lantern.style.left = `${Math.random() * 100}%`;
    lantern.style.animationDuration = `${14 + Math.random() * 18}s`;
    lantern.style.animationDelay = `${-Math.random() * 30}s`;
    lantern.style.width = `${17 + Math.random() * 13}px`;
    lantern.style.height = `${28 + Math.random() * 19}px`;
    lantern.style.opacity = `${0.35 + Math.random() * 0.65}`;

    lanternContainer.appendChild(lantern);
  }
}
createLanterns();

/* User wishes */
const form = document.getElementById("wishForm");
const wishText = document.getElementById("wishText");
const wishName = document.getElementById("wishName");
const charCount = document.getElementById("charCount");
const customSection = document.getElementById("customSection");
const customWishes = document.getElementById("customWishes");
const toast = document.getElementById("toast");

wishText.addEventListener("input", () => {
  charCount.textContent = `${wishText.value.length} / 280`;
});

function getWishes() {
  try {
    return JSON.parse(localStorage.getItem("kathgolapWishesV2")) || [];
  } catch {
    return [];
  }
}

function saveWishes(wishes) {
  localStorage.setItem("kathgolapWishesV2", JSON.stringify(wishes));
}

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderWishes() {
  const wishes = getWishes();
  customWishes.innerHTML = "";

  if (!wishes.length) {
    customSection.classList.add("hidden");
    return;
  }

  customSection.classList.remove("hidden");

  wishes.forEach((wish, index) => {
    const card = document.createElement("article");
    card.className = "custom-wish";

    card.innerHTML = `
      <div class="pin"></div>
      <button class="delete" title="Delete this wish" data-index="${index}">×</button>
      <div class="user-icon">💌</div>
      <p>${escapeHTML(wish.text)}</p>
      <small>— ${escapeHTML(wish.name || "একজন শুভাকাঙ্ক্ষী")}</small>
    `;

    customWishes.appendChild(card);
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = wishText.value.trim();
  const name = wishName.value.trim();

  if (!text) {
    showToast("♡ আগে একটা Wish লিখো!");
    wishText.focus();
    return;
  }

  const wishes = getWishes();

  wishes.push({
    text,
    name,
    createdAt: new Date().toISOString()
  });

  saveWishes(wishes);
  renderWishes();

  form.reset();
  charCount.textContent = "0 / 280";

  showToast("♡ তোমার Wish নতুন Card হয়ে গেছে!");

  setTimeout(() => {
    customSection.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 250);
});

customWishes.addEventListener("click", (event) => {
  const button = event.target.closest(".delete");
  if (!button) return;

  const index = Number(button.dataset.index);
  const wishes = getWishes();

  wishes.splice(index, 1);
  saveWishes(wishes);
  renderWishes();

  showToast("Wish Card টি সরিয়ে দেওয়া হয়েছে।");
});

renderWishes();
