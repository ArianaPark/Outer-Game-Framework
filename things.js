class SpaceThing{
  constructor(loc){
    this.loc = loc;
  }

  draw(){
    ctx.save();
    ctx.translate(canvas.width/2,canvas.height/2);
    let theta = rocket.vel.getDirection();
    ctx.rotate(-theta);
    ctx.beginPath();
    ctx.arc(this.loc.x-rocket.pos.x,this.loc.y-rocket.pos.y,5,0,Math.PI*2,true);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore();
  }
}

class Rocket{
  constructor(pos){
    this.pos = pos;
    this.vel = new Vector(0.00001,0.00001);
    this.scale = 1;
  }

  accelerate(){
    this.vel.setMagnitude(this.vel.getMagnitude()+1);
  }

  slowdown(){
    if(this.vel.getMagnitude()>1){
      this.vel.setMagnitude(this.vel.getMagnitude()-1);
    }
  }


  turnLeft(){
    let dir = this.vel.getDirection();
    let newDir = dir - 0.2;
    this.vel.setDirection(newDir);
  }

  turnRight(){
    let dir = this.vel.getDirection();
    let newDir = dir + 0.2;
    this.vel.setDirection(newDir);
  }

  zoomIn(){ //problem with the divide by two, has to change with each scale
    ctx.save();
    this.scale = this.scale/2;
    ctx.translate(-canvas.width*this.scale,-canvas.height*this.scale);
    ctx.scale(2,2);
    ctx.restore();
    console.log("zin");
  }

  zoomOut(){ //not working
    ctx.save();
    this.scale = this.scale*2;
    ctx.translate(canvas.width/4*this.scale,canvas.height/4*this.scale);
    ctx.scale(0.5,0.5);
    ctx.restore();
    console.log("zout");
  }

  draw(){
    ctx.beginPath();
    // ctx.moveTo(canvas.width/2,canvas.height/2-10);
    // ctx.lineTo(canvas.width/2+5,canvas.height/2+10);
    // ctx.lineTo(canvas.width/2-5,canvas.height/2+10);
    ctx.moveTo(canvas.width/2+10,canvas.height/2);
    ctx.lineTo(canvas.width/2-10,canvas.height/2+5);
    ctx.lineTo(canvas.width/2-10,canvas.height/2-5);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  update(){
    this.pos.add(this.vel);
    this.draw();
  }
}


document.addEventListener("keypress", keyPressed);

function keyPressed(event){ //for using keys to maneuver
  let key = event.keyCode;
  if(key==87 || key==119){ //w
    rocket.accelerate();
    console.log("w");
  }
  if(key==83 || key==115){ //s
    rocket.slowdown();
    console.log("s");
  }
  if(key==65 || key==97){ // <--, a
    rocket.turnLeft();
    console.log("a");
  }
  if(key==86 || key==100){ //-->, d
    rocket.turnRight();
    console.log("d");
  }
  if(key==69 || key==101){ // e
    rocket.zoomIn();
    console.log("+");
  }
  if(key==81 || key==113){ // q
    rocket.zoomOut();
    console.log("-");
  }
}
