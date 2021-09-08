import { Engine } from './engine/engine.js'

const container = document.getElementById("schema-view") as HTMLElement;
const add = document.getElementById("add-button") as HTMLButtonElement;

const obj = new Engine(container);
add.addEventListener('click', () => { obj.create(); });

obj.draw();