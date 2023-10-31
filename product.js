document.addEventListener("DOMContentLoaded", function (event) {
    // ---------------------------------------------------------------------------------------
    // Orb animations with pin
    // ---------------------------------------------------------------------------------------
  
    function funkyOrb() {
      const orbMiddle = document.querySelector(".orb_middle-product");
  
      // Pin the .orb_middle in the middle of the viewport
      let tl = gsap.timeline({});
      tl.to(orbMiddle, {
        scrollTrigger: {
          trigger: ".track",
          start: "top top",
          pin: orbMiddle,
          pinSpacing: false,
          end: "bottom bottom-=100"
        }
      })
        .to(orbMiddle, {
          scrollTrigger: {
            trigger: ".section_business-data",
            start: "top 90%",
            //endTrigger: ".crystal_question.is-1",
            end: "bottom bottom",
            scrub: true
          },
          x: "200%",
          y: "-100%", // Adjust the value to control the rightward movemen
          filter: `blur(100px)` // Adjust the blur effect,
        })
        .to(orbMiddle, {
          scrollTrigger: {
            trigger: ".section_pd-features",
            start: "top bottom",
            endTrigger: ".orb_trigger",
            end: "bottom 30%",
            scrub: true
          },
          x: 0,
          filter: `blur(0px)` // Adjust the blur effect
        })
        .to(orbMiddle, {
          scrollTrigger: {
            trigger: ".section_forwho",
            start: "top bottom",
            end: "bottom bottom",
            scrub: true
          },
          filter: `blur(100px)` // Adjust the blur effect
        })
        .to(orbMiddle, {
          scrollTrigger: {
            trigger: ".section_graphs",
            start: "top bottom",
            scrub: true
          },
          opacity: 0 // Adjust the blur effect
        });
    }
    funkyOrb();
    // // Create a ScrollTrigger for pinning .orb_middle-product-product
    // const pinTrigger = ScrollTrigger.create({
    //   trigger: ".track",
    //   start: "top top",
    //   end: "bottom bottom",
    //   pin: ".orb_middle-product",
    //   pinSpacing: false
    //   //toggleActions: "restart none none reset"
    // });
  
    // // Create a ScrollTrigger for moving and blurring .orb_middle-product
    // const moveAndBlurTrigger = ScrollTrigger.create({
    //   trigger: ".section_business-data",
    //   start: "top 90%",
    //   endTrigger: ".crystal_question.is-1",
    //   end: "bottom 30%",
    //   toggleActions: "play none none restart",
    //   onUpdate: (self) => {
    //     const progress = self.progress; // Get the progress of the trigger
    //     // Move to the right and blur .orb_middle-product when reaching .pd-feature_component
    //     gsap.to(".orb_middle-product", {
    //       x: "200%",
    //       y: "-100%", // Adjust the value to control the rightward movemen
    //       filter: `blur(${progress * 100}px)` // Adjust the blur effect
    //     });
    //   }
    // });
  
    // const blurBack = ScrollTrigger.create({
    //   trigger: ".section_pd-features",
    //   start: "top bottom",
    //   endTrigger: ".orb_trigger",
    //   end: "bottom 30%",
    //   toggleActions: "play none none reverse", // Only play the animation when the trigger enters the viewport
    //   onUpdate: (self) => {
    //     const progress = self.progress; // Get the progress of the trigger
    //     gsap.to(".orb_middle-product", {
    //       x: 0, // Adjust the value to control the rightward movement
    //       filter: `blur(${progress * 0}px)` // Adjust the blur effect
    //     });
    //   }
    // });
  
    // const blurTrigger = ScrollTrigger.create({
    //   trigger: ".section_forwho",
    //   start: "top bottom",
    //   end: "bottom bottom",
    //   toggleActions: "play none none reverse", // Only play the animation when the trigger enters the viewport
    //   onUpdate: (self) => {
    //     const progress = self.progress; // Get the progress of the trigger
    //     // Slowly set opacity to 0 at the bottom of .section_forwho
    //     gsap.to(".orb_middle-product", {
    //       filter: `blur(${progress * 100}px)` // Adjust the blur effect
    //     });
    //     //Make the opacity 0 here
    //   }
    // });
  
    // const opacityTrigger = ScrollTrigger.create({
    //   trigger: ".section_forwho",
    //   start: "80% bottom",
    //   toggleActions: "play none none reverse",
    //   onUpdate: (self) => {
    //     const progress = self.progress;
    //     gsap.to(".orb_middle-product", {
    //       opacity: 1 - progress
    //     });
    //   }
    // });
  
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
  