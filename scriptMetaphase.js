// ===========================
// Drag and Drop Functionality
// ===========================

/**
 * Allows dropping by preventing the default behavior.
 * @param {DragEvent} event 
 */
function allowDrop(event) {
    event.preventDefault();
}

/**
 * Handles the drag start event by setting the dragged element's type and ID.
 * @param {DragEvent} event 
 */
function drag(event) {
    const target = event.target;

    if (target.classList.contains('dot')) {
        event.dataTransfer.setData("type", "dot");
    } else if (target.classList.contains('draggable-image')) {
        event.dataTransfer.setData("type", "image");
    }

    event.dataTransfer.setData("id", target.id);
    target.classList.add('dragging'); // Optional: Visual feedback for dragging
}

/**
 * Handles the drop event by positioning the dragged element appropriately.
 * @param {DragEvent} event 
 */
function drop(event) {
    event.preventDefault();

    const type = event.dataTransfer.getData("type");
    const id = event.dataTransfer.getData("id");
    const draggedElement = document.getElementById(id);
    const dropzone = document.getElementById('dropzone');

    // Remove the dragging class if added
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
    }

    if (type === "dot") {
        handleDotDrop(draggedElement, dropzone);
    } else if (type === "image") {
        handleImageDrop(draggedElement, dropzone);
    }

    // Remove highlight from dropzone
    dropzone.classList.remove('over');
}

/**
 * Plays a sound effect when an item is dropped.
 */


/**
 * Handles the drop logic for dots.
 * @param {HTMLElement} draggedDot 
 * @param {HTMLElement} dropzone 
 */
function handleDotDrop(draggedDot, dropzone) {
    const existingLeftDot = dropzone.querySelector('.left-dot');
    const existingRightDot = dropzone.querySelector('.right-dot');

    if (draggedDot.id === 'dot1' && !existingLeftDot) {
        placeDotInDropzone(draggedDot, 'left-dot', dropzone);
    } else if (draggedDot.id === 'dot2' && !existingRightDot) {
        placeDotInDropzone(draggedDot, 'right-dot', dropzone);
    }
}

function playDropSound() {
    const dropSound = document.getElementById("dropSound");
    if (dropSound) {
        dropSound.currentTime = 0; // Reset to start the sound from the beginning
        dropSound.play();
    }
}

/**
 * Handles the drop logic for images.
 * Plays a sound effect if the image is successfully dropped.
 * @param {HTMLElement} draggedImage 
 * @param {HTMLElement} dropzone 
 */
function handleImageDrop(draggedImage, dropzone) {
    const mergedImageToCentralDotMap = {
        'mergedImage1': 'central-dot1',
        'mergedImage2': 'central-dot2',
        'mergedImage3': 'central-dot3',
        'mergedImage4': 'central-dot4'
    };

    const targetCentralDotId = mergedImageToCentralDotMap[draggedImage.id];

    if (targetCentralDotId) {
        const targetCentralDot = document.getElementById(targetCentralDotId);

        if (targetCentralDot && !targetCentralDot.querySelector('img')) { // Ensure Central Dot is empty
            targetCentralDot.appendChild(draggedImage);

            // Adjust positioning to center the image within the central dot
            draggedImage.style.width = '80px';
            draggedImage.style.height = 'auto';
            draggedImage.style.cursor = 'default';
            draggedImage.style.position = 'absolute';
            draggedImage.style.left = '50%';
            draggedImage.style.top = '50%';
            draggedImage.style.transform = 'translate(-50%, -50%)';

            draggedImage.setAttribute('draggable', 'false'); // Disable further dragging
            draggedImage.removeEventListener('dragstart', drag);

            // Play the drop sound effect
            playDropSound();

            // Check if all images have been dropped to show the chromosome definition
            checkForAllImagesDropped();
        }
    }
}

// Function to check if all images are correctly dropped
function checkForAllImagesDropped() {
    const centralDots = ['central-dot1', 'central-dot2', 'central-dot3', 'central-dot4'];
    let allImagesDropped = true;

    centralDots.forEach(dotId => {
        const centralDot = document.getElementById(dotId);
        if (!centralDot.querySelector('img')) {
            allImagesDropped = false;
        }
    });

    if (allImagesDropped) {
        showChromosomeDefinition();
    }
}


