/* =========================================================
   SCRIPT.JS
   PREMIUM BIRTHDAY GIFT
   MUNMUN EDITION 💗

   FEATURES
   ---------------------------------------------------------
   🎁 Gift Opening
   ✨ Sparkle Explosion
   🏮 Floating Fanush
   🚁 Premium Drone Show
   💗 Heart Formation
   ⭐ Star Formation
   💕 MUNMUN Formation
   🎆 Firework Effects
   🎵 Music Control
   📸 Photo Reveal
   📱 Mobile Responsive
========================================================= */

"use strict";


/* =========================================================
   BASIC ELEMENTS
========================================================= */

const openGift =
    document.getElementById("openGift");

const giftContainer =
    document.getElementById("giftContainer") ||
    document.querySelector(".gift-container");

const messageCard =
    document.getElementById("messageCard");

const photoCard =
    document.getElementById("photoCard");

const music =
    document.getElementById("birthdayMusic");

const musicBtn =
    document.getElementById("musicBtn");


/* =========================================================
   STATE
========================================================= */

let giftOpened = false;

let musicPlaying = false;

let droneLayer = null;

let sparkleLayer = null;

let fanushLayer = null;

let fireworkLayer = null;

let munmunGlow = null;

let drones = [];

let formationTimeouts = [];

let freeFlightTimer = null;

let fanushAnimationTimer = null;

let premiumTextTimer = null;

let resizeTimer = null;


/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {

    desktopDrones: 300,

    mobileDrones: 160,

    desktopSize: 5,

    mobileSize: 4,

    skyYDesktop: 0.35,

    skyYMobile: 0.32

};


/* =========================================================
   UTILITY
========================================================= */

function isMobile() {

    return window.innerWidth < 650;

}


function random(min, max) {

    return (
        Math.random() *
        (max - min)
    ) + min;

}


function clamp(value, min, max) {

    return Math.max(
        min,
        Math.min(max, value)
    );

}


/* =========================================================
   OPEN GIFT
========================================================= */

if (openGift) {

    openGift.addEventListener(
        "click",
        openBirthdayGift
    );

}


function openBirthdayGift() {

    if (giftOpened) {
        return;
    }

    giftOpened = true;


    /* -----------------------------------------
       Gift animation
    ----------------------------------------- */

    if (giftContainer) {

        giftContainer.classList.add(
            "opened"
        );

    }


    /* -----------------------------------------
       Button
    ----------------------------------------- */

    if (openGift) {

        openGift.innerHTML =
            `
            <span class="btn-shine"></span>
            ✨ Your Surprise Is Here
            `;

        openGift.disabled = true;

    }


    /* -----------------------------------------
       First sparkle explosion
    ----------------------------------------- */

    createGiftSparkles();

    createFireworkBurst(
        window.innerWidth / 2,
        window.innerHeight * .52
    );


    /* -----------------------------------------
       Message reveal
    ----------------------------------------- */

    setTimeout(
        () => {

            if (messageCard) {

                messageCard.style.opacity =
                    "1";

                messageCard.style.visibility =
                    "visible";

                messageCard.style.transform =
                    "translateY(-8px) rotate(0deg)";

            }

        },
        600
    );


    /* -----------------------------------------
       Photo reveal
    ----------------------------------------- */

    setTimeout(
        () => {

            if (photoCard) {

                photoCard.classList.add(
                    "show"
                );

                photoCard.style.opacity =
                    "1";

                photoCard.style.visibility =
                    "visible";

            }

        },
        1000
    );


    /* -----------------------------------------
       Start complete show
    ----------------------------------------- */

    setTimeout(
        () => {

            startPremiumBirthdayShow();

        },
        1400
    );


    /* -----------------------------------------
       Try music automatically
       Browser may block it
    ----------------------------------------- */

    if (music) {

        music.volume = 0.55;

        music.play()
            .then(
                () => {

                    musicPlaying = true;

                    updateMusicButton();

                }
            )
            .catch(
                () => {

                    musicPlaying = false;

                    updateMusicButton();

                }
            );

    }

}


/* =========================================================
   START PREMIUM SHOW
========================================================= */

function startPremiumBirthdayShow() {

    stopDroneShow();

    removeOldLanterns();

    createDroneLayer();

    createSparkleLayer();

    createFireworkLayer();

    createFanushLayer();

    startBeautifulFanushShow();

    createPremiumDrones();


    /* -----------------------------------------
       Opening formation
    ----------------------------------------- */

    addFormationTimer(
        () => {

            showFormation(
                createHeartFormation(),
                2600
            );

        },
        900
    );


    /* -----------------------------------------
       MUNMUN
    ----------------------------------------- */

    addFormationTimer(
        () => {

            showPremiumMUNMUN();

        },
        4200
    );


    /* -----------------------------------------
       Star
    ----------------------------------------- */

    addFormationTimer(
        () => {

            hidePremiumText();

            showFormation(
                createStarFormation(),
                2500
            );

            createFireworkBurst(
                window.innerWidth * .25,
                window.innerHeight * .30
            );

            createFireworkBurst(
                window.innerWidth * .75,
                window.innerHeight * .28
            );

        },
        8500
    );


    /* -----------------------------------------
       Heart
    ----------------------------------------- */

    addFormationTimer(
        () => {

            showFormation(
                createHeartFormation(),
                2400
            );

        },
        12000
    );


    /* -----------------------------------------
       MUNMUN again
    ----------------------------------------- */

    addFormationTimer(
        () => {

            showPremiumMUNMUN();

        },
        15500
    );


    /* -----------------------------------------
       Fireworks
    ----------------------------------------- */

    addFormationTimer(
        () => {

            createMultipleFireworks();

        },
        19000
    );


    /* -----------------------------------------
       Free flight
    ----------------------------------------- */

    addFormationTimer(
        () => {

            startBeautifulFreeFlight();

        },
        21500
    );

}


