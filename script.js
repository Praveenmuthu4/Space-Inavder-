// create an object
var hero={
    top: 570,
    left:550,
}

var missiles=[]

var enemies=[
    // firstline
    {left:200,top:100},
    {left:300,top:100},
    {left:400,top:100},
    {left:500,top:100},
    {left:600,top:100},
    {left:700,top:100},
    {left:800,top:100},
    {left:900,top:100},

    // secondline
    {left:200,top:175},
    {left:300,top:175},
    {left:400,top:175},
    {left:500,top:175},
    {left:600,top:175},
    {left:700,top:175},
    {left:800,top:175},
    {left:900,top:175},
]


document.onkeydown=function(e){
    // console.log(e.keyCode)
    // ARROWLEFT
    if(e.keyCode===37 && hero.left>=0){
        console.log("LEFT");
        hero.left=hero.left-10;
        console.log(hero.left);
    }
    // ARROERIGHT
    if(e.keyCode==39 && hero.left<=1150){
        console.log("RIGHT")
        hero.left=hero.left+10;
        console.log(hero.left);
    }
    if(e.keyCode===32){
        console.log("FIRE/SHOOT");
        
        missiles.push({
            left:hero.left+21,
            top:hero.top-21,
        })
        console.log(missiles)
        drawMissiles()
        // moveMissiles()
    }
    moveHero()
}

function moveHero(){
    document.getElementById('hero').style.left=hero.left+"px";
    document.getElementById('hero').style.top=hero.top+"px";
}

// missiles
function drawMissiles(){
    document.getElementById('missiles').innerHTML=""
    // array.map(()=>{})
    missiles.map((element)=>{
        document.getElementById('missiles').innerHTML+=`
        <div class="missile" style='left:${element.left}px;top:${element.top}px;'></div>
        `
    })

}

// move Missiles

function moveMissiles(){
    missiles.map((element)=>{
        element.top=element.top-21;
    })
}

function gameLoop(){
    moveMissiles();
    drawMissiles();
    moveEnemies();
    drawEnemies();
    shooting();
    gameEnd();
    console.log("hi")
}
let game=setInterval(gameLoop,300)

// drawEnemies
function drawEnemies(){
    document.getElementById('enemies').innerHTML=""
    // array.map(()=>{})
    enemies.map((element)=>{
        document.getElementById('enemies').innerHTML+=`
        <div class="enemy" style='left:${element.left}px;top:${element.top}px;'></div>
        `
    })

}

// move Enenmies
function moveEnemies(){
    enemies.map((element)=>{
        element.top=element.top+3;
    })
}

// shooting/firing
function shooting(){
    for(let enemy=0;enemy<enemies.length;enemy++){
        for(let missile=0;missile<missiles.length;missile++){
            if(
                missiles[missile].left>=enemies[enemy].left &&
                missiles[missile].left<=(enemies[enemy].left+50) &&

                missiles[missile].top>=enemies[enemy].top &&
                missiles[missile].top<=(enemies[enemy].top+50) 

            ){
                console.log("hit")
                enemies.splice(enemy,1)
                missiles.splice(missile,1)
            }
        }
    }

}

// game End

function gameEnd(){
    let container=document.getElementById('background')
    if(enemies.length===0){

        container.innerHTML=`
        <div class="result">You Win😍😎😎</div>
        <button class="result restart" onClick="window.location.reload()">Restart</button>
        `
        console.log("Win")
        clearInterval(game)
        disable()
    }
    else if(enemyChecker()){
        container.innerHTML+=`
        <div class="result">You Loose😑😑😐
        </div>
        <button  class="result restart"onClick="window.location.reload()">Restart</button>
        `
        console.log("Loose")
        clearInterval(game)
        disable()
    }
}


// function enemyChecker
// some method=>false
// stop=>returns true
function enemyChecker(){
    return enemies.some((data)=>data.top==529)
    // console.log(enemies.some((data)=>console.log(data.top==529)))
}

// to stop move left and right  =>hero

function disable(){
    document.onkeydown=function(e){
        return false
    }
}
// 

// Reset
function reset(){
    document.getElementById('player').value="";
}