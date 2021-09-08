import { Engine } from './engine/engine.js';
const container = document.getElementById("schema-view");
const add = document.getElementById("add-button");
const obj = new Engine(container);
add.addEventListener('click', () => { obj.create(); });
obj.draw();
