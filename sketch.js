var database ,dog,dog1,dog2
var position
var feed,add
var foodobject;
var lastfeedH;
var lastfeedM;
var state;

function preload()
{
  //loading  images 
  dogimg1 = loadImage("dogImg.png")
  dogimg2 = loadImage("dogImg1.png")
  dogimg3 = loadImage("Lazy.png")
  wash = loadImage("Wash Room.png")
  run = loadAnimation("dogImg1.png","runningLeft.png")
}

function setup() {
	createCanvas(900, 600);
  database = firebase.database();

  foodobject=new Food()
  dog = createSprite(280,350,10,10);
  dog.addAnimation("dogImg1.png",dogimg1);
  dog.scale=0.6;
  
var dogo = database.ref('Food');
dogo.on("value", readPosition, showError);



add = createButton("Add Food")
add.position(400,100)
add.mousePressed(AddFood)

nam = createInput("")
nam.position(100,700)
nam.size(160,20)

feed = createButton("  Feed "+nam.value())
feed.position(500,100)
feed.mousePressed(FeedDog)

bed=createButton("Take Nap")
bed.position(570,100)
bed.mousePressed(sleep)

play=createButton("Run And Play")
play.position(670,100)
play.mousePressed(Play)

} 



function draw(){

background("lightgreen");
 foodobject.display()

 drawSprites();
 text("your dog name:",80,100);
fill(255,255,254);
textSize(30);
drawSprites();
lastfeedH = database.ref('FeedTimeH');
lastfeedH.on("value",function(data){
  lastfeedH=data.val();
})
lastfeedM = database.ref('FeedTimeM');
lastfeedM.on("value",function(data){
  lastfeedM=data.val();
})
if(lastfeedH!=undefined && lastfeedM!=undefined)
{
if(lastfeedH>=12){
  if(lastfeedM>9){
  text("Last Feed Time:  "+"0"+lastfeedH%12+":"+lastfeedM+" PM",450,50);
  }
  else if(lastfeedM<=9){
    text("Last Feed Time:  "+"0"+lastfeedH%12+":"+"0"+lastfeedM+" PM",450,50);
  }

}
else if(lastfeedH==0){
  text("Last Feed Time:  "+"12:00 PM",450,50)

}
else{
  if(lastfeedM>9){
  text("Last Feed Time:  "+lastfeedH+":"+lastfeedM+" AM",450,50);
  }
  else if(lastfeedM<=9){
    text("Last Feed Time:  "+lastfeedH+":"+"0"+lastfeedM+" AM",450,50);
  }
}
if(minute()-lastfeedM>10){
  dog.addAnimation("Garden.png",dogimg1);
}
}
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)

}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
 
  dog.addAnimation("dogImg1.png",dogimg1)
  dog.scale=0.6
position++
if(position<26){
database.ref('/').update({
  Food:position
}
)
}


}
function FeedDog(){
 
dog.addAnimation("dogImg1.png",dogimg2);
dog.scale=0.5;
if(happi!="Amazing"){
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   
   FeedTimeH:hour(),
   FeedTimeM:minute()

   
 })
}
happi="Amazing"
}
function Bath() {
  dog.addAnimation("dogImg1.png",wash);
  dog.scale=0.6;
}
function Play() {
  dog.addAnimation("dogImg1.png",run);
  dog.scale=0.6;
}
function sleep() {
  dog.addAnimation("dogImg1.png",dogimg3);
  dog.scale=0.6;
}