// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyB-GOUMKDJ5yMkrBlR9uU0aBRoXRuR7p1E",
    authDomain: "trigger109-3d431.firebaseapp.com",
    databaseURL: "https://trigger109-3d431-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "trigger109-3d431",
    storageBucket: "trigger109-3d431.appspot.com",
    messagingSenderId: "451870712939",
    appId: "1:451870712939:web:31a4ae839a9d7ecc9e3d2e",
    measurementId: "G-3FNRJEBB9R"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
