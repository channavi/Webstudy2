//const canvas = document.querySelector('canvas');
const canvas = document.getElementById('main_canvas');
var context = canvas.getContext('2d');

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

