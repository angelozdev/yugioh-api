import { initializeApp } from "firebase/app";
import config from "config";

const firebaseApp = initializeApp(config.firebase.config);

export default firebaseApp;
