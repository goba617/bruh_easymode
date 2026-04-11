document.getElementById("die").style.display="none";
let ifbackAttack = true;
let fun = 0;
//有趣的//
function again(){
  //重置數值//
  score=0;
  grades=0;
  health=3;
  ifOver=false;
  bullet=[];
  timer={a:0,b:0,c:0,d:0,e:0,cha:0};
  player.x = window.innerWidth/2;
  player.y = 600;
  document.getElementById("scores").innerText = "your score=" + score;
  document.getElementById("grade").innerText = "LeveL-" + grades;
  draw();
};
document.addEventListener("click",
function(){
  if(ifOver){
    again();
    document.getElementById("die").style.display="none";
}});
document.body.style.color = "#000";
let ifOver = false;
let health=3;
let grades=0;
let fps=60;
let fpsTime=1000/fps;
let when=performance.now();
//碼錶設定初始時間//
let timer={a:0,b:0,c:0,d:0,e:0,f:0,fun:0,cha:0};
let ifDown = false;
let ifBreak = false;
let score = 0;
//先設定//
let player = {
  x: 100,
  y: 600,
  width: 40,
  height: 40
};
//玩家預設位子//
let bullet = [];
let breakBullet = [];
let boss = {
  x:window.innerWidth/2-100,
  y:200
};
let mid = {
  x: boss.x+100,
  y: 280
};
let bulleta = [];
let playerPx = window.screen.width / 2 - player.width / 2;
let canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = 1000;
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "#ffffff";
ctx.lineWidth = 2;
main = ctx.strokeRect(playerPx, player.y, player.width, player.height);
console.log(window.innerWidth)
console.log(window.innerHeight)
ctx.beginPath(window.innerWidth, 200);
ctx.moveTo(window.innerWidth, 200);
ctx.lineTo(window.innerWidth+50, 120);
ctx.lineTo(window.innerWidth+100, 120);
ctx.lineTo(window.innerWidth+50, 200);
ctx.lineTo(window.innerWidth-50, 280);
ctx.lineTo(window.innerWidth-100, 280);
ctx.closePath();
ctx.lineWidth = 2;
ctx.stroke();
//畫出基礎物件//
function spawnB(x, y, vx, vy, type,ifSplitA,ifSplitB,) {
  bullet.push({ x, y, vx, vy, type,ifSplitA,ifSplitB,life:0});
};
function sniperB(type){
  let sniperspeed=7;
  let sx=player.x+player.width/2-mid.x;
  let sy=player.y+player.height/2-mid.y;
  let st=Math.sqrt(sx*sx+sy*sy);
  let sniperX=(sx/st)*sniperspeed;
  let sniperY=(sy/st)*sniperspeed;
  spawnB(mid.x,mid.y,sniperX,sniperY,"enemy",false);
};
canvas.addEventListener("pointerdown", function() {
  ifDown = true;
});
canvas.addEventListener("pointerup", function() {
  ifDown = false;
});
//先判斷是否落指//
  canvas.addEventListener("pointermove", function(e) {
    player.x = e.clientX;
    player.y = e.clientY;
  });