/* =========================================================
   REMOVE OLD LANTERNS
========================================================= */

function removeOldLanterns() {

    const ids = [

        "lanternShow",

        "floatingLanterns",

        "lanternContainer",

        "lanterns",

        "fanushContainer"

    ];


    ids.forEach(
        id => {

            const element =
                document.getElementById(id);

            if (element) {

                element.innerHTML = "";

            }

        }
    );


    document
        .querySelectorAll(
            `
            .lantern,
            .flying-lantern,
            .fanush,
            .lanterns
            `
        )
        .forEach(
            element => {

                element.remove();

            }
        );

}


/* =========================================================
   DRONE LAYER
========================================================= */

function createDroneLayer() {

    const old =
        document.getElementById(
            "premiumDroneLayer"
        );

    if (old) {

        old.remove();

    }


    droneLayer =
        document.createElement("div");

    droneLayer.id =
        "premiumDroneLayer";


    Object.assign(
        droneLayer.style,
        {

            position: "fixed",

            inset: "0",

            width: "100vw",

            height: "100vh",

            overflow: "hidden",

            pointerEvents: "none",

            zIndex: "9998",

            background:
                `
                radial-gradient(
                    ellipse at 50% 34%,
                    rgba(255,80,180,.08),
                    transparent 62%
                )
                `

        }
    );


    document.body.appendChild(
        droneLayer
    );

}


/* =========================================================
   SPARKLE LAYER
========================================================= */

function createSparkleLayer() {

    const old =
        document.getElementById(
            "premiumSparkleLayer"
        );

    if (old) {

        old.remove();

    }


    sparkleLayer =
        document.createElement("div");

    sparkleLayer.id =
        "premiumSparkleLayer";


    Object.assign(
        sparkleLayer.style,
        {

            position: "fixed",

            inset: "0",

            width: "100vw",

            height: "100vh",

            pointerEvents: "none",

            overflow: "hidden",

            zIndex: "10001"

        }
    );


    document.body.appendChild(
        sparkleLayer
    );

}


/* =========================================================
   FIREWORK LAYER
========================================================= */

function createFireworkLayer() {

    const old =
        document.getElementById(
            "premiumFireworkLayer"
        );

    if (old) {

        old.remove();

    }


    fireworkLayer =
        document.createElement("div");

    fireworkLayer.id =
        "premiumFireworkLayer";


    Object.assign(
        fireworkLayer.style,
        {

            position: "fixed",

            inset: "0",

            overflow: "hidden",

            pointerEvents: "none",

            zIndex: "9995"

        }
    );


    document.body.appendChild(
        fireworkLayer
    );

}


/* =========================================================
   FANUSH LAYER
========================================================= */

function createFanushLayer() {

    const old =
        document.getElementById(
            "premiumFanushLayer"
        );

    if (old) {

        old.remove();

    }


    fanushLayer =
        document.createElement("div");

    fanushLayer.id =
        "premiumFanushLayer";


    Object.assign(
        fanushLayer.style,
        {

            position: "fixed",

            inset: "0",

            width: "100vw",

            height: "100vh",

            overflow: "hidden",

            pointerEvents: "none",

            zIndex: "9996"

        }
    );


    document.body.appendChild(
        fanushLayer
    );

}


/* =========================================================
   BEAUTIFUL FANUSH SHOW
========================================================= */

function startBeautifulFanushShow() {

    if (!fanushLayer) {
        return;
    }


    const mobile =
        isMobile();


    const count =
        mobile
            ? 12
            : 24;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        setTimeout(
            () => {

                createSingleFanush();

            },
            i * 350
        );

    }


    if (fanushAnimationTimer) {

        clearInterval(
            fanushAnimationTimer
        );

    }


    fanushAnimationTimer =
        setInterval(
            () => {

                createSingleFanush();

            },
            mobile
                ? 1800
                : 1300
        );

}


/* =========================================================
   SINGLE FANUSH
========================================================= */