// Function to display the chromosome definition above the drop zones
// Function to show the chromosome definition below the drop zones
function showChromosomeDefinition() {
    const definition = document.getElementById('chromosome-definition');
    if (!definition) {
        const definitionContainer = document.createElement('div');
        definitionContainer.id = 'chromosome-definition';
        definitionContainer.style.position = 'absolute';
        definitionContainer.style.bottom = '85px'; // Adjust to position below the drop zones
        definitionContainer.style.left = '50%';
        definitionContainer.style.transform = 'translateX(-50%)';
        definitionContainer.style.padding = '10px';
        definitionContainer.style.backgroundColor = '#f9f9f9';
        definitionContainer.style.border = '1px solid #ccc';
        definitionContainer.style.borderRadius = '5px';
        definitionContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        definitionContainer.style.fontSize = '20px';
        definitionContainer.style.textAlign = 'center';
        definitionContainer.style.zIndex = '1000';
        definitionContainer.innerHTML = `
            Chromosomes- are aligned at the cell's equatorial plane. Each chromosome consists of two sister chromatids joined at the centromere. The kinetochore, a protein structure, forms at the centromere and attaches to spindle fibers.
        `;

        document.body.appendChild(definitionContainer);

        // Add event listeners to the two big dots
        const dot1 = document.getElementById('dot1'); // Replace with the actual ID of the first big dot
        const dotot2 = document.getElementById('dot2'); // Replace with the actual ID of the second big dot

        if (dot1 && dot2) {
            dot1.addEventListener('click', removeChromosomeDefinition);
            dot2.addEventListener('click', removeChromosomeDefinition);
        }
    }
}

// Function to remove the chromosome definition when dots are clicked
function removeChromosomeDefinition() {
    const definition = document.getElementById('chromosome-definition');
    if (definition) {
        definition.remove();
    }
}

/**
 * Places the dragged dot into the dropzone with appropriate class and disables further dragging.
 * @param {HTMLElement} dot 
 * @param {string} positionClass 
 * @param {HTMLElement} dropzone 
 */
function placeDotInDropzone(dot, positionClass, dropzone) {
    dropzone.appendChild(dot);
    dot.classList.remove('dot'); // Remove original styling
    dot.classList.add(positionClass); // Add positioning class
    dot.setAttribute('draggable', 'false'); // Disable further dragging

    // Trigger the show animation
    setTimeout(() => {
        dot.classList.add('show');
    }, 10); // Slight delay to ensure CSS transition

    initializeConnection(dot); // Initialize connection functionality
}

// =============================
// Dropzone Visual Feedback
// =============================

const dropzoneElement = document.getElementById('dropzone');

dropzoneElement.addEventListener('dragenter', (event) => {
    event.preventDefault();
    dropzoneElement.classList.add('over');
});

dropzoneElement.addEventListener('dragleave', () => {
    dropzoneElement.classList.remove('over');
});

// ==============================
// Connection Functionality
// ==============================

/**
 * Initializes the connection functionality by adding event listeners.
 * @param {HTMLElement} droppedDot 
 */
function initializeConnection(droppedDot) {
    droppedDot.addEventListener('mousedown', startConnection);
    droppedDot.addEventListener('touchstart', startConnectionTouch);
}

// ==============================
// Connection State Variables
// ==============================

let isConnecting = false;
let currentPath = null;
let currentDotId = null; // To track which big dot is connecting
const connectedDotsMap = new Map(); // To track connected central dots per big dot

// Initialize the connectedDotsMap for each big dot
connectedDotsMap.set('dot1', new Set());
connectedDotsMap.set('dot2', new Set());

// ==============================
// Connection Event Handlers
// ==============================

/**
 * Starts the connection process on mouse/touch down.
 * @param {MouseEvent|TouchEvent} event 
 */
// Array to track connected central dots
let connectedDots = [];
let spindleTimeout; // To store the timeout ID for removing spindle fiber definition

function startConnection(event) {
    event.preventDefault();
    isConnecting = true;

    const dropzone = document.getElementById('dropzone');
    const svg = document.getElementById('connection-svg');

    // Determine event type (mouse or touch)
    const isTouchEvent = event.type === 'touchstart';
    const clientX = isTouchEvent ? event.touches[0].clientX : event.clientX;
    const clientY = isTouchEvent ? event.touches[0].clientY : event.clientY;

    // Get the position and size of the dropped dot relative to the viewport
    const rect = event.target.getBoundingClientRect();

    // Calculate the center of the big dot
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Convert center coordinates to dropzone's coordinate system
    const dropzoneRect = dropzone.getBoundingClientRect();
    const relativeStartX = centerX - dropzoneRect.left;
    const relativeStartY = centerY - dropzoneRect.top;

    // Store the ID of the big dot initiating the connection
    currentDotId = event.target.id;

    // Create a new SVG path for the curve starting at the center
    currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    currentPath.setAttribute('d', `M ${relativeStartX} ${relativeStartY} Q ${relativeStartX} ${relativeStartY} ${relativeStartX} ${relativeStartY}`);
    currentPath.setAttribute('stroke', '#34495e');
    currentPath.setAttribute('stroke-width', '2');
    currentPath.setAttribute('fill', 'none');
    svg.appendChild(currentPath);

    // Show spindle fiber definition when connection starts
    showSpindleFiberDefinition();

    // Add event listeners for movement and connection end
    document.addEventListener('mousemove', drawCurve);
    document.addEventListener('mouseup', endConnection);
    document.addEventListener('touchmove', drawCurveTouch, {passive: false});
    document.addEventListener('touchend', endConnectionTouch);

    // Store the starting point for later use
    window.connectionStart = {x: relativeStartX, y: relativeStartY};
}

