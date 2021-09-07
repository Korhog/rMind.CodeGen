import { Engine } from './engine/engine.js';
const container = document.getElementById("schema-view");
const obj = new Engine(container);
obj.draw();
