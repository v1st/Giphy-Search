// Function for getting the value of the user search 
function getSearch(){
    /* Variables */
    let value;

    /* Collecting Value and calling Search Function */
    value = document.getElementById("search");

    search(value, 0);
}
// Function for calling the API with the search
function search(value, offset){
    /* Variables */
    // API Key zfTPENJfHtscQrOBkg36COh4dQFUj9UG
    let newObject;


    /* XML Request */
    let xhr = new XMLHttpRequest(); 
    xhr.open("GET", "https://api.giphy.com/v1/stickers/search?api_key=zfTPENJfHtscQrOBkg36COh4dQFUj9UG&q" + value 
    + "=&limit=25&offset=" + offset + "&rating=G&lang=en", true); 
    xhr.send();
    xhr.onreadystatechange = function () { 
        if (this.readyState === this.DONE) { 
            newObject = JSON.parse(xhr.responseText); 
            console.log(newObject);
        }
    }
}