// src/keycloak.d.ts

declare global {
    namespace Express {
      interface Request {
        kauth?: any; // This is where Keycloak data is attached
      }
    }
  }