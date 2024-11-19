document.addEventListener('DOMContentLoaded', () => {
    // Audio Elements
    const backgroundMusic = document.getElementById("backgroundMusic");
    const buttonClickSound = document.getElementById('buttonClickSound');
    const homeClickSound = document.getElementById("homeClickSound");
    const playSoundEffect = document.getElementById('playSoundEffect');
    const pauseSoundEffect = document.getElementById('pauseSoundEffect');

    // Buttons and Icons
    const homeIcon = document.getElementById("homeIcon");
    const toggleBtn = document.getElementById("toggleBtn");
    const game1Btn = document.getElementById('game1Btn');
    const game2Btn = document.getElementById('game2Btn');
    const game3Btn = document.getElementById('game3Btn');
    const game4Btn = document.getElementById('game4Btn');

    // Modals and Popups
    const homeModal = document.getElementById("homeModal");
    const closeModal = homeModal.querySelector(".close");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    const popup1 = document.getElementById("popup1");
    const closePopupBtn1 = document.getElementById("closePopupBtn1");

    const popup2 = document.getElementById("popup2");
    const closePopupBtn2 = document.getElementById("closePopupBtn2");

    const popup3 = document.getElementById("popup3");
    const closePopupBtn3 = document.getElementById("closePopupBtn3");

    const instructionsPopupGame3 = document.getElementById("popupInstructions3");
    const closeInstructionsBtnGame3 = document.getElementById("closeInstructionsBtnGame3");
    const okayBtnGame3 = document.getElementById("okayBtnGame3");

    // Variables for play/pause state
    let isPlaying = true;

    // Function to play the button click sound effect
    function playClickSound() {
        buttonClickSound.currentTime = 0; // Reset sound to the start
        buttonClickSound.play(); // Play the sound
    }

    // Function to toggle background music
    function toggleMusic() {
        if (isPlaying) {
            backgroundMusic.pause();
            pauseSoundEffect.currentTime = 0; // Reset pause sound
            pauseSoundEffect.play(); // Play pause sound effect
            toggleBtn.classList.add('paused'); // Change icon to paused
        } else {
            backgroundMusic.play();
            playSoundEffect.currentTime = 0; // Reset play sound
            playSoundEffect.play(); // Play play sound effect
            toggleBtn.classList.remove('paused'); // Change icon to play
        }
        isPlaying = !isPlaying; // Toggle state
    }

    // Function to show the locked game message
    function showLockedGameMessage(message) {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.style.display = 'block';
        popup.innerHTML = `
            <div class="popup-content">
                <h2>Locked Game</h2>
                <p>${message}</p>
                <button id="closePopupBtn" class="ok-btn">OK</button>
            </div>
        `;
        
        document.body.appendChild(popup);

        // Close popup when OK button is clicked
        document.getElementById('closePopupBtn').onclick = function() {
            popup.style.display = 'none';
            document.body.removeChild(popup);
        };
    }

    // Event Listeners
    toggleBtn.addEventListener('click', toggleMusic);

    homeIcon.addEventListener("click", () => {
        playClickSound();
        homeClickSound.currentTime = 0; // Reset sound to the start
        homeClickSound.play();
        homeModal.style.display = "block"; // Show the modal
    });

    yesBtn.addEventListener("click", () => {
        window.location.href = "Home.html"; // Redirect to home page
    });

    noBtn.addEventListener("click", () => {
        homeModal.style.display = "none"; // Close the modal
    });

    closeModal.addEventListener("click", () => {
        homeModal.style.display = "none"; // Close the modal
    });

    window.addEventListener("click", (event) => {
        if (event.target === homeModal) {
            homeModal.style.display = "none";
        }
    });

    game1Btn.addEventListener("click", () => {
        playClickSound(); // Play click sound
        popup1.style.display = 'block'; // Show popup for Game 1
    });

    closePopupBtn1.addEventListener('click', () => {
        popup1.style.display = 'none'; // Hide Game 1 popup
        window.location.href = "UnlockG1Phase.html"; // Redirect to Game 1 completion page
    });

    game2Btn.addEventListener("click", () => {
        playClickSound(); // Play click sound
        showLockedGameMessage("You can unlock Game 2 after you finish Game 1. Please play Game 1.");
    });

    game3Btn.addEventListener("click", () => {
        playClickSound(); // Play click sound
        showLockedGameMessage("You can unlock Game 3 after you finish Game 2. Please play Game 2.");
    });

    game4Btn.addEventListener("click", () => {
        playClickSound(); // Play click sound
        showLockedGameMessage("You can unlock Game 4 after you finish Game 3. Please play Game 3.");
    });

    closePopupBtn2.addEventListener('click', () => {
        popup2.style.display = 'none'; // Hide Game 2 popup
        window.location.href = "DoneGame3.html"; // Redirect to the next page
    });

    closePopupBtn3.addEventListener('click', () => {
        popup3.style.display = 'none'; // Hide Game 3 popup
        window.location.href = "DoneGame3.html"; // Redirect to the next page
    });

    game4Btn.addEventListener("click", () => {
        playClickSound(); // Play click sound
        instructionsPopupGame3.style.display = 'block'; // Show instructions popup for Game 3
    });

    okayBtnGame3.addEventListener("click", () => {
        instructionsPopupGame3.style.display = 'none'; // Hide instructions popup
        window.location.href = "Final.html"; // Redirect to the puzzle page (change as needed)
    });

    closeInstructionsBtnGame3.addEventListener("click", () => {
        instructionsPopupGame3.style.display = 'none'; // Hide instructions popup
    });

    window.addEventListener("click", (event) => {
        if (event.target === instructionsPopupGame3) {
            instructionsPopupGame3.style.display = "none";
        }
    });
});
