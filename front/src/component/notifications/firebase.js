// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken } from "firebase/messaging";
import { getFCMs, postFCM } from "../../api/fcm";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

require('dotenv').config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        const FCMToken = await getToken(messaging, {
            vapidKey: process.env.FIREBASE_VAPID_KEY
        });
        if (FCMToken) {

            try {
                await postFCM({ fcmToken: FCMToken });
                console.log('FCM token posted successfully');
                
            } catch (error) {
                console.error('Error occurred while posting the FCM token:', error);
            }
        } else {
            console.error('Failed to get FCM token.');
        }
        return FCMToken;
    }
    else {
        console.error('Error Occurs');
        return null;
    }
}

export { messaging, app, analytics };
