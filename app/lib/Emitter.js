import Particle from './Particle';
import NumberUtils from '../utils/number-utils';

export default class Emmiter {
  constructor(scene, particuleNb) {
    this.scene = scene;
    this.angle = 0;
    this.currentTime = 0;
    this.pool = [];
    this.poolIndex = 0;

    this.particles = [];
    this.particlesNumber = particuleNb;

    this.populate();

    this.throw(this.particlesNumber);

  }

  populate() {
    for (var i = 0; i < this.particlesNumber * 10; i++) {
      const options = {
        velocity: {
          x: 0,
          y: 0
        }
      }

      const p = new Particle(options);
      this.pool.push(p);
    };
  }

  takeFromPool() {
    
    if(this.poolIndex >= this.pool.length - 1) {
      this.poolIndex = 0;
    } else {
      this.poolIndex++;
    }

    return this.pool[this.poolIndex];
  }


  throw(number) {
    for (let i = 0; i < number; i++) {

      const options = {
        velocity: {
          x: NumberUtils.randomRange(-1, 1),
          y: NumberUtils.randomRange(-1, 1)
        }
      }

      const p = new Particle(options);

      this.particles.push(p);

      this.scene.addChild(p);
    }
  }

  update(dt, audioData) {
    this.angle += 0.05;

    for (let i = 0; i < this.particles.length; i++) {
      if(this.particles[i].isDead) {

        // Remove child
        this.scene.removeChild(this.particles[i]);

        // Take a new particules from pool
        this.particles[i] = this.takeFromPool();

        // Set new options of the particule
        const velocity = {
          x: NumberUtils.randomRange(-3, 3),
          y: NumberUtils.randomRange(-3, 3)
        }
        
        this.particles[i].reset(velocity);

        // Add the new particule in the scene
        this.scene.addChild(this.particles[i]);

      } else {
        this.particles[i].update(dt, audioData[50]);
      }

    }
  }
}
