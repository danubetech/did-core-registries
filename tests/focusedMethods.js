let focusedMethods = ["web", "sov", "btcr", "evan"];

if (process.env.DID_METHOD) {
  focusedMethods.push(process.env.DID_METHOD);
}

module.exports = focusedMethods;
