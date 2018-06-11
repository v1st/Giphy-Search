/* Event Listener */
$("#textbox").change(getSearch); 

// Function for getting the value of the user search 
function getSearch(){
    /* Variables */
    let value;

    /* Collecting Value and calling Search Function */
    value = $("#textbox").val();

    search(value, 0);
}
// Function for calling the API with the search
function search(value, offset){
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
function checkingResults(value){

    /* Checking the Search Results */
    if(value.data.length > 0){
        foundGifs(value); // Populating page
    } else {
        badSearch(); // Displaying Error Message
    }
}
// Function for populating the page
function foundGifs(value){
    /* Variables */
    let area;
    let x;

    /* Displaying Gifs */
    area = $("#gifs");
    area.html('');

    x = 0;
    $.each(value.data,function(){
        let image = $(`<img src="${value.data[x].images.original.url}">`);
        let div = $('<div class="card"></div>');
        div.append(image);
        area.append(div);
        x++;
    });
}