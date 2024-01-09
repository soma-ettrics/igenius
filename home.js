document.addEventListener("DOMContentLoaded", function (event) {
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

  const screenMinWidth = 768; // pixels

  // ---------------------------------------------------------------------------------------
  // Hero Slide animation
  // ---------------------------------------------------------------------------------------

  function heroAnim() {
    const scrollTriggerOptions = {
      trigger: ".hero_container",
      start: "top 30%",
      //toggleActions: "play pause resume reset"
    };
    const timelineDefaults = {
      duration: 1.8,
      opacity: 1,
      delay: 0.4,
      ease: "expo.inOut",
    };

    const tl = gsap.timeline({
      scrollTrigger: scrollTriggerOptions,
      repeat: -1,
      defaults: timelineDefaults,
    });
    const tl2 = gsap.timeline({
      scrollTrigger: scrollTriggerOptions,
      repeat: -1,
      defaults: timelineDefaults,
    });

    let wordsArray = gsap.utils.toArray(".hero_heading-anim");
    let wordsDivArray = gsap.utils.toArray(".hero_heading-anim-wrap");

    let i = -100 / (wordsArray.length / 2);

    tl.from(wordsArray, { opacity: 0, duration: 0.2 });

    wordsArray.forEach((element) => {
      tl.to(wordsDivArray, {
        yPercent: i,
      });
      i -= 100 / 7;
    });

    tl.to(wordsDivArray, {
      yPercent: i,
      duration: 0,
      opacity: 1,
    });

    // Image animation

    let imgArray = gsap.utils.toArray(".hero-img");
    let imgDivArray = gsap.utils.toArray(".hero_title-img");

    let j = -100 / (imgArray.length / 2);

    tl2.from(imgArray, { opacity: 0, duration: 0.2 });

    imgArray.forEach((element) => {
      tl2.to(imgDivArray, {
        yPercent: j,
      });
      j -= 100 / 7;
    });

    tl2.to(imgDivArray, {
      yPercent: j,
      duration: 0,
      opacity: 1,
    });
  }

  // ---------------------------------------------------------------------------------------
  // AI TXT reveal up animation
  // ---------------------------------------------------------------------------------------

  // TextSplit function
  let typeSplit;
  function runSplit() {
    typeSplit = new SplitType("[split-word]", {
      types: "lines, words",
    });
  }
  // Update on window resize
  let windowWidth = $(window).innerWidth();
  window.addEventListener("resize", function () {
    if (windowWidth !== $(window).innerWidth()) {
      windowWidth = $(window).innerWidth();
      SplitType.revert("[split-word]");
      runSplit();
    }
  });
  function aiTxtReveal() {
    $("[split-word]").each(function (index) {
      let listTxt = $(this).find(".word");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this).closest("[split-word]"), //listTxt[index], // Use the current listCard element
          start: "top 80%",
          // onUpdate: (self) => {
          //   if (self.progress === 1) {
          //     SplitType.revert($(this));
          //   }
          // },
        },
      });
      // Timeline
      tl.from(listTxt, {
        alpha: 0,
        stagger: { each: 0.045 },
        ease: "power3.out",
        duration: 5,
      });
    });
  }
  // Revert back SplitType
  $(".wg-element-wrapper").on("mouseenter", function () {
    SplitType.revert("[split-word]");
  });
  //Set a flag to track whether the scroll event has been triggered
  let scrollEventTriggered = false;
  // Function to be executed when the page is scrolled
  function handleScroll() {
    if (!scrollEventTriggered) {
      // Your custom JavaScript code to run when the page is scrolled
      console.log("Page scrolled!");
      runSplit();
      aiTxtReveal();

      // Set the flag to true to indicate that the event has been triggered
      scrollEventTriggered = true;

      // Remove the scroll event listener to prevent further executions
      window.removeEventListener("scroll", handleScroll);
    }
  }

  // Add the scroll event listener
  window.addEventListener("scroll", handleScroll);

  // ---------------------------------------------------------------------------------------
  // ORB morph animation
  // ---------------------------------------------------------------------------------------

  //MorphSVGPlugin.defaultType = "rotational";

  function orbRotate() {
    let tl = gsap.timeline({
      defaults: {
        transformOrigin: "50% 50%",
        rotation: 720,
      },
      repeat: -1,
    });
    tl.to("#orb_ex", {
      duration: 65,
    }).to(
      "#orb_in",
      {
        duration: 45,
      },
      "=<"
    );
  }

  if (window.innerWidth >= screenMinWidth) {
    function orbScrollAnim() {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".track.is-orb",
          // trigger element - viewport
          start: "top 70%",
          end: "bottom 80%",
          scrub: 2,
        },
      });

      tl.to("#orb", {
        morphSVG: {
          shape: "#rect",
          precision: 5,
          defaultType: "rotational",
        },
      })
        .to(".orb_line.is-2", {
          opacity: 0,
        })
        .from(".ui_side", { opacity: 0, x: "10%", ease: "power4.out" })
        .to(".orb_middle", { x: "-110%", ease: "power2.out" }, "<=")
        .from(".orb_question", { opacity: 0 })
        .from(".crystal_logo", { opacity: 0 }, "<=")
        .to(".ui_placeholder", { opacity: 0 })
        .to(".orb_middle", { opacity: 0 }, "<=")
        .to(".ui_question", { opacity: 1 })
        .from(".crystal_question.is-user", { opacity: 0 })
        .from(".crystal_ui-answer", { opacity: 0 })
        .from(".orb_animation-graph", { opacity: 0 }, "<=");
    }
  } else {
    // Mobile version
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".track.is-orb",
        // trigger element - viewport
        start: "top bottom",
        end: "80% bottom",
        scrub: 1,
      },
    });

    tl.to(".orb_line.is-2", {
      opacity: 0,
    })
      .from(".orb_question", { opacity: 0 })
      .from(".crystal_logo", { opacity: 0 }, "<=")
      .to(".ui_placeholder", { opacity: 0 })
      .to(".orb_middle", { opacity: 0 }, "<=")
      .to(".ui_question", { opacity: 1 })
      .from(".crystal_question.is-user", { opacity: 0 })
      .from(".crystal_ui-answer", { opacity: 0 })
      .from(".orb_animation-graph", { opacity: 0 }, "<=");
  }

  // ---------------------------------------------------------------------------------------
  // Easy Mode animation
  // ---------------------------------------------------------------------------------------

  function easyMode() {
    let circle1 = document.querySelectorAll(".mid-anim_img-wrap.is-1");
    let circle3 = document.querySelectorAll(".mid-anim_img-wrap.is-3");

    let tleasyMode = gsap.timeline({
      scrollTrigger: {
        trigger: ".data-driven_mid-anim",
        // trigger element - viewport
        start: "top 65%",
        scrub: 2,
      },
    });

    tleasyMode
      .to(circle1, {
        x: "154%",
        duration: 4,
        ease: "power4.out",
      })
      .to(
        circle3,
        {
          x: "-154%",
          duration: 4,
          ease: "power4.out",
        },
        "=<"
      )
      .to(
        ".circle-1",
        {
          x: "111%",
          duration: 4,
          ease: "power4.out",
        },
        "=<"
      )
      .to(
        ".circle-2",
        {
          x: "54.4%",
          duration: 4,
          ease: "power4.out",
        },
        "=<"
      )
      .to(
        ".circle-3",
        {
          x: "-54.4%",
          duration: 4,
          ease: "power4.out",
        },
        "=<"
      )
      .to(
        ".circle-4",
        {
          x: "-111%",
          duration: 4,
          ease: "power4.out",
        },
        "=<"
      );
  }

  // END OF THE ANIMATION CODE

  // ---------------------------------------------------------------------------------------
  // Swiper JS Media Coverage
  // ---------------------------------------------------------------------------------------

  $(".slider-main_component").each(function (index) {
    let loopMode = false;
    if ($(this).attr("loop-mode") === "true") {
      loopMode = false;
    }
    let sliderDuration = 600;
    if ($(this).attr("slider-duration") !== undefined) {
      sliderDuration = +$(this).attr("slider-duration");
    }
    const swiper = new Swiper($(this).find(".swiper")[0], {
      speed: sliderDuration,
      loop: loopMode, // loopMode,
      roundLengths: true,
      loopAdditionalSlides: 30,
      autoHeight: false,
      centeredSlides: false,
      //followFinger: true,
      freeMode: false,
      slideToClickedSlide: false,
      slidesPerView: 1,
      spaceBetween: 16,
      rewind: false,
      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      breakpoints: {
        // mobile landscape
        480: {
          slidesPerView: "auto",
          // spaceBetween: 0
        },
        // tablet
        768: {
          slidesPerView: "auto",
          //spaceBetween: 0
        },
        // desktop
        992: {
          slidesPerView: "auto",
          //spaceBetween: 16
        },
      },
      // pagination: {
      //   el: $(this).find(".swiper-bullet-wrapper")[0],
      //   bulletActiveClass: "is-active",
      //   bulletClass: "swiper-bullet",
      //   bulletElement: "button",
      //   clickable: true
      // },
      // navigation: {
      //   nextEl: $(this).find(".swiper-next")[0],
      //   prevEl: $(this).find(".swiper-prev")[0],
      //   disabledClass: "is-disabled"
      // },
      scrollbar: {
        el: $(this).find(".swiper-drag-wrapper")[0],
        draggable: true,
        dragClass: "swiper-drag",
        snapOnRelease: true,
      },
      slideActiveClass: "is-active",
      slideDuplicateActiveClass: "is-active",
    });
  });

  // Calling your functions ->
  function init() {
    orbRotate();
    heroAnim();
    easyMode();
    orbScrollAnim();
  }

  // Calling init function ->
  window.addEventListener("load", function () {
    init();
  });
});
