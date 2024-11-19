// ===============================
// Image Description Mapping
// ===============================
document.addEventListener('DOMContentLoaded', function () {
    const dragItemsContainer = document.getElementById('dragItemsContainer');
    const images = Array.from(dragItemsContainer.getElementsByTagName('img'));

    // No shuffle, so we directly append the images
    dragItemsContainer.innerHTML = ''; // Clear the container
    images.forEach(function (image) {
        dragItemsContainer.appendChild(image); // Append images in their original order
    });
});

// Image descriptions mapping
const imageDescriptions = {
    "Cell": "Accomplish most of their growth. They get bigger in size and make proteins and organelles needed for normal functions of DNA synthesis.",
    "Centrosome": "Responsible for organizing microtubules for cell shape and intracellular transport.",
    "Chromatin": "The complex of DNA and proteins that form chromosomes within the nucleus of eukaryotic cells.",
    "Nucleolus": "The part of the nucleus that produces and assembles ribosome components.",
    "Nucleus": "A membrane-bound organelle that contains the cell's chromosomes and regulates gene expression."
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
    imageElement.style.width = '230px'; // Match the CSS width
    imageElement.style.height = '230px'; // Match the CSS height
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

// Function to play sound and combine items
function combine() {
    // Play the combine sound
    const combineSound = document.getElementById('combineSound');
    combineSound.currentTime = 0; // Reset the sound to the beginning
    combineSound.play(); // Play the sound effect

    const correctOrder = ['Cell', 'Centrosome', 'Nucleus', 'Chromatin', 'Nucleolus'];

    // Check if all slots are filled
    if (droppedImages.includes('')) {
        const fillSlotsSound = document.getElementById('fillSlotsSound');
        fillSlotsSound.currentTime = 0;
        fillSlotsSound.play();
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
        The G1 phase is the first stage of interphase, where the cell grows, synthesizes proteins and RNA, 
        and prepares for DNA replication while ensuring conditions are favorable for the process.`;

    modalContent.innerHTML = `
        <span id="close-modal" style="cursor: pointer; float: right;">&times;</span>
        <img src="G1-Phase.png" alt="S-Phase" style="width: 100%; height: auto;">
        <p>Congratulations! You've correctly ordered the phases!</p>
        <p>${g1PhaseDescription}</p>
        <a href="UnlockSPhase.html" style="text-decoration: none;" onclick="markLevelComplete('level1')">
            <button>Next Level</button>
        </a>
    `;
    modal.style.display = "block";

    document.getElementById("close-modal").onclick = function () {
        modal.style.display = "none";
        window.location.reload(); // Reload the page when the X icon is clicked
    };
}

// Record level completion in session storage
function markLevelComplete(level) {
    sessionStorage.setItem(level, "complete");
}
