import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

console.log("firebaseConfig", firebaseConfig);

const app = initializeApp(firebaseConfig, {});
const auth = getAuth(app);

console.log(auth);

export { app, auth };
