document.addEventListener("DOMContentLoaded", function () {
    // Selecting elements
    const svg = document.querySelector(".connections");
    const circle = document.querySelector(".circle");
    const leftDot = document.getElementById("left-dot");
    const rightDot = document.getElementById("right-dot");
    const audio = document.getElementById("anaphaseAudio"); // Popup audio
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const okayButton = document.getElementById('okayButton');
    const centralDots = document.querySelectorAll(".central-dot");
    const chromosomeMeaning = document.getElementById("chromosomeMeaning");

    // Audio elements for sound effects
    const grabSound = new Audio('audioA/Stretching.mp3');     // When dragging starts (Hold)
    const dropSound = new Audio('audioP/Pop_sound_effect.mp3');          // When dragging ends (Drop)
    const clickSound = new Audio('audioP/Click_sound_effect.mp3');        // On click

    // Preload audio files for better performance
    [grabSound, dropSound, clickSound].forEach(sound => {
        sound.preload = 'auto';
    });

    let chromosomeTimer; // To handle multiple drag events
    const connections = []; // Array to store connections
    const correctSequence = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7'];
    let currentSequence = [];

    // Flags to manage sound playback
    let isDraggingDot = false;    // Indicates if a drag is in progress

    // Function to get the center coordinates of a dot relative to the circle
    function getDotCenter(dot) {
        const rect = dot.getBoundingClientRect();
        const circleRect = circle.getBoundingClientRect();
        const x = rect.left - circleRect.left + rect.width / 2;
        const y = rect.top - circleRect.top + rect.height / 2;
        return { x, y };
    }

    // Function to create a curved path using a quadratic Bezier curve
    function createCurvedPath(x1, y1, x2, y2) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const isUpper = y2 < midY; // Determine if the central dot is in the upper half
        const offset = 80; // Increased this value to make the curve more pronounced
        const controlX = midX;
        const controlY = isUpper ? midY - offset : midY + offset;

        return `M ${x1},${y1} Q ${controlX},${controlY} ${x2},${y2}`;
    }

    // Initial setup for connections
    function setupConnections() {
        // Clear existing connections
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }
        connections.length = 0;

        // Get centers of large dots
        const leftCenter = getDotCenter(leftDot);
        const rightCenter = getDotCenter(rightDot);

        centralDots.forEach((dot) => {
            // Determine if the dot is in the left or right group based on class
            const isLeftGroup = dot.classList.contains('left-group');
            const centralPos = getDotCenter(dot);

            // Determine start and end points based on group
            const startX = isLeftGroup ? leftCenter.x : rightCenter.x;
            const startY = isLeftGroup ? leftCenter.y : rightCenter.y;
            const endX = centralPos.x;
            const endY = centralPos.y;

            // Create path element
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            const d = createCurvedPath(startX, startY, endX, endY);
            path.setAttribute("d", d);
            path.classList.add(isLeftGroup ? 'left-group-curve' : 'right-group-curve');
            path.setAttribute("filter", "url(#shadow)"); // Apply the shadow filter if desired

            // Append path to SVG
            svg.appendChild(path);
            connections.push({ path: path, dot: dot });
        });
    }

    // Function to update connections when a dot is moved using requestAnimationFrame
    function updateConnections(dot) {
        connections.forEach(conn => {
            if (conn.dot === dot) {
                const newPos = getDotCenter(dot);
                const isLeftGroup = dot.classList.contains('left-group');
                const startDot = isLeftGroup ? leftDot : rightDot;
                const startCenter = getDotCenter(startDot);
                const d = createCurvedPath(startCenter.x, startCenter.y, newPos.x, newPos.y);

                requestAnimationFrame(() => {
                    conn.path.setAttribute("d", d);
                });
            }
        });
    }

    // Function to display the meaning of Chromosome
    function showChromosomeMeaning() {
        chromosomeMeaning.classList.add('show'); // Add the 'show' class to trigger CSS transitions

        // Clear any existing timer to prevent premature hiding
        clearTimeout(chromosomeTimer);

        // Hide the meaning after 30 seconds
        chromosomeTimer = setTimeout(() => {
            chromosomeMeaning.classList.remove('show'); // Remove the 'show' class to hide
        }, 30000); // 30 seconds
    }

    // Function to check if all dots are in the correct position
    function checkSuccess() {
        const leftDots = document.querySelectorAll('.central-dot.left-group');
        const rightDots = document.querySelectorAll('.central-dot.right-group');

        // Check if all left dots are dragged to the left side
        const allLeftMoved = Array.from(leftDots).every(dot => {
            const dotPos = getDotCenter(dot);
            return dotPos.x < circle.offsetWidth / 2; // Check if dot is to the left of the center
        });

        // Check if all right dots are dragged to the right side
        const allRightMoved = Array.from(rightDots).every(dot => {
            const dotPos = getDotCenter(dot);
            return dotPos.x > circle.offsetWidth / 2; // Check if dot is to the right of the center
        });

        // If all left and right dots are moved successfully, show the popup
        if (allLeftMoved && allRightMoved) {
            showPopup();
        }
    }

    // Function to handle sequence checking
    function handleSequence() {
        if (currentSequence.length === correctSequence.length) {
            if (JSON.stringify(currentSequence) === JSON.stringify(correctSequence)) {
                showPopup(); // Show popup for correct sequence
            } else {
                showIncorrectPopup(); // Show popup for incorrect sequence
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
        prophaseImage.src = 'imageP/prophase.png'; // Path to your prophase image
        prophaseImage.alt = 'Prophase Image';

        // Add definition text
        const definitionText = document.createElement('p');
        definitionText.textContent = 'Prophase: is the first phase of mitosis, the process that separates the duplicated genetic material carried in the nucleus of a parent cell into two identical daughter cells. During prophase, the complex of DNA and proteins contained in the nucleus, known as chromatin, condenses.';

        // Add audio element for explanation
        const audioElement = document.createElement('audio');
        audioElement.src = 'audioP/Prophase.wav'; // Path to your audio file
        audioElement.autoplay = true; // Autoplay audio
        audioElement.controls = false; // Optional: Hide audio controls

        // Create close button (Next Level button)
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Next Level';
        closeButton.classList.add('close-button'); // Add a class for styling

        // Append elements to the popup
        popup.appendChild(closeIcon); // Add close icon at the top
        popup.appendChild(prophaseImage);
        popup.appendChild(definitionText);
        popup.appendChild(audioElement);
        popup.appendChild(closeButton); // Add Next Level button below definition

        // Add popup to the body
        document.body.appendChild(popup);

        // Close popup on Next Level button click and proceed to the next page
        closeButton.addEventListener('click', () => {
            window.location.href = 'metaphase.html'; // Change this to your desired page URL
        });

        // Close popup on X icon click
        closeIcon.addEventListener('click', () => {
            document.body.removeChild(popup); // Remove popup from DOM
        });
    }

    // Function to show incorrect popup
    function showIncorrectPopup() {
        // Create the incorrect popup element
        const incorrectPopup = document.createElement('div');
        incorrectPopup.classList.add('popup');

        // Create a close button wrapper
        const closeButtonWrapper = document.createElement('div');
        closeButtonWrapper.classList.add('close-button-wrapper'); // Add a class for styling

        // Add message text
        const messageText = document.createElement('p');
        messageText.textContent = 'Incorrect sequence! Please try again.';

        // Create close button (OK button)
        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.classList.add('close-button'); // Add a class for styling

        // Create close icon (X icon)
        const closeIcon = document.createElement('span');
        closeIcon.textContent = '✖'; // Using '✖' for close icon
        closeIcon.classList.add('close-icon'); // Add a class for styling

        // Append the close icon to the wrapper
        closeButtonWrapper.appendChild(closeIcon);

        // Append elements to the incorrect popup
        incorrectPopup.appendChild(closeButtonWrapper); // Add close button wrapper
        incorrectPopup.appendChild(messageText);
        incorrectPopup.appendChild(okButton); // Add OK button below message

        // Add incorrect popup to the body
        document.body.appendChild(incorrectPopup);

        // Play drop sound effect
        dropSound.currentTime = 0;
        dropSound.play();

        // Close popup when OK button is clicked
        okButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default action
            location.reload(); // Reload the page
        });

        // Close popup when X icon is clicked
        closeIcon.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default action
            location.reload(); // Reload the page
        });
    }

    // Optional: Allow removal of the image and its definition from the dropzone
    const dropzone = document.getElementById('dropzone'); // Ensure this element exists
    const definitionContainer = document.getElementById('definition-container'); // Ensure this element exists

    dropzone.addEventListener('click', function(e) {
        if (e.target.classList.contains('merged-image')) {
            const originalImgId = e.target.id.replace('merged-', '');
            const originalImg = document.getElementById(originalImgId);
            if (originalImg) {
                originalImg.style.display = 'block'; // Show the original image again
            }
            dropzone.removeChild(e.target); // Remove the cloned image
            definitionContainer.innerHTML = ''; // Remove the definition

            // Clear any existing timeout
            clearTimeout(definitionTimeout);

            // Remove from current sequence
            currentSequence = currentSequence.filter(id => id !== originalImgId);
        }
    });

    // Add drag and drop functionality
    const draggables = document.querySelectorAll('.draggable'); // Ensure draggable elements have this class
    let definitionTimeout = null; // To keep track of the timeout

    // Add dragstart and dragend listeners to the draggable images
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
        draggable.addEventListener('dragend', dragEnd);
    });

    // Handle dragstart
    function dragStart(e) {
        e.dataTransfer.setData('text', e.target.id);
        setTimeout(() => e.target.classList.add('hide'), 0);
    }

    // Handle dragend
    function dragEnd(e) {
        setTimeout(() => e.target.classList.remove('hide'), 0);
    }

    // Allow drop event on dropzone
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('drop', drop);

    // Prevent default behavior to allow dropping
    function dragOver(e) {
        e.preventDefault();
        dropzone.style.borderColor = '#666'; // Change border color on hover
    }

    // Handle drop event
    function drop(e) {
        e.preventDefault();
        dropzone.style.borderColor = '#ccc'; // Reset border color

        const imgId = e.dataTransfer.getData('text');
        const img = document.getElementById(imgId);

        // Check if the image is already in the dropzone
        if (document.getElementById(`merged-${imgId}`)) {
            alert('This image is already in the dropzone!');
            return;
        }

        // Clone the dropped image and add it to the dropzone
        const clone = img.cloneNode(true);
        clone.id = `merged-${imgId}`; // Assign a new ID to prevent duplicates
        clone.classList.add('merged-image');
        dropzone.appendChild(clone);

        // Hide the original image above the dropzone
        img.style.display = 'none'; // Hide the original image

        // Display the definition
        displayDefinition(img);

        // Add the ID to the current sequence
        currentSequence.push(imgId);

        // Check if the current sequence matches the correct sequence
        checkSequence();

        // Play drop sound effect
        dropSound.currentTime = 0;
        dropSound.play();
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
            }
        }
    }

    // Add event listeners to central dots for meaning on 'click' (optional)
    centralDots.forEach(dot => {
        dot.addEventListener('click', showChromosomeMeaning);
    });

    // Add click event listener for draggables to play click sound
    draggables.forEach(draggable => {
        draggable.addEventListener('click', function (e) {
            // Prevent click sound if it was a drag
            if (!isDraggingDot) {
                clickSound.currentTime = 0;
                clickSound.play();
            }
        });
    });

    // Initial setup
    setupConnections();
});
// scriptProphase.js

document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.querySelector('.image-container');

    // Function to shuffle images
    function shuffleImages() {
        const images = Array.from(imageContainer.children); // Get all images as an array

        // Shuffle the images randomly
        for (let i = images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            imageContainer.appendChild(images[j]); // Move the image to the end of the container
            images[j] = images[i]; // Swap the images
        }
    }

    // Call the shuffle function on page load
    //shuffleImages();
});