// Function to check if all dots are connected
function checkAllDotsConnected() {
    const requiredDots = ['central-dot1', 'central-dot2', 'central-dot3', 'central-dot4'];
    let allConnected = true;

    requiredDots.forEach(dot => {
        if (!connectedDots.includes(dot)) {
            allConnected = false;
        }
    });

    return allConnected;
}

// Function to be called when a dot is connected
function onDotConnected(dotId) {
    if (!connectedDots.includes(dotId)) {
        connectedDots.push(dotId);
    }

    // If all dots are connected, remove the spindle fiber definition
    if (checkAllDotsConnected()) {
        removeSpindleFiberDefinition();
    }
}

// Function to show the spindle fiber definition
function showSpindleFiberDefinition() {
    const definition = document.getElementById('spindle-fiber-definition');
    if (!definition) {
        const definitionContainer = document.createElement('div');
        definitionContainer.id = 'spindle-fiber-definition';
        definitionContainer.style.position = 'absolute';
        definitionContainer.style.bottom = '100px'; // Adjust position below the drop zones
        definitionContainer.style.left = '50%';
        definitionContainer.style.transform = 'translateX(-50%)';
        definitionContainer.style.padding = '10px';
        definitionContainer.style.backgroundColor = '#f9f9f9';
        definitionContainer.style.border = '1px solid #ccc';
        definitionContainer.style.borderRadius = '5px';
        definitionContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        definitionContainer.style.fontSize = '18px';
        definitionContainer.style.textAlign = 'center';
        definitionContainer.style.zIndex = '1000';
        definitionContainer.innerHTML = `
            Spindle fibers- play a crucial role in chromosome alignment and segregation. Each spindle fiber attaches to the kinetochore of a chromosome, helping to align the chromosomes at the metaphase plate.
        `;

        document.body.appendChild(definitionContainer);
    }

    // Set a timeout to remove the spindle fiber definition after 30 seconds
    spindleTimeout = setTimeout(removeSpindleFiberDefinition, 30000);
}

// Function to remove the spindle fiber definition
function removeSpindleFiberDefinition() {
    const definition = document.getElementById('spindle-fiber-definition');
    if (definition) {
        definition.remove();
    }
    // Clear the timeout in case the definition is removed early
    clearTimeout(spindleTimeout);
}

// Function to draw the curve while the connection is being made
function drawCurve(event) {
    // Your existing curve drawing logic here

    // Example of detecting when the connection reaches a central dot
    const connectedDot = detectConnectedDot(event); // Implement this function to detect which dot is connected

    if (connectedDot) {
        onDotConnected(connectedDot);
    }
}

/**
 * Handles touchstart event to initiate connection.
 * @param {TouchEvent} event 
 */
function startConnectionTouch(event) {
    startConnection(event);
}

/**
 * Draws the connection curve based on mouse/touch movement.
 * Utilizes requestAnimationFrame for smoother updates.
 * @param {MouseEvent|TouchEvent} event 
 */
function drawCurve(event) {
    if (!isConnecting || !currentPath)
        return;

    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
        const dropzone = document.getElementById('dropzone');
        const rect = dropzone.getBoundingClientRect();

        // Determine event type (mouse or touch)
        const isTouchEvent = event.type === 'touchmove';
        const clientX = isTouchEvent ? event.touches[0].clientX : event.clientX;
        const clientY = isTouchEvent ? event.touches[0].clientY : event.clientY;

        if (clientX === undefined || clientY === undefined)
            return;

        const currentX = clientX - rect.left;
        const currentY = clientY - rect.top;

        // Retrieve the stored starting point
        const {x: startX, y: startY} = window.connectionStart;

        // Calculate control point for the curve based on cursor position
        const deltaY = currentY - startY;
        const controlOffset = Math.abs(deltaY) * 0.5 + 50; // Dynamic offset
        const isCursorAboveStart = currentY < startY;
        const controlY = isCursorAboveStart
                ? Math.min(startY, currentY) - controlOffset // Upwards bend
                : Math.max(startY, currentY) + controlOffset; // Downwards bend

        // Update the path's 'd' attribute with the new control point and end point
        currentPath.setAttribute('d', `M ${startX} ${startY} Q ${startX} ${controlY} ${currentX} ${currentY}`);

        // Highlight central dots when cursor is near them
        highlightCentralDots(currentX, currentY, rect);
    });
}

