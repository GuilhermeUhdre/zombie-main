var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie
var zombieGroup

var estrela
var estrela2
var estrelaGroup
var estrela2Group
var score = 0
var life = 3
var bullets = 70
var estrelass = 0
var heart1, heart2, heart3
var coletarEstrela
var Win

var gameState = "fight"

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadAnimation("assets/Zombie1.png","assets/Zombie2.png","assets/Zombie3.png")
  heart1img = loadImage("assets/heart_1.png")
  heart2img = loadImage("assets/heart_2.png")
  heart3img = loadImage("assets/heart_3.png")
  bulletImg = loadImage("assets/bullet1.png")
  estrelaImg = loadImage("assets/estrela.png")
  estrela2Img = loadImage("assets/estrela2.png")

  // DEAD
  deadImg = loadAnimation("assets/Dead.png","assets/Dead1.png","assets/Dead2.png")
  deadImg.playing=true
  deadImg.looping= false
  lose = loadSound("assets/lose.mp3")
  explosionSound = loadSound("assets/explosion.mp3")
  coletarEstrela = loadSound("assets/coletarEstrela.mp3")
  WinSound = loadSound("assets/ganhar.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
 /* bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1 */
  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

  heart1 = createSprite(displayWidth-100,40,20,20)
  heart1.visible = false
  heart1.addImage("heart1",heart1img)
  heart1.scale = 0.4
  heart2 = createSprite(displayWidth-150,40,20,20)
  heart2.visible = false
  heart2.addImage("heart2",heart2img)
  heart2.scale = 0.4
  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage("heart3",heart3img)
  heart3.scale = 0.4

   zombieGroup = new Group()
   bulletGroup = new Group()
   estrelaGroup = new Group()
   estrela2Group = new Group()

botomGround = createSprite(200,height/2,800,20)
botomGround.visible = false
topGround = createSprite(200,height,800,20)
botomGround.visible = false

}

function draw() {
  background(0); 

  image(bgImg,0,0,width,height)

if (gameState === "fight"){

  if(life<3 && life>0){
    if(estrelass === 2 ){
      life +=1
    }
  }
  //obs: prof não funcionou, então apaguei o "&&" para mostrar pra minha mãe o jogo

if(player.y>topGround.y){
  player.y = topGround.y-1
  
}
if(player.y<botomGround.y){
  player.y = botomGround.y+1
  
}

  if(life ===3){
    heart1.visible = false
    heart2.visible = false
    heart3.visible = true
  }
  if(life ===2){
    heart1.visible = false
    heart2.visible = true
    heart3.visible = false
  }
  if(life ===1){
    heart1.visible = true
    heart2.visible = false
    heart3.visible = false
  }

  if(life === 0){
    gameState = "lost"
    heart1.visible = false
  }
  if ( score ===100){
    gameState = "won"
    WinSound.play()
    }
  
    if(score === 26){

    }
 
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }
  if(keyDown("LEFT_ARROW")||touches.length>0){
    player.x = player.x-10
  }
  if(keyDown("RIGHT_ARROW")||touches.length>0){
   player.x = player.x+10
  }
  

  if(keyWentDown("space")){
 
    player.addImage(shooter_shooting)
    bullet = createSprite(player.x,player.y - 30,20,10)
    bullet.addImage(bulletImg)
    bullet.scale =0.1
    bullet.velocityX = 20
    bulletGroup.add(bullet)
    bullets = bullets-1
    explosionSound.play();
  }
  
  else if(keyWentUp("space")){
    player.addImage(shooterImg)
  }
  if(bullets === -1){
      gameState = "bullet"
      lose.play();
    }
   //destrua o zumbi quando a bala o tocar e aumente a pontuação
  // if(zombieGroup.isTouching(bulletGroup)){
  //   for(var i =0; i<zombieGroup.length; i++){
  //     if(zombieGroup[i].isTouching(bulletGroup)){
  //       zombieGroup[i].destroy()
  //       for (var i = 0; i<bulletGroup.length; i++){
  //         bulletGroup[i].destroy()
  //        score = score+2
          
  //       }
  //     }
  //   }
  // } 
  zombieGroup.overlap(bulletGroup,(zombie,bullet)=>{
//muda a animação 
    zombie.changeAnimation("dead")
// destroi as balas
    bulletGroup.destroyEach()
// da o som de explosão 
    explosionSound.play();
 // aumenta a pontuacao
    score = score+2  
// para o zombie 
    zombie.velocityX=0
    zombie.setCollider("rectangle",1300,1300,0,0)
// sair a imagem depois de 1 segundo
    setTimeout(()=>{
      zombie.destroy()
    }, 1000) 
  

})
/*estrelaouyGroup.overlap(bulletGroup,(estrela,bullet)=>{
      bulletGroup.destroyEach()
      estrelakhg.velocityX=0
      estrela.setCollider("rectangle",1300,1300,0,0)
      coletarEstrela.play()
      setTimeout(()=>{
        estrela.destroy()
      }, 1000) 
  })*/

  if(estrelaGroup.isTouching(player)){

    for (var i = 0; i<estrelaGroup.length; i++){

      if(estrelaGroup[i].isTouching(player)){
        estrelaGroup[i].destroy()
        coletarEstrela.play()
        estrelass +=1
      }

    }

  }
  if(estrela2Group.isTouching(player)){

    for (var i = 0; i<estrela2Group.length; i++){

      if(estrela2Group[i].isTouching(player)){
        estrela2Group[i].destroy()
        coletarEstrela.play()
        score +=10
      }

    }

  }
  //reduza a vida e destrua o zumbi quando o jogador o tocar
    if(zombieGroup.isTouching(player)){
      lose.play();
    
      for(var i =0; i<zombieGroup.length; i++){
        if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy()
        life -=1
        }

      }
    }
    //chame a função para gerar zumbis
    gerarZombie()
    gerarEstrela()
    gerarEstrelaGigante()
  }
