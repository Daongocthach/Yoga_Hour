// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBTlmXHrQ-JiWTghnu9kn0eY9iSGF3Z9d8',
    authDomain: 'yoga-hour.firebaseapp.com',
    projectId: 'yoga-hour',
    storageBucket: 'yoga-hour.appspot.com',
    messagingSenderId: '172709730321',
    appId: '1:172709730321:web:5bb9ed31cb1036f45ab9b0'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth(app)

export { app, database, auth }