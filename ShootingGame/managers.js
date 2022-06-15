const GameState = 
{
    Ready : 0,
    Play : 1,
    End : 2
}

class EnemyManager
{
    constructor()
    {
        this.enemyArr = [];
    }

    EnemySpawn(player)
    {
        let spawn_x;
        let spawn_y;

        switch(Math.floor(Math.random() * 4))
        {
            case 0 :
                spawn_x = -10;
                spawn_y = Math.floor(Math.random() * 960);
                break;
            case 1 :
                spawn_x = 1290;
                spawn_y = Math.floor(Math.random() * 960);
                break;
            case 2 :
                spawn_x = Math.floor(Math.random() * 1280);
                spawn_y = -10;
                break;
            case 3 :
                spawn_x = Math.floor(Math.random() * 1280);
                spawn_y = 970;
                break;
        }


        let des_x = player.pos_x - spawn_x;
        let des_y = player.pos_y - spawn_y;
        
        let life = Math.floor((Math.random() * 5) + 1);
        let radius = (life * 10) + 10;
        let speed = (7 - life);
        let color;

        switch(Math.floor(Math.random() * 4))
        {
            case 0 :
                color = 'red';
                break;
            case 1 :
                color = 'purple';
                break;
            case 2 :
                color = 'yellow';
                break;
            case 3 :
                color = 'black';
                break;
        }

        this.enemyArr.push(new Enemy(spawn_x,spawn_y,des_x,des_y, radius, color, speed, life));
    }

    EnemyDestory(index)
    {
        this.enemyArr.splice(index, 1);
    }
}

class BulletManager
{
    constructor()
    {
        this.bulletArr = [];
    }

    BulletFire(event, player)
    {
        if(this.bulletArr.length < 5)
        {
            let clickpos_x = event.clientX -context.canvas.offsetLeft;
            let clickpos_y = event.clientY -context.canvas.offsetTop;
            let des_x = clickpos_x - player.pos_x;
            let des_y = clickpos_y - player.pos_y;
            this.bulletArr.push(new bullet(player.pos_x,player.pos_y,des_x,des_y,5,'green',5));
            this.bulletCount++;
        }
    }

    BulletDestroy(index)
    {
        this.bulletArr.splice(index, 1);
    }
}

class GameManager{
    constructor(){
        this.score = 0;
        this.gameState = GameState.Ready;
    }
}