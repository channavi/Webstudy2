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