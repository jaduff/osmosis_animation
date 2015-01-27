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
  })
})
