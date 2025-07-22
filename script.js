
// Mobile menu state
let isMenuOpen = false;

// Handle scroll event for navigation background
window.addEventListener("scroll", function () {
    const nav = document.getElementById("navigation");
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileNav = document.getElementById("mobile-nav");
    const menuIcon = document.getElementById("menu-icon");
    const closeIcon = document.getElementById("close-icon");

    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        mobileNav.classList.add("open");
        menuIcon.style.display = "none";
        closeIcon.style.display = "block";
    } else {
        mobileNav.classList.remove("open");
        menuIcon.style.display = "block";
        closeIcon.style.display = "none";
    }
}

// Toggle mobile dropdown for Research
function toggleMobileDropdown() {
    const dropdown = document.querySelector(".mobile-nav-dropdown");
    const dropdownContent = document.getElementById("mobileResearchDropdown");
    const trigger = document.querySelector(".mobile-dropdown-trigger");
    
    const isOpen = dropdown.classList.contains("open");
    
    dropdown.classList.toggle("open");
    trigger.setAttribute("aria-expanded", !isOpen);
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    const dropdown = document.querySelector(".mobile-nav-dropdown");
    if (dropdown && !dropdown.contains(event.target)) {
        dropdown.classList.remove("open");
        const trigger = document.querySelector(".mobile-dropdown-trigger");
        if (trigger) {
            trigger.setAttribute("aria-expanded", "false");
        }
    }
});

// Handle keyboard navigation for dropdowns
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        // Close mobile dropdown on Escape
        const dropdown = document.querySelector(".mobile-nav-dropdown");
        if (dropdown && dropdown.classList.contains("open")) {
            dropdown.classList.remove("open");
            const trigger = document.querySelector(".mobile-dropdown-trigger");
            if (trigger) {
                trigger.setAttribute("aria-expanded", "false");
                trigger.focus();
            }
        }
    }
});

// Smooth scroll to section
function scrollToSection(href) {
    const element = document.querySelector(href);
    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    // Close mobile menu after navigation
    if (isMenuOpen) {
        toggleMobileMenu();
    }
}

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
    const nav = document.getElementById("navigation");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

    if (isMenuOpen && !nav.contains(event.target)) {
        toggleMobileMenu();
    }
});

// Handle window resize
window.addEventListener("resize", function () {
    if (window.innerWidth >= 768 && isMenuOpen) {
        toggleMobileMenu();
    }
});

