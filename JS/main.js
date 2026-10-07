
/* =========================================================
   GUIDE AGUNG BALI
   Main JavaScript
   ========================================================= */


/* =========================================================
   1. DATA PENDAKIAN
   ========================================================= */

const hikingData = {

    agung: {

        name: "Gunung Agung",

        location: "Karangasem, Bali",

        elevation: "3.031 MDPL",

        duration: "7–10 Jam",

        difficulty: "Menantang",

        price: 750000,

        status: "open",

        weather: {
            temperature: 24,
            condition: "Cerah Berawan",
            wind: "12 km/h",
            humidity: "78%",
            visibility: "Baik"
        },

        description:
            "Pendakian menuju puncak Gunung Agung bersama guide lokal berpengalaman."

    },


    batur: {

        name: "Gunung Batur",

        location: "Kintamani, Bali",

        elevation: "1.717 MDPL",

        duration: "4–6 Jam",

        difficulty: "Moderat",

        price: 500000,

        status: "open",

        weather: {
            temperature: 22,
            condition: "Berawan",
            wind: "10 km/h",
            humidity: "82%",
            visibility: "Cukup Baik"
        },

        description:
            "Nikmati sunrise dari Gunung Batur dengan pendampingan guide lokal."

    }

};


/* =========================================================
   2. KONFIGURASI
   ========================================================= */

const CONFIG = {

    whatsappNumber: "6281234567890",

    currency: "IDR",

    maxParticipants: 20

};


/* =========================================================
   3. DOM ELEMENTS
   ========================================================= */

const destinationSelect =
    document.getElementById("destination");

const dateInput =
    document.getElementById("date");

const participantsSelect =
    document.getElementById("participants");

const packageSelect =
    document.getElementById("package");

const nameInput =
    document.getElementById("name");

const phoneInput =
    document.getElementById("phone");

const emailInput =
    document.getElementById("email");

const bookingForm =
    document.querySelector(".booking-form");

const mobileMenuButton =
    document.querySelector(".mobile-menu-toggle");

const navigation =
    document.querySelector(".main-navigation");


/* =========================================================
   4. MOBILE MENU
   ========================================================= */

if (mobileMenuButton && navigation) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            navigation.classList.toggle(
                "mobile-navigation-active"
            );

        }
    );

}


/* Close mobile menu after clicking link */

const navigationLinks =
    document.querySelectorAll(
        ".main-navigation a"
    );

navigationLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navigation.classList.remove(
                "mobile-navigation-active"
            );

        }
    );

});


/* =========================================================
   5. SET MINIMUM BOOKING DATE
   ========================================================= */

if (dateInput) {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    const todayString =
        `${year}-${month}-${day}`;

    dateInput.min =
        todayString;

}


/* =========================================================
   6. FORMAT CURRENCY
   ========================================================= */

function formatCurrency(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: CONFIG.currency,
            maximumFractionDigits: 0
        }
    ).format(number);

}


/* =========================================================
   7. GET PARTICIPANT COUNT
   ========================================================= */

function getParticipantCount() {

    if (!participantsSelect) {
        return 1;
    }

    const value =
        participantsSelect.value;

    if (!value) {
        return 1;
    }

    if (value === "3-5") {
        return 3;
    }

    if (value === "6-10") {
        return 6;
    }

    if (value === "10+") {
        return 10;
    }

    return parseInt(value);

}


/* =========================================================
   8. DESTINATION CHANGE
   ========================================================= */

if (destinationSelect) {

    destinationSelect.addEventListener(
        "change",
        function () {

            const selected =
                this.value;

            if (!selected) {
                return;
            }

            if (selected === "custom") {

                showNotification(
                    "Custom Trip dipilih. Silakan isi detail perjalanan dan tim kami akan menghubungi Anda.",
                    "info"
                );

                return;

            }

            const mountain =
                hikingData[selected];

            if (!mountain) {
                return;
            }

            updateMountainInformation(
                mountain
            );

            updateBookingEstimate();

        }
    );

}


