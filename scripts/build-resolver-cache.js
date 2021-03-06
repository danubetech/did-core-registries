const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const getMethodsForTest = require("../tests/getMethodsForTest");

let focusedMethods = require("../tests/focusedMethods");
const methodsForTest = getMethodsForTest(focusedMethods);

const unresolveable = [];
let didTest = (dID) => {
  let boo = false;
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, `../test-dids/${dID}.json`)
    );
    const document = JSON.parse(file.toString());
    boo = document != null && typeof document.id === "string";
  } catch (e) {
    boo = false;
  }
  return boo;
}

// Run locally before push to decrease build time.
const buildResolverCache = methodsForTest => {
  Object.keys(methodsForTest).map(method => {
    methodsForTest[method].forEach(did => {
      let exists = false;

      try {
        exists = didTest(did);
        if (!exists) {
          // assume unresolvable...
          unresolveable.push(did);
          console.info("downloading: ", did);
          const cmd = `
          curl -s --max-time 10 https://uniresolver.io/1.0/identifiers/${did} | jq ".didDocument" > ./test-dids/${did}.json;
        `;
          shell.config.silent = false;
          shell.exec(cmd);
          exists = didTest(unresolveable[unresolveable.length - 1]);
          if (exists) {
            console.info(did, " is valid json, skipping.");
            unresolveable.pop();
          } else {
            console.info(did, " is Invalid");
          }
        } else {
          console.info(did, " is valid json, skipping.");
        }
      } catch (e) {
        console.warn(did, e);
      }
    });
  });
};

buildResolverCache(methodsForTest);

fs.writeFileSync(
  path.resolve(__dirname, "../unresolveable-test-dids.json"),
  JSON.stringify(unresolveable, null, 2)
);
