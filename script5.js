window.onload = function () {
    const G2Btn = document.getElementById("G2Btn");
    const clickSound = document.getElementById('clickSound');
    const homeIcon = document.getElementById("homeIcon");
    const homeModal = document.getElementById("homeModal");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const homeSound = document.getElementById("homeSound");

    // Redirect to the G2 Phase when G2 button is clicked
    G2Btn.addEventListener("click", function () {
        clickSound.play(); // Play the click sound
        // Add a slight delay for smooth transition
        setTimeout(() => {
            window.location.href = "G2-Phase.html"; // Replace with your actual next page
        }, 500); // 500ms delay
    });

    // Home icon functionality
    homeIcon.onclick = function () {
        homeSound.play(); // Play the sound
        homeModal.style.display = "block"; // Show the home confirmation modal
    };

    // When the "No" button is clicked, close the modal
    noBtn.onclick = function () {
        homeModal.style.display = "none"; // Hide the home confirmation modal
    };

    // When the "Yes" button is clicked, redirect to the homepage
    yesBtn.onclick = function () {
        window.location.href = "index.html"; // Redirect to the homepage
    };

    // Close the home modal when clicking outside of it
    window.onclick = function (event) {
        if (event.target === homeModal) {
            homeModal.style.display = "none"; // Hide the modal
        }
    };
};