/* =========================================================
   9. UPDATE MOUNTAIN INFORMATION
   ========================================================= */

function updateMountainInformation(
    mountain
) {

    const quickInfoCards =
        document.querySelectorAll(
            ".quick-info .info-card"
        );

    if (quickInfoCards.length >= 4) {

        /* Destination */

        const destinationStrong =
            quickInfoCards[2]
                .querySelector("strong");

        const destinationSmall =
            quickInfoCards[2]
                .querySelector("small");

        if (destinationStrong) {
            destinationStrong.textContent =
                mountain.name;
        }

        if (destinationSmall) {
            destinationSmall.textContent =
                mountain.elevation;
        }


        /* Difficulty */

        const difficultyStrong =
            quickInfoCards[3]
                .querySelector("strong");

        const difficultySmall =
            quickInfoCards[3]
                .querySelector("small");

        if (difficultyStrong) {
            difficultyStrong.textContent =
                mountain.difficulty;
        }

        if (difficultySmall) {
            difficultySmall.textContent =
                mountain.duration;
        }

    }


    /* Weather */

    const weatherCard =
        document.querySelector(
            ".weather-card"
        );

    if (weatherCard) {

        const weatherTitle =
            weatherCard.querySelector("h3");

        const temperature =
            weatherCard.querySelector(
                ".weather-main strong"
            );

        const condition =
            weatherCard.querySelector(
                ".weather-main span"
            );

        const details =
            weatherCard.querySelectorAll(
                ".weather-details strong"
            );


        if (weatherTitle) {
            weatherTitle.textContent =
                mountain.name;
        }

        if (temperature) {
            temperature.textContent =
                `${mountain.weather.temperature}°C`;
        }

        if (condition) {
            condition.textContent =
                mountain.weather.condition;
        }

        if (details.length >= 3) {

            details[0].textContent =
                mountain.weather.wind;

            details[1].textContent =
                mountain.weather.humidity;

            details[2].textContent =
                mountain.weather.visibility;

        }

    }


    /* Trail status */

    updateTrailStatus(
        mountain.status
    );

}


/* =========================================================
   10. UPDATE TRAIL STATUS
   ========================================================= */

function updateTrailStatus(
    status
) {

    const trailCard =
        document.querySelector(
            ".trail-card"
        );

    if (!trailCard) {
        return;
    }

    const badge =
        trailCard.querySelector(
            ".status-badge"
        );

    const statusTitle =
        trailCard.querySelector(
            ".trail-status strong"
        );

    const statusDescription =
        trailCard.querySelector(
            ".trail-status p"
        );

    const statusIcon =
        trailCard.querySelector(
            ".status-icon"
        );


    if (status === "open") {

        if (badge) {

            badge.textContent =
                "TERBUKA";

            badge.classList.add(
                "open"
            );

        }

        if (statusTitle) {

            statusTitle.textContent =
                "Jalur aman untuk pendakian";

        }

        if (statusDescription) {

            statusDescription.textContent =
                "Belum terdapat informasi penutupan jalur.";

        }

        if (statusIcon) {

            statusIcon.textContent =
                "✓";

        }

    }


    if (status === "closed") {

        if (badge) {

            badge.textContent =
                "DITUTUP";

            badge.classList.remove(
                "open"
            );

        }

        if (statusTitle) {

            statusTitle.textContent =
                "Jalur sedang ditutup";

        }

        if (statusDescription) {

            statusDescription.textContent =
                "Pendakian tidak diperbolehkan sampai ada informasi pembukaan.";

        }

        if (statusIcon) {

            statusIcon.textContent =
                "!";

        }

    }


    if (status === "warning") {

        if (badge) {

            badge.textContent =
                "WASPADA";

        }

        if (statusTitle) {

            statusTitle.textContent =
                "Pendakian dalam kondisi waspada";

        }

        if (statusDescription) {

            statusDescription.textContent =
                "Perhatikan informasi terbaru sebelum melakukan pendakian.";

        }

        if (statusIcon) {

            statusIcon.textContent =
                "!";

        }

    }

}


