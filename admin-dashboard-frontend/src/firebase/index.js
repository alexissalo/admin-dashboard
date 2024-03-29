import { initializeApp } from "firebase/app";
import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage"
import {v4 as uuidv4} from "uuid"

const firebaseConfig = {
  apiKey: "AIzaSyCyLGSM1bRS9EYhVf9ilL7wuERQB5UFJbk",
  authDomain: "ecommerce-fullstack-7f23b.firebaseapp.com",
  projectId: "ecommerce-fullstack-7f23b",
  storageBucket: "ecommerce-fullstack-7f23b.appspot.com",
  messagingSenderId: "814995679063",
  appId: "1:814995679063:web:594137e1b3d9b89e524012"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage=getStorage(app)

export async function uploadFile(file){
    const storageRef=ref(storage,uuidv4())
    await uploadBytes(storageRef,file)
    const url=await getDownloadURL(storageRef)
    return url
}