// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { postFCM } from "../../api/fcm";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-GOUMKDJ5yMkrBlR9uU0aBRoXRuR7p1E",
  authDomain: "trigger109-3d431.firebaseapp.com",
  databaseURL: "https://trigger109-3d431-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trigger109-3d431",
  storageBucket: "trigger109-3d431.appspot.com",
  messagingSenderId: "451870712939",
  appId: "1:451870712939:web:31a4ae839a9d7ecc9e3d2e",
  measurementId: "G-3FNRJEBB9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    // console.log(permission);
    if (permission === "granted") {
        const FCMToken = await getToken(messaging, {
            vapidKey: 
                "BOfsVc6-5m98UdU9cd79oZC3Z5amKIdTNlH2EaVM7Pb8CKWHct0-ubSOx1XooLUSJkI9SrGaeDTvfQPdoSguXew"
        });
        // console.log('FCMToken: ', FCMToken)
        postFCM(FCMToken)
        return FCMToken;
    }
    else {
        console.error('Error Occurs');
        return null;
    }
}

export { messaging, app };