function createSingleFanush() {

    if (!fanushLayer) {
        return;
    }


    const mobile =
        isMobile();


    const fanush =
        document.createElement("div");


    fanush.className =
        "premium-fanush";


    const size =
        mobile
            ? random(26, 38)
            : random(34, 54);


    const startX =
        random(
            20,
            window.innerWidth - 20
        );


    const duration =
        random(
            10000,
            16000
        );


    const drift =
        random(
            -170,
            170
        );


    const rotate =
        random(
            -24,
            24
        );


    fanush.innerHTML =
        `
        <div class="fanush-fire"></div>

        <div class="fanush-body">

            <div class="fanush-pattern">
                ✦
            </div>

        </div>

        <div class="fanush-tail"></div>
        `;


    Object.assign(
        fanush.style,
        {

            position: "absolute",

            left:
                startX + "px",

            top:
                window.innerHeight + 100 + "px",

            width:
                size + "px",

            height:
                size * 1.4 + "px",

            opacity: "0",

            filter:
                `
                drop-shadow(
                    0 0 7px
                    rgba(255,90,190,.9)
                )
                `,

            willChange:
                "transform, opacity"

        }
    );


    /* -----------------------------------------
       Body
    ----------------------------------------- */

    const body =
        fanush.querySelector(
            ".fanush-body"
        );


    Object.assign(
        body.style,
        {

            position: "absolute",

            left: "50%",

            top: "0",

            width: "76%",

            height: "70%",

            transform:
                "translateX(-50%)",

            borderRadius:
                "48% 48% 44% 44%",

            background:
                `
                linear-gradient(
                    135deg,
                    #ff3f9f,
                    #ff79bd 45%,
                    #ffd1e8
                )
                `,

            border:
                "1px solid rgba(255,255,255,.85)",

            boxShadow:
                `
                0 0 8px #fff,
                0 0 18px #ff69b4,
                0 0 38px rgba(255,60,170,.7)
                `,

            display:
                "flex",

            alignItems:
                "center",

            justifyContent:
                "center"

        }
    );


    /* -----------------------------------------
       Pattern
    ----------------------------------------- */

    const pattern =
        fanush.querySelector(
            ".fanush-pattern"
        );


    Object.assign(
        pattern.style,
        {

            color: "#fff",

            fontSize:
                Math.max(
                    9,
                    size * .3
                ) + "px",

            textShadow:
                `
                0 0 5px #fff,
                0 0 12px #ff69b4
                `

        }
    );


    /* -----------------------------------------
       Fire
    ----------------------------------------- */

    const fire =
        fanush.querySelector(
            ".fanush-fire"
        );


    Object.assign(
        fire.style,
        {

            position: "absolute",

            left: "50%",

            bottom: "18%",

            width:
                size * .2 + "px",

            height:
                size * .3 + "px",

            transform:
                "translateX(-50%)",

            borderRadius:
                "50% 50% 45% 45%",

            background:
                `
                linear-gradient(
                    to top,
                    #ff7800,
                    #ffe46b,
                    #fff
                )
                `,

            boxShadow:
                `
                0 0 8px #ffd76a,
                0 0 16px #ff9b25
                `

        }
    );


    /* -----------------------------------------
       Tail
    ----------------------------------------- */

    const tail =
        fanush.querySelector(
            ".fanush-tail"
        );


    Object.assign(
        tail.style,
        {

            position: "absolute",

            left: "50%",

            top: "67%",

            width: "2px",

            height:
                size * .45 + "px",

            transform:
                "translateX(-50%)",

            background:
                `
                linear-gradient(
                    #ffb1d8,
                    transparent
                )
                `

        }
    );


    fanushLayer.appendChild(
        fanush
    );


    /* -----------------------------------------
       Animation
    ----------------------------------------- */

    fanush.animate(
        [

            {

                opacity: 0,

                transform:
                    `
                    translate3d(0,0,0)
                    scale(.65)
                    rotate(0deg)
                    `

            },

            {

                opacity: .95,

                transform:
                    `
                    translate3d(
                        ${drift * .25}px,
                        -30vh,
                        0
                    )
                    scale(1)
                    rotate(${rotate * .3}deg)
                    `

            },

            {

                opacity: .9,

                transform:
                    `
                    translate3d(
                        ${drift}px,
                        -72vh,
                        0
                    )
                    scale(1.08)
                    rotate(${rotate}deg)
                    `

            },

            {

                opacity: 0,

                transform:
                    `
                    translate3d(
                        ${drift * 1.35}px,
                        -125vh,
                        0
                    )
                    scale(.82)
                    rotate(${rotate * 1.5}deg)
                    `

            }

        ],
        {

            duration:
                duration,

            easing:
                "ease-in-out",

            fill:
                "forwards"

        }
    );


    setTimeout(
        () => {

            fanush.remove();

        },
        duration + 500
    );

}


/* =========================================================
   CREATE PREMIUM DRONES
========================================================= */