// Download CV function
function downloadCV() {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = "./M VENKATESWARARAO RESUME.pdf";
    link.download = "Dr_M_Venkateswara_Rao_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// View CV function
function viewCV() {
    // Open PDF in new tab for viewing
    window.open("./M VENKATESWARARAO RESUME.pdf", "_blank");
}

// Gallery functionality
let galleryExpanded = false;

function toggleGallery() {
    const hiddenItems = document.querySelectorAll(".gallery-item.hidden");
    const toggleText = document.getElementById("toggleText");
    const toggleIcon = document.getElementById("toggleIcon");

    galleryExpanded = !galleryExpanded;

    if (galleryExpanded) {
        hiddenItems.forEach((item) => {
            item.classList.remove("hidden");
        });
        toggleText.textContent = "Show Less Photos";
        toggleIcon.style.transform = "rotate(180deg)";
    } else {
        hiddenItems.forEach((item) => {
            item.classList.add("hidden");
        });
        toggleText.textContent = "Show More Photos";
        toggleIcon.style.transform = "rotate(0deg)";
    }
}

function viewImage(button) {
    const galleryItem = button.closest(".gallery-item");
    const img = galleryItem.querySelector("img");
    const title = img.alt || "Gallery Image";

    // Always create modal popup for all devices
    createImageModal(img.src, title);
}

function createImageModal(imageSrc, title) {
    // Create modal overlay
    const modal = document.createElement("div");
    modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          padding: 20px;
          box-sizing: border-box;
        `;

    // Create close button
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.cssText = `
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          color: #000;
          font-size: 30px;
          font-weight: bold;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10001;
          transition: all 0.3s ease;
        `;

    // Add hover effect to close button
    closeBtn.addEventListener("mouseenter", () => {
        closeBtn.style.background = "white";
        closeBtn.style.transform = "scale(1.1)";
    });

    closeBtn.addEventListener("mouseleave", () => {
        closeBtn.style.background = "rgba(255, 255, 255, 0.9)";
        closeBtn.style.transform = "scale(1)";
    });

    // Create title
    const titleElement = document.createElement("h3");
    titleElement.textContent = title;
    titleElement.style.cssText = `
          color: white;
          margin: 0 0 20px 0;
          text-align: center;
          font-size: ${window.innerWidth <= 480 ? "1.2rem" : "1.5rem"};
          padding: 0 20px;
          font-family: Arial, sans-serif;
        `;

    // Create image container
    const imgContainer = document.createElement("div");
    imgContainer.style.cssText = `
          max-width: 90%;
          max-height: 70vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        `;

    // Create image
    const modalImg = document.createElement("img");
    modalImg.src = imageSrc;
    modalImg.alt = title;
    modalImg.style.cssText = `
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          cursor: pointer;
          transition: transform 0.3s ease;
        `;

    // Add click to zoom functionality
    let isZoomed = false;
    modalImg.addEventListener("click", () => {
        if (isZoomed) {
            modalImg.style.transform = "scale(1)";
            modalImg.style.cursor = "zoom-in";
        } else {
            modalImg.style.transform = "scale(1.5)";
            modalImg.style.cursor = "zoom-out";
        }
        isZoomed = !isZoomed;
    });

    // Create zoom controls for mobile
    if (window.innerWidth <= 768) {
        const zoomControls = document.createElement("div");
        zoomControls.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            background: rgba(0, 0, 0, 0.7);
            padding: 10px;
            border-radius: 25px;
          `;

        const zoomInBtn = document.createElement("button");
        zoomInBtn.innerHTML = "+";
        zoomInBtn.style.cssText = `
            background: rgba(255, 255, 255, 0.9);
            border: none;
            color: #000;
            font-size: 20px;
            font-weight: bold;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s ease;
          `;

        const zoomOutBtn = document.createElement("button");
        zoomOutBtn.innerHTML = "-";
        zoomOutBtn.style.cssText = `
            background: rgba(255, 255, 255, 0.9);
            border: none;
            color: #000;
            font-size: 20px;
            font-weight: bold;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s ease;
          `;

        let currentScale = 1;

        zoomInBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            currentScale = Math.min(currentScale * 1.2, 3);
            modalImg.style.transform = `scale(${currentScale})`;
            isZoomed = currentScale > 1;
            modalImg.style.cursor = isZoomed ? "zoom-out" : "zoom-in";
        });

        zoomOutBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            currentScale = Math.max(currentScale / 1.2, 0.5);
            modalImg.style.transform = `scale(${currentScale})`;
            isZoomed = currentScale > 1;
            modalImg.style.cursor = isZoomed ? "zoom-out" : "zoom-in";
        });

        // Add hover effects
        [zoomInBtn, zoomOutBtn].forEach((btn) => {
            btn.addEventListener("mouseenter", () => {
                btn.style.background = "white";
                btn.style.transform = "scale(1.1)";
            });
            btn.addEventListener("mouseleave", () => {
                btn.style.background = "rgba(255, 255, 255, 0.9)";
                btn.style.transform = "scale(1)";
            });
        });

        zoomControls.appendChild(zoomOutBtn);
        zoomControls.appendChild(zoomInBtn);
        modal.appendChild(zoomControls);
    }

    // Assemble modal
    imgContainer.appendChild(modalImg);
    modal.appendChild(closeBtn);
    modal.appendChild(titleElement);
    modal.appendChild(imgContainer);

    // Add to DOM
    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = () => {
        modal.style.opacity = "0";
        modal.style.transform = "scale(0.9)";
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
            document.body.style.overflow = "auto";
        }, 300);
    };

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on escape key
    const closeOnEscape = (e) => {
        if (e.key === "Escape") {
            closeModal();
            document.removeEventListener("keydown", closeOnEscape);
        }
    };
    document.addEventListener("keydown", closeOnEscape);

    // Prevent body scrolling
    document.body.style.overflow = "hidden";

    // Add opening animation
    modal.style.opacity = "0";
    modal.style.transform = "scale(0.9)";
    setTimeout(() => {
        modal.style.transition = "all 0.3s ease";
        modal.style.opacity = "1";
        modal.style.transform = "scale(1)";
    }, 10);
}

// Video Player functionality
const videos = [
    {
        id: "GcttgRF2k_c",
        title: "Advanced Microwave Lab",
        description: "CST Microwave Studio",
    },
    {
        id: "D7SifUmk4oo",
        title: "Microwave and Radar Engineering",
        description: "Microwave bands, Microwave Tubes",
    },
];

let currentVideoSlide = 0;
let isVideoPlaying = null;
let videoAutoSlideTimer = null;

// Initialize video slider
function initVideoSlider() {
    startVideoAutoSlide();
}

function startVideoAutoSlide() {
    videoAutoSlideTimer = setInterval(() => {
        if (isVideoPlaying === null) {
            nextVideo();
        }
    }, 6000);
}

function stopVideoAutoSlide() {
    if (videoAutoSlideTimer) {
        clearInterval(videoAutoSlideTimer);
        videoAutoSlideTimer = null;
    }
}

function updateVideoSlider() {
    const container = document.getElementById("videoContainer");
    const indicators = document.querySelectorAll(
        ".video-indicators .indicator"
    );
    const thumbnails = document.querySelectorAll(".thumbnail-item");

    if (container) {
        container.style.transform = `translateX(-${currentVideoSlide * 100
            }%)`;
    }

    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentVideoSlide) {
            indicator.classList.add("active");
        } else {
            indicator.classList.remove("active");
        }
    });

    // Update thumbnails
    thumbnails.forEach((thumbnail, index) => {
        if (index === currentVideoSlide) {
            thumbnail.classList.add("active");
        } else {
            thumbnail.classList.remove("active");
        }
    });
}

function nextVideo() {
    if (isVideoPlaying !== null) return;
    currentVideoSlide = (currentVideoSlide + 1) % videos.length;
    updateVideoSlider();
}

