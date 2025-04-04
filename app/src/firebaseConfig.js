import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
	apiKey: "AIzaSyAu69oGdD3OIIceoMFatY0HXoqaSyK_9Wg",
	authDomain: "testapp-bef10.firebaseapp.com",
	databaseURL: "https://testapp-bef10-default-rtdb.firebaseio.com",
	projectId: "testapp-bef10",
	storageBucket: "testapp-bef10.firebasestorage.app",
	messagingSenderId: "854999901800",
	appId: "1:854999901800:web:55559753623f7f3da23ddd"
};

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export { database }
