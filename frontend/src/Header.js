import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container, Navbar, Nav } from 'react-bootstrap';



function Header() {



    return (


        <Navbar style={{ marginBottom: '3rem', zIndex: '1' }} bg="dark" variant="dark" className="mainHeader">
            <Container>
                <Navbar.Brand style={{ color: "orange", fontSize: "23px", fontWeight: "600" }}>Pill Good</Navbar.Brand>
                <Nav style={{ float: 'right', marginRight: '10px' }}>
                    <Nav.Link as={Link} to={"/login"}>로그인</Nav.Link>

                    <Nav.Link to="/Join">
                        회원가입
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>

    );
}

export default Header;