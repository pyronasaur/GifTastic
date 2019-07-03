$(document).ready(function(){
    //set base portion of request URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BlUwnjsAJO1DKy8IZBvwGroJ6kicFbd9&q=";

    var otherParams = "&limit=25&offset=0&rating=G&lang=en"

    //on-click for search button
    $(".hero-button").on("click", function(){
        //when button is clicked, grab the users input from the search bar
        var input = $(this).text();
        console.log(input);
        //build request URL with base, input and key
        var totalURL = queryURL + input + otherParams;

        //log totalURL
        console.log("totalURL is " + totalURL);

        //make api call
        $.ajax({
            url: totalURL,
            method: "GET"
          })
            .then(function(response) {
              var results = response.data;
                console.log(results);
              //loop results for first five responses
              for (var i = 0; i < results.length; i++) {
                var articleDiv = $("<div>");
                console.log(results[i].rating);
                
                var gifDiv = $("<div>");

                var rating = results[i].rating;
    
                var p = $("<p>").text("Rating: " + rating);
    
                var heroImage = $("<img>");
                heroImage.attr("src", results[i].images.fixed_height.url);
    
                gifDiv.prepend(p);
                gifDiv.prepend(heroImage);
    
                $("#gif-location").prepend(gifDiv);
              }
        });
    });

    $(".gif").on("click", function() {

        var state = $(this).attr("data-state");     
        var animate = $(this).attr("data-animate");
        console.log(animate);
        var still = $(this).attr("data-still");
        console.log(still);

        if(state === "still"){
          console.log("this is: " + this);
          $(this).attr("src", animate);
          $(this).attr("data-state", "animate");
        }
  
        if(state === "animate"){
          $(this).attr("src", still);
          $(this).attr("data-state", "still");
        }

    });
});