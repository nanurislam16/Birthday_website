const candles = document.querySelectorAll(".candle");
const wishBtn = document.getElementById("wishBtn");
const cutBtn = document.getElementById("cutBtn");
const topIntroText = document.getElementById("topIntroText");
const bottomCard = document.getElementById("bottomCard");
const cakeArea = document.querySelector(".cake-area");

let candlesOff = false;
let cakeCut = false;

/* SKY LANTERNS */
const lanternSky = document.getElementById("lanternSky");
function createLanterns(number) {
    if (!lanternSky) return;
    for (let i = 0; i < number; i++) {
        const lantern = document.createElement("div");
        lantern.className = "sky-lantern";
        lantern.style.left = Math.random() * 100 + "%";
        lantern.style.bottom = (-10 - Math.random() * 50) + "%";
        lantern.style.animationDuration = (10 + Math.random() * 12) + "s";
        lantern.style.animationDelay = (-Math.random() * 15) + "s";
        const scale = .5 + Math.random() * .8;
        lantern.style.transform = `scale(${scale})`;
        lanternSky.appendChild(lantern);
    }
}
createLanterns(20);

/* BLOW CANDLES */
if (wishBtn) {
    wishBtn.addEventListener("click", () => {
        if (candlesOff) return;
        candlesOff = true;

        candles.forEach((candle, index) => {
            setTimeout(() => { candle.classList.add("off"); }, index * 120);
        });

        // Update Top Text Smoothly
        topIntroText.style.opacity = "0";
        setTimeout(() => {
            topIntroText.innerHTML = "তোমার হৃদয়ের প্রতিটি প্রতিক্রিয়া ও ইচ্ছা তারাদের মাঝে পৌঁছে যাক... ♡";
            topIntroText.style.opacity = "1";
        }, 400);

        wishBtn.style.display = "none";
        cutBtn.classList.add("show");
    });
}

/* CUT CAKE */
if (cutBtn) {
    cutBtn.addEventListener("click", () => {
        if (!candlesOff || cakeCut) return;
        cakeCut = true;

        cakeArea.classList.add("cutting");
        cutBtn.disabled = true;
        cutBtn.style.opacity = ".5";

        setTimeout(() => {
            bottomCard.classList.add("show");
            bottomCard.scrollIntoView({ behavior: 'smooth' });
        }, 1200);
    });
}

/* MUSIC */
const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");
let musicPlaying = false;

if (musicBtn && music) {
    musicBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!musicPlaying) {
            music.play().then(() => {
                musicPlaying = true;
                musicBtn.innerHTML = "♫ Music On";
            }).catch(() => {
                alert("birthday.mp3 file-ti project folder-e thaka lagbe.");
            });
        } else {
            music.pause();
            musicPlaying = false;
            musicBtn.innerHTML = "♪ Music Off";
        }
    });
}