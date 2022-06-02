import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { Card } from "react-bootstrap";
import pill from './img/example.png';
import './Main.css';
import CheckPill from './CheckPill.js';

let Wrapper = styled.div`
margin: auto;
marginTop: 50px;
width: 90%;
height: 880px;
`;


function Main() {
    const token = JSON.parse(localStorage.getItem('accessToken'));

    let [selectpill, setSelectpill] = useState(['영양제1', '영양제2', '영양제3']);
    let [pillstate, setPillstate] = useState(0);

    function clickHandler(e) {
        setPillstate(e);
    }

    return (
        <Wrapper style={{ marginTop: "30px" }}>
            <br /><br />
            <h1>메인</h1>
            <Card className="mainCard">
                <Card.Title>안녕하세요 user 님!</Card.Title>
                <Card.Body>
                    <img src={pill} className="image" />
                    <Card.Subtitle className="mb-2 text-muted">
                        <span className={`pillname ${pillstate === 1 ? 'selected' : ''}`} onClick={() => { clickHandler(1); }}>영양제1</span>
                        <span className={`pillname ${pillstate === 2 ? 'selected' : ''}`} onClick={() => { clickHandler(2); }}>영양제2</span>
                        <span className={`pillname ${pillstate === 3 ? 'selected' : ''}`} onClick={() => { clickHandler(3); }}>영양제3</span>
                    </Card.Subtitle>
                    {pillstate == 1 ?
                        <Card.Text>
                            남은 수량 : 30<br />
                            알람 시간 : 14:00<br />
                        </Card.Text> : null}
                    {pillstate == 2 ?
                        <Card.Text>
                            남은 수량 : 50<br />
                            알람 시간 : 18:00<br />
                        </Card.Text> : null}
                    {pillstate == 3 ?
                        <Card.Text>
                            남은 수량 : 80<br />
                            알람 시간 : 20:00<br />
                        </Card.Text> : null}


                </Card.Body>
            </Card>
            <CheckPill />
        </Wrapper >
    );
}

export default Main;