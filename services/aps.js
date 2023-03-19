const fs = require('fs');
const APS = require('forge-apis');
const {
  APS_CLIENT_ID,
  APS_CLIENT_SECRET,
  APS_BUCKET,
} = require('../config.js');

let internalAuthClient = new APS.AuthClientTwoLegged(
  APS_CLIENT_ID,
  APS_CLIENT_SECRET,
  ['bucket:read', 'bucket:create', 'data:read', 'data:write', 'data:create'],
  true,
);
let publicAuthClient = new APS.AuthClientTwoLegged(
  APS_CLIENT_ID,
  APS_CLIENT_SECRET,
  ['viewables:read'],
  true,
);

const service = (module.exports = {});

service.getInternalToken = async () => {
  if (!internalAuthClient.isAuthorized()) {
    await internalAuthClient.authenticate();
  }
  return internalAuthClient.getCredentials();
};

service.getPublicToken = async () => {
  if (!publicAuthClient.isAuthorized()) {
    await publicAuthClient.authenticate();
  }
  return publicAuthClient.getCredentials();
};
