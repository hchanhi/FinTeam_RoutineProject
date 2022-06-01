import './App.css';
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging,getToken, onMessage } from "firebase/messaging";
import { Routes, Route, Link, Router } from "react-router-dom";
import Header from './Header.js';
import Footer from './Footer.js';
import Main from "./Main.js";
import Alarm from "./alarm/Alarm.js";
import Reward from "./reward/Reward.js";
import User from "./user/User.js";
import Mypage from "./mypage/Mypage.js";
import AddPill from "./alarm/AddPill.js";

const config =  {
    apiKey: "AIzaSyApcyEQg322SpdhimM9wMfQLuIn90BDZT4",
    authDomain: "pillgood-fa622.firebaseapp.com",
    projectId: "pillgood-fa622",
    storageBucket: "pillgood-fa622.appspot.com",
    messagingSenderId: "643765049046",
    appId: "1:643765049046:web:9e4be72f3998028de45b77",
    measurementId: "G-95F883RD6Z"
};
const app = initializeApp(config);




const messaging = getMessaging(app);

getToken(messaging, { vapidKey: 'BEuI26QX9zbLMvI7leG5Lia2wYdCZ-B-7VYeLaOJ6TefStmo0pMB-iqulBi_eQ8MVRVn5Os4pJpSVYSOIK6lhRU' }).then((currentToken) => {
    if (currentToken) {
        console.log('허가!');
        console.log(currentToken);
        // Send the token to your server and update the UI if necessary
        // ...
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});

// messaging.requestPermission()
//     .then(function() {
//         console.log('허가!');
//         return messaging.getToken(); //토큰을 받는 함수를 추가!
//     })
//     .then(function(token) {
//         console.log(token); //토큰을 출력!
//     })
//     .catch(function(err) {
//         console.log('fcm에러 : ', err);
//     })

// messaging.onMessage(function(payload){
//     console.log(payload.notification.title);
//     console.log(payload.notification.body);
// })

onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
});

function App() {

    return (
        <div className="AppDiv">
            {/*헤더*/}

            <Header />
            {/*페이지*/}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/user" element={<User />} />
                <Route path="/alarm" element={<Alarm />} />
                <Route path="/reward" element={<Reward />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/addpill" element={<AddPill />} />

                <Route path="*" element={<div>404 Error Not found</div>} />
            </Routes>

            {/*푸터*/}
            <Footer />

        </div>
    );
}

export default App;