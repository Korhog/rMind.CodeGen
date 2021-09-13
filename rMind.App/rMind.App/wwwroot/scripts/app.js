import { Engine } from './engine/engine.js';
const container = document.getElementById("schema-view");
const add = document.getElementById("add-button");
const addHRow = document.getElementById("add-hrow");
const obj = new Engine(container);
add.addEventListener('click', () => { obj.create(); });
addHRow.addEventListener('click', () => { obj.createByGuid(); });
obj.draw();
