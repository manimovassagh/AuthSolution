import Keycloak from 'keycloak-js';

// Configure Keycloak instance
const keycloak = new Keycloak({
  url: 'http://localhost:8081', // Keycloak server base URL
  realm: 'my-realm',           // Your Keycloak realm name
  clientId: 'my-nextjs-app',   // Your Keycloak client ID
});

export default keycloak;