function draw() {
  if(ifOver){
    document.getElementById("die").style.display="block";
    return;
  };
  requestAnimationFrame(draw);
  let now=performance.now();
  let ifFps=now-when;
  if(ifFps<fpsTime){
    return;
    //直接跳過//
  };
  when=now;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath(360, 200);
  ctx.moveTo(boss.x, boss.y);
  ctx.lineTo(boss.x+50, boss.y-80);
  ctx.lineTo(boss.x+150, boss.y-80);
  ctx.lineTo(boss.x+200, boss.y);
  ctx.lineTo(boss.x+150, boss.y+80);
  ctx.lineTo(boss.x+50, boss.y+80);
  ctx.closePath();
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.strokeRect(player.x, player.y, 40, 40);
  ctx.strokeStyle = "#ffffff";
  
  timer.a++;
  timer.b++;
  timer.cha++;
  //以下使用計時器創造子彈//
  if(score>=0 && score <=4000){
    if (timer.a >= 50) {
    timer.a = 0;
    spawnB(mid.x, mid.y, 0, 5, "enemy", false, false);
  };
  }
  if (score>=1000 && score<=1500){
    timer.c++;
    grades = 1;
    if (timer.c >= 35) {
    timer.c = 0;
    sniperB("enemy");
    };
  };
  if (2300 >=score&&score >= 1600) {
    timer.c++;
    grades = 2;
    if (timer.c >= 30) {
      timer.c = 0;
      sniperB("enemy");
    };
  };
  if (score >= 2500 ) {
    timer.c++;
    grades = 3;
    if (timer.c >= 25) {
      timer.c = 0;
      sniperB("enemy");
    };
  };
  if(score >=2200){
    timer.d++;
    grades = 3;
    if(timer.d >= 1){
      timer.d=0;
      spawnB(mid.x,mid.y,3,1,"enemy",false,false);
      spawnB(mid.x,mid.y,-3,1,"enemy",false,false);
    }
  }
  //受擊反擊系統//
  let backAttack = 0;
  backAttack=score%300;
  if(backAttack==0&&score>=2500&&ifbackAttack == true){
    spawnB(mid.x,mid.y,0,2,"enemy",false,false);
    spawnB(mid.x,mid.y,2,2,"enemy",false,false);
    spawnB(mid.x,mid.y,4,2,"enemy",false,false);
    spawnB(mid.x,mid.y,-2,2,"enemy",false,false);
    spawnB(mid.x,mid.y,-4,2,"enemy",false,false);
    
    ifbackAttack = false;
  };
  if(backAttack != 0){
    ifbackAttack = true;
  }
  if(score>=3500){
    
  };
  if(score>=4000){
    timer.e++;
    if(timer.e>=100){
      timer.e=0;
      spawnB(mid.x,mid.y,2,5,"enemy",true,false);
      spawnB(mid.x,mid.y,-2,5,"enemy",true,false);
      spawnB(mid.x,mid.y,1,5,"enemy",false,true);
      spawnB(mid.x,mid.y,-1,5,"enemy",false,true);
    };
  };
  if(score >=5000){
    timer.f++;
    if(timer.f>=150){
      timer.f=0;
      spawnB(mid.x,mid.y,0,8,"enemy",true,true);
    }
  }
  if(score>=8000){
    timer.fun++;
    if(timer.fun >= 80){
      timer.fun=0;
      fun = Math.floor(Math.random()*100);
      if(fun>=1&&fun<=33){
        spawnB(mid.x,mid.y,Math.floor(Math.random()*6),Math.floor(Math.random()*6),"enemy",true,false);
      }
      else if(fun>33&&fun<=66){
        spawnB(mid.x,mid.y,Math.floor(Math.random()*6),Math.floor(Math.random()*6),"enemy",false,true);
      }
      else if(fun>66&&fun<=99){
        spawnB(mid.x,mid.y,Math.floor(Math.random()*6),Math.floor(Math.random()*6),"enemy",true,true);
      }
      else{
        spawnB(mid.x,mid.y,Math.floor(Math.random()*6),Math.floor(Math.random()*6),"enemy",true,false);
        spawnB(mid.x,mid.y,Math.floor(Math.random()*6),Math.floor(Math.random()*6),"enemy",false,true);
        spawnB(mid.x,mid.y,Math.floor(Math.random()*6),Math.floor(Math.random()*6),"enemy",true,true);
      };
    }
  }
  if(timer.cha>=30){
    timer.cha = 0;
    spawnB(player.x+player.width/2,player.y-player.height,0,-20,"player",false,false);
  };
  //再使用迴圈真的畫出子彈//
  for (let i = 0; i < bullet.length; i++) {
    let b = bullet[i];
    b.x += b.vx;
    b.y += b.vy;
    ctx.beginPath();
    ctx.arc(b.x, b.y, 5, 0, Math.PI * 2);
    if (b.type == "player") {
      ctx.fillStyle = "#ffffff";
    }
    else if (b.ifSplitA && b.ifSplitB) {
      ctx.fillStyle = "#00ff00";
    }
    else if (b.ifSplitA) {
      ctx.fillStyle = "#0000ff";
    }
    else if (b.ifSplitB){
      ctx.fillStyle = "#ff0000";
    }
    else {
      ctx.fillStyle = "#ffffff";
    };
    ctx.fill();
    if(b.type==="enemy"){
      if(b.x > player.x&&b.x < player.x+player.width&&b.y > player.y&&b.y < player.y+player.height){
        bullet.splice(i,1);
        i--;
        health--;
        if(health<0){
          console.log("stop")
          ifOver = true;
        };
      };
      if(b.ifSplitA){
        b.life++;
        if(b.life==50){
          b.life = 0;
          bullet.splice(i,1);
          i--;
          //分裂//
          spawnB(b.x,b.y,8,0,"enemy",false,false);
          spawnB(b.x,b.y,0,8,"enemy",false,false);
          spawnB(b.x,b.y,-8,0,"enemy",false,false);
          spawnB(b.x,b.y,0,-8,"enemy",false,false);
          
          continue;
        };
      };
      if (b.ifSplitB) {
        b.life++;
        if (b.life == 70) {
          b.life = 0;
          bullet.splice(i, 1);
          i--;
          //分裂//
          spawnB(b.x, b.y, 8, 8, "enemy", false, false);
          spawnB(b.x, b.y, -8, 8, "enemy", false, false);
          spawnB(b.x, b.y, 8, -8, "enemy", false, false);
          spawnB(b.x, b.y, -8, -8, "enemy", false, false);
          
          continue;
        };
      };
      if(b.ifSplitA && b.ifSplitB){
        b.life++;
        if(b.life >= 60){
          b.life = 0;
          bullet.splice(i,1);
          i--;
          
          spawnB(b.x, b.y, 6, 6, "enemy", false, false);
          spawnB(b.x, b.y, -6, 6, "enemy", false, false);
          spawnB(b.x, b.y, 6, -6, "enemy", false, false);
          spawnB(b.x, b.y, -6, -6, "enemy", false, false);
          spawnB(b.x, b.y, 8, 0, "enemy", false, false);
          spawnB(b.x, b.y, 0, 8, "enemy", false, false);
          spawnB(b.x, b.y, -8, 0, "enemy", false, false);
          spawnB(b.x, b.y, 0, -8, "enemy", false, false);
          
          continue;
        }
      }
    };
    if (b.type === "player") {
      if (b.x > boss.x && b.x < boss.x + 200 &&
        b.y > boss.y - 80 && b.y < boss.y + 80) {
      bullet.splice(i, 1);
      i--;
      score = score +100
        console.log("nice")
        document.getElementById("scores").innerText="your score="+score;
        document.getElementById("grade").innerText="LeveL-"+grades;
      };
    };
  };
  for (let i = 0; i < bullet.length; i++) {
  let b = bullet[i];

  // 檢查是否超出邊界（上下左右都要判斷）
  if (b.y < 0 || b.y > canvas.height || b.x < 0 || b.x > canvas.width) {
    bullet.splice(i, 1); 
    i--; 
  };
};
};
draw();
//啟動//
