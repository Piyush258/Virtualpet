//Create variables here
var d, happyDog, database, foodS, foodStock;
var Dog;

function preload()
{
  //load images here
  d = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  Dog = createSprite(250,250,10,10);
  Dog.addImage("dog",d);
  Dog.scale = 0.25;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  
}


function draw() {  
  background(46, 139, 87);
  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);  
  }
  if (keyWentUp(UP_ARROW)){
    Dog.addImage("dog", happyDog);
  }
  drawSprites();
  //add styles here
  textSize(20);
  fill("blue");
  stroke("black");
  strokeWeight(1);
  if (foodS !== undefined){  
  text("Press UP_ARROW to feed your pet!",90,125);
  text("Food remaining :"+foodS,90,100);
}
}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if (x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



