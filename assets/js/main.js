$(function () {
    // ------ lottie -----
    // // 1.loading
    const ani1 = bodymovin.loadAnimation({
        container: $("#lottie_1")[0],
        path: "./assets/data/loading.json",
        renderer: "svg",
        loop: false,
        autoplay: true,
    });
    ani1.onComplete = function () {
        gsap.set("#lottie_1", { display: "none" });
        gsap.set("#lottie_2", { display: "block" });
    };

    gsap.to("#loading", {
        "--height": 0,
        delay: 1.4,
    });
    gsap.to("#header .group-nav .bar", {
        "--transY": "0%",
        delay: 3.4,
    });
    gsap.to("#header", {
        "--line": "100%",
        delay: 3.4,
        duration: 1,
        ease: "power1.in",
    });
    gsap.to(["#header .group-header", "#header .contents", "#header .index-wrapper", "#header .title-area .headline"], {
        opacity: 1,
        delay: 3.7,
        onComplete: function () {
            gsap.set("body", { overflow: "auto" });
        },
    });

    // 2.scroll
    const ani2 = bodymovin.loadAnimation({
        container: $("#lottie_2")[0],
        path: "./assets/data/scroll.json",
        renderer: "svg",
        loop: false,
        autoplay: false,
    });

    ScrollTrigger.create({
        trigger: ".sc-about",
        start: "0% 100%",
        end: `100% 0%`,
        onUpdate: function (self) {
            const frame = ani2.totalFrames * self.progress;
            if (frame < 338) {
                ani2.goToAndStop(frame, true);
            }
        },
    });
    gsap.to("#lottie_2", {
        scale: 8,
        scrollTrigger: {
            trigger: ".sc-about",
            start: "100% 80%",
            end: "100% 0%",
            scrub: 1,
        },
    });

    // 3.footer
    const ani3 = bodymovin.loadAnimation({
        container: $("#lottie_3")[0],
        path: "./assets/data/footer.json",
        renderer: "svg",
        loop: false,
        autoplay: false,
    });
    ScrollTrigger.create({
        trigger: "#footer .group-anim",
        start: "0% 100%",
        onEnter: function () {
            ani3.goToAndPlay(0, true);
        },
    });

    // ------ scrollTrigger -------
    const match = gsap.matchMedia();
    //nav
    ScrollTrigger.create({
        trigger: ".group-nav .bar",
        start: "-100% 0%",
        end: `100% 0%`,
        onLeaveBack: function () {
            $(".global-gnb").addClass("hide");
        },
        onLeave: function () {
            $(".global-gnb").removeClass("hide");
        },
    });

    //sc-about
    const descWrap = $(".sc-about .desc-wrap");
    const desc = $(".sc-about .desc-wrap .desc");
    $.each(descWrap, function (i, e) {
        gsap.to(desc[i], {
            y: 0,
            scrollTrigger: {
                trigger: descWrap[i],
                start: "100% 100%",
            },
        });
    });

    //sc-gallery
    const gallery = $(".group-gallery");
    const galleryItem = $(".group-gallery .gallery-item");
    const galleryItemImg = $(".group-gallery .gallery-item img");
    const galleryName = $(".sc-gallery .name-item");
    const groupImg = $(".sc-gallery .group-img .img");
    const contentsHead = $(".sc-gallery .group-contents .headline span");
    const galleryTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-gallery",
            start: "0% 0%",
            end: "100% 100%",
            scrub: 2,
            invalidateOnRefresh: true,
            onUpdate: function (self) {
                if (self.progress >= 0.127) {
                    gsap.to("#lottie_2", { opacity: 0 });
                } else {
                    gsap.to("#lottie_2", { opacity: 1 });
                }
            },
        },
    });

    // 1. gallery y축 이동
    galleryTl.to([gallery, groupImg], { y: 0 }, "imgY");

    // 반응형 3-1. 1280 이상일 경우 3개  groupImg움직임
    match.add("(min-width:1280px)", function () {
        galleryTl

            .to(gallery, { xPercent: 200 }, "imgX")
            .to(groupImg[0], { xPercent: 110 }, "imgX")
            .to(groupImg[1], { xPercent: 40 }, "imgX");
    });

    // 반응형 3-2. 768~1279 일 경우 groupImg 2개 움직임
    match.add("(min-width:768px) and (max-width:1279px)", function () {
        galleryTl.to(gallery, { xPercent: 100 }, "imgX").to(groupImg[0], { xPercent: 10 }, "imgX");
    });

    // 4. 나머지 공통
    galleryTl
        .to(contentsHead[0], { yPercent: -100 }, "imgX+=35%")
        .to(contentsHead[1], { yPercent: -100 }, "imgX+=45%")
        .to(".sc-gallery .group-contents", { "--opacity": 1 }, ">-70%");
    galleryItem.each(function (i) {
        if (i < galleryItem.length - 1) {
            galleryTl
                .to(galleryItemImg[i], { scale: 1.2 }, `a${i}`)
                .to(galleryItem[i + 1], { yPercent: -100 }, `a${i}`)
                .to(galleryItemImg[i + 1], { opacity: 1 }, `a${i}`)
                .to(galleryName[i], { opacity: 0.4 }, `a${i}`)
                .to(galleryName[i + 1], { opacity: 1 }, `a${i}`)
                .to(
                    ".fraction-wrap .total",
                    {
                        y: function () {
                            return $(".fraction-wrap .page").outerHeight(true) * -(i + 1);
                        },
                    },
                    `a${i}`
                );
        }
    });
});
