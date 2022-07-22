// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAy0K87TFKkX4x8hM6fXMsg53wkn4CfvoQ",
  authDomain: "aimmo-ojt.firebaseapp.com",
  projectId: "aimmo-ojt",
  storageBucket: "aimmo-ojt.appspot.com",
  messagingSenderId: "989197012257",
  appId: "1:989197012257:web:fab92dcdf51843edf2c260",
  measurementId: "G-YZFCTG4E6H"
}

export const environment = {
  production: false,
  test: false,
  hmr: false,
  firebase: FIREBASE_CONFIG
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
