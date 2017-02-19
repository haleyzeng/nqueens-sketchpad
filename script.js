var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var size_dropdown = document.getElementById("dropdown");
var clear_button = document.getElementById("clear");
var undo_button = document.getElementById("undo");

var flipH_button = document.getElementById("flipH");
var flipV_button = document.getElementById("flipV");
var rotateC_button = document.getElementById("rotateC");
var rotateCC_button = document.getElementById("rotateCC");

var saveImg_button = document.getElementById("saveImg");
var gallery = document.getElementById("gallery");

var amtPlaced = document.getElementById("amtPlaced");
var amtNeeded = document.getElementById("amtNeeded");

var bgdColor0 = "#C47451";
var bgdColor1 = "#FFFFFF";

var size = 1;
var patchSize = 75;

var queensLocations = [];
var problematic = [];

var requestID;

var growingCircle = function(){
    window.cancelAnimationFrame( requestID );

    //vars
    
    var drawDot = function() {
	
	//increment val to have animation effect
	
	requestID = window.requestAnimationFrame( drawDot );
    }
    drawDot();
}

var stop = function(){
    window.cancelAnimationFrame( requestID );
}

var changeCanvasSize = function(e){
    clear();
    
    size = parseInt(size_dropdown.options[size_dropdown.selectedIndex].value);
    
    canvas.setAttribute("height", size * patchSize);
    canvas.setAttribute("width", size * patchSize);
    
    drawBackground();

    amtNeeded.innerHTML = size;
}

var drawBox = function(r, c){
    if (r % 2 != c % 2){
	ctx.fillStyle = bgdColor0;
    }
    else {
	ctx.fillStyle = bgdColor1;
    }
    ctx.fillRect(r * patchSize, c * patchSize, patchSize, patchSize);
}

var drawBackground = function(){
    ctx.clearRect(0, 0, patchSize * size, patchSize * size);
    for (var i = 0; i < size; i++){
	for (var j = 0; j < size; j++){
	    drawBox(i, j);
	}
    }
}

var drawQueen = function(r, c){
    var queen = new Image(patchSize, patchSize);
    queen.src = "http://www.i2symbol.com/images/symbols/chess/black_chess_queen_u265B_icon_256x256.png";
    queen.crossOrigin = "";
    queen.onload = function(){
	ctx.drawImage(queen, r * patchSize, c * patchSize, patchSize, patchSize);
    }
}

var canPlaceHere = function(r, c){
    for (var index = 0; index < queensLocations.length; index++) {
	var queen = queensLocations[index];
	if (queen[0] == r && queen[1] == c)
	    return false;
    }
    return true;
}

var place = function(e){
    if (queensLocations.length == size)
	return;
    
    var xcor = e.offsetX;
    var ycor = e.offsetY;

    var r = Math.floor(xcor / 75);
    var c = Math.floor(ycor / 75); 

    if (! canPlaceHere(r, c))
	return;
    
    drawQueen(r, c);
    queensLocations.push([r, c]);
    amtPlaced.innerHTML = queensLocations.length;
    checkQueen(r, c);
}

var checkQueen = function(r, c){
    for (var index in queensLocations){
	var queen = queensLocations[index];
	var otherR = queen[0];
	var otherC = queen[1];
	if (! (otherR == r && otherC == c)) { //not myself
	    if (otherR == r || otherC == c || //same row or col
		(otherR - r == otherC - c)){  //same diagonal
		if (! problematic.includes(index)){
		    problematic.push(index);
		}

		console.log(problematic);
	    }
	}
    }
}

var undo = function(){
    if (queensLocations.length == 0)
	return;
    var lastOne = queensLocations[queensLocations.length - 1];
    var r = lastOne[0];
    var c = lastOne[1];
    ctx.clearRect(r, c, patchSize, patchSize);
    drawBox(r, c);
    queensLocations.splice(queensLocations.length - 1, 1);
    amtPlaced.innerHTML = queensLocations.length;    
}

var clear = function(){
    queensLocations = [];
    amtPlaced.innerHTML = queensLocations.length;
    drawBackground();
}


var drawAllQueens = function(){
    for (var index = 0; index < queensLocations.length; index++) {
	var queen = queensLocations[index];
	drawQueen(queen[0], queen[1]);
    }
}

//only run when board has been flipped/rotated
var updateBgdColors = function(){
    if (size % 2 == 0){ //no change for odd N boards (rotational and reflective symmetry)
	var temp = bgdColor1;
	bgdColor1 = bgdColor0;
	bgdColor0 = temp;
    }
}

var flipCoords = function(coord) {
    for (var index = 0; index < queensLocations.length; index++) {
	var queen = queensLocations[index];
	queen[coord] = size - 1 - queen [coord];
    }
}

var flipH = function(){
    flipCoords(0);
    updateBgdColors();
    drawBackground();
    drawAllQueens();
}

var flipV = function(){
    flipCoords(1);
    updateBgdColors();
    drawBackground();
    drawAllQueens();
}

var rotateCoords = function(dir){
    for (var index = 0; index < queensLocations.length; index++) {
	var queen = queensLocations[index];
	var otherCoord = (dir + 1) % 2;
	var temp = queen[otherCoord];
	queen[otherCoord] = queen[dir];
	queen[dir] = size - 1 - temp;
    }
}

var rotateC = function(){
    rotateCoords(0);
    updateBgdColors();
    drawBackground();
    drawAllQueens();
}

var rotateCC = function(){
    rotateCoords(1);
    updateBgdColors();
    drawBackground();
    drawAllQueens();
}

var convertCanvasForExport = function(){
    return;
}

var saveCanvas = function(){
    convertCanvasForExport();
    var dataURL = canvas.toDataURL();
    var link = document.createElement("a");
    link.setAttribute("href", dataURL);
    link.setAttribute("target", "_blank");
    var img = document.createElement("img");
    img.setAttribute("src", dataURL);
    img.setAttribute("height", "100");
    img.setAttribute("width", "100");
    img.setAttribute("border", "1");
    link.appendChild(img);
    gallery.appendChild(link);
}

size_dropdown.addEventListener("click", changeCanvasSize);
canvas.addEventListener("click", place);
clear_button.addEventListener("click", clear);
undo_button.addEventListener("click", undo);

flipH_button.addEventListener("click", flipH);
flipV_button.addEventListener("click", flipV);
rotateC_button.addEventListener("click", rotateC);
rotateCC_button.addEventListener("click", rotateCC);

saveImg_button.addEventListener("click", saveCanvas);
