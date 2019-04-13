function setup () {

  loadJSON("http://localhost:3000/images", gotData, 'jsonp');

}

function gotData(data) {
  println(data);

}

function draw(){

}
