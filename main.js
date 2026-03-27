// main.js
const fs = require("fs");
const path = "/shared/message.txt";

setInterval(() => {
  try {
    const msg = fs.readFileSync(path, "utf8");
    console.log("Main app read:", msg);
  } catch (e) {
    console.log("Main app: waiting for sidecar to write...");
  }
}, 5000);