/**
 * Handles touchmove event to draw the connection curve.
 * @param {TouchEvent} event 
 */
function drawCurveTouch(event) {
    event.preventDefault(); // Prevent scrolling
    drawCurve(event);
}

/**
 * Ends the connection process on mouseup/touchend.
 * Finalizes the curve if released near a central dot and animates the drawing.
 * @param {MouseEvent|TouchEvent} event 
 */
function endConnection(event) {
    if (!isConnecting || !currentPath)
        return;
    isConnecting = false;

    // Remove event listeners for movement and connection end
    document.removeEventListener('mousemove', drawCurve);
    document.removeEventListener('mouseup', endConnection);
    document.removeEventListener('touchmove', drawCurveTouch, {passive: false});
    document.removeEventListener('touchend', endConnectionTouch);

    const dropzone = document.getElementById('dropzone');
    const svg = document.getElementById('connection-svg');
    const rect = dropzone.getBoundingClientRect();

    // Determine event type (mouse or touch)
    const isTouchEvent = event.type === 'touchend';
    const clientX = isTouchEvent ? event.changedTouches[0].clientX : event.clientX;
    const clientY = isTouchEvent ? event.changedTouches[0].clientY : event.clientY;

    if (clientX === undefined || clientY === undefined)
        return;

    const releaseX = clientX - rect.left;
    const releaseY = clientY - rect.top;

    // Check if release point is near any central dot
    const centralDots = dropzone.querySelectorAll('.central-dot');
    let connected = false;
    centralDots.forEach(centralDot => {
        if (connected)
            return; // Only connect to one central dot
        const dotRect = centralDot.getBoundingClientRect();
        const centralX = dotRect.left + dotRect.width / 2 - rect.left;
        const centralY = dotRect.top + dotRect.height / 2 - rect.top;

        const distance = Math.hypot(centralX - releaseX, centralY - releaseY);
        if (distance < (centralDot.offsetWidth / 2) + 10 && !connectedDotsMap.get(currentDotId).has(centralDot.id)) { // 10px tolerance and not already connected by this big dot
            // Determine if central dot is above or below the start point
            const isAbove = centralY < window.connectionStart.y;

            // Set control point based on connection direction
            const finalControlY = isAbove
                    ? Math.min(window.connectionStart.y, centralY) - 100 // Upwards bend
                    : Math.max(window.connectionStart.y, centralY) + 100; // Downwards bend

            // Finalize the curve to end at the center of the central dot
            currentPath.setAttribute('d', `M ${window.connectionStart.x} ${window.connectionStart.y} Q ${window.connectionStart.x} ${finalControlY} ${centralX} ${centralY}`);

            // Add 'connected' class to the path
            currentPath.classList.add('connected');

            // Animate the curve drawing
            animatePath(currentPath);

            // Mark the central dot as connected by this big dot
            connectedDotsMap.get(currentDotId).add(centralDot.id);

            // Visually mark the central dot as connected (only once)
            centralDot.classList.add('connected');

            connected = true;

            // Check if all central dots are connected from both big dots
            checkAllConnections();
        }
    });

    // If not connected to any central dot, remove the curve
    if (!connected) {
        svg.removeChild(currentPath);
    }

    currentPath = null; // Reset the current path
}

/**
 * Handles touchend event to end the connection process.
 * @param {TouchEvent} event 
 */
function endConnectionTouch(event) {
    endConnection(event.changedTouches[0]);
}

// =============================
// Visual Feedback for Central Dots
// =============================

/**
 * Highlights central dots when the cursor/touch is near them.
 * @param {number} currentX 
 * @param {number} currentY 
 * @param {DOMRect} rect 
 */
function highlightCentralDots(currentX, currentY, rect) {
    const centralDots = document.querySelectorAll('.central-dot');
    const dotId = currentDotId;
    const connectedDotsForDot = connectedDotsMap.get(dotId) || new Set();

    centralDots.forEach(centralDot => {
        const dotRect = centralDot.getBoundingClientRect();
        const centralX = dotRect.left + dotRect.width / 2 - rect.left;
        const centralY = dotRect.top + dotRect.height / 2 - rect.top;

        const distance = Math.hypot(centralX - currentX, centralY - currentY);
        if (distance < (centralDot.offsetWidth / 2) + 20) { // 20px tolerance for highlighting
            if (!connectedDotsForDot.has(centralDot.id)) {
                centralDot.classList.add('active-highlight'); // Ensure you have corresponding CSS
            }
        } else {
            centralDot.classList.remove('active-highlight'); // Ensure you have corresponding CSS
        }
    });
}

