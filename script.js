//homepage slideshow
let slideIndex = 0;
const slides = document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slideshow img");

    function changeSlide() {
        slides[slideIndex].classList.remove("active");
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add("active");
    }

    setInterval(changeSlide, 4000); // change every 4 seconds
});

// Redirect to BBC Weather
function goToBBC() {
    const city = document.getElementById('city').value.trim();
    if (!city) return;
    const url = `https://www.bbc.co.uk/weather?q=${encodeURIComponent(city)}`;
    window.location.href = url;
}