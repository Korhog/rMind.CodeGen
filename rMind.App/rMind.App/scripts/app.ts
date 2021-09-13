import { Engine } from './engine/engine.js'

const container = document.getElementById("schema-view") as HTMLElement;
const add = document.getElementById("add-button") as HTMLButtonElement;
const addHRow = document.getElementById("add-hrow") as HTMLButtonElement;

const obj = new Engine(container);
add.addEventListener('click', () => { obj.create(); });
addHRow.addEventListener('click', () => { obj.createByGuid(); });

obj.draw();