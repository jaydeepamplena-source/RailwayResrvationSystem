// ==========================================
// RAILWAY RESERVATION SYSTEM
// ==========================================


// ================================
// SAMPLE TRAIN DATA
// ================================

const trains = [

    {
        name: "Manila Express",
        number: "RX-101",
        departure: "06:30 AM",
        arrival: "08:15 AM",
        duration: "1h 45m",
        price: 450
    },

    {
        name: "Metro Rail Express",
        number: "RX-205",
        departure: "09:00 AM",
        arrival: "10:40 AM",
        duration: "1h 40m",
        price: 520
    },

    {
        name: "Southern Star",
        number: "RX-310",
        departure: "01:30 PM",
        arrival: "03:20 PM",
        duration: "1h 50m",
        price: 600
    },

    {
        name: "Night Express",
        number: "RX-450",
        departure: "07:00 PM",
        arrival: "08:50 PM",
        duration: "1h 50m",
        price: 480
    }

];


// ================================
// SEARCH TRAIN
// ================================

const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const from =
        document.getElementById("fromStation").value;

    const to =
        document.getElementById("toStation").value;

    const date =
        document.getElementById("travelDate").value;

    const passengers =
        document.getElementById("passengers").value;


    if (from === to) {

        alert("Departure and destination cannot be the same.");

        return;
    }


    if (!from || !to || !date) {

        alert("Please complete all fields.");

        return;
    }


    displayTrains(
        from,
        to,
        date,
        passengers
    );

});


// ================================
// DISPLAY TRAINS
// ================================

function displayTrains(
    from,
    to,
    date,
    passengers
) {

    const results =
        document.getElementById("trainResults");


    results.innerHTML = "";


    trains.forEach(function(train) {

        const card =
            document.createElement("div");

        card.className = "train-card";


        card.innerHTML = `

            <div>

                <div class="train-name">
                    ${train.name}
                </div>

                <div>
                    Train ${train.number}
                </div>

            </div>


            <div>

                <div class="time">
                    ${train.departure}
                </div>

                <div class="station">
                    ${from}
                </div>

            </div>


            <div class="duration">

                ${train.duration}

                <div class="line"></div>

                <span>
                    Direct
                </span>

            </div>


            <div>

                <div class="time">
                    ${train.arrival}
                </div>

                <div class="station">
                    ${to}
                </div>

            </div>


            <div>

                <div class="price">
                    ₱${train.price}
                </div>

                <small>
                    per passenger
                </small>

                <br><br>

                <button
                    class="book-btn"
                    onclick='selectTrain(${JSON.stringify(train)}, "${from}", "${to}", "${date}", "${passengers}")'>

                    Select

                </button>

            </div>

        `;


        results.appendChild(card);

    });


    document
        .getElementById("results")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================================
// SELECT TRAIN
// ================================

let selectedTrain = null;


function selectTrain(
    train,
    from,
    to,
    date,
    passengers
) {

    selectedTrain = {

        ...train,

        from,
        to,
        date,
        passengers

    };


    const summary =
        document.getElementById("summary");


    const total =
        train.price * Number(passengers);


    summary.innerHTML = `

        <div class="summary-item">

            <span>Train</span>

            <b>${train.name}</b>

        </div>


        <div class="summary-item">

            <span>Route</span>

            <b>${from} → ${to}</b>

        </div>


        <div class="summary-item">

            <span>Departure</span>

            <b>${train.departure}</b>

        </div>


        <div class="summary-item">

            <span>Date</span>

            <b>${date}</b>

        </div>


        <div class="summary-item">

            <span>Passengers</span>

            <b>${passengers}</b>

        </div>


        <div class="summary-item">

            <span>Fare</span>

            <b>₱${total}</b>

        </div>

    `;


    document
        .getElementById("bookings")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================================
// BOOKING
// ================================

const bookingForm =
    document.getElementById("bookingForm");


bookingForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        if (!selectedTrain) {

            alert(
                "Please select a train first."
            );

            return;
        }


        const name =
            document.getElementById("fullName").value;

        const email =
            document.getElementById("email").value;

        const phone =
            document.getElementById("phone").value;

        const seat =
            document.getElementById("seatSelect").value;

        const trainClass =
            document.getElementById("classSelect").value;


        if (!seat) {

            alert(
                "Please select your seat."
            );

            return;
        }


        // Generate PNR

        const pnr =
            "PNR" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        const total =
            selectedTrain.price *
            Number(selectedTrain.passengers);


        alert(

            "BOOKING CONFIRMED!\n\n" +

            "Passenger: " + name + "\n" +

            "Train: " +
            selectedTrain.name + "\n" +

            "Route: " +
            selectedTrain.from +
            " → " +
            selectedTrain.to + "\n" +

            "Seat: " + seat + "\n" +

            "Class: " +
            trainClass + "\n" +

            "PNR: " + pnr + "\n" +

            "Total: ₱" + total

        );


        // Reset

        bookingForm.reset();

    }
);


// ================================
// SWAP STATIONS
// ================================

function swapStations() {

    const from =
        document.getElementById("fromStation");

    const to =
        document.getElementById("toStation");


    const temp =
        from.value;


    from.value =
        to.value;

    to.value =
        temp;

}


// ================================
// SCROLL TO SEARCH
// ================================

function scrollToSearch() {

    document
        .getElementById("search")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================================
// LOGIN MODAL
// ================================

function showLogin() {

    document
        .getElementById("loginModal")
        .classList.add("active");

}


function closeLogin() {

    document
        .getElementById("loginModal")
        .classList.remove("active");

}


// Close modal when clicking outside

document
    .getElementById("loginModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeLogin();

            }

        }
    );