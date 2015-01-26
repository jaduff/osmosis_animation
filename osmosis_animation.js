window.onload = function(){

  var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

  function particle(){
    this.radius = 5; //size of particle
    this.x = Math.floor((Math.random() * 500-(this.radius+3)) + 1+(this.radius+3)),  this.y = Math.floor((Math.random() * 500-(this.radius+3)) + 1+(this.radius+3));
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
      if ( (this.x <= (0+this.radius)) || (this.x >= (500-this.radius)) ) {
        this.xVector = this.xVector * -1;
      }
      if ( (this.y < (0+this.radius)) || (this.y > (500-this.radius)) ){
        this.yVector = this.yVector * -1;
      }
    }

  };

//Set the stage
  var canvas  = document.getElementById("animation"),
  c = canvas.getContext("2d");

//instantiate new particle
var particlearray = new Array();
  for (i=0; i<10; i++){
    var circle = new particle();
    particlearray[particlearray.length] = circle;
  }

//Animation - each frame is 30ms
setInterval(function(){
  //Draw the background
  c.fillStyle = "white";
  c.fillRect(0,0,canvas.width, canvas.height);
  c.strokeStyle="black";
  c.strokeRect(0,0,c.canvas.width, canvas.height);

  for (i=0; i < particlearray.length; i++){
    particlearray[i].render(c);
  }
  for (i=0; i < particlearray.length; i++){
    for (j=0; j < particlearray.length; j++){
      //Bounding box collision detection
      if ( (j != i) && (particlearray[i].x + particlearray[i].radius + particlearray[j].radius > particlearray[j].x
        && particlearray[i].x < particlearray[j].x + particlearray[i].radius + particlearray[j].radius)
        && (particlearray[i].y + particlearray[i].radius + particlearray[j].radius > particlearray[j].y
          && particlearray[i].y < particlearray[j].y + particlearray[i].radius + particlearray[j].radius)){
            //fine collision detection
            var distance = Math.sqrt(
              ((particlearray[i].x - particlearray[j].x) * (particlearray[i].x - particlearray[j].x))
              + ((particlearray[i].y - particlearray[j].y) * (particlearray[i].y - particlearray[j].y)) );
              if (distance < (particlearray[i].radius + particlearray[j].radius) )
              {
                //collision detected
                particlearray[i].xVector = (particlearray[i].xVector * (particlearray[i].radius - particlearray[j].radius) + (2 * particlearray[j].radius * particlearray[j].xVector)) / (particlearray[i].radius + particlearray[j].radius);
                particlearray[i].yVector = (particlearray[i].yVector * (particlearray[i].radius - particlearray[j].radius) + (2 * particlearray[j].radius * particlearray[j].yVector)) / (particlearray[i].radius + particlearray[j].radius);
                particlearray[j].xVector = (particlearray[j].xVector * (particlearray[j].radius - particlearray[i].radius) + (2 * particlearray[i].radius * particlearray[i].xVector)) / (particlearray[j].radius + particlearray[i].radius);
                particlearray[j].yVector = (particlearray[j].yVector * (particlearray[j].radius - particlearray[i].radius) + (2 * particlearray[i].radius * particlearray[i].yVector)) / (particlearray[j].radius + particlearray[i].radius);
                particlearray[i].x = particlearray[i].x + particlearray[i].xVector;
                particlearray[i].y = particlearray[i].y + particlearray[i].yVector;
                particlearray[j].x = particlearray[j].x + particlearray[j].xVector;
                particlearray[j].y = particlearray[j].y + particlearray[j].yVector;
                particlearray[i].colour = "red";
              }
            }
          }
        }
      }, 30);

};
