// Enable drag and drop functionality
const draggables = document.querySelectorAll('.draggable');
const dropzone = document.getElementById('dropzone');
const duplicateDropzone = document.getElementById('duplicate-dropzone');
const definitionContainer = document.getElementById('definition-container');

// Create audio elements for sound effects
const holdSound = new Audio('audioT/Click_sound_effect.mp3'); // Path to your hold sound
const dropSound = new Audio('audioT/Pop_sound_effect.mp3'); // Path to your drop sound
const clickSound = new Audio('audioT/Click_sound_effect.mp3'); // Path to your click sound
const wrongSound = new Audio('audioT/wrong.mp3'); // Path to your wrong sound effect

let definitionTimeout = null; // To keep track of the timeout
const correctSequence = ['img6', 'img8', 'img5', 'img1', 'img2', 'img3', 'img4', 'img7'];
let currentSequence = [];

// Add dragstart and click listeners to the draggable images
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
    draggable.addEventListener('click', playClickSound); // Add click sound event
});

// Allow drop events on dropzones
dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('drop', drop);
duplicateDropzone.addEventListener('dragover', dragOver);
duplicateDropzone.addEventListener('drop', drop);

// Handle dragstart
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => e.target.classList.add('hide'), 0);
    holdSound.play(); // Play hold/click sound effect
}

// Function to play click sound when an image is clicked
function playClickSound() {
    clickSound.currentTime = 0; // Reset sound to play from the beginning
    clickSound.play(); // Play click sound effect
}

// Handle dragover event
function dragOver(e) {
    e.preventDefault(); // Prevent default to allow dropping
}

// Handle drop event
function drop(e) {
    e.preventDefault(); // Prevent default behavior

    const id = e.dataTransfer.getData('text/plain'); // Get the ID of the dragged element
    const draggedElement = document.getElementById(id);

    // Check if the image is already in the dropzone
    if (document.getElementById(`merged-${id}`)) {
        alert('This image is already in the dropzone!');
        return;
    }

    // Clone the dragged element
    const clone = draggedElement.cloneNode(true);
    clone.id = `merged-${id}`; // Assign a new ID to prevent duplicates
    clone.classList.add('merged-image');

    // Determine which dropzone to append the cloned element to
    if (id === 'img7') { // centrioleL (previously dropped to dropzone)
        duplicateDropzone.appendChild(clone); // Now append to the duplicate dropzone
    } else if (id === 'img6') { // centrioleR (previously dropped to duplicate dropzone)
        dropzone.appendChild(clone); // Now append to the main dropzone
    } else { // For all other images
        dropzone.appendChild(clone);
        duplicateDropzone.appendChild(clone.cloneNode(true)); // Append clone to both dropzones
    }

    // Hide the original image above the dropzone
    draggedElement.style.display = 'none'; // Hide the original image

    // Display the definition
    displayDefinition(draggedElement);

    // Add the ID to the current sequence
    currentSequence.push(id);

    // Play drop sound effect
    dropSound.play(); // Play drop sound effect

    // Check if the current sequence matches the correct sequence
    checkSequence();
}

// Function to display the definition of the dropped image
function displayDefinition(img) {
    // Clear any existing definition and cancel previous timeout
    clearTimeout(definitionTimeout);
    definitionContainer.innerHTML = '';

    // Retrieve the definition from the data attribute
    const definitionText = img.getAttribute('data-definition');

    // Create a paragraph element to hold the definition
    const definitionParagraph = document.createElement('p');
    definitionParagraph.textContent = definitionText;
    definitionParagraph.classList.add('definition-text');

    // Append the definition to the container
    definitionContainer.appendChild(definitionParagraph);

    // Set a timeout to remove the definition after 30 seconds
    definitionTimeout = setTimeout(() => {
        definitionContainer.innerHTML = ''; // Clear the definition after 30 seconds
    }, 30000); // 30000 milliseconds = 30 seconds
}

// Function to check the dropping sequence
function checkSequence() {
    if (currentSequence.length === correctSequence.length) {
        // Check if the sequences match
        if (JSON.stringify(currentSequence) === JSON.stringify(correctSequence)) {
            showPopup(); // Show popup for correct sequence
        } else {
            showIncorrectPopup(); // Show popup for incorrect sequence
            wrongSound.play(); // Play wrong sound effect
        }
    }
}

// Function to show popup with prophase image and audio
function showPopup() {
    // Create the popup element
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // Create close icon (X icon)
    const closeIcon = document.createElement('span');
    closeIcon.textContent = '✖'; // Using '✖' for close icon
    closeIcon.classList.add('close-icon'); // Add a class for styling

    // Add prophase image
    const prophaseImage = document.createElement('img');
    prophaseImage.src = 'imageT/telaphase.png'; // Path to your prophase image
    prophaseImage.alt = 'Prophase Image';

    // Add definition text
    const definitionText = document.createElement('p');
    definitionText.textContent = 'Telophase is the final phase of mitosis, the process that separates the duplicated genetic material carried in the nucleus of a parent cell into two identical daughter cells. Telophase begins once the replicated, paired chromosomes have been separated and pulled to opposite sides, or poles, of the cell.';

    // Add audio element for explanation
    const audio = document.createElement('audio');
    audio.src = 'audioT/telophase.wav'; // Path to your audio file
    audio.autoplay = true; // Autoplay audio
    audio.controls = false; // Optional: Hide audio controls

    // Create next page button
    const nextPageButton = document.createElement('button');
    nextPageButton.textContent = 'Continue';
    nextPageButton.classList.add('next-page-button'); // Change class for styling if needed

    // Append elements to the popup
    popup.appendChild(closeIcon); // Add close icon at the top
    popup.appendChild(prophaseImage);
    popup.appendChild(definitionText);
    popup.appendChild(audio);
    popup.appendChild(nextPageButton);
    document.body.appendChild(popup); // Append the popup to the body

    // Close popup when close icon is clicked
    closeIcon.addEventListener('click', closePopup);

    // Redirect to the next page when the next page button is clicked
    nextPageButton.addEventListener('click', function() {
        window.location.href = 'DoneGame2.html'; // Change 'nextPage.html' to your actual next page URL
    });
}

// Function to close the popup
function closePopup() {
    const popup = document.querySelector('.popup'); // Adjust the selector if needed
    if (popup) {
        popup.remove(); // Remove the popup from the DOM
    }
}


// Function to close the popup
function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove(); // Remove the popup from the DOM
    }
}

// Function to show incorrect popup
function showIncorrectPopup() {
    // Create the incorrect popup element
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // Create close icon (X icon)
    const closeIcon = document.createElement('span');
    closeIcon.textContent = '✖'; // Using '✖' for close icon
    closeIcon.classList.add('close-icon'); // Add a class for styling

    // Add incorrect definition text
    const definitionText = document.createElement('p');
    definitionText.textContent = 'Incorrect sequence. Please try again!';

    // Create close button (Try Again button)
    const tryAgainButton = document.createElement('button');
    tryAgainButton.textContent = 'Try Again';
    tryAgainButton.classList.add('close-button'); // Add a class for styling

    // Append elements to the incorrect popup
    popup.appendChild(closeIcon); // Add close icon at the top
    popup.appendChild(definitionText);
    popup.appendChild(tryAgainButton);
    document.body.appendChild(popup); // Append the popup to the body

    // Close popup when close icon is clicked
    closeIcon.addEventListener('click', closePopup);

    // Reload the page when the Try Again button is clicked
    tryAgainButton.addEventListener('click', function() {
        closePopup(); // Close the popup
        location.reload(); // Reload the page
    });
}

