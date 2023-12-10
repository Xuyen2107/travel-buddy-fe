import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const cc = () => {
   // if (getApps().length !== 0) {
   console.log(123123);
   const firebaseApp = initializeApp({
      apiKey: "AIzaSyA1NyllgzSvk4GOomGQ1TlvFRMTRLDM05Q",
      authDomain: "travel-buddy-dfe82.firebaseapp.com",
      projectId: "travel-buddy-dfe82",
      storageBucket: "travel-buddy-dfe82.appspot.com",
      messagingSenderId: "327667709704",
      appId: "1:327667709704:web:033352a6ffff6903a21ebd",
      measurementId: "G-Q4K448EFC9",
   });
   const messaging = getMessaging(firebaseApp);

   //    messaging
   //       .requestPermission()
   //       .then(() => {
   //          console.log("Notification permission granted.");
   //          // Further logic for token retrieval or messaging.subscribeToTopic()
   //       })
   //       .catch((error) => {
   //          console.error("Unable to get permission to notify.", error);
   //       });

   getToken(messaging, { vapidKey: "BGG5zNu4LA5v_mQ-J4nkuedV7Ixqu-TnAhXA8ImI6shzAnNn15GYDNjRAR3Yme6pDwE3hDWm9uDYzz9eMm2e8uM" })
      .then((currentToken) => {
         if (currentToken) {
            console.log(currentToken);
         } else {
            // Show permission request UI
            console.log("No registration token available. Request permission to generate one.");
            // ...
         }
      })
      .catch((err) => {
         console.log("An error occurred while retrieving token. ", err);
         // ...
      });

   onMessage(messaging, (payload) => {
      console.log(11111111);

      console.log(payload);
   });
   // }
};

// else {
//    firebase.app(); // if already initialized, use that one
// }

// if (!firebase.apps.length) {
//    firebase.initializeApp({
//       apiKey: "AIzaSyDddX8w1razZ6oKT78wvS3UsQq4Tc6nCPY",
//       authDomain: "travelbuddy-f9569.firebaseapp.com",
//       projectId: "travelbuddy-f9569",
//       storageBucket: "travelbuddy-f9569.appspot.com",
//       messagingSenderId: "480017303420",
//       appId: "1:480017303420:web:f99178ebb3f20d866046f9",
//       measurementId: "G-6LV64YFCMW",
//    });
// } else {
//    firebase.app(); // if already initialized, use that one
// }

// let messaging = firebase.messaging.Messaging;

// if (typeof window !== "undefined") {
// if (isSupported()) {
//    messaging = firebase.messaging();
// }
// }

// export const getMessagingToken = async () => {
//    let currentToken = "";
//    if (!messaging) return;
//    try {
//       currentToken = await messaging.getToken({
//          vapidKey: "BCuAwAARPPlm698972UioywvRmsVbxdIEr8aRKSV1iwfVe0bZ2938o_e2vSLCFQrNwKLRyNRQkk9cpdAQnf4CyA",
//       });
//       console.log("FCM registration token", currentToken);
//    } catch (error) {
//       console.log("An error occurred while retrieving token. ", error);
//    }
//    return currentToken;
// };

// export const onMessageListener = () =>
//    new Promise((resolve) => {
//       messaging.onMessage((payload) => {
//          resolve(payload);
//       });
//    });
