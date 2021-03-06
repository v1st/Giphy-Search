"use strict";
$(function () {
    /* Setting year */
    getYear();

    /* Event Listeners */
    $("#textbox").change(getSearch);
    $("#load").click(loadMore);
    $("#button__about").click(about);

    /* Typed JS Title */
    let typed = new Typed('.titleWord', {
        strings: ['Search', 'Fun', 'API', "Awesome"],
        typeSpeed: 100,
        startDelay: 100,
        backSpeed: 100,
        backDelay: 3000,
        smartBackspace: true,
        loop: true,
    });
});

// Load more button
let offset = 25;

function loadMore() {
    $('#divBox').slideUp("slow");
    let value = $("#textbox").val();
    search(value, offset);
    offset += 25;
}

// Function for getting the value of the user search 
function getSearch() {
    /* Variables */
    let $value;

    /* Collecting Value and calling Search Function */
    $value = $("#textbox").val();

    search($value, 0);
}
// Function for calling the API with the search
function search(value, offset) {
    /* Variables */
    let newObject;

    /* XML Request */
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.giphy.com/v1/stickers/search?api_key=zfTPENJfHtscQrOBkg36COh4dQFUj9UG&q=" + value + "&limit=25&offset=" + offset + "&rating=G&lang=en", true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            newObject = JSON.parse(xhr.responseText);
            checkingResults(newObject);
        }
    }
}
// Function for checking the results of the search
function checkingResults(value) {
    // Displays results or error message if not found
    const load = $('#load');
    (value.data.length > 0) ? foundGifs(value, load): badSearch(load);
}
// Function for populating the page
function foundGifs(value, load) {
    /* Variables */
    let $area;
    let $x;

    /* Displaying Gifs */
    $area = $("#gifs");
    $area.html('');

    $x = 0;
    $.each(value.data, function () {
        /* Variables */
        let $image = $(`<img src="${value.data[$x].images.original.url}">`);
        let $div = $('<div class="card"></div>');

        /* Displaying Gifs */
        $div.append($image);
        $area.append($div);
        $x++;
    });
    if(value.pagination.total_count > 25){
        if (parseInt(value.pagination.offset) + parseInt(value.pagination.count) != parseInt(value.pagination.total_count)){
            load.css('display', 'flex');
        } else {
            load.css('display', 'none');
        }
    }
    $('#divBox').slideDown("slow");
}
// Function for Displaying an Error Message
function badSearch(load) {
    let $area = $("#gifs");
    $area.html(`<h1>Whoops, can't seem to find anything. Try again!</h1>`);
    load.css('display', 'none');
}
// Function for displaying bottom section 
function about() {
    /* Variables */
    let $area = $("#gifs");
    let $title = $("<h1>About</h1>");
    let $text = $("<p>Giphy Search was made by two Front-End Web Developers, using the Giphy Developer API.</p>");
    let $linkJM = $("<a href='https://martinezdesigns.net'>Jared</a>");
    let $linkB = $("<a href='https://github.com/v1st'>Brandon</a>");
    let $load = $("#load");

    document.getElementById("textbox").value = ''; // Clearing the search value

    /* Removing and showing new text */
    if ($area[0].childElementCount > 0) {
        $area.slideUp("slow");
        setTimeout(function () {
            $load.css("display", "none");
            $area.html('');
        }, 800)
        setTimeout(function () {
            $area.append($title);
            $area.append($text);
            $area.append($linkJM);
            $area.append($linkB);
            $area.slideDown("slow");
        }, 1000);
    } else {
        $('#divBox').css("display", "block"); // Displaying the area
        $area.slideUp("fast");
        $area.append($title);
        $area.append($text);
        $area.append($linkJM);
        $area.append($linkB);
        $area.slideDown("slow");
    }
}
// Function for setting the year a the bottom
function getYear() {
    /* Variables */
    let $area = $("#year");
    let d = new Date;

    /* Displaying Year */
    $area.html(d.getFullYear());
}
// Change banner gradient 
(function gradient() {
    const banner = $("#banner");
    let r = {
        i: 168,
        start: 168,
        end: 51,
        flag: 1
    }
    let g = {
        i: 58,
        start: 58,
        end: 79,
        flag: -1
    }
    let b = {
        i: 204,
        start: 204,
        end: 255,
        flag: -1
    }

    function changeRGB() {
        changeHue(r);
        changeHue(g);
        changeHue(b);
        banner.css('backgroundColor', `rgb(${r.i},${g.i},${b.i})`);
        setTimeout(changeRGB, 100);
    }

    function changeHue(obj) {
        if (obj.i === obj.start || obj.i === obj.end) {
            obj.flag *= -1
        };
        obj.i += obj.flag;
    }

    changeRGB();
})();