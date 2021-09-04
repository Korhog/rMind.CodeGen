import { Engine } from './engine/engine.js'

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const obj = new Engine(canvas);
obj.draw();