function createPremiumDrones() {

    if (!droneLayer) {
        return;
    }


    drones = [];


    const mobile =
        isMobile();


    const total =
        mobile
            ? CONFIG.mobileDrones
            : CONFIG.desktopDrones;


    const size =
        mobile
            ? CONFIG.mobileSize
            : CONFIG.desktopSize;


    const colors = [

        "#ffffff",

        "#ffd7ed",

        "#ffb1d8",

        "#ff75bd",

        "#ffc4e2"

    ];


    for (
        let i = 0;
        i < total;
        i++
    ) {

        const drone =
            document.createElement("div");


        drone.className =
            "premium-drone";


        const color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        Object.assign(
            drone.style,
            {

                position: "absolute",

                width:
                    size + "px",

                height:
                    size + "px",

                borderRadius:
                    "50%",

                background:
                    "#ffffff",

                opacity:
                    "0",

                left:
                    "50%",

                top:
                    "100%",

                transform:
                    "translate(-50%,-50%)",

                boxShadow:
                    `
                    0 0 5px #fff,
                    0 0 10px ${color},
                    0 0 20px ${color},
                    0 0 30px ${color}
                    `,

                willChange:
                    "left,top,transform,opacity"

            }
        );


        droneLayer.appendChild(
            drone
        );


        drones.push(
            drone
        );


        /* -----------------------------------------
           Entrance
        ----------------------------------------- */

        setTimeout(
            () => {

                if (!drone) {
                    return;
                }


                const targetX =
                    random(
                        20,
                        window.innerWidth - 20
                    );


                const targetY =
                    random(
                        window.innerHeight * .10,
                        window.innerHeight * .48
                    );


                drone.style.opacity =
                    "1";


                drone.animate(
                    [

                        {

                            left:
                                random(
                                    0,
                                    window.innerWidth
                                ) + "px",

                            top:
                                (
                                    window.innerHeight +
                                    random(80, 250)
                                ) + "px",

                            transform:
                                `
                                translate(
                                    -50%,
                                    -50%
                                )
                                scale(.1)
                                `

                        },

                        {

                            left:
                                targetX + "px",

                            top:
                                targetY + "px",

                            transform:
                                `
                                translate(
                                    -50%,
                                    -50%
                                )
                                scale(1)
                                `

                        }

                    ],
                    {

                        duration:
                            random(
                                1400,
                                2600
                            ),

                        delay:
                            random(0, 500),

                        easing:
                            "cubic-bezier(.15,.8,.2,1)",

                        fill:
                            "forwards"

                    }
                );


                drone.style.left =
                    targetX + "px";

                drone.style.top =
                    targetY + "px";

            },
            60 + i * 2
        );

    }

}


/* =========================================================
   SHOW FORMATION
========================================================= */

function showFormation(
    points,
    duration = 2800
) {

    if (
        !drones.length ||
        !points.length
    ) {

        return;

    }


    const mobile =
        isMobile();


    const centerX =
        window.innerWidth / 2;


    const centerY =
        window.innerHeight *
        (
            mobile
                ? CONFIG.skyYMobile
                : CONFIG.skyYDesktop
        );


    drones.forEach(
        (drone, index) => {

            const point =
                points[
                    index %
                    points.length
                ];


            const targetX =
                centerX +
                point.x;


            const targetY =
                centerY +
                point.y;


            const currentX =
                parseFloat(
                    drone.style.left
                ) ||
                centerX;


            const currentY =
                parseFloat(
                    drone.style.top
                ) ||
                centerY;


            drone.animate(
                [

                    {

                        left:
                            currentX + "px",

                        top:
                            currentY + "px",

                        transform:
                            `
                            translate(
                                -50%,
                                -50%
                            )
                            scale(1)
                            `

                    },

                    {

                        left:
                            targetX + "px",

                        top:
                            targetY + "px",

                        transform:
                            `
                            translate(
                                -50%,
                                -50%
                            )
                            scale(1.12)
                            `

                    }

                ],
                {

                    duration:
                        duration +
                        random(0, 350),

                    delay:
                        random(0, 100),

                    easing:
                        "cubic-bezier(.16,.82,.18,1)",

                    fill:
                        "forwards"

                }
            );


            drone.style.left =
                targetX + "px";

            drone.style.top =
                targetY + "px";

        }
    );

}


/* =========================================================
   HEART FORMATION
========================================================= */

function createHeartFormation() {

    const points = [];


    if (!drones.length) {

        return points;

    }


    const mobile =
        isMobile();


    const scale =
        mobile
            ? 5.8
            : 9.5;


    const total =
        drones.length;


    for (
        let i = 0;
        i < total;
        i++
    ) {

        const t =
            (
                i /
                total
            ) *
            Math.PI *
            2;


        const x =
            16 *
            Math.pow(
                Math.sin(t),
                3
            );


        const y =
            -(
                13 * Math.cos(t)
                -
                5 * Math.cos(2 * t)
                -
                2 * Math.cos(3 * t)
                -
                Math.cos(4 * t)
            );


        const fill =
            i % 3 === 0
                ? .84
                : 1;


        points.push({

            x:
                x *
                scale *
                fill,

            y:
                y *
                scale *
                fill

        });

    }


    return points;

}


/* =========================================================
   STAR FORMATION
========================================================= */

function createStarFormation() {

    const points = [];


    if (!drones.length) {

        return points;

    }


    const mobile =
        isMobile();


    const outer =
        mobile
            ? 105
            : 195;


    const inner =
        mobile
            ? 45
            : 78;


    const total =
        drones.length;


    for (
        let i = 0;
        i < total;
        i++
    ) {

        const angle =
            -Math.PI / 2 +
            (
                i /
                total
            ) *
            Math.PI *
            2;


        const radius =
            i % 2 === 0
                ? outer
                : inner;


        points.push({

            x:
                Math.cos(angle) *
                radius,

            y:
                Math.sin(angle) *
                radius

        });

    }


    return points;

}


