import './App.css';
import { useEffect, useState } from "react";
import { Routes, Route, Link, Router } from "react-router-dom";
import Header from './Header.js';
import Footer from './Footer.js';
import Main from "./Main.js";
import Reward from "./reward/Reward.js";
import User from "./user/User.js";
import Routine from "./routine/Routine.js";
import Mypill from "./alarm/MyPill";
import AddPill from "./alarm/AddPill";
import Login from "./login/Login.js";
import Signup from "./login/Signup.js";


function App() {

    return (
        <div className="App" >
            {/*헤더*/}


            <Header />
            {/*페이지*/}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/user" element={<User />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reward" element={<Reward />} />
                <Route path="/routine" element={<Routine />} />
                <Route path="/mypill" element={<Mypill />} />
                <Route path="/addpill" element={<AddPill/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>

                <Route path="*" element={<div>404 Error Not found</div>} />
            </Routes>

            {/*푸터*/}
            <Footer />

        </div>
    );
}

export default App;