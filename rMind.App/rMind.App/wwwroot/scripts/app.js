import { Engine } from './engine/engine.js';
const container = document.getElementById("content");
const obj = new Engine(container);
obj.draw();
