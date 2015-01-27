//module.exports = function Particle(){
function Particle(){
  this.speed = 3;
  plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  this.x = Math.floor(Math.random() * 500 + 1),  this.y = Math.floor(Math.random() * 500 + 1);
  this.xVector = Math.floor((Math.random() * this.speed*100) + 1)*plusOrMinus/100;
  this.yVector = Math.sqrt((this.speed*this.speed)-(this.xVector*this.xVector))*plusOrMinus;
  this.radius = 10;
  this.getNextX = function(){
    return (this.x + this.xVector);
  }

  this.getNextY = function(){
    return (this.y + this.yVector);
  }

  this.getVectorTheta = function(){
    //javascript only works in radians, so any result will be in rad. Multiple by 180/pi to convert to degrees.
    var theta = (Math.atan2(this.yVector, this.xVector))*(180/Math.PI);
    return theta;
  }

  this.getCollisionPhi = function(particle2){
    var phi = Math.atan2((this.y - particle2.y),(this.x - particle2.x))*(180/Math.PI);
    return phi;
  }

  this.resolveConflict = function(particle2){
    this.xVector = ((this.speed * Math.cos(this.getVectorTheta() - this.getCollisionPhi(particle2)) * (this.radius - particle2.radius) + (2 * particle2.radius * particle2.speed * Math.cos(particle2.getVectorTheta() - this.getCollisionPhi(particle2)))) / (this.radius + particle2.radius)) * Math.cos(this.getCollisionPhi(particle2)) + this.speed * (Math.sin(this.getVectorTheta() - this.getCollisionPhi(particle2)) * Math.cos(this.getCollisionPhi(particle2) + (Math.PI / 2)));
    this.yVector = ((this.speed * Math.cos(this.getVectorTheta() - this.getCollisionPhi(particle2)) * (this.radius - particle2.radius) + (2 * particle2.radius * particle2.speed * Math.cos(particle2.getVectorTheta() - this.getCollisionPhi(particle2)))) / (this.radius + particle2.radius)) * Math.sin(this.getCollisionPhi(particle2)) + this.speed * (Math.sin(this.getVectorTheta() - this.getCollisionPhi(particle2)) * Math.sin(this.getCollisionPhi(particle2) + (Math.PI / 2)));
  }

};
