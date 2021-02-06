const ViewCounter = require("../../models/viewCounter");

module.exports = incrementVeiwableObjectViewCounter = async (
  viewableObject,
  viewerIp
) => {
  if (!viewableObject) throw new Error("No viewable entitity found")
  if (!viewableObject.viewCounter) {
    viewableObject.viewCounter = new ViewCounter();
    viewableObject.save();
  }
  viewableObject.viewCounter.views++;
  if (!viewableObject.viewCounter.uniqueIps.includes(viewerIp))
    viewableObject.viewCounter.uniqueIps.push(viewerIp);
  viewableObject.viewCounter.save();
};
