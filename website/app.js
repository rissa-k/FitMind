

// GARMENT CATEGORIES
const allCategories = [

    "Top",
    "T-Shirt",
    "Sweater",
    "Hoodie",
    "Jacket",
    "Dress",
    "Skirt",
    "Pants",
    "Jeans",
    "Shorts",
    "Bra",
    "Leggings",
    "Athletic Wear",
    "Dress Shirt",
    "Suit Jacket",
    "Other"

];



// LOGIN
const loginLink =
document.getElementById(
    "loginLink"
);

const loginModal =
document.getElementById(
    "loginModal"
);

const loginBtn =
document.getElementById(
    "loginBtn"
);



// PROFILE AUTHORIZATION
function updateAuthUI() {

    console.log(
        "Current User:",
        localStorage.getItem(
            "fitMindUser"
        )
    );

    const user =
        localStorage.getItem(
            "fitMindUser"
        );

    if (user) {

        document
        .getElementById(
            "authArea"
        )
        .innerHTML = `

            <span>

                ${user}

            </span>

            |

            <a
                href="#"
                id="logoutLink"
            >
                Log Out
            </a>

        `;

        document
        .getElementById(
            "logoutLink"
        )
        .addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "fitMindUser"
                );

                updateAuthUI();

            }
        );

    }

    else {

        document
        .getElementById(
            "authArea"
        )
        .innerHTML = `

            <a
                href="#"
                id="loginLink"
            >
                Sign In
            </a>

        `;

        document
        .getElementById(
            "loginLink"
        )
        .addEventListener(
            "click",
            () => {

                loginModal
                .classList
                .remove(
                    "hidden"
                );

            }
        );

    }

}



// PROFILE ACCESS
function getCurrentProfile() {

    const rawShirtSize =
        document.getElementById(
            "shirtSize"
        ).value
        .toUpperCase()
        .trim();

    const sizeMap = {

        "XXS": "XXS",

        "EXTRA EXTRA SMALL": "XXS",

        "XS": "XS",

        "EXTRA SMALL": "XS",

        "S": "S",

        "SMALL": "S",

        "M": "M",

        "MED": "M",

        "MEDIUM": "M",

        "L": "L",

        "LARGE": "L",

        "XL": "XL",

        "EXTRA LARGE": "XL",

        "XXL": "XXL",

        "2XL": "XXL",

        "EXTRA EXTRA LARGE": "XXL"

    };

    const shirtSize =
        sizeMap[rawShirtSize] ||
        rawShirtSize;

    return {

        name:
            document.getElementById(
                "name"
            ).value,

        gender:
            document.getElementById(
                "gender"
            ).value,

        shirtSize: shirtSize,

        pantWaist:
            document.getElementById(
                "pantWaist"
            ).value,

        pantLength:
            document.getElementById(
                "pantLength"
            ).value,

        dressSize:
            document.getElementById(
                "dressSize"
            ).value,

        braSize:
            document.getElementById(
                "braSize"
            ).value,

        topFit:
            document.getElementById(
                "topFit"
            ).value,

        bottomFit:
            document.getElementById(
                "bottomFit"
            ).value,

        chest:
            document.getElementById(
                "chest"
            ).value,

        waist:
            document.getElementById(
                "waist"
            ).value,

        hips:
            document.getElementById(
                "hips"
            ).value,

        height:
            document.getElementById(
                "height"
            ).value,

        garments: garments

    };

}



