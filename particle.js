module.exports = function Particle(){
  this.speed = 3;
  plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  this.x = Math.floor((Math.random() * 500-(this.radius*3)) + 1+(this.radius*3)),  this.y = Math.floor((Math.random() * 500-(this.radius*3)) + 1+(this.radius*3));
  this.xVector = Math.floor((Math.random() * this.speed*100) + 1)*plusOrMinus/100;
  this.yVector = Math.sqrt((this.speed*this.speed)-(this.xVector*this.xVector))*plusOrMinus;
  this.getNextX = function(){
    return (this.x + this.xVector);
  }

  this.getNextY = function(){
    return (this.y + this.yVector);
  }

};
