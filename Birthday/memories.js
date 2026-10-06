/* =========================================================
   MEMORIES.JS
   PREMIUM FANUSH + HEARTS + MUSIC
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           ELEMENTS
        ================================================= */


        const lanternContainer =
            document.getElementById(
                "lanternContainer"
            );


        const heartContainer =
            document.getElementById(
                "heartContainer"
            );


        const music =
            document.getElementById(
                "birthdayMusic"
            );


        const musicBtn =
            document.getElementById(
                "musicBtn"
            );


        const pauseMusic =
            document.getElementById(
                "pauseMusic"
            );


        /* =================================================
           FANUSH
        ================================================= */


        function createLantern(
            initial = false
        ) {

            if (!lanternContainer) {
                return;
            }


            const lantern =
                document.createElement(
                    "div"
                );


            lantern.className =
                "sky-lantern";


            const start =
                Math.random() * 100;


            const drift1 =
                -100 +
                Math.random() * 200;


            const drift2 =
                -120 +
                Math.random() * 240;


            const drift3 =
                -160 +
                Math.random() * 320;


            const duration =
                12 +
                Math.random() * 10;


            const scale =
                .55 +
                Math.random() * .65;


            lantern.style.left =
                `${start}%`;


            lantern.style.setProperty(
                "--drift-one",
                `${drift1}px`
            );


            lantern.style.setProperty(
                "--drift-two",
                `${drift2}px`
            );


            lantern.style.setProperty(
                "--drift-three",
                `${drift3}px`
            );


            lantern.style.setProperty(
                "--duration",
                `${duration}s`
            );


            lantern.style.transform =
                `scale(${scale})`;


            if (initial) {

                lantern.style.animationDelay =
                    `${-(Math.random() * duration)}s`;

            }


            lanternContainer.appendChild(
                lantern
            );


            setTimeout(
                () => {

                    lantern.remove();

                },
                (duration + 2) * 1000
            );

        }


        /* Initial fanush */

        for (
            let i = 0;
            i < 25;
            i++
        ) {

            createLantern(true);

        }


        /* Continuous fanush */

        setInterval(
            () => {

                createLantern();

            },
            750
        );


        /* =================================================
           FLOATING HEARTS
        ================================================= */


        function createHeart() {

            if (!heartContainer) {
                return;
            }


            const heart =
                document.createElement(
                    "span"
                );


            heart.className =
                "floating-heart";


            heart.textContent =
                Math.random() > .25
                    ? "♥"
                    : "♡";


            heart.style.left =
                `${Math.random() * 100}%`;


            heart.style.fontSize =
                `${10 + Math.random() * 22}px`;


            heart.style.setProperty(
                "--drift",
                `${-100 + Math.random() * 200}px`
            );


            heart.style.setProperty(
                "--duration",
                `${7 + Math.random() * 7}s`
            );


            heartContainer.appendChild(
                heart
            );


            setTimeout(
                () => {

                    heart.remove();

                },
                15000
            );

        }


        for (
            let i = 0;
            i < 15;
            i++
        ) {

            setTimeout(
                createHeart,
                i * 250
            );

        }


        setInterval(
            createHeart,
            1100
        );


        /* =================================================
           MUSIC
        ================================================= */


        if (music) {

            music.volume = .4;


            function playMusic() {

                music.play()
                    .then(
                        () => {

                            if (musicBtn) {

                                musicBtn.innerHTML =
                                    `♫ <span>Music</span>`;

                            }

                            if (pauseMusic) {

                                pauseMusic.textContent =
                                    "Ⅱ";

                            }

                        }
                    )
                    .catch(
                        () => {}
                    );

            }


            if (musicBtn) {

                musicBtn.addEventListener(
                    "click",
                    () => {

                        if (
                            music.paused
                        ) {

                            playMusic();

                        } else {

                            music.pause();

                            musicBtn.innerHTML =
                                `♪ <span>Music</span>`;

                            if (pauseMusic) {

                                pauseMusic.textContent =
                                    "▶";

                            }

                        }

                    }
                );

            }


            if (pauseMusic) {

                pauseMusic.addEventListener(
                    "click",
                    () => {

                        if (
                            music.paused
                        ) {

                            playMusic();

                        } else {

                            music.pause();

                            pauseMusic.textContent =
                                "▶";

                            if (musicBtn) {

                                musicBtn.innerHTML =
                                    `♪ <span>Music</span>`;

                            }

                        }

                    }
                );

            }


            /* Browser allows music after first interaction */

            document.addEventListener(
                "click",
                () => {

                    if (
                        music.paused
                    ) {

                        playMusic();

                    }

                },
                {
                    once: true
                }
            );

        }


        /* =================================================
           REVEAL ANIMATION
        ================================================= */


        const revealElements =
            document.querySelectorAll(
                ".memory-card, .timeline-item, .intro-card, .letter-card"
            );


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                            }

                        }
                    );

                },
                {
                    threshold: .12
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );


        const revealStyle =
            document.createElement(
                "style"
            );


        revealStyle.textContent = `

            .memory-card,
            .timeline-item,
            .intro-card,
            .letter-card {

                opacity: 0;

                transform:
                    translateY(35px)
                    rotate(var(--original-rotate, 0deg));

                transition:
                    opacity .8s ease,
                    transform .8s ease;

            }


            .memory-card.visible {

                opacity: 1;

            }


            .timeline-item.visible,
            .intro-card.visible,
            .letter-card.visible {

                opacity: 1;

                transform:
                    translateY(0)
                    rotate(0deg);

            }


            .card-one {
                --original-rotate: -3deg;
            }

            .card-two {
                --original-rotate: 2deg;
            }

            .card-three {
                --original-rotate: -2deg;
            }

            .card-four {
                --original-rotate: 2deg;
            }

            .card-five {
                --original-rotate: -2deg;
            }

            .card-six {
                --original-rotate: 3deg;
            }

        `;


        document.head.appendChild(
            revealStyle
        );


        /* =================================================
           RANDOM SPARKLES
        ================================================= */


        function sparkle() {

            const star =
                document.createElement(
                    "span"
                );


            star.textContent =
                Math.random() > .5
                    ? "✦"
                    : "·";


            star.style.position =
                "fixed";


            star.style.left =
                `${Math.random() * 100}%`;


            star.style.top =
                `${Math.random() * 100}%`;


            star.style.color =
                Math.random() > .5
                    ? "#fff"
                    : "#ff9dcc";


            star.style.fontSize =
                `${5 + Math.random() * 10}px`;


            star.style.pointerEvents =
                "none";


            star.style.zIndex =
                "0";


            star.style.opacity =
                "0";


            star.style.transition =
                "all 1.8s ease";


            document.body.appendChild(
                star
            );


            requestAnimationFrame(
                () => {

                    star.style.opacity =
                        ".8";

                    star.style.transform =
                        "scale(1.5) rotate(90deg)";

                }
            );


            setTimeout(
                () => {

                    star.style.opacity =
                        "0";

                },
                900
            );


            setTimeout(
                () => {

                    star.remove();

                },
                2000
            );

        }


        setInterval(
            sparkle,
            700
        );


        /* =================================================
           CANDLE INTERACTION
        ================================================= */


        const candle =
            document.querySelector(
                ".candle"
            );


        if (candle) {

            candle.addEventListener(
                "click",
                () => {

                    for (
                        let i = 0;
                        i < 15;
                        i++
                    ) {

                        setTimeout(
                            createHeart,
                            i * 70
                        );

                    }

                    for (
                        let i = 0;
                        i < 15;
                        i++
                    ) {

                        setTimeout(
                            sparkle,
                            i * 50
                        );

                    }

                }
            );

        }


        /* =================================================
           IMAGE CARD CLICK
        ================================================= */


        const cards =
            document.querySelectorAll(
                ".memory-card"
            );


        cards.forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        for (
                            let i = 0;
                            i < 6;
                            i++
                        ) {

                            setTimeout(
                                createHeart,
                                i * 80
                            );

                        }

                    }
                );

            }
        );


    }
);