// DYNAMIC WELCOME CARD
function updateWelcomeCard(profile) {

    const welcome =
        document.getElementById(
            "welcomeMessage"
        );

    const subtext =
        document.getElementById(
            "welcomeSubtext"
        );

    const summary =
        document.getElementById(
            "profileSummary"
        );

    const hasMeaningfulProfile =

        profile.name ||

        profile.topFit ||

        profile.bottomFit ||

        profile.shirtSize ||

        profile.pantSize ||

        profile.garments?.length;

    if (!hasMeaningfulProfile) {

        resetWelcomeCard();

        return;

    }

    welcome.textContent =
        `Hello, ${profile.name || "Friend"}!`;

    subtext.textContent =
    "Review and update your saved profile information below.";

    summary.innerHTML = `

        <p>
            Gender:
            ${profile.gender || "Not Set"}
        </p>

        <p>
            Top Fit:
            ${profile.topFit || "Not Set"}
        </p>

        <p>
            Bottom Fit:
            ${profile.bottomFit || "Not Set"}
        </p>

        <p>
            Shirt Size:
            ${profile.shirtSize || "Not Set"}
        </p>

        <p>
            Pant Size:
            ${
                profile.pantWaist
                    ? `${profile.pantWaist} x ${profile.pantLength || "?"}`
                    : "Not Set"
            }
        </p>

        <p>
            Saved Garments:
            ${profile.garments?.length || 0}
        </p>

    `;
}



// RESET WELCOME CARD
function resetWelcomeCard() {

    document.getElementById(
        "welcomeMessage"
    ).textContent =
        "Welcome to FitMind!";

    document.getElementById(
        "welcomeSubtext"
    ).textContent =
        "Create or load a profile to save measurements, preferences, and garments.";

    document.getElementById(
        "profileSummary"
    ).innerHTML =
        "No profile loaded.";

}



// UPDATE CATEGORY OPTIONS
function updateCategoryOptions() {

    const gender =
        document.getElementById(
            "gender"
        ).value;

    const categorySelect =
        document.getElementById(
            "categoryInput"
        );

    let categories =
        [...allCategories];

    if (gender === "Female") {

        categories =
            categories.filter(
                category =>

                category !==
                "Dress Shirt"

                &&

                category !==
                "Suit Jacket"
            );

    }

    if (gender === "Male") {

        categories =
            categories.filter(
                category =>

                category !== "Dress"

                &&

                category !== "Skirt"

                &&

                category !== "Bra"
            );

    }

    categorySelect.innerHTML = "";

    categories.forEach(
        category => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                category;

            option.textContent =
                category;

            categorySelect.appendChild(
                option
            );

        }
    );

}



// NORMALIZE GARMENT SIZES
function normalizeGarmentSize(size) {

    const cleaned =
        size
            .toUpperCase()
            .trim();

    const sizeMap = {

        "SMALL": "S",
        "S": "S",

        "MEDIUM": "M",
        "MED": "M",
        "M": "M",

        "LARGE": "L",
        "L": "L",

        "XLARGE": "XL",
        "XL": "XL"

    };

    if (sizeMap[cleaned]) {

        return sizeMap[cleaned];

    }

    return cleaned;

}



// LOGIN
loginLink.addEventListener(
    "click",
    () => {

        loginModal
        .classList
        .remove(
            "hidden"
        );

    }
);

loginBtn.addEventListener(
    "click",
    () => {

        const username =
            document
            .getElementById(
                "usernameInput"
            )
            .value;

        localStorage.setItem(
            "fitMindUser",
            username
        );

        updateAuthUI();

        loadProfileForCurrentUser();

        loginModal
        .classList
        .add(
            "hidden"
        );

    }
);



// CURRENT USER PROFILE LOAD
function loadProfileForCurrentUser() {

    const currentUser =
        localStorage.getItem(
            "fitMindUser"
        );

    if (!currentUser) {

        return;

    }

    const profile = JSON.parse(

        localStorage.getItem(
            `fitMindProfile_${currentUser}`
        )

    );

    if (!profile) {

        return;

    }

    document.getElementById(
        "name"
    ).value =
        profile.name || "";

    document.getElementById(
        "gender"
    ).value =
        profile.gender || "";

    document.getElementById(
        "shirtSize"
    ).value =
        profile.shirtSize || "";

    document.getElementById(
        "pantWaist"
    ).value =
        profile.pantWaist || "";

    document.getElementById(
        "pantLength"
    ).value =
        profile.pantLength || "";

    document.getElementById(
        "dressSize"
    ).value =
        profile.dressSize || "";

    document.getElementById(
        "braSize"
    ).value =
        profile.braSize || "";

    document.getElementById(
        "topFit"
    ).value =
        profile.topFit || "";

    document.getElementById(
        "bottomFit"
    ).value =
        profile.bottomFit || "";

    document.getElementById(
        "chest"
    ).value =
        profile.chest || "";

    document.getElementById(
        "waist"
    ).value =
        profile.waist || "";

    document.getElementById(
        "hips"
    ).value =
        profile.hips || "";

    document.getElementById(
        "height"
    ).value =
        profile.height || "";

    garments =
        profile.garments || [];

    renderGarments();

    updateWelcomeCard(
        profile
    );

}



