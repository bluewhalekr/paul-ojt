import { FIREBASE_CONFIG } from '@environments/constants';

export const ENV = {
  API_URL: '/api/'
};

export const environment = {
  production: true,
  test: true,
  hmr: false,
  firebase: FIREBASE_CONFIG
};
