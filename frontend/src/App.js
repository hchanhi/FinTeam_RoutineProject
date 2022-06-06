import './App.css';
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Routes, Route, Link, Router, Navigate } from "react-router-dom";
import Header from './Header.js';
import Footer from './Footer.js';
import Main from "./Main.js";
import PreMain from "./PreMain.js";
import Reward from "./reward/Reward.js";
import User from "./user/User.js";
import AddPill from "./alarm/AddPill.js";
import MyPill from "./alarm/MyPill.js";
import Routine from "./routine/Routine.js";
import Signup from "./login/Signup.js";
import Login2 from "./login/Login2";
import { isAuth, getNickName } from './jwtCheck.js';

const config = {
    apiKey: "AIzaSyDIeKgdotnu9zvRvYNKnVry8Nuw6r7s7_8",
    authDomain: "pillgood-138b1.firebaseapp.com",
    projectId: "pillgood-138b1",
    storageBucket: "pillgood-138b1.appspot.com",
    messagingSenderId: "63398292257",
    appId: "1:63398292257:web:bdf80d64a9a75d249d6c60",
    measurementId: "G-6KFN50FF08"
};
const app = initializeApp(config);



const messaging = getMessaging(app);

getToken(messaging, { vapidKey: 'BOUH7VnfqJhHUd9CXxw1_QwjB_lScFbFAgPb9P-JOcNE8VavuYuOgSw5s9dLiTZfS0yYGv5RI1dCkYSeLxxvmmI' }).then((currentToken) => {
    if (currentToken) {
        Topic1(currentToken);
        Topic2(currentToken);
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
function subscribeTokenToTopic(token, topic) {
    fetch('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + topic, {
        method: 'POST',
        headers: new Headers({

            'Authorization': 'key=' + 'AAAADsLVKyE:APA91bHI_UNkgq0sEAf5UcR01heTflDp8PDs8CI5Lpb3G8HHLUNv05N1STvF0OaAN_W0jVXoHTFdxO_KAkw4Gc5fdrvPxNfnzjtc9IpjJPxJz6fcHQUEpY9W-Lr7wJH-TpgII5O8_84E'
        })
    }).then(response => {
        if (response.status < 200 || response.status >= 400) {
            throw 'Error subscribing to topic: ' + response.status + ' - ' + response.text();
        }
        console.log('Subscribed to "' + topic + '"');
    }).catch(error => {
        console.error(error);
    });
}

function Topic1(Token) {
    subscribeTokenToTopic(Token, "ALL");
}
function Topic2(Token) {
    subscribeTokenToTopic(Token, "MORNING");
}




onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
});
const token = JSON.parse(localStorage.getItem('accessToken'));
function App() {

    let [userNickName, setUserNickName] = useState('');
    let [isLogin, setIsLogin] = useState(false);

    useEffect(() => {


        if (isAuth(token)) {
            setUserNickName(getNickName(token));
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [isLogin]);
    if (isAuth(token) == false) {
        return <div className="AppDiv"> <Routes><Route path='/' element={<PreMain />} /><Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login2 isLogin={isLogin} setIsLogin={setIsLogin} />} /></Routes></div>;
    };
    return (
        <div className="AppDiv">
            {/*헤더*/}

            <Header userNickName={userNickName} setUserNickName={setUserNickName} />

            {/*페이지*/}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/user" element={<User setUserNickName={setUserNickName} />} />
                <Route path="/reward" element={<Reward />} />
                <Route path="/mypill" element={<MyPill />} />
                <Route path="/addpill" element={<AddPill />} />
                <Route path="/routine" element={<Routine />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login2 isLogin={isLogin} setIsLogin={setIsLogin} />} />

                <Route path="*" element={<div>404 Error Not found</div>} />
            </Routes>

            {/*푸터*/}
            <Footer />

        </div>
    );
}

export default App;