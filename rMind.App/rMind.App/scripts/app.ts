import { Engine } from './engine/engine.js'

const container = document.getElementById("content") as HTMLElement;

const obj = new Engine(container);
obj.draw();