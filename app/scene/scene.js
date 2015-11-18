import {
    WebGLRenderer, Container
}
from 'pixi.js';
var pixi = require('pixi.js')

class Scene {

    /**
     * @constructor
     */
    constructor() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer = new WebGLRenderer(this.width, this.height, {
            antialias: true
        });
        this.renderer.backgroundColor = 0x101010;

        this.stage = new Container();
    }

    /**
     * Add a child to the stage
     *
     * @param {Obj} child - a PIXI object
     */
    addChild(child) {

        this.stage.addChild(child)
    }

    /**
     * Remove a child from the stage
     *
     * @param {Obj} child - a PIXI object
     */
    removeChild(child) {

        this.stage.removeChild(child)
    }

    /**
     * Renders/Draw the scene
     */
    render() {

        this.renderer.render(this.stage);
    }

    /**
     * Resize the scene according to screen size
     *
     * @param {Number} newWidth
     * @param {Number} newHeight
     */
    resize(newWidth, newHeight) {

        this.renderer.resize(newWidth, newHeight)
    }

}

export default Scene;
