var  dog, happyDog, database, foodS, foodStock;
var dogSprite, happyDogSprite;
function preload()
{
  dog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
	createCanvas(500, 500);
  dogSprite = createSprite(250, 250, 25, 25);
  dogSprite.addImage(dog);
  dogSprite.scale = .2;
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

}


function draw() {  
  background(0, 120, 180);
  text("Food Remaining: " + foodS, 200, 200);
  if(keyWentDown(UP_ARROW)){  
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }
  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x > 0){
  database.ref('/').update({
    Food: x - 1
  });
}
}

