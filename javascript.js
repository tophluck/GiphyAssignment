var topics = ["Dwight Howard", "Joel Embiid", "Orlando Magic", "dunk", "Dikimbe Motumbo", "Kevin Durant", "crossover", "J.R. Smith", "Lakers"]
var gifsNumber = 10

function createButtons() {
    $("#buttonsArea").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>").text(topics[i]);
        button.addClass("btn btn-primary");
        button.addClass("topic");
        $("#buttonsArea").append(button)
    }
};

$("#addInput").on("click", function(event) {
    event.preventDefault();
    var userText = $("#userInput").val().trim()
    topics.push(userText);
    $("#userInput").val("");
    createButtons();
});

$(document).on("click", ".topic", function(){
    $("#gifsArea").empty();
    var currentTopic = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=n4sjlCCKO2MlfVGq0m65ss8NGktOaQHt&q=" + currentTopic + "&limit=" + gifsNumber
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response)
        for (var i = 0; i < gifsNumber; i++) {
            var current = response.data[i]
            var div = $("<div>");
            var p = $("<p>").text(current.rating);
            var gif = $("<img>");
            gif.attr("src", current.url);
            div.append(p).append(gif);
            $("#gifsArea").append(div);
            console.log(current.url)
        }
      });
});

createButtons();