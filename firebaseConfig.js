// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
	apiKey: 'AIzaSyBz4lUmxAgBO3F3ul1cefEE3vmunvXhaWg',
	authDomain: 'pawsible-47dfd.firebaseapp.com',
	projectId: 'pawsible-47dfd',
	storageBucket: 'pawsible-47dfd.appspot.com',
	messagingSenderId: '67831357433',
	appId: '1:67831357433:web:93055a5579df302974e728',
	measurementId: 'G-P1VZEMVGNQ'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the authentication service
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