/* =========================================================
   MUNMUN PIXEL FONT
========================================================= */

const MUNMUN_FONT = {

    M: [

        "1000001",

        "1100011",

        "1010101",

        "1010101",

        "1001001",

        "1001001",

        "1000001",

        "1000001",

        "1000001"

    ],


    U: [

        "1000001",

        "1000001",

        "1000001",

        "1000001",

        "1000001",

        "1000001",

        "1000001",

        "0100010",

        "0011100"

    ],


    N: [

        "1000001",

        "1100001",

        "1100001",

        "1010001",

        "1010001",

        "1001001",

        "1001001",

        "1000101",

        "1000001"

    ]

};


/* =========================================================
   CREATE MUNMUN FORMATION
   ---------------------------------------------------------
   IMPORTANT:

   This version calculates the EXACT total width first,
   then scales everything to the available screen width.

   Therefore MUNMUN will not be cropped.
========================================================= */

function createMUNMUNFormation() {

    const points = [];


    if (!drones.length) {

        return points;

    }


    const mobile =
        isMobile();


    const word = [

        "M",

        "U",

        "N",

        "M",

        "U",

        "N"

    ];


    const rows = 9;

    const cols = 7;


    /*
       -----------------------------------------
       Base dimensions
    -----------------------------------------
    */

    let cell =
        mobile
            ? 8.8
            : 15.5;


    let letterGap =
        mobile
            ? 8
            : 16;


    let rowGap =
        mobile
            ? 1
            : 2;


    /*
       -----------------------------------------
       Actual width

       7 columns means 6 spaces between points.
    -----------------------------------------
    */

    let letterWidth =
        (cols - 1) *
        cell;


    let totalWidth =
        (
            word.length *
            letterWidth
        ) +
        (
            (word.length - 1) *
            letterGap
        );


    /*
       -----------------------------------------
       Safe screen width
    -----------------------------------------
    */

    const safeWidth =
        window.innerWidth *
        (
            mobile
                ? .86
                : .78
        );


    /*
       -----------------------------------------
       Scale entire word
    -----------------------------------------
    */

    if (
        totalWidth >
        safeWidth
    ) {

        const scale =
            safeWidth /
            totalWidth;


        cell *= scale;

        letterGap *= scale;

        rowGap *= scale;


        letterWidth =
            (cols - 1) *
            cell;


        totalWidth =
            (
                word.length *
                letterWidth
            ) +
            (
                (word.length - 1) *
                letterGap
            );

    }


    /*
       -----------------------------------------
       CENTER EXACTLY
    -----------------------------------------
    */

    const startX =
        -totalWidth / 2;


    /*
       -----------------------------------------
       BUILD LETTERS
    -----------------------------------------
    */

    word.forEach(
        (
            letter,
            letterIndex
        ) => {

            const pattern =
                MUNMUN_FONT[
                    letter
                ];


            if (!pattern) {
                return;
            }


            const letterStartX =
                startX +
                letterIndex *
                (
                    letterWidth +
                    letterGap
                );


            for (
                let row = 0;
                row < rows;
                row++
            ) {

                for (
                    let col = 0;
                    col < cols;
                    col++
                ) {

                    if (
                        pattern[row][col] !== "1"
                    ) {

                        continue;

                    }


                    const x =
                        letterStartX +
                        col * cell;


                    const y =
                        (
                            row -
                            (
                                rows - 1
                            ) / 2
                        ) *
                        (
                            cell +
                            rowGap
                        );


                    /*
                       Main point
                    */

                    points.push({

                        x:
                            x,

                        y:
                            y

                    });


                    /*
                       Add thickness
                       only when there is enough room
                    */

                    if (
                        cell > 10
                    ) {

                        points.push({

                            x:
                                x +
                                cell * .14,

                            y:
                                y

                        });

                    }

                }

            }

        }
    );


    /*
       -----------------------------------------
       Make all drones participate
    -----------------------------------------
    */

    const finalPoints = [];

    const total =
        drones.length;


    for (
        let i = 0;
        i < total;
        i++
    ) {

        const base =
            points[
                i %
                points.length
            ];


        const cycle =
            Math.floor(
                i /
                points.length
            );


        const spread =
            Math.min(
                cell * .16,
                cycle *
                cell *
                .012
            );


        const angle =
            i * 2.399;


        finalPoints.push({

            x:
                base.x +
                Math.cos(angle) *
                spread,

            y:
                base.y +
                Math.sin(angle) *
                spread

        });

    }


    return finalPoints;

}


/* =========================================================
   PREMIUM MUNMUN
========================================================= */

