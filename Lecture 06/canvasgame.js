var canvas = document.getElementById('game');
var context = canvas.getContext('2d'); //유니티의 게임메니저

//context.beginPath();
//context.arc(100, 100, 20, 0 ,2*Math.PI);
//context.fillStyle = 'skyblue';
//context.fill();
//context.fillStyle = 'red';
//context.fillRect(225,225,100,100);
//context.closePath();

//context.moveTo(100,100);
//context.lineTo(0,100);
//context.lineTo(100,0);
//context.closePath();

//context.fillStyle = 'pink';
//context.fill();

//context.arc(100,100,20,0,2*Math.PI);
//context.fillStyle = 'green';
//context.fill();

class player
{
    constructor(x,y,radius,color)
    {
        this.pos_x = x;
        this.pos_y = y;
        this.radius = radius;
        this.color = color;
    }

    draw()
    {
        context.arc(this.pos_x,this.pos_y,this.radius,0,2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
    }
}
class bullet
{
    constructor(x,y,color)
    {
        this.pos_x = x;
        this.pos_y = y;
        this.color = color;
    }

    draw()
    {
        context.arc(this.pos_x,this.pos_y, 5, 0,2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
    }
    
}

function enemy(event)
{
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    var b = new bullet(x,y,'black');
    context.beginPath();
    b.draw();
    context.closePath();
}
var p = new player(100,100,30,'skyblue');
p.draw();

