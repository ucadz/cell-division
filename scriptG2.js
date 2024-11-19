// ===============================
// Image Description Mapping
// ===============================
document.addEventListener('DOMContentLoaded', function () {
    const dragItemsContainer = document.getElementById('dragItemsContainer');
    const images = Array.from(dragItemsContainer.getElementsByTagName('img'));

 

    // Clear the container
    dragItemsContainer.innerHTML = '';

    // Append the images back in shuffled order
    images.forEach(function (image) {
        dragItemsContainer.appendChild(image);
    });
});
// // ===============================
// Image Description Mapping
// ===============================
const imageDescriptions = {
    "Cell": "Accomplish most of their growth. They get bigger in size and make proteins and organelles needed for normal functions of DNA synthesis.",
    "Centrosome-G2": "which consists of two centrioles, has completed its duplication that began in the S phase.",
    "Chromatin-G2": "Begins to condense in preparation for cell division.",
    "Nucleolus": "Continues to synthesize ribosomal RNA (rRNA).",
    "Nucleus": "Has twice the amount of DNA as the G1 ﻿nucleus. The nuclear envelope breaks down during."
};

// ===============================
// Global Variables
// ===============================
let draggedImageId;
let droppedImages = ['', '', '', '', '']; // Array to store dropped images by their slot positions
let explanationAudio; // Declare audio variable at a higher scope

// ===============================
// Drag and Drop Functions
// ===============================

// Allow drop event
function allowDrop(event) {
    event.preventDefault();
}

// Drag the image
function drag(event) {
    draggedImageId = event.target.id;
}

// Drop the image into a specific slot (with swapping functionality)
function drop(event, slotIndex) {
    event.preventDefault();
    const draggedImage = document.getElementById(draggedImageId);
    const dropSlot = event.target;

    // If the slot is empty, drop the image
    if (!droppedImages[slotIndex]) {
        handleDrop(draggedImage, dropSlot, slotIndex);
    } else {
        // Swapping logic
        swapImages(dropSlot, slotIndex);
    }
}

// Handle the image drop
function handleDrop(draggedImage, dropSlot, slotIndex) {
    droppedImages[slotIndex] = draggedImageId;
    const clonedImage = draggedImage.cloneNode(true);
    cloneImageStyles(clonedImage);
    dropSlot.appendChild(clonedImage);
    displayDroppedImage(draggedImageId);
    displayImageDescription(draggedImageId);
    playDropSound(); // Play sound on drop
}

// Swap images between slots
function swapImages(dropSlot, slotIndex) {
    const currentSlotIndex = droppedImages.indexOf(draggedImageId);
    const tempImageId = droppedImages[slotIndex];

    if (currentSlotIndex !== -1 && currentSlotIndex !== slotIndex) {
        droppedImages[slotIndex] = draggedImageId;
        droppedImages[currentSlotIndex] = tempImageId;

        clearSlots(currentSlotIndex, dropSlot);
        const clonedDraggedImage = document.getElementById(draggedImageId).cloneNode(true);
        cloneImageStyles(clonedDraggedImage);

        dropSlot.appendChild(clonedDraggedImage);
        if (tempImageId) {
            const clonedTempImage = document.getElementById(tempImageId).cloneNode(true);
            cloneImageStyles(clonedTempImage);
            dropSlot.appendChild(clonedTempImage);
        }

        displayImageDescription(draggedImageId); // Update name and meaning when swapped
    }
}

// Clear the slots during swap
function clearSlots(currentSlotIndex, dropSlot) {
    const currentSlot = document.querySelectorAll('.drop-slot')[currentSlotIndex];
    currentSlot.innerHTML = ''; // Clear current slot
    dropSlot.innerHTML = ''; // Clear target slot
}

// Clone image styles for consistent appearance
function cloneImageStyles(clonedImage) {
    clonedImage.style.width = '100%'; // Ensure it fits the drop slot
    clonedImage.style.height = '100%'; // Ensure it fits the drop slot
    clonedImage.style.objectFit = 'cover'; // Maintain aspect ratio
}

// ===============================
// Audio Functions
// ===============================

// Play click sound
function playClickSound() {
    const clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0; // Reset sound to start
    clickSound.play(); // Play the sound
}

// Play drop sound
function playDropSound() {
    const dropSound = document.getElementById('dropSound');
    dropSound.currentTime = 0; // Reset sound to start
    dropSound.play(); // Play the sound
}

// Play the wrong order sound
function playWrongSound() {
    const wrongSound = document.getElementById('wrongSound');
    wrongSound.currentTime = 0; // Reset sound to start
    wrongSound.play(); // Play the sound
}

// ===============================
// Display Functions
// ===============================

// Display the dropped image below the combine button
function displayDroppedImage(imageId) {
    const droppedImagesDisplay = document.getElementById('droppedImagesDisplay');
    const imageElement = document.createElement('img');
    imageElement.src = `${imageId}.png`; // Assuming image filenames match their IDs
    imageElement.alt = imageId;
    imageElement.style.pointerEvents = 'none'; // Prevent interference with dragging
    imageElement.style.position = 'absolute';
    imageElement.style.width = '300px'; // Match the CSS width
    imageElement.style.height = '300px'; // Match the CSS height
    imageElement.style.objectFit = 'contain';
    droppedImagesDisplay.appendChild(imageElement); // Append the new image
}

