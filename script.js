// ================= PG DATABASE (DEMO) =================

const properties = [
    {
        id: 1,
        name: "Zolo HSR Living",
        location: "Sitapura, Jaipur",
        price: 12000,
        rating: "4.6",
        reviews: "1.2k",
        category: "Boys",
        occupancy: "Single",
        amenities: ["Wi-Fi", "AC", "Meals"],
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
        verified: true
    },
    {
        id: 2,
        name: "The Nest PG",
        location: "Jagatpura, Jaipur",
        price: 10500,
        rating: "4.4",
        reviews: "856",
        category: "Girls",
        occupancy: "Double",
        amenities: ["Wi-Fi", "AC", "Laundry"],
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
        verified: true
    },
    {
        id: 3,
        name: "Stanza Living Sigma",
        location: "Malviya Nagar, Jaipur",
        price: 14000,
        rating: "4.5",
        reviews: "742",
        category: "Co-living",
        occupancy: "Single",
        amenities: ["Wi-Fi", "AC", "Meals"],
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        verified: true
    },
    {
        id: 4,
        name: "PG Life Residency",
        location: "Vaishali Nagar, Jaipur",
        price: 9500,
        rating: "4.3",
        reviews: "621",
        category: "Boys",
        occupancy: "Double",
        amenities: ["Wi-Fi", "AC", "Laundry"],
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        verified: true
    },
    {
        id: 5,
        name: "Royal Girls Residence",
        location: "Mansarovar, Jaipur",
        price: 11000,
        rating: "4.8",
        reviews: "520",
        category: "Girls",
        occupancy: "Double",
        amenities: ["Wi-Fi", "Meals", "Laundry"],
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
        verified: true
    },
    {
        id: 6,
        name: "Luxury Urban Homes",
        location: "Jagatpura, Jaipur",
        price: 18000,
        rating: "4.9",
        reviews: "380",
        category: "Luxury",
        occupancy: "Single",
        amenities: ["Wi-Fi", "AC", "Meals"],
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        verified: true
    }
];

let selectedCategory = "All";
let currentRole = "";
let currentSearch = "";


// ================= DISPLAY PGs =================

function displayProperties(data) {

    const grid = document.getElementById("pgGrid");

    grid.innerHTML = "";

    document.getElementById("noResults").hidden = data.length !== 0;

    data.forEach(pg => {

        const card = document.createElement("div");

        card.className = "pg-card";

        card.innerHTML = `
            <div class="pg-image">

                <img src="${pg.image}" alt="${pg.name}" loading="lazy">

                <div class="rating">
                    ★ ${pg.rating} (${pg.reviews})
                </div>

                ${pg.verified ?
                    `<div class="verified">✓ Verified</div>` : ""}

            </div>

            <div class="pg-info">

                <h3>${pg.name}</h3>

                <div class="pg-location">
                    <i class="fa-solid fa-location-dot"></i>
                    ${pg.location}
                </div>

                <div class="pg-amenities">
                    ${pg.amenities.map(a =>
                        `<span>✓ ${a}</span>`
                    ).join("")}
                </div>

                <div class="pg-bottom">

                    <div class="price">
                        ₹ ${pg.price.toLocaleString("en-IN")}
                        <small>/month</small>
                    </div>

                    <i class="fa-solid fa-chevron-right"></i>

                </div>

            </div>
        `;

        grid.appendChild(card);

    });

}


// ================= FILTER =================

function filterProperties() {

    let result = [...properties];

    if (selectedCategory === "Single" ||
        selectedCategory === "Double") {

        result = result.filter(
            p => p.occupancy === selectedCategory
        );

    } else if (selectedCategory !== "All") {

        result = result.filter(
            p => p.category === selectedCategory
        );

    }

    const occupancy = document.getElementById("occupancy").value;

    if (occupancy !== "All") {
        result = result.filter(
            p => p.occupancy === occupancy
        );
    }

    if (currentSearch) {

        result = result.filter(p =>
            p.name.toLowerCase().includes(currentSearch) ||
            p.location.toLowerCase().includes(currentSearch) ||
            p.category.toLowerCase().includes(currentSearch)
        );

    }

    displayProperties(result);
}


function selectCategory(element) {

    document.querySelectorAll(".category").forEach(c =>
        c.classList.remove("active")
    );

    element.classList.add("active");

    selectedCategory = element.dataset.category;

    filterProperties();
}


function searchPG() {
    filterProperties();
    scrollToPG();
}


function showAll() {

    selectedCategory = "All";
    currentSearch = "";

    document.getElementById("headerSearch").value = "";

    document.getElementById("occupancy").value = "All";

    document.querySelectorAll(".category").forEach(c =>
        c.classList.remove("active")
    );

    document.querySelector('[data-category="All"]')
        .classList.add("active");

    displayProperties(properties);

}


// ================= HEADER SEARCH =================

document.getElementById("headerSearch")
.addEventListener("input", function() {

    currentSearch = this.value.trim().toLowerCase();

    filterProperties();

});


// ================= CITY CHANGE =================

