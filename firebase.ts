import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
const firebaseConfig = {
  apiKey: 'AIzaSyBhUjmDr4wNcZ-I2y6ZJZrSF7XWAZvv-mU',
  authDomain: 'sellingproject-31d24.firebaseapp.com',
  databaseURL: 'https://sellingproject-31d24-default-rtdb.firebaseio.com',
  projectId: 'sellingproject-31d24',
  storageBucket: 'sellingproject-31d24.appspot.com',
  messagingSenderId: '844254312530',
  appId: '1:844254312530:web:3192d52d20b8f68f83878b',
  measurementId: 'G-JG207BPWFF',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)
const provider = new GoogleAuthProvider()

export { auth, db, provider }
