window.onload = function(){

  var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

  function particle(){
    this.radius = 20; //size of particle
    this.x = Math.floor((Math.random() * 500-(this.radius*3)) + 1+(this.radius*3)),  this.y = Math.floor((Math.random() * 500-(this.radius*3)) + 1+(this.radius*3));
    this.nextX = this.x + this.xVector, this.nextY =this.y + this.yVector;
    this.type = "water"; //Type of particle - water, solute
    this.colour = "blue"; //Should be dependent on the particle type
    this.speed = 3;
    this.xVector = Math.floor((Math.random() * this.speed*100) + 1)*plusOrMinus/100;
    this.yVector = Math.sqrt((this.speed*this.speed)-(this.xVector*this.xVector))*plusOrMinus;
    this.scalar = Math.sqrt((this.x * this.x) + (this.y * this.y));

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

    this.findTheta = function(){
      if ( this.x > this.x + this.xVector){
          var theta = Math.tan(this.xVector / this.yVector);
        } else {
          var theta = Math.tan (this.yVector / this.xVector);
        }
        return theta;
      }

      this.findPhi = function(particle2){
        if (this.x > particle2.x){
          var phi = Math.tan ((this.y - particle2.y) / (this.x - particle2.x));
        } else {
          var phi = Math.tan ((this.x - particle2.x) / (this.y - particle2.y));
        }
        return phi;
      }

    this.resolveConflict = function(particle2){
      this.xVector = ((this.scalar * Math.cos(this.findTheta() - this.findPhi(particle2)) * (this.radius - particle2.radius) + 2 * particle2.radius * particle2.scalar * Math.cos(particle2.findTheta() - this.findPhi(particle2))) / (this.radius - particle2.radius)) * Math.cos(this.findPhi(particle2)) + this.scalar * (Math.sin(this.findTheta() - this.findPhi(particle2)) * Math.cos(this.findPhi(particle2) + (Math.PI / 2)));
      this.xVector = ((this.scalar * Math.cos(this.findTheta() - this.findPhi(particle2)) * (this.radius - particle2.radius) + 2 * particle2.radius * particle2.scalar * Math.cos(particle2.findTheta() - this.findPhi(particle2))) / (this.radius - particle2.radius)) * Math.sin(this.findPhi(particle2)) + this.scalar * (Math.sin(this.findTheta() - this.findPhi(particle2)) * Math.sin(this.findPhi(particle2) + (Math.PI / 2)));
    }

  };

//Set the stage
  var canvas  = document.getElementById("animation"),
  c = canvas.getContext("2d");

//instantiate new particle
var particlearray = new Array();
  for (i=0; i<3; i++){
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
            particlearray.colour = "red";
            //fine collision detection
            var distance = Math.sqrt(
              ((particlearray[i].x - particlearray[j].x) * (particlearray[i].x - particlearray[j].x))
              + ((particlearray[i].y - particlearray[j].y) * (particlearray[i].y - particlearray[j].y)) );
              if (distance < (particlearray[i].radius + particlearray[j].radius) )
              {
                //collision detected
                particlearray[i].resolveConflict(particlearray[j]);
                particlearray[j].resolveConflict(particlearray[i]);


                  particlearray[i].colour = "red";
              }
            }
          }
        }
      }, 30);

};