/* =========================================================
   11. BOOKING PRICE CALCULATION
   ========================================================= */

function calculateBookingPrice() {

    if (!destinationSelect) {
        return 0;
    }

    const destination =
        destinationSelect.value;

    const participants =
        getParticipantCount();

    if (
        !destination ||
        destination === "custom"
    ) {
        return 0;
    }

    const mountain =
        hikingData[destination];

    if (!mountain) {
        return 0;
    }

    let basePrice =
        mountain.price;


    /* Package multiplier */

    if (
        packageSelect &&
        packageSelect.value === "private"
    ) {

        basePrice =
            basePrice * 1.25;

    }


    if (
        packageSelect &&
        packageSelect.value === "group"
    ) {

        basePrice =
            basePrice * 0.9;

    }


    return Math.round(
        basePrice * participants
    );

}


/* =========================================================
   12. UPDATE BOOKING ESTIMATE
   ========================================================= */

function updateBookingEstimate() {

    const price =
        calculateBookingPrice();

    let estimate =
        document.querySelector(
            ".booking-estimate"
        );


    if (!bookingForm) {
        return;
    }


    if (!estimate) {

        estimate =
            document.createElement(
                "div"
            );

        estimate.className =
            "booking-estimate";

        estimate.style.marginTop =
            "20px";

        estimate.style.padding =
            "20px";

        estimate.style.borderRadius =
            "10px";

        estimate.style.background =
            "rgba(255,255,255,0.06)";

        estimate.style.border =
            "1px solid rgba(255,255,255,0.1)";

        bookingForm.appendChild(
            estimate
        );

    }


    if (price > 0) {

        estimate.innerHTML = `

            <span style="
                display:block;
                font-size:10px;
                color:rgba(255,255,255,.5);
                text-transform:uppercase;
                letter-spacing:.12em;
            ">
                ESTIMASI BIAYA
            </span>

            <strong style="
                display:block;
                margin-top:6px;
                font-size:24px;
            ">
                ${formatCurrency(price)}
            </strong>

            <small style="
                display:block;
                margin-top:5px;
                color:rgba(255,255,255,.45);
            ">
                *Harga merupakan estimasi awal.
            </small>

        `;

    } else {

        estimate.innerHTML = `
            <span style="
                color:rgba(255,255,255,.5);
                font-size:12px;
            ">
                Pilih destinasi untuk melihat estimasi biaya.
            </span>
        `;

    }

}


/* =========================================================
   13. LISTEN FOR PRICE CHANGES
   ========================================================= */

if (participantsSelect) {

    participantsSelect.addEventListener(
        "change",
        updateBookingEstimate
    );

}

if (packageSelect) {

    packageSelect.addEventListener(
        "change",
        updateBookingEstimate
    );

}


/* =========================================================
   14. FORM VALIDATION
   ========================================================= */

function validateBookingForm() {

    const errors = [];


    if (
        !destinationSelect ||
        !destinationSelect.value
    ) {

        errors.push(
            "Silakan pilih destinasi pendakian."
        );

    }


    if (
        !dateInput ||
        !dateInput.value
    ) {

        errors.push(
            "Silakan pilih tanggal pendakian."
        );

    }


    if (
        !participantsSelect ||
        !participantsSelect.value
    ) {

        errors.push(
            "Silakan pilih jumlah pendaki."
        );

    }


    if (
        !packageSelect ||
        !packageSelect.value
    ) {

        errors.push(
            "Silakan pilih paket."
        );

    }


    if (
        !nameInput ||
        nameInput.value.trim().length < 3
    ) {

        errors.push(
            "Nama lengkap harus diisi."
        );

    }


    if (
        !phoneInput ||
        phoneInput.value.trim().length < 10
    ) {

        errors.push(
            "Nomor WhatsApp tidak valid."
        );

    }


    if (
        emailInput &&
        emailInput.value &&
        !isValidEmail(emailInput.value)
    ) {

        errors.push(
            "Format email tidak valid."
        );

    }


    return errors;

}


