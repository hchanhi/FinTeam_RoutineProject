import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { Card } from "react-bootstrap";
import pill from './img/example.png';
import './Main.css';
import CheckPill from './CheckPill.js';
import { getNickName, isAuth } from './jwtCheck.js';
import axios from "axios";

let Wrapper = styled.div`
margin: auto;
marginTop: 50px;
width: 90%;
height: 100vh;
`;


function Main() {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);

    let [selectpill, setSelectpill] = useState([]);
    let [pillstate, setPillstate] = useState(0);
    let params = { nickname: nickname };


    function mypill() {
        if (isAuth(token) != false) {
            axios.get("/api/supplements/list", { params })
                .then(function (res) {
                    console.log("성공");
                    setSelectpill(res.data);
                    console.log(res.data);
                })
                .catch(function (res) {
                    console.log('실패');

                });
        }
    }

    useEffect(() => {
        mypill();
    }, []);

    function clickHandler(e) {
        setPillstate(e);
    }
    if (!(token)) {
        window.location.reload();
    }
    return (

        < Wrapper style={{ marginTop: "30px" }}>
            <br></br>
            <br></br>
            <div style={{ textAlign: 'center', color: 'gray' }}><span>꾸준한 영양제 복용을 위하여</span></div>
            <h1 style={{
                textAlign: 'center', color: '#58CCFF', fontWeight: '600',
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000'
            }}>Pill Good</h1>

            <Card className="mainCard">

                <Card.Body>
                    <Card.Title>{isAuth(token) != false ? '안녕하세요 ' + nickname + '님!' : '로그인 후 이용바랍니다.'}</Card.Title>
                    <img src={pill} className="image" />
                    <Card.Subtitle className="mb-2 text-muted">
                        {selectpill.map(function (pill, index) {
                            return (
                                <span key={index} className={`pillname ${pillstate === index ? 'selected' : ''}`} onClick={() => { clickHandler(index); }}>{pill.supplementsName} </span>
                            );
                        })}
                    </Card.Subtitle>
                    {selectpill.map(function (pill, index) {
                        return (
                            <div>
                                {pillstate == index ?
                                    <Card.Text key={index}>
                                        남은 수량 : {pill.quantityLeft}<br />
                                        알람 시간 : {pill.slot == 'MORNING' ? '아침': pill.slot == 'LUNCH' ? '점심':'저녁'}<br />
                                    </Card.Text> : null}
                            </div>
                        );
                    })}



                </Card.Body>
            </Card>
            <CheckPill />

        </Wrapper >
    );
}

export default Main;