drawSprites();


if(gameState === "lost"){
  textSize(130) 
  fill("red")
  stroke("yellow")
  textFont('Georgia');
  text("Você perdeu!",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
else if(gameState ==="won"){
  textSize(100)
  fill("yellow")
  stroke("red")
  textFont('Georgia');
  text("Você ganhou",400,400)
  zombieGroup.destroyEach()
  player.destroy()
  
}
else if(gameState === "bullet"){
  textSize(100) 
  fill("white")
  stroke("yellow")
  textFont('Georgia');
  text("Você não tem mais bala!",470,400)
  zombieGroup.destroyEach()
  player.destroy()
  bulletGroup.destroyEach()
}


textSize(35)
fill("white") 
textFont('Georgia');
text("Balas = " + bullets,displayWidth-180,displayHeight/2-190)
text("Pontuação = " + score,displayWidth-180,displayHeight/2-240) 
text("Vidas = " + life,displayWidth-180,displayHeight/2-290)
text("Estrelas = " + estrelass,displayWidth+80,displayHeight/2-240)
}
function gerarZombie(){

  if(frameCount%60 ===0){

  zombie = createSprite(width,random(350,800),40,40)
  zombie.addAnimation("zombie",zombieImg)
  zombie.velocityX = -8
  zombie.addAnimation("dead",deadImg)
  // zombie.debug = true
  zombie.scale = 0.4

  zombie.lifetime = 400
  zombieGroup.add(zombie)
  }

  
}

function gerarEstrela(){

  if(frameCount%100 ===0){

    /*estrela = createSprite(width,random(350,800),40,40)
    estrela.addAnimation("estrela",)
    estrela.scale = 0.6
    estrela.velocityX = -15*/
    estrela = createSprite(width,random(350,800),40,40)
    estrela.addImage("estrela",estrelaImg)
    estrela.velocityX = -8
    
    estrela.scale = 0.15
  
    estrela.lifetime = 400
    estrelaGroup.add(estrela)
    }
  }
function gerarEstrelaGigante(){
  if(score===20){
estrela2 = createSprite(width,random(350,800),40,40)
estrela2.addImage("estrela2",estrela2Img)

    estrela2.visible = true
    estrela2.velocityX = -0.10
    estrela2Group.add(estrela2)
  }

}
