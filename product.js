document.addEventListener("DOMContentLoaded", function (event) {
  const screenMinWidth = 768; // pixels

  // ---------------------------------------------------------------------------------------
  // Orb animations with pin
  // ---------------------------------------------------------------------------------------

  ScrollTrigger.normalizeScroll(true);

  const orbMiddle = document.querySelector(".orb_middle-product");

  if (window.innerWidth >= screenMinWidth) {
    // Pin the .orb_middle in the middle of the viewport
    function orbanimDesk() {
      let tl = gsap.timeline({});
      tl.to(orbMiddle, {
        scrollTrigger: {
          trigger: ".track",
          start: "top top",
          pin: orbMiddle,
          pinSpacing: false,
          end: "bottom bottom"
        }
      });
      tl.to(orbMiddle, {
        scrollTrigger: {
          trigger: ".section_business-data",
          start: "top 80%",
          end: "80% center",
          //toggleClass: "is-right",
          scrub: 2,
          toggleActions: "play reverse none reverse",
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(".orb_middle-product", {
              x: `${progress * 200}%`,
              y: `${progress * -100}%`,
              filter: `blur(${progress * 100}px`,
              opacity: 1
            });
          }
        }
      })
        .to(orbMiddle, {
          scrollTrigger: {
            trigger: ".section_pd-features",
            start: "top 80%",
            end: "bottom bottom",
            scrub: 2,
            toggleActions: "play reverse none reverse",
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(".orb_middle-product", {
                x: `${progress * 0}%`,
                y: `-100%`,
                filter: `blur(${progress * 0}px`,
                opacity: 1
              });
            }
          }
        })
        .to(orbMiddle, {
          scrollTrigger: {
            trigger: ".section_forwho",
            start: "top center",
            end: "bottom bottom",
            scrub: 2,
            toggleActions: "play reverse none reverse",
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(".orb_middle-product", {
                x: `${progress * 0}%`,
                y: `-100%`,
                filter: `blur(${progress * 100}px`,
                opacity: 1
              });
            }
          }
        });
      tl.to(orbMiddle, {
        scrollTrigger: {
          trigger: ".section_teams",
          start: "top center",
          end: "bottom top",
          scrub: 2,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(".orb_middle-product", {
              opacity: 1 - progress,
              x: `${progress * 0}%`,
              y: `-100%`,
              filter: `blur(${progress * 100}px`
            });
          }
        }
      });
    }
    orbanimDesk();
  } else {
    // Mobile version of the orb animation
    function orbanimMobile() {
      let card02 = gsap.utils.toArray(".card02");

      // Pin the .orb_middle in the middle of the viewport
      let tl = gsap.timeline({});
      tl.to(orbMiddle, {
        scrollTrigger: {
          trigger: ".track",
          start: "top top",
          pin: orbMiddle,
          pinSpacing: false,
          end: "bottom bottom"
        }
      });
      tl.to(orbMiddle, {
        scrollTrigger: {
          trigger: ".section_business-data",
          start: "top 80%",
          end: "80% center",
          scrub: 2,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(".orb_middle-product", {
              y: `${progress * -100}%`,
              filter: `blur(${progress * 30}px`,
              opacity: 1
            });
          }
        }
      });

      tl.to(orbMiddle, {
        scrollTrigger: {
          trigger: ".section_forwho",
          start: "top 80%",
          end: "80% center",
          scrub: 2,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(".orb_middle-product", {
              y: `-100%`,
              opacity: 1
            });
          }
        }
      });
      tl.to(orbMiddle, {
        scrollTrigger: {
          trigger: ".section_teams",
          start: "top top",
          end: "bottom top",
          scrub: 2,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(".orb_middle-product", {
              filter: `blur(${progress * 120}px`,
              y: `-100%`
            });
          }
        }
      });
    }
    orbanimMobile();
  }

  // ---------------------------------------------------------------------------------------
  // PI.AI TXT reveal up animation
  // ---------------------------------------------------------------------------------------

  // TextSplit function
  let typeSplit;
  function runSplit() {
    typeSplit = new SplitType("[split-word]", {
      types: "lines, words"
    });
  }
  runSplit();
  // Update on window resize
  let windowWidth = $(window).innerWidth();
  window.addEventListener("resize", function () {
    if (windowWidth !== $(window).innerWidth()) {
      windowWidth = $(window).innerWidth();
      typeSplit.revert();
      runSplit();
    }
  });

  $("[split-word]").each(function (index) {
    let listTxt = $(this).find(".word");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this).closest("[split-word]"), //listTxt[index], // Use the current listCard element
        start: "top 80%"
      },
      onLeave: () => {
        typeSplit.revert();
      }
    });
    // Timeline
    tl.from(listTxt, {
      alpha: 0,
      stagger: { each: 0.045 },
      ease: "power3.out",
      duration: 5
    });
  });

  function revertTypeSplitOnFooter() {
    // Get the footer element
    const footer = document.querySelectorAll(".footer");

    // Create a scroll trigger to listen for the footer's top reaching the viewport bottom
    const scrollTrigger = ScrollTrigger.create({
      trigger: footer,
      start: "top bottom",
      onEnter: () => {
        // Revert back typeSplit
        typeSplit.revert();
      }
    });

    // Start the scroll trigger
    scrollTrigger.play();
  }

  // ---------------------------------------------------------------------------------------
  // FLoating animations
  // ---------------------------------------------------------------------------------------

  // SVG elements parallax speed vertical
  function floating() {
    var parallaxItems = gsap.utils.toArray("[data-module-parallax]");
    parallaxItems.forEach((section) => {
      gsap.utils
        .toArray(section.querySelectorAll("[data-parallax]"))
        .forEach((parallax) => {
          const depth = parallax.dataset.speed;
          const movement = -(parallax.offsetHeight * depth);

          gsap.fromTo(
            parallax,
            {
              y: -movement
            },
            {
              y: movement,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                scrub: 2
              }
            }
          );
        });
    });
  }

  // ---------------------------------------------------------------------------------------
  // Orb rottion
  // ---------------------------------------------------------------------------------------
  function orbRotate() {
    let tl = gsap.timeline({
      defaults: {
        transformOrigin: "50% 50%",
        rotation: 720
      },
      repeat: -1
    });
    tl.to("#orb_ex", {
      duration: 65
    }).to(
      "#orb_in",
      {
        duration: 45
      },
      "=<"
    );
  }

  // ---------------------------------------------------------------------------------------
  // Swiper JS Integration
  // ---------------------------------------------------------------------------------------

  // breakpoint where swiper will be destroyed
  // and switches to a dual-column layout
  const breakpoint = window.matchMedia("(min-width:31.25em)");
  // keep track of swiper instances to destroy later
  let mySwiper;

  //////////////////////////////////////////////////////////////////

  const breakpointChecker = function () {
    // if larger viewport and multi-row layout needed
    if (breakpoint.matches === true) {
      // clean up old instances and inline styles when available
      if (mySwiper !== undefined) mySwiper.destroy(true, true);
      // or/and do nothing
      return;
      // else if a small viewport and single column layout needed
    } else if (breakpoint.matches === false) {
      // fire small viewport version of swiper
      return enableSwiper();
    }
  };

  //////////////////////////////////////////////////////////////////

  const enableSwiper = function () {
    mySwiper = new Swiper(".swiper", {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      },
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
        forceToAxis: true
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      breakpoints: {
        // mobile landscape
        480: {
          slidesPerView: "auto"
          // spaceBetween: 0
        },
        // tablet
        768: {
          slidesPerView: "auto"
          //spaceBetween: 0
        },
        // desktop
        992: {
          slidesPerView: "auto",
          spaceBetween: 16
        }
      },
      scrollbar: {
        el: $(this).find(".swiper-drag-wrapper")[0],
        draggable: true,
        dragClass: "swiper-drag",
        snapOnRelease: true
      },
      slideActiveClass: "is-active",
      slideDuplicateActiveClass: "is-active"
    });
  };

  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);
  // kickstart
  breakpointChecker();

  // Calling your functions ->
  function init() {
    orbRotate();
    floating();
    enableSwiper();
  }

  // Calling init function ->
  window.addEventListener("load", function () {
    init();
  });
});
