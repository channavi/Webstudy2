class player{
    constructor(x,y,radius,life,color){
        this.pos_x = x;
        this.pos_y = y;
        this.radius = radius;
        this.life = life;
        this.size = this.radius / this.life;
        this.color = color;
    }

    Draw(){
        context.beginPath();
        
        context.arc(this.pos_x,this.pos_y,this.radius,0,2*Math.PI)
        context.fillStyle = this.color;
        context.fill()

        context.closePath();
    }

    ReSize()
    {
        this.radius = this.size * this.life;
    }
}

class bullet{
    constructor(pos_x,pos_y, destination_x, destination_y, radius,color, speed, damage = 1){
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.destination_x = destination_x / (Math.sqrt(Math.pow(destination_x,2) + Math.pow(destination_y,2)));
        this.destination_y = destination_y / (Math.sqrt(Math.pow(destination_x,2) + Math.pow(destination_y,2)));
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.damage = damage;
    }

    Update(){
       this.Move();
    }

    Draw(){
        context.beginPath();
        context.arc(this.pos_x, this.pos_y, this.radius, 0, 2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    Move()
    {
        this.pos_x += this.destination_x * this.speed;
        this.pos_y += this.destination_y * this.speed;
    }
}

class Enemy
{
    constructor(pos_x, pos_y, destination_x, destination_y, radius, color, speed, life)
    {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.destination_x = destination_x / (Math.sqrt(Math.pow(destination_x,2) + Math.pow(destination_y,2)));
        this.destination_y = destination_y / (Math.sqrt(Math.pow(destination_x,2) + Math.pow(destination_y,2)));
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.life = life;
    }

    Update()
    {
        this.Move();
        this.radius = (this.life * 10) + 10;
    }

    Draw()
    {
        context.beginPath();
        context.arc(this.pos_x, this.pos_y, this.radius, 0, 2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    Move()
    {
        this.pos_x += this.destination_x * this.speed;
        this.pos_y += this.destination_y * this.speed;
    }
}