import app from "firebase/app";
import "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjvKdtky2vQnCNd298oHb29nXMYbw9hKg",
    authDomain: "hackduke2020.firebaseapp.com",
    projectId: "hackduke2020",
    storageBucket: "hackduke2020.appspot.com",
    messagingSenderId: "941752030711",
    appId: "1:941752030711:web:9bece3285b176e9e344af2",
    measurementId: "G-1VMX92K7WQ"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.db = app.database();
    }
}

export default new Firebase();