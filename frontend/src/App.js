import './App.css';
import { useEffect, useState} from "react";
import { Routes, Route, Link} from "react-router-dom";
import Main from "./Main.js";
import Alarm from "./alarm/Alarm.js";
import Reward from "./reward/Reward.js";
import User from "./user/User.js";
import Mypage from "./mypage/Mypage.js";
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {

  return (
      <div className="AppDiv">
          <Navbar bg="dark" variant="dark" className="mainHeader">
              <Container>
                  <Navbar.Brand>Pill Good</Navbar.Brand>
                  <Nav className="me-auto">
                      <Nav.Link href="/">메인</Nav.Link>
                      <Nav.Link>알람</Nav.Link>
                      <Nav.Link>리워드</Nav.Link>
                      <Nav.Link>유저</Nav.Link>
                      <Nav.Link>로그인</Nav.Link>
                  </Nav>
              </Container>
          </Navbar>

          <Routes>
              <Route path="/" element={<div><Main /></div>}/>
              <Route path="/user" element={<div><User /></div>}/>
              <Route path="/alarm" element={<div><Alarm /></div>}/>
              <Route path="/reward" element={<div><Reward /></div>}/>
              <Route path="/mypage" element={<div><Mypage /></div>}/>
          </Routes>

          <Navbar bg="dark" variant="dark" className="mainFooter">
              <Container>
                  <Nav className="me-auto" style={{margin: 'auto'}}>
                      <Nav.Link href="/">메인</Nav.Link>
                      <Nav.Link>랭킹</Nav.Link>
                      <Nav.Link>등록</Nav.Link>
                      <Nav.Link>뱃지</Nav.Link>
                      <Nav.Link>유저</Nav.Link>
                  </Nav>
              </Container>
          </Navbar>
      </div>
  );
}

export default App;