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

    const popup4 = document.getElementById("popup4");
    const closePopupBtn4 = document.getElementById("closePopupBtn4");

    // Variables for play/pause state
    let isPlaying = true;

    // Function to play the button click sound effect
    function playClickSound() {
        buttonClickSound.currentTime = 0;
        buttonClickSound.play();
    }

    // Function to toggle background music
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
        isPlaying = !isPlaying;
    }

    // Event Listener for Play/Pause Toggle Button
    toggleBtn.addEventListener('click', toggleMusic);

    // Event Listener for Home Icon Click
    homeIcon.addEventListener("click", () => {
        playClickSound();
        homeClickSound.currentTime = 0;
        homeClickSound.play();
        homeModal.style.display = "block";
    });

    // Event Listener for "Yes" Button in Home Modal
    yesBtn.addEventListener("click", () => {
        window.location.href = "Home.html";
    });

    // Event Listener for "No" Button in Home Modal
    noBtn.addEventListener("click", () => {
        homeModal.style.display = "none";
    });

    // Event Listener for Close ("X") Button in Home Modal
    closeModal.addEventListener("click", () => {
        homeModal.style.display = "none";
    });

    // Event Listener to Close Home Modal When Clicking Outside of It
    window.addEventListener("click", (event) => {
        if (event.target === homeModal) {
            homeModal.style.display = "none";
        }
    });

    // Event Listener for Game 1 Button
    game1Btn.addEventListener("click", () => {
        playClickSound();
        popup1.style.display = 'block';
    });

    // Event Listener for Close ("OK") Button in Game 1 Popup
    closePopupBtn1.addEventListener('click', () => {
        popup1.style.display = 'none';
        window.location.href = "DoneQuiz.html";
    });

    // Event Listener for Game 2 Button
    game2Btn.addEventListener("click", () => {
        playClickSound();
        popup2.style.display = 'block';
    });

    // Event Listener for Close ("OK") Button in Game 2 Popup
    closePopupBtn2.addEventListener('click', () => {
        popup2.style.display = 'none';
        window.location.href = "DoneQuiz.html";
    });

    // Event Listener for Game 3 Button
    game3Btn.addEventListener("click", () => {
        playClickSound();
        popup3.style.display = 'block';
    });

    // Event Listener for Close ("OK") Button in Game 3 Popup
    closePopupBtn3.addEventListener('click', () => {
        popup3.style.display = 'none';
        window.location.href = "DoneQuiz.html";
    });

    // Event Listener for Game 4 Button
    game4Btn.addEventListener("click", () => {
        playClickSound();
        popup4.style.display = 'block';
    });

    // Event Listener for Close ("OK") Button in Game 4 Popup
    closePopupBtn4.addEventListener('click', () => {
        popup4.style.display = 'none';
        window.location.href = "DoneQuiz.html";
    });
});
