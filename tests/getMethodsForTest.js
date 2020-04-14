const urConfig = require("./universal-resolver-config.json");

module.exports = (focusedMethods = []) => {
  const methodsForTest = {};
  urConfig.drivers.forEach(driver => {
    if (driver.image !== "universalresolver/driver-dns") {
      const methodName = driver.pattern.split(":")[1];

      methodsForTest[methodName] = driver.testIdentifiers;

    }
  });
  return methodsForTest;
};
