
const firebaseConfig = {
	
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the authentication service
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
