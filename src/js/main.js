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

    //clear the building first before building
    document.querySelector('.building').innerHTML = '';

    const building = document.querySelector('.building');
    for (let i = noOfFloors; i >= 1; i--) {
        const floorContainer = document.createElement('div');

        floorContainer.classList.add('floorContainer');

        //  floor num
        const floorNumber = document.createElement('span');
        floorNumber.classList.add('floor-number');
        floorNumber.textContent = `Floor ${i}`;

        //Up button
        const upButton = document.createElement('button');
        upButton.classList.add('up-button');
        upButton.textContent = 'Up';

        // Down btn
        const downButton = document.createElement('button');
        downButton.classList.add('down-button');
        downButton.textContent = 'Down';

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');
        buttonsContainer.appendChild(upButton);
        buttonsContainer.appendChild(downButton);

        const liftTunnel = document.createElement('div');
        liftTunnel.classList.add('lift-tunnel');

        floorContainer.appendChild(floorNumber);
        floorContainer.appendChild(buttonsContainer);
        floorContainer.appendChild(liftTunnel);

        building.appendChild(floorContainer);
    }
}