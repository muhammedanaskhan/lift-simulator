let noOfFloors = 0;
let noOfLifts = 0;

document.getElementById('submit').addEventListener('click', function () {
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
    console.log('Building floors');

    // Clear the building first before building
    document.querySelector('.building').innerHTML = '';

    const building = document.querySelector('.building');
    for (let i = noOfFloors; i >= 1; i--) {
        const floorContainer = document.createElement('div');
        floorContainer.classList.add('floorContainer');

        // Floor number
        const floorNumber = document.createElement('span');
        floorNumber.classList.add('floor-number');
        floorNumber.textContent = `Floor ${i}`;

        // Create buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        if (i === 1) {
            // Up button only on the ground floor
            const upButton = document.createElement('button');
            upButton.classList.add('up-button');
            upButton.textContent = 'Up';
            buttonsContainer.appendChild(upButton);
        } else if (i === noOfFloors) {
            // Down button only on the topmost floor
            const downButton = document.createElement('button');
            downButton.classList.add('down-button');
            downButton.textContent = 'Down';
            buttonsContainer.appendChild(downButton);
        } else {
            // Both up and down buttons on all other floors
            const upButton = document.createElement('button');
            upButton.classList.add('up-button');
            upButton.textContent = 'Up';
            buttonsContainer.appendChild(upButton);

            const downButton = document.createElement('button');
            downButton.classList.add('down-button');
            downButton.textContent = 'Down';
            buttonsContainer.appendChild(downButton);
        }

        // Lift tunnel
        const liftTunnel = document.createElement('div');
        liftTunnel.classList.add('lift-tunnel');

        // Append all elements to the floor container
        floorContainer.appendChild(floorNumber);
        floorContainer.appendChild(buttonsContainer);
        floorContainer.appendChild(liftTunnel);

        // Append the floor container to the building
        building.appendChild(floorContainer);
    }
}
