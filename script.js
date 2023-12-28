document.addEventListener('DOMContentLoaded', function () {
  // Function to toggle project details
  function toggleProjectDetails(button) {
    var projectItem = button.closest('.project-item');
    var allProjectItems = document.querySelectorAll('.project-item');
    var mainImages = projectItem.querySelectorAll('.main_image');

    allProjectItems.forEach(function (item) {
      if (item !== projectItem && item.classList.contains('expanded')) {
        item.classList.remove('expanded');
        item.querySelector('.read-more-btn').innerText = 'Read More';
        var otherProjectImages = item.querySelectorAll('.project-images img');
        otherProjectImages.forEach(function (image) {
          image.style.transform = 'scale(1)';
        });
        // Hide main image of other project items
        var otherMainImages = item.querySelectorAll('.main_image');
        otherMainImages.forEach(function (image) {
          image.style.display = 'block';
        });
      }
    });

    projectItem.classList.toggle('expanded');
    var buttonText = projectItem.classList.contains('expanded') ? 'Read Less' : 'Read More';
    button.innerText = buttonText;

    // Toggle the visibility of main images for the current item
    mainImages.forEach(function (image) {
      image.style.display = projectItem.classList.contains('expanded') ? 'none' : 'block';
    });
  }

  // Add click event listener to 'Read More' buttons
  document.querySelectorAll('.read-more-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      toggleProjectDetails(button);
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Responsive Navigation
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");

  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navbar.classList.remove("active");
    }
  });
});


const gallery = document.querySelector(".gallery");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".gallery i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to the beginning of the carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to the end of the carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at the appropriate position to hide the first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; 
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if the mouse is not hovering over the carousel
    clearTimeout(timeoutId);
    if(!gallery.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if the window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
gallery.addEventListener("mouseenter", () => clearTimeout(timeoutId));
gallery.addEventListener("mouseleave", autoPlay);
