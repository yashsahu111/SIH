
const properties = [
    {
        id: 1,
        name: "The Study House",
        location: "Mansarovar",
        price: 6500,
        gender: "Boys",
        occupancy: "Double",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700",
        amenities: "Wi-Fi, Meals, Laundry"
    },
    {
        id: 2,
        name: "Bloom Girls Residence",
        location: "Malviya Nagar",
        price: 9200,
        gender: "Girls",
        occupancy: "Single",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700",
        amenities: "Wi-Fi, AC, Laundry"
    },
    {
        id: 3,
        name: "Urban Nest Hostel",
        location: "Vaishali Nagar",
        price: 7800,
        gender: "Co-ed",
        occupancy: "Triple",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=700",
        amenities: "Wi-Fi, Meals, AC"
    },
    {
        id: 4,
        name: "Pink City Stay",
        location: "Raja Park",
        price: 11500,
        gender: "Girls",
        occupancy: "Double",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=700",
        amenities: "Wi-Fi, AC, Meals"
    },
    {
        id: 5,
        name: "Campus Corner PG",
        location: "Jagatpura",
        price: 5900,
        gender: "Boys",
        occupancy: "Triple",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700",
        amenities: "Wi-Fi, Laundry"
    },
    {
        id: 6,
        name: "Olive Living",
        location: "Tonk Road",
        price: 13500,
        gender: "Co-ed",
        occupancy: "Single",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700",
        amenities: "Wi-Fi, AC, Meals"
    }
];

// Load saved properties from browser
let savedProperties = [];

try {
    savedProperties = JSON.parse(
        localStorage.getItem("roomzyProperties")
    ) || [];
} catch (error) {
    savedProperties = [];
}

let allProperties = [...savedProperties, ...properties];

let currentOwner = null;

// Display properties
function displayProperties(list) {

    const container = document.getElementById("propertyList");

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<h3>No PGs found!</h3>";
        return;
    }

    list.forEach(property => {

        container.innerHTML += `
            <div class="property-card">

                <img src="${property.image}" alt="PG Room">

                <div class="property-info">

                    <h3>${escapeText(property.name)}</h3>

                    <p>📍 ${escapeText(property.location)}, Jaipur</p>

                    <p>👤 ${escapeText(property.gender)}</p>

                    <p>🛏 ${escapeText(property.occupancy)} Sharing</p>

                    <p>✨ ${escapeText(property.amenities)}</p>

                    <div class="price">
                        ₹${Number(property.price).toLocaleString("en-IN")}
                        / Month
                    </div>

                    <button class="details-btn"
                        onclick="viewDetails(${Number(property.id)})">
                        View Details
                    </button>

                </div>
            </div>
        `;
    });
}

// Escape user-provided text before displaying it
function escapeText(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Search and filter properties
function searchPG() {

    const location = document
        .getElementById("location")
        .value.toLowerCase()
        .trim();

    const budget = document.getElementById("budget").value;

    const gender = document.getElementById("gender").value;

    const occupancy = document.getElementById("occupancy").value;

    const filtered = allProperties.filter(property => {

        const locationMatch =
            !location ||
            property.location.toLowerCase().includes(location) ||
            property.name.toLowerCase().includes(location);

        const budgetMatch =
            !budget || property.price <= Number(budget);

        const genderMatch =
            !gender || property.gender === gender;

        const occupancyMatch =
            !occupancy || property.occupancy === occupancy;

        return locationMatch &&
               budgetMatch &&
               genderMatch &&
               occupancyMatch;
    });

    displayProperties(filtered);

    document.getElementById("properties")
        .scrollIntoView({ behavior: "smooth" });
}

// View property details
function viewDetails(id) {

    const property = allProperties.find(p => p.id === id);

    if (!property) return;

    const modal = document.getElementById("modal");
    const body = document.getElementById("modalBody");

    body.innerHTML = `
        <h2>${escapeText(property.name)}</h2>

        <p>📍 ${escapeText(property.location)}, Jaipur</p>

        <p>Gender: ${escapeText(property.gender)}</p>

        <p>Room: ${escapeText(property.occupancy)} Sharing</p>

        <p>Amenities: ${escapeText(property.amenities)}</p>

        <h3 style="color:#f1784b;margin:15px 0">
            ₹${Number(property.price).toLocaleString("en-IN")} / Month
        </h3>

        <button onclick="showEnquiry(${property.id})">
            Contact Owner
        </button>
    `;

    modal.style.display = "flex";
}

// Demo enquiry
function showEnquiry(id) {

    const property = allProperties.find(p => p.id === id);

    if (!property) return;

    document.getElementById("modalBody").innerHTML = `
        <h2>Send Enquiry</h2>

        <p>Property: ${escapeText(property.name)}</p>

        <form id="enquiryForm">

            <input type="text"
                placeholder="Your Name" required>

            <input type="email"
                placeholder="Your Email" required>

            <input type="tel"
                placeholder="Phone Number" required>

            <button type="submit">Submit Enquiry</button>

        </form>

        <p style="font-size:11px;color:#777">
            Demo only. No information is sent to an owner.
        </p>
    `;

    document.getElementById("enquiryForm")
        .addEventListener("submit", function(event) {

            event.preventDefault();

            alert("Demo enquiry submitted successfully!");

            closeModal();
        });
}

// Student Login
function showLogin() {

    document.getElementById("modalBody").innerHTML = `

        <h2>Student Login</h2>

        <form id="loginForm">

            <input type="email"
                placeholder="Email Address" required>

            <input type="password"
                placeholder="Password" required>

            <button type="submit">Login</button>

        </form>

        <p style="font-size:11px;color:#777">
            Frontend demo login. No real account authentication.
        </p>

    `;

    document.getElementById("modal").style.display = "flex";

    document.getElementById("loginForm")
        .addEventListener("submit", function(event) {

            event.preventDefault();

            alert("Demo student login successful!");

            closeModal();
        });
}

// Owner Registration
function showOwner() {

    document.getElementById("modalBody").innerHTML = `

        <h2>Owner Registration</h2>

        <form id="ownerForm">

            <input type="text"
                id="ownerName"
                placeholder="Owner Name" required>

            <input type="email"
                id="ownerEmail"
                placeholder="Email Address" required>

            <input type="password"
                placeholder="Password" required>

            <button type="submit">Register</button>

        </form>

        <p style="font-size:11px;color:#777">
            Demo registration only.
        </p>

    `;

    document.getElementById("modal").style.display = "flex";

    document.getElementById("ownerForm")
        .addEventListener("submit", function(event) {

            event.preventDefault();

            currentOwner = {
                name: document.getElementById("ownerName").value,
                email: document.getElementById("ownerEmail").value
            };

            alert("Demo owner registration successful!");

            showOwnerDashboard();
        });
}

// Owner Dashboard
function showOwnerDashboard() {

    document.getElementById("modalBody").innerHTML = `

        <h2>Owner Dashboard</h2>

        <p>Welcome, ${escapeText(currentOwner.name)}</p>

        <button onclick="addProperty()">
            + Add New PG
        </button>

        <button onclick="showMyProperties()">
            Manage Properties
        </button>

    `;

}

// Add New Property
function addProperty() {

    document.getElementById("modalBody").innerHTML = `

        <h2>Add Your PG</h2>

        <form id="propertyForm">

            <input type="text"
                id="pgName"
                placeholder="Property Name" required>

            <input type="text"
                id="pgLocation"
                placeholder="Area in Jaipur" required>

            <input type="number"
                id="pgPrice"
                placeholder="Monthly Rent" min="1000" required>

            <select id="pgGender">
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
                <option value="Co-ed">Co-ed</option>
            </select>

            <select id="pgOccupancy">
                <option value="Single">Single Sharing</option>
                <option value="Double">Double Sharing</option>
                <option value="Triple">Triple Sharing</option>
            </select>

            <input type="text"
                id="pgAmenities"
                placeholder="Amenities (Wi-Fi, AC, Meals)">

            <button type="submit">Add Property</button>

        </form>

    `;

    document.getElementById("propertyForm")
        .addEventListener("submit", function(event) {

            event.preventDefault();

            const newProperty = {

                id: Date.now(),

                name: document.getElementById("pgName").value,

                location: document.getElementById("pgLocation").value,

                price: Number(document.getElementById("pgPrice").value),

                gender: document.getElementById("pgGender").value,

                occupancy: document.getElementById("pgOccupancy").value,

                amenities: document.getElementById("pgAmenities").value,

                image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700",

                owner: currentOwner.email

            };

            savedProperties.push(newProperty);

            localStorage.setItem(
                "roomzyProperties",
                JSON.stringify(savedProperties)
            );

            allProperties = [...savedProperties, ...properties];

            displayProperties(allProperties);

            alert("Property added successfully!");

            showOwnerDashboard();

        });

}

// Manage owner's properties
function showMyProperties() {

    const owned = savedProperties.filter(
        p => p.owner === currentOwner.email
    );

    let html = "<h2>My Properties</h2>";

    if (owned.length === 0) {
        html += "<p>No properties added yet.</p>";
    }

    owned.forEach(property => {

        html += `
            <div style="border:1px solid #ddd;padding:12px;margin:10px 0">

                <h3>${escapeText(property.name)}</h3>

                <p>${escapeText(property.location)}</p>

                <p>₹${property.price} / Month</p>

                <button onclick="deleteProperty(${property.id})">
                    Delete
                </button>

            </div>
        `;
    });

    document.getElementById("modalBody").innerHTML = html;

}

// Delete property
function deleteProperty(id) {

    savedProperties = savedProperties.filter(
        property => property.id !== id
    );

    localStorage.setItem(
        "roomzyProperties",
        JSON.stringify(savedProperties)
    );

    allProperties = [...savedProperties, ...properties];

    displayProperties(allProperties);

    showMyProperties();

}

// Close modal
function closeModal() {

    document.getElementById("modal").style.display = "none";

}

// Initial website loading
displayProperties(allProperties);
