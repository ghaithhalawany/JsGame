var cnv = document.getElementById('cnv')
var c = cnv.getContext('2d');
var height = cnv.height = 400;
var width = cnv.width = 600;

var ball = {

	size: 7, 
	color: 'white',
	speed: {
		x: 5,
		y: 6
	},
	position: {
		x: 300,
		y: 200
	},

	update: function(){
		this.position.x += this.speed.x
		this.position.y += this.speed.y
		if(this.position.y <= 0 || this.position.y + this.size >= height){
			this.speed.y *= -1;
		}
		if(this.position.x + this.size >= player1.position.x){
			if(this.position.y > player1.position.y + player1.size.height || this.position.y < player1.position.y){
				player1.score++;
				newRound();
			}else{
				this.speed.x *= -1;
				if(this.speed.x > 0){
					this.speed.x++;
				}else{
					this.speed.x--;
				}
			}
		}
		if(this.position.x < player2.position.x + player2.size.width){
			if(this.position.y > player2.position.y + player2.size.height || this.position.y < player2.position.y){
				player2.score++;
				newRound();
			}else{
				this.speed.x *= -1;
				if(this.speed.x > 0){
					this.speed.x++;
				}else{
					this.speed.x--;
				}
			}
		}
	},

	draw: function(){
		c.fillStyle = this.color
   		c.fillRect(this.position.x, this.position.y, this.size, this.size)
	}
}


var player1 = {
	score: 0,
	speed: 5,
	color: 'blue',
	up: false,
	down: false,
	size:{
		width: 5,
		height: 100
	},
	position: {
		y: 10,
		x: 570
	},
	update: function(){
		if(this.up && !this.down){
			if(this.position.y - this.speed >= 0){
				this.position.y -= this.speed;
			}
		}else if(this.down && !this.up){
			if(this.position.y + this.speed + this.size.height <= height){
				this.position.y += this.speed;
			}
		}
	},

	draw: function(){
		c.fillStyle = this.color
   		c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
	}
}

var player2 = {
	score: 0,
	speed: 5,
	color: 'green',
	up: false,
	down: false,
	size:{
		width: 5,
		height: 100
	},
	position: {
		y: 10,
		x: 30
	},
	update: function(){
		if(this.up && !this.down){
			if(this.position.y - this.speed >= 0){
				this.position.y -= this.speed;
			}
		}else if(this.down && !this.up){
			if(this.position.y + this.speed + this.size.height <= height){
				this.position.y += this.speed;
			}
		}
	},

	draw: function(){
		c.fillStyle = this.color
   		c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
	}
}

var map = {};
window.onkeydown = function(e){
	console.log(e.keyCode); //38 up1 - 40 down1 - 16 up2 - 17 down2
    map[e.keyCode] = e.type == 'keydown';
    if(map[38]){
    	player1.up = true;
    	console.log('up1');
    }
    if(map[40]){
    	player1.down = true;
    	console.log('down1');
    }
    if(map[16]){
    	player2.up = true;
    	console.log('up2');
    }
    if(map[17]){
    	player2.down = true;
    	console.log('down2');
    }
    map[38] = false;
    map[40] = false;
    map[16] = false;
    map[17] = false;
}

window.onkeyup = function(e){
	console.log(e.keyCode); //38 up1 - 40 down1 - 16 up2 - 17 down2
    map[e.keyCode] = e.type == 'keyup';
    if(map[38]){
    	player1.up = false;
    	console.log('!up1');
    }
    if(map[40]){
    	player1.down = false;
    	console.log('!down1');
    }
    if(map[16]){
    	player2.up = false;
    	console.log('!up2');
    }
    if(map[17]){
    	player2.down = false;
    	console.log('!down2');
    }
    map[38] = false;
    map[40] = false;
    map[16] = false;
    map[17] = false;
}

function update(){
	player1.update();
	player2.update();
	ball.update();
}

function init(){
	ball.position.x = 300;
	ball.position.y = 200;
	ball.speed.x = 5;
}

function drawField(){
	c.beginPath();
	c.setLineDash([20, 15]);
	c.moveTo(300, 0);
	c.lineTo(300, 400);
	c.stroke();
	c.setLineDash([0]);
}
function draw(){
	c.clearRect(0, 0, width, height);
	ball.draw();
	player1.draw();
	player2.draw();
	drawField();
}

var startMenu = false;

function newRound(){
	c.clearRect(0, 0, width, height);
	c.fillStyle = 'white';
	c.font = "70px Arial";
	c.fillText("Pong", 205, 100);
	c.font = "10px Arial";
	c.fillText("By Ghaith", 340, 135);
	c.font = "30px Arial";
	c.fillText('Click To Start', 200, 350);
	c.strokeStyle = "white";
	c.lineWidth = 5;
	c.strokeRect(100, 200, 50, 50);
	c.strokeRect(400, 200, 50, 50);
	c.fillText(''+player2.score, 417, 235);
	c.fillText(''+player1.score, 117, 235);
	startMenu = true;
}

window.onload = function() {
	newRound();
}

window.onclick = function(){
	if(startMenu){
		startMenu = false;
		init();
		gameLoop();
	}
}

function gameLoop(now){
	if(!startMenu){
		draw();
		update();
    	requestAnimationFrame(gameLoop)
	}
}




