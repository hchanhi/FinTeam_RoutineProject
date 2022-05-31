import './App.css';
import { useEffect, useState} from "react";
import { Routes, Route, Link, Router} from "react-router-dom";
import Main from "./Main.js";
import Alarm from "./alarm/Alarm.js";
import Reward from "./reward/Reward.js";
import User from "./user/User.js";
import Mypage from "./mypage/Mypage.js";
import AddPill from "./alarm/AddPill.js";
import login from "/login.js";
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {

  return (
      <div className="AppDiv">
          {/*헤더*/}
          <Navbar bg="dark" variant="dark" className="mainHeader">
              <Container>
                  <Navbar.Brand>Pill Good</Navbar.Brand>
                  <Nav style={{float:'right', marginRight:'10px'}}>
                      <Nav.Link as={Link} to={"/login"}>로그인</Nav.Link>
                  </Nav>
              </Container>
          </Navbar>
          {/*페이지*/}
          <Routes>
              <Route path="/" element={<div><Main /></div>}/>
              <Route path="/user" element={<div><User /></div>}/>
              <Route path="/login" element={<div><login /></div>}/>
              <Route path="/alarm" element={<div><Alarm /></div>}/>
              <Route path="/reward" element={<div><Reward /></div>}/>
              <Route path="/mypage" element={<div><Mypage /></div>}/>
              <Route path="/addpill" element={<div><AddPill /></div>}/>
              <Route path="*" element={<div>404 Error Not found</div>}/>
          </Routes>

          {/*푸터*/}
          <Navbar bg="dark" variant="dark" className="mainFooter">
              <Container>
                  <Nav className="me-auto" style={{margin: 'auto'}}>
                      <Nav.Link as={Link} to={"/"}>메인</Nav.Link>
                      <Nav.Link as={Link} to={"/reward"}>뱃지</Nav.Link>
                      <Nav.Link as={Link} to={"/alarm"}>영양제현황</Nav.Link>
                      <Nav.Link as={Link} to={"/myroutine"}>루틴현황</Nav.Link>
                      <Nav.Link as={Link} to={"/user"}>회원정보</Nav.Link>
                  </Nav>
              </Container>
          </Navbar>

      </div>
  );
}

export default App;