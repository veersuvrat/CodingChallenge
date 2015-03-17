// initially set up all frequencies = 0
var frequencies = [];
for (var i = 0; i < 27; i++) {
  frequencies[i] = 0;
}
d3.select("body").selectAll("div").data(frequencies).enter().append("div").attr("class", "bar").style("height", displayHeight);




function SearchUsingInput(){
  var searchBox = document.getElementById("SearchForm");
  
  console.log("Just testing things out.");
  // Checking to see if the Search input is processed.
  console.log(searchBox.elements[0].value);
  
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "https://api.angel.co/1/search?query=" + searchBox.elements[0].value + "&type=User", false);
  xmlHttp.send(null);
  
  var jsonResponse = JSON.parse(xmlHttp.responseText);
  var NumberOfUsers = jsonResponse.length;

  // if a search query returns less <= 5 results, process all. Else process the first 5.
  var IterationLimit = Math.min(5, NumberOfUsers);

  for (var i = 0; i < IterationLimit; i++) {
    parseUserName(jsonResponse[i].name);
  }
  

  d3.selectAll(".bar").data(frequencies).style("height", displayHeight);

}


// parse each username as it comes in from the SearchUsingInput() function.

function parseUserName(UserName){

  var LowerCase = UserName.toLowerCase();

  for (var i = 0; i < LowerCase.length; i++) {
    var unicode = LowerCase.charCodeAt(i);
    var indexToIncrement = unicode - 97;

    // checking to see if the character is an alphabet or 'other'.
    if ((indexToIncrement>=0) && (indexToIncrement<=25)) {
      frequencies[indexToIncrement] = frequencies[indexToIncrement] + 1;
    }else{
      frequencies[26] = frequencies[26] + 1;
    }
  }
}



// Make the height of the bars more visible. The frequencies themselves are very small for only 5 usernames

function displayHeight(originalHeight){
  return originalHeight*30 + "px";
}