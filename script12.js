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
    const game4Btn = document.getElementById('game4Btn'); // Fixed variable name

    // Modals and Popups
    const homeModal = document.getElementById("homeModal");
    const closeModal = homeModal.querySelector(".close");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    const popup1 = document.getElementById("popup1");
    const closePopupBtn1 = document.getElementById("closePopupBtn1");

    const popup2 = document.getElementById("popup2");
    const closePopupBtn2 = document.getElementById("closePopupBtn2");

    const popup3 = document.getElementById("popup3"); // Ensure this ID exists
    const closePopupBtn3 = document.getElementById("closePopupBtn3"); // Ensure this ID exists

    const instructionsPopupGame3 = document.getElementById("popupInstructions3"); // Ensure this ID exists
    const closeInstructionsBtnGame3 = document.getElementById("closeInstructionsBtnGame3"); // Ensure this ID exists
    const okayBtnGame3 = document.getElementById("okayBtnGame3"); // Ensure this ID exists

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

    // Event Listener for Play/Pause Toggle Button
    toggleBtn.addEventListener('click', toggleMusic);

    // Event Listener for Home Icon Click
    homeIcon.addEventListener("click", () => {
        playClickSound(); // Play click sound
        homeClickSound.currentTime = 0; // Reset sound to the start
        homeClickSound.play(); // Play the sound effect
        homeModal.style.display = "block"; // Show the modal
    });

    // Event Listener for "Yes" Button in Home Modal
    yesBtn.addEventListener("click", () => {
        window.location.href = "Home.html"; // Redirect to home page
    });

    // Event Listener for "No" Button in Home Modal
    noBtn.addEventListener("click", () => {
        homeModal.style.display = "none"; // Close the modal
    });

    // Event Listener for Close ("X") Button in Home Modal
    closeModal.addEventListener("click", () => {
        homeModal.style.display = "none"; // Close the modal
    });

    // Event Listener to Close Home Modal When Clicking Outside of It
    window.addEventListener("click", (event) => {
        if (event.target === homeModal) {
            homeModal.style.display = "none";
        }
    });

    // Event Listener for Game 1 Button
    game1Btn.addEventListener("click", () => {
        playClickSound(); // Play click sound
        popup1.style.display = 'block'; // Show popup for Game 1
    });

    // Event Listener for Close ("OK") Button in Game 1 Popup
    closePopupBtn1.addEventListener('click', () => {
        popup1.style.display = 'none'; // Hide Game 1 popup
        window.location.href = "DoneGame3.html"; // Redirect to Game 1 completion page
    });

    // Event Listener for Game 2 Button
    game2Btn.addEventListener("click", () => {
        playClickSound(); // Play click sound
        popup2.style.display = 'block'; // Show popup for Game 2
    });

    // Event Listener for Close ("OK") Button in Game 2 Popup
    closePopupBtn2.addEventListener('click', () => {
        popup2.style.display = 'none'; // Hide Game 2 popup
        window.location.href = "DoneGame3.html"; // Redirect to the next page
    });

    // Event Listener for Game 3 Button
    game3Btn.addEventListener("click", () => {
        playClickSound(); // Play click sound
        popup3.style.display = 'block'; // Show popup for Game 3
    });

    // Event Listener for Close ("OK") Button in Game 3 Popup
    closePopupBtn3.addEventListener('click', () => {
        popup3.style.display = 'none'; // Hide Game 3 popup
        window.location.href = "DoneGame3.html"; // Redirect to the next page
    });

    // Event Listener for Game 3 Instructions Popup
    game4Btn.addEventListener("click", () => {
        playClickSound(); // Play click sound
        instructionsPopupGame3.style.display = 'block'; // Show instructions popup for Game 3
    });

    // Event Listener for Close ("OK") Button in Game 3 Instructions Popup
    okayBtnGame3.addEventListener("click", () => {
        instructionsPopupGame3.style.display = 'none'; // Hide instructions popup
        window.location.href = "Quiz.html"; // Redirect to the puzzle page (change as needed)
    });

    // Event Listener for Close ("X") Button in Game 3 Instructions Popup
    closeInstructionsBtnGame3.addEventListener("click", () => {
        instructionsPopupGame3.style.display = 'none'; // Hide instructions popup
    });

    // Event Listener to Close Game 3 Instructions Popup When Clicking Outside of It
    window.addEventListener("click", (event) => {
        if (event.target === instructionsPopupGame3) {
            instructionsPopupGame3.style.display = "none";
        }
    });
});