// =============================
// Animation Helper Function
// =============================

/**
 * Animates the SVG path by setting stroke-dasharray and stroke-dashoffset.
 * @param {SVGPathElement} path 
 */
function animatePath(path) {
    const pathLength = path.getTotalLength();

    // Clear any previous transition
    path.style.transition = path.style.WebkitTransition = 'none';

    // Set up the starting positions
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    // Trigger a layout so styles are calculated & the browser picks up the starting position before animating
    path.getBoundingClientRect();

    // Define the transition
    path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 1s ease-in-out';

    // Go!
    path.style.strokeDashoffset = '0';
}

// =============================
// Reset Functionality
// =============================

/**
 * Resets all connections and returns big dots to their original positions.
 */
function resetConnections() {
    const dropzone = document.getElementById('dropzone');
    const svg = document.getElementById('connection-svg');
    const bigDots = dropzone.querySelectorAll('.left-dot, .right-dot');
    const centralDots = dropzone.querySelectorAll('.central-dot');

    // Move big dots back to the container
    bigDots.forEach(dot => {
        dot.classList.remove('left-dot', 'right-dot', 'show');
        dot.classList.add('dot');
        dot.setAttribute('draggable', 'true');
        document.querySelector('.big-dots').appendChild(dot); // Append back to .big-dots
    });

    // Remove all connection paths
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    // Clear connected dots tracking
    connectedDotsMap.forEach((set, key) => set.clear());

    // Remove 'connected' and 'active-highlight' classes from central dots
    centralDots.forEach(centralDot => {
        centralDot.classList.remove('connected');
        centralDot.classList.remove('active-highlight');
    });

    // Reset merged images to their initial state
    const mergedImages = document.querySelectorAll('.draggable-image');
    mergedImages.forEach(mergedImage => {
        // Remove from central dots
        if (mergedImage.parentElement.classList.contains('central-dot')) {
            mergedImage.parentElement.removeChild(mergedImage);
        }

        // Reset styles
        mergedImage.style.position = '';
        mergedImage.style.left = '';
        mergedImage.style.top = '';
        mergedImage.style.transform = '';
        mergedImage.style.width = '';
        mergedImage.style.height = '';
        mergedImage.style.cursor = '';
        mergedImage.setAttribute('draggable', 'true');

        // Reattach dragstart event listener
        mergedImage.addEventListener('dragstart', drag);
    });

    // Optionally, reset selection and combine button states
    resetSelections();
}

/**
 * Resets image selections and hides the Combine button.
 */
function resetSelections() {
    const selectableImages = document.querySelectorAll('.selectable');
    const checkmarks = {
        image1: document.getElementById('check1'),
        image2: document.getElementById('check2'),
        image3: document.getElementById('check3'),
        image4: document.getElementById('check4'),
        image5: document.getElementById('check5'),
        image6: document.getElementById('check6'),
        image7: document.getElementById('check7'),
        image8: document.getElementById('check8')
    };
    const combineButton = document.getElementById('combineButton');
    const resetButton = document.getElementById('reset-button'); // Ensure you have a reset button with this ID

    let selectedImages = new Set();

    selectableImages.forEach(image => {
        const imageId = image.id;
        selectedImages.delete(imageId);
        image.classList.remove('selected');
        if (checkmarks[imageId]) {
            checkmarks[imageId].style.display = 'none';
        }
    });

    combineButton.style.display = 'none';
}

// =============================
// Event Listener for Reset Button
// =============================

