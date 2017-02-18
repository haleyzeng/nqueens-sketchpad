var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var size_dropdown = document.getElementById("dropdown");
var clear_button = document.getElementById("clear");
var undo_button = document.getElementById("undo");

var amtPlaced = document.getElementById("amtPlaced");
var amtNeeded = document.getElementById("amtNeeded");

var size = 1;
var patchSize = 75;

var queensLocations = [];

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

var drawLine = function(x0, y0, x1, y1){
    ctx.fillStyle = "#000000" ;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();

};

var changeCanvasSize = function(e){
    size = parseInt(size_dropdown.options[size_dropdown.selectedIndex].value);
    
    canvas.setAttribute("height", size * patchSize);
    canvas.setAttribute("width", size * patchSize);
    
    drawBackground();

    amtNeeded.innerHTML = size;
}

var drawBox = function(x, y){
    if ((x / 75) % 2 != (y / 75) % 2){
	ctx.fillStyle = "#C47451";
    }
    else {
	ctx.fillStyle = "#FFFFFF";
    }
    ctx.fillRect(x, y, 75, 75);
}

var drawBackground = function(){
    for (var i = 0; i < size; i++){
	for (var j = 0; j < size; j++){
	    var x = i * patchSize;
	    var y = j * patchSize;
	    drawBox(x, y);
	}
    }
}

var drawQueen = function(x, y){
    var queen = new Image(patchSize, patchSize);
    queen.src = "queen.png";
    queen.onload = function(){
	ctx.drawImage(queen, x, y, patchSize, patchSize);
    }
}

var place = function(e){
    var xcor = e.offsetX;
    var ycor = e.offsetY;

    var x = xcor - (xcor % 75);
    var y = ycor - (ycor % 75); 
    drawQueen(x, y);
    queensLocations.push([x, y]);
    amtPlaced.innerHTML = queensLocations.length;
    checkQueen(x, y);
}

var undo = function(){
    if (queensLocations.length > 0) {
	var lastOne = queensLocations[queensLocations.length - 1];
	var x = lastOne[0];
	var y = lastOne[1];
	drawBox(x, y);
	queensLocations.splice(queensLocations.length - 1, 1);
	amtPlaced.innerHTML = queensLocations.length;
    }    
}

var clear = function(){
    drawBackground();
    queensLocations = [];
    amtPlaced.innerHTML = queensLocations.length;
}

size_dropdown.addEventListener("click", changeCanvasSize);
canvas.addEventListener("click", place);
clear_button.addEventListener("click", clear);
undo_button.addEventListener("click", undo);
