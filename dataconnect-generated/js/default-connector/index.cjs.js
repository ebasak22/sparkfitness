const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'gym-app-frontend',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

