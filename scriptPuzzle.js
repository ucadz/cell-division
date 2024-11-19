$(document).ready(function () {

    var box = $(".box"),
        orginal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        temp = orginal,
        x = [],
        sec = 0,
        date1, date2,
        moves = 0,
        mm = 0,
        ss = 0,
        upIMG,
        images = [
            "imageC/cell2.jpg"
        ];
    img = 0;

    // Audio elements for sound effects
    var clickSound = new Audio('audioC/Click_sound_effect.mp3'); // Replace with your actual click sound file path
    var swapSound = new Audio('audioC/Whoosh.mp3');   // Replace with your actual swap sound file path

    $('.me').css({"background-image": 'url(' + images[0] + ')'}); // Use the first local image

    $(".start").click(function () {
        $(".start").addClass('prevent_click').slideUp(250);
        $(".full").hide();
        $(".pre_img").addClass("prevent_click");

        date1 = new Date();
        Start();
        return 0;
    });

    function Start() {
        randomTile(8, 4);
        changeBG(img);
        var count = 0,
            a, b, A, B;
            
        $(".me").click(function () {
            // Play the click sound
            clickSound.play();

            count++;
            if (count == 1) {
                a = $(this).attr("data-bid");
                $('.me_' + a).css({"opacity": ".65"});
            } else {
                b = $(this).attr("data-bid");
                $('.me_' + a).css({"opacity": "1"});
                if (a == b) {
                } else {
                    // Play the swap sound before swapping
                    swapSound.play();

                    $(".me_" + a)
                        .addClass("me_" + b)
                        .removeClass("me_" + a);
                    $(this)
                        .addClass("me_" + a)
                        .removeClass("me_" + b);
                    $(".me_" + a).attr("data-bid", a);
                    $(".me_" + b).attr("data-bid", b);
                }
                moves++;
                swapping(a, b);
                checkCorrect(a);
                checkCorrect(b);
                a = b = count = A = B = 0;
            }
            if (arraysEqual(x)) {
                date2 = new Date();
                timeDifferece();
                showScore();
                return 0;
            }
        });
        return 0;
    }

    function randomTile(width, height) {
        var i;
        var total_tiles = width * height
        for (i = total_tiles - 1; i >= 0; i--) {
            var flag = getRandom(0, i);
            x[i] = temp[flag];
            temp[flag] = temp[i];
            temp[i] = x[i];
        }
        for (i = 0; i < total_tiles; i++) {
            box.append(
                    '<div  class="me me_' + x[i] + ' tile" data-bid="' + x[i] + '"></div>'
                    );
            if ((i + 1) % width == 0)
                box.append("<br>");
        }
        i = total_tiles - 1;
        return 0;
    }

    function arraysEqual(arr) {
        var i;
        for (i = orginal.length - 1; i >= 0; i--) {
            if (arr[i] != i)
                return false;
        }
        return true;
    }

    function checkCorrect(N1) {
        var pos = x.indexOf(parseInt(N1, 10));
        if (pos != N1) {
            return;
        }
        $(".me_" + N1).addClass("correct , prevent_click ").css({'background-image': 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + current_bg_url() + ')'});
        return;
    }

    function swapping(N1, N2) {
        var first = x.indexOf(parseInt(N1, 10)),
                second = x.indexOf(parseInt(N2, 10));
        x[first] = parseInt(N2, 10);
        x[second] = parseInt(N1, 10);
        return 0;
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function timeDifferece() {
        var diff = date2 - date1;
        var msec = diff;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        mm = Math.floor(msec / 1000 / 60); // Gives Minute
        msec -= mm * 1000 * 60;
        ss = Math.floor(msec / 1000); // Gives Second
        msec -= ss * 1000;
        return 0;
    }

    function changeBG(img) {
        if (img != 3)
            $('.me').css({"background-image": "url(" + images[img] + ")"});
        else if (upIMG != undefined)
            $('.me').css({"background-image": "url(" + upIMG + ")"});
    }

    $('.pre_img li').hover(function () {
        img = $(this).attr("data-bid");
        changeBG(img);
    });

    function showScore() {
        $('#min').html(mm);
        $('#sec').html(ss);
        $('#moves').html(moves);

        // Autoplay explanation audio
        $('body').append('<audio id="explanation-audio" autoplay><source src="audioC/Cytokinesis.wav" type="audio/mpeg"></audio>');

        setTimeout(function () {
            $('.cover').slideDown(350);
        }, 500);
        return 0;
    }

// Update the click event to redirect to another page
    $('.OK').click(function () {
        $('.cover').slideUp(350);
        $('#explanation-audio').remove(); // Stop and remove audio when clicking OK

        // Redirect to another page after closing the cover
        window.location.href = 'DoneGame3.html'; // Replace 'nextpage.html' with your target URL
    });

    $('.reset').click(function () {
        $(".tile").remove();
        $("br").remove();
        $(".full").show();
        $(".start").show();
        $(".pre_img, .start").removeClass("prevent_click");

        temp = orginal;
        x = [];
        moves = ss = mm = 0;
        return 0;
    });

    $("#upfile1").click(function () {
        $("#file1").trigger('click');
    });

    $("#file1").change(function () {
        readURL(this);
    });


    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                upIMG = e.target.result;
                img = 3;
                changeBG(3);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    function current_bg_url() {
        if (img != 3)
            return images[img]
        else if (upIMG != undefined)
            return upIMG
    }
});
