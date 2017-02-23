var saveImg_button = document.getElementById("saveImg");
var gallery = document.getElementById("gallery");

var saveCanvas = function(){
    gallery.style.display = "inline";
    
    var dataURL = canvas.toDataURL();

    var div = document.createElement("div");
    div.style.display = "inline";
    div.style.padding = "20px";
    
    var link = document.createElement("a");
    link.setAttribute("href", dataURL);
    link.setAttribute("target", "_blank");

    var img = document.createElement("img");
    img.setAttribute("src", dataURL);
    img.setAttribute("height", "100");
    img.setAttribute("width", "100");
    img.setAttribute("border", "1");

    var delete_btn = document.createElement("button");
    delete_btn.innerHTML = "delete";
    delete_btn.setAttribute("class", "delete-btn");

    delete_btn.addEventListener("click", removeImg);
    
    link.appendChild(img);
    div.appendChild(link)
    div.appendChild(delete_btn);
    gallery.appendChild(div);
}

var removeImg = function(e){
    e.preventDefault();
    this.parentNode.parentNode.removeChild(this.parentNode);
}

saveImg_button.addEventListener("click", saveCanvas);
