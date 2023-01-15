import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import path from "path"
import cors from "cors"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, query, collection, getDocs } from "firebase/firestore"
import { TodoItem } from "./types"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "*",
  authDomain: "*",
  projectId: "*",
  storageBucket: "*",
  messagingSenderId: "*",
  appId: "*",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

// get todos
async function getTodoItems() {
  const docRef = collection(db, "todos")
  const q = query(docRef)
  const querySnapshot = await getDocs(q)
  let items: TodoItem[] = []
  querySnapshot.forEach((doc) => {
    items.push(doc.data() as unknown as TodoItem)
  })
  return items
}

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(cors())

app.get("/api/items", async (req: Request, res: Response) => {
  const items = await getTodoItems()
  res.json(items)
})

// Serve up React in production from it's build directory
app.use(express.static(path.join(__dirname, "../frontend", "build")))
app.use("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"))
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
