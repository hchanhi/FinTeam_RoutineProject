import { React, useEffect, useState } from "react";

import styled from "styled-components";
import { Card } from "react-bootstrap";
import pill from './img/test.png';
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
    let [record, setRecord] = useState([]);
    let [ranking, setRanking] = useState([]);

    function mypill() {
        if (isAuth(token) != false) {
            axios.get("/api/supplements/list", { params })
                .then(function (res) {
                    setSelectpill(res.data);
                })
                .catch(function (res) {
                    console.log('실패');
                });
        }
    }
    useEffect(() => {
        mypill();
        getRecord();
        getRanking();
    },[]);

    function clickHandler(e) {
        setPillstate(e);
    }
    if (!(token)) {
        window.location.reload();
    }

    function getRecord(){
        axios.get("/api/supplements/record", {params})
            .then(function(res){
                setRecord(res.data);
            })
            .catch(function(res){
                console.log('실패');
            })
    }

    function getRanking(){
        axios.get("/api/supplements/maxranking")
            .then(function(res){
                setRanking(res.data);
                console.log(res.data);
            })
            .catch(function(res){
                console.log('실패');
            })
    }

    return (

        < Wrapper style={{ marginTop: "30px" }}>
            <br></br>
            <br></br>
            <div style={{ textAlign: 'center', color: 'gray' }}><span>꾸준한 영양제 복용을 위한</span></div>
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

                    <br/>
                    {selectpill.map(function (pill, index) {
                        return (
                            <div>
                                {pillstate == index ?
                                    <Card.Text key={index}>
                                        남은 수량 : {pill.quantityLeft}<br />
                                        알람 시간 : {pill.slot == 'MORNING' ? '아침' : pill.slot == 'LUNCH' ? '점심' : '저녁'}<br />
                                    </Card.Text> : null}
                            </div>
                        );
                    })}
                    <br/>
                    <div>
                        <span>현재 연속 일수 : {record.continuity}</span><br/>
                        <span>최고 연속 일수 : {record.maxContinuity}</span>
                    </div>



                </Card.Body>
            </Card>
            <br/>
            <CheckPill />
            <br/>
            <br/>
            <div>
                <h2>랭킹 (현재 연속 일수)</h2>
                <br/>
                {ranking.map(function(rank,index){
                    return(
                        <div style={{fontSize:'20px'}}>
                            <span key={index}>{(index+1) == 1? '🥇 ': (index+1) == 2? '🥈 ' : (index+1)== 3? '🥉 ' : (index+1)+'위 '}</span>&nbsp;&nbsp;
                            <span>{rank.user.nickname}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>{rank.continuity} 일</span>
                        </div>
                    );
                })}
            </div>
        </Wrapper >
    );
}

export default Main;