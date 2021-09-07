import { Engine } from './engine/engine.js'

const container = document.getElementById("schema-view") as HTMLElement;

const obj = new Engine(container);
obj.draw();