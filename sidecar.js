// sidecar.js
const fs = require("fs");
const path = "/shared/message.txt";

let count = 0;
setInterval(() => {
  count++;
  const msg = `Hello from sidecar — update #${count} at ${new Date().toISOString()}`;
  fs.writeFileSync(path, msg);
  console.log("Sidecar wrote:", msg);
}, 5000);