function showPremiumMUNMUN() {

    if (!drones.length) {

        return;

    }


    /*
       Hide previous glow
    */

    if (munmunGlow) {

        munmunGlow.remove();

        munmunGlow = null;

    }


    createMUNMUNGlow();


    const formation =
        createMUNMUNFormation();


    if (!formation.length) {

        return;

    }


    showFormation(
        formation,
        3000
    );


    /*
       Sparkle
    */

    setTimeout(
        () => {

            if (drones.length) {

                createMUNMUNSparkles();

            }

        },
        700
    );


    /*
       Pulse
    */

    if (premiumTextTimer) {

        clearTimeout(
            premiumTextTimer
        );

    }


    premiumTextTimer =
        setTimeout(
            () => {

                pulseMUNMUNDrones();

            },
            2600
        );

}


/* =========================================================
   MUNMUN GLOW
========================================================= */

function createMUNMUNGlow() {

    if (!droneLayer) {

        return;

    }


    munmunGlow =
        document.createElement("div");


    munmunGlow.id =
        "munmunPremiumGlow";


    const mobile =
        isMobile();


    Object.assign(
        munmunGlow.style,
        {

            position: "fixed",

            left: "50%",

            top:
                (
                    window.innerHeight *
                    (
                        mobile
                            ? .32
                            : .35
                    )
                ) +
                "px",

            width:
                mobile
                    ? "92vw"
                    : "1050px",

            height:
                mobile
                    ? "190px"
                    : "300px",

            transform:
                "translate(-50%,-50%)",

            borderRadius:
                "50%",

            background:
                `
                radial-gradient(
                    ellipse,
                    rgba(255,70,180,.32),
                    rgba(255,105,200,.16) 40%,
                    transparent 76%
                )
                `,

            filter:
                "blur(25px)",

            opacity:
                "0",

            zIndex:
                "9997",

            pointerEvents:
                "none"

        }
    );


    droneLayer.appendChild(
        munmunGlow
    );


    munmunGlow.animate(
        [

            {

                opacity: 0,

                transform:
                    `
                    translate(
                        -50%,
                        -50%
                    )
                    scale(.65)
                    `

            },

            {

                opacity: .95,

                transform:
                    `
                    translate(
                        -50%,
                        -50%
                    )
                    scale(1)
                    `

            },

            {

                opacity: .78,

                transform:
                    `
                    translate(
                        -50%,
                        -50%
                    )
                    scale(1.08)
                    `

            }

        ],
        {

            duration:
                1500,

            easing:
                "ease-out",

            fill:
                "forwards"

        }
    );

}


/* =========================================================
   HIDE MUNMUN
========================================================= */

function hidePremiumText() {

    if (!munmunGlow) {

        return;

    }


    munmunGlow.animate(
        [

            {
                opacity: .8
            },

            {
                opacity: 0
            }

        ],
        {

            duration:
                600,

            easing:
                "ease-out",

            fill:
                "forwards"

        }
    );

}


/* =========================================================
   MUNMUN SPARKLES
========================================================= */

function createMUNMUNSparkles() {

    if (!sparkleLayer) {

        return;

    }


    const symbols = [

        "✦",

        "✧",

        "⋆",

        "♡",

        "♥"

    ];


    const mobile =
        isMobile();


    const count =
        mobile
            ? 28
            : 60;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const sparkle =
            document.createElement(
                "div"
            );


        sparkle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        Object.assign(
            sparkle.style,
            {

                position: "absolute",

                left:
                    random(
                        8,
                        92
                    ) + "%",

                top:
                    random(
                        18,
                        55
                    ) + "%",

                color:
                    Math.random() > .45
                        ? "#ffffff"
                        : "#ff9ed0",

                fontSize:
                    random(
                        9,
                        25
                    ) + "px",

                textShadow:
                    `
                    0 0 8px #fff,
                    0 0 18px #ff69b4,
                    0 0 30px #ff4fa3
                    `,

                opacity:
                    "0"

            }
        );


        sparkleLayer.appendChild(
            sparkle
        );


        const moveX =
            random(
                -150,
                150
            );


        const moveY =
            -random(
                40,
                160
            );


        sparkle.animate(
            [

                {

                    opacity: 0,

                    transform:
                        "scale(.2)"

                },

                {

                    opacity: 1,

                    transform:
                        "scale(1.25)"

                },

                {

                    opacity: 0,

                    transform:
                        `
                        translate(
                            ${moveX}px,
                            ${moveY}px
                        )
                        scale(.2)
                        `

                }

            ],
            {

                duration:
                    random(
                        1500,
                        2900
                    ),

                delay:
                    random(
                        0,
                        700
                    ),

                easing:
                    "ease-out"

            }
        );


        setTimeout(
            () => {

                sparkle.remove();

            },
            4000
        );

    }

}


/* =========================================================
   MUNMUN PULSE
========================================================= */

function pulseMUNMUNDrones() {

    if (!drones.length) {

        return;

    }


    drones.forEach(
        (
            drone,
            index
        ) => {

            setTimeout(
                () => {

                    if (!drone) {
                        return;
                    }


                    drone.animate(
                        [

                            {

                                transform:
                                    `
                                    translate(
                                        -50%,
                                        -50%
                                    )
                                    scale(1)
                                    `

                            },

                            {

                                transform:
                                    `
                                    translate(
                                        -50%,
                                        -50%
                                    )
                                    scale(1.65)
                                    `

                            },

                            {

                                transform:
                                    `
                                    translate(
                                        -50%,
                                        -50%
                                    )
                                    scale(1)
                                    `

                            }

                        ],
                        {

                            duration:
                                900,

                            easing:
                                "ease-in-out",

                            fill:
                                "forwards"

                        }
                    );

                },

                index * 2.2

            );

        }
    );

}


