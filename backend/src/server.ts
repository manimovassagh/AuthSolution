import express from 'express';
import session from 'express-session';
import Keycloak from 'keycloak-connect';

const app = express();
const port = 8082; // Backend port

// Session store for Keycloak
const memoryStore = new session.MemoryStore();

// Express session middleware
app.use(
  session({
    secret: 'your-secret-key', // Use a secure secret
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

// Initialize Keycloak with the session store
const keycloak = new Keycloak({ store: memoryStore });

// Keycloak configuration
const keycloakConfig = {
  clientId: 'auth_front', // Client ID defined in Keycloak
  bearerOnly: true, // Backend is only for bearer token validation
  serverUrl: 'http://localhost:8080/auth', // Keycloak server URL
  realm: 'auth_solution', // Realm defined in Keycloak
  credentials: {
    secret: 'your-client-secret', // Client secret from Keycloak for 'auth_front'
  },
};

// Apply Keycloak middleware
app.use(keycloak.middleware());

// Public route to test the server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Protected route (authenticated access)
app.get(
  '/protected',
  keycloak.protect(), // Keycloak protection middleware
  (req, res) => {
    res.send('You are authenticated with Keycloak!');
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});