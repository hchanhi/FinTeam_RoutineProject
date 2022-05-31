import './App.css';
import { useEffect, useState } from "react";
import { Routes, Route, Link, Router } from "react-router-dom";
import Header from './Header.js';
import Footer from './Footer.js';
import Main from "./Main.js";
import Alarm from "./alarm/Alarm.js";
import Reward from "./reward/Reward.js";
import User from "./user/User.js";
import Mypage from "./mypage/Mypage.js";
import AddPill from "./alarm/AddPill.js";


function App() {

    return (
        <div className="App" >
            {/*헤더*/}
            <div className="AppDiv" >
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
        </div>
    );
}

export default App;