/* =========================================================
   FREE FLIGHT
========================================================= */

function startBeautifulFreeFlight() {

    if (!drones.length) {

        return;

    }


    if (freeFlightTimer) {

        clearInterval(
            freeFlightTimer
        );

    }


    function fly() {

        drones.forEach(
            drone => {

                const x =
                    random(
                        40,
                        window.innerWidth - 40
                    );


                const y =
                    random(
                        70,
                        Math.max(
                            100,
                            window.innerHeight - 180
                        )
                    );


                const currentX =
                    parseFloat(
                        drone.style.left
                    ) ||
                    window.innerWidth / 2;


                const currentY =
                    parseFloat(
                        drone.style.top
                    ) ||
                    window.innerHeight * .35;


                drone.animate(
                    [

                        {

                            left:
                                currentX + "px",

                            top:
                                currentY + "px"

                        },

                        {

                            left:
                                x + "px",

                            top:
                                y + "px"

                        }

                    ],
                    {

                        duration:
                            random(
                                3000,
                                6000
                            ),

                        delay:
                            random(
                                0,
                                900
                            ),

                        easing:
                            "ease-in-out",

                        fill:
                            "forwards"

                    }
                );


                drone.style.left =
                    x + "px";

                drone.style.top =
                    y + "px";

            }
        );

    }


    fly();


    freeFlightTimer =
        setInterval(
            fly,
            4500
        );


    /*
       Bring MUNMUN back periodically
    */

    setTimeout(
        () => {

            if (drones.length) {

                showPremiumMUNMUN();

            }

        },
        6500
    );

}


/* =========================================================
   GIFT SPARKLES
========================================================= */

function createGiftSparkles() {

    const symbols = [

        "✦",

        "✧",

        "♡",

        "♥",

        "⋆",

        "✺"

    ];


    for (
        let i = 0;
        i < 80;
        i++
    ) {

        setTimeout(
            () => {

                const sparkle =
                    document.createElement(
                        "div"
                    );


                sparkle.textContent =
                    symbols[
                        Math.floor(
                            Math.random() *
                            symbols.length
                        )
                    ];


                Object.assign(
                    sparkle.style,
                    {

                        position: "fixed",

                        left:
                            (
                                window.innerWidth / 2 +
                                random(
                                    -230,
                                    230
                                )
                            ) + "px",

                        top:
                            (
                                window.innerHeight * .52 +
                                random(
                                    -130,
                                    130
                                )
                            ) + "px",

                        color:
                            Math.random() > .5
                                ? "#ff79bd"
                                : "#ffd36e",

                        fontSize:
                            random(
                                10,
                                24
                            ) + "px",

                        zIndex:
                            "10010",

                        pointerEvents:
                            "none",

                        textShadow:
                            "0 0 15px currentColor"

                    }
                );


                document.body.appendChild(
                    sparkle
                );


                const moveX =
                    random(
                        -180,
                        180
                    );


                sparkle.animate(
                    [

                        {

                            opacity: 0,

                            transform:
                                "scale(.2)"

                        },

                        {

                            opacity: 1,

                            transform:
                                "scale(1.3)"

                        },

                        {

                            opacity: 0,

                            transform:
                                `
                                translate(
                                    ${moveX}px,
                                    -170px
                                )
                                scale(.2)
                                `

                        }

                    ],
                    {

                        duration:
                            random(
                                1300,
                                2400
                            ),

                        easing:
                            "ease-out"

                    }
                );


                setTimeout(
                    () => {

                        sparkle.remove();

                    },
                    2800
                );

            },
            i * 24
        );

    }

}


/* =========================================================
   FIREWORK BURST
========================================================= */

function createFireworkBurst(
    x,
    y
) {

    if (!fireworkLayer) {
        return;
    }


    const count =
        isMobile()
            ? 35
            : 65;


    const colors = [

        "#ffffff",

        "#ff70b9",

        "#ffd36e",

        "#ffb6dc"

    ];


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        const angle =
            (
                i /
                count
            ) *
            Math.PI *
            2;


        const distance =
            random(
                60,
                isMobile()
                    ? 170
                    : 260
            );


        const color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        Object.assign(
            particle.style,
            {

                position: "absolute",

                left:
                    x + "px",

                top:
                    y + "px",

                width:
                    random(
                        2,
                        5
                    ) + "px",

                height:
                    random(
                        2,
                        5
                    ) + "px",

                borderRadius:
                    "50%",

                background:
                    color,

                boxShadow:
                    `
                    0 0 8px ${color},
                    0 0 16px ${color}
                    `,

                pointerEvents:
                    "none"

            }
        );


        fireworkLayer.appendChild(
            particle
        );


        particle.animate(
            [

                {

                    opacity: 0,

                    transform:
                        "translate(0,0) scale(.2)"

                },

                {

                    opacity: 1,

                    transform:
                        "translate(0,0) scale(1)"

                },

                {

                    opacity: 0,

                    transform:
                        `
                        translate(
                            ${Math.cos(angle) * distance}px,
                            ${Math.sin(angle) * distance}px
                        )
                        scale(.1)
                        `

                }

            ],
            {

                duration:
                    random(
                        1000,
                        1800
                    ),

                easing:
                    "cubic-bezier(.1,.7,.2,1)"

            }
        );


        setTimeout(
            () => {

                particle.remove();

            },
            2000
        );

    }

}


