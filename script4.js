
        window.onload = function () {
            const SBtn = document.getElementById("SBtn");
            const gearIcon = document.getElementById("instructionGear");
            const modal = document.getElementById("instructionModal");
            const closeModal = document.getElementsByClassName("close")[0];
            const clickSound = document.getElementById('clickSound');
            const homeIcon = document.getElementById("homeIcon");
            const homeModal = document.getElementById("homeModal");
            const yesBtn = document.getElementById("yesBtn");
            const noBtn = document.getElementById("noBtn");
            const homeSound = document.getElementById("homeSound");

            // Redirect to the S-Phase page with a click sound
            SBtn.addEventListener("click", function () {
                clickSound.play(); // Play the click sound
                setTimeout(function() {
                    window.location.href = "S-Phase.html"; // Redirect to S-Phase page
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

            // When the home icon is clicked, play the sound and show the modal
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

            // Close the modal when clicking outside of it
            window.onclick = function (event) {
                if (event.target == homeModal) {
                    homeModal.style.display = "none"; // Hide the home confirmation modal
                }
            };
        };