function SearchUsingInput(){
  var searchBox = document.getElementById("SearchForm");
  console.log("Just testing things out.");
  console.log(searchBox.elements[0].value);
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "https://api.angel.co/1/search?query=" + searchBox.elements[0].value + "&type=User", false);
  xmlHttp.send(null);
  
  var jsonResponse = JSON.parse(xmlHttp.responseText);
  var NumberOfUsers = jsonResponse.length;

  var IterationLimit = Math.min(5, NumberOfUsers);

  for (var i = 0; i < IterationLimit; i++) {
    parseUserName(jsonResponse[i].name);
  }
  //d3.select("body").selectAll("div").data(newFreq).style("height", displayHeight);
  //console.log(document.getElementsByClassName("bar"));
  //document.getElementsByClassName("bar")[0].style.height = 100 + "px";
  //console.log(d3.selectAll(".bar"));

  d3.selectAll(".bar").data(frequencies).style("height", displayHeight);

}

var frequencies = [];
for (var i = 0; i < 27; i++) {
  frequencies[i] = 0;
}


function parseUserName(UserName){

  var LowerCase = UserName.toLowerCase();

  for (var i = 0; i < LowerCase.length; i++) {
    var unicode = LowerCase.charCodeAt(i);
    var indexToIncrement = unicode - 97;
    if ((indexToIncrement>=0) && (indexToIncrement<=25)) {
      frequencies[indexToIncrement] = frequencies[indexToIncrement] + 1;
    }else{
      frequencies[26] = frequencies[26] + 1;
    }
  }
}

d3.select("body").selectAll("div").data(frequencies).enter().append("div").attr("class", "bar").style("height", displayHeight);


function displayHeight(originalHeight){
  return originalHeight*30 + "px";
}