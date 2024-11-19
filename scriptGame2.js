window.onload = function() {
    // Variables for click sound effects
    const clickSound = document.getElementById("clickSound");
    const buttonClickSound = document.getElementById('buttonClickSound');
    
    // Variables for play and pause sound effects
    const playSoundEffect = document.getElementById('playSoundEffect');
    const pauseSoundEffect = document.getElementById('pauseSoundEffect');

    // Toggle button for play/pause functionality
    const toggleBtn = document.getElementById("toggleBtn");
    const backgroundMusic = document.getElementById("backgroundMusic");
    let isPlaying = true;

    // Popups for the game selection
    const popups = [
        document.getElementById("popup1"),
        document.getElementById("popup2"),
        document.getElementById("popup3"),
        document.getElementById("popup4")
    ];

    // Close buttons for the popups
    const closePopupBtns = [
        document.getElementById("closePopupBtn1"),
        document.getElementById("closePopupBtn2"),
        document.getElementById("closePopupBtn3"),
        document.getElementById("closePopupBtn4")
    ];

    // Function to play the button click sound effect
    function playClickSound() {
        buttonClickSound.currentTime = 0; // Reset sound to the start
        buttonClickSound.play(); // Play the sound
    }

    // Game button click events for Game 1 (you can repeat this for other games)
    const game1Btn = document.getElementById("game2Btn");

    game1Btn.addEventListener("click", function() {
        playClickSound(); // Play button click sound effect
        popups[0].style.display = 'block'; // Show the popup for Game 1
    });

    // Close popup and redirect when the OK button is clicked (Game 1)
    closePopupBtns[0].addEventListener('click', function() {
        popups[0].style.display = 'none'; // Hide Game 1 popup
        window.location.href = "metaphase.html"; // Redirect to Game 1 page
    });

    // Toggle button functionality for play/pause music with sound effects
    toggleBtn.addEventListener('click', function () {
        if (isPlaying) {
            backgroundMusic.pause();
            pauseSoundEffect.currentTime = 0; // Reset pause sound to the start
            pauseSoundEffect.play(); // Play the pause sound effect
            toggleBtn.classList.add('paused'); // Change icon to pause
        } else {
            backgroundMusic.play();
            playSoundEffect.currentTime = 0; // Reset play sound to the start
            playSoundEffect.play(); // Play the play sound effect
            toggleBtn.classList.remove('paused'); // Change icon to play
        }
        isPlaying = !isPlaying; // Toggle state
    });
};
