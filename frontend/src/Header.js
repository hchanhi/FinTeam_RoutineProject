import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container, Navbar, Nav } from 'react-bootstrap';



function Header(props) {

    let nickName = props.userNickName;
    console.log(nickName);
    return (


        <Navbar style={{ marginBottom: '3rem', zIndex: '1' }} bg="dark" variant="dark" className="mainHeader">
            <Container>
                <Navbar.Brand style={{ color: "orange", fontSize: "23px", fontWeight: "600" }}>Pill Good</Navbar.Brand>
                <Nav style={{ float: 'right', marginRight: '10px' }}>
                    {
                        nickName ? (<div style={{textAlign:'right'}}>
                            <Nav.Link as={Link} to={"/user"} style={{display:'inline-block'}}>{nickName}</Nav.Link>
                            <Nav.Link as={Link} to={"/"} onClick={()=>{
                                localStorage.clear();
                                props.setUserNickName('');
                            }} style={{display:'inline-block'}}>로그아웃</Nav.Link>
                            </div>) : (<div><Nav.Link as={Link} to={"/login"} style={{display:'inline-block'}}>로그인</Nav.Link>

                                <Nav.Link as={Link} to={"/Signup"} style={{display:'inline-block'}}>회원가입</Nav.Link></div>)
                    }

                </Nav>

            </Container>
        </Navbar >

    );
}

export default Header;