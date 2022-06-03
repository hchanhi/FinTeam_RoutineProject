importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

        firebase.initializeApp({
            apiKey: "AIzaSyDIeKgdotnu9zvRvYNKnVry8Nuw6r7s7_8",
            authDomain: "pillgood-138b1.firebaseapp.com",
            projectId: "pillgood-138b1",
            storageBucket: "pillgood-138b1.appspot.com",
            messagingSenderId: "63398292257",
            appId: "1:63398292257:web:bdf80d64a9a75d249d6c60",
            measurementId: "G-6KFN50FF08"
        });
        const messaging = firebase.messaging();

    messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here

});


