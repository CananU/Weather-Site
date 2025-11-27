/*USER LOGIN */
function loginUser() {
    const username = document.getElementById("username").value.trim();
    if (!username) return;

    // Save current user
    localStorage.setItem("currentUser", username);

    // Make sure user has a favourites list
    if (!localStorage.getItem("favourites_" + username)) {
        localStorage.setItem("favourites_" + username, JSON.stringify([]));
    }

    // Redirect to weather page
    window.location.href = "weather.html";
}

/* LOAD FAVOURITES ON WEATHER PAGE */
document.addEventListener("DOMContentLoaded", () => {
    const favouritesDiv = document.getElementById("favouritesList");

    if (favouritesDiv) {
        const user = localStorage.getItem("currentUser");
        if (!user) {
            favouritesDiv.innerHTML = "<p>Please <a href='login.html'>log in</a> to see your favourites.</p>";
            return;
        }

        const favs = JSON.parse(localStorage.getItem("favourites_" + user));
        displayFavourites(favs);
    }
});

function displayFavourites(favourites) {
    const container = document.getElementById("favouritesList");
    container.innerHTML = "";

    favourites.forEach(city => {
        const btn = document.createElement("button");
        btn.textContent = city;
        btn.onclick = () => autofillCity(city);
        container.appendChild(btn);
    });
}

function autofillCity(city) {
    document.getElementById("city").value = city;
}

 // SHOWS LOGOUT BUTTON IF USER IS LOGGED IN
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser && logoutBtn) {
        logoutBtn.style.display = "inline-block";
    }


    //  LOGOUT FUNCTIONALITY//
    function logoutUser() {
        localStorage.removeItem("currentUser");     // clear active user
        alert("You have been logged out.");

        // hide logout button again
        if (logoutBtn) logoutBtn.style.display = "none";

        //  redirect to homepage
        window.location.href = "index.html";
    }

    // Attach logout button
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logoutUser);
    }

//SAVE NEW FAVOURITE//
function saveFavourite() {
    const user = localStorage.getItem("currentUser");
    if (!user) return alert("Please log in first!");

    const city = document.getElementById("city").value.trim();
    if (!city) return;

    let favourites = JSON.parse(localStorage.getItem("favourites_" + user));

    // Avoid duplicates
    if (!favourites.includes(city)) {
        favourites.push(city);
        localStorage.setItem("favourites_" + user, JSON.stringify(favourites));
        displayFavourites(favourites);
    }
}
// Redirect to BBC Weather//
function goToBBC() {
    const city = document.getElementById('city').value.trim();
    if (!city) return;
    console.log(city)
    const url = `https://www.bbc.co.uk/weather?q=${encodeURIComponent(city)}`;
    window.location.href = url;
}
// Slideshow logic
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

//clock nav bar feature//
function updateClock() {
    const clock = document.getElementById("clock");
    if (!clock) return;

    const now = new Date();
    clock.textContent =
        now.toLocaleDateString() + " " + now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();