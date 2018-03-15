var topics = ["Dwight Howard", "Joel Embiid", "Orlando Magic", "dunk", "dikembe mutombo", "Kevin Durant", "crossover", "J.R. Smith", "Lakers", "Space Jam"]
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

$(document).keyup(function(event) {
    console.log(event.key);
    if (event.key === "Enter"){
        var userText = $("#userInput").val().trim()
        if (userText !== "") {
            topics.push(userText);
            $("#userInput").val("");
            createButtons();
        }
    }
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
            var div = $("<div>").addClass("gifHolder");
            var p = $("<p>").text("Rating: " + current.rating);
            var gif = $("<img>");
            gif.attr("src", current.images.fixed_height_still.url);
            gif.attr("data-still", current.images.fixed_height_still.url);
            gif.attr("data-moving", current.images.fixed_height.url);
            gif.addClass("changable");
            div.append(p).append(gif);
            $("#gifsArea").append(div);
        }
      });
});

$(document).on("mouseenter", ".changable", function() {
    $(this).attr("src", $(this).attr("data-moving"));
});

$(document).on("mouseleave", ".changable", function() {
    $(this).attr("src", $(this).attr("data-still"));
})

createButtons();