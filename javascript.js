var topics = ["Dwight Howard", "Joel Embiid", "Orlando Magic", "dunk", "Dikimbe Motumbo", "Kevin Durant", "crossover", "J.R. Smith", "Lakers"]

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
    var currentTopic = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=n4sjlCCKO2MlfVGq0m65ss8NGktOaQHt&tag=" + currentTopic + "&limit=10"
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response)
        
      });
});

createButtons();