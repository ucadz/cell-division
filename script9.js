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

    // Modals and Popups
    const homeModal = document.getElementById("homeModal");
    const closeModal = homeModal.querySelector(".close");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    const popup1 = document.getElementById("popup1");
    const closePopupBtn1 = document.getElementById("closePopupBtn1");
     const popup2 = document.getElementById("popup2");
     const closePopupBtn2 = document.getElementById("closePopupBtn2");

    const instructionsPopup = document.getElementById("popupInstructions");
    const closeInstructionsBtn = document.getElementById("closeInstructionsBtn");
    const okayBtn = document.getElementById("okayBtn");

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
        window.location.href = "DoneGame2.html"; // Redirect to Game 1 completion page
    });

    // Event Listener for Game 2 Button
    game2Btn.addEventListener("click", () => {
        playClickSound(); // Play click sound
        instructionsPopup.style.display = 'block'; // Show instructions popup for Game 2
    });

    // Event Listener for "Okay" Button in Instructions Popup
    okayBtn.addEventListener("click", () => {
        instructionsPopup.style.display = 'none'; // Hide instructions popup
        window.location.href = "DoneGame2.html"; // Redirect to the next page
    });

    // Event Listener for Close ("X") Button in Instructions Popup
    closeInstructionsBtn.addEventListener("click", () => {
        instructionsPopup.style.display = 'none'; // Hide instructions popup
    });

    // Event Listener to Close Instructions Popup When Clicking Outside of It
    window.addEventListener("click", (event) => {
        if (event.target === instructionsPopup) {
            instructionsPopup.style.display = "none";
        }
    });
});
