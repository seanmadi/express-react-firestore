"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
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
};
// Initialize Firebase
const firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, firestore_1.getFirestore)(firebaseApp);
// get todos
function getTodoItems() {
    return __awaiter(this, void 0, void 0, function* () {
        const docRef = (0, firestore_1.collection)(db, "todos");
        const q = (0, firestore_1.query)(docRef);
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        let items = [];
        querySnapshot.forEach((doc) => {
            items.push(doc.data());
        });
        return items;
    });
}
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.get("/api/items", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield getTodoItems();
    res.json(items);
}));
// Serve up React in production from it's build directory
app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend", "build")));
app.use("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../frontend", "build", "index.html"));
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