/* =========================================================
   MULTIPLE FIREWORKS
========================================================= */

function createMultipleFireworks() {

    if (!fireworkLayer) {
        return;
    }


    const positions = [

        [
            .18,
            .28
        ],

        [
            .50,
            .22
        ],

        [
            .82,
            .30
        ],

        [
            .30,
            .42
        ],

        [
            .70,
            .42
        ]

    ];


    positions.forEach(
        (
            position,
            index
        ) => {

            setTimeout(
                () => {

                    createFireworkBurst(

                        window.innerWidth *
                        position[0],

                        window.innerHeight *
                        position[1]

                    );

                },
                index * 450
            );

        }
    );

}


/* =========================================================
   MUSIC
========================================================= */

if (musicBtn) {

    musicBtn.addEventListener(
        "click",
        toggleMusic
    );

}


function toggleMusic() {

    if (!music) {
        return;
    }


    if (!musicPlaying) {

        music.volume =
            0.55;


        music.play()
            .then(
                () => {

                    musicPlaying =
                        true;

                    updateMusicButton();

                }
            )
            .catch(
                () => {

                    musicPlaying =
                        false;

                    if (musicBtn) {

                        musicBtn.querySelector(
                            ".music-text"
                        ).textContent =
                            "Click Again";

                    }

                }
            );

    } else {

        music.pause();

        musicPlaying =
            false;

        updateMusicButton();

    }

}


/* =========================================================
   MUSIC BUTTON UI
========================================================= */

function updateMusicButton() {

    if (!musicBtn) {
        return;
    }


    const text =
        musicBtn.querySelector(
            ".music-text"
        );


    const icon =
        musicBtn.querySelector(
            ".music-icon"
        );


    if (musicPlaying) {

        if (text) {

            text.textContent =
                "Music On";

        }

        if (icon) {

            icon.textContent =
                "♫";

        }

        musicBtn.classList.add(
            "playing"
        );

    } else {

        if (text) {

            text.textContent =
                "Music";

        }

        if (icon) {

            icon.textContent =
                "♪";

        }

        musicBtn.classList.remove(
            "playing"
        );

    }

}


/* =========================================================
   FORMATION TIMER
========================================================= */

function addFormationTimer(
    callback,
    delay
) {

    const timer =
        setTimeout(
            callback,
            delay
        );


    formationTimeouts.push(
        timer
    );

}


/* =========================================================
   STOP DRONE SHOW
========================================================= */

function stopDroneShow() {

    formationTimeouts.forEach(
        timer => {

            clearTimeout(
                timer
            );

        }
    );


    formationTimeouts = [];


    if (freeFlightTimer) {

        clearInterval(
            freeFlightTimer
        );

        freeFlightTimer =
            null;

    }


    if (fanushAnimationTimer) {

        clearInterval(
            fanushAnimationTimer
        );

        fanushAnimationTimer =
            null;

    }


    if (premiumTextTimer) {

        clearTimeout(
            premiumTextTimer
        );

        premiumTextTimer =
            null;

    }


    if (droneLayer) {

        droneLayer.remove();

        droneLayer =
            null;

    }


    if (sparkleLayer) {

        sparkleLayer.remove();

        sparkleLayer =
            null;

    }


    if (fanushLayer) {

        fanushLayer.remove();

        fanushLayer =
            null;

    }


    if (fireworkLayer) {

        fireworkLayer.remove();

        fireworkLayer =
            null;

    }


    munmunGlow =
        null;


    drones =
        [];

}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            stopDroneShow();

        }

    }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                () => {

                    if (
                        drones.length &&
                        droneLayer
                    ) {

                        /*
                           Rebuild MUNMUN
                           using new screen size
                        */

                        const formation =
                            createMUNMUNFormation();


                        if (
                            formation.length
                        ) {

                            showFormation(
                                formation,
                                800
                            );

                        }

                    }

                },
                250
            );

    }
);


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        removeOldLanterns();

        updateMusicButton();

    }
);


/* =========================================================
   PREVENT ACCIDENTAL PAGE SCROLL
   DURING DRONE SHOW
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            if (music && musicPlaying) {

                music.pause();

            }

        } else {

            if (
                music &&
                musicPlaying
            ) {

                music.play()
                    .catch(
                        () => {}
                    );

            }

        }

    }
);


/* =========================================================
   INITIAL CONSOLE
========================================================= */

console.log(
    "💗 Premium MUNMUN Birthday Gift Loaded"
);

console.log(
    "🚁 Drone Show Ready"
);

console.log(
    "🏮 Fanush Show Ready"
);

console.log(
    "✨ MUNMUN Formation Ready"
);