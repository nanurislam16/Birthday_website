/* =========================
   SKY LANTERNS
========================= */

const lanternContainer =
    document.getElementById("lanternContainer");

function createLanterns(amount = 25) {

    for (let i = 0; i < amount; i++) {

        const lantern = document.createElement("div");

        lantern.className = "sky-lantern";

        lantern.style.left =
            Math.random() * 100 + "%";

        lantern.style.bottom =
            (-10 - Math.random() * 40) + "%";

        lantern.style.animationDelay =
            (Math.random() * 10) + "s";

        lantern.style.animationDuration =
            (10 + Math.random() * 10) + "s";

        const scale =
            0.55 + Math.random() * 0.75;

        lantern.style.transform =
            `scale(${scale})`;

        lanternContainer.appendChild(lantern);
    }
}

createLanterns(30);


/* =========================
   COUNTDOWN
========================= */

const count1 =
    document.getElementById("count1");

const count2 =
    document.getElementById("count2");

const count3 =
    document.getElementById("count3");

const readyText =
    document.getElementById("readyText");

let countdownStarted = false;


function startCountdown() {

    if (countdownStarted) return;

    countdownStarted = true;

    const boxes = [
        count1,
        count2,
        count3
    ];

    let number = 3;

    boxes.forEach((box) => {
        box.style.opacity = ".15";
        box.style.transform = "scale(.7)";
    });

    function showNumber() {

        if (number <= 0) {

            readyText.innerHTML =
                "♥ The Magic Begins... ♥";

            boxes.forEach((box) => {
                box.style.opacity = "1";
                box.style.transform = "scale(1)";
            });

            return;
        }

        const current =
            boxes[3 - number];

        current.style.opacity = "1";
        current.style.transform = "scale(1.15)";

        setTimeout(() => {

            current.style.transform =
                "scale(1)";

            number--;

            showNumber();

        }, 1000);
    }

    showNumber();
}


/* Automatically start */
window.addEventListener("load", () => {

    setTimeout(() => {
        startCountdown();
    }, 500);

});


/* Click anywhere */
document.addEventListener("click", () => {

    startCountdown();

}, {
    once: true
});


/* Top start button */
document
    .getElementById("startTop")
    .addEventListener("click", (event) => {

        event.stopPropagation();

        startCountdown();

    });


/* =========================
   MUSIC
========================= */

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("birthdayMusic");
    const musicBtn = document.getElementById("musicBtn");
    const pauseMusicBtn = document.getElementById("pauseMusic");

    if (audio) {
        // LocalStorage থেকে গানের স্টেট চেক করা
        const isPlaying = localStorage.getItem("musicPlaying") === "true";
        const savedTime = parseFloat(localStorage.getItem("musicTime")) || 0;

        audio.currentTime = savedTime;

        if (isPlaying) {
            audio.play().catch(() => {
                console.log("Autoplay blocked. Waiting for user interaction.");
            });
            updateMusicButtons(true);
        } else {
            updateMusicButtons(false);
        }

        // প্রতি সেকেন্ডে বর্তমান সময় সেভ করা
        audio.addEventListener("timeupdate", () => {
            localStorage.setItem("musicTime", audio.currentTime);
        });

        // Top Music Button
        if (musicBtn) {
            musicBtn.addEventListener("click", () => {
                togglePlayMusic();
            });
        }

        // Bottom Player Pause Button
        if (pauseMusicBtn) {
            pauseMusicBtn.addEventListener("click", () => {
                togglePlayMusic();
            });
        }

        function togglePlayMusic() {
            if (audio.paused) {
                audio.play();
                localStorage.setItem("musicPlaying", "true");
                updateMusicButtons(true);
            } else {
                audio.pause();
                localStorage.setItem("musicPlaying", "false");
                updateMusicButtons(false);
            }
        }

        function updateMusicButtons(playing) {
            if (musicBtn) {
                const span = musicBtn.querySelector("span");
                if (playing) {
                    musicBtn.classList.add("playing");
                    if (span) span.textContent = "Music Playing";
                } else {
                    musicBtn.classList.remove("playing");
                    if (span) span.textContent = "Music Off";
                }
            }
            if (pauseMusicBtn) {
                pauseMusicBtn.textContent = playing ? "Ⅱ" : "▶";
            }
        }
    }
});
/* =========================
   SMOOTH NAV EFFECT
========================= */

document.querySelectorAll(".nav-item").forEach(item => {

    item.addEventListener("click", function(e) {

        const link = this.getAttribute("href");

        // শুধু # হলে prevent করবে
        if (!link || link === "#") {
            e.preventDefault();
            return;
        }

        // অন্য page হলে normal navigation হবে
        window.location.href = link;

    });

});