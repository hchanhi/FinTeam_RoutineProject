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
import FindPassword from "./login/FindPassword.js";
import EditPassword from "./login/EditPassword.js";


function App() {


    const token = JSON.parse(localStorage.getItem('accessToken'));
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
        return(
        <div className="AppDiv">
            <Routes>
                <Route path='/' element={<PreMain />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login2 isLogin={isLogin} setIsLogin={setIsLogin} />} />
                <Route path="/findPassword" element={<FindPassword />} />
                <Route path="/user/passwordChange/:key" element={<EditPassword setUserNickName={setUserNickName}/>} />
            </Routes>
        </div>
    );
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
                <Route path="/findPassword" element={<FindPassword />} />
                <Route path="/user/passwordChange/:key" element={<EditPassword setUserNickName={setUserNickName}/>} />

                <Route path="*" element={<div>404 Error Not found</div>} />
            </Routes>

            {/*푸터*/}
            <Footer />

        </div>
    );
}

export default App;