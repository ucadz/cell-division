window.onload = function() {
    // ===========================
    // Audio Elements Definition
    // ===========================

    // Variables for audio effects
    const clickSound = document.getElementById("clickSound");
    const buttonClickSound = document.getElementById('buttonClickSound');
    const playSoundEffect = document.getElementById('playSoundEffect');
    const pauseSoundEffect = document.getElementById('pauseSoundEffect');

    // New sound effects for game actions
    const dropBigDotSound = new Audio('audio/drop_big_dot.mp3');
    const dropMergedImageSound = new Audio('audio/drop_merged_image.mp3');
    const connectCurveSound = new Audio('audio/connect_curve.mp3');

    // Preload new audio files
    [dropBigDotSound, dropMergedImageSound, connectCurveSound].forEach(audio => {
        audio.preload = 'auto';
    });

    // Background music toggle state
    let isPlaying = true;

    // ===========================
    // Audio and Button Interaction
    // ===========================

    // Function to play the button click sound effect
    function playClickSound() {
        buttonClickSound.currentTime = 0; // Reset sound to the start
        buttonClickSound.play().catch(error => {
            console.warn('Button click sound playback failed:', error);
        });
    }

    // Toggle button for play/pause functionality
    function toggleMusic() {
        if (isPlaying) {
            backgroundMusic.pause();
            pauseSoundEffect.currentTime = 0;
            pauseSoundEffect.play();
            toggleBtn.classList.add('paused');
        } else {
            backgroundMusic.play();
            playSoundEffect.currentTime = 0;
            playSoundEffect.play();
            toggleBtn.classList.remove('paused');
        }
        isPlaying = !isPlaying; // Toggle state
    }

    // Event Listener for Play/Pause Toggle Button
    toggleBtn.addEventListener('click', toggleMusic);

    // ===========================
    // Home Icon Interaction
    // ===========================

    // Event Listener for Home Icon Click
    homeIcon.addEventListener("click", () => {
        playClickSound();
        homeClickSound.currentTime = 0;
        homeClickSound.play();
        homeModal.style.display = "block"; // Show the modal
    });

    // Event Listener for Home Modal Buttons
    yesBtn.addEventListener("click", () => {
        window.location.href = "Home.html"; // Redirect to home page
    });
    noBtn.addEventListener("click", () => {
        homeModal.style.display = "none"; // Close the modal
    });
    closeModal.addEventListener("click", () => {
        homeModal.style.display = "none"; // Close the modal
    });

    // Close Home Modal When Clicking Outside
    window.addEventListener("click", (event) => {
        if (event.target === homeModal) {
            homeModal.style.display = "none";
        }
    });

    // ===========================
    // Game Button Interaction
    // ===========================

    const gameButtons = [
        { btn: document.getElementById("game1Btn"), popup: popups[0], redirect: "UnlockG1Phase.html" },
        { btn: document.getElementById("game2Btn"), popup: popups[1], redirect: "UnlockG2Phase.html", dependency: true },
        { btn: document.getElementById("game3Btn"), popup: popups[2], redirect: "UnlockG3Phase.html" },
        { btn: document.getElementById("game4Btn"), popup: popups[3], redirect: "UnlockG4Phase.html" }
    ];

    gameButtons.forEach((game, index) => {
        game.btn.addEventListener("click", () => {
            playClickSound();
            if (game.dependency) {
                const game1Completed = localStorage.getItem('game1Completed') === 'true';
                if (game1Completed) {
                    game.popup.style.display = 'block'; // Show popup
                } else {
                    showDependencyPopup("You must play Game 1 before playing Game 2.");
                }
            } else {
                game.popup.style.display = 'block'; // Show popup for other games
            }
        });

        game.popup.querySelector('.closePopupBtn').addEventListener('click', () => {
            game.popup.style.display = 'none'; // Hide popup
            window.location.href = game.redirect; // Redirect to game page
        });
    });

    // ===========================
    // Dependency Popup
    // ===========================

    function showDependencyPopup(message) {
        let dependencyPopup = document.getElementById("dependency-popup");
        if (!dependencyPopup) {
            dependencyPopup = createModalBackground('dependency-popup');
            const popupContainer = createPopupContainer();
            const closeButton = createCloseIconButton(() => handleClosePopup(dependencyPopup)());
            popupContainer.appendChild(closeButton);
            popupContainer.appendChild(createTextElement(message, '18px', '#333', 'center'));
            popupContainer.appendChild(createButtonElement('OK', () => handleClosePopup(dependencyPopup)()));
            dependencyPopup.appendChild(popupContainer);
            document.body.appendChild(dependencyPopup);
        } else {
            const messageText = dependencyPopup.querySelector('p');
            if (messageText) {
                messageText.textContent = message; // Update the message
            }
            dependencyPopup.style.display = 'flex'; // Ensure the popup is visible
        }
    }

    // ===========================
    // Accessibility Enhancements
    // ===========================

    // Enable keyboard interactions for dots and central dots
    document.querySelectorAll('.dot, .central-dot').forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                alert(`Activated ${element.id}`); // Implement your connection logic here
            }
        });
    });
};

// =============================
// Helper Functions for Popups
// =============================

function createModalBackground(id) {
    const modalBackground = document.createElement('div');
    modalBackground.id = id;
    modalBackground.setAttribute('role', 'dialog');
    modalBackground.setAttribute('aria-modal', 'true');
    modalBackground.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(0, 0, 0, 0.5); display: flex; align-items: center; 
        justify-content: center; z-index: 1000; display: none;`;
    return modalBackground;
}

function createPopupContainer() {
    const popupContainer = document.createElement('div');
    popupContainer.style.cssText = `
        background-color: #fff; padding: 20px; border-radius: 8px; 
        text-align: center; max-width: 40%; max-height: 90%; overflow: auto; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);`;
    popupContainer.setAttribute('tabindex', '-1'); // Make it focusable
    return popupContainer;
}

function createTextElement(textContent, fontSize = '16px', color = '#000', textAlign = 'left') {
    const textElement = document.createElement('p');
    textElement.textContent = textContent;
    textElement.style.cssText = `
        margin-top: 15px; font-size: ${fontSize}; color: ${color}; 
        text-align: ${textAlign};`;
    return textElement;
}

function createButtonElement(textContent, clickHandler) {
    const button = document.createElement('button');
    button.textContent = textContent;
    button.style.cssText = `
        margin-top: 20px; padding: 10px 20px; font-size: 16px; cursor: pointer; 
        background-color: #3498db; color: #fff; border: none; border-radius: 4px; 
        transition: background-color 0.3s;`;
    
    button.onmouseover = () => button.style.backgroundColor = '#2980b9';
    button.onmouseout = () => button.style.backgroundColor = '#3498db';
    
    button.addEventListener('click', clickHandler);
    return button;
}

function createCloseIconButton(closeHandler) {
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.style.cssText = `
        position: absolute; top: 10px; right: 10px; background: transparent; 
        border: none; font-size: 24px; cursor: pointer; color: #aaa; transition: color 0.3s;`;
    
    closeButton.onmouseover = () => closeButton.style.color = '#000';
    closeButton.onmouseout = () => closeButton.style.color = '#aaa';
    closeButton.addEventListener('click', closeHandler);
    
    return closeButton;
}

function handleClosePopup(modalBackground) {
    return () => {
        modalBackground.style.display = 'none'; // Hide the popup
    };
}
