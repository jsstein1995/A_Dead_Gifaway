console.log("hello!");

// Create an array that holds the strng text/value for the buttons
var topics = ['wolf', 'duck', 'slip', 'sun', 'simpsons', 'plants', 'skate', 'rainbow'];
function generateButtons() {
    //Delete buttons before adding new gifs to remove repeats
    $('#gifButtons').empty();
    //Loop through the Array of Gif terms
    for (var i = 0; i < topics.length; i++) {
        //Dynamically generate buttons for each item in the array
        var button = $("<button>");
        button.addClass('gif');
        button.attr('data-name', topics[i]);
        button.text(topics[i]);
        button.addClass("btn btn-primary");

        $('#gifButtons').append(button);
        console.log(topics);
    }
}

function newButton() {
    $('#addButton').on('click', function (event) {
        event.preventDefault();
        var inputText = $('#gif-input').val().trim();
        if (inputText) {
            topics.push(inputText);
        }
        generateButtons();
        setTimeout(function () {
            document.getElementById('gif-input').value = '';
        }, 0000);
    });
}

function gifDisplay() {
    $("#gifButtons").on('click', 'button', function () {
        var buttonVal = $(this).attr('data-name');
        console.log(this);
        console.log(buttonVal);

        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonVal + "&api_key=eGTXfQuxIe2QxkRad25ks1xHAivbsLU5&limit=10";
        // eGTXfQuxIe2QxkRad25ks1xHAivbsLU5

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {

                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div>');
                    var rating = results[i].rating;
                    var title = results[i].title;
                    var r = $('<p>').text("Rating: " + rating);
                    var t = $('<p>').text("Title: " + title);
                    var gif = $('<img>');
                    gif.addClass('gif');

                    gif.attr('data-state', 'still');
                    gif.attr('src', results[i].images.fixed_height_still.url);
                    gif.attr('data-still', results[i].images.fixed_height_still.url);
                    gif.attr('data-animate', results[i].images.fixed_height.url);
                    gif.addClass('img-thumbnail');
                    gif.attr('style', 'width:250px, height:200px');
                    gifDiv.prepend(r);
                    gifDiv.prepend(t);
                    gifDiv.prepend(gif);
                    gifDiv.addClass('col-3');
                    $('#gifs').prepend(gifDiv);
                }
            });
    });
}

function animateGif() {
    $('#gifs').on('click', 'img', function () {

        var state = $(this).attr('data-state');

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });


}


generateButtons();
gifDisplay();
newButton();
animateGif();

