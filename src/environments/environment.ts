// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  isAnonymousUserEnabled: true,
  baseDomain: "https://mytrendingstories-dev.web.app/",
  addThisScript: "//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5ed48a5fc8315a5b",
  authService: "https://us-central1-my-trending-stories-dev.cloudfunctions.net/api/token/migration",
  production: false,
  captchaKey: "6LfMnKoZAAAAALeLCs7H9LL9MhOy3EmcwtchxUf-",
  //for live
  baseAPIDomain: 'https://us-central1-my-trending-stories-dev.cloudfunctions.net',
  //for local
  // baseAPIDomain: 'http://localhost:5001/my-trending-stories-dev/us-central1',
  facebook: {
    appId: '327118671669396',
    version: 'v9.0'
  },
  firebase: {
    apiKey: "AIzaSyC83ZSVEBAP_9tuNucpudqPzya8zNsYxL8",
    authDomain: "my-trending-stories-dev.firebaseapp.com",
    databaseURL: "https://my-trending-stories-dev.firebaseio.com",
    projectId: "my-trending-stories-dev",
    storageBucket: "my-trending-stories-dev.appspot.com",
    messagingSenderId: "446215367606",
    appId: "1:446215367606:web:8f9ef10855e88708c9af17",
    measurementId: "G-EY017BDB3Z"
  },
  storeUrl: 'https://devstore.mytrendingstories.com',
  stripePublishableKey: 'pk_test_OLjCckOxOe5cMKFD4kQaSdGe00j69EehH2',
  consoleURL: 'https://console.mytrendingstories.dev',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
