function $(id) {
	return document.getElementById(id);
}
var cv, ctx;
var pxSize = 5; //Size of the pixels
var dim = 100; //Dimensions of the square
var lastUpdate = 0;
var currentColour = "black";
var rendering = false;
window.onload = function() {
	cv = $("cv");
	ctx = cv.getContext("2d");
	cv.width = dim*pxSize;
	cv.height = dim*pxSize;
	drawCurrent();
	setInterval("drawCurrent()",2000);
	cv.onclick = function(event) {
		if (!rendering) {
			var x = (event.clientX-cv.offsetLeft)+window.scrollX;
			var y = (event.clientY-cv.offsetTop)+window.scrollY;
			ctx.fillStyle = currentColour;
			ctx.fillRect(x-(x%pxSize),y-(y%pxSize),pxSize,pxSize);
			var http = new XMLHttpRequest();
			http.open("GET","main.php?x="+x+"&y="+y+"&colour="+encodeURIComponent(ctx.fillStyle)+"&time="+(new Date().getTime()),true);
			http.send();
		}
	}
}
function drawCurrent() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if (this.readyState==4&&this.status==200) {
			var pxs = JSON.parse(this.responseText);
			lastUpdate = new Date().getTime();
			rendering = true;
			for (i=0;i<pxs.length;i++) {
				ctx.fillStyle = pxs[i][0];
				ctx.fillRect(pxs[i][1]-(pxs[i][1]%pxSize),pxs[i][2]-(pxs[i][2]%pxSize),pxSize,pxSize);
			}
			rendering = false;
		}
	}
	http.open("GET","main.php?fromtime="+encodeURIComponent(lastUpdate),true);
	http.send();
}