document.addEventListener('DOMContentLoaded', () => {
    // =============================
    // Image Selection and Combining
    // =============================

    const selectableImages = document.querySelectorAll('.selectable');
    const checkmarks = {
        image1: document.getElementById('check1'),
        image2: document.getElementById('check2'),
        image3: document.getElementById('check3'),
        image4: document.getElementById('check4'),
        image5: document.getElementById('check5'),
        image6: document.getElementById('check6'),
        image7: document.getElementById('check7'),
        image8: document.getElementById('check8')
    };
    const combineButton = document.getElementById('combineButton');
    const resetButton = document.getElementById('reset-button'); // Ensure you have a reset button with this ID

    let selectedImages = new Set();

    selectableImages.forEach(image => {
        image.addEventListener('click', () => {
            const imageId = image.id;

            if (selectedImages.has(imageId)) {
                // Deselect the image
                selectedImages.delete(imageId);
                image.classList.remove('selected');
                if (checkmarks[imageId]) {
                    checkmarks[imageId].style.display = 'none';
                }
            } else {
                // Select the image
                selectedImages.add(imageId);
                image.classList.add('selected');
                if (checkmarks[imageId]) {
                    checkmarks[imageId].style.display = 'block';
                }
            }

            // Show or hide the Combine button based on selections
            // Only specific pairs allow combining
            // Example: image1 & image2 OR image3 & image4 OR image5 & image6 OR image7 & image8
            if (
                    (selectedImages.size === 2 && selectedImages.has('image1') && selectedImages.has('image2')) ||
                    (selectedImages.size === 2 && selectedImages.has('image3') && selectedImages.has('image4')) ||
                    (selectedImages.size === 2 && selectedImages.has('image5') && selectedImages.has('image6')) ||
                    (selectedImages.size === 2 && selectedImages.has('image7') && selectedImages.has('image8'))
                    ) {
                combineButton.style.display = 'block';
            } else {
                combineButton.style.display = 'none';
            }
        });

        // Enable keyboard selection for accessibility
        image.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                image.click();
            }
        });
    });

    combineButton.addEventListener('click', () => {
        // Determine which pair is selected
        let pair = [];

        if (selectedImages.has('image1') && selectedImages.has('image2')) {
            pair = ['image1', 'image2'];
        } else if (selectedImages.has('image3') && selectedImages.has('image4')) {
            pair = ['image3', 'image4'];
        } else if (selectedImages.has('image5') && selectedImages.has('image6')) {
            pair = ['image5', 'image6'];
        } else if (selectedImages.has('image7') && selectedImages.has('image8')) {
            pair = ['image7', 'image8'];
        } else {
            // Unsupported pair
            alert('Unsupported image pair selected.');
            return;
        }

        // Hide selected image containers
        pair.forEach(imageId => {
            const image = document.getElementById(imageId);
            if (image) {
                const imageContainer = image.parentElement;
                imageContainer.style.display = 'none';

                // Clear selection and hide checkmarks
                selectedImages.delete(imageId);
                image.classList.remove('selected');
                if (checkmarks[imageId]) {
                    checkmarks[imageId].style.display = 'none';
                }
            }
        });

        // Hide the Combine button
        combineButton.style.display = 'none';

        // Determine which merged image to create based on the pair
        let mergedImageId = '';
        let mergedImageSrc = '';

        if (pair.includes('image1') && pair.includes('image2')) {
            mergedImageId = 'mergedImage1';
            mergedImageSrc = 'images/cntrosomeR.png'; // Replace with your merged image path
        } else if (pair.includes('image3') && pair.includes('image4')) {
            mergedImageId = 'mergedImage2';
            mergedImageSrc = 'images/cntrosomeB.png'; // Replace with your merged image path
        } else if (pair.includes('image5') && pair.includes('image6')) {
            mergedImageId = 'mergedImage3';
            mergedImageSrc = 'images/cntrosomeR2.png'; // Replace with your merged image path
        } else if (pair.includes('image7') && pair.includes('image8')) {
            mergedImageId = 'mergedImage4';
            mergedImageSrc = 'images/cntrosomeB2.png'; // Replace with your merged image path
        }

        // Check if the merged image already exists to prevent duplicates
        if (document.getElementById(mergedImageId)) {
            alert('Merged image already exists.');
            return;
        }

        // Display the merged image
        const mergedImage = document.createElement('img');
        mergedImage.src = mergedImageSrc;
        mergedImage.alt = 'Merged Image';
        mergedImage.classList.add('draggable-image');
        mergedImage.id = mergedImageId;
        mergedImage.draggable = true;
        mergedImage.setAttribute('aria-label', 'Merged Image');
        mergedImage.setAttribute('tabindex', '0');
        mergedImage.setAttribute('role', 'img');

        // Make the merged image draggable
        mergedImage.addEventListener('dragstart', drag);

        // Append the merged image to the draggable-images container
        document.querySelector('.draggable-images').appendChild(mergedImage);

        // Optional: Enable keyboard interactions for the merged image
        mergedImage.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                // Implement any desired action for the merged image
                alert('Merged Image Activated');
            }
        });
    });

    // =============================
    // Event Listener for Reset Button
    // =============================
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            resetConnections();
        });
    }

    // =============================
    // Accessibility Enhancements
    // =============================

    // Enable keyboard interactions for dots and central dots
    document.querySelectorAll('.dot, .central-dot').forEach(element => {
        element.setAttribute('tabindex', '0'); // Make focusable
        element.setAttribute('role', 'button'); // Define role

        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                // Implement connection logic via keyboard if desired
                // For simplicity, this is left as a placeholder
                alert(`Activated ${element.id}`);
            }
        });
    });
});

/**
 * Checks if all four central dots are connected from both big dots.
 * If all are connected, triggers the metaphase pop-up.
 */
