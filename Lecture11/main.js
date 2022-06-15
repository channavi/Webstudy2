//const canvas = document.querySelector('canvas');
const canvas = document.getElementById('main_canvas');
var context = canvas.getContext('2d');

//classes
class player{
    constructor(x,y,radius,color){
        this.pos_x = x;
        this.pos_y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        context.beginPath();
        
        context.arc(this.pos_x,this.pos_y,this.radius,0,2*Math.PI)
        context.fillStyle = this.color;
        context.fill()

        context.closePath();        
    }
}

class bullet{
    constructor(position_x,position_y, destination_x, destination_y, radius,color, speed){
        this.position_x = position_x;
        this.position_y = position_y;
        this.destination_x = destination_x / (Math.sqrt(Math.pow(destination_x,2) + Math.pow(destination_y,2)));
        this.destination_y = destination_y / (Math.sqrt(Math.pow(destination_x,2) + Math.pow(destination_y,2)));
        this.radius = radius;
        this.color = color;
        this.speed = speed;
    }
    update(){
        this.position_x += this.destination_x * this.speed;
        this.position_y += this.destination_y * this.speed;
    }
    draw(){
        context.beginPath();
        context.arc(this.position_x, this.position_y, this.radius, 0, 2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
}

class GameManager{
    constructor(){
        this.score = 0;
        this.fps = 60;
        this.bulletArr = [];
        this.EnemyArr = [];
        this.Player = new player(canvas.width/2, canvas.height/2, 20, 'skyblue');
    }  
    Render(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.Player.draw();

        for (let bullet of this.bulletArr) {
            bullet.update();
            bullet.draw();
        } 
    }
    SpawnBullet(event) {
        let clickpos_x = event.clientX -context.canvas.offsetLeft;
        let clickpos_y = event.clientY -context.canvas.offsetTop;
        let des_x = clickpos_x - this.Player.pos_x;
        let des_y = clickpos_y - this.Player.pos_y;
        this.bulletArr.push(new bullet(this.Player.pos_x,this.Player.pos_y,des_x,des_y,5,'green',5));
    }
}

var gm = new GameManager();
setInterval(rend,1000/gm.fps);
function rend(){
    gm.Render();
}

canvas.onclick = function(event){    
    gm.SpawnBullet(event);
}

