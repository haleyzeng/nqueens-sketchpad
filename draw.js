var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var circle_button = document.getElementById("circle");
var dvd_button = document.getElementById("dvd");
var stop_button = document.getElementById("stop");

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
    var x = c.width / 2;
    var y = c.height / 2;
    var drawDot = function() {
	
	ctx.clearRect(0, 0, c.width, c.height);
	makeCircle(x, y, radius);
	
	if (radius < 1 || radius > c.height / 2){
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
    var y = c.height / 2;
    
    var xInc = 2;
    var yInc = 3;

    var size = 60;
    var drawDot = function() {
	
	ctx.clearRect(0, 0, c.width, c.height);
	var img = new Image(20, 20);
	img.src = "right.jpg";

	ctx.drawImage(img, x, y, size, size);
	
	if (x < 0  || x > c.width - size){
	    xInc = - xInc;
	}
	if (y < 0 || y > c.height - size){
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


circle_button.addEventListener("click", growingCircle);
dvd_button.addEventListener("click", dvd);
stop_button.addEventListener("click", stop);
