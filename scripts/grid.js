var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

let boxSize = 50;

let phrases = ["good toy~", "POP", "BLISS", "DROP"]

//Colors
let color1 = "blue"
let color2 = "black"
let color3 = "red"
let color4 = "coral"

//Iterators
let i = 0;
let j = 0;

//Instantiate Matrix
let matrix = new Array(Math.floor(canvas.width/boxSize));

for(i = 0; i < matrix.length; i++){
	matrix[i] = new Array(Math.floor(canvas.height/boxSize));
	for(j = 0; j < matrix[0].length;j++){
		matrix[i][j] = 0;
	}
}

//Draws rectangles to screen.
function drawBoxes(){
	ctx.textAlign = 'left';
	for(i = 0; i < matrix.length; i++){
		for(j = 0; j < matrix[0].length;j++){
			ctx.beginPath();
			ctx.strokeStyle = color1;
			if(matrix[i][j]==0){
				ctx.fillStyle = color2;
			}
			else if(matrix[i][j]==1){
				if(bombMatrix[i][j]==1){
					ctx.fillStyle = color3;
				} 
				else{
  					ctx.fillStyle = color1;
				}
			}
			else{
				ctx.fillStyle = color4;
			}
			ctx.rect(i*boxSize, j*boxSize, boxSize, boxSize);
			ctx.fillRect(i*boxSize, j*boxSize, boxSize, boxSize);
			ctx.stroke();
			if(bombMatrix[i][j]==0&&matrix[i][j]==1){
				if(numMatrix[i][j]>0){
					ctx.fillStyle = "green";
					ctx.font = '48px serif';
	  				ctx.fillText(numMatrix[i][j], i*boxSize, (j+1)*boxSize);
				}
				else{
					ctx.fillStyle="pink";
					ctx.font = '12px serif';
					ctx.fillText(phrases[Math.floor(Math.random()*phrases.length)],i*boxSize, ((j+1)*boxSize)-(boxSize/2));
				}
			}

		}
	}
}

//Clears Matrix
function clearGrid(){
	console.log("Grid Cleared!");
	for(i = 0; i < matrix.length; i++){
		for(j = 0; j < matrix[0].length;j++){
			matrix[i][j] = 0;
			bombMatrix[i][j] = 0;
			numMatrix[i][j] = 0;
		}
	}	
	drawBoxes();
}

//Adds functionality to click boxes to swap state.
function changeBox(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)

    i = Math.floor(x / boxSize);
    j = Math.floor(y / boxSize);

    if(matrix[i][j] == 0){
    	if(event.shiftKey){
    		matrix[i][j] = 2;
    	}
    	else{
    		if(bombMatrix[i][j] == 0){
    			matrix[i][j] = 1;
    		}
    		else{
    			end = true;
    		}
    	}
    }
    else if(matrix[i][j] == 2){
    	if(event.shiftKey){
    		matrix[i][j] = 0;
    	}
    }
}