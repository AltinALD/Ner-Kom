document.addEventListener("DOMContentLoaded", function () {
    const languageSelector = document.getElementById("language");
    
    languageSelector.addEventListener("change", function () {
        alert("Language changed to: " + this.value);
    });
});

// sticky button
document.addEventListener("DOMContentLoaded", function () {
    let stickyButton = document.getElementById("stickyButton");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 400) {
            stickyButton.style.display = "block";
            setTimeout(() => {
                stickyButton.style.opacity = "1";
                stickyButton.style.transform = "translateY(0)";
            }, 100);
        } else {
            // Hide the button when scrolling back up
            stickyButton.style.opacity = "0";
            stickyButton.style.transform = "translateY(20px)"; // Move down slightly
            setTimeout(() => {
                stickyButton.style.display = "none";
            }, 300); // Wait for fade-out before hiding
        }
    });
});


//header slidr show
document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slideshow img");
    let currentIndex = 0;

    function showNextSlide() {
        slides[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active");
    }

    setInterval(showNextSlide, 4000); // Change every 4 seconds
});

// Some of our work slideshow
document.addEventListener("DOMContentLoaded", function() {
    const workSlideshow = document.querySelector(".work-slideshow");
    const workSlides = document.querySelectorAll(".work-slide");
    
    if (!workSlideshow || workSlides.length === 0) return;
    
    // Clone slides to create a seamless loop
    const slideWidth = workSlides[0].offsetWidth;
    const slidesToShow = window.innerWidth > 768 ? 3 : (window.innerWidth > 480 ? 2 : 1);
    
    // Clone the first few slides and append them to the end
    for (let i = 0; i < slidesToShow; i++) {
        const clone = workSlides[i].cloneNode(true);
        workSlideshow.appendChild(clone);
    }
    
    let position = 0;
    const totalSlides = workSlides.length;
    let animationId = null;
    let isPaused = false;
    let speed = 1; // Pixels per frame
    
    // Function to move the slideshow
    function moveSlideshow() {
        if (!isPaused) {
            position -= speed; // Move by speed pixels per frame
            
            // Reset position when we've moved through all original slides
            if (position <= -(slideWidth * totalSlides)) {
                position = 0;
            }
            
            workSlideshow.style.transform = `translateX(${position}px)`;
        }
        
        animationId = requestAnimationFrame(moveSlideshow);
    }
    
    // Start the animation
    animationId = requestAnimationFrame(moveSlideshow);
    
    // Pause animation on hover
    workSlideshow.addEventListener("mouseenter", function() {
        isPaused = true;
        workSlideshow.style.transition = "transform 0.3s ease-out";
    });
    
    workSlideshow.addEventListener("mouseleave", function() {
        isPaused = false;
        workSlideshow.style.transition = "none";
    });
    
    // Handle window resize
    window.addEventListener("resize", function() {
        const newSlidesToShow = window.innerWidth > 768 ? 3 : (window.innerWidth > 480 ? 2 : 1);
        
        // Only update if the number of slides to show has changed
        if (newSlidesToShow !== slidesToShow) {
            // Pause animation during resize
            isPaused = true;
            
            // Remove all cloned slides
            const allSlides = workSlideshow.querySelectorAll(".work-slide");
            for (let i = totalSlides; i < allSlides.length; i++) {
                allSlides[i].remove();
            }
            
            // Clone the first few slides and append them to the end
            for (let i = 0; i < newSlidesToShow; i++) {
                const clone = workSlides[i].cloneNode(true);
                workSlideshow.appendChild(clone);
            }
            
            // Reset position
            position = 0;
            workSlideshow.style.transform = `translateX(${position}px)`;
            
            // Resume animation after a short delay
            setTimeout(() => {
                isPaused = false;
            }, 300);
        }
    });
});