function checkAllConnections() {
    const centralDots = ['central-dot1', 'central-dot2', 'central-dot3', 'central-dot4'];
    let allConnected = true;

    centralDots.forEach(centralDotId => {
        // Check if both dot1 and dot2 have connected to this central dot
        if (!connectedDotsMap.get('dot1').has(centralDotId) || !connectedDotsMap.get('dot2').has(centralDotId)) {
            allConnected = false;
        }
    });

    if (allConnected) {
        showMetaphasePopup();
    }
}

// =============================
// Metaphase Pop-up Functionality
// =============================

/**
 * Displays a pop-up with metaphase information, an image, and a recorded audio explanation.
 */
// Function to show the metaphase popup
// Function to show the metaphase popup
// Function to show the metaphase popup
function createImageElement(src, alt, width = 'auto', height = 'auto') {
    const image = document.createElement('img');
    image.src = src;
    image.alt = alt;
    image.style.width = width;   // Set the width
    image.style.height = height; // Set the height
    image.style.borderRadius = '4px';
    image.style.maxWidth = '350px'; // Ensure it doesn't exceed the container
    image.style.height = 'auto';    // Maintain aspect ratio
    return image;
}
function createTextElement(textContent, fontSize = '16px', color = '#000', textAlign = 'left') {
    const textElement = document.createElement('p');
    textElement.textContent = textContent;
    textElement.style.marginTop = '15px';
    textElement.style.fontSize = fontSize;
    textElement.style.color = color;
    textElement.style.textAlign = textAlign; // Set the text alignment (e.g., justify)
    return textElement;
}



// Function to show the metaphase popup
function showMetaphasePopup() {
    // Check if the popup already exists to prevent duplicates
    if (document.getElementById('metaphase-popup')) return;

    // Create the modal background with ARIA role
    const modalBackground = createModalBackground('metaphase-popup');

    // Create the popup container
    const popupContainer = createPopupContainer();
    popupContainer.style.position = 'relative'; // To position the 'X' icon absolutely

    // Add the 'X' icon button
    const closeButton = createCloseIconButton(handleClosePopup(modalBackground));
    popupContainer.appendChild(closeButton);

    // Add image with specified size
    const image = createImageElement('images/metaphase.png', 'Metaphase Image', '300px', '200px');
    popupContainer.appendChild(image);

    // Add definition text with justified alignment
    const definition = createTextElement(
        'METAPHASE is the stage in mitosis where chromosomes align at the cells equatorial plane, known as the metaphase plate. During this phase, spindle fibers attach to the centromeres of the chromosomes, ensuring proper separation in the next phase. This alignment ensures that each daughter cell will receive an identical set of chromosomes.',
        '18px',
        '#333',
        'Justify' // Justify the text
    );
    popupContainer.appendChild(definition);

    // Add the recorded audio explanation
    const audio = createAudioElement('audio/metaphase.wav', true);
    popupContainer.appendChild(audio);

    // Attempt to autoplay the audio programmatically
    audio.play().catch(error => {
        console.warn('Autoplay was prevented:', error);
    });

    // Add a button to close the popup and navigate to the next level
    const okButton = createButtonElement('Next Level', () => {
        handleClosePopup(modalBackground); // Close the popup
        window.location.href = 'anaphase.html'; // Navigate to the next page or level
    });
    popupContainer.appendChild(okButton);

    // Append popup to modal background and add to the document
    modalBackground.appendChild(popupContainer);
    document.body.appendChild(modalBackground);

    // Focus management
    popupContainer.focus();

    // Trap focus within the modal
    trapFocus(modalBackground, okButton);
}


// Function to show a completion popup
function showCompletionPopup() {
    // Check if the popup already exists to prevent duplicates
    if (document.getElementById('completion-popup')) return;

    // Create the modal background with ARIA role
    const modalBackground = createModalBackground('completion-popup');

    // Create the popup container
    const popupContainer = createPopupContainer();
    popupContainer.style.position = 'relative'; // To position the 'X' icon absolutely

    // Add the 'X' icon button
    const closeButton = createCloseIconButton(handleClosePopup(modalBackground));
    popupContainer.appendChild(closeButton);

    // Add a success message
    const message = createTextElement('Congratulations! You have successfully connected the dots.');
    popupContainer.appendChild(message);

    // Add the recorded audio explanation
    const audio = document.getElementById('g1ExplanationSound'); // Reference your audio element
    audio.currentTime = 0; // Reset audio playback
    audio.play().catch(error => {
        console.warn('Autoplay was prevented:', error);
    });

    // Define the function to handle the "Next Level" button click
    const handleNextLevel = () => {
        handleClosePopup(modalBackground); // Close the popup
        window.location.href = 'nextLevel.html'; // Change this to your next level URL
    };

    // Add a button to proceed to the next level
    const okButton = createButtonElement('Next Level', handleNextLevel);
    popupContainer.appendChild(okButton);

    // Append popup to modal background and add to the document
    modalBackground.appendChild(popupContainer);
    document.body.appendChild(modalBackground);
}