// Display the image name and meaning
function displayImageDescription(imageId) {
    const imageDescriptionDiv = document.getElementById('imageDescription');
    const description = imageDescriptions[imageId] || "No description available.";
    imageDescriptionDiv.innerHTML = `
        <strong style="color: black; text-shadow: 1px 1px 0 white, -1px -1px 0 white, 
        -1px 1px 0 white, 1px -1px 0 white; font-size: 30px;">${imageId}:</strong>
        <span style="color: black; text-shadow: 1px 1px 0 white, -1px -1px 0 white, 
        -1px 1px 0 white, 1px -1px 0 white; font-size: 20px;">${description}</span>
    `;
}

// ===============================
// Combine Images Function
// ===============================

function combine() {
    const correctOrder = ['Cell', 'Nucleus', 'Chromatin-G2', 'Nucleolus', 'Centrosome-G2'];
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");

    if (droppedImages.includes('')) {
        showModal("Fill all the slots first!");
        return;
    }

    const isCorrect = JSON.stringify(droppedImages) === JSON.stringify(correctOrder);

    if (isCorrect) {
        playG1Explanation(); // Play the G1 phase explanation sound
        showModalWithDescription(); // Show modal with G1 phase description and image
    } else {
        playWrongSound(); // Play the wrong sound if the order is incorrect
        showModal("Oops, that's not quite right! Try again.");
    }
}

// Show modal with a message
function showModal(message) {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `
        <span id="close-modal" style="cursor: pointer; float: right;">&times;</span>
        <p>${message}</p>`;
    modal.style.display = "block";

    // Close modal functionality with page reload
    document.getElementById("close-modal").onclick = function () {
        modal.style.display = "none";
        window.location.reload(); // Reload the page when the X icon is clicked
    };
}

// Play the G1 phase explanation sound
function playG1Explanation() {
    const g1ExplanationSound = document.getElementById('g1ExplanationSound');
    g1ExplanationSound.currentTime = 0;
    g1ExplanationSound.play(); // Play sound
}

// Show modal with G1 phase description and image
function showModalWithDescription() {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    const g1PhaseDescription = `
        G2 phase. During the second gap phase, or G2 phase, the cell grows more, makes proteins and organelles, and begins to reorganize its contents in preparation for mitosis. G2 phase ends when mitosis begins.`;

    modalContent.innerHTML = `
        <span id="close-modal" style="cursor: pointer; float: right;">&times;</span>
        <img src="G2-Phase.png" alt="G2-Phase" style="width: 100%; height: auto;">
        <p>Congratulations! You've correctly ordered the phases!</p>
        <p>${g1PhaseDescription}</p>
        <a href="Interphase.html" style="text-decoration: none;" onclick="markLevelComplete('level1')">
            <button>Next Level</button>
        </a>
    `;
    modal.style.display = "block";

    // Close modal functionality
    document.getElementById("close-modal").onclick = function () {
        modal.style.display = "none";
        const g1ExplanationSound = document.getElementById('g1ExplanationSound');
        g1ExplanationSound.pause(); // Pause the audio
        g1ExplanationSound.currentTime = 0; // Reset the audio to the start
    };
}

// Function to mark the level as complete in localStorage
function markLevelComplete(level) {
    localStorage.setItem(level, 'complete'); // Store the progress in localStorage
}

// Function to check the completion status of levels
function checkLevelCompletion(level) {
    return localStorage.getItem(level) === 'complete'; // Retrieve the completion status
}
function reloadPage() {
    location.reload();
}

// ===============================
// Event Listeners
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    const task1Btn = document.getElementById('G1Btn'); // Start task button
    const task2Btn = document.getElementById('task2Btn'); // Task 2 button
    const task3Btn = document.getElementById('task3Btn'); // Task 3 button
    const finalBtn = document.getElementById('finalBtn'); // Final phase button

    // Initially disable Task 2, Task 3, and hide the final button
    task2Btn.disabled = true;
    task3Btn.disabled = true;
    finalBtn.style.display = 'none'; // Hide the final phase button

    let task1Completed = false;

    // Function to mark task as completed
    function completeTask(button, taskNumber) {
        button.innerHTML = `Task ${taskNumber} <i class="fas fa-check"></i>`;
        button.disabled = true;
    }

    // Task 1 button event listener
    task1Btn.addEventListener('click', () => {
        window.location.href = 'G1-Phase.html'; // Redirect to a new page

        if (!task1Completed) {
            completeTask(task1Btn, 1); // Mark Task 1 as completed
            task1Completed = true; // Task 1 is now complete

            // Task 2 and Task 3 remain disabled, no changes here
        }
    });

    // Task 2 and Task 3 are not unlocked in this flow
});
