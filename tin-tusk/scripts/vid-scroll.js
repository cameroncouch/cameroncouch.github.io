import gsap from "../node_modules/gsap/index.js";
import ScrollTrigger from "../node_modules/gsap/ScrollTrigger.js";

$(document).ready(function () {
    console.clear();
    $('video').addClass('video-background');

    const video = document.querySelector(".video-background");
    let src = video.currentSrc || video.src;
    console.log(video, src);

    /* Make sure the video is 'activated' on iOS */
    function once(el, event, fn, opts) {
        var onceFn = function (e) {
            el.removeEventListener(event, onceFn);
            fn.apply(this, arguments);
        };
        el.addEventListener(event, onceFn, opts);
        return onceFn;
    }

    once(document.documentElement, "touchstart", function (e) {
        video.play();
        video.pause();
    });

    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.to(video, {
    currentTime: () => video.duration,
    ease: "none",
    scrollTrigger: {
        trigger: "#vid-container",
        start: "top top",
        end: "+=1000",     // controls how long the video takes to scrub
        scrub: true,
        pin: true,         // 👈 keeps video fixed while scrubbing
        anticipatePin: 1,
        // markers: true
    }
});

    once(video, "loadedmetadata", () => {
        const videoDuration = video.duration || 1;

        tl.fromTo(
            video,
            {
                currentTime: 0
            },
            {
                currentTime: videoDuration,
                duration: videoDuration,
                ease: "none"
            }
        );
    });

    /*!
         * © This code was written by Nicolai Palmkvist.
         * For more information, visit my Elementor Youtube channel: https://www.youtube.com/@nicopalmkvist
         */

    setTimeout(function () {
        if (window["fetch"]) {
            fetch(src)
                .then((response) => response.blob())
                .then((response) => {
                    var blobURL = URL.createObjectURL(response);

                    var t = video.currentTime;
                    once(document.documentElement, "touchstart", function (e) {
                        video.play();
                        video.pause();
                    });

                    video.setAttribute("src", blobURL);
                    video.currentTime = t + 0.01;
                });
        }
    }, 1000);
});