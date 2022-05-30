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
      <div className={'AppDiv'}>
          <Navbar bg="dark" variant="dark">
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


          <Link to={"/"}><span>메인</span></Link><br/><br/>
          <Link to={"/user"}><span>유저</span></Link><br/><br/>
          <Link to={"/alarm"}><span>알람</span></Link><br/><br/>
          <Link to={"/reward"}><span>리워드</span></Link><br/><br/>
          <Link to={"/mypage"}><span>마이페이지</span></Link><br/><br/>

      </div>
  );
}

export default App;