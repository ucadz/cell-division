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
    const grabSound = new Audio('audioA/Stretching1.mp3');     // When dragging starts

    // Preload grabSound for better performance
    grabSound.preload = 'auto';

    let chromosomeTimer; // To handle multiple drag events
    const connections = []; // Array to store connections
    const correctSequence = ['img8', 'img5', 'img2', 'img3', 'img1', 'img4', 'img7', 'img6'];
    let currentSequence = [];

    // Flags to manage sound playback
    let isDragging = false;    // Indicates if a drag is in progress

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
                showPopup();
            } else {
                // Since wrongSound is removed, we won't play any sound on incorrect sequence
                showIncorrectPopup();
            }
        }
    }

    // Function to show the popup and play audio
    function showPopup() {
        overlay.style.display = 'block';
        popup.style.display = 'block';
        audio.play();

        // Add event listener to the OK button when the popup is shown
        okayButton.addEventListener('click', handleOkayButtonClick);
    }

    // Function to show incorrect popup
    function showIncorrectPopup() {
        // Create the incorrect popup element
        const incorrectPopup = document.createElement('div');
        incorrectPopup.classList.add('popup');

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
        incorrectPopup.appendChild(closeIcon); // Add close icon at the top
        incorrectPopup.appendChild(definitionText);
        incorrectPopup.appendChild(tryAgainButton);
        document.body.appendChild(incorrectPopup); // Append the popup to the body

        // Note: Since wrongSound is removed, we won't play any sound effect here

        // Close popup when close icon is clicked
        closeIcon.addEventListener('click', function () {
            closeIncorrectPopup(incorrectPopup);
        });

        // Reload the page when the Try Again button is clicked
        tryAgainButton.addEventListener('click', function () {
            closeIncorrectPopup(incorrectPopup);
            location.reload(); // Reload the page
        });
    }

    // Helper function to close incorrect popup
    function closeIncorrectPopup(popupElement) {
        if (popupElement) {
            popupElement.remove(); // Remove the popup from the DOM
        }
    }

    // Function to navigate to the next level
    function goToNextLevel() {
        // Option 1: Redirect to the next level's URL
        window.location.href = 'telophase.html'; // Replace with your actual next level page

        // Option 2: If using single-page architecture, call a function to load the next level
        // loadNextLevel();

        // Option 3: Display a message (for demonstration purposes)
        //alert("Proceeding to the next level!");
    }

    // Handler for OK button click
    function handleOkayButtonClick() {
        // Remove the event listener to prevent multiple triggers
        okayButton.removeEventListener('click', handleOkayButtonClick);

        // Hide the popup and overlay
        overlay.style.display = 'none';
        popup.style.display = 'none';

        // Call the function to go to the next level
        goToNextLevel();
    }

    // Dragging functionality
    centralDots.forEach(dot => {
        // Flags to manage drag and click events
        let isDraggingDot = false;

        // Add mousedown event listener
        dot.addEventListener('mousedown', function (event) {
            event.preventDefault(); // Prevent text selection
            showChromosomeMeaning(); // Show the meaning when dragging starts
            grabSound.currentTime = 0; // Reset the grab sound
            grabSound.play(); // Play the grab sound

            isDraggingDot = false; // Initialize dragging flag

            const initialMouseX = event.clientX;
            const initialMouseY = event.clientY;
            const initialDotRect = dot.getBoundingClientRect();
            const circleRect = circle.getBoundingClientRect();
            const initialLeft = initialDotRect.left - circleRect.left;
            const initialTop = initialDotRect.top - circleRect.top;

            function onMouseMove(event) {
                isDraggingDot = true; // User is dragging

                // Calculate new position relative to the circle
                let newX = initialLeft + (event.clientX - initialMouseX);
                let newY = initialTop + (event.clientY - initialMouseY);

                // Constrain within the circle
                const radius = circle.offsetWidth / 2;
                const centerX = circle.offsetWidth / 2;
                const centerY = circle.offsetHeight / 2;

                const dx = newX + dot.offsetWidth / 2 - centerX;
                const dy = newY + dot.offsetHeight / 2 - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance + (dot.offsetWidth / 2) > radius) {
                    // If outside the circle, constrain to the edge
                    const angle = Math.atan2(dy, dx);
                    newX = centerX + (radius - dot.offsetWidth / 2) * Math.cos(angle) - dot.offsetWidth / 2;
                    newY = centerY + (radius - dot.offsetHeight / 2) * Math.sin(angle) - dot.offsetHeight / 2;
                }

                // Update dot position
                dot.style.left = `${newX}px`;
                dot.style.top = `${newY}px`;

                // Update connections
                updateConnections(dot);
            }

            function onMouseUp(event) {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);

                if (isDraggingDot) {
                    // Since dropSound is removed, we won't play any sound on drop
                    // If you decide to add a different sound, you can implement it here
                } else {
                    // If not dragging, treat it as a click
                    // Since clickSound is removed, this block can be omitted
                }

                checkSuccess(); // Check if all dots are correctly placed
                handleSequence(); // Check sequence and show appropriate popup
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        // Add click event listener for clickSound (if needed)
        dot.addEventListener('click', function (event) {
            // Prevent click sound if it was a drag
            if (!isDraggingDot) {
                // Since clickSound is removed, this block can be omitted
                // If you decide to keep it, uncomment the lines below
                /*
                clickSound.currentTime = 0;
                clickSound.play();
                */
            }
            isDraggingDot = false; // Reset dragging flag
        });
    });

    // Add event listeners to central dots for meaning on 'click' (optional)
    centralDots.forEach(dot => {
        dot.addEventListener('click', showChromosomeMeaning);
    });

    // Initial setup
    setupConnections();
});
