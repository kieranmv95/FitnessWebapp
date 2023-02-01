import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRERBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIRERBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIRERBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIRERBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRERBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIRERBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIRERBASE_MEASUREMENTID,
}

const app = initializeApp(firebaseConfig)

export default app
