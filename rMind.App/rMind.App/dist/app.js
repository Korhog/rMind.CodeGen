"use strict";
exports.__esModule = true;
var engine_1 = require("./engine/engine");
var engine = new engine_1.Engine();
var div = document.querySelector("#message");
div.textContent = engine.format();
