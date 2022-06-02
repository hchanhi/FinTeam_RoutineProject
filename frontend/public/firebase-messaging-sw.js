importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

        firebase.initializeApp({
            apiKey: "AIzaSyApcyEQg322SpdhimM9wMfQLuIn90BDZT4",
            authDomain: "pillgood-fa622.firebaseapp.com",
            projectId: "pillgood-fa622",
            storageBucket: "pillgood-fa622.appspot.com",
            messagingSenderId: "643765049046",
            appId: "1:643765049046:web:9e4be72f3998028de45b77",
            measurementId: "G-95F883RD6Z"
        });
        const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon:''
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});


