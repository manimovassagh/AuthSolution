import Keycloak from 'keycloak-js';

declare module '@react-keycloak/ssr' {
  export interface SSRAuthClient extends Keycloak {
    tokenParsed?: {
      preferred_username?: string;
      [key: string]: unknown;
    };
  }
}