// db.js

import Firebase from 'firebase'
let config = {
	apiKey: "AIzaSyA-zPRmI1D18e9vkTCP9wPDy_a_2A9HiUM",
	authDomain: "fagaru-3a3f9.firebaseapp.com",
	databaseURL: "https://fagaru-3a3f9.firebaseio.com",
	projectId: "fagaru-3a3f9",
	storageBucket: "fagaru-3a3f9.appspot.com",
	messagingSenderId: "778977528426"
};
let app = Firebase.initializeApp(config);
export const db = app.database();