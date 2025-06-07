// LuxorStay/src/utils/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// // Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyARG6hWCN2hbo_3mILCu-DpCgp9QMKc_KM",
//   authDomain: "luxorstay-dd33a.firebaseapp.com",
//   projectId: "luxorstay-dd33a",
//   storageBucket: "luxorstay-dd33a.firebasestorage.app",
//   messagingSenderId: "219478737238",
//   appId: "1:219478737238:web:44737c42df771f2cdfd6f7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// export const signInWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     const user = result.user;
    
//     return {
//       email: user.email,
//       username: user.displayName,
//       image: user.photoURL,
//       googleId: user.uid
//     };
//   } catch (error) {
//     console.error("Error signing in with Google:", error);
//     throw error;
//   }
// };

// export default app;