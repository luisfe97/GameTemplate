var introBg = document.querySelector(".intro__background img");
var rocks = document.querySelector(".hero__rocks");
var rabbits = document.querySelector(".hero__rabbits");
var path = document.querySelector(".hero__path");
var whatis = document.querySelector(".whatis");

window.addEventListener("load", parallax);
window.addEventListener("scroll", parallax);

function parallax() {
  var backgroundValue = Math.min(400, window.pageYOffset * 0.35);
  var rocksValue = Math.max(-50, window.pageYOffset * -0.15);
  var rabbitsValue = Math.max(-650, window.pageYOffset * -0.75);

  introBg.style.transform = `translateY(${backgroundValue}px)`;
  rocks.style.transform = `translateY(${rocksValue}px)`;
  rabbits.style.transform = `translateY(${rabbitsValue}px) translateX(-50%)`;
  path.style.transform = `translateY(${rabbitsValue}px)`;
  whatis.style.marginTop = `${rabbitsValue - 1}px`;
}

// Preloader

var preloader = document.getElementById("preloader");
setTimeout(function () {
  var loaderLine = document.getElementById("loaderLine");
  console.log(loaderLine);
  Object.assign(loaderLine.style, {
    transitionDuration: "0s", // Use "0s" instead of 0 for the transition duration
    width: "100%",
    animation: "AnyStopAnimation",
  });

  preloader.classList.add("hide");
  setTimeout(function () {
    document.body.classList.remove("no-scroll");
    preloader.remove();
  }, 800);
}, 6000);

// Total Section

totalInit();

function totalInit() {
  var items = Array.from(document.querySelectorAll(".total-item__content.fadein")); // Use Array.from to convert the NodeList to an array
  var OFFSET_ELEMENT = 0.75;
  var FINISH_IN = window.innerHeight / 2;

  window.addEventListener("scroll", function () {
    for (const item of items) {
      var { top, height } = item.getBoundingClientRect();
      var elementTop = window.pageYOffset + top;
      var elementBottom = elementTop + height * OFFSET_ELEMENT;
      var currentElementPosition = window.pageYOffset + window.innerHeight - elementBottom;
      var value = currentElementPosition / (FINISH_IN || 1000);
      var valueCount = Math.max(Math.min(value, 1), -1);
      item.style.opacity = valueCount;
    }
  });
}

// Faq

faqInit();

function faqInit() {
  var items = [];
  var list = document.querySelector(".faq__list");
  list.style.height = ""; // Remove the height setting

  for (const element of document.querySelectorAll(".faq-item")) {
    var content = element.querySelector(".faq-item__content");
    var item = new Proxy(
      {
        active: false,
        element: element,
        content: content,
      },
      {
        set: function set(target, prop, value) {
          if (prop === "active") {
            target[prop] = value;

            if (value === true) {
              target.content.style.height = target.content.scrollHeight + "px";
              target.content.style.padding = ""; // Remove the padding setting
            } else {
              target.content.style.height = 0;
              target.content.style.padding = 0;
            }

            return true;
          }

          return false;
        },
      }
    );
    items.push(item);
    faqItemHandler(item);
  }

  // Remove the height setting for the list
  return items;
}

function faqItemHandler(item) {
  var element = item.element;
  item.active = false;
  element.addEventListener("click", function () {
    var active = !item.active;
    item.active = active;
    active === true ? element.classList.add("opened") : element.classList.remove("opened");
  });
}

// Menu init

initMenu();

function initMenu() {
  var body = document.body;
  var openMenuBtn = document.getElementById("burgermenu");
  var closeMenuBtn = document.getElementById("close-menu");

  openMenuBtn.addEventListener("click", function () {
    body.classList.add("show-menu");
  });

  closeMenuBtn.addEventListener("click", function () {
    body.classList.remove("show-menu");
  });
}
var frameByFrameCanvases = [
    document.querySelector("#faqFramByFrame"),
    document.querySelector("#progressFramByFrame"),
    document.querySelector("#roadmapFramByFrame")
  ];
  
  var animationHandlers = [];
  
  frameByFrameCanvases.forEach(function (framesContainer) {
    var frames = Array.from(framesContainer.querySelectorAll("img"));
  
    animationHandlers.push(function () {
      var timeline = framesContainer.getBoundingClientRect().height +
        framesContainer.getBoundingClientRect().height / 4;
  
      var timelineStep = timeline / frames.length;
  
      var scrollCoord = framesContainer.getBoundingClientRect().top;
  
      frames.slice().reverse().forEach(function (frame, idx) {
        if (scrollCoord > timelineStep * idx) {
          frame.style.opacity = 0;
        } else {
          frame.style.opacity = 1;
        }
      });
    });
  });
  
  // Asumiendo que tienes algún mecanismo para activar los handlers, por ejemplo, con un evento de scroll:
  window.addEventListener("scroll", function () {
    animationHandlers.forEach(function (handler) {
      handler();
    });
  });

  
  