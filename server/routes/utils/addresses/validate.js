const SmartyStreetsSDK = require("smartystreets-javascript-sdk");

module.exports = validate = (addressFromClient) => {
  const {
    firstLine,
    secondLine,
    city,
    state,
    zip,
  } = addressFromClient

  const SmartyStreetsCore = SmartyStreetsSDK.core;
  const Lookup = SmartyStreetsSDK.usStreet.Lookup;
  // for Server-to-server requests, use this code:
  let authId = process.env.SMARTY_AUTH_ID;
  let authToken = process.env.SMARTY_AUTH_TOKEN;
  const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

  let client = SmartyStreetsCore.buildClient.usStreet(credentials);

  // https://smartystreets.com/docs/us-street-api#input-fields

  let lookup1 = new Lookup();
  lookup1.inputId = null;  // Optional ID from your system
  lookup1.addressee = null;
  lookup1.street = firstLine;
  lookup1.street2 = null;
  lookup1.secondary = secondLine;
  lookup1.urbanization = null;  // Only applies to Puerto Rico addresses
  lookup1.city = city;
  lookup1.state = state;
  lookup1.zipCode = zip;
  lookup1.maxCandidates = 3;
  lookup1.match = "invalid"; // "invalid" is the most permissive match

  return client.send(lookup1)
    .then(handleSuccess)
    .catch(handleError);

  function handleSuccess(response) {
    return response.lookups
  }

  function handleError(response) {
    console.log(response);
    return response
  }
}