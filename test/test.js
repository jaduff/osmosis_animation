var assert = require("assert"); // node.js core module
var Particle = require('../particle.js');  // our module

describe('Particle', function(){
  describe('this.x', function(){

    it('property should be a number', function(){
      var P = new Particle();
      assert.equal(typeof P, 'object');
      assert.equal(typeof P.x, 'number');
    })
    it('property should get/set correctly (return 1)', function(){
      var P = new Particle();
      P.x = 1;
      assert.equal(P.x, 1);
    })
    it('property should get/set correctly (return -5)', function(){
      var P = new Particle();
      P.x = 5;
      assert.equal(P.x, 5);
    })
  })

  describe('this.y', function(){
    it('property should be a number', function(){
      var P = new Particle();
      assert.equal(typeof P.y, 'number');
    })
    it('property should get/set correctly (return 1)', function(){
      var P = new Particle();
      P.y = 1;
      assert.equal(P.y, 1);
    })
    it('property should get/set correctly (return -5)', function(){
      var P = new Particle();
      P.y = -5;
      assert.equal(P.y, -5);
    })
  })

  describe('this.speed', function(){
    it('property should be a number', function(){
      var P = new Particle();
      assert.equal(typeof P.speed, 'number');
    })
  })

  describe('this.xVector', function(){
    it('property should be a number', function(){
      var P = new Particle();
      assert.equal(typeof P.xVector, 'number');
    })
    it('property should get/set correctly (return 1)', function(){
      var P = new Particle();
      P.xVector = 1;
      assert.equal(P.xVector, 1);
    })
    it('property should get/set correctly (return -5)', function(){
      var P = new Particle();
      P.xVector = -5;
      assert.equal(P.xVector, -5);
    })
  })

  describe('this.yVector', function(){
    it('property should be a number', function(){
      var P = new Particle();
      assert.equal(typeof P.yVector, 'number');
    })
    it('property should get/set correctly (return 1)', function(){
      var P = new Particle();
      P.yVector = 1;
      assert.equal(P.yVector, 1);
    })
    it('property should get/set correctly (return -5)', function(){
      var P = new Particle();
      P.yVector = -5;
      assert.equal(P.yVector, -5);
    })
  })

  describe('vector', function(){
    it('should equal speed', function(){
      var P = new Particle();
      assert.equal(P.speed, Math.round(Math.sqrt((P.xVector * P.xVector) + (P.yVector * P.yVector))*100)/100);
    })
  })

  describe('next position', function(){
    it('should be resulting from current position + vector', function(){
      var P = new Particle();
      P.x = 5;
      P.y = 5;
      P.xVector = 5;
      P.yVector = 5;
      assert.equal(P.getNextX(), 10);
      assert.equal(P.getNextY(), 10);
    })
  })

  describe('mathematical properties of position', function(){
    describe ('theta - angle formed by xVector and yVector from current position', function(){
      var P = new Particle();
      P.xVector = 4;
      P.yVector = 5;
      assert.equal(Math.round(P.getVectorTheta()), 51);
      P.xVector = -4;
      P.yVector = 5;
      assert.equal(Math.round(P.getVectorTheta()), 129);
      P.xVector = 4
      P.yVector = -5;
      assert.equal(Math.round(P.getVectorTheta()), -51);
      P.xVector = -4;
      P.yVector = -5
      assert.equal(Math.round(P.getVectorTheta()), -129);
    })
    describe ('phi - angle of contact between balls', function(){
      var P1 = new Particle();
      var P2 = new Particle();
      P1.x = 5;
      P1.y = 5;
      P2.x = 10;
      P2.y = 10;
      assert.equal(P1.getCollisionPhi(P2), -135);
    })
  })

  describe('Collision avoidance', function(){
    var P1 = new Particle();
    var P2 = new Particle();
    P1.x = 5;
    P1.y = 5;
    P1.xVector = 2;
    P1.yVector = 2;
    P2.x = 10;
    P2.y = 10;
    P2.xVector = 2;
    P2.yVector = 2;
    P1.resolveConflict(P2);
    assert.equal(Math.round(P1.xVector), 2);
    assert.equal(Math.round(P1.yVector), 3);
  })

  //have not tested radius
  //have not tested collision resolution, largely because I don't understand the maths enough to predict adequately
})
