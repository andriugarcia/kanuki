import firebase from "firebase/app"
require("firebase/firestore")
require("firebase/auth")
require("firebase/storage")

const config = {
	apiKey: "AIzaSyA6_aIWPJnAAQGxrPAr-c8IuFs-aa_N49c",
	authDomain: "kanuki-app.firebaseapp.com",
	databaseURL: "https://kanuki-app.firebaseio.com",
	projectId: "kanuki-app",
	storageBucket: "kanuki-app.appspot.com",
	messagingSenderId: "774180793403"
}

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

export default firebase
