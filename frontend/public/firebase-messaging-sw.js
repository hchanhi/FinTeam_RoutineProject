import("https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js").then(
    (firebase) => {
        const firebaseConfig = {
            apiKey: "AIzaSyApcyEQg322SpdhimM9wMfQLuIn90BDZT4",
            authDomain: "pillgood-fa622.firebaseapp.com",
            projectId: "pillgood-fa622",
            storageBucket: "pillgood-fa622.appspot.com",
            messagingSenderId: "643765049046",
            appId: "1:643765049046:web:9e4be72f3998028de45b77",
            measurementId: "G-95F883RD6Z"
        };
        const app = firebase.initializeApp(firebaseConfig);
        //...
    });

