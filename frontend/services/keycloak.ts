import Keycloak from 'keycloak-js';

// Configure Keycloak instance
const keycloak = new Keycloak({
  url: 'http://localhost:8081', // Keycloak server base URL
  realm: 'auth_solution',           // Your Keycloak realm name
  clientId: 'auth_front',   // Your Keycloak client ID
});

export default keycloak;