/* =========================================================
   15. EMAIL VALIDATION
   ========================================================= */

function isValidEmail(
    email
) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(
        email
    );

}


/* =========================================================
   16. PHONE NUMBER CLEANING
   ========================================================= */

function cleanPhoneNumber(
    phone
) {

    return phone
        .replace(/\D/g, "")
        .replace(/^0/, "62");

}


/* =========================================================
   17. BOOKING FORM SUBMIT
   ========================================================= */

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const errors =
                validateBookingForm();


            if (errors.length > 0) {

                showNotification(
                    errors[0],
                    "error"
                );

                return;

            }


            const booking =
                createBookingObject();


            showBookingSummary(
                booking
            );

        }
    );

}


/* =========================================================
   18. CREATE BOOKING OBJECT
   ========================================================= */

function createBookingObject() {

    const destination =
        destinationSelect.value;

    const mountain =
        hikingData[destination];

    return {

        destination:
            mountain
                ? mountain.name
                : "Custom Trip",

        date:
            dateInput.value,

        participants:
            getParticipantCount(),

        package:
            packageSelect.value,

        name:
            nameInput.value.trim(),

        phone:
            cleanPhoneNumber(
                phoneInput.value
            ),

        email:
            emailInput
                ? emailInput.value.trim()
                : "",

        total:
            calculateBookingPrice()

    };

}


/* =========================================================
   19. FORMAT DATE
   ========================================================= */

