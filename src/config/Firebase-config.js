import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDHOnPTpuzPE0cTx5bP-1-46p6ZB-IqR2E",
  authDomain: "peerdeer-sales-management.firebaseapp.com",
  projectId: "peerdeer-sales-management",
  storageBucket: "peerdeer-sales-management.appspot.com",
  messagingSenderId: "605340561636",
  appId: "1:605340561636:web:fe93f13946f46043aa7cf1",
  measurementId: "G-P9GTCJMNLB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);