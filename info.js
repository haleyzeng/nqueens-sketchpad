var info_button = document.getElementById("infoBtn");
var info = document.getElementById("info");
var infoShowing = false;

var showHideInfo = function(){
    if (infoShowing){
	info.style.display = "none";
	info_button.innerHTML = "What is this?"
    }
    else {
	info.style.display = "inline";
	info.style.width = "50%";
	info_button.innerHTML = "got it"
    }
    infoShowing = ! infoShowing;
}

info_button.addEventListener("click", showHideInfo);