// Function to create the modal background
function createModalBackground(id) {
    const modalBackground = document.createElement('div');
    modalBackground.id = id;
    modalBackground.setAttribute('role', 'dialog');
    modalBackground.setAttribute('aria-modal', 'true');
    modalBackground.style.position = 'fixed';
    modalBackground.style.top = '0';
    modalBackground.style.left = '0';
    modalBackground.style.width = '100%';
    modalBackground.style.height = '100%';
    modalBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modalBackground.style.display = 'flex';
    modalBackground.style.alignItems = 'center';
    modalBackground.style.justifyContent = 'center';
    modalBackground.style.zIndex = '1000';
    return modalBackground;
}

// Function to create the popup container
function createPopupContainer() {
    const popupContainer = document.createElement('div');
    popupContainer.style.backgroundColor = '#fff';
    popupContainer.style.padding = '20px';
    popupContainer.style.borderRadius = '8px';
    popupContainer.style.textAlign = 'center';
    popupContainer.style.maxWidth = '40%';
    popupContainer.style.maxHeight = '90%';
    popupContainer.style.overflow = 'auto';
    popupContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popupContainer.setAttribute('tabindex', '-1'); // Make it focusable
    return popupContainer;
}

// Function to create an image element with editable size
function createImageElement(src, alt, width = 'auto', height = 'auto') {
    const image = document.createElement('img');
    image.src = src;
    image.alt = alt;
    image.style.width = width;   // Set the width
    image.style.height = height; // Set the height
    image.style.borderRadius = '4px';
    image.style.maxWidth = '100%'; // Ensure it doesn't exceed the container
    image.style.height = 'auto';    // Maintain aspect ratio
    return image;
}

// Function to create a text element with customizable font size, color, and alignment
function createTextElement(textContent, fontSize = '16px', color = '#000', textAlign = 'left') {
    const textElement = document.createElement('p');
    textElement.textContent = textContent;
    textElement.style.marginTop = '15px';
    textElement.style.fontSize = fontSize;
    textElement.style.color = color;
    textElement.style.textAlign = textAlign; // Set the text alignment (e.g., justify)
    return textElement;
}

// Function to create an audio element
function createAudioElement(src, autoplay) {
    const audio = document.createElement('audio');
    audio.src = src; // Path to your recorded audio file
    audio.autoplay = autoplay; // Autoplay the audio
    audio.controls = false; // Hide playback controls
    audio.style.display = 'none'; // Hide the audio element
    return audio;
}

// Function to create a button element
function createButtonElement(textContent, clickHandler) {
    const button = document.createElement('button');
    button.textContent = textContent;
    button.style.marginTop = '20px';
    button.style.padding = '10px 20px';
    button.style.fontSize = '16px';
    button.style.cursor = 'pointer';
    button.style.backgroundColor = '#3498db';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.transition = 'background-color 0.3s';
    
    // Change background color on hover for better UX
    button.onmouseover = () => {
        button.style.backgroundColor = '#2980b9';
    };
    button.onmouseout = () => {
        button.style.backgroundColor = '#3498db';
    };
    
    button.addEventListener('click', clickHandler);
    return button;
}

// Function to create a close ('X') icon button
function createCloseIconButton(closeHandler) {
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;'; // HTML entity for 'X'
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.background = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#aaa';
    closeButton.style.transition = 'color 0.3s';

    // Change color on hover for better UX
    closeButton.onmouseover = () => {
        closeButton.style.color = '#000';
    };
    closeButton.onmouseout = () => {
        closeButton.style.color = '#aaa';
    };

    // Attach the click handler
    closeButton.addEventListener('click', closeHandler);

    return closeButton;
}

// Function to handle closing the popup and reloading the page
function handleClosePopup(modalBackground) {
    return () => {
        document.body.removeChild(modalBackground);
        window.location.reload(); // Reload the page
    };
}

// Function to trap focus within the modal
function trapFocus(modalBackground, okButton) {
    modalBackground.addEventListener('keydown', function (event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            okButton.focus();
        }
        if (event.key === 'Escape') {
            handleClosePopup(modalBackground)();
        }
    });
}

// Example function to check if the lines are connected (pseudo-code)
function checkConnections() {
    // Logic to check if the lines are correctly connected
    const allConnected = true; // Replace with actual connection checking logic

    if (allConnected) {
        showCompletionPopup(); // Show popup if connections are complete
    }
}
