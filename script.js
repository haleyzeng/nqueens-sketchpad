var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var size_dropdown = document.getElementById("dropdown");
var clear_button = document.getElementById("clear");
var undo_button = document.getElementById("undo");

var size = 1;
var patchSize = 75;

var queensLocations = [];

var makeCircle = function(x, y, r){
    ctx.fillStyle = "#ff0000" ;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 360);
    ctx.fill();
    ctx.stroke();
}

var clear = function(e) {
    e.preventDefault();
    ctx.clearTect(0, 0, 500, 500);
}


var requestID;

var growingCircle = function(){
    window.cancelAnimationFrame( requestID );
    var radius = 1;
    var rInc = 1;
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var drawDot = function() {
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	makeCircle(x, y, radius);
	
	if (radius < 1 || radius > canvas.height / 2){
	    rInc = - rInc;
	}
	radius += rInc;
	
	requestID = window.requestAnimationFrame( drawDot );
    }
    drawDot();
}

var dvd = function(){
    window.cancelAnimationFrame( requestID );
    var radius = 20
    var x = 100;
    var y = canvas.height / 2;
    
    var xInc = 2;
    var yInc = 3;

    var size = 60;
    var drawDot = function() {
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var img = new Image(20, 20);
	img.src = "right.jpg";

	ctx.drawImage(img, x, y, size, size);
	
	if (x < 0  || x > canvas.width - size){
	    xInc = - xInc;
	}
	if (y < 0 || y > canvas.height - size){
	    yInc = -yInc;
	}

	x += xInc;
	y += yInc;
	    

	
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
}

var undo = function(){
    if (queensLocations.length > 0) {
	var lastOne = queensLocations[queensLocations.length - 1];
	var x = lastOne[0];
	var y = lastOne[1];
	drawBox(x, y);
	queensLocations.splice(queensLocations.length - 1, 1);
    }    
}

size_dropdown.addEventListener("click", changeCanvasSize);
canvas.addEventListener("click", place);
clear_button.addEventListener("click", drawBackground);
undo_button.addEventListener("click", undo);