function formatDate(
    date
) {

    const formatted =
        new Date(
            `${date}T00:00:00`
        );

    return formatted.toLocaleDateString(
        "id-ID",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/* =========================================================
   20. BOOKING SUMMARY
   ========================================================= */

function showBookingSummary(
    booking
) {

    let modal =
        document.querySelector(
            ".booking-modal"
        );


    if (!modal) {

        modal =
            document.createElement(
                "div"
            );

        modal.className =
            "booking-modal";


        modal.innerHTML = `

            <div class="booking-modal-overlay"></div>

            <div class="booking-modal-content">

                <button
                    class="booking-modal-close"
                    aria-label="Tutup"
                >
                    ×
                </button>

                <span class="eyebrow">
                    BOOKING SUMMARY
                </span>

                <h2>
                    Periksa pesananmu
                </h2>

                <div class="booking-summary">

                    <div>
                        <span>Destinasi</span>
                        <strong id="summary-destination"></strong>
                    </div>

                    <div>
                        <span>Tanggal</span>
                        <strong id="summary-date"></strong>
                    </div>

                    <div>
                        <span>Jumlah Pendaki</span>
                        <strong id="summary-participants"></strong>
                    </div>

                    <div>
                        <span>Paket</span>
                        <strong id="summary-package"></strong>
                    </div>

                    <div>
                        <span>Nama</span>
                        <strong id="summary-name"></strong>
                    </div>

                    <div>
                        <span>Total Estimasi</span>
                        <strong id="summary-total"></strong>
                    </div>

                </div>

                <div class="booking-safety-note">

                    <strong>
                        ⚠ Safety Reminder
                    </strong>

                    <p>
                        Booking akan tetap dikonfirmasi
                        setelah admin memeriksa ketersediaan
                        guide dan kondisi pendakian.
                    </p>

                </div>

                <div class="booking-modal-actions">

                    <button
                        class="btn btn-outline modal-cancel"
                    >
                        Kembali
                    </button>

                    <button
                        class="btn btn-primary modal-confirm"
                    >
                        Konfirmasi via WhatsApp
                    </button>

                </div>

            </div>

        `;

        document.body.appendChild(
            modal
        );


        addModalStyles();

    }


    /* Fill data */

    document.getElementById(
        "summary-destination"
    ).textContent =
        booking.destination;


    document.getElementById(
        "summary-date"
    ).textContent =
        formatDate(
            booking.date
        );


    document.getElementById(
        "summary-participants"
    ).textContent =
        `${booking.participants} Orang`;


    document.getElementById(
        "summary-package"
    ).textContent =
        formatPackageName(
            booking.package
        );


    document.getElementById(
        "summary-name"
    ).textContent =
        booking.name;


    document.getElementById(
        "summary-total"
    ).textContent =
        formatCurrency(
            booking.total
        );


    modal.classList.add(
        "active"
    );


    /* Close */

    const closeButton =
        modal.querySelector(
            ".booking-modal-close"
        );

    const cancelButton =
        modal.querySelector(
            ".modal-cancel"
        );

    const overlay =
        modal.querySelector(
            ".booking-modal-overlay"
        );


    closeButton.onclick =
        () => closeBookingModal(modal);

    cancelButton.onclick =
        () => closeBookingModal(modal);

    overlay.onclick =
        () => closeBookingModal(modal);


    /* Confirm */

    const confirmButton =
        modal.querySelector(
            ".modal-confirm"
        );

    confirmButton.onclick =
        () => {

            sendBookingToWhatsApp(
                booking
            );

        };

}


/* =========================================================
   21. FORMAT PACKAGE NAME
   ========================================================= */

function formatPackageName(
    packageValue
) {

    const packages = {

        private:
            "Private Guide",

        group:
            "Group Hiking",

        custom:
            "Custom Trip"

    };

    return packages[
        packageValue
    ] || packageValue;

}


/* =========================================================
   22. CLOSE MODAL
   ========================================================= */

function closeBookingModal(
    modal
) {

    modal.classList.remove(
        "active"
    );

}


/* =========================================================
   23. WHATSAPP BOOKING
   ========================================================= */

function sendBookingToWhatsApp(
    booking
) {

    const message = `

Halo Guide Agung Bali 👋

Saya ingin melakukan booking pendakian.

DETAIL PENDAKIAN
-------------------------
Destinasi: ${booking.destination}
Tanggal: ${formatDate(booking.date)}
Jumlah Pendaki: ${booking.participants} orang
Paket: ${formatPackageName(booking.package)}

DATA PEMESAN
-------------------------
Nama: ${booking.name}
WhatsApp: ${booking.phone}
Email: ${booking.email || "-"}

ESTIMASI BIAYA
-------------------------
${formatCurrency(booking.total)}

Mohon dibantu untuk pengecekan ketersediaan guide dan kondisi pendakian.

Terima kasih.
    `.trim();


    const encodedMessage =
        encodeURIComponent(
            message
        );


    const whatsappURL =
        `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =========================================================
   24. NOTIFICATION
   ========================================================= */

function showNotification(
    message,
    type = "info"
) {

    let notification =
        document.querySelector(
            ".site-notification"
        );


    if (!notification) {

        notification =
            document.createElement(
                "div"
            );

        notification.className =
            "site-notification";

        document.body.appendChild(
            notification
        );

    }


    notification.textContent =
        message;


    notification.className =
        `site-notification ${type} active`;


    setTimeout(
        () => {

            notification.classList.remove(
                "active"
            );

        },
        3500
    );

}


/* =========================================================
   25. NOTIFICATION STYLES
   ========================================================= */

function addNotificationStyles() {

    if (
        document.getElementById(
            "notification-styles"
        )
    ) {
        return;
    }


    const style =
        document.createElement(
            "style"
        );

    style.id =
        "notification-styles";


    style.textContent = `

        .site-notification {

            position: fixed;

            top: 25px;
            right: 25px;

            z-index: 9999;

            max-width: 360px;

            padding: 16px 20px;

            border-radius: 10px;

            background: #171b18;

            color: white;

            font-size: 13px;

            box-shadow:
                0 15px 40px
                rgba(0,0,0,.2);

            transform:
                translateY(-20px);

            opacity: 0;

            pointer-events: none;

            transition:
                all .3s ease;

        }


        .site-notification.active {

            transform:
                translateY(0);

            opacity: 1;

        }


        .site-notification.error {

            border-left:
                4px solid #c75c4a;

        }


        .site-notification.info {

            border-left:
                4px solid #8ca58e;

        }

    `;


    document.head.appendChild(
        style
    );

}


/* =========================================================
   26. MODAL STYLES
   ========================================================= */

function addModalStyles() {

    if (
        document.getElementById(
            "booking-modal-styles"
        )
    ) {
        return;
    }


    const style =
        document.createElement(
            "style"
        );

    style.id =
        "booking-modal-styles";


    style.textContent = `

        .booking-modal {

            position: fixed;

            inset: 0;

            z-index: 10000;

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 20px;

            visibility: hidden;

            opacity: 0;

            transition:
                all .3s ease;

        }


        .booking-modal.active {

            visibility: visible;

            opacity: 1;

        }


        .booking-modal-overlay {

            position: absolute;

            inset: 0;

            background:
                rgba(0,0,0,.72);

            backdrop-filter:
                blur(8px);

        }


        .booking-modal-content {

            position: relative;

            z-index: 2;

            width: min(
                600px,
                100%
            );

            max-height: 90vh;

            overflow-y: auto;

            padding: 40px;

            border-radius: 20px;

            background: #f4f1e9;

            color: #171b18;

            transform:
                translateY(20px)
                scale(.97);

            transition:
                all .3s ease;

        }


        .booking-modal.active
        .booking-modal-content {

            transform:
                translateY(0)
                scale(1);

        }


        .booking-modal-close {

            position: absolute;

            top: 20px;
            right: 20px;

            width: 40px;
            height: 40px;

            display: grid;

            place-items: center;

            border-radius: 50%;

            background: #171b18;

            color: white;

            font-size: 22px;

        }


        .booking-modal-content h2 {

            margin-top: 5px;

            font-family:
                "Manrope",
                sans-serif;

            font-size: 38px;

            line-height: 1;

            letter-spacing:
                -.04em;

        }


        .booking-summary {

            margin-top: 30px;

            display: grid;

            grid-template-columns:
                repeat(2, 1fr);

            gap: 0;

            border-top:
                1px solid #dfe1dc;

        }


        .booking-summary div {

            padding: 17px 0;

            border-bottom:
                1px solid #dfe1dc;

        }


        .booking-summary span {

            display: block;

            margin-bottom: 5px;

            font-size: 9px;

            font-weight: 700;

            letter-spacing:
                .12em;

            text-transform:
                uppercase;

            color: #6e736e;

        }


        .booking-summary strong {

            font-size: 14px;

        }


        .booking-safety-note {

            margin-top: 25px;

            padding: 18px;

            border-radius: 10px;

            background:
                rgba(49,77,59,.08);

        }


        .booking-safety-note strong {

            font-size: 12px;

        }


        .booking-safety-note p {

            margin-top: 5px;

            font-size: 11px;

            color: #6e736e;

        }


        .booking-modal-actions {

            display: flex;

            justify-content: flex-end;

            gap: 10px;

            margin-top: 25px;

        }


        .booking-modal-actions
        .btn-outline {

            border:
                1px solid #171b18;

            color: #171b18;

        }


        @media(max-width:600px) {

            .booking-modal-content {

                padding: 30px 22px;

            }


            .booking-summary {

                grid-template-columns: 1fr;

            }


            .booking-modal-actions {

                flex-direction:
                    column;

            }


            .booking-modal-actions
            .btn {

                width: 100%;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}


/* =========================================================
   27. MOBILE NAVIGATION STYLE
   ========================================================= */

function addMobileNavigationStyles() {

    if (
        document.getElementById(
            "mobile-navigation-styles"
        )
    ) {
        return;
    }


    const style =
        document.createElement(
            "style"
        );

    style.id =
        "mobile-navigation-styles";


    style.textContent = `

        @media(max-width:1000px) {

            .main-navigation
            .mobile-navigation-active {

                display: block;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}


/* =========================================================
   28. INITIALIZE
   ========================================================= */

function initializeWebsite() {

    addNotificationStyles();

    addModalStyles();

    addMobileNavigationStyles();

    updateBookingEstimate();

}


/* =========================================================
   29. RUN
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeWebsite
);

