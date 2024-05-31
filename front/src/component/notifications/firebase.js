// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken } from "firebase/messaging";
import { getFCMs, postFCM } from "../../api/fcm";
import dotenv from 'dotenv';

dotenv.config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        const FCMToken = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
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
    } else {
        console.error('Permission not granted for Notification');
        return null;
    }
}

export { messaging, app, analytics };
