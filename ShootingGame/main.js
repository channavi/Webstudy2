const canvas = document.getElementById('main_canvas');
var context = canvas.getContext('2d');

class EventLoop
{
    constructor(){
        this.player = new player(canvas.width/2, canvas.height/2, 50, 10, 'skyblue');
        this.gm = new GameManager();
        this.em = new EnemyManager();
        this.bm = new BulletManager();

        this.fps = 60;

        this.spawnTime = 0;
        this.spawnCount = 0;
    }

    Update()
    {
        if(this.spawnTime == this.spawnCount)
        {
            this.spawnTime = Math.floor(Math.random() * 300); 
            this.spawnCount = 0;

            this.em.EnemySpawn(this.player);
        }
        this.spawnCount++;

        for (let bullet of this.bm.bulletArr) {
            bullet.Update();
        }

        for(let enemy of this.em.enemyArr)
        {
            enemy.Update();
        }
        this.Collison();
    }

    Render(){
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let bullet of this.bm.bulletArr) {
            bullet.Draw();
        }

        this.player.Draw();

        for(let enemy of this.em.enemyArr)
        {
            enemy.Draw();
        }

        let text = "Score : " + String(this.gm.score);
        
        context.font = "20pt Fira";
        context.fillStyle = "black";
        context.fillText(text, 100, 100);

        text = "Life : " + String(this.player.life);
        context.fillText(text, 1000, 100);
    }

    Collison()
    {
        let enemyIndex = 0;
        let bulletIndex = 0;

        for(let enemy of this.em.enemyArr)
        {
            for (let bullet of this.bm.bulletArr) 
            {
                if(CollisonCheck(enemy, bullet))
                {
                    enemy.life -= bullet.damage;
                        this.bm.BulletDestroy(bulletIndex);

                    if(enemy.life <= 0)
                    {
                        this.em.EnemyDestory(enemyIndex);
                        this.gm.score += 10;
                    }
                }

                if(bullet.pos_x > canvas.width || bullet.pos_y > canvas.height || bullet.pos_x < 0 || bullet.pos_y < 0)
                {
                    this.bm.BulletDestroy(bulletIndex);
                }

                bulletIndex++;
            }

            if(CollisonCheck(enemy, this.player))
            {
                this.player.life -= enemy.life;
                this.player.ReSize();
                this.em.EnemyDestory(enemyIndex);
                if(this.player.life <= 0)
                {
                    this.gm.gameState = GameState.End;
                }
            }
            enemyIndex++;
        }
        
    }
}

function CollisonCheck(Object_A, Object_B)
{
    let length = Object_A.radius + Object_B.radius;
    let distance = Math.sqrt(Math.pow(Object_A.pos_x - Object_B.pos_x, 2) + Math.pow(Object_A.pos_y - Object_B.pos_y, 2));

    if(length < distance)
    {
        return false;
    } 

    return true;
}


var eventLoop = new EventLoop();
setInterval(Loop,1000/eventLoop.fps);

function Loop()
{
    if (eventLoop.gm.gameState == GameState.Ready)
    {
        titleRender();
    }
    else if (eventLoop.gm.gameState == GameState.Play)
    {
        eventLoop.Update();
        eventLoop.Render();
    }
    else if (eventLoop.gm.gameState == GameState.End)
    {
        endRender();
    }
}

canvas.onclick = function(event)
{
    if (eventLoop.gm.gameState == GameState.Ready)
    {
        eventLoop.gm.gameState = GameState.Play;
    }
    else if (eventLoop.gm.gameState == GameState.Play)
    {
        eventLoop.bm.BulletFire(event, eventLoop.player);
    }
    else if (eventLoop.gm.gameState == GameState.End)
    {
        eventLoop.gm.gameState = GameState.Ready;
    }
}

function titleRender()
{
    let text = "Click Play";

    context.font = "40pt Fira";
    context.fillStyle = "red";
    context.fillText(text,canvas.width / 2, canvas.height / 2);
}

function endRender()
{
    let text = "GameOver";

    context.font = "40pt Fira";
    context.fillStyle = "red";
    context.fillText(text,canvas.width / 2, canvas.height / 2);
}