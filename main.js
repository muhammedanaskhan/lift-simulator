let noOfFloors = 0;
let noOfLifts = 0;
let liftPositions = [];
const heightOfAFloor = 80; // 80px

const state = {
    floors: 0,
    lifts: [],
    floorRequests: []
};

document.getElementById('submit').addEventListener('click', function () {
    console.log('Submit button clicked');
    const floors = document.getElementById('floors').value;
    const lifts = document.getElementById('lifts').value;

    if (floors <= 1) {
        alert('Please enter at least two floors');
        return;
    }

    if (lifts <= 0) {
        alert('Please enter at least one lift');
        return;
    }

    document.getElementById('displayFloors').textContent = `Floors: ${floors}`;
    document.getElementById('displayLifts').textContent = `Lifts: ${lifts}`;

    noOfFloors = floors;
    noOfLifts = lifts;

    document.querySelector('.initial-form-container').style.display = 'none';
    document.querySelector('.building-container').style.display = 'flex';

    buildFloors();

});


document.getElementById('goBack').addEventListener('click', function () {
    // Show the initial form and hide the submitted information
    document.querySelector('.initial-form-container').style.display = 'flex';
    document.querySelector('.building-container').style.display = 'none';
});

const buildFloors = () => {

    // Clear the building first before building
    document.querySelector('.building').innerHTML = '';

    initializeFloors();
    initializeLifts();
    handleBtnClicks();
}

const initializeFloors = () => {
    for (let i = noOfFloors - 1; i >= 0; i--) {
        console.log('Floor number: ', i);
        console.log('Floors: ', noOfFloors);
        const floorContainer = document.createElement('div');
        floorContainer.classList.add('floorContainer');
        floorContainer.id = `floor-${i}`;

        console.log('Floor container: ', floorContainer);

        // Floor number
        const floorNumber = document.createElement('span');
        floorNumber.classList.add('floor-number');
        floorNumber.textContent = `Floor ${i}`;

        // Create buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        if (i === 0) {
            // Up button only on the ground floor

            buttonsContainer.innerHTML = `
              <button id="down-button-${i}" class="floor-btn up-button">Up</button>
          `;

        } else if (i === noOfFloors - 1) {
            buttonsContainer.innerHTML = `
              <button id="down-button-${i}" class="floor-btn down-button">Down</button>
          `;
        } else {
            buttonsContainer.innerHTML = `
            <button id="up-button-${i}" class="floor-btn up-button">Up</button>
            <button id="down-button-${i}" class="floor-btn down-button">Down</button>
        `;
        }

        // Lift tunnel
        const liftTunnel = document.createElement('div');
        liftTunnel.classList.add('lift-tunnel');
        liftTunnel.id = `lift-tunnel-${i}`;

        console.log('Lift tunnel: ', liftTunnel);

        // Append all elements to the floor container
        floorContainer.appendChild(floorNumber);
        floorContainer.appendChild(buttonsContainer);
        floorContainer.appendChild(liftTunnel);

        // Append the floor container to the building
        const building = document.querySelector('.building');
        building.appendChild(floorContainer);
        console.log('Floor added: ', building);
    }
}

const initializeLifts = () => {

    state.floors = noOfFloors;
    for (let i = 1; i <= noOfLifts; i++) {
        state.lifts.push({
            id: i,
            currentFloor: 0,
            status: 'idle',
            direction: null,
            requests: []
        });
    }

    console.log('State: ', state);
    const groundFloorLiftTunnel = document.getElementById('lift-tunnel-0');

    for (let i = 1; i <= noOfLifts; i++) {
        const lift = document.createElement('div');

        const liftId = `lift-${i}`;
        lift.id = liftId;

        const listPositionInTunnel = i * 50; // 40px is the width of each lift
        lift.style.left = `${listPositionInTunnel}px`;

        lift.innerHTML = `
        <div class="gate left-gate" id="lift-${i}-left-gate"></div>
        <div class="gate right-gate" id="lift-${i}-right-gate"></div>
      `;

        liftPositions[i] = 0;   // first lift will be at ground floor

        lift.classList.add('lift');
        groundFloorLiftTunnel.appendChild(lift);
    }
}

const handleBtnClicks = () => {
    floorBtns = document.querySelectorAll('.floor-btn');

    floorBtns.forEach((button) => {
        button.addEventListener("click", () => {

            const btnId = button.id;
            const floorWhichRequested = parseInt(btnId.split('-')[2]);

            handleLiftRequest(floorWhichRequested);
        });
    });
}

const handleLiftRequest = (floorWhichRequested) => {
    state.floorRequests.push(floorWhichRequested);
    assignLiftToFloorAndMove(floorWhichRequested);
}

function assignLiftToFloorAndMove(floorWhichRequested) {
    let nearestLift = null;
    let shortestDistance = Infinity;

    for (let lift of state.lifts) {
        if (lift.status === 'idle') {
            let distance = Math.abs(lift.currentFloor - floorWhichRequested);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestLift = lift;
            }
        }
    }

    if (nearestLift) {
        nearestLift.requests.push(floorWhichRequested);
        nearestLift.status = 'moving';
        moveLift(nearestLift);
    }
}

// Move lift
function moveLift(lift) {
    if (lift.requests.length === 0) {
        lift.status = 'idle';
        lift.direction = null;
        return;
    }

    console.log('Lift: ', lift);

    let targetFloor = lift.requests[0];
    lift.direction = targetFloor > lift.currentFloor ? 'up' : 'down';

    // Simulate lift movement
    let floorsToMove = Math.abs(targetFloor - lift.currentFloor);
    let movementTime = floorsToMove * 2000; // 2s per floor
    const distanceToMove = floorsToMove * heightOfAFloor; // 50px per floor

    const assignedLift = document.getElementById(`lift-${lift.id}`); 
    console.log('Assigned lift: ', assignedLift);
    console.log('Distance to move: ', distanceToMove);
    console.log('Movement time: ', movementTime);
    assignedLift.style.transition = `transform ${movementTime}ms linear`;
    assignedLift.style.transform = `translateY(-${distanceToMove}px)`;
    console.log('Lift moved: ', assignedLift);
}
