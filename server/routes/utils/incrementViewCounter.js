const ViewCounter = require("../../models/viewCounter");

module.exports = incrementViewCounter = async (viewableObject, viewerIp) => {
  console.log("IP Address " + viewerIp + " viewed an item")
  console.log(viewableObject)
  if (!viewableObject.viewCounter) {
    viewableObject.viewCounter = new ViewCounter
    viewableObject.save()
  }
  viewableObject.viewCounter.views++
  if (!viewableObject.viewCounter.uniqueIps.includes(viewerIp)) viewableObject.viewCounter.uniqueIps.push(viewerIp)
  viewableObject.viewCounter.save()
}