// firebase.js
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase configuration (replace with your own config from Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyBnV0mD8XSzT7BTBbZOnnJuF0lQbHICttc",
  authDomain: "netflix-clone-cd9bf.firebaseapp.com",
  projectId: "netflix-clone-cd9bf",
  storageBucket: "netflix-clone-cd9bf.appspot.com",
  messagingSenderId: "27614123196",
  appId: "1:27614123196:web:ee040a630142c0de562cb9"
};

// Initialize Firebase app and services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function: Registers a new user and saves the user's data to Firestore
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    // Save user data in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });
    toast.success("User signed up successfully!");
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

// Login function: Authenticates the user using email and password
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

// Logout function: Signs out the current user
const logout = () => {
  try {
    signOut(auth);
    toast.success("Logged out successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Error logging out.");
  }
};

// Export auth, db, login, signup, and logout for use in other parts of the app
export { auth, db, login, signup, logout };
