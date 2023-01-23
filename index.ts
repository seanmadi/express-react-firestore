import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import path from "path"
import cors from "cors"
import { initializeApp, applicationDefault } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

import { TodoItem } from "./types"

initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://todo-nodejs-db808.firebaseio.com",
})
const db = getFirestore()

// get todos
async function getTodoItems() {
  const snapshot = await db.collection("todos").get()
  let items: TodoItem[] = []
  snapshot.forEach((doc) => {
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
