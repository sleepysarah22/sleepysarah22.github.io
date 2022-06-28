let inter = 0;

//Instantiate Matrix
let bombMatrix = new Array(matrix.length);
let numMatrix = new Array(matrix.length);

let start = false;
let end = false;
let win = false;
let bombs = 20;
let cleared = 0;

for(i = 0; i < bombMatrix.length; i++){
	bombMatrix[i] = new Array(matrix[0].length);
	for(j = 0; j < bombMatrix[0].length;j++){
		bombMatrix[i][j] = 0;
	}
}

for(i = 0; i < numMatrix.length; i++){
	numMatrix[i] = new Array(matrix[0].length);
	for(j = 0; j < numMatrix[0].length;j++){
		numMatrix[i][j] = 0;
	}
}

//Counts the number of bomb neighbors.
function checkNeighbors(x,y){
	let neighbors = 0;
	if(y>0){
		neighbors += bombMatrix[x][y-1];
	}
	if(y<bombMatrix[0].length-1){
		neighbors += bombMatrix[x][y+1];
	}
	if(x>0){
		neighbors += bombMatrix[x-1][y];
		if(y>0){
			neighbors += bombMatrix[x-1][y-1];
		}
		if(y<bombMatrix[0].length-1){
			neighbors += bombMatrix[x-1][y+1];
		}
	}
	if(x<bombMatrix.length-1){
		neighbors += bombMatrix[x+1][y];
		if(y>0){
			neighbors += bombMatrix[x+1][y-1];
		}
		if(y<bombMatrix[0].length-1){
			neighbors += bombMatrix[x+1][y+1];
		}
	}

	return neighbors;
}

function init_board(){
	let tempBombs = 0;
	while(tempBombs < bombs){
		let i = parseInt(Math.random()*matrix.length);
		let j = parseInt(Math.random()*matrix[0].length);
		if(bombMatrix[i][j] == 0 && matrix[i][j] == 0){
			bombMatrix[i][j] = 1;
			tempBombs++;
		}
	}

	for(i = 0; i < numMatrix.length; i++){
		for(j = 0; j < numMatrix[0].length;j++){
			numMatrix[i][j] = checkNeighbors(i,j);
		}
	}
	console.log("board initialized!");
}


//Updates Matrix
function update(){
	tempMatrix = JSON.parse(JSON.stringify(bombMatrix));
	let neighbors = 0;
	for(i = 0; i < matrix.length; i++){
		for(j = 0; j < matrix[0].length;j++){
			neighbors = checkNeighbors(i,j);
			tempMatrix[i][j] = neighbors;
		}
	}
	bombMatrix = tempMatrix;
}


function draw(){
	update();
	drawBoxes();
}

function endScreen(){
	if(win){
		ctx.fillStyle = "Green";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "black";
		ctx.font = '72px serif';
		ctx.textAlign = 'center';
		ctx.fillText("WAKE UP", canvas.width/2, canvas.height/2);
		ctx.font = '72px serif';
		ctx.textAlign = 'center';
		ctx.fillText("GOOD TOY", canvas.width/2, canvas.height/2+100);
		ctx.font = '34px serif';
		ctx.fillText("PRESS ENTER TO GO AGAIN~",canvas.width/2, (canvas.height/2)+200);
	}
	else{
		ctx.fillStyle = "red";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "black";
		ctx.font = '72px serif';
		ctx.textAlign = 'center';
		ctx.fillText("WAKE UP", canvas.width/2, canvas.height/2);
		ctx.font = '34px serif';
		ctx.fillText("PRESS ENTER TO TRY AGAIN~",canvas.width/2, (canvas.height/2)+100);
	}
}

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      if(end&&start){
      	clearGrid();
      	end = false;
      	start = false;
      }
      drawBoxes();
    }
});

canvas.addEventListener('click', function(event) {
	changeBox(canvas,event);
	if(!start){
		init_board();
		start = true;
	}
	drawBoxes();
	if(cleared == ((matrix.length*matrix[0].length)-bombs)){
		end = true;
		win = true;
	}
	if(end){
		endScreen();
	}
}, false);

draw();