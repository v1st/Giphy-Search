"use strict";
$(function () {
    /* Setting year */
    getYear();
    /* Event Listeners */
    $("#textbox").change(getSearch);
    $("#button__about").click(function () {
        bottom("about")
    });
    $("#button__api").click(function () {
        bottom("api")
    });
    $("#button__repo").click(function () {
        bottom("repo")
    });
});
// Function for getting the value of the user search 
function getSearch() {
    /* Variables */
    let value;

    /* Collecting Value and calling Search Function */
    value = $("#textbox").val();

    search(value, 0);
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
    let area;
    let x;

    /* Displaying Gifs */
    area = $("#gifs");
    area.html('');

    x = 0;
    $.each(value.data, function () {
        let image = $(`<img src="${value.data[x].images.original.url}">`);
        let div = $('<div class="card"></div>');
        div.append(image);
        area.append(div);
        x++;
    });
    load.css('display', 'flex');
}
// Function for Displaying an Error Message
function badSearch(load) {
    let area = $("#gifs");
    area.html(`<h1>Whoops, can't seem to find anything. Try again!</h1>`);
    load.css('display', 'none');
}
// Function for displaying bottom section 
function bottom(value) {
    /* Variables */
    let area = $("#bottom_text");

    /* Removing and showing new text */
    area.slideUp("slow");
    setTimeout(function () {
        area.slideDown("slow");
        if (value == "about") {
            area.html("<p>" + "Giphy Search was made by two Front End Developers" + "<br>" +
                "<a href='https://martinezdesigns.net'>Jared Martinez</a>" + "<br>" +
                "<a>Brandon *Insert Last Name Here*</a>" +
                "</p>");
        } else if (value == "api") {
            area.html("<a href='https://developers.giphy.com/'>Giphy Search Uses the Giphy API</a>");
        } else if (value == "repo") {
            area.html("<a href='https://github.com/v1st/Giphy-Search'>Look over the Codes</a>");
        }
    }, 1000);
}
// Function for setting the year a the bottom
function getYear() {
    /* Variables */
    let area = $("#year");
    let d = new Date;

    /* Displaying Year */
    area.html(d.getFullYear());
}
// Change banner gradient 
(function gradient() {
    const banner = $("#banner");

    let rgb;
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