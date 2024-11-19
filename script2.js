window.onload = function() {
    const music = document.getElementById("backgroundMusic");
    const startBtn = document.getElementById("startBtn");
    const clickSound = document.getElementById("clickSound");
    const toggleBtn = document.getElementById("toggleBtn");
    let isPlaying = true; // Track the state of the music

    // Play background music when the page loads
    music.play().catch(function(error) {
        console.log("Autoplay was prevented:", error);
    });

    // Start button click event
    startBtn.addEventListener("click", function () {
        music.pause(); // Stop the music
        music.currentTime = 0; // Reset the music to the beginning
        clickSound.play(); // Play the click sound
        setTimeout(function() {
            window.location.href = "GameSelection.html"; // Replace with your actual next page
        }, 500); // 500ms delay for smooth transition
    });

    // Toggle play/pause functionality
    toggleBtn.addEventListener('click', function () {
        if (isPlaying) {
            music.pause();
            toggleBtn.classList.add('paused'); // Add class to change background to pause icon
        } else {
            music.play();
            toggleBtn.classList.remove('paused'); // Remove class to revert back to play icon
        }
        isPlaying = !isPlaying; // Toggle the state
        clickSound.play(); // Play click sound when toggling
    });
};
