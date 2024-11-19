window.onload = function () {
    // Get elements
    const G1Btn = document.getElementById("G1Btn");
    const gearIcon = document.getElementById("instructionGear"); 
    const modal = document.getElementById("instructionModal");
    const closeModal = document.getElementsByClassName("close")[0];
    const clickSound = document.getElementById('clickSound');
    const homeIcon = document.getElementById("homeIcon");
    const homeModal = document.getElementById("homeModal");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const homeSound = document.getElementById("homeSound");

    // Redirect to next page when G1 button is clicked, play click sound
    G1Btn.addEventListener("click", function () {
        clickSound.play(); // Play the click sound
        setTimeout(function() {
            window.location.href = "G1-Phase.html"; // Redirect to G1-Phase page
        }, 500); // 500ms delay for smooth transition
    });

    // Show the instruction modal when the gear icon is clicked
    gearIcon.addEventListener("click", function () {
        modal.style.display = "block"; // Show the modal
    });

    // Close the modal when the close button (X) is clicked
    closeModal.addEventListener("click", function () {
        modal.style.display = "none"; // Hide the modal
    });

    // Close the modal when the user clicks outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Hide the modal
        }
    });

    // Show the home confirmation modal and play home sound when the home icon is clicked
    homeIcon.onclick = function () {
        homeSound.play(); // Play the home button sound
        homeModal.style.display = "block"; // Show home modal
    };

    // Close the home modal when "No" button is clicked
    noBtn.onclick = function () {
        homeModal.style.display = "none"; // Hide home modal
    };

    // Redirect to homepage when "Yes" button is clicked
    yesBtn.onclick = function () {
        window.location.href = "Home.html"; // Redirect to homepage
    };

    // Close modals by clicking outside of the content
    window.onclick = function (event) {
        if (event.target == homeModal) {
            homeModal.style.display = "none"; // Hide home modal
        }
        if (event.target == modal) {
            modal.style.display = "none"; // Hide instruction modal
        }
    };
};
