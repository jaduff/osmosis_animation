window.onload = function(){
  //var Particle = require('particle.js');
  var ParticleClass = document.createElement('script');
  ParticleClass.setAttribute('src','./particle.js');
  document.head.appendChild(ParticleClass);

    //method to render the particle
    render = function(c, particle){
      c.fillStyle = "blue";
      c.beginPath();
      c.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false);
      c.fill();
      particle.x = particle.x + particle.xVector;
      particle.y = particle.y + particle.yVector;
      if ( (particle.x <= (0+particle.radius)) || (particle.x >= (500-particle.radius)) ) {
        particle.xVector = particle.xVector * -1;
      }
      if ( (particle.y < (0+particle.radius)) || (particle.y > (500-particle.radius)) ){
        particle.yVector = particle.yVector * -1;
      }
    }

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
    render(c, particlearray[i]);
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
