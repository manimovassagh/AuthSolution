import Keycloak from 'keycloak-js';


const keycloak = new Keycloak({
  url: 'http://localhost:8081',
  realm: 'auth_solution',
  clientId: 'auth_front',
});

export default keycloak;