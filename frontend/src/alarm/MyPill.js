import './MyPill.css';
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getNickName, isAuth } from "../jwtCheck";
import axios from "axios";
import Swal from 'sweetalert2';

import {getMessaging, getToken, onMessage} from "firebase/messaging";
import messaging from "../App";


function MyPill() {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);
    let [card, setCard] = useState([]);
    let navigate = useNavigate();
    let [state, setState] = useState(false);


    onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        // ...
    });

    function mypill() {
        if (isAuth(token) != false) {
            let params = { nickname: nickname };
            axios.get("/api/supplements/list", { params })

                .then(function (res) {
                    console.log("성공");
                    setCard(res.data);
                    console.log(res.data);
                })
                .catch(function (res) {
                    console.log('실패');

                });
        }
    }

    function deletePill(index) {
        let params = { id: (card[index]).id };
        let slot = card[index].slot;
        getToken(messaging, { vapidKey: 'BOUH7VnfqJhHUd9CXxw1_QwjB_lScFbFAgPb9P-JOcNE8VavuYuOgSw5s9dLiTZfS0yYGv5RI1dCkYSeLxxvmmI' })
            .then((currentToken) => {
                unsubscribeTokenToTopic(currentToken, slot);
            });
        axios.get("/api/supplements/delete", { params })
            .then(function (res) {
                console.log("구독취소성공");


                setState(!state);
            })
            .catch(function (res) {
                console.log('실패');

            });

    }


    function unsubscribeTokenToTopic(token, topic) {
        fetch('https://iid.googleapis.com/iid/v1:batchRemove', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'key=' + 'AAAADsLVKyE:APA91bHI_UNkgq0sEAf5UcR01heTflDp8PDs8CI5Lpb3G8HHLUNv05N1STvF0OaAN_W0jVXoHTFdxO_KAkw4Gc5fdrvPxNfnzjtc9IpjJPxJz6fcHQUEpY9W-Lr7wJH-TpgII5O8_84E'
            }),
            body: JSON.stringify({
                "to": "/topics/" + topic,
                "registration_tokens": [token]
            })


        }).then(response => {
            if (response.status < 200 || response.status >= 400) {
                throw 'Error unsubscribing to topic: ' + response.status + ' - ' + response.text();
            }
            console.log('Unsubscribed to "' + topic + '"');
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {

        if (!isAuth(token)) {
            Swal.fire({
                confirmButtonColor: '#2fbe9f',

                confirmButtonText: '확인',
                text: '로그인 후 이용하실 수 있어요😥', // Alert 제목

            });
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        mypill();
    }, [state]);


    return (
        <div className="page">
            <div className="page2">

                <br />
                <br />   <br />
                <h3 style={{
                    textAlign: 'center', color: '#58CCFF', fontWeight: '600',
                    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000'
                }} >영 양 제</h3>

                {card.map(function (card, index) {
                    return (
                        <div key={index}>
                            <Card className="pillCard">
                                <Card.Body>
                                    <Card.Title style={{ color: 'orange' }}>{card.supplementsName}</Card.Title>
                                    <Card.Subtitle style={{ fontSize: '13px' }} className="mb-2 text-muted">1회/{card.singleDose}정</Card.Subtitle>
                                    <Card.Text>
                                        현재 수량 : {card.quantityLeft}<br />
                                        알림 시간 : {card.slot == 'MORNING' ? '아침' : card.slot == 'LUNCH' ? '점심' : '저녁'}<br />
                                        등록한 날짜 : {(card.supplementsCreated).substring(0, 10)}
                                    </Card.Text>
                                    <div className='myPillBtn' style={{ textAlign: 'center' }}>

                                        <Button variant="outline-warning" className="cardBtn" onClick={() => { deletePill(index); }}>삭 제</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    );
                })}
                <div>
                    <Link to={'/addpill'} style={{ textDecoration: 'none' }}><Button variant="warning" className="addBtn">영양제 추가</Button></Link>
                </div>
                <br />
                <br />
                <br />
                <br />

            </div>
        </div>
    );
}

export default MyPill;