// OWNED GARMENTS
let garments = [];

const addGarmentBtn =
document.getElementById(
    "addGarmentBtn"
);

addGarmentBtn.addEventListener(
    "click",
    () => {

        const garment = {

            brand:
                document.getElementById(
                    "brandInput"
                ).value,

            category:
                document.getElementById(
                    "categoryInput"
                ).value,

            size:
                normalizeGarmentSize(
                    document.getElementById(
                        "sizeInput"
                    ).value
                ),

            notes:
                document.getElementById(
                    "notesInput"
                ).value

        };

        if (
            garment.brand.trim() === "" ||
            garment.size.trim() === ""
        ) {

            alert(
                "Please enter a brand and size."
            );

            return;

        }

        garments.push(garment);

        renderGarments();

        document.getElementById(
            "brandInput"
        ).value = "";

        document.getElementById(
            "sizeInput"
        ).value = "";

        document.getElementById(
            "notesInput"
        ).value = "";

    }
);



// EXPORT PROFILE
const exportBtn =
document.getElementById("exportBtn");

exportBtn.addEventListener(
    "click",
    () => {

        const profile =
            getCurrentProfile();

        const blob =
            new Blob(
                [
                    JSON.stringify(
                        profile,
                        null,
                        2
                    )
                ],
                {
                    type:
                        "application/json"
                }
            );

        const url =
            URL.createObjectURL(
                blob
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;

        link.download =
            "fitmind-profile.json";

        link.click();

        URL.revokeObjectURL(
            url
        );

        document.getElementById(
            "status"
        ).textContent =
            "Profile downloaded.";

    }
);


// SAVE & LOAD PROFILE
const saveBtn =
document.getElementById("saveBtn");

const loadBtn =
document.getElementById("loadBtn");

saveBtn.addEventListener("click", () => {

    const profile = getCurrentProfile();

    const currentUser =
        localStorage.getItem(
            "fitMindUser"
        );

    localStorage.setItem(

        `fitMindProfile_${currentUser}`,

        JSON.stringify(profile)

    );

    document.getElementById("status")
        .textContent = "Profile saved.";

    updateWelcomeCard(profile);

});



// STORING GARMENTS
function renderGarments() {

    const garmentList =
        document.getElementById(
            "garmentList"
        );

    garmentList.innerHTML = "";

    garments.forEach((garment, index) => {

        const div =
            document.createElement("div");

        div.classList.add(
            "garment-item"
        );

        div.innerHTML = `
            <div class="garment-info">

                <strong>${garment.brand}</strong>
                |
                ${garment.category}
                |
                ${garment.size}

                <br>

                ${garment.notes}

            </div>

            <button
                class="delete-btn"
                data-index="${index}"
                aria-label="Delete Garment"
            >
                X
            </button>
        `;

        garmentList.appendChild(div);

    });

    attachDeleteEvents();

}

function attachDeleteEvents() {

    const deleteButtons =
        document.querySelectorAll(
            ".delete-btn"
        );

    deleteButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        button.dataset.index
                    );

                garments.splice(index, 1);

                renderGarments();

            }
        );

    });

}

document
.getElementById("gender")
.addEventListener(
    "change",
    updateCategoryOptions
);

const jumpToProfileBtn =
document.getElementById(
    "jumpToProfileBtn"
);

if (
    jumpToProfileBtn
) {

    jumpToProfileBtn
    .addEventListener(
        "click",
        () => {

            document
            .getElementById(
                "profileSection"
            )
            .scrollIntoView({

                behavior:
                    "smooth"

            });

        }
    );

}

updateCategoryOptions();

resetWelcomeCard();

updateAuthUI();

loadProfileForCurrentUser();