function previousVideo() {
    if (isVideoPlaying !== null) return;
    currentVideoSlide =
        (currentVideoSlide - 1 + videos.length) % videos.length;
    updateVideoSlider();
}

function goToVideo(index) {
    if (isVideoPlaying !== null) return;
    currentVideoSlide = index;
    updateVideoSlider();
}

function playVideo(index) {
    const videoSlide = document.querySelector(`[data-video-id="${index}"]`);
    const thumbnail = document.getElementById(`thumbnail-${index}`);
    const overlay = videoSlide.querySelector(".video-overlay");
    const videoInfo = videoSlide.querySelector(".video-info");

    if (videoSlide && thumbnail) {
        // Stop auto-slide
        stopVideoAutoSlide();
        isVideoPlaying = index;

        // Hide overlay and info
        overlay.style.display = "none";
        videoInfo.style.display = "none";

        // Create iframe
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videos[index].id}?autoplay=1&rel=0`;
        iframe.className = "video-iframe";
        iframe.title = videos[index].title;
        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;

        // Replace thumbnail with iframe
        thumbnail.style.display = "none";
        videoSlide.appendChild(iframe);

        // Go to this video if not already there
        if (currentVideoSlide !== index) {
            currentVideoSlide = index;
            updateVideoSlider();
        }
    }
}

function previewVideo(index) {
    // For preview, we'll just show the video info more prominently
    const videoSlide = document.querySelector(`[data-video-id="${index}"]`);
    const videoInfo = videoSlide.querySelector(".video-info");

    if (videoInfo) {
        // Add a temporary highlight effect
        videoInfo.style.background =
            "linear-gradient(to top, rgba(220, 38, 127, 0.8), rgba(220, 38, 127, 0.3))";
        setTimeout(() => {
            videoInfo.style.background =
                "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)";
        }, 2000);
    }

    // Go to this video
    if (currentVideoSlide !== index) {
        currentVideoSlide = index;
        updateVideoSlider();
    }
}

function stopCurrentVideo() {
    if (isVideoPlaying !== null) {
        const videoSlide = document.querySelector(
            `[data-video-id="${isVideoPlaying}"]`
        );
        const iframe = videoSlide.querySelector(".video-iframe");
        const thumbnail = document.getElementById(
            `thumbnail-${isVideoPlaying}`
        );
        const overlay = videoSlide.querySelector(".video-overlay");
        const videoInfo = videoSlide.querySelector(".video-info");

        if (iframe) {
            videoSlide.removeChild(iframe);
        }

        if (thumbnail) {
            thumbnail.style.display = "block";
        }

        if (overlay) {
            overlay.style.display = "flex";
        }

        if (videoInfo) {
            videoInfo.style.display = "block";
        }

        isVideoPlaying = null;
        startVideoAutoSlide();
    }
}

// Initialize video slider when page loads
document.addEventListener("DOMContentLoaded", function () {
    initVideoSlider();

    // Add escape key listener to stop video
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && isVideoPlaying !== null) {
            stopCurrentVideo();
        }
    });
});

// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
    });

    // Remove active class from all tab buttons
    document.querySelectorAll(".tab-button").forEach((button) => {
        button.classList.remove("active");
    });

    // Show selected tab content
    document.getElementById(tabName + "-tab").classList.add("active");

    // Add active class to clicked button
    event.target.classList.add("active");
}

// Collapsible functionality
function toggleCollapsible(id) {
    const content = document.getElementById(id);
    const toggle = document.getElementById(
        id.replace("-collapsible", "-toggle")
    );

    if (content.classList.contains("active")) {
        content.classList.remove("active");
        toggle.classList.remove("active");
    } else {
        // Close all other collapsibles
        document.querySelectorAll(".collapsible-content").forEach((item) => {
            item.classList.remove("active");
        });
        document.querySelectorAll(".collapsible-toggle").forEach((item) => {
            item.classList.remove("active");
        });

        // Open clicked collapsible
        content.classList.add("active");
        toggle.classList.add("active");
    }
}

// Auto-open first collapsible on mobile
document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth <= 480) {
        const firstCollapsible = document.getElementById(
            "contact-collapsible"
        );
        const firstToggle = document.getElementById("contact-toggle");
        if (firstCollapsible && firstToggle) {
            firstCollapsible.classList.add("active");
            firstToggle.classList.add("active");
        }
    }
});

// Handle window resize for collapsibles
window.addEventListener("resize", function () {
    if (window.innerWidth >= 768 && isMenuOpen) {
        toggleMobileMenu();
    }

    if (window.innerWidth > 480) {
        // Close all collapsibles on larger screens
        document.querySelectorAll(".collapsible-content").forEach((item) => {
            item.classList.remove("active");
        });
        document.querySelectorAll(".collapsible-toggle").forEach((item) => {
            item.classList.remove("active");
        });
    }
});

// Form submission handler
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("form").forEach((form) => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            alert(
                "Thank you for your message! Dr. Venkateswara Rao will get back to you within 2-3 business days."
            );
            form.reset();
        });
    });
});