window.onload = function(){

  var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

  function particle(){
    this.x = Math.floor((Math.random() * 500) + 1),  this.y = Math.floor((Math.random() * 500) + 1);
    this.radius = 5; //size of particle
    this.type = "water"; //Type of particle - water, solute
    this.colour = "blue"; //Should be dependent on the particle type
    this.speed = 10;
    this.xVector = Math.floor((Math.random() * 10) + 1)*plusOrMinus;
    this.yVector = Math.sqrt((this.speed*this.speed)-(this.xVector*this.xVector))*plusOrMinus;

    //method to render the particle
    this.render = function(c){
      c.fillStyle = this.colour;
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fill();
      this.x = this.x + this.xVector;
      this.y = this.y + this.yVector;
    }
  };

//Set the stage
  var canvas  = document.getElementById("animation"),
  c = canvas.getContext("2d");

//instantiate new particle
  var circle = new particle();

//Animation - each frame is 30ms
setInterval(function(){
  //Draw the background
  c.fillStyle = "white";
  c.fillRect(0,0,canvas.width, canvas.height);
  c.strokeStyle="black";
  c.strokeRect(0,0,c.canvas.width, canvas.height);

  circle.render(c);
}, 30);

};
