import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faHouse, faCapsules, faArrowsRotate, faUserGear } from "@fortawesome/free-solid-svg-icons";

let Wrapper = styled.div`
width:80px;
text-align:center;
display:flex;
justify-content:center;
align-items:center;
flex-direction: column;



`;
let Icon = styled.div`
font-size:40px;

`;
function Footer() {



    return (


        <Navbar bg="dark" variant="dark" className="mainFooter">
            <Container>
                <Nav className="me-auto" style={{ margin: 'auto' }}>

                    <Wrapper>
                        <FontAwesomeIcon style={{ color: "white" }} className='icon' icon={faAward} size="2x" />
                        <Nav.Link as={Link} to={"/reward"}>리워드</Nav.Link>
                    </Wrapper>
                    <Wrapper>
                        <FontAwesomeIcon style={{ color: "white" }} icon={faCapsules} size="2x" />
                        <Nav.Link as={Link} to={"/alarm"}>영양제</Nav.Link>
                    </Wrapper>
                    <Wrapper>
                        <FontAwesomeIcon style={{ color: "white" }} icon={faHouse} size="2x" />
                        <div><Nav.Link as={Link} to={"/"}>메인</Nav.Link></div>
                    </Wrapper>
                    <Wrapper>
                        <FontAwesomeIcon style={{ color: "white" }} icon={faArrowsRotate} size="2x" />
                        <Nav.Link as={Link} to={"/myroutine"}>루틴</Nav.Link>
                    </Wrapper>
                    <Wrapper>
                        <FontAwesomeIcon style={{ color: "white" }} icon={faUserGear} size="2x" />
                        <Nav.Link as={Link} to={"/user"}>회원정보</Nav.Link>
                    </Wrapper>
                </Nav>
            </Container>
        </Navbar>

    );
}

export default Footer;