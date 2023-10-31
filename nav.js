// get elements
let menuLink = $(".menu_dp-link");
let content = $(".menu_dropdown_content");
let menuBG = $(".menu_bg");
let dropdownWrap = $(".menu_content");
let menuArrow = $(".menu_arrow-wrap");
gsap.defaults({
  duration: 0.4
});

function revealDropdown(currentLink, currentContent) {
  dropdownWrap.css("display", "flex");
  gsap.set(menuArrow, {
    width: currentLink.outerWidth(),
    x: currentLink.offset().left
  });
  gsap.set(menuBG, {
    width: currentContent.outerWidth(),
    height: currentContent.outerHeight()
  });
  gsap.set(content, {
    opacity: 0
  });
  gsap.set(currentContent, {
    opacity: 1,
    x: "0em"
  });
}

function switchDropdown(currentLink, previousContent, currentContent) {
  gsap.to(menuArrow, {
    width: currentLink.outerWidth(),
    x: currentLink.offset().left
  });
  gsap.to(menuBG, {
    width: currentContent.outerWidth(),
    height: currentContent.outerHeight()
  });
  // invert moveDistance if needed
  let moveDistance = 10;
  if (currentContent.index() < previousContent.index()) {
    moveDistance = moveDistance * -1;
  }
  gsap.fromTo(
    previousContent,
    { opacity: 1, x: "0em" },
    {
      opacity: 0,
      x: moveDistance * -1 + "em",
      duration: 0.3
    }
  );
  gsap.fromTo(
    currentContent,
    { opacity: 0, x: moveDistance + "em" },
    {
      opacity: 1,
      x: "0em",
      duration: 0.3
    }
  );
}

// Open dropdown animation
let showDropdown = gsap.timeline({
  paused: true,
  onReverseComplete: () => {
    dropdownWrap.css("display", "none");
    menuLink.removeClass("active");
  }
});
showDropdown
  .from(dropdownWrap, { opacity: 0, rotateX: -10, duration: 0.2 })
  .to(menuArrow, { opacity: 1, duration: 0.2 }, "<");

// Link Hover In
menuLink.on("mouseenter", function () {
  // get elements
  let previousLink = menuLink.filter(".active").removeClass("active");
  let currentLink = $(this).addClass("active");
  let previousContent = content.filter(".active").removeClass("active");
  let currentContent = content.eq($(this).index()).addClass("active");
  // play animations
  showDropdown.play();
  if (previousLink.length === 0) {
    revealDropdown(currentLink, currentContent);
  } else if (previousLink.index() !== currentLink.index()) {
    switchDropdown(currentLink, previousContent, currentContent);
  }
});

// Menu Hover Out
$(".menu_dp-wrap").on("mouseleave", function () {
  showDropdown.reverse();
});
// Menu Close Btn
$(".close_btn").on("click", function () {
  showDropdown.reverse();
});

// ---------------------------------------------------------------------------------------
// Mobile menu animation
// ---------------------------------------------------------------------------------------
function mobileNav() {
  const tl = gsap.timeline({ paused: true });
  let listTxt = gsap.utils.toArray(".menu_link, .nav-accordion");
  tl.from(listTxt, {
    translateY: "100%",
    autoAlpha: 0,
    stagger: { each: 0.03 },
    ease: "power4.out",
    duration: 0.6,
    delay: 0.322
  });

  // Click counter
  let clickCount = 0;

  // Function to handle the click event on .navbar18_menu-button
  function handleMenuButtonClick() {
    clickCount++;
    if (clickCount === 1) {
      // On the first click, play the initial animation
      tl.play();
    } else if (clickCount === 2) {
      // On the second click, revert the animation
      tl.reverse();
      tl.progress(0);
      clickCount = 0; // Reset the click counter
    }
  }
  // Add a click event listener to .navbar18_menu-button
  $(".menu-icon").click(function () {
    console.log("Nav btn clicked.");
    handleMenuButtonClick();
  });
}

// Use matchMedia to run the mobileNav function only on mobile devices
const mediaQuery = window.matchMedia("(max-width: 768px)");

if (mediaQuery.matches) {
  mobileNav();
}
document.addEventListener("DOMContentLoaded", function (event) {
  const dropdownLinks = document.querySelectorAll(".navbar9_item-resources");
  const imgWraps = document.querySelectorAll(".nav-resources_img-wrap");

  dropdownLinks.forEach((link, index) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(imgWraps[index], { opacity: 1, duration: 0.3 });
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(imgWraps[index], { opacity: 0, duration: 0.3 });
    });
  });
});
// Function to fetch user's location and update the label
function getUserLocation() {
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
            const country = data.country;
            const locationLabel = document.getElementById('user_location');
            locationLabel.textContent = `User's Location: ${country}`;
        })
        .catch(error => {
            console.error("Failed to fetch user location: " + error);
            const locationLabel = document.getElementById('user_location');
            locationLabel.textContent = "User's Location: Unknown";
        });
}

// Call the function to get the user's location when the page loads
getUserLocation();

$(function () {
  function changeTab() {
    var tabName = window.location.hash.substr(1);
    var tabEl = $('[data-w-tab="' + tabName + '"]');
    if (tabEl.length) {
      tabEl.click();
    }
  }

  //when page is first loaded
  if (window.location.hash) {
    changeTab();
  }

  //internal page linking
  $(window).on("hashchange", changeTab);

  $("[data-w-tab]").on("click", function () {
    history.pushState({}, "", "#" + $(this).data("w-tab"));
  });
});
