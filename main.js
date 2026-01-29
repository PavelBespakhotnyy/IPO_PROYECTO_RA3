// Auto-scroll navigation to show active section
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const navHeight = document.querySelector(".nav").offsetHeight;

  let currentSection = "";
  let maxVisibleArea = 0;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const visibleTop = Math.max(rect.top, navHeight);
    const visibleBottom = Math.min(rect.bottom, window.innerHeight);
    const visibleArea = Math.max(0, visibleBottom - visibleTop);

    // The section with the largest visible area becomes active
    if (visibleArea > maxVisibleArea && visibleArea > 100) {
      maxVisibleArea = visibleArea;
      currentSection = section.id;
    }
  });

  // Update active link
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");

      // Auto-scroll navigation to show active link
      const linkElement = link.parentElement;
      const navList = document.querySelector(".nav-list");
      const container = navList.parentElement;

      // Always center the active link
      const linkPosition = linkElement.offsetLeft;
      const containerWidth = container.offsetWidth;
      const linkWidth = linkElement.offsetWidth;
      const maxScroll = navList.scrollWidth - containerWidth;

      // Calculate position to center the active link
      let targetScroll = linkPosition - containerWidth / 2 + linkWidth / 2;

      // Ensure we don't scroll beyond the boundaries
      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

      // Smooth scroll to center the active link
      navList.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  });
}

// Update active link on scroll
window.addEventListener("scroll", updateActiveNavLink);

// Tab functionality
function showTab(tabName) {
  // Find the closest tabs container to work only within that section
  const clickedButton = event.target;
  const tabsContainer = clickedButton.closest(".tabs");

  if (!tabsContainer) return;

  // Hide all tab contents within this tabs container
  const tabContents = tabsContainer.querySelectorAll(".tab-content");
  tabContents.forEach((content) => {
    content.classList.remove("active");
  });

  // Remove active class from all buttons within this tabs container
  const tabButtons = tabsContainer.querySelectorAll(".tab-button");
  tabButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // Show selected tab and activate button
  document.getElementById(tabName).classList.add("active");
  clickedButton.classList.add("active");
}

// Scroll to top functionality
window.addEventListener("scroll", function () {
  const scrollTop = document.getElementById("scrollTop");
  if (window.pageYOffset > 300) {
    scrollTop.classList.add("visible");
  } else {
    scrollTop.classList.remove("visible");
  }
});

document.getElementById("scrollTop").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Remove active class from all links
    document
      .querySelectorAll(".nav-link")
      .forEach((l) => l.classList.remove("active"));
    // Add active class to clicked link
    this.classList.add("active");

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navHeight = document.querySelector(".nav").offsetHeight + 30; // Extra margin
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth",
      });
    }
  });
});

// Progress bar animation
window.addEventListener("load", function () {
  const progressBars = document.querySelectorAll(".progress-fill");
  progressBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
});