function changeCity() {

    const city = prompt("Enter your city:");

    if (!city || !city.trim()) return;

    const name = city.trim();

    document.getElementById("cityName").textContent = name;
    document.getElementById("searchCity").textContent = name;
    document.getElementById("headingCity").textContent = name;

}


// ================= SIGN IN PAGE =================

// OPEN LOGIN PAGE

function openLogin() {

    document.getElementById("homePage").style.display = "none";

    document.getElementById("loginPage").classList.add("show");

    document.getElementById("bottomNav").style.display = "none";

    document.getElementById("menuDropdown").classList.remove("show");

    backToRoles();

    window.scrollTo(0, 0);

}


// CLOSE LOGIN PAGE

function closeLogin() {

    document.getElementById("loginPage").classList.remove("show");

    document.getElementById("homePage").style.display = "block";

    document.getElementById("bottomNav").style.display = "flex";

    window.scrollTo(0, 0);

}


// BACK TO HOMEPAGE

function goHome() {

    closeLogin();

}


// ================= ROLE SELECTION =================

function selectRole(role) {

    currentRole = role;

    document.getElementById("roleSelection").hidden = true;

    document.getElementById("studentForm").hidden = true;

    document.getElementById("ownerForm").hidden = true;

    document.getElementById("registerForm").hidden = true;

    if (role === "student") {

        document.getElementById("studentForm").hidden = false;

    } else {

        document.getElementById("ownerForm").hidden = false;

    }

}


// BACK TO ROLE SELECTION

function backToRoles() {

    document.getElementById("roleSelection").hidden = false;

    document.getElementById("studentForm").hidden = true;

    document.getElementById("ownerForm").hidden = true;

    document.getElementById("registerForm").hidden = true;

    currentRole = "";

}


// ================= LOGIN =================

function handleLogin(event, role) {

    event.preventDefault();

    let email, password;

    if (role === "student") {

        email = document.getElementById("studentEmail").value;

        password = document.getElementById("studentPassword").value;

    } else {

        email = document.getElementById("ownerEmail").value;

        password = document.getElementById("ownerPassword").value;

    }

    // Demo-only validation.
    // Real login requires a secure backend.

    if (email && password.length >= 6) {

        if (role === "student") {

            alert("Student login demo successful!");

        } else {

            alert("PG Owner login demo successful!");

        }

        closeLogin();

    }

}


// ================= REGISTRATION =================

function showRegister(role) {

    currentRole = role;

    document.getElementById("studentForm").hidden = true;

    document.getElementById("ownerForm").hidden = true;

    document.getElementById("roleSelection").hidden = true;

    document.getElementById("registerForm").hidden = false;

    const owner = role === "owner";

    document.getElementById("registerTitle").textContent =
        owner ? "PG Owner Registration" : "Student Registration";

    document.getElementById("registerSubtitle").textContent =
        owner
        ? "Register your PG business with ROOMZY."
        : "Create your student account on ROOMZY.";

    document.getElementById("ownerExtra").hidden = !owner;

    document.getElementById("registerIcon").innerHTML =
        owner
        ? '<i class="fa-solid fa-building"></i>'
        : '<i class="fa-solid fa-graduation-cap"></i>';

    document.getElementById("registerIcon").className =
        "form-icon " + (owner ? "owner-icon" : "student-icon");

}


function backToLoginForm() {

    document.getElementById("registerForm").hidden = true;

    if (currentRole === "owner") {

        document.getElementById("ownerForm").hidden = false;

    } else {

        document.getElementById("studentForm").hidden = false;

    }

}


// REGISTRATION SUBMIT

function handleRegister(event) {

    event.preventDefault();

    const name = document.getElementById("registerName").value;

    const email = document.getElementById("registerEmail").value;

    const phone = document.getElementById("registerPhone").value;

    const password = document.getElementById("registerPassword").value;

    if (!/^[0-9]{10}$/.test(phone)) {

        alert("Enter a valid 10-digit mobile number.");

        return;

    }

    if (password.length < 6) {

        alert("Password must contain at least 6 characters.");

        return;

    }

    if (currentRole === "owner") {

        const property = document.getElementById("propertyName").value;

        const city = document.getElementById("propertyCity").value;

        if (!property.trim() || !city.trim()) {

            alert("Please enter your PG name and property city.");

            return;

        }

    }

    alert(
        "Registration form submitted successfully for " +
        name +
        "!\n\nThis is a frontend demo. Connect a backend to create your account."
    );

    backToRoles();

}


// ================= MENU =================

function toggleMenu() {

    document.getElementById("menuDropdown")
    .classList.toggle("show");

}


document.addEventListener("click", function(event) {

    const menu = document.getElementById("menuDropdown");

    const button = document.querySelector(".menu-btn");

    if (!menu.contains(event.target) &&
        !button.contains(event.target)) {

        menu.classList.remove("show");

    }

});


// ================= SCROLL =================

function scrollToPG() {

    closeLogin();

    document.getElementById("pgSection").scrollIntoView({
        behavior: "smooth"
    });

}


// ================= INITIALIZE =================

displayProperties(properties);