import './App.css';
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Routes, Route, Link, Router } from "react-router-dom";
import Header from './Header.js';
import Footer from './Footer.js';
import Main from "./Main.js";
import Reward from "./reward/Reward.js";
import User from "./user/User.js";
import AddPill from "./alarm/AddPill.js";
import MyPill from "./alarm/MyPill.js";
import Routine from "./routine/Routine.js";
import Signup from "./login/Signup.js";
import Login2 from "./login/Login2";
import { isAuth, getNickName } from './jwtCheck.js';

const config = {
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
        Topic(currentToken);
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
    fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic, {
        method: 'POST',
        headers: new Headers({

            'Authorization': 'key='+'AAAAleNjFtY:APA91bG-PTYyM1IYJeMy0h1Cjvb9Y9Uww-4H7qOqTbmlLunuhhO3AbbG8rVvmu79pja_6FVG-oMKuNsLeTwQVR4VPIDnMM3nQOQj7RYqnAmc2phVBJUbFpc6ekrgTNnnro7_ujXg3Pnt'
        })
    }).then(response => {
        if (response.status < 200 || response.status >= 400) {
            throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
        }
        console.log('Subscribed to "'+topic+'"');
    }).catch(error => {
        console.error(error);
    })
}

function Topic(Token){
    subscribeTokenToTopic(Token, "ALL");

}




onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
});

function App() {

    let [userNickName, setUserNickName] = useState('');
    let [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('accessToken'));

        if (isAuth(token)) {
            setUserNickName(getNickName(token));
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [isLogin]);
    return (
        <div className="AppDiv">
            {/*헤더*/}

            <Header userNickName={userNickName} setUserNickName={setUserNickName} />
            {/*페이지*/}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/user" element={<User setUserNickName={setUserNickName}/>} />
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