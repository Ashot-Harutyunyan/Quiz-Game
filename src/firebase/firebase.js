import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function fetchQuestions() {
  const snap = await getDoc(doc(db, "Questions", "T6abb979a3404d84b98e"))

  if (!snap.exists()) {
    throw new Error("The document with the questions was not found")
  }

  const data = snap.data()?.data

  if (!Array.isArray(data)) {
    throw new Error("Invalid data